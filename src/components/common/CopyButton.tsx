import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

export interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label = 'Copy',
  copiedLabel = 'Copied!',
  className,
  size = 'md',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
      // Fallback for older or restricted environments
      try {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback clipboard copy failed:', fallbackErr);
      }
    }
  };

  const isSmall = size === 'sm';

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : label}
      title={copied ? copiedLabel : `${label} to clipboard`}
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-lg transition-all duration-200 select-none border focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0e17]',
        copied
          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50 shadow-sm shadow-emerald-500/20'
          : 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border-slate-700/80 hover:text-white',
        isSmall ? 'text-xs px-2.5 py-1' : 'text-xs px-3 py-1.5',
        className
      )}
    >
      {copied ? (
        <>
          <Check className={clsx(isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4', 'text-emerald-400 animate-in zoom-in-50')} />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className={clsx(isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4', 'text-slate-400 group-hover:text-slate-200')} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
