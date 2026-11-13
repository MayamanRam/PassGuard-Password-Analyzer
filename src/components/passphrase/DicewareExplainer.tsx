import React, { useState } from 'react';
import { BookOpen, HelpCircle, CheckCircle2 } from 'lucide-react';

export const DicewareExplainer: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Diceware Passphrase Philosophy (EFF Wordlist)</span>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="Toggle Diceware explanation"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </h3>
            <p className="text-xs text-slate-400">
              Why length and random word combinations outperform complex short passwords
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
        <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>High Length &gt; Short Complexity</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            A 4-word passphrase like <code className="text-cyan-300">correct-horse-battery-staple</code> spans 28 characters and provides ~52 bits of pure entropy. Cracking it offline with GPU clusters requires billions of years, yet it is trivial for a human to memorize and type.
          </p>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-purple-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>EFF Curated Wordlist</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            PassGuard draws from the Electronic Frontier Foundation (EFF) Diceware wordlist. Words were chosen by cryptographic researchers to avoid homophones, offensive words, and typo-prone spellings.
          </p>
        </div>
      </div>

      {open && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 animate-in fade-in-50">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            The Mathematics of Passphrase Entropy
          </h4>
          <p>
            When selecting words randomly from a wordlist containing $N$ distinct words, each word selection contributes exactly $\log_2(N)$ bits of entropy:
          </p>
          <p className="font-mono text-cyan-300 bg-slate-900 p-2 rounded border border-slate-800">
            Total Entropy = (Word Count &times; log2(N)) + log2(Separators) + log2(Number Pool)
          </p>
          <p>
            For a list of 1,296 words: each word adds $\approx 10.34$ bits. For 7,776 words: each word adds $\approx 12.92$ bits. Therefore, a 5-word passphrase exceeds 65–75 bits of entropy—vastly surpassing what human attackers or GPU clusters can brute-force.
          </p>
        </div>
      )}
    </div>
  );
};

