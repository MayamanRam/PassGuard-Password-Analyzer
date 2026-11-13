# PassGuard — Professional Password Security Analyzer & Cryptographic Generator

<div align="center">

![PassGuard Logo](./public/shield.svg)

### *"Understand. Strengthen. Protect."*

A zero-knowledge, client-side cybersecurity application engineered to evaluate password strength, analyze theoretical and effective entropy, detect predictable patterns, generate cryptographically secure passwords and passphrases, and verify data breach exposure using k-anonymity.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.17-teal.svg)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tests-48%20Passed-emerald.svg)](https://vitest.dev/)
[![Security](https://img.shields.io/badge/Zero--Knowledge-100%25%20Local-cyan.svg)](#privacy-guarantee)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG-2.2%20AA%20Compliant-green.svg)](#accessibility)

</div>

---

## 🛡️ Key Features

### 1. Real-Time Password Strength Analyzer
- **zxcvbn Pattern Matching:** Uses Carnegie Mellon / Dropbox `@zxcvbn-ts/core` (v4.2.0) graph-search algorithms.
- **Dual-Entropy Computation:** Contrasts theoretical Hartley entropy ($L \log_2 R$) against realistic effective entropy ($\log_2(\text{guesses})$).
- **Shannon Information Theory:** Calculates character frequency entropy ($-\sum p \log_2 p$) to detect internal character repetition deficits.
- **Heuristic Pattern Engine:** Automatically flags repeated characters, sequential runs (`123456`, `abcdef`), spatial keyboard walks (`qwerty`), calendar years (`2024`), and l33t speak substitutions (`P@ssw0rd!`).
- **Top 1,000 Common Blocklist:** Instant identification of top breached credentials from RockYou and SecLists.
- **Realistic Threat Modeling:** Displays estimated cracking effort across 4 distinct threat scenarios:
  - *Online Strictly Throttled* (100 guesses / hour, e.g. strict account lockout)
  - *Online Standard* (10 guesses / sec, unthrottled web form)
  - *Offline Slow Hash* (10,000 guesses / sec, bcrypt cost $\ge 12$ / Argon2id)
  - *Offline Fast Hash* (100,000,000,000 guesses / sec, 8x RTX 4090 GPU cluster on MD5/NTLM)

### 2. Cryptographically Secure Password Generator
- **Web Crypto API CSPRNG:** Uses `window.crypto.getRandomValues(Uint32Array)`.
- **Zero Modulo Bias:** Implements rejection sampling to guarantee mathematically uniform character distribution. `Math.random()` is strictly prohibited.
- **Customizable Charsets:** Uppercase, lowercase, numbers, special symbols, and character class enforcement guaranteeing $\ge 1$ character from each active set.
- **Filter Ambiguous & Similar Chars:** Strip confusing characters (`0, O, o, 1, l, I`) and brackets/quotes.
- **Batch Generation:** Generate 1 to 20 passwords with individual entropy calculations and one-click copy.

### 3. Memorable Diceware Passphrase Generator
- **EFF Diceware Wordlist:** Draws from the official curated Electronic Frontier Foundation wordlist.
- **Configurable Complexity:** Select 3 to 10 words, custom separators (`-`, `_`, `.`, space, `/`, `#`, `$`, random), and capitalization (`TitleCase`, lowercase, UPPERCASE).
- **Random Numeric Insertion:** Embed random numbers at start, end, or random position to elevate entropy.
- **Cognitive Memorability:** Creates passphrases with 65–85+ bits of entropy that are virtually unbreakable by GPU clusters yet easy for humans to memorize.

### 4. Privacy-Preserving Breached Password Checking
- **k-Anonymity Model:** Transmits ONLY the first 5 characters of the local SHA-1 hash to the Have I Been Pwned API.
- **Zero Plaintext or Full Hash Transmission:** The remaining 35 characters of the hash and the plaintext password never leave client browser memory.
- **Cloudflare Padding:** Implements `Add-Padding: true` header to defeat packet-size side-channel traffic inspection.
- **Cryptographic Audit Trail:** Transparent modal showing transmitted prefix vs locally retained suffix.
- **Offline Resilience:** Gracefully degrades without error when network connectivity is lost.

### 5. Password Security & Threat Intelligence Guide
- **12 Comprehensive Modules:** Attack vectors, brute-force GPU capabilities, Hashcat mutation rules, credential stuffing, password spraying, password reuse cascades, reverse-proxy phishing (Evilginx), MFA architectures (SMS vs TOTP vs FIDO2), zero-knowledge password managers, passkeys, account recovery, and suspicious activity response.
- **NIST SP 800-63B Alignment:** Explains modern NIST guidance prioritizing length and breach checking over arbitrary forced rotation.

---

## 🔒 Privacy & Security Boundary

PassGuard operates under a strict **Zero-Knowledge Architecture**:
- **Zero Storage:** Never writes to `localStorage`, `sessionStorage`, IndexedDB, or `document.cookie`.
- **Zero Telemetry:** No analytics scripts, tracking beacons, advertising cookies, or remote logging.
- **Zero Server Backend:** 100% of the strength evaluation and generation algorithms run inside the local browser JavaScript engine.
- **Memory Scrubbing:** Password states are wiped upon component reset or unmount.

---

## 📦 Project Structure

```
02-PassGuard-Password-Analyzer/
├── public/                     # Static brand assets & favicon
│   └── shield.svg
├── src/
│   ├── types/                  # TypeScript interfaces (analyzer, generator, breach)
│   ├── constants/              # EFF wordlist, top 500 blocklist, attack profiles
│   ├── services/               # Pure cryptographic and analysis services
│   │   ├── cryptoService.ts        # Web Crypto CSPRNG & rejection sampling
│   │   ├── entropyService.ts       # Hartley, Shannon, and effective entropy math
│   │   ├── passwordAnalyzer.ts     # zxcvbn integration & pattern detector
│   │   ├── passwordGenerator.ts    # Secure generator with charset guarantees
│   │   ├── passphraseGenerator.ts  # Diceware passphrase generator
│   │   └── breachChecker.ts        # k-Anonymity HIBP range API client
│   ├── components/             # Cyber-themed modular UI components
│   │   ├── common/                 # Navbar, Footer, Badge, Card, StrengthMeter, CopyButton
│   │   ├── analyzer/               # Input, Scorecard, EntropyGauge, CrackTimes, etc.
│   │   ├── generator/              # Controls, Batch list, Randomness explainer
│   │   ├── passphrase/             # Controls, Output, Diceware explainer
│   │   └── dashboard/              # Hero, Feature cards, Threat intel alerts
│   ├── pages/                  # Page views (Dashboard, Analyzer, Generator, etc.)
│   ├── test/                   # Comprehensive Vitest automated test suites
│   ├── styles/                 # Tailwind CSS design system
│   ├── App.tsx                 # Root application controller
│   └── main.tsx                # Client DOM entrypoint
├── docs/                       # 18 comprehensive cybersecurity documents
├── index.html                  # HTML entrypoint with security meta tags
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Cyber dark theme configuration
├── tsconfig.json               # TypeScript strict compiler options
└── vite.config.ts              # Vite & Vitest configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js $\ge 18.0.0$
- npm $\ge 9.0.0$

### 1. Installation
```bash
git clone <repository-url>
cd 02-PassGuard-Password-Analyzer
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Automated Tests
```bash
npm test
```
Executes all 48 automated test scenarios in Vitest covering entropy models, rejection sampling, k-Anonymity, and zero persistence.

### 4. Build for Production
```bash
npm run build
```
Generates production-ready, minified static HTML, CSS, and JavaScript in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🧪 Automated Test Verification

| Test Suite | Tests | Result | Verification Scope |
|---|---|---|---|
| `cryptoService.test.ts` | 8 | PASS | CSPRNG integer bounds, rejection sampling, Fisher-Yates shuffle, SHA-1 vectors, `Math.random` prohibition. |
| `entropyService.test.ts` | 4 | PASS | Hartley theoretical pool size, Shannon repetition deficit, effective entropy ratings. |
| `passwordAnalyzer.test.ts` | 12 | PASS | Empty strings, short/long strings, common breached passwords, sequential runs, keyboard walks, l33t speak, Unicode, ReDoS defense. |
| `passwordGenerator.test.ts` | 6 | PASS | Length clamping (8-128), character class enforcement ($\ge 1$ each), ambiguous character filtering, batch unique generation. |
| `passphraseGenerator.test.ts` | 6 | PASS | EFF Diceware word counts (3-10), separators, capitalization styles, random number placement, entropy math. |
| `breachChecker.test.ts` | 3 | PASS | k-Anonymity 5-char prefix isolation, zero plaintext/hash in URL, local suffix matching, offline fallback. |
| `privacy.test.ts` | 5 | PASS | Zero `localStorage` writes, zero `sessionStorage` writes, zero `fetch` calls in analysis, zero `console.log` leaks. |
| `components.test.tsx` | 4 | PASS | PasswordInput show/hide/clear, StrengthMeter ARIA progressbar, CopyButton clipboard write, full tab navigation. |
| **Total** | **48 / 48** | **100% PASS** | **All core features and security controls verified.** |

---

## 📚 Technical Documentation

A complete documentation suite is available in the [`docs/`](./docs) directory:
- [PRD.md](./docs/PRD.md) — Product Requirements Document
- [TRD.md](./docs/TRD.md) — Technical Requirements Document
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) — Architecture & Mermaid Diagrams
- [APP_FLOW.md](./docs/APP_FLOW.md) — Application Flow & State Transitions
- [UI_UX_DESIGN_BRIEF.md](./docs/UI_UX_DESIGN_BRIEF.md) — Design System & WCAG 2.2 AA Guide
- [SECURITY_REQUIREMENTS.md](./docs/SECURITY_REQUIREMENTS.md) — NIST SP 800-63B & OWASP Controls
- [THREAT_MODEL.md](./docs/THREAT_MODEL.md) — STRIDE Threat Analysis
- [PRIVACY_DESIGN.md](./docs/PRIVACY_DESIGN.md) — k-Anonymity Mathematical Proof & Storage Boundary
- [PASSWORD_ANALYSIS_METHODOLOGY.md](./docs/PASSWORD_ANALYSIS_METHODOLOGY.md) — Entropy & Threat Models
- [CRYPTOGRAPHIC_RANDOMNESS.md](./docs/CRYPTOGRAPHIC_RANDOMNESS.md) — Web Crypto CSPRNG & Modulo Bias Proof
- [TESTING_STRATEGY.md](./docs/TESTING_STRATEGY.md) — QA Architecture & Vitest Report
- [SECURITY_VERIFICATION_MATRIX.md](./docs/SECURITY_VERIFICATION_MATRIX.md) — Controls to Tests Traceability
- [IMPLEMENTATION_PLAN.md](./docs/IMPLEMENTATION_PLAN.md) — Milestones & Delivery Record
- [DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md) — Nginx / Static Hosting & Security Headers
- [RISK_REGISTER.md](./docs/RISK_REGISTER.md) — Risk Assessment & Mitigations Log
- [SECURITY_AUDIT_REPORT.md](./docs/SECURITY_AUDIT_REPORT.md) — Security Audit & Vulnerability Assessment
- [SECURITY_FINDINGS.md](./docs/SECURITY_FINDINGS.md) — Findings Log & Remediation Notes
- [CHANGELOG.md](./docs/CHANGELOG.md) — Version History & Release Notes

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details. Wordlists sourced from the Electronic Frontier Foundation (EFF) under CC0 / Public Domain.
