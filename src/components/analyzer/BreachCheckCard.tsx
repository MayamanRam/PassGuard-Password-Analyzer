import React, { useState } from 'react';
import { BreachCheckResult } from '../../types/breach';
import { checkBreachedPassword } from '../../services/breachChecker';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ShieldAlert, ShieldCheck, Database, Lock, AlertTriangle, EyeOff } from 'lucide-react';

export interface BreachCheckCardProps {
  password: string;
}

export const BreachCheckCard: React.FC<BreachCheckCardProps> = ({ password }) => {
  const [result, setResult] = useState<BreachCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const handleCheckBreach = async () => {
    if (!password) return;
    setIsLoading(true);
    try {
      const res = await checkBreachedPassword(password);
      setResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Public Data Breach Verification</span>
              <Badge variant="cyan" size="sm">k-Anonymity</Badge>
            </h3>
            <p className="text-xs text-slate-400">
              Query over 800+ million compromised passwords without revealing yours
            </p>
          </div>
        </div>

        <Button
          onClick={handleCheckBreach}
          disabled={!password || isLoading}
          isLoading={isLoading}
          variant="outline"
          size="sm"
          icon={<Lock className="w-3.5 h-3.5" />}
        >
          Check Known Breaches
        </Button>
      </div>

      {/* Privacy Guarantee callout */}
      <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
        <EyeOff className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-cyan-300">
            Privacy-Preserving k-Anonymity Model:
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Your password is <strong>never</strong> transmitted. PassGuard calculates the SHA-1 hash locally and sends only the first 5 characters (e.g., <code>5FD92</code>). Over 500+ passwords share this same prefix, making it mathematically impossible for any external party to determine your password.
          </p>
        </div>
      </div>

      {/* Results Section */}
      {result && result.checked && (
        <div className="pt-2 animate-in fade-in-50">
          {result.isBreached ? (
            <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                <span>Pwned! Found {result.breachCount.toLocaleString()} times in public data breaches.</span>
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                This password has been exposed in real corporate or service breaches and is indexed in public attacker wordlists. It must never be used on any account.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 space-y-1">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Not Found in Known Breaches</span>
              </div>
              <p className="text-xs text-emerald-400/90 leading-relaxed">
                This specific password was not observed in over 800+ million compromised credentials in the HIBP database. (Verified in {result.durationMs}ms).
              </p>
            </div>
          )}

          {/* Technical k-Anonymity Audit Dropdown */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors flex items-center gap-1"
            >
              <span>{showTechnicalDetails ? 'Hide' : 'Inspect'} k-Anonymity Cryptographic Verification</span>
            </button>

            {showTechnicalDetails && (
              <div className="mt-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1.5 text-slate-300">
                <div className="text-slate-400 font-sans font-semibold mb-1">
                  Cryptographic Audit Trail:
                </div>
                <div>
                  <span className="text-slate-500">Transmitted 5-char Prefix:</span>{' '}
                  <span className="text-cyan-400 font-bold bg-cyan-950/80 px-1 py-0.5 rounded border border-cyan-800">
                    {result.hashPrefix}
                  </span>{' '}
                  <span className="text-slate-500 text-[10px]">(Only this left your browser)</span>
                </div>
                <div>
                  <span className="text-slate-500">Local 35-char Suffix:</span>{' '}
                  <span className="text-purple-300 font-semibold bg-purple-950/60 px-1 py-0.5 rounded border border-purple-800/40">
                    {result.hashSuffix}
                  </span>{' '}
                  <span className="text-emerald-400 text-[10px]">(Remained strictly in client memory)</span>
                </div>
                <div>
                  <span className="text-slate-500">Masked Full Hash:</span>{' '}
                  <span className="text-slate-400">{result.fullHashMasked}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {result && result.offline && (
        <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 text-xs text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{result.error || 'Network connection unavailable. Core password analysis remains fully functional offline.'}</span>
        </div>
      )}
    </div>
  );
};
