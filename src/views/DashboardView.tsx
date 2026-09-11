import React from 'react';
import { UserProfile } from '../types';
import { Trophy, Flame, Sparkles, Award, Bookmark, Globe, Calendar, CheckCircle2, HelpCircle, BookOpen } from 'lucide-react';
import { playRussianSpeech } from '../utils/audioEngine';

interface DashboardViewProps {
  userProfile: UserProfile;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ userProfile }) => {
  const LEADERBOARD_STUDENTS = [
    { rank: 1, name: 'Elena Rostova', country: '🇷🇺 Moscow', xp: 2450, streak: 28 },
    { rank: 2, name: 'Alex Rivera (You)', country: '🇺🇸 USA', xp: userProfile.xp, streak: userProfile.streak },
    { rank: 3, name: 'Kenji Sato', country: '🇯🇵 Japan', xp: 420, streak: 4 },
    { rank: 4, name: 'Lucas Silva', country: '🇧🇷 Brazil', xp: 380, streak: 3 },
    { rank: 5, name: 'Sophie Martin', country: '🇫🇷 France', xp: 310, streak: 2 }
  ];

  // Generate 28-day simulated activity grid
  const days = Array.from({ length: 28 }, (_, i) => {
    const isLogged = i >= 22;
    return { day: i + 1, active: isLogged };
  });

  return (
    <div className="space-y-12 py-6">
      
      {/* PROFILE BANNER */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 p-1 shadow-2xl shrink-0">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-100">
                {userProfile.name}
              </h1>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                {userProfile.levelTitle}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Active Student • Global Russian Language Program
            </p>

            {userProfile.placementResult && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-semibold mt-1">
                <HelpCircle size={12} />
                <span>Placement Level: {userProfile.placementResult.recommendedLevel} ({userProfile.placementResult.score}/{userProfile.placementResult.total})</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="flex items-center gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20">
            <span className="text-xs text-slate-400 font-bold uppercase block">Streak</span>
            <div className="flex items-center justify-center gap-1 font-serif text-2xl font-bold text-amber-400">
              <Flame size={20} className="fill-amber-500" />
              <span>{userProfile.streak}d</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-indigo-500/20">
            <span className="text-xs text-slate-400 font-bold uppercase block">Total XP</span>
            <div className="flex items-center justify-center gap-1 font-serif text-2xl font-bold text-indigo-400">
              <Sparkles size={20} />
              <span>{userProfile.xp}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVITY HEATMAP GRID */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-slate-100">
              30-Day Practice Activity Grid
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">Active Streak: {userProfile.streak} Days</span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 py-2">
          {days.map(d => (
            <div
              key={d.day}
              className={`h-9 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all ${
                d.active
                  ? 'bg-gradient-to-tr from-amber-500 to-rose-600 text-white border-amber-300 shadow-md'
                  : 'bg-slate-900 border-white/5 text-slate-600'
              }`}
              title={`Day ${d.day}: ${d.active ? 'Completed Russian practice' : 'Rest day'}`}
            >
              Day {d.day}
            </div>
          ))}
        </div>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Achievements & SRS Flashcards Queue */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Badges Collection */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  Achievement Badges ({userProfile.badges.length})
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userProfile.badges.map(b => (
                <div key={b.id} className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center gap-3">
                  <span className="text-3xl">{b.icon}</span>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-amber-300">{b.name}</h4>
                    <p className="text-[10px] text-slate-400 italic">«{b.nameRu}»</p>
                    <p className="text-[11px] text-slate-300 mt-1">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SRS Bookmarked Words */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Bookmark size={18} className="text-rose-400" />
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  Saved SRS Flashcard Queue ({userProfile.srsCards?.length || 0})
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {userProfile.srsCards?.map(card => (
                <button
                  key={card.id}
                  onClick={() => playRussianSpeech(card.word)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400 font-serif font-bold text-sm text-slate-100 transition-colors flex items-center gap-2"
                >
                  <span>{card.word}</span>
                  <span className="text-[10px] text-amber-400">🔊</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Global Student Leaderboard */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-slate-950/90 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  Global Weekly Leaderboard
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20">
                Live Rankings
              </span>
            </div>

            <div className="space-y-3">
              {LEADERBOARD_STUDENTS.map(st => (
                <div
                  key={st.rank}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    st.name.includes('You')
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold scale-102 shadow-md'
                      : 'bg-slate-900 border-white/10 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-serif ${
                      st.rank === 1 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      #{st.rank}
                    </span>
                    <div>
                      <p className="font-bold text-slate-100">{st.name}</p>
                      <p className="text-[10px] text-slate-400">{st.country}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-serif font-bold text-amber-400 text-sm block">{st.xp} XP</span>
                    <span className="text-[10px] text-slate-400">🔥 {st.streak}d streak</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
