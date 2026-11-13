import React from 'react';
import { Shield, Lock, Award, CheckCircle2, Cpu, EyeOff, FileText, Code2 } from 'lucide-react';
import { Card } from '../components/common/Card';

export const About: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            About PassGuard — Engineering & Cryptography Audit
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Technical architecture, zero-knowledge privacy boundaries, and cryptographic verification.
        </p>
      </div>

      {/* Mission & Purpose */}
      <Card variant="glow-cyan">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Project Purpose & Portfolio Scope</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            PassGuard was engineered as a production-grade, defensive cybersecurity tool for a developer and security portfolio. The objective is to replace simplistic, naive password meters with mathematical rigor, realistic threat modeling, and absolute privacy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 space-y-1">
              <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>100% Client-Side</span>
              </span>
              <p className="text-slate-400 text-[11px]">
                Operates entirely in browser memory. Fully functional offline after initial load.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 space-y-1">
              <span className="font-semibold text-purple-300 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>Web Crypto CSPRNG</span>
              </span>
              <p className="text-slate-400 text-[11px]">
                Eliminates modulo bias through rejection sampling. Zero reliance on <code>Math.random()</code>.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 space-y-1">
              <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <EyeOff className="w-4 h-4 text-emerald-400" />
                <span>k-Anonymity Verified</span>
              </span>
              <p className="text-slate-400 text-[11px]">
                HIBP breach checks send only a 5-char SHA-1 prefix. No password or full hash ever leaves client memory.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Technical Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Frontend & Cryptographic Stack</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>React 18 &amp; Vite:</strong> High-performance modern web framework with zero server-side state.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>TypeScript (Strict Mode):</strong> Full static typing across all cryptographic algorithms and data models.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Tailwind CSS:</strong> Cyber-themed accessible design system targeting WCAG 2.2 AA standards.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>@zxcvbn-ts/core:</strong> Modern TypeScript port of Carnegie Mellon / Dropbox zxcvbn pattern matching.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>EFF Diceware Wordlist:</strong> 7,776 / 1,296 curated phonetically distinct English words for passphrases.</span>
              </li>
            </ul>
          </div>
        </Card>

        <Card variant="default">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Privacy Architecture & Boundaries</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero Storage:</strong> Passwords are never written to <code>localStorage</code>, <code>sessionStorage</code>, IndexedDB, or cookies.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero Telemetry:</strong> No analytics trackers, external advertising scripts, or third-party telemetry.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Clean Lifecycle:</strong> Password input states are scrubbed from memory immediately upon component unmount or clear.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Content Security Policy:</strong> Restrictive CSP rules disabling unsafe inline eval and unauthorized external hosts.</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Standards & Guidelines */}
      <Card variant="subtle">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Standards & Framework Alignment</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-cyan-300 font-semibold block">NIST SP 800-63B</strong>
              <p className="text-slate-400 text-[11px]">
                Adheres to NIST guidelines: prioritizes length over arbitrary character requirements, discourages forced frequent expiration, and checks against compromised credentials.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-purple-300 font-semibold block">OWASP ASVS &amp; Top 10</strong>
              <p className="text-slate-400 text-[11px]">
                Follows OWASP Application Security Verification Standard guidelines for cryptographic randomness and credential security verification.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-emerald-300 font-semibold block">WCAG 2.2 AA</strong>
              <p className="text-slate-400 text-[11px]">
                Accessible color contrast ratios, visible focus rings, ARIA progress bars, semantic HTML, and full keyboard navigation.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
