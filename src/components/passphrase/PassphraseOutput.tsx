import React from 'react';
import { GeneratedPassphraseItem } from '../../types/passphrase';
import { CopyButton } from '../common/CopyButton';
import { Badge } from '../common/Badge';
import { Zap, Clock, ShieldCheck } from 'lucide-react';

export interface PassphraseOutputProps {
  passphrases: GeneratedPassphraseItem[];
}

export const PassphraseOutput: React.FC<PassphraseOutputProps> = ({ passphrases }) => {
  if (passphrases.length === 0) {
    return null;
  }

  const isSingle = passphrases.length === 1;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              {isSingle ? 'Generated Diceware Passphrase' : `Generated Passphrases (${passphrases.length})`}
            </h3>
            <p className="text-xs text-slate-400">
              High human memorability combined with cryptographically robust entropy
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {passphrases.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="space-y-2 overflow-hidden">
              <div className="font-mono text-base sm:text-lg text-cyan-300 font-bold tracking-wide break-all select-all">
                {item.passphrase}
              </div>

              {/* Individual Word Tokens */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                {item.words.map((w, wIdx) => (
                  <span
                    key={wIdx}
                    className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono"
                  >
                    {w}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                <Badge variant={item.entropyBits >= 60 ? 'cyan' : 'emerald'} size="sm">
                  {item.wordCount} Diceware Words
                </Badge>
                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <strong>{item.entropyBits}</strong> bits entropy
                </span>
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>Cracking effort: <strong>{item.crackTimeEstimate}</strong></span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <CopyButton
                textToCopy={item.passphrase}
                label="Copy Passphrase"
                copiedLabel="Copied!"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

