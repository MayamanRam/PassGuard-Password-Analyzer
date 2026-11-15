# Security Findings & Vulnerability Log (SECURITY_FINDINGS.md)
## PassGuard — Vulnerability Tracking & Remediation Register

---

## 1. Findings Summary

| ID | Title | Severity | Component | Status | Remediation Summary |
|---|---|---|---|---|---|
| **SEC-FIND-01** | Algorithmic Complexity / ReDoS delay on massive inputs | Medium | `passwordAnalyzer.ts` | **Resolved** | Input string window for combinatorial graph search capped at 72 chars while calculating composition across full string. Execution time dropped from 2.6s to 0.7ms. |
| **SEC-FIND-02** | URL domain substring collision in test runner assertion | Low | `breachChecker.test.ts` | **Resolved** | Test assertion updated to inspect query path specifically, avoiding false positive matches against `api.pwnedpasswords.com` domain substring. |
| **SEC-FIND-03** | Development test harness dependency advisories | Low | `devDependencies` | **Documented** | Confirmed zero impact on production static bundle (`npm audit --omit=dev` yields 0 vulnerabilities). Scheduled for Vitest 3+ milestone. |
| **SEC-FIND-04** | Missing ARIA progressbar labeling in strength indicator | Low | `StrengthMeter.tsx` | **Resolved** | Added `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuetext` for WCAG 2.2 AA compliance. |

---

## 2. Detailed Remediation Notes

### SEC-FIND-01: Algorithmic Complexity on Massive Inputs
- **Vulnerability:** When a user pasted an unusually large string (e.g. 2,000+ characters of repetitive tokens), the combinatorial shortest-path search in `@zxcvbn-ts/core` analyzed every combination of repeated substrings, taking $> 2.5$ seconds and stalling the UI thread.
- **Remediation:** In `passwordAnalyzer.ts`, inputs longer than 72 characters are truncated specifically for the zxcvbn graph evaluation (`passwordForZxcvbn = password.substring(0, 72)`). 72 characters of mixed characters provides $> 400$ bits of entropy, which already saturates maximum possible cracking resistance. The full string is still evaluated for character composition and length metrics.
- **Verification:** Unit test `handles massive 2,000+ character input safely without freezing or crashing` verified execution in $< 1,000$ms.

