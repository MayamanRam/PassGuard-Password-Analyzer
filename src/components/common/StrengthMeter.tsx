import React from 'react';
import { clsx } from 'clsx';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { PasswordStrengthScore } from '../../types/analyzer';

export interface StrengthMeterProps {
  score: PasswordStrengthScore;
  label?: string;
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
}

export const StrengthMeter: React.FC<StrengthMeterProps> = ({
  score,
  label,
  className,
  showIcon = true,
  showText = true,
}) => {
  const getScoreData = (s: PasswordStrengthScore) => {
    switch (s) {
      case 0:
        return {
          title: 'Very Weak',
          textClass: 'text-rose-400',
          borderClass: 'border-rose-500/40',
          bgActiveClass: 'bg-rose-500',
          barColor: 'from-rose-600 to-rose-500',
          icon: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />,
        };
      case 1:
        return {
          title: 'Weak',
          textClass: 'text-amber-400',
          borderClass: 'border-amber-500/40',
          bgActiveClass: 'bg-amber-500',
          barColor: 'from-amber-600 to-amber-500',
          icon: <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />,
        };
      case 2:
        return {
          title: 'Moderate',
          textClass: 'text-yellow-400',
          borderClass: 'border-yellow-500/40',
          bgActiveClass: 'bg-yellow-500',
          barColor: 'from-yellow-600 to-yellow-500',
          icon: <Shield className="w-4 h-4 text-yellow-400 shrink-0" />,
        };
      case 3:
        return {
          title: 'Strong',
          textClass: 'text-emerald-400',
          borderClass: 'border-emerald-500/40',
          bgActiveClass: 'bg-emerald-500',
          barColor: 'from-emerald-600 to-emerald-500',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />,
        };
      case 4:
        return {
          title: 'Very Strong',
          textClass: 'text-cyan-400',
          borderClass: 'border-cyan-500/40',
          bgActiveClass: 'bg-cyan-500',
          barColor: 'from-cyan-500 via-teal-400 to-emerald-400',
          icon: <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />,
        };
    }
  };

  const data = getScoreData(score);
  const displayLabel = label || data.title;

  return (
    <div className={clsx('space-y-2', className)}>
      {showText && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-medium">
            {showIcon && data.icon}
            <span className={clsx('font-semibold uppercase tracking-wider', data.textClass)}>
              {displayLabel}
            </span>
          </div>
          <span className="text-slate-400 text-xs font-mono">
            Score: <strong className={data.textClass}>{score}</strong> / 4
          </span>
        </div>
      )}

      {/* Accessible 4-segment Progress Bar */}
      <div
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuetext={`Password strength is ${displayLabel}`}
        className="grid grid-cols-4 gap-1.5 h-2 w-full rounded-full bg-slate-900/90 p-0.5 border border-slate-800"
      >
        {[1, 2, 3, 4].map((step) => {
          const isFilled = score >= step || (score === 0 && step === 1);
          return (
            <div
              key={step}
              className={clsx(
                'h-full rounded-full transition-all duration-300',
                isFilled
                  ? score === 0
                    ? 'bg-rose-500/80'
                    : data.bgActiveClass
                  : 'bg-slate-800/60'
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

