import React, { useState } from 'react';
import { Eye, EyeOff, X, KeyRound, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

export interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isCommonPassword?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  onClear,
  isCommonPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="password-analyzer-input"
          className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"
        >
          <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
          <span>Enter Password to Analyze</span>
        </label>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400 font-mono">
            Length: <strong className="text-cyan-400">{value.length}</strong> chars
          </span>
          {value.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-slate-400 hover:text-rose-400 flex items-center gap-1 text-xs transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="relative group">
        <input
          id="password-analyzer-input"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type or paste a password (evaluated 100% locally)..."
          autoComplete="off"
          spellCheck="false"
          autoCapitalize="off"
          className={clsx(
            'w-full bg-slate-950/90 text-slate-100 placeholder-slate-500 font-mono text-sm sm:text-base px-4 py-3.5 pr-24 rounded-xl border transition-all duration-200 outline-none shadow-inner',
            isCommonPassword
              ? 'border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
              : 'border-slate-800 focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20'
          )}
        />

        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition-colors"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isCommonPassword && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <span>
            <strong>Danger:</strong> This password is listed on public breached password dictionaries! Attackers test this immediately.
          </span>
        </div>
      )}
    </div>
  );
};
