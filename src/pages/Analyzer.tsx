import React, { useState, useEffect } from 'react';
import { PasswordInput } from '../components/analyzer/PasswordInput';
import { StrengthScorecard } from '../components/analyzer/StrengthScorecard';
import { EntropyGauge } from '../components/analyzer/EntropyGauge';
import { CompositionVisualizer } from '../components/analyzer/CompositionVisualizer';
import { PatternDetector } from '../components/analyzer/PatternDetector';
import { CrackTimeEstimator } from '../components/analyzer/CrackTimeEstimator';
import { FeedbackCard } from '../components/analyzer/FeedbackCard';
import { BreachCheckCard } from '../components/analyzer/BreachCheckCard';
import { analyzePassword } from '../services/passwordAnalyzer';
import { Shield, Sparkles, Key } from 'lucide-react';

export const Analyzer: React.FC = () => {
  const [password, setPassword] = useState('');

  // Clean memory on unmount for privacy
  useEffect(() => {
    return () => {
      setPassword('');
    };
  }, []);

  const analysis = analyzePassword(password);

  const samplePasswords = [
    { label: 'Common Weak', pwd: 'password123' },
    { label: 'Spatial Walk', pwd: 'qwertyuiop' },
    { label: 'L33t Pattern', pwd: 'P@ssw0rd2024!' },
    { label: 'Complex Short', pwd: 'Tr0u&4' },
    { label: 'Diceware Passphrase', pwd: 'correct-horse-battery-staple' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/80">
              <Shield className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Password Strength & Entropy Analyzer
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time client-side analysis. Evaluates entropy, dictionary patterns, and GPU brute-force times.
          </p>
        </div>

        {/* Preset quick test badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Try sample:</span>
          </span>
          {samplePasswords.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPassword(s.pwd)}
              className="text-[11px] px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Area */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
        <PasswordInput
          value={password}
          onChange={setPassword}
          onClear={() => setPassword('')}
          isCommonPassword={analysis.isCommonPassword}
        />
      </div>

      {/* When empty, show guide callout */}
      {password.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <Key className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-200">
            Ready for Real-Time Password Evaluation
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Enter a password or click one of the sample presets above to inspect character variety, theoretical entropy vs effective resistance, dictionary pattern detection, and estimated cracking time across four threat models.
          </p>
        </div>
      ) : (
        /* Detailed Analysis Dashboard */
        <div className="space-y-6">
          <StrengthScorecard analysis={analysis} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EntropyGauge entropy={analysis.entropy} composition={analysis.composition} />
            <CompositionVisualizer composition={analysis.composition} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PatternDetector patterns={analysis.patterns} passwordLength={password.length} />
            <FeedbackCard
              warning={analysis.warning}
              suggestions={analysis.suggestions}
              score={analysis.score}
            />
          </div>

          <CrackTimeEstimator crackTimes={analysis.crackTimes} />

          <BreachCheckCard password={password} />
        </div>
      )}
    </div>
  );
};
