import React, { useState } from 'react';
import { Shield, ArrowRight, KeyRound, Sparkles, Lock, CheckCircle2 } from 'lucide-react';
import { ActiveTab } from '../../types/breach';
import { analyzePassword } from '../../services/passwordAnalyzer';
import { StrengthMeter } from '../common/StrengthMeter';

export interface QuickAnalyzeHeroProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const QuickAnalyzeHero: React.FC<QuickAnalyzeHeroProps> = ({ onNavigate }) => {
  const [quickInput, setQuickInput] = useState('');
  const quickAnalysis = analyzePassword(quickInput);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
      {/* Background cyber accent glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Professional Cybersecurity Portfolio Project</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">NIST SP 800-63B Aligned</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Understand. Strengthen.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
              Protect.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            PassGuard evaluates true cryptographic password resistance using zxcvbn pattern matching, Shannon entropy, and k-anonymity breach verification—executed 100% locally in your browser.
          </p>
        </div>

        {/* Quick Test Bar */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant Local Strength Test</span>
            </span>
            <span className="text-slate-400 font-normal text-[11px] flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Never leaves your browser</span>
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Test a sample password here (e.g. correct-horse-battery-staple)..."
              autoComplete="off"
              spellCheck="false"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm font-mono text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {quickInput.length > 0 && (
            <div className="space-y-2 pt-1 animate-in fade-in-50">
              <StrengthMeter score={quickAnalysis.score} label={quickAnalysis.label} />
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1">
                <span>
                  Effective Entropy:{' '}
                  <strong className="text-cyan-400 font-mono">
                    {quickAnalysis.entropy.effectiveEntropyBits} bits
                  </strong>
                </span>
                <span>
                  Offline GPU Effort:{' '}
                  <strong className="text-slate-200 font-mono">
                    {quickAnalysis.crackTimes.offlineFastHash}
                  </strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('analyzer')}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>Open Deep Analyzer</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('generator')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <KeyRound className="w-4 h-4 text-purple-400" />
            <span>Generate Password</span>
          </button>

          <button
            onClick={() => onNavigate('passphrase')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Diceware Passphrase</span>
          </button>
        </div>

        {/* Security Trust Badges */}
        <div className="flex flex-wrap items-center gap-5 pt-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Zero Remote Telemetry</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Unbiased Rejection Sampling</span>
          </div>
          <div className="flex items-center gap-1.5 text-purple-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>k-Anonymity HIBP Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};
