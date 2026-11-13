import React from 'react';
import { PasswordGeneratorOptions } from '../../types/generator';
import { Sliders, RefreshCw, KeyRound } from 'lucide-react';
import { Button } from '../common/Button';

export interface GeneratorControlsProps {
  options: PasswordGeneratorOptions;
  onChange: (options: PasswordGeneratorOptions) => void;
  onGenerate: () => void;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  options,
  onChange,
  onGenerate,
}) => {
  const updateOption = <K extends keyof PasswordGeneratorOptions>(
    key: K,
    val: PasswordGeneratorOptions[K]
  ) => {
    onChange({ ...options, [key]: val });
  };

  const isAtLeastOneCharset =
    options.includeUppercase ||
    options.includeLowercase ||
    options.includeNumbers ||
    options.includeSymbols;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Generator Parameters</h3>
            <p className="text-xs text-slate-400">
              Customize entropy parameters & character sets
            </p>
          </div>
        </div>

        <Button
          onClick={onGenerate}
          disabled={!isAtLeastOneCharset}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          size="sm"
          variant="primary"
        >
          Generate New
        </Button>
      </div>

      {/* Length Slider & Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="gen-length-slider" className="font-semibold text-slate-300">
            Password Length:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="gen-length-input"
              min={8}
              max={128}
              value={options.length}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) {
                  updateOption('length', Math.max(8, Math.min(128, val)));
                }
              }}
              className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center font-mono text-cyan-400 font-bold focus:outline-none focus:border-cyan-400"
            />
            <span className="text-slate-400">characters</span>
          </div>
        </div>

        <input
          id="gen-length-slider"
          type="range"
          min={8}
          max={128}
          value={options.length}
          onChange={(e) => updateOption('length', parseInt(e.target.value, 10))}
          className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>8 chars (min)</span>
          <span>16 chars (standard)</span>
          <span>32 chars (recommended)</span>
          <span>128 chars (max)</span>
        </div>
      </div>

      {/* Character Set Toggles */}
      <div className="space-y-2.5 pt-1">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Character Classes
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={(e) => updateOption('includeUppercase', e.target.checked)}
              className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
            />
            <div>
              <span className="font-medium text-slate-200">Uppercase Letters</span>
              <span className="text-slate-500 block text-[11px] font-mono">A-Z (26 chars)</span>
            </div>
          </label>

          <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.includeLowercase}
              onChange={(e) => updateOption('includeLowercase', e.target.checked)}
              className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
            />
            <div>
              <span className="font-medium text-slate-200">Lowercase Letters</span>
              <span className="text-slate-500 block text-[11px] font-mono">a-z (26 chars)</span>
            </div>
          </label>

          <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={(e) => updateOption('includeNumbers', e.target.checked)}
              className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
            />
            <div>
              <span className="font-medium text-slate-200">Numbers</span>
              <span className="text-slate-500 block text-[11px] font-mono">0-9 (10 digits)</span>
            </div>
          </label>

          <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={(e) => updateOption('includeSymbols', e.target.checked)}
              className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
            />
            <div>
              <span className="font-medium text-slate-200">Special Symbols</span>
              <span className="text-slate-500 block text-[11px] font-mono">!@#$%^&*...</span>
            </div>
          </label>
        </div>
      </div>

      {/* Advanced Exclusion Options */}
      <div className="space-y-2.5 pt-1 border-t border-slate-800/80">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Filters & Guarantees
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.excludeAmbiguous}
              onChange={(e) => updateOption('excludeAmbiguous', e.target.checked)}
              className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
            />
            <div>
              <span className="font-medium text-slate-300">Exclude Ambiguous</span>
              <span className="text-slate-500 block text-[10px] font-mono">Avoid 0, O, 1, l, I</span>
            </div>
          </label>

          <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.excludeSimilar}
              onChange={(e) => updateOption('excludeSimilar', e.target.checked)}
              className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
            />
            <div>
              <span className="font-medium text-slate-300">Exclude Brackets/Quotes</span>
              <span className="text-slate-500 block text-[10px] font-mono">Avoid &#123;&#125; [] &quot; &apos;</span>
            </div>
          </label>

          <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.requireAllSelected}
              onChange={(e) => updateOption('requireAllSelected', e.target.checked)}
              className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
            />
            <div>
              <span className="font-medium text-slate-300">Enforce All Selected</span>
              <span className="text-slate-500 block text-[10px]">Guarantees &ge;1 from each</span>
            </div>
          </label>
        </div>
      </div>

      {/* Batch Count */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
        <label htmlFor="gen-batch-count" className="font-semibold text-slate-300 flex items-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
          <span>Batch Quantity:</span>
        </label>
        <div className="flex items-center gap-2">
          {[1, 5, 10, 20].map((num) => (
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
