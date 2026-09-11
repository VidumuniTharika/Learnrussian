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
  GraduationCap 
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

  const navItems: { view: ActiveView; label: string; labelRu: string; icon: React.ReactNode }[] = [
    { view: 'home', label: 'Home', labelRu: 'Главная', icon: <GraduationCap size={18} /> },
    { view: 'alphabet', label: 'Alphabet', labelRu: 'Азбука', icon: <Sparkles size={18} /> },
    { view: 'courses', label: 'Courses', labelRu: 'Курсы', icon: <BookOpen size={18} /> },
    { view: 'cases', label: 'Grammar & Cases', labelRu: 'Падежи', icon: <Compass size={18} /> },
    { view: 'dialogues', label: 'Dialogues', labelRu: 'Диалоги', icon: <MessageSquare size={18} /> },
    { view: 'dashboard', label: 'Dashboard', labelRu: 'Кабинет', icon: <Trophy size={18} /> },
  ];

  return (
    <header className="glass-panel sticky top-0 z-50 transition-colors border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleViewChange('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-amber-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-serif text-2xl font-bold">РМ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-gradient-gold">
                РусскийМир
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                LMS Global
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans hidden sm:block">
              Learn Russian Worldwide • От нуля до fluency
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-2xl border border-white/5">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleViewChange(item.view)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
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
        <div className="flex items-center gap-3">
          
          {/* Streak Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold shadow-sm" title="Active Daily Practice Streak">
            <Flame size={18} className="text-amber-500 fill-amber-500 animate-bounce" />
            <span>{userProfile.streak}d</span>
          </div>

          {/* XP Counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-bold">
            <Sparkles size={16} className="text-indigo-400" />
            <span>{userProfile.xp} XP</span>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-sm font-medium transition-colors"
              title="Change Interface Language"
            >
              <Globe size={16} className="text-amber-400" />
              <span className="uppercase text-xs font-bold">{userProfile.selectedLanguage}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 glass-panel rounded-xl py-2 shadow-2xl z-50 border border-white/10">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setUserProfile(prev => ({ ...prev, selectedLanguage: lang.code }));
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2 text-xs font-semibold hover:bg-white/10 transition-colors ${
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
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-amber-400 transition-colors"
            title="Toggle Dark / Light Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} className="text-slate-700" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center justify-around py-2 bg-slate-950/80 border-t border-white/5 px-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => handleViewChange(item.view)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-semibold ${
              activeView === item.view ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
