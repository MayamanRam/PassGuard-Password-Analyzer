import React, { useState } from 'react';
import {
  Shield,
  Search,
  KeyRound,
  FileText,
  BookOpen,
  Info,
  Menu,
  X,
  Lock,
} from 'lucide-react';
import { clsx } from 'clsx';
import { ActiveTab } from '../../types/breach';

export interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Shield className="w-4 h-4" /> },
    { id: 'analyzer', label: 'Password Analyzer', icon: <Search className="w-4 h-4" /> },
    { id: 'generator', label: 'Password Generator', icon: <KeyRound className="w-4 h-4" /> },
    { id: 'passphrase', label: 'Passphrase Generator', icon: <FileText className="w-4 h-4" /> },
    { id: 'guide', label: 'Security Guide', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            onClick={() => handleSelectTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-slate-900 border border-cyan-500/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-purple-300 to-white bg-clip-text text-transparent">
                  PassGuard
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
                Understand. Strengthen. Protect.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 relative',
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 shadow-sm shadow-cyan-950/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850/60'
                  )}
                >
                  <span className={clsx(isActive ? 'text-cyan-400' : 'text-slate-400')}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status Badge & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Local-Only</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-[11px]">Private</span>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
