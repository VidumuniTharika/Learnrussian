import React, { useState, useEffect } from 'react';
import { ActiveView, Lesson, UserProfile, CEFRLevel, SRSCardItem } from './types';
import { INITIAL_USER_PROFILE } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AlphabetView } from './views/AlphabetView';
import { CoursesView } from './views/CoursesView';
import { LessonView } from './views/LessonView';
import { CasesView } from './views/CasesView';
import { DialoguesView } from './views/DialoguesView';
import { DashboardView } from './views/DashboardView';
import { PlacementTestView } from './views/PlacementTestView';
import { SRSFlashcardsView } from './views/SRSFlashcardsView';
import { CultureView } from './views/CultureView';
import { DictationView } from './views/DictationView';
import { DailyQuestsView } from './views/DailyQuestsView';
import { MapStudioView } from './views/MapStudioView';
import { IdiomsView } from './views/IdiomsView';
import { AdminView } from './views/AdminView';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('russian_lms_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_USER_PROFILE;
  });

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('russian_lms_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const handleStartLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveView('lesson');
  };

  const handleCompleteLesson = (xpEarned: number) => {
    setUserProfile(prev => ({
      ...prev,
      xp: prev.xp + xpEarned,
      completedLessonIds: [...new Set([...prev.completedLessonIds, activeLesson?.id || ''])]
    }));
  };

  const handleSavePlacementResult = (level: CEFRLevel, score: number, total: number) => {
    setUserProfile(prev => ({
      ...prev,
      placementResult: {
        recommendedLevel: level,
        score,
        total,
        testedAt: new Date().toISOString()
      }
    }));
  };

  const handleUpdateSRSCards = (newCards: SRSCardItem[]) => {
    setUserProfile(prev => ({
      ...prev,
      srsCards: newCards
    }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Ambient Glass Screen Light Spheres */}
      <div className="fixed top-10 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-float-3d" />
      <div className="fixed top-1/2 -right-32 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none animate-float-3d" />
      <div className="fixed bottom-10 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-float-3d" />

      <div className="relative z-10">
        <Navbar
          activeView={activeView}
          setActiveView={setActiveView}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          theme={theme}
          setTheme={setTheme}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeView === 'home' && (
            <HomeView setActiveView={setActiveView} />
          )}

          {activeView === 'alphabet' && (
            <AlphabetView />
          )}

          {activeView === 'courses' && (
            <CoursesView onStartLesson={handleStartLesson} />
          )}

          {activeView === 'lesson' && activeLesson && (
            <LessonView
              lesson={activeLesson}
              onCompleteLesson={handleCompleteLesson}
              onExitLesson={() => setActiveView('courses')}
            />
          )}

          {activeView === 'cases' && (
            <CasesView />
          )}

          {activeView === 'dialogues' && (
            <DialoguesView />
          )}

          {activeView === 'placement' && (
            <PlacementTestView
              onSaveResult={handleSavePlacementResult}
              onNavigateCourses={() => setActiveView('courses')}
            />
          )}

          {activeView === 'srs' && (
            <SRSFlashcardsView
              cards={userProfile.srsCards || []}
              onUpdateCards={handleUpdateSRSCards}
            />
          )}

          {activeView === 'culture' && (
            <CultureView />
          )}

          {activeView === 'dictation' && (
            <DictationView />
          )}

          {activeView === 'quests' && (
            <DailyQuestsView userProfile={userProfile} />
          )}

          {activeView === 'map' && (
            <MapStudioView />
          )}

          {activeView === 'idioms' && (
            <IdiomsView />
          )}

          {activeView === 'admin' && (
            <AdminView userProfile={userProfile} />
          )}

          {activeView === 'dashboard' && (
            <DashboardView userProfile={userProfile} />
          )}
        </main>
      </div>

      <Footer setActiveView={setActiveView} />
    </div>
  );
};

export default App;
