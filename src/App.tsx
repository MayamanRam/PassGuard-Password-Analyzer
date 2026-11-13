import { useState } from 'react';
import { ActiveTab } from './types/breach';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { PrivacyNoticeBanner } from './components/common/PrivacyNoticeBanner';
import { Dashboard } from './pages/Dashboard';
import { Analyzer } from './pages/Analyzer';
import { PasswordGenerator } from './pages/PasswordGenerator';
import { PassphraseGenerator } from './pages/PassphraseGenerator';
import { SecurityGuide } from './pages/SecurityGuide';
import { About } from './pages/About';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'analyzer':
        return <Analyzer />;
      case 'generator':
        return <PasswordGenerator />;
      case 'passphrase':
        return <PassphraseGenerator />;
      case 'guide':
        return <SecurityGuide />;
      case 'about':
        return <About />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <PrivacyNoticeBanner />
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActivePage()}
      </main>

      <Footer onTabChange={setActiveTab} />
    </div>
  );
}

export default App;

