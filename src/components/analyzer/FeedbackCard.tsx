import React from 'react';
import { AlertCircle, Lightbulb, CheckCircle2 } from 'lucide-react';

export interface FeedbackCardProps {
  warning?: string;
  suggestions: string[];
  score: number;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ warning, suggestions, score }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Security Guidance & Hardening Steps</h3>
          <p className="text-xs text-slate-400">
            Tailored suggestions to elevate password resilience
          </p>
        </div>
      </div>

      {warning && (
        <div className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-800/80 flex items-start gap-2.5 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-rose-200">Security Warning:</strong>
            <p className="mt-0.5 text-rose-300/90 leading-relaxed">{warning}</p>
          </div>
        </div>
      )}

      {suggestions.length > 0 ? (
        <ul className="space-y-2 pt-1">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{suggestion}</span>
            </li>
          ))}
        </ul>
      ) : score >= 3 ? (
        <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/70 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>This password satisfies modern security criteria and shows high resistance to brute force.</span>
        </div>
      ) : null}
    </div>
  );
};
