import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'emerald' | 'amber' | 'rose' | 'slate' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  className,
  icon,
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/60 shadow-sm',
    purple: 'bg-purple-950/60 text-purple-300 border-purple-800/60',
    emerald: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60',
    amber: 'bg-amber-950/60 text-amber-400 border-amber-800/60',
    rose: 'bg-rose-950/60 text-rose-400 border-rose-800/60',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
    outline: 'bg-transparent text-slate-300 border-slate-700',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="inline-block shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
