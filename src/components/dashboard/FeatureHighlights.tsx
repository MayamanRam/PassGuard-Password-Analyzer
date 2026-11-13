import React from 'react';
import { Search, KeyRound, FileText, BookOpen, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../../types/breach';

export interface FeatureHighlightsProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const FeatureHighlights: React.FC<FeatureHighlightsProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'analyzer' as ActiveTab,
      title: 'Password Strength Analyzer',
      description:
        'Real-time deep analysis evaluating effective entropy, dictionary word matches, spatial keyboard walks, l33t substitutions, and four simulated threat cracking models.',
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      tag: 'zxcvbn & Shannon Entropy',
      badgeClass: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60',
      actionText: 'Launch Analyzer',
    },
    {
      id: 'generator' as ActiveTab,
      title: 'Secure Password Generator',
      description:
        'Cryptographically secure random password generation powered by the Web Crypto API. Implements rejection sampling to eliminate modulo bias completely with character set enforcement.',
      icon: <KeyRound className="w-5 h-5 text-purple-400" />,
      tag: 'Zero Modulo Bias',
      badgeClass: 'bg-purple-950/60 text-purple-300 border-purple-800/60',
      actionText: 'Generate Passwords',
    },
    {
      id: 'passphrase' as ActiveTab,
      title: 'Diceware Passphrase Generator',
      description:
        'Generate high-entropy, human-memorable passphrases using the official EFF Diceware wordlist. Balance cognitive memorability with massive resistance to GPU brute-force attacks.',
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      tag: 'EFF Diceware Wordlist',
      badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
      actionText: 'Generate Passphrases',
    },
    {
      id: 'guide' as ActiveTab,
      title: 'Password Security Guide',
      description:
        'Comprehensive cybersecurity educational reference covering 12 real-world password attack vectors, credential stuffing, password spraying, MFA architectures, and FIDO2 Passkeys.',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      tag: '12 Attack Vectors',
      badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
      actionText: 'Explore Guide',
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Core Security Engines</h2>
        <p className="text-xs text-slate-400">
          Professional client-side cryptographic analysis and password hygiene utilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feat) => (
          <div
            key={feat.id}
            onClick={() => onNavigate(feat.id)}
            className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg shadow-black/20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors">
                  {feat.icon}
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${feat.badgeClass}`}>
                  {feat.tag}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
              <span>{feat.actionText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

