# Architecture Document

## PassGuard — Technical Architecture & Component Flow

---

## 1. Architectural Principles

PassGuard is architected according to four core tenets:

1. **Client-Side Sovereignty:** All computation occurs in the browser. The user's device is the single execution boundary.
2. **Zero-Knowledge Privacy:** Secrets entered or generated never traverse an outbound socket or persist to local web storage.
3. **Defense-in-Depth Cryptography:** We combine multiple evaluation techniques (Shannon entropy, Hartley pool bounds, zxcvbn graph search, common password hash sets, and k-Anonymity API queries).
4. **Resilient Performance:** We decouple expensive matching loops from rendering using functional decomposition and cap graph-search token windows at 72–256 characters to avoid Algorithmic Complexity / ReDoS delays.

---

## 2. High-Level System Architecture

```mermaid
flowchart TB
    subgraph Browser["User Client Browser Sandbox"]
        subgraph PresentationLayer["Presentation Layer (React 18 + Tailwind)"]
            Nav["Navbar & Tab Router"]
            DashView["Dashboard View"]
            AnalyzerView["Analyzer View"]
            GenView["Password Gen View"]
            PassView["Passphrase Gen View"]
            GuideView["Security Guide View"]
            AboutView["Audit / About View"]
        end

        subgraph ServiceLayer["Service Layer (Pure TypeScript)"]
            PA["passwordAnalyzer.ts"]
            PG["passwordGenerator.ts"]
            PPG["passphraseGenerator.ts"]
            BC["breachChecker.ts"]
            ES["entropyService.ts"]
            CS["cryptoService.ts"]
        end

        subgraph CoreEngines["Cryptographic & Data Engines"]
            ZX["@zxcvbn-ts/core Engine"]
            EFF["EFF Diceware Wordlist"]
            CBLOCK["Top 500 Breached Blocklist"]
            WC["Web Crypto API (CSPRNG & SHA-1)"]
        end
    end

    subgraph ExternalService["External Cloud Service (Optional)"]
        HIBP["Have I Been Pwned Range API\n(api.pwnedpasswords.com)"]
    end

    %% Wiring
    AnalyzerView --> PA
    GenView --> PG
    PassView --> PPG
    AnalyzerView --> BC

    PA --> ZX
    PA --> ES
    PA --> CBLOCK
    PG --> CS
    PG --> WC
    PPG --> EFF
    PPG --> CS
    BC --> CS
    BC --> WC
    BC -.->|5-char SHA-1 Prefix ONLY| HIBP
```

---

## 3. Detailed Data Flow Architecture

### 3.1 Password Strength Analysis Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User Keystroke
    participant UI as PasswordInput Component
    participant Svc as passwordAnalyzer.ts
    participant Block as Common Passwords Blocklist
    participant ZX as zxcvbn Pattern Engine
    participant ES as entropyService.ts
    participant Meter as StrengthMeter & Scorecard

    User->>UI: Types or pastes password
    UI->>Svc: analyzePassword(password)
    Svc->>Block: checkCommonPassword(normalized)
    alt Exact Match in Top Breached Passwords
        Block-->>Svc: Match found (Rank #N)
        Note over Svc: Score clamped to 0 (Very Weak)
    else Unique Input
        Block-->>Svc: No match
    end
    Svc->>ES: analyzeComposition(password)
    ES-->>Svc: length, uppercase, lowercase, numbers, poolSize
    Svc->>ZX: check(cappedToken72)
    ZX-->>Svc: guesses, log10, matches, feedback
    Svc->>ES: calculateEntropy(password, guesses, composition)
    ES-->>Svc: theoreticalBits, shannonBits, effectiveBits, rating
    Svc-->>UI: PasswordAnalysisResult payload
    UI->>Meter: Render score, entropy gauge, crack times, patterns
```

### 3.2 k-Anonymity Breach Verification Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User Click
    participant UI as BreachCheckCard
    participant BC as breachChecker.ts
    participant WC as Web Crypto API (SubtleCrypto)
    participant HIBP as api.pwnedpasswords.com

    User->>UI: Clicks "Check Known Breaches"
    UI->>BC: checkBreachedPassword(password)
    BC->>WC: digest('SHA-1', encodedPassword)
    WC-->>BC: Full 40-char Hex Digest (e.g. 5FD92...ABC12)
    Note over BC: Split into Prefix (5 chars) & Suffix (35 chars)
    BC->>HIBP: GET /range/5FD92 (Add-Padding: true)
    HIBP-->>BC: List of ~500-800 matching hash suffixes & counts
    Note over BC: Search returned lines locally for 35-char suffix
    alt Suffix matched
        BC-->>UI: isBreached: true, count: N
    else Suffix absent
        BC-->>UI: isBreached: false, count: 0
    end
    UI->>User: Displays breach status & cryptographic audit trail
```

---

## 4. Subsystem Specifications

### 4.1 Cryptographic Randomness Subsystem (`cryptoService.ts`)

- Utilizes `window.crypto.getRandomValues(Uint32Array)`.
- Eliminates modulo bias via rejection sampling loop against the highest multiple of $N$ below $2^{32}$.
- Implements in-place Fisher-Yates array shuffling with unbiased random index selection.

### 4.2 Entropy Estimation Subsystem (`entropyService.ts`)

- **Hartley Bound:** Computes $L \log_2(R)$ to represent maximum theoretical search space.
- **Shannon Entropy:** Computes character frequency distribution to detect character repetition deficits.
- **Effective Entropy:** Computes $\log_2(\text{guesses})$ based on zxcvbn's graph model of shortest attack paths.

### 4.3 Breached Password Subsystem (`breachChecker.ts`)

- Implements Cloudflare-backed Have I Been Pwned Range API with `Add-Padding: true` header to prevent network-level side-channel packet size inspection.
- Enforces a 6,000ms network timeout with `AbortController` and graceful offline fallback.
