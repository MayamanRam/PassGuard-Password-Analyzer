# Changelog (CHANGELOG.md)
## PassGuard — Version & Release History

All notable changes to the PassGuard project are documented in this file.

---

## [1.0.0] — 2026-11-13

### Initial Production Release

#### Added
- **Password Strength Analyzer:**
  - Real-time client-side analysis utilizing `@zxcvbn-ts/core` (v4.2.0) with English and common language packs.
  - Dual-entropy calculations: Theoretical Hartley Bound ($L \log_2 R$) vs Shannon Information Entropy vs Effective Realistic Entropy ($\log_2(\text{guesses})$).
  - Character composition analyzer tracking length, uppercase, lowercase, numbers, symbols, spaces, and unique characters.
  - Heuristic pattern detector flagging repeated character runs, sequential runs (numeric and alphabetic), spatial keyboard walks, calendar years, and l33t speak substitutions.
  - Local blocklist detection against the top 1,000 most frequently breached passwords.
  - Cracking effort estimation across 4 realistic attacker threat models (Online Throttled, Online Standard, Offline Slow Hash, Offline GPU Fast Hash).
  - Contextual security warnings and actionable hardening guidance.
- **Cryptographically Secure Password Generator:**
  - Powered by Web Crypto API (`crypto.getRandomValues`) with unbiased rejection sampling.
  - Length customization from 8 to 128 characters.
  - Character class toggles (uppercase, lowercase, digits, symbols) with strict enforcement guaranteeing $\ge 1$ character from each active class.
  - Ambiguous character exclusion (`0, O, o, 1, l, I`) and punctuation/bracket exclusions.
  - Batch generation supporting 1 to 20 passwords simultaneously.
- **Diceware Passphrase Generator:**
  - Integrated official Electronic Frontier Foundation (EFF) public domain Diceware wordlist.
  - Word count customization from 3 to 10 words.
  - Custom separator choices (hyphen, underscore, period, space, slash, hash, dollar, none, random).
  - Capitalization formatting (TitleCase, lowercase, UPPERCASE, random).
  - Random numeric insertion (start, end, or random position) to elevate entropy.
  - Theoretical passphrase entropy calculation ($W \log_2(N)$ + separator/number bits).
- **Privacy-Preserving Breached Password Checking:**
  - Integrated Have I Been Pwned Pwned Passwords range API using the k-Anonymity model.
  - Web Crypto local SHA-1 generation; transmits only the 5-character prefix.
  - Local 35-character suffix comparison with Cloudflare `Add-Padding: true` support.
  - Transparent cryptographic audit dropdown displaying transmitted prefix vs retained suffix.
  - Graceful offline fallback when network is unavailable.
- **Security Guide & Education:**
  - 12 in-depth cybersecurity modules covering password attack vectors, brute-force GPU speeds, Hashcat rules, credential stuffing, password spraying, password reuse cascades, phishing proxies, MFA architectures, zero-knowledge password managers, and FIDO2 passkeys.
  - Searchable and categorized accordion interface.
- **Design System & Accessibility:**
  - Cybersecurity-themed visual identity with deep obsidian navy background (`#0a0e17`) and cyan/purple glow accents.
  - WCAG 2.2 Level AA compliance: high text contrast ($> 14:1$), non-color-dependent strength indicators, and full keyboard navigation.
  - Responsive layouts supporting desktop, tablet, and mobile devices.
- **Documentation:**
  - 18 comprehensive documentation files in `docs/` detailing PRD, TRD, Architecture, Threat Model, Privacy Design, Cryptography Proofs, and Verification Matrices.
- **Automated Testing Suite:**
  - 48 automated tests across 8 test suites in Vitest with 100% pass rate.
