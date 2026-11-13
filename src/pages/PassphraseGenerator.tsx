import React, { useState } from 'react';
import { PassphraseControls } from '../components/passphrase/PassphraseControls';
import { PassphraseOutput } from '../components/passphrase/PassphraseOutput';
import { DicewareExplainer } from '../components/passphrase/DicewareExplainer';
import { DEFAULT_PASSPHRASE_OPTIONS, generatePassphraseBatch } from '../services/passphraseGenerator';
import { PassphraseOptions, GeneratedPassphraseItem } from '../types/passphrase';
import { FileText, Shield } from 'lucide-react';

export const PassphraseGenerator: React.FC = () => {
  const [options, setOptions] = useState<PassphraseOptions>(DEFAULT_PASSPHRASE_OPTIONS);
  const [passphrases, setPassphrases] = useState<GeneratedPassphraseItem[]>(() =>
    generatePassphraseBatch(DEFAULT_PASSPHRASE_OPTIONS)
  );

  const handleGenerate = () => {
    try {
      const results = generatePassphraseBatch(options);
      setPassphrases(results);
    } catch (err) {
      console.error('Passphrase generation failed:', err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/80">
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Memorable Diceware Passphrase Generator
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          EFF wordlist passphrase generation. Massive resistance to GPU brute-force attacks while remaining humanly memorable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <PassphraseControls
            options={options}
            onChange={(newOpts) => {
              setOptions(newOpts);
            }}
            onGenerate={handleGenerate}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <PassphraseOutput passphrases={passphrases} />
          <DicewareExplainer />

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Ideal for Master Passwords & Full Disk Encryption</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Passphrases are ideal for master passwords that you must commit to human memory (e.g., your password manager vault key, device encryption PIN, or SSH key passphrase). 4 to 5 random words provide superior security to 10 random complex symbols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
