# Deployment Guide (DEPLOYMENT_GUIDE.md)
## PassGuard — Production Build, Static Hosting & Security Headers

---

## 1. Production Build Instructions

PassGuard compiles to an optimized, static client-side single page application:

### Step 1: Clean Dependency Installation
```bash
cd 02-PassGuard-Password-Analyzer
npm install
```

### Step 2: Run Automated Tests & Type Checking
```bash
npm test
npx tsc --noEmit
```

### Step 3: Compile Production Assets
```bash
npm run build
```
This command compiles TypeScript via `tsc` and outputs minified static assets to the `dist/` directory:
- `dist/index.html` (Entry HTML document with security meta tags)
- `dist/assets/index-[hash].css` (Tailwind compiled stylesheet)
- `dist/assets/index-[hash].js` (Minified JavaScript bundle including offline dictionaries)
- `dist/shield.svg` (Brand favicon)

---

## 2. Static Hosting Deployment Targets

PassGuard requires no server runtime or database; it can be hosted on any static site provider or web server.

### 2.1 Option A: Nginx Web Server Configuration
Create an Nginx server block with strict HTTP security headers:

```nginx
server {
    listen 443 ssl http2;
    server_name passguard.yourdomain.com;

    root /var/www/passguard/dist;
    index index.html;

    # TLS Certificates
    ssl_certificate /etc/letsencrypt/live/passguard.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/passguard.yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.pwnedpasswords.com; img-src 'self' data:; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "no-referrer" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Static file caching
    location ~* \.(?:css|js|svg|png|jpg|ico|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 2.2 Option B: Cloudflare Pages / Netlify / Vercel
Create a `public/_headers` file for Netlify / Cloudflare Pages:

```http
/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.pwnedpasswords.com; img-src 'self' data:; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: no-referrer
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

---

## 3. Post-Deployment Verification Checklist

1. [ ] Verify HTTPS redirection is active and TLS certificate is valid.
2. [ ] Test Content Security Policy using [Mozilla Observatory](https://observatory.mozilla.org/) or [SecurityHeaders.com](https://securityheaders.com/).
3. [ ] Confirm that no errors occur when navigating between all 6 views.
4. [ ] Disconnect internet connection and verify that Password Analyzer, Password Generator, and Passphrase Generator function 100% offline.
5. [ ] Reconnect internet and verify that clicking "Check Known Breaches" returns results without CSP violations.
