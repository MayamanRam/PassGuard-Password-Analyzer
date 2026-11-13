import React from 'react';
import { CharacterComposition } from '../../types/analyzer';
import { Check, X, Layers } from 'lucide-react';
import { clsx } from 'clsx';

export interface CompositionVisualizerProps {
  composition: CharacterComposition;
}

export const CompositionVisualizer: React.FC<CompositionVisualizerProps> = ({ composition }) => {
  const items = [
    {
      label: 'Length (14+ recommended)',
      count: composition.length,
      isValid: composition.length >= 14,
      detail: `${composition.length} chars`,
    },
    {
      label: 'Uppercase Letters (A-Z)',
      count: composition.uppercase,
      isValid: composition.uppercase > 0,
      detail: `${composition.uppercase} chars`,
    },
    {
      label: 'Lowercase Letters (a-z)',
      count: composition.lowercase,
      isValid: composition.lowercase > 0,
      detail: `${composition.lowercase} chars`,
    },
    {
      label: 'Numbers (0-9)',
      count: composition.numbers,
      isValid: composition.numbers > 0,
      detail: `${composition.numbers} digits`,
    },
    {
      label: 'Special Symbols (!@#$...)',
      count: composition.symbols,
      isValid: composition.symbols > 0,
      detail: `${composition.symbols} symbols`,
    },
    {
      label: 'Character Diversity',
      count: composition.uniqueCount,
      isValid: composition.uniqueCount >= Math.min(composition.length, 8),
      detail: `${composition.uniqueCount} unique`,
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Character Composition & Variety</h3>
          <p className="text-xs text-slate-400">
            Pool size: <strong className="text-cyan-400 font-mono">{composition.poolSize}</strong> character sets active
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              'flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors',
              item.isValid
                ? 'bg-slate-950/70 border-emerald-500/30 text-slate-200'
                : 'bg-slate-950/40 border-slate-800 text-slate-400'
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  'flex items-center justify-center w-4 h-4 rounded-full text-[10px]',
                  item.isValid
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-800 text-slate-500'
                )}
              >
                {item.isValid ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              </span>
              <span>{item.label}</span>
            </div>
            <span className={clsx('font-mono font-semibold', item.isValid ? 'text-emerald-400' : 'text-slate-500')}>
              {item.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
