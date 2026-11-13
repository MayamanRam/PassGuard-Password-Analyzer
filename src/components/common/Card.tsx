import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glow-cyan' | 'glow-purple' | 'subtle' | 'outline';
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  header,
  footer,
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl',
    'glow-cyan':
      'bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-950/20 hover:border-cyan-500/50 transition-colors',
    'glow-purple':
      'bg-slate-900/90 border border-purple-500/30 shadow-lg shadow-purple-950/20 hover:border-purple-500/50 transition-colors',
    subtle:
      'bg-slate-900/50 border border-slate-800/80',
    outline:
      'bg-transparent border border-slate-800',
  };

  return (
    <div
      className={clsx(
        'rounded-xl transition-all duration-200 overflow-hidden',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {header && (
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-950/40">
          {header}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/40 text-xs text-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
};
