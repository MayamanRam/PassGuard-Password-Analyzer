import React from 'react';
import { GeneratedPasswordItem } from '../../types/generator';
import { CopyButton } from '../common/CopyButton';
import { Badge } from '../common/Badge';
import { Zap, ShieldCheck } from 'lucide-react';

export interface BatchPasswordListProps {
  passwords: GeneratedPasswordItem[];
}

export const BatchPasswordList: React.FC<BatchPasswordListProps> = ({ passwords }) => {
  if (passwords.length === 0) {
    return null;
  }

  // Highlight first item if single, or full list if batch
  const isSingle = passwords.length === 1;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              {isSingle ? 'Generated Secure Password' : `Generated Passwords (${passwords.length})`}
            </h3>
            <p className="text-xs text-slate-400">
              Sampled using OS CSPRNG Web Crypto API with rejection sampling
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {passwords.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="space-y-1.5 overflow-hidden">
              <div className="font-mono text-sm sm:text-base text-cyan-300 font-semibold tracking-wide break-all select-all">
                {item.password}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant={item.score >= 4 ? 'cyan' : 'emerald'} size="sm">
                  {item.label}
                </Badge>
                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <strong>{item.entropy}</strong> bits entropy
                </span>
                <span className="text-slate-500 text-[11px] font-mono">
                  ({item.password.length} chars)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <CopyButton
                textToCopy={item.password}
                label="Copy Password"
                copiedLabel="Copied!"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

