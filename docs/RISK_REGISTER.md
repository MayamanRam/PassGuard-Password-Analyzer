# Risk Register (RISK_REGISTER.md)
## PassGuard — Cybersecurity Risk Assessment & Treatment Log

---

## 1. Risk Assessment Methodology

Risks are scored using standard Qualitative Risk Assessment:
- **Likelihood:** Low (1), Medium (2), High (3)
- **Impact:** Low (1), Medium (2), Critical (3)
- **Risk Score:** Likelihood $\times$ Impact (1–9): Low (1–2), Medium (3–4), High (6–9)

---

## 2. Risk Log & Mitigation Treatments

| Risk ID | Threat Scenario | Pre-Score | Mitigation / Architectural Treatment | Post-Score | Status |
|---|---|---|---|---|---|
| **RSK-01** | **Eavesdropping on Breach Checks:** External snooper captures checked password. | High (9) | Implemented k-Anonymity model. Only 5-character SHA-1 prefix is sent. Over 500 passwords share each prefix. Suffix matching is performed in client browser memory. | Low (2) | **Mitigated** |
| **RSK-02** | **Predictable PRNG Key Recovery:** Generated passwords cracked via state reconstruction of `Math.random()`. | High (9) | Strictly banned `Math.random()`. Implemented Web Crypto API CSPRNG (`crypto.getRandomValues`) with rejection sampling to eliminate modulo bias. | Low (1) | **Mitigated** |
| **RSK-03** | **Persistent Secret Remanence:** Passwords found in browser cache or web storage by malicious scripts. | High (6) | Zero use of `localStorage`, `sessionStorage`, or cookies. Password input states are scrubbed on component unmount and reset. | Low (1) | **Mitigated** |
| **RSK-04** | **ReDoS / Algorithmic Complexity DoS:** Malicious or oversized input freezes browser thread during graph matching. | Medium (4) | Graph evaluation window capped at 72 characters (sufficient for full entropy saturation). Tested with 2,000+ chars executing in $< 1$s. | Low (1) | **Mitigated** |
| **RSK-05** | **Third-Party CDN Tampering:** Vulnerability injected via compromised external CDN script tags. | High (9) | Zero external runtime script tags or CDNs. All libraries are bundled locally via Vite during compilation. | Low (1) | **Mitigated** |
| **RSK-06** | **Misleading Crack Time Perception:** Users believe cracking times represent absolute guarantees rather than estimates. | Medium (4) | Educational disclaimer explaining threat models, GPU speeds (100B/s), and online lockout assumptions. Clear hardware disclosures provided. | Low (2) | **Mitigated** |
| **RSK-07** | **Host-Level Clipboard History:** Host OS clipboard history utility records copied passwords. | Medium (4) | UI warning explaining operating system clipboard privacy limitations; user advised to paste directly into encrypted password manager. | Low (2) | **Accepted** |
| **RSK-08** | **Host-Level Kernel Malware / Keyloggers:** Malware running with administrator privileges on user workstation logs keys. | High (9) | Documented as an unmitigable host boundary condition. Web browsers cannot defend against ring-0 kernel rootkits. | Medium (3) | **Accepted** |
