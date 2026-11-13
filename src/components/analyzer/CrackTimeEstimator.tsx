import React, { useState } from 'react';
import { CrackTimeEstimates } from '../../types/analyzer';
import { ATTACK_SCENARIOS } from '../../constants/attackProfiles';
import { Clock, Server, Cpu, ShieldCheck, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';

export interface CrackTimeEstimatorProps {
  crackTimes: CrackTimeEstimates;
}

export const CrackTimeEstimator: React.FC<CrackTimeEstimatorProps> = ({ crackTimes }) => {
  const [showCaveats, setShowCaveats] = useState(false);

  const scenarioCards = [
    {
      scenario: ATTACK_SCENARIOS[0],
      estimate: crackTimes.onlineThrottled,
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      colorClass: 'text-emerald-400',
      badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
    },
    {
      scenario: ATTACK_SCENARIOS[1],
      estimate: crackTimes.onlineStandard,
      icon: <Server className="w-4 h-4 text-amber-400" />,
      colorClass: 'text-amber-400',
      badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
    },
    {
      scenario: ATTACK_SCENARIOS[2],
      estimate: crackTimes.offlineSlowHash,
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      colorClass: 'text-purple-400',
      badgeClass: 'bg-purple-950/60 text-purple-300 border-purple-800/60',
    },
    {
      scenario: ATTACK_SCENARIOS[3],
      estimate: crackTimes.offlineFastHash,
      icon: <Cpu className="w-4 h-4 text-rose-400" />,
      colorClass: 'text-rose-400',
      badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Estimated Guessing Time Across Threat Models</span>
              <button
                type="button"
                onClick={() => setShowCaveats(!showCaveats)}
                className="text-slate-400 hover:text-cyan-400 text-xs transition-colors"
                title="View threat model assumptions"
                aria-label="Toggle threat model assumptions"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </h3>
            <p className="text-xs text-slate-400">
              Simulated cracking velocity based on attacker capabilities and defensive controls
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {scenarioCards.map(({ scenario, estimate, icon, colorClass, badgeClass }) => (
          <div
            key={scenario.id}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {icon}
                  <span className="font-semibold text-slate-200 text-xs">{scenario.name}</span>
                </div>
                <span className={clsx('text-[10px] font-mono px-2 py-0.5 rounded-full border', badgeClass)}>
                  {scenario.category.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                {scenario.description}
              </p>
            </div>

            <div className="border-t border-slate-800/60 pt-2.5 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Estimated Effort:</span>
              <span className={clsx('font-mono font-bold text-sm', colorClass)}>
                {estimate}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showCaveats && (
        <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20 text-xs text-slate-300 space-y-2 animate-in fade-in-50">
          <h4 className="font-bold text-cyan-300 text-xs uppercase tracking-wider">
            Critical Real-World Attack Caveats
          </h4>
          <p>
            &bull; <strong>Online Rate Limiting:</strong> If a target service enforces strict lockouts or CAPTCHAs, guessing {'>'} 100 times will lock the account or ban the IP address.
          </p>
          <p>
            &bull; <strong>Offline Database Leaks:</strong> If an attacker steals an unhashed or fast-hashed database (e.g., MD5/NTLM), a multi-GPU cluster running Hashcat can compute up to 100 billion guesses every second.
          </p>
          <p>
            &bull; <strong>Key Derivation Functions:</strong> Storing passwords with Argon2id or bcrypt (cost &ge; 12) slows modern GPUs down to ~10,000 guesses per second, drastically protecting users even if a hash database is stolen.
          </p>
        </div>
      )}
    </div>
  );
};
