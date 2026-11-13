import React from 'react';
import { Shield, Lock, CheckCircle2, Award } from 'lucide-react';
import { ActiveTab } from '../../types/breach';

export interface FooterProps {
  onTabChange: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 mt-16 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/80">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold text-white text-base">PassGuard</span>
              <span className="text-cyan-400 font-mono text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                CLIENT-SIDE SECURE
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A professional cybersecurity password security analyzer and cryptographically secure generator. Engineered with mathematical rigor, privacy-preserving k-anonymity breach checking, and unbiased random sampling.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Server Telemetry</span>
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Web Crypto API</span>
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <Award className="w-3.5 h-3.5" />
                <span>WCAG 2.2 AA Accessible</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Tools & Engine
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onTabChange('analyzer')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Password Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('generator')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Password Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('passphrase')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Passphrase Generator (Diceware)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('guide')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Security Guide (12 Vectors)
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Architecture */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Standards & Compliance
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>NIST SP 800-63B Guidelines</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>EFF Diceware Wordlist</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>zxcvbn Entropy Model</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>HIBP k-Anonymity Range API</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} PassGuard — Built for Developer & Cybersecurity Portfolio.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onTabChange('about')}
              className="hover:text-slate-300 transition-colors"
            >
              Cryptographic Verification
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onTabChange('guide')}
              className="hover:text-slate-300 transition-colors"
            >
              Password Attacks Guide
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

