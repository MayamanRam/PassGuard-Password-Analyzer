import React from 'react';
import { PassphraseOptions, PassphraseSeparator, PassphraseCapitalization } from '../../types/passphrase';
import { Sliders, RefreshCw, KeyRound } from 'lucide-react';
import { Button } from '../common/Button';

export interface PassphraseControlsProps {
  options: PassphraseOptions;
  onChange: (options: PassphraseOptions) => void;
  onGenerate: () => void;
}

export const PassphraseControls: React.FC<PassphraseControlsProps> = ({
  options,
  onChange,
  onGenerate,
}) => {
  const updateOption = <K extends keyof PassphraseOptions>(
    key: K,
    val: PassphraseOptions[K]
  ) => {
    onChange({ ...options, [key]: val });
  };

  const separators: { label: string; value: PassphraseSeparator }[] = [
    { label: 'Hyphen (-)', value: '-' },
    { label: 'Underscore (_)', value: '_' },
    { label: 'Period (.)', value: '.' },
    { label: 'Space ( )', value: ' ' },
    { label: 'Slash (/)', value: '/' },
    { label: 'Hash (#)', value: '#' },
    { label: 'Dollar ($)', value: '$' },
    { label: 'Random', value: 'random' },
    { label: 'None', value: '' },
  ];

  const capitalizations: { label: string; value: PassphraseCapitalization }[] = [
    { label: 'TitleCase', value: 'titlecase' },
    { label: 'lowercase', value: 'lowercase' },
    { label: 'UPPERCASE', value: 'uppercase' },
    { label: 'Random', value: 'random' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Passphrase Parameters</h3>
            <p className="text-xs text-slate-400">
              Configure Diceware word count, separators & capitalization
            </p>
          </div>
        </div>

        <Button
          onClick={onGenerate}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          size="sm"
          variant="primary"
        >
          Generate Passphrase
        </Button>
      </div>

      {/* Word Count Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="passphrase-word-count-slider" className="font-semibold text-slate-300">
            Word Count:
          </label>
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-400 font-bold text-base">
              {options.wordCount}
            </span>
            <span className="text-slate-400">words</span>
          </div>
        </div>

        <input
          id="passphrase-word-count-slider"
          type="range"
          min={3}
          max={10}
          value={options.wordCount}
          onChange={(e) => updateOption('wordCount', parseInt(e.target.value, 10))}
          className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>3 words (~35 bits)</span>
          <span>4 words (~52 bits - Good)</span>
          <span>5 words (~65 bits - High)</span>
          <span>10 words (Fortress)</span>
        </div>
      </div>

      {/* Separator Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Word Separator
        </label>
        <div className="flex flex-wrap gap-2">
          {separators.map((sep) => (
            <button
              key={sep.value}
              type="button"
              onClick={() => updateOption('separator', sep.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                options.separator === sep.value
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                  : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {sep.label}
            </button>
          ))}
        </div>
      </div>

      {/* Capitalization Style */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Capitalization
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {capitalizations.map((cap) => (
            <button
              key={cap.value}
              type="button"
              onClick={() => updateOption('capitalization', cap.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                options.capitalization === cap.value
                  ? 'bg-purple-600 text-white font-bold border-purple-400'
                  : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cap.label}
            </button>
          ))}
        </div>
      </div>

      {/* Number Embedding Options */}
      <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-3">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={options.includeNumber}
            onChange={(e) => updateOption('includeNumber', e.target.checked)}
            className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
          />
          <span className="text-xs font-semibold text-slate-200">
            Include Random Number (Elevates Entropy)
          </span>
        </label>

        {options.includeNumber && (
          <div className="flex items-center gap-3 pl-6 text-xs text-slate-400">
            <span>Position:</span>
            {(['end', 'start', 'random'] as const).map((pos) => (
              <label key={pos} className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="numberPosition"
                  checked={options.numberPosition === pos}
                  onChange={() => updateOption('numberPosition', pos)}
                  className="accent-cyan-400 cursor-pointer"
                />
                <span className="capitalize">{pos}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Batch Count */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
        <label htmlFor="passphrase-batch-count" className="font-semibold text-slate-300 flex items-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
          <span>Batch Quantity:</span>
        </label>
        <div className="flex items-center gap-2">
          {[1, 3, 5, 10].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateOption('count', num)}
              className={`px-2.5 py-1 rounded font-mono text-xs transition-colors ${
                options.count === num
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
