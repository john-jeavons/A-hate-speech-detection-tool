import React, { useState, useEffect } from 'react';
import { Shield, MessageCircle, Info, Heart, Menu, Moon, Sun, X } from 'lucide-react';
import HateSpeechAnalyzer from './components/HateSpeechAnalyzer';
import SupportChat from './components/SupportChat';
import Resources from './components/Resources';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.ANALYZER);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Dark Mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.ANALYZER:
        return <HateSpeechAnalyzer />;
      case AppTab.CHATBOT:
        return <SupportChat />;
      case AppTab.RESOURCES:
        return <Resources />;
      default:
        return <HateSpeechAnalyzer />;
    }
  };

  const NavButton = ({ tab, icon: Icon, label }: { tab: AppTab; icon: any; label: string }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        activeTab === tab
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                <Shield className="w-6 h-6" />
              </div>
              <span className="ml-3 text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                SafeGuard
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <NavButton tab={AppTab.ANALYZER} icon={Shield} label="Analyzer" />
              <NavButton tab={AppTab.CHATBOT} icon={MessageCircle} label="Support Chat" />
              <NavButton tab={AppTab.RESOURCES} icon={Info} label="Resources" />
              
              {/* Dark Mode Toggle (Desktop) */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="ml-4 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-5">
            <div className="flex flex-col space-y-2">
              <NavButton tab={AppTab.ANALYZER} icon={Shield} label="Analyzer" />
              <NavButton tab={AppTab.CHATBOT} icon={MessageCircle} label="Support Chat" />
              <NavButton tab={AppTab.RESOURCES} icon={Info} label="Resources" />
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Intro */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">
            Protecting Your <span className="text-indigo-600 dark:text-indigo-400">Digital Peace</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
            A safe space to analyze harmful content and find support. 
            SafeGuard combines advanced AI detection with supportive companionship.
          </p>
        </div>

        {/* Dynamic Content Area */}
        <div className="min-h-[500px]">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 py-8 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 dark:text-slate-500 text-sm">
          <div className="flex items-center justify-center mb-4 space-x-2">
            <Heart className="w-4 h-4 text-rose-500 fill-current" />
            <span>Built for PowerHacks 2025</span>
          </div>
          <p>
            Disclaimer: This tool uses AI and is not a substitute for professional legal or medical advice. 
            In emergencies, always contact local authorities.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;