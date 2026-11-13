import React, { useState } from 'react';
import { GeneratorControls } from '../components/generator/GeneratorControls';
import { BatchPasswordList } from '../components/generator/BatchPasswordList';
import { RandomnessExplainer } from '../components/generator/RandomnessExplainer';
import { DEFAULT_GENERATOR_OPTIONS, generatePasswordBatch } from '../services/passwordGenerator';
import { PasswordGeneratorOptions, GeneratedPasswordItem } from '../types/generator';
import { KeyRound, Shield } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [options, setOptions] = useState<PasswordGeneratorOptions>(DEFAULT_GENERATOR_OPTIONS);
  const [passwords, setPasswords] = useState<GeneratedPasswordItem[]>(() =>
    generatePasswordBatch(DEFAULT_GENERATOR_OPTIONS)
  );

  const handleGenerate = () => {
    try {
      const results = generatePasswordBatch(options);
      setPasswords(results);
    } catch (err) {
      console.error('Password generation failed:', err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-800/80">
            <KeyRound className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Cryptographically Secure Password Generator
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Zero-modulo-bias random generation using Web Crypto CSPRNG with strict character class enforcement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <GeneratorControls
            options={options}
            onChange={(newOpts) => {
              setOptions(newOpts);
            }}
            onGenerate={handleGenerate}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <BatchPasswordList passwords={passwords} />
          <RandomnessExplainer />

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Password Manager Integration</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Once generated, copy this password directly into your encrypted password manager (Bitwarden, 1Password, KeePassXC). Never reuse this credential on any other application or account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
