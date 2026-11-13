import React from 'react';
import { PatternMatch } from '../../types/analyzer';
import { Fingerprint, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export interface PatternDetectorProps {
  patterns: PatternMatch[];
  passwordLength: number;
}

export const PatternDetector: React.FC<PatternDetectorProps> = ({ patterns, passwordLength }) => {
  const getPatternBadge = (type: PatternMatch['type']) => {
    switch (type) {
      case 'repeat':
        return <Badge variant="rose" size="sm">Repeated Chars</Badge>;
      case 'sequence':
        return <Badge variant="amber" size="sm">Sequential Run</Badge>;
      case 'spatial':
        return <Badge variant="amber" size="sm">Keyboard Walk</Badge>;
      case 'dictionary':
        return <Badge variant="purple" size="sm">Dictionary Word</Badge>;
      case 'l33t':
        return <Badge variant="cyan" size="sm">L33t Substitution</Badge>;
      case 'date':
        return <Badge variant="rose" size="sm">Calendar Year</Badge>;
      case 'common':
        return <Badge variant="rose" size="sm">Top Breached</Badge>;
      default:
        return <Badge variant="slate" size="sm">Pattern</Badge>;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <Fingerprint className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Pattern Recognition & Predictability</h3>
            <p className="text-xs text-slate-400">
              Heuristic identification of cracking-engine targets
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-400">
          {patterns.length} pattern{patterns.length === 1 ? '' : 's'} flagged
        </span>
      </div>

      {patterns.length === 0 ? (
        <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <strong className="text-emerald-300 font-semibold">
              {passwordLength === 0 ? 'No input provided' : 'Zero Predictable Patterns Detected!'}
            </strong>
            <p className="text-slate-400 mt-0.5">
              {passwordLength === 0
                ? 'Type or paste a password above to scan for predictable sequences.'
                : 'No repeated characters, keyboard walks, simple substitutions, or dictionary words were identified.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2 pt-1">
          {patterns.map((item, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-200">{item.pattern}</span>
                    {getPatternBadge(item.type)}
                    <span className="font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                      &quot;{item.matchedText}&quot;
                    </span>
                  </div>
                  <p className="text-slate-400 mt-1 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

