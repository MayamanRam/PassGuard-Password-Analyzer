# Technical Requirements Document (TRD)
## PassGuard — System Architecture & Technical Specifications

---

## 1. System Overview

PassGuard is architected as a pure client-side Single Page Application (SPA) built with React 18, Vite, TypeScript, and Tailwind CSS. The system performs all password analysis, entropy computation, and cryptographic random generation strictly within the user's local browser sandbox.

```mermaid
graph TD
    User([User / Web Browser]) --> UI[PassGuard React UI]
    UI --> PA[Password Analyzer Service]
    UI --> PG[Password Generator Service]
    UI --> PPG[Passphrase Generator Service]
    UI --> BC[Breach Checker Service]

    subgraph Client-Side Memory
        PA --> ZX[@zxcvbn-ts/core Engine]
        PA --> ES[Entropy Service]
        PA --> PD[Pattern Detector]
        PA --> BL[Common Blocklist]

        PG --> CR1[Web Crypto API]
        PG --> RS1[Unbiased Rejection Sampling]

        PPG --> EW[EFF Diceware Wordlist]
        PPG --> CR2[Web Crypto API]

        BC --> SHA1[Web Crypto SHA-1]
        BC --> KA[k-Anonymity Suffix Matcher]
    end

    subgraph External Network (Optional & Privacy-Preserving)
        BC -.->|5-char SHA-1 Prefix ONLY| HIBP[api.pwnedpasswords.com]
    end
```

---

## 2. Technology Stack & Dependencies

### 2.1 Core Frameworks & Tooling
- **Framework:** React 18.3.1 (React Hooks, functional components, StrictMode)
- **Bundler & Build Tool:** Vite 5.4.10 / 5.4.21 (ESM, Rollup, PostCSS)
- **Language:** TypeScript 5.6.3 (Target: ES2020, strict type checking, `noUnusedLocals: true`)
- **Styling System:** Tailwind CSS 3.4.17 with PostCSS and Autoprefixer
- **Icons:** Lucide React 0.468.0

### 2.2 Cryptography & Analysis Libraries
- **Password Strength Evaluation:** `@zxcvbn-ts/core` (v4.2.0), `@zxcvbn-ts/language-common` (v4.1.3), `@zxcvbn-ts/language-en` (v4.1.1)
- **CSPRNG:** Native W3C Web Crypto API (`window.crypto.getRandomValues`, `crypto.subtle.digest`)
- **Passphrase Wordlist:** Electronic Frontier Foundation (EFF) Public Domain Diceware List
- **Utility Classes:** `clsx` (v2.1.1), `tailwind-merge` (v2.5.5)

### 2.3 Testing Harness
- **Test Runner:** Vitest 2.1.9
- **DOM Simulation:** jsdom 25.0.1
- **Component Testing:** `@testing-library/react` (v16.0.1), `@testing-library/jest-dom` (v6.6.3)

---

## 3. Component Architecture & Data Flow

### 3.1 Directory Layout
```
src/
├── types/                # Strongly typed interfaces (analyzer, generator, breach)
├── constants/            # Curated wordlists, common passwords, attack speed tables
├── services/             # Core business logic (pure functions, zero side effects)
│   ├── cryptoService.ts      # Web Crypto RNG, rejection sampling, SHA-1
│   ├── entropyService.ts     # Hartley, Shannon, and effective entropy math
│   ├── passwordAnalyzer.ts   # zxcvbn integration and heuristic pattern engine
│   ├── passwordGenerator.ts  # CSPRNG generator with character class enforcement
│   ├── passphraseGenerator.ts# Diceware generator with separator/number options
│   └── breachChecker.ts      # k-Anonymity HIBP range API client
├── components/           # Reusable UI components
│   ├── common/               # Navbar, Footer, Badge, Card, Button, StrengthMeter
│   ├── analyzer/             # Input, Scorecard, EntropyGauge, CrackTimes, etc.
│   ├── generator/            # Generator controls, password list, explainer
│   ├── passphrase/           # Passphrase controls, output, Diceware explainer
│   └── dashboard/            # Hero section, feature cards, quick stats
├── pages/                # Top-level view controllers (Dashboard, Analyzer, etc.)
└── test/                 # Vitest automated test suites
```

---

## 4. Technical Algorithms & Formulations

### 4.1 Theoretical Hartley Entropy
Given a password of length $L$ drawn from an active character pool of size $R$:
$$E_{\text{theoretical}} = L \times \log_2(R)$$
Where:
- Lowercase ($a-z$): $R_l = 26$
- Uppercase ($A-Z$): $R_u = 26$
- Digits ($0-9$): $R_d = 10$
- ASCII Symbols: $R_s = 33$
- Space: $R_{sp} = 1$
- Extended Unicode: $R_{uni} = 128$

### 4.2 Shannon Information Entropy
Measures internal character distribution unpredictability:
$$H(X) = - \sum_{i=1}^{n} p(x_i) \log_2 p(x_i)$$
Where $p(x_i) = \frac{\text{count}(x_i)}{L}$. Total bits = $L \times H(X)$.

### 4.3 Effective Entropy (zxcvbn Search Space)
$$E_{\text{effective}} = \log_2(\text{guesses})$$
Calculated via dynamic programming shortest-path search over a directed acyclic graph (DAG) of dictionary matches, spatial keyboard walks, l33t substitutions, and repeat patterns.

### 4.4 Modulo Bias Elimination (Rejection Sampling)
For an integer bound $N < 2^{32}$:
$$\text{limit} = 2^{32} - (2^{32} \bmod N)$$
Samples $r \sim \text{Uint32}$ are rejected if $r \ge \text{limit}$. Returns $r \bmod N$, providing exact uniform probability $P(X = k) = \frac{1}{N}$.

---

## 5. Security & Isolation Model

1. **Strict Content Security Policy (CSP):**
   ```http
   default-src 'self';
   script-src 'self';
   style-src 'self' 'unsafe-inline';
   connect-src 'self' https://api.pwnedpasswords.com;
   img-src 'self' data:;
   object-src 'none';
   base-uri 'self';
   ```
2. **Zero Storage Boundary:**
   The application registers no `localStorage.setItem` or `sessionStorage.setItem` calls. All states reside in ephemeral React component memory.
3. **No Dynamic Code Execution:**
   No `eval()`, `new Function()`, or `dangerouslySetInnerHTML` constructs exist in the application codebase.

