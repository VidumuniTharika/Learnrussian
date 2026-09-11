import React, { useState } from 'react';
import { COURSES_DATA } from '../data/mockData';
import { CEFRLevel, Lesson } from '../types';
import { BookOpen, Clock, Award, Play, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
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
    <div className="space-y-12 py-8">
      
      {/* HEADER */}
      <div className="border-b border-[var(--text-primary)] pb-8 space-y-4">
        <span className="pill-badge">CEFR Curriculum Roadmap</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
          Russian Language Pathway
        </h1>
        
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
          Follow our international CEFR framework. Unlock structured lessons in sequence to build permanent Russian grammar & speaking mastery.
        </p>

        {/* Level Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {(['A1', 'A2', 'B1', 'B2'] as const).map(lvl => {
            const isActive = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => {
                  playSoundEffect('click');
                  setSelectedLevel(lvl);
                }}
                className={`px-5 py-2 rounded-full font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-[var(--text-primary)] text-[var(--bg-main)] shadow-md scale-105'
                    : 'bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>Level {lvl}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE COURSE SUMMARY CARD */}
      <div className="editorial-card p-6 bg-[var(--bg-surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-bold text-[var(--text-primary)]">
              {activeCourse.title}
            </span>
            <span className="text-xs text-amber-600 font-serif font-bold italic">
              «{activeCourse.titleRu}»
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] max-w-2xl">
            {activeCourse.description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-light)]">
            <Clock size={14} className="text-amber-600" />
            <span>Est. 12 Hours</span>
          </div>
        </div>
      </div>

      {/* SKILL TREE ROADMAP */}
      <div className="editorial-card p-10 bg-[var(--bg-surface)] space-y-12">
        <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] text-center uppercase">
          Lesson Pathway ({activeCourse.lessons.length} Modules)
        </h3>

        {activeCourse.lessons.length > 0 ? (
          <div className="max-w-2xl mx-auto space-y-8 relative">
            <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-0.5 bg-[var(--border-light)]" />

            {activeCourse.lessons.map((lesson, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={lesson.id}
                  className={`relative z-10 flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-6`}
                >
                  <div className="w-1/2 flex justify-end">
                    <div
                      onClick={() => setActiveModalLesson(lesson)}
                      className={`w-full max-w-sm editorial-card p-5 cursor-pointer space-y-3 group hover:border-[var(--text-primary)] transition-all ${
                        lesson.isCompleted ? 'border-emerald-600/40' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="pill-badge text-[9px]">
                          Lesson {idx + 1}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-mono text-amber-600 font-bold">
                          <Award size={14} />
                          <span>+{lesson.xpReward} XP</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-display text-lg font-bold text-[var(--text-primary)] group-hover:text-amber-600 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-amber-600 font-serif font-bold italic">
                          {lesson.titleRu}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[var(--text-muted)] border-t border-[var(--border-light)] pt-2 font-mono">
                        <span>{lesson.durationMinutes} mins</span>
                        <span className="text-[var(--text-primary)] font-bold flex items-center gap-1">
                          <span>Preview & Start</span>
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-[var(--text-primary)] text-[var(--bg-main)] flex items-center justify-center font-bold shadow-lg border-2 border-[var(--bg-main)] shrink-0 z-20">
                    {lesson.isCompleted ? (
                      <CheckCircle2 size={24} className="text-emerald-400" />
                    ) : (
                      <Play size={18} className="fill-[var(--bg-main)] ml-0.5" />
                    )}
                  </div>

                  <div className="w-1/2" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-main)] border border-[var(--border-light)] flex items-center justify-center mx-auto text-[var(--text-muted)]">
              <Lock size={28} />
            </div>
            <h4 className="font-display text-xl font-bold text-[var(--text-primary)]">
              Level {selectedLevel} Content Unlocking
            </h4>
            <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
              Complete Level A1 Starter modules first to unlock advanced B1/B2 literature tracks!
            </p>
          </div>
        )}
      </div>

      {/* LESSON PREVIEW MODAL */}
      {activeModalLesson && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="editorial-card p-8 max-w-lg w-full bg-[var(--bg-surface)] space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
              <div>
                <span className="pill-badge">Lesson Preview</span>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mt-1">
                  {activeModalLesson.title}
                </h3>
                <p className="text-xs text-amber-600 font-serif italic font-bold">
                  «{activeModalLesson.titleRu}»
                </p>
              </div>

              <button
                onClick={() => setActiveModalLesson(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-[var(--text-secondary)]">
              <div className="p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] space-y-1">
                <span className="text-[var(--text-primary)] font-bold block">Grammar Focus:</span>
                <p className="font-semibold text-[var(--text-primary)]">{activeModalLesson.grammarFocus}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between gap-4">
              <button
                onClick={() => setActiveModalLesson(null)}
                className="pill-btn-outline text-xs"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  const lessonToStart = activeModalLesson;
                  setActiveModalLesson(null);
                  handleLessonLaunch(lessonToStart);
                }}
                className="pill-btn text-xs flex-1 justify-center"
              >
                <Play size={14} className="fill-[var(--bg-main)]" />
                <span>Launch Interactive Studio</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
