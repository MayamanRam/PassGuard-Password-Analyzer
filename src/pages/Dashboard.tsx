import React from 'react';
import { QuickAnalyzeHero } from '../components/dashboard/QuickAnalyzeHero';
import { FeatureHighlights } from '../components/dashboard/FeatureHighlights';
import { SecurityQuickStats } from '../components/dashboard/SecurityQuickStats';
import { ThreatIntelAlerts } from '../components/dashboard/ThreatIntelAlerts';
import { ActiveTab } from '../types/breach';

export interface DashboardProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 animate-in fade-in-50 duration-200">
      <QuickAnalyzeHero onNavigate={onNavigate} />
      <FeatureHighlights onNavigate={onNavigate} />
      <SecurityQuickStats />
      <ThreatIntelAlerts onNavigate={onNavigate} />
    </div>
  );
};

