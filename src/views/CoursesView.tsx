import React, { useState } from 'react';
import { COURSES_DATA } from '../data/mockData';
import { CEFRLevel, Lesson } from '../types';
import { BookOpen, Sparkles, Clock, Award, Play, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { playSoundEffect } from '../utils/audioEngine';

interface CoursesViewProps {
  onStartLesson: (lesson: Lesson) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onStartLesson }) => {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const [activeModalLesson, setActiveModalLesson] = useState<Lesson | null>(null);

  const activeCourse = COURSES_DATA.find(c => c.level === selectedLevel) || COURSES_DATA[0];

  const handleLessonLaunch = (lesson: Lesson) => {
    playSoundEffect('click');
    onStartLesson(lesson);
  };

  return (
    <div className="space-y-12 py-6">
      
      {/* HEADER */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen size={14} />
          <span>CEFR Curriculum Roadmap</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-100">
          Russian Language Skill Tree
        </h1>
        
        <p className="text-sm text-slate-300 max-w-2xl">
          Follow our international CEFR framework. Unlock structured lessons in sequence to build permanent Russian grammar & speaking mastery.
        </p>

        {/* Level Tabs */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          {(['A1', 'A2', 'B1', 'B2'] as const).map(lvl => {
            const isActive = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => {
                  playSoundEffect('click');
                  setSelectedLevel(lvl);
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg scale-105'
                    : 'bg-slate-900/60 border border-white/10 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>Level {lvl}</span>
                {lvl === 'A1' && <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Starter</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE COURSE SUMMARY CARD */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 bg-slate-950/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-bold text-gradient-gold">
              {activeCourse.title}
            </span>
            <span className="text-xs text-amber-400 font-serif font-bold italic">
              «{activeCourse.titleRu}»
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl">
            {activeCourse.description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5">
            <Clock size={16} className="text-amber-400" />
            <span>Est. 12 Hours</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5">
            <Award size={16} className="text-emerald-400" />
            <span>Certificate Track</span>
          </div>
        </div>
      </div>

      {/* SKILL TREE ROADMAP (DUOLINGO-STYLE VISUAL ROADMAP) */}
      <div className="glass-panel p-10 rounded-3xl border border-white/10 space-y-12 bg-slate-950/80">
        <h3 className="font-serif text-xl font-bold text-slate-100 text-center">
          Lesson Pathway ({activeCourse.lessons.length > 0 ? `${activeCourse.lessons.length} Modules Available` : 'Module Launching Soon'})
        </h3>

        {activeCourse.lessons.length > 0 ? (
          <div className="max-w-2xl mx-auto space-y-8 relative">
            
            {/* Connecting Vertical Pathway Line */}
            <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-amber-500 via-rose-600 to-indigo-600 rounded-full" />

            {activeCourse.lessons.map((lesson, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={lesson.id}
                  className={`relative z-10 flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-6`}
                >
                  
                  {/* Lesson Node Badge Button */}
                  <div className="w-1/2 flex justify-end">
                    <div
                      onClick={() => setActiveModalLesson(lesson)}
                      className={`w-full max-w-sm glass-card p-5 cursor-pointer space-y-3 group hover:border-amber-400 transition-all ${
                        lesson.isCompleted ? 'border-emerald-500/40 bg-emerald-950/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                          Lesson {idx + 1}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                          <Award size={14} />
                          <span>+{lesson.xpReward} XP</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-serif text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-amber-300 font-serif font-semibold">
                          {lesson.titleRu}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-2">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{lesson.durationMinutes} mins</span>
                        </div>
                        
                        <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          <span>Preview & Start</span>
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Central Node Circle */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white font-bold shadow-lg border-2 border-slate-900 shrink-0 z-20">
                    {lesson.isCompleted ? (
                      <CheckCircle2 size={24} className="text-emerald-300" />
                    ) : (
                      <Play size={20} className="fill-white ml-0.5" />
                    )}
                  </div>

                  <div className="w-1/2" />

                </div>
              );
            })}

          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-500">
              <Lock size={32} />
            </div>
            <h4 className="font-serif text-xl font-bold text-slate-200">
              Level {selectedLevel} Content Unlocking
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Complete Level A1 Starter modules first to unlock advanced B1/B2 literature and grammar tracks!
            </p>
          </div>
        )}
      </div>

      {/* LESSON PREVIEW MODAL */}
      {activeModalLesson && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-8 rounded-3xl border border-amber-500/40 max-w-lg w-full bg-slate-900 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Lesson Preview
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-100">
                  {activeModalLesson.title}
                </h3>
                <p className="text-xs text-amber-300 font-serif italic">
                  «{activeModalLesson.titleRu}»
                </p>
              </div>

              <button
                onClick={() => setActiveModalLesson(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                <span className="text-amber-400 font-bold block">Grammar Focus:</span>
                <p className="text-slate-200 font-semibold">{activeModalLesson.grammarFocus}</p>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-2">Target Vocabulary (Sample):</span>
                <div className="grid grid-cols-2 gap-2">
                  {activeModalLesson.vocabulary.map((v, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-800/80 border border-white/5">
                      <span className="font-bold text-amber-300 block">{v.word}</span>
                      <span className="text-[10px] text-slate-300">{v.translation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                onClick={() => setActiveModalLesson(null)}
                className="btn-ghost text-xs"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  const lessonToStart = activeModalLesson;
                  setActiveModalLesson(null);
                  handleLessonLaunch(lessonToStart);
                }}
                className="btn-gold text-xs flex-1"
              >
                <Play size={16} className="fill-slate-950" />
                <span>Launch Interactive Studio</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
