import React, { useState } from 'react';
import { EntropyAnalysis, CharacterComposition } from '../../types/analyzer';
import { Zap, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export interface EntropyGaugeProps {
  entropy: EntropyAnalysis;
  composition: CharacterComposition;
}

export const EntropyGauge: React.FC<EntropyGaugeProps> = ({ entropy, composition }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const getRatingBadge = (rating: EntropyAnalysis['entropyRating']) => {
    switch (rating) {
      case 'Very High':
        return <Badge variant="cyan">Very High Entropy (&ge; 100 bits)</Badge>;
      case 'High':
        return <Badge variant="emerald">High Entropy (80–99 bits)</Badge>;
      case 'Moderate':
        return <Badge variant="amber">Moderate Entropy (60–79 bits)</Badge>;
      case 'Low':
        return <Badge variant="amber">Low Entropy (36–59 bits)</Badge>;
      case 'Critical':
        return <Badge variant="rose">Critical (&lt; 36 bits)</Badge>;
    }
  };

  const theoreticalMax = Math.max(128, entropy.theoreticalEntropyBits, entropy.effectiveEntropyBits);
  const effectivePct = Math.min(100, (entropy.effectiveEntropyBits / theoreticalMax) * 100);
  const theoreticalPct = Math.min(100, (entropy.theoreticalEntropyBits / theoreticalMax) * 100);
  const shannonPct = Math.min(100, (entropy.shannonEntropyBits / theoreticalMax) * 100);

  const entropyGap = Math.max(0, entropy.theoreticalEntropyBits - entropy.effectiveEntropyBits);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Entropy Analysis</span>
              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-slate-400 hover:text-cyan-400 text-xs transition-colors"
                title="Explain entropy differences"
                aria-label="Toggle entropy mathematical explanation"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </h3>
            <p className="text-xs text-slate-400">
              Theoretical search space vs realistic dictionary and pattern resistance
            </p>
          </div>
        </div>
        <div>{getRatingBadge(entropy.entropyRating)}</div>
      </div>

      {/* Visual Entropy Comparison Bars */}
      <div className="space-y-3 pt-2">
        {/* Effective Entropy Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <strong>Effective Realistic Entropy</strong>
              <span className="text-slate-500 font-normal">(log2(guesses))</span>
            </span>
            <span className="font-mono text-cyan-400 font-bold">
              {entropy.effectiveEntropyBits} bits
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-300"
              style={{ width: `${Math.max(2, effectivePct)}%` }}
            />
          </div>
        </div>

        {/* Shannon Entropy Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span>Shannon Information Density</span>
              <span className="text-slate-500 font-normal">(-sum(p*log2(p)))</span>
            </span>
            <span className="font-mono text-purple-300 font-medium">
              {entropy.shannonEntropyBits} bits
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-purple-500/80 transition-all duration-300"
              style={{ width: `${Math.max(2, shannonPct)}%` }}
            />
          </div>
        </div>

        {/* Theoretical Hartley Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
              <span>Theoretical Hartley Bound</span>
              <span className="text-slate-500 font-normal">(L × log2(R))</span>
            </span>
            <span className="font-mono text-slate-300 font-medium">
              {entropy.theoreticalEntropyBits} bits
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-slate-600 transition-all duration-300"
              style={{ width: `${Math.max(2, theoreticalPct)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Gap Callout */}
      {entropyGap > 15 && (
        <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-300">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-amber-200">
              Entropy Deficit: {entropyGap.toFixed(1)} bits lost to predictability.
            </strong>
            <p className="text-amber-400/90 mt-0.5">
              Although this password has a theoretical search space of {entropy.theoreticalEntropyBits} bits,
              patterns, words, or predictable substitutions allow automated crackers to test it in far fewer guesses
              (equivalent to only {entropy.effectiveEntropyBits} bits of true random entropy).
            </p>
          </div>
        </div>
      )}

      {entropyGap <= 15 && entropy.effectiveEntropyBits >= 80 && (
        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-2.5 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-emerald-200">
              High True Entropy ({entropy.effectiveEntropyBits} bits)
            </strong>
            <p className="text-emerald-400/90 mt-0.5">
              No significant dictionary words or predictable patterns were found. This password approaches theoretical randomness.
            </p>
          </div>
        </div>
      )}

      {/* Educational Explanation Accordion */}
      {showExplanation && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2.5 animate-in fade-in-50">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">
            Mathematical Entropy Principles
          </h4>
          <p>
            <strong>1. Theoretical Hartley Entropy ($L \log_2 R$):</strong> Assumes an attacker must brute-force uniformly across all possible combinations of length $L$ drawn from pool size $R$ ({composition.poolSize} characters). This is purely a theoretical ceiling.
          </p>
          <p>
            <strong>2. Shannon Entropy ($-\sum p(x)\log_2 p(x)$):</strong> Quantifies the internal unpredictability of the character distribution within the password itself, penalizing repeated characters.
          </p>
          <p>
            <strong>3. Effective Realistic Entropy (log2(guesses)):</strong> Modern password crackers (Hashcat, John the Ripper) don&apos;t guess randomly. They use dictionaries, keyboard sequences, common dates, and l33t replacement rules. Effective entropy reflects the actual log2 difficulty calculated by zxcvbn&apos;s pattern-matching graph algorithms.
          </p>
        </div>
      )}
    </div>
  );
};
