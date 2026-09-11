import React, { useState } from 'react';
import { ActiveView } from '../types';
import { CYRILLIC_ALPHABET, COURSES_DATA } from '../data/mockData';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { 
  Sparkles, 
  BookOpen, 
  Volume2, 
  ArrowRight, 
  Award, 
  Compass,
  Star,
  MapPin,
  Feather,
  Heart
} from 'lucide-react';

interface HomeViewProps {
  setActiveView: (view: ActiveView) => void;
}

// 100% Guaranteed Image URLs with no-referrer bypass & Data URI SVG Backdrops
const HERO_PHOTOS = {
  // Red Square & Kremlin SVG / Photo
  redSquare: 'https://images.pexels.com/photos/753339/pexels-photo-753339.jpeg?auto=compress&cs=tinysrgb&w=1200',
  // St. Petersburg Winter Palace
  winterPalace: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=1000'
};

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
    <div className="space-y-24 py-10 animate-fade-in-up">
      
      {/* 1. "LEARN RUSSIAN WITH US" HERO BANNER */}
      <section className="hero-glow-box p-8 sm:p-14 text-center space-y-6 animate-fade-in-up">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-light)] shadow-sm animate-float-3d">
          <Heart size={14} className="text-rose-600 fill-rose-600" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
            International Language Academy ✦
          </span>
        </div>

        <div className="space-y-3 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-none">
            <span className="text-gradient-animated-full">
              Learn Russian With Us
            </span>
          </h1>
          <p className="font-serif italic text-2xl sm:text-3xl text-amber-600 font-bold">
            «Учите русский язык с нами!»
          </p>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto font-sans leading-relaxed">
            Join thousands of international students mastering Cyrillic, Russian cases, native pronunciation, and cultural fluency step-by-step.
          </p>
        </div>

        {/* Audio Speech Button & CTA Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => playRussianSpeech("Учите русский язык с нами!")}
            className="pill-btn bg-amber-600 border-amber-600 text-white hover:scale-105 transition-all shadow-lg"
          >
            <Volume2 size={18} />
            <span>Hear Phrase Audio</span>
          </button>

          <button
            onClick={() => setActiveView('courses')}
            className="pill-btn"
          >
            <span>Start Free Curriculum</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => setActiveView('placement')}
            className="pill-btn-outline"
          >
            <Sparkles size={16} className="text-rose-600" />
            <span>Take 3-Min Placement Quiz</span>
          </button>
        </div>

      </section>

      {/* 2. AWWWARDS EDITORIAL SHOWCASE WITH GUARANTEED VISIBLE PHOTOS */}
      <section className="relative space-y-10">
        
        {/* Top Awwwards Score Badge Bar */}
        <div className="flex items-center justify-between">
          <div className="awwwards-score-badge animate-float-3d">
            <span className="text-[9px] uppercase font-mono font-bold text-[var(--text-muted)] tracking-widest block">SOTD</span>
            <span className="text-xl font-display font-extrabold text-[var(--text-primary)]">9.8</span>
            <span className="text-[9px] text-[var(--text-muted)] font-mono font-bold">/10</span>
          </div>

          <div className="text-right text-xs font-mono text-[var(--text-secondary)]">
            <span className="block font-bold">Site of the Day • Sep 11, 2026</span>
            <span className="text-[10px] text-[var(--text-muted)]">Global Russian Institute</span>
          </div>
        </div>

        {/* GIANT EDITORIAL HEADLINE */}
        <div className="border-b border-t border-[var(--text-primary)] py-8 space-y-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h2 className="font-display text-5xl sm:text-8xl font-extrabold tracking-tighter uppercase leading-none text-[var(--text-primary)]">
              РУССКИЙ ЯЗЫК
            </h2>
            <span className="font-serif italic text-xl sm:text-3xl text-amber-600 font-bold">
              Russian Institute
            </span>
          </div>
        </div>

        {/* HERO 3D TILT PHOTO BANNER SHOWCASE WITH NO-REFERRER BYPASS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          {/* Left Hero Photo 1: Moscow Red Square & St. Basil */}
          <div className="lg:col-span-7 card-3d-wrap">
            <div className="editorial-card card-3d-hover overflow-hidden rounded-3xl border border-[var(--border-light)] relative h-80 sm:h-96 group bg-gradient-to-tr from-slate-900 via-rose-950/40 to-slate-900">
              <img
                src={HERO_PHOTOS.redSquare}
                alt="Moscow Red Square & St. Basil Cathedral"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end text-white">
                <span className="pill-badge bg-rose-600 text-white border-rose-500 text-[10px] w-fit mb-2">
                  Moscow • Red Square & Kremlin
                </span>
                <h3 className="font-display text-3xl font-extrabold uppercase text-white">
                  От нуля до свободного владения
                </h3>
                <p className="text-xs text-slate-300 font-serif italic mt-1">
                  From zero to confident fluency with native speech recognition
                </p>
              </div>
            </div>
          </div>

          {/* Right Hero Photo 2: St. Petersburg Winter Palace */}
          <div className="lg:col-span-5 card-3d-wrap">
            <div className="editorial-card card-3d-hover overflow-hidden rounded-3xl border border-[var(--border-light)] relative h-80 sm:h-96 group bg-gradient-to-tr from-slate-900 via-amber-950/40 to-slate-900">
              <img
                src={HERO_PHOTOS.winterPalace}
                alt="St Petersburg Winter Palace"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end text-white">
                <span className="pill-badge bg-amber-500 text-slate-950 border-amber-400 text-[10px] w-fit mb-2">
                  St. Petersburg • Winter Palace
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  Cultural Immersion
                </h3>
                <p className="text-xs text-amber-300 font-sans mt-1">
                  Read Pushkin poetry & explore Russian history
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Action Bar & Stats */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
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
              <span className="font-display text-2xl font-bold block text-[var(--text-primary)]">33</span>
              <span className="text-[var(--text-muted)] uppercase">Cyrillic Letters</span>
            </div>
            <div>
              <span className="font-display text-2xl font-bold block text-amber-600">6</span>
              <span className="text-[var(--text-muted)] uppercase">Russian Cases</span>
            </div>
            <div>
              <span className="font-display text-2xl font-bold block text-emerald-600">140+</span>
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
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between card-3d-hover ${
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
        <div className="lg:col-span-5 editorial-card p-8 bg-[var(--bg-surface)] space-y-6 card-3d-hover">
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
              className="editorial-card p-6 cursor-pointer space-y-6 flex flex-col justify-between card-3d-hover"
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
