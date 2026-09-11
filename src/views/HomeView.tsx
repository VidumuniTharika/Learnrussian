import React, { useState } from 'react';
import { ActiveView } from '../types';
import { CYRILLIC_ALPHABET, COURSES_DATA } from '../data/mockData';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { 
  Sparkles, 
  BookOpen, 
  Volume2, 
  ArrowRight, 
  Globe2, 
  ShieldCheck, 
  Award, 
  MessageCircle,
  Play,
  Compass,
  Star
} from 'lucide-react';

interface HomeViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveView }) => {
  const [activeLetter, setActiveLetter] = useState(CYRILLIC_ALPHABET[0]);
  const [playingAudio, setPlayingAudio] = useState(false);

  const handlePlayLetter = async (letter: typeof CYRILLIC_ALPHABET[0]) => {
    setActiveLetter(letter);
    setPlayingAudio(true);
    playSoundEffect('click');
    await playRussianSpeech(letter.symbol);
    setPlayingAudio(false);
  };

  const handlePlaySample = async (word: string) => {
    setPlayingAudio(true);
    await playRussianSpeech(word);
    setPlayingAudio(false);
  };

  return (
    <div className="space-y-24 py-10">
      
      {/* AWWWARDS LUXURY EDITORIAL HERO SECTION */}
      <section className="relative space-y-8">
        
        {/* Top Awwwards Badge & Date Bar */}
        <div className="flex items-center justify-between">
          <div className="awwwards-score-badge">
            <span className="text-[9px] uppercase font-bold text-[var(--text-muted)] tracking-widest block">SOTD</span>
            <span className="text-xl font-display font-extrabold text-[var(--text-primary)]">9.8</span>
            <span className="text-[9px] text-[var(--text-muted)] font-bold">/10</span>
          </div>

          <div className="text-right text-xs font-mono text-[var(--text-secondary)]">
            <span className="block font-bold">Site of the Day • Sep 11, 2026</span>
            <span className="text-[10px] text-[var(--text-muted)]">Global Russian Language Program</span>
          </div>
        </div>

        {/* GIANT EDITORIAL HEADLINE */}
        <div className="border-b border-t border-[var(--text-primary)] py-8 space-y-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="font-display text-5xl sm:text-8xl font-extrabold tracking-tighter uppercase leading-none text-[var(--text-primary)]">
              РУССКИЙ ЯЗЫК
            </h1>
            <span className="font-serif italic text-xl sm:text-3xl text-amber-600 font-bold">
              Russian Institute
            </span>
          </div>
          
          <p className="text-base sm:text-xl text-[var(--text-secondary)] max-w-3xl font-sans leading-relaxed">
            Master Cyrillic typography, interactive grammar case matrices, real-world dialogue simulators, and native speech recognition built for international students.
          </p>
        </div>

        {/* Action Bar & Stats */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('courses')}
              className="pill-btn"
            >
              <span>Explore Curriculum Roadmap</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setActiveView('alphabet')}
              className="pill-btn-outline"
            >
              <Sparkles size={16} className="text-rose-600" />
              <span>Practice Cyrillic (Азбука)</span>
            </button>
          </div>

          <div className="flex items-center gap-8 font-mono text-xs">
            <div>
              <span className="font-display text-xl font-bold block text-[var(--text-primary)]">33</span>
              <span className="text-[var(--text-muted)] uppercase">Cyrillic Letters</span>
            </div>
            <div>
              <span className="font-display text-xl font-bold block text-amber-600">6</span>
              <span className="text-[var(--text-muted)] uppercase">Russian Cases</span>
            </div>
            <div>
              <span className="font-display text-xl font-bold block text-emerald-600">140+</span>
              <span className="text-[var(--text-muted)] uppercase">Nations</span>
            </div>
          </div>

        </div>

      </section>

      {/* EDITORIAL CYRILLIC SOUNDBOARD & SPOTLIGHT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Cyrillic Alphabet Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
            <div>
              <span className="pill-badge">Interactive Soundboard</span>
              <h2 className="font-display text-3xl font-bold mt-2 text-[var(--text-primary)]">
                Азбука Cyrillic Matrix
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">33 Spoken Letters</span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5">
            {CYRILLIC_ALPHABET.slice(0, 12).map((letter) => {
              const isSelected = activeLetter.id === letter.id;
              return (
                <button
                  key={letter.id}
                  onClick={() => handlePlayLetter(letter)}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                    isSelected
                      ? 'bg-[var(--text-primary)] text-[var(--bg-main)] border-[var(--text-primary)] shadow-lg scale-105'
                      : 'bg-[var(--bg-surface)] border-[var(--border-light)] text-[var(--text-primary)] hover:border-[var(--text-primary)]'
                  }`}
                >
                  <span className="font-serif text-2xl font-bold block">{letter.symbol}</span>
                  <span className="text-[9px] uppercase font-mono mt-1 opacity-75">{letter.name}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setActiveView('alphabet')}
            className="w-full py-3 pill-btn-outline justify-center text-xs"
          >
            <span>View All 33 Cyrillic Letters & Audio Exercises</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Right: Active Letter Detail Drawer */}
        <div className="lg:col-span-5 editorial-card p-8 bg-[var(--bg-surface)] space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-amber-600 font-bold">Selected Symbol</span>
              <h3 className="font-display text-3xl font-extrabold text-[var(--text-primary)]">
                {activeLetter.symbol} {activeLetter.lowercase}
              </h3>
            </div>

            <button
              onClick={() => handlePlaySample(activeLetter.sampleWord)}
              disabled={playingAudio}
              className="p-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-main)] hover:scale-105 transition-transform"
              title="Listen Audio"
            >
              <Volume2 size={20} className={playingAudio ? 'animate-ping' : ''} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1">Standard Print</span>
              <span className="font-serif text-4xl font-bold">{activeLetter.symbol}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)]">
              <span className="text-[10px] font-mono text-amber-600 uppercase block mb-1">Cursive Script</span>
              <span className="font-cursive text-4xl font-bold text-amber-600">{activeLetter.symbol}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] space-y-2">
            <span className="text-xs font-mono text-[var(--text-muted)] block">Sample Vocabulary:</span>
            <div className="flex items-baseline justify-between">
              <h4 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
                {activeLetter.sampleWord}
              </h4>
              <span className="text-xs text-[var(--text-secondary)] italic">
                "{activeLetter.sampleTranslationEn}"
              </span>
            </div>
          </div>
        </div>

      </section>

      {/* EDITORIAL CEFR CURRICULUM OVERVIEW */}
      <section className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--text-primary)] pb-6 gap-4">
          <div className="space-y-2">
            <span className="pill-badge">CEFR Standard A1 - C1</span>
            <h2 className="font-display text-4xl font-extrabold uppercase text-[var(--text-primary)]">
              Curriculum Tracks
            </h2>
          </div>

          <button
            onClick={() => setActiveView('courses')}
            className="pill-btn-outline text-xs"
          >
            <span>View Full Skill Tree</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES_DATA.map((course) => (
            <div
              key={course.id}
              onClick={() => setActiveView('courses')}
              className="editorial-card p-6 cursor-pointer space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="pill-badge bg-[var(--text-primary)] text-[var(--bg-main)]">
                    Level {course.level}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">{course.lessons.length} Lessons</span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {course.title}
                  </h3>
                  <p className="text-xs font-serif italic text-amber-600 font-bold mt-1">
                    {course.titleRu}
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
                <span>Launch Track</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
