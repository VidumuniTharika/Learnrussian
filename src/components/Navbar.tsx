import React, { useState } from 'react';
import { ActiveView, UILanguage, UserProfile } from '../types';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  MessageSquare, 
  Trophy, 
  Flame, 
  Sun, 
  Moon, 
  Globe, 
  GraduationCap,
  HelpCircle,
  Feather,
  Headphones,
  CheckSquare,
  MapPin,
  Book,
  Shield,
  ChevronDown
} from 'lucide-react';
import { playSoundEffect } from '../utils/audioEngine';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
}

const LANGUAGES: { code: UILanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  userProfile,
  setUserProfile,
  theme,
  setTheme
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const handleViewChange = (view: ActiveView) => {
    playSoundEffect('click');
    setActiveView(view);
  };

  const primaryNavItems: { view: ActiveView; label: string; icon: React.ReactNode }[] = [
    { view: 'home', label: 'Home', icon: <GraduationCap size={14} /> },
    { view: 'courses', label: 'Curriculum', icon: <BookOpen size={14} /> },
    { view: 'cases', label: 'Cases', icon: <Compass size={14} /> },
    { view: 'dialogues', label: 'Dialogues', icon: <MessageSquare size={14} /> },
    { view: 'quests', label: 'Quests', icon: <CheckSquare size={14} /> },
  ];

  const moreNavItems: { view: ActiveView; label: string; icon: React.ReactNode }[] = [
    { view: 'alphabet', label: 'Alphabet', icon: <Sparkles size={14} /> },
    { view: 'dictation', label: 'Dictation', icon: <Headphones size={14} /> },
    { view: 'map', label: 'Map Explorer', icon: <MapPin size={14} /> },
    { view: 'idioms', label: 'Idioms Dictionary', icon: <Book size={14} /> },
    { view: 'culture', label: 'Culture & Arts', icon: <Feather size={14} /> },
    { view: 'srs', label: 'SRS Flashcards', icon: <Sparkles size={14} /> },
    { view: 'placement', label: 'Placement Quiz', icon: <HelpCircle size={14} /> },
    { view: 'dashboard', label: 'Student Profile', icon: <Trophy size={14} /> },
    { view: 'admin', label: 'Admin Studio', icon: <Shield size={14} /> },
  ];

  return (
    <header className="sticky top-0 z-50 transition-colors bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-light)]">
      
      {/* Top Continuous Marquee Banner */}
      <div className="marquee-container">
        <div className="marquee-content">
          ☺ RUSSIAN LANGUAGE INSTITUTE • ALL 5 STAGES COMPLETE • DICTATION LAB • DAILY QUESTS & CERTIFICATES • MAP EXPLORER • IDIOMS DICTIONARY • A1-C1 CEFR ROADMAP ☺ RUSSIAN LANGUAGE INSTITUTE • ALL 5 STAGES COMPLETE • DICTATION LAB • DAILY QUESTS & CERTIFICATES • MAP EXPLORER • IDIOMS DICTIONARY
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleViewChange('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl border border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-main)] flex items-center justify-center font-display font-extrabold text-xl shadow-sm group-hover:scale-105 transition-transform">
            РМ.
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-extrabold tracking-tight">
                РусскийМир
              </span>
              <span className="pill-badge text-[9px] bg-rose-500/10 text-rose-600 border-rose-500/30">
                All 5 Stages
              </span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">
              Global Editorial LMS
            </p>
          </div>
        </div>

        {/* Shortened Navigation Floating Glass Dock */}
        <nav className="hidden lg:flex items-center gap-1 nav-floating-dock overflow-hidden">
          <div className="nav-shine-line" />
          
          {primaryNavItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleViewChange(item.view)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap nav-tab-item relative z-10 ${
                  isActive ? 'nav-tab-active' : 'text-[var(--text-secondary)]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Explore All Dropdown Menu */}
          <div className="relative z-20">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap nav-tab-item ${
                moreNavItems.some(i => i.view === activeView)
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <Sparkles size={13} className="text-amber-400 animate-pulse" />
              <span>Explore All</span>
              <ChevronDown size={13} className={`transition-transform duration-300 ${moreMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[var(--bg-surface)] backdrop-blur-2xl rounded-2xl p-2.5 shadow-2xl z-50 border border-[var(--border-light)] animate-fade-in-up grid grid-cols-1 gap-1">
                <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase text-[var(--text-muted)] tracking-wider">
                  Practice Labs & Tools
                </div>
                {moreNavItems.map((item) => {
                  const isActive = activeView === item.view;
                  return (
                    <button
                      key={item.view}
                      onClick={() => {
                        handleViewChange(item.view);
                        setMoreMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold shadow-sm' 
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {isActive && <span className="text-[10px] font-mono uppercase font-bold">Active</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Streak Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs font-bold">
            <Flame size={14} className="text-amber-500 fill-amber-500" />
            <span>{userProfile.streak}d</span>
          </div>

          {/* XP Counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs font-bold">
            <Sparkles size={14} className="text-amber-500" />
            <span>{userProfile.xp} XP</span>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs font-bold"
            >
              <Globe size={14} className="text-amber-500" />
              <span className="uppercase text-[10px]">{userProfile.selectedLanguage}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[var(--bg-surface)] rounded-2xl py-2 shadow-2xl z-50 border border-[var(--border-light)]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setUserProfile(prev => ({ ...prev, selectedLanguage: lang.code }));
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold hover:bg-[var(--bg-surface-hover)] transition-colors ${
                      userProfile.selectedLanguage === lang.code ? 'text-amber-500 font-bold' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    <span>{lang.flag} {lang.label}</span>
                    {userProfile.selectedLanguage === lang.code && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full border border-[var(--border-light)] bg-[var(--bg-surface)] text-amber-500 transition-colors"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} className="text-[var(--text-primary)]" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center gap-2 py-2 px-3 bg-[var(--bg-surface)] backdrop-blur-xl border-t border-[var(--border-light)] overflow-x-auto scrollbar-none">
        {[...primaryNavItems, ...moreNavItems].map((item) => {
          const isActive = activeView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => handleViewChange(item.view)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                isActive ? 'nav-tab-active' : 'text-[var(--text-muted)] bg-[var(--bg-card)]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

    </header>
  );
};
