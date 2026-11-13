import React from 'react';
import { Shield, Key, RefreshCw, Zap, Lock, Smartphone } from 'lucide-react';
import { ActiveTab } from '../../types/breach';

export interface ThreatIntelAlertsProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const ThreatIntelAlerts: React.FC<ThreatIntelAlertsProps> = ({ onNavigate }) => {
  const topics = [
    {
      title: 'Credential Stuffing Attacks',
      description:
        'Automated bots inject millions of username/password pairs leaked from previous breaches into login portals. If you reuse passwords, an unrelated website breach compromises your bank or email.',
      icon: <RefreshCw className="w-4 h-4 text-rose-400" />,
      badge: 'High Impact',
    },
    {
      title: 'Dictionary & Rule-Based Attacks',
      description:
        'Attackers don’t guess random characters. They run wordlists (RockYou, SecLists) through Hashcat mutation rules that test patterns like Capitalize first letter, replace "a" with "@", and append "2024!".',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      badge: 'Pattern Exploit',
    },
    {
      title: 'Zero-Knowledge Password Managers',
      description:
        'Tools like Bitwarden, 1Password, and KeePassXC generate and store unique, 20+ character passwords for every account. Their client-side encryption ensures only you hold the decryption keys.',
      icon: <Lock className="w-4 h-4 text-cyan-400" />,
      badge: 'Recommended',
    },
    {
      title: 'Hardware Multi-Factor & Passkeys',
      description:
        'SMS verification is vulnerable to SIM-swapping. Upgrade to TOTP authenticator apps (Aegis, Ente, 2FAS) or hardware FIDO2 security keys (YubiKey) which are mathematically immune to phishing.',
      icon: <Smartphone className="w-4 h-4 text-emerald-400" />,
      badge: 'Gold Standard',
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Password Defense Fundamentals</h3>
            <p className="text-xs text-slate-400">
              Why length, uniqueness, and multi-factor authentication are non-negotiable
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('guide')}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2 transition-colors flex items-center gap-1"
        >
          <Key className="w-3.5 h-3.5" />
          <span>Read Comprehensive Guide</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {topics.map((t, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {t.icon}
                <h4 className="text-xs font-bold text-slate-200">{t.title}</h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                {t.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

