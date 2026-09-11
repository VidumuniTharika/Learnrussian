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
  Feather
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

  const handleViewChange = (view: ActiveView) => {
    playSoundEffect('click');
    setActiveView(view);
  };

  const navItems: { view: ActiveView; label: string; icon: React.ReactNode }[] = [
    { view: 'home', label: 'Home', icon: <GraduationCap size={16} /> },
    { view: 'alphabet', label: 'Alphabet', icon: <Sparkles size={16} /> },
    { view: 'courses', label: 'Courses', icon: <BookOpen size={16} /> },
    { view: 'cases', label: 'Cases', icon: <Compass size={16} /> },
    { view: 'dialogues', label: 'Dialogues', icon: <MessageSquare size={16} /> },
    { view: 'culture', label: 'Culture', icon: <Feather size={16} /> },
    { view: 'srs', label: 'SRS Deck', icon: <Sparkles size={16} /> },
    { view: 'placement', label: 'Placement', icon: <HelpCircle size={16} /> },
    { view: 'dashboard', label: 'Profile', icon: <Trophy size={16} /> },
  ];

  return (
    <header className="glass-panel sticky top-0 z-50 transition-colors border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleViewChange('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-amber-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-serif text-xl font-bold">РМ</span>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-tight text-gradient-gold">
                РусскийМир
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                Stage 2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans">
              Global Russian LMS
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-2xl border border-white/5 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleViewChange(item.view)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Streaks, XP, Language & Theme */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Streak Counter */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-sm" title="Active Daily Practice Streak">
            <Flame size={16} className="text-amber-500 fill-amber-500 animate-bounce" />
            <span>{userProfile.streak}d</span>
          </div>

          {/* XP Counter */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
            <Sparkles size={14} className="text-indigo-400" />
            <span>{userProfile.xp} XP</span>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-xs font-medium transition-colors"
            >
              <Globe size={14} className="text-amber-400" />
              <span className="uppercase text-[10px] font-bold">{userProfile.selectedLanguage}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 glass-panel rounded-xl py-2 shadow-2xl z-50 border border-white/10">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setUserProfile(prev => ({ ...prev, selectedLanguage: lang.code }));
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold hover:bg-white/10 transition-colors ${
                      userProfile.selectedLanguage === lang.code ? 'text-amber-400 font-bold bg-white/5' : 'text-slate-300'
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
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-amber-400 transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} className="text-slate-700" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Bar */}
      <div className="xl:hidden flex items-center justify-around py-2 bg-slate-950/90 border-t border-white/5 px-1 overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => handleViewChange(item.view)}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-semibold whitespace-nowrap ${
              activeView === item.view ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
