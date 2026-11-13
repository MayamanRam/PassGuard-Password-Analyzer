import React, { useState } from 'react';
import { Shield, Lock, EyeOff, X, Info } from 'lucide-react';

export const PrivacyNoticeBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-purple-950/40 border-b border-cyan-500/20 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <div className="flex items-center gap-1.5 font-medium">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-300 font-semibold">100% Client-Side Privacy:</span>
              <span className="hidden sm:inline text-slate-300">
                Your password is analyzed locally in your browser. PassGuard does not store or transmit the password you enter.
              </span>
              <span className="sm:hidden text-slate-300">
                Analyzed locally in your browser. Zero backend storage.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors flex items-center gap-1"
            >
              <Info className="w-3 h-3" />
              <span>How it works</span>
            </button>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss privacy banner"
              className="text-slate-400 hover:text-slate-200 p-0.5 rounded transition-colors ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Architecture Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50"
        >
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 id="privacy-dialog-title" className="text-lg font-bold text-white">
                  PassGuard Privacy Architecture
                </h3>
                <p className="text-xs text-cyan-400">Security Engineering & Zero-Knowledge Guarantee</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-1">
                  <EyeOff className="w-4 h-4" />
                  <span>No Backend Transmission</span>
                </div>
                <p className="text-slate-400">
                  Password strength analysis and entropy estimation execute entirely via WebAssembly/JavaScript inside your client browser. There is no backend server receiving keystrokes or password strings.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-purple-300 font-semibold mb-1">
                  <Lock className="w-4 h-4" />
                  <span>Zero Persistent Storage</span>
                </div>
                <p className="text-slate-400">
                  PassGuard never writes to <code>localStorage</code>, <code>sessionStorage</code>, IndexedDB, or cookies. Passwords exist only in temporary reactive memory and are wiped when you clear the input or refresh.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1">
                  <Shield className="w-4 h-4" />
                  <span>k-Anonymity Breach Checking</span>
                </div>
                <p className="text-slate-400">
                  If you check for data breaches, PassGuard computes the SHA-1 hash locally and sends ONLY the first 5 characters (the prefix). Over 500+ different passwords share this same prefix, making it mathematically impossible for external parties to know which password you checked.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
              >
                Understood & Verified
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
