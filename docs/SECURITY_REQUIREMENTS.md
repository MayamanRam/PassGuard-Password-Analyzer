# Security Requirements (SECURITY_REQUIREMENTS.md)
## PassGuard — Cryptographic & Application Security Controls

---

## 1. Compliance & Security Frameworks

PassGuard implements defensive controls informed by:
- **NIST SP 800-63B:** Digital Identity Guidelines — Authentication and Lifecycle Management.
- **OWASP Application Security Verification Standard (ASVS) v4.0.3:** Level 2 verification requirements for authentication and cryptography.
- **OWASP Top 10 Web Application Vulnerabilities:** Proactive mitigation of Injection, Cryptographic Failures, and Security Misconfiguration.

---

## 2. Cryptographic Security Standards

### 2.1 Cryptographically Secure Pseudo-Random Number Generation (CSPRNG)
- **Requirement:** PassGuard must never invoke `Math.random()` for key, password, or salt generation.
- **Implementation:** All random bytes must originate from `window.crypto.getRandomValues()`, sourcing entropy directly from the underlying operating system kernel (e.g., `/dev/urandom`, Windows CNG `BCryptGenRandom`, macOS `arc4random`).
- **Modulo Bias:** PassGuard must apply unbiased rejection sampling to guarantee equal probability across all character set items.

### 2.2 Hash Algorithm Implementation
- **Requirement:** Password hash generation for breach verification must execute locally on the client.
- **Implementation:** Web Crypto `crypto.subtle.digest('SHA-1', data)` generates the 160-bit hash.
- **Privacy Boundary:** The full 40-character hex string is never persisted or transmitted.

---

## 3. Client-Side Privacy Boundary & Data Isolation

| Threat Vector | Security Requirement | Architectural Control |
|---|---|---|
| **Secret Persistence** | Secrets must not outlive the user interaction session. | PassGuard writes 0 bytes to `localStorage`, `sessionStorage`, IndexedDB, or `document.cookie`. States are cleaned upon component unmount. |
| **Telemetry Leakage** | Passwords must never leak into analytics or logging services. | Zero third-party analytics SDKs (Google Analytics, Mixpanel, Sentry) are included. `console.log` statements are stripped in production builds. |
| **URL Leakage** | Sensitive inputs must never appear in URL query strings or fragments. | Pure reactive in-memory state routing; no URL query reflection. |
| **Cross-Site Scripting (XSS)** | Attacker-controlled text must not execute in DOM. | React automatically escapes string bindings. No use of `dangerouslySetInnerHTML`, `eval()`, or `new Function()`. |
| **Clipboard Privacy** | Clipboard writes must require explicit user intent. | Clipboard API is invoked only on deliberate user clicks on `CopyButton`. Clipboard limitations are explicitly documented for the user. |

---

## 4. Content Security Policy (CSP) & HTTP Headers

For static hosting (Nginx, Netlify, Cloudflare Pages, AWS S3/CloudFront), the following HTTP headers must be deployed:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.pwnedpasswords.com; img-src 'self' data:; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: no-referrer
Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

