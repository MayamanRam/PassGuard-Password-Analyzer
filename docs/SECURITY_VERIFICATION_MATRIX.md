# Security Verification Matrix (SECURITY_VERIFICATION_MATRIX.md)
## PassGuard — Traceability Matrix: Security Controls to Automated Verification

---

## 1. Security Control Traceability Matrix

This matrix maps every architectural security requirement and threat mitigation control directly to the corresponding implementation file and automated test suite:

| Control ID | Security Control Description | Implementation File | Automated Verification Test | Verification Status |
|---|---|---|---|---|
| **SEC-01** | **CSPRNG Enforcement:** Web Crypto API used exclusively; `Math.random()` strictly prohibited. | `src/services/cryptoService.ts` | `src/test/unit/cryptoService.test.ts` (Spy on `Math.random`) | **Verified (PASS)** |
| **SEC-02** | **Modulo Bias Elimination:** Unbiased rejection sampling for uniform distribution over charsets. | `src/services/cryptoService.ts` | `src/test/unit/cryptoService.test.ts` (Range boundary & uniform checks) | **Verified (PASS)** |
| **SEC-03** | **Zero Persistence (localStorage):** User passwords never stored in client local storage. | `src/services/passwordAnalyzer.ts` | `src/test/unit/privacy.test.ts` (localStorage inspection) | **Verified (PASS)** |
| **SEC-04** | **Zero Persistence (sessionStorage):** User passwords never stored in session storage. | `src/services/passwordAnalyzer.ts` | `src/test/unit/privacy.test.ts` (sessionStorage inspection) | **Verified (PASS)** |
| **SEC-05** | **Zero Persistence (Cookies):** User passwords never written to `document.cookie`. | `src/services/passwordAnalyzer.ts` | `src/test/unit/privacy.test.ts` (Cookie inspection) | **Verified (PASS)** |
| **SEC-06** | **Zero Telemetry / Console Logs:** Plaintext passwords never written to `console.log`. | `src/services/passwordAnalyzer.ts` | `src/test/unit/privacy.test.ts` (Spy on `console.log`) | **Verified (PASS)** |
| **SEC-07** | **Zero Network Telemetry in Analysis:** Local strength analysis never makes outbound `fetch` calls. | `src/services/passwordAnalyzer.ts` | `src/test/unit/privacy.test.ts` (Spy on `globalThis.fetch`) | **Verified (PASS)** |
| **SEC-08** | **k-Anonymity Transmission:** Only 5-character SHA-1 prefix transmitted to HIBP; plaintext and full hash never leave memory. | `src/services/breachChecker.ts` | `src/test/unit/breachChecker.test.ts` (URL regex & payload inspection) | **Verified (PASS)** |
| **SEC-09** | **Offline Breach Resilience:** Network failures or offline state degrade gracefully without blocking analysis. | `src/services/breachChecker.ts` | `src/test/unit/breachChecker.test.ts` (Network exception test) | **Verified (PASS)** |
| **SEC-10** | **Character Class Enforcement:** Generated passwords guaranteed to contain $\ge 1$ char from each selected class. | `src/services/passwordGenerator.ts` | `src/test/unit/passwordGenerator.test.ts` (Regex class assertions) | **Verified (PASS)** |
| **SEC-11** | **Ambiguous Character Filtering:** Correctly strips `0, O, o, 1, l, I` when user selects exclusion. | `src/services/passwordGenerator.ts` | `src/test/unit/passwordGenerator.test.ts` (Ambiguous character set check) | **Verified (PASS)** |
| **SEC-12** | **ReDoS / Algorithmic Complexity Defense:** 2,000+ character inputs capped to 72 chars for graph matching to avoid freezes. | `src/services/passwordAnalyzer.ts` | `src/test/unit/passwordAnalyzer.test.ts` (Execution timer assertion) | **Verified (PASS)** |
| **SEC-13** | **Common Breached Password Blocklist:** Instant score 0 and warning on top 1,000 common passwords. | `src/constants/commonPasswords.ts` | `src/test/unit/passwordAnalyzer.test.ts` (Top common list testing) | **Verified (PASS)** |
| **SEC-14** | **WCAG 2.2 AA Accessible Meter:** Strength progressbar includes text labels, score values, and ARIA attributes. | `src/components/common/StrengthMeter.tsx` | `src/test/components/components.test.tsx` (`getByRole('progressbar')`) | **Verified (PASS)** |
| **SEC-15** | **Explicit Clipboard Intent:** Clipboard API triggered exclusively on deliberate user click with visual confirmation. | `src/components/common/CopyButton.tsx` | `src/test/components/components.test.tsx` (Clipboard mock verification) | **Verified (PASS)** |
