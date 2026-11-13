import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, AlertOctagon, CheckCircle2 } from 'lucide-react';

export const RandomnessExplainer: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Cryptographic Randomness & Modulo Bias</span>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="Toggle randomness explanation"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </h3>
            <p className="text-xs text-slate-400">
              PassGuard strictly uses <code>crypto.getRandomValues</code> with rejection sampling
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
        <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-900/60 space-y-1.5">
          <div className="flex items-center gap-2 text-rose-300 font-semibold">
            <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Why Math.random() is Insecure</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Standard <code>Math.random()</code> uses pseudo-random algorithms (e.g., xorshift128+) designed for speed, not cryptography. With just a few observed outputs, an attacker can reconstruct the internal PRNG state and predict all future passwords generated.
          </p>
        </div>

        <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-900/60 space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Web Crypto API + Rejection Sampling</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            PassGuard sources entropy directly from the OS kernel cryptographically secure pseudo-random number generator (CSPRNG). Furthermore, PassGuard implements <em>rejection sampling</em> to eliminate modulo bias, ensuring every character in your charset has an identical mathematical probability of being chosen.
          </p>
        </div>
      </div>

      {open && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 animate-in fade-in-50">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Mathematical Proof: Eliminating Modulo Bias
          </h4>
          <p>
            When mapping a 32-bit random integer (range $0$ to $2^{32} - 1$) onto a character set of size $N$ using the naive modulo operator (<code>rand % N</code>), if $2^{32}$ is not an exact multiple of $N$, the remainder values $0$ through $(2^{32} \bmod N) - 1$ receive an unfair bias, appearing more frequently.
          </p>
          <p className="font-mono text-[11px] text-cyan-400 bg-slate-900 p-2 rounded border border-slate-800">
            limit = 0x100000000 - (0x100000000 % N);<br />
            while (candidate &gt;= limit) &#123; candidate = getNextUint32(); &#125;<br />
            return candidate % N; // Perfect uniform distribution
          </p>
          <p>
            By rejecting values greater than or equal to the limit, PassGuard guarantees 100% uniform distribution across all character positions.
          </p>
        </div>
      )}
    </div>
  );
};

