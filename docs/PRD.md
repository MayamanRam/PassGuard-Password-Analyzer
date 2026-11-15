# Product Requirements Document (PRD)

## PassGuard — Professional Password Security Analyzer & Cryptographic Generator

---

## 1. Executive Summary

**PassGuard** is a zero-knowledge, client-side cybersecurity application engineered to evaluate password strength, analyze theoretical and effective entropy, detect predictable patterns, generate cryptographically secure passwords and passphrases, and check public data breach exposure using k-anonymity.

Unlike naive password meters that rely solely on arbitrary character counts or simplistic regular expressions, PassGuard integrates the Carnegie Mellon/Dropbox `zxcvbn` graph-search algorithm, Shannon information theory, and the Electronic Frontier Foundation (EFF) Diceware methodology to provide technically accurate, defensible evaluations.

PassGuard is designed for developers, system administrators, security engineers, and privacy-conscious users seeking an auditable, offline-capable password security utility.

---

## 2. Product Vision & Tagline

- **Brand Name:** PassGuard
- **Tagline:** "Understand. Strengthen. Protect."
- **Core Value Proposition:** Real-time cryptographic password analysis and generation with mathematical rigor and absolute local privacy—zero storage, zero telemetry, zero server-side exposure.

---

## 3. User Personas & Target Audience

### 3.1 Security Analysts & Penetration Testers

- **Needs:** Realistic estimations of cracking effort across varying threat models (GPU clusters, online throttled APIs, bcrypt slow hashes); identification of Hashcat rule patterns.
- **Goals:** Demonstrate password vulnerability to clients and educate employees on realistic attack vectors.

### 3.2 Software Developers & DevOps Engineers

- **Needs:** Verification of password complexity rules against NIST SP 800-63B standards; understanding of CSPRNG vs PRNG modulo bias in key generation.
- **Goals:** Avoid insecure `Math.random()` patterns and eliminate arbitrary complexity requirements that induce predictable user substitutions.

### 3.3 Everyday Privacy-Conscious Users

- **Needs:** Easy-to-understand feedback on why passwords like `P@ssw0rd2024!` fail; ability to generate memorable, high-entropy Diceware passphrases.
- **Goals:** Secure master passwords for password managers and personal devices without risking leaks to third-party web servers.

---

## 4. Key Functional Requirements

### 4.1 Real-Time Password Strength Analyzer

- **FR-01:** Real-time reactive analysis of user-entered passwords without page refresh or form submission.
- **FR-02:** Five-tier strength scoring (Very Weak [0], Weak [1], Moderate [2], Strong [3], Very Strong [4]).
- **FR-03:** Dual-entropy computation: Theoretical Hartley Entropy ($L \log_2 R$) versus Effective Realistic Entropy ($\log_2(\text{guesses})$).
- **FR-04:** Shannon internal information density calculation ($-\sum p(x) \log_2 p(x)$).
- **FR-05:** Automated heuristic detection for repeated characters, sequential runs (numeric and alphabetic), spatial keyboard walks, calendar years, and l33t speak substitutions.
- **FR-06:** Local blocklist lookup against the top 1,000 most frequently breached credentials.
- **FR-07:** Simulated crack time estimates across 4 standardized threat profiles (Online Throttled, Online Standard, Offline Slow Hash, Offline GPU Fast Hash).
- **FR-08:** Actionable, context-sensitive hardening guidance and specific warnings.

### 4.2 Cryptographically Secure Password Generator

- **FR-09:** Password length customization from 8 to 128 characters.
- **FR-10:** Granular character set toggles (Uppercase, Lowercase, Numbers, Symbols).
- **FR-11:** Ambiguous character exclusion (`0`, `O`, `o`, `1`, `l`, `I`).
- **FR-12:** Similar character/punctuation exclusion (`{}[]()/\'"`~,;:.<>`).
- **FR-13:** Character set enforcement guaranteeing $\ge 1$ character from each selected class.
- **FR-14:** Batch generation from 1 to 20 passwords.
- **FR-15:** Strict Web Crypto API (`crypto.getRandomValues`) implementation using rejection sampling to eliminate modulo bias.

### 4.3 Memorable Diceware Passphrase Generator

- **FR-16:** Passphrase generation using the curated EFF Diceware wordlist.
- **FR-17:** Configurable word count from 3 to 10 words.
- **FR-18:** Customizable separators (hyphen, underscore, period, space, slash, hash, dollar, none, random).
- **FR-19:** Capitalization formatting (TitleCase, lowercase, UPPERCASE, random).
- **FR-20:** Optional random numeric insertion at start, end, or random word position.
- **FR-21:** Theoretical passphrase entropy calculation ($W \log_2(N)$ + separator/number bits).

### 4.4 Privacy-Preserving Breached Password Checking

- **FR-22:** Optional breach verification against Have I Been Pwned Pwned Passwords range API.
- **FR-23:** Strict adherence to the k-Anonymity privacy model: local client computes SHA-1, transmits only the first 5 characters (prefix), and compares the remaining 35 characters locally.
- **FR-24:** Offline detection and graceful degradation—network failures never block local analysis.
- **FR-25:** Transparent cryptographic audit modal displaying transmitted prefix vs retained suffix.

### 4.5 Security Education & Threat Intelligence Guide

- **FR-26:** 12 structured educational modules covering attack vectors, credential stuffing, password spraying, MFA architectures (SMS vs TOTP vs FIDO2), password managers, and passkeys.
- **FR-27:** NIST SP 800-63B alignment documentation.

---

## 5. Non-Functional Requirements

### 5.1 Privacy & Confidentiality (NFR-01)

- User passwords must NEVER be transmitted to any backend server, logged to browser consoles, or stored in persistent client storage (`localStorage`, `sessionStorage`, IndexedDB, cookies).
- Input states must be wiped from memory upon component unmount or clear.

### 5.2 Performance & Responsiveness (NFR-02)

- Keystroke analysis latency must remain under 50ms for typical inputs ($\le 64$ characters).
- Massive inputs ($2,000+$ characters) must execute without freezing the browser main thread or crashing the runtime.

### 5.3 Accessibility & Usability (NFR-03)

- Target WCAG 2.2 Level AA compliance.
- Visual strength indicators must not rely solely on color (support text labels, numeric scores, and ARIA progressbars).
- Full keyboard navigability with visible focus indicators.

### 5.4 Cross-Platform Compatibility (NFR-04)

- Responsive support for desktop (1920x1080, 1440x900), tablet (768x1024), and mobile viewports (375x667+).
- Evergreen browser support (Chrome, Firefox, Safari, Edge).

---

## 6. Release Criteria & Acceptance Metrics

| Criterion                | Target Metric                                | Verification Method                |
| ------------------------ | -------------------------------------------- | ---------------------------------- |
| Automated Test Coverage  | 100% of core service modules                 | Vitest suite (48/48 tests passing) |
| Production Bundle Size   | $\le 2.0$ MB (includes offline zxcvbn dicts) | Vite production build audit        |
| Local Storage Violations | Exactly 0 bytes written                      | Automated privacy unit tests       |
| Runtime Vulnerabilities  | 0 known CVEs in production dependencies      | `npm audit --omit=dev`             |
