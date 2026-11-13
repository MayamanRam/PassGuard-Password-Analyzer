import React from 'react';
import { PasswordAnalysisResult } from '../../types/analyzer';
import { StrengthMeter } from '../common/StrengthMeter';
import { Badge } from '../common/Badge';
import { Zap, Hash, Compass, Clock } from 'lucide-react';

export interface StrengthScorecardProps {
  analysis: PasswordAnalysisResult;
}

export const StrengthScorecard: React.FC<StrengthScorecardProps> = ({ analysis }) => {
  const formatGuesses = (guesses: number) => {
    if (guesses >= 1e12) return `${(guesses / 1e12).toFixed(1)} Trillion`;
    if (guesses >= 1e9) return `${(guesses / 1e9).toFixed(1)} Billion`;
    if (guesses >= 1e6) return `${(guesses / 1e6).toFixed(1)} Million`;
    if (guesses >= 1e3) return `${(guesses / 1e3).toFixed(1)} Thousand`;
    return guesses.toLocaleString();
  };

  const getScoreBadgeVariant = (score: number) => {
    switch (score) {
      case 0: return 'rose';
      case 1: return 'amber';
      case 2: return 'amber';
      case 3: return 'emerald';
      case 4: return 'cyan';
      default: return 'slate';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs text-slate-400 font-medium">Evaluation Result</span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{analysis.label}</span>
            <Badge variant={getScoreBadgeVariant(analysis.score)} size="sm">
              Score {analysis.score} / 4
            </Badge>
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-medium">Effective Entropy</span>
          <div className="text-xl font-mono font-bold text-cyan-400 flex items-center justify-end gap-1">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>{analysis.entropy.effectiveEntropyBits}</span>
            <span className="text-xs font-normal text-slate-400">bits</span>
          </div>
        </div>
      </div>

      {/* Visual meter */}
      <StrengthMeter score={analysis.score} label={analysis.label} showIcon={false} />

      {/* Metric tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Guesses Space</span>
          </div>
          <div className="font-mono text-sm font-semibold text-slate-100 truncate" title={`10^${analysis.guessesLog10}`}>
            {formatGuesses(analysis.guesses)}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            ~10^{analysis.guessesLog10} tests
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Hash className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pool Size (R)</span>
          </div>
          <div className="font-mono text-sm font-semibold text-slate-100">
            {analysis.composition.poolSize} <span className="text-xs text-slate-400 font-normal">chars</span>
          </div>
          <div className="text-[10px] text-slate-500">
            {analysis.composition.uniqueCount} unique in string
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Theoretical</span>
          </div>
          <div className="font-mono text-sm font-semibold text-slate-100">
            {analysis.entropy.theoreticalEntropyBits} <span className="text-xs text-slate-400 font-normal">bits</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            L × log2(R)
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Fast GPU Crack</span>
          </div>
          <div className="font-mono text-sm font-semibold text-slate-100 truncate" title={analysis.crackTimes.offlineFastHash}>
            {analysis.crackTimes.offlineFastHash}
          </div>
          <div className="text-[10px] text-slate-500">
            @ 100B guesses/sec
          </div>
        </div>
      </div>
    </div>
  );
};
