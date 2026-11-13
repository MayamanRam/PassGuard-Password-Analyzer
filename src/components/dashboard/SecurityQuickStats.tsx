import React from 'react';
import { AlertTriangle, Database, Cpu, ShieldAlert } from 'lucide-react';

export const SecurityQuickStats: React.FC = () => {
  const stats = [
    {
      metric: '81%',
      label: 'Breaches Involve Passwords',
      detail: 'Stolen, default, or weak credentials remain the primary attack vector for corporate breaches.',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      border: 'border-rose-900/40',
      bg: 'bg-rose-950/20',
      color: 'text-rose-400',
    },
    {
      metric: '100 Billion',
      label: 'GPU Guesses / Second',
      detail: 'An 8x RTX 4090 Hashcat cluster calculates 100 billion fast hashes (MD5/NTLM) every second.',
      icon: <Cpu className="w-4 h-4 text-amber-400" />,
      border: 'border-amber-900/40',
      bg: 'bg-amber-950/20',
      color: 'text-amber-400',
    },
    {
      metric: '65%+',
      label: 'Password Reuse Rate',
      detail: 'Over 65% of internet users reuse identical or slightly modified passwords across multiple sites.',
      icon: <AlertTriangle className="w-4 h-4 text-purple-400" />,
      border: 'border-purple-900/40',
      bg: 'bg-purple-950/20',
      color: 'text-purple-400',
    },
    {
      metric: '800M+',
      label: 'Pwned Passwords Indexed',
      detail: 'Exposed credentials circulating in public pastebins, dark web forums, and commercial data leaks.',
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      border: 'border-cyan-900/40',
      bg: 'bg-cyan-950/20',
      color: 'text-cyan-400',
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Threat Intelligence & Industry Realities</h2>
        <p className="text-xs text-slate-400">
          Empirical statistics driving modern credential hygiene and NIST guidelines
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${s.border} ${s.bg} backdrop-blur-sm space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-extrabold font-mono ${s.color}`}>
                {s.metric}
              </span>
              <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                {s.icon}
              </div>
            </div>
            <h3 className="text-xs font-bold text-slate-200">{s.label}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {s.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
