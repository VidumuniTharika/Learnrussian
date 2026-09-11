import React, { useState } from 'react';
import { ActiveView, CEFRLevel } from '../types';
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
  Users,
  Compass
} from 'lucide-react';

interface HomeViewProps {
  setActiveView: (view: ActiveView) => void;
  setSelectedCourseId?: (id: string) => void;
  startLesson?: (lessonId: string) => void;
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
    <div className="space-y-20 py-6">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 sm:p-14 backdrop-blur-2xl shadow-2xl">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-glow" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles size={14} />
              <span>International Institute for Russian Studies</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-slate-100">
              Master Russian <br />
              <span className="text-gradient-gold">From Anywhere</span> in the World
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Step into the world of Cyrillic typography, interactive case matrices, real-world dialogue simulators, and native audio practice built for international learners.
            </p>

            {/* Cyrillic Motto Ticker */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-amber-400 uppercase font-bold tracking-wider block">
                  Institute Motto / Девиз
                </span>
                <p className="font-serif text-lg text-slate-100 font-bold italic">
                  «От нуля до свободного владения»
                </p>
                <p className="text-xs text-slate-400">From zero to confident fluency</p>
              </div>
              <button 
                onClick={() => playRussianSpeech("От нуля до свободного владения")}
                className="p-3 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
                title="Listen to Motto"
              >
                <Volume2 size={20} />
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveView('courses')}
                className="btn-gold text-base"
              >
                <span>Explore Courses</span>
                <ArrowRight size={18} />
              </button>
              
              <button
                onClick={() => setActiveView('alphabet')}
                className="btn-ghost text-base"
              >
                <Sparkles size={18} className="text-rose-400" />
                <span>Practice Cyrillic (Азбука)</span>
              </button>
            </div>

            {/* Stats Pills */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10">
              <div>
                <span className="font-serif text-2xl font-bold text-slate-100">33</span>
                <p className="text-xs text-slate-400">Cyrillic Letters</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-amber-400">6</span>
                <p className="text-xs text-slate-400">Grammar Cases</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-emerald-400">140+</span>
                <p className="text-xs text-slate-400">Student Nations</p>
              </div>
            </div>

          </div>

          {/* Right Cyrillic Soundboard Teaser Widget */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-amber-500/30 bg-slate-950/70 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  Interactive Азбука Soundboard
                </h3>
                <p className="text-xs text-slate-400">Click any letter to test audio</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold">
                Audio Engine
              </span>
            </div>

            {/* 10 Highlighted Cyrillic Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {CYRILLIC_ALPHABET.slice(0, 10).map((letter) => (
                <button
                  key={letter.id}
                  onClick={() => handlePlayLetter(letter)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    activeLetter.id === letter.id
                      ? 'bg-gradient-to-tr from-amber-500 to-rose-600 border-amber-400 text-white shadow-lg scale-105'
                      : 'bg-slate-900/60 border-white/10 text-slate-200 hover:border-amber-400/50 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-serif text-xl font-bold block">{letter.symbol}</span>
                  <span className="text-[10px] text-slate-400 uppercase">{letter.name}</span>
                </button>
              ))}
            </div>

            {/* Active Letter Detail Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-4xl font-bold text-amber-400">
                    {activeLetter.symbol} {activeLetter.lowercase}
                  </span>
                  <div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                      {activeLetter.ipa}
                    </span>
                    <p className="text-xs text-slate-300 mt-1">
                      Sounds like: <strong className="text-white">{activeLetter.englishApprox}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handlePlaySample(activeLetter.sampleWord)}
                  disabled={playingAudio}
                  className="p-3 rounded-full bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-md"
                  title="Play Sample Word"
                >
                  <Volume2 size={20} className={playingAudio ? 'animate-ping' : ''} />
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Sample Vocabulary:</span>
                  <p className="font-serif text-sm font-bold text-amber-300">
                    {activeLetter.sampleWord}
                  </p>
                </div>
                <span className="text-xs text-slate-300 italic">
                  "{activeLetter.sampleTranslationEn}"
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveView('alphabet')}
              className="w-full mt-4 py-2.5 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore All 33 Cyrillic Letters & Audio</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* CEFR CURRICULUM OVERVIEW */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen size={14} />
            <span>Structured CEFR Roadmap</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">
            Choose Your Learning Pathway
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            From your very first "Привет" to analyzing Pushkin poetry and conducting Russian business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES_DATA.map((course) => (
            <div
              key={course.id}
              onClick={() => setActiveView('courses')}
              className="glass-card p-6 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white bg-emerald-600`}>
                    Level {course.level}
                  </span>
                  <span className="text-xs text-slate-400">{course.lessons.length} Lessons</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-amber-300 font-serif font-semibold">
                  {course.titleRu}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
                <span>Start Course</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORM FEATURES GRID */}
      <section className="glass-panel p-10 rounded-3xl border border-white/10 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl font-bold text-slate-100">
            Why Students Worldwide Love РусскийМир
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Our interactive methodology focuses on natural memory retention and real conversation skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Compass size={24} />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-100">
              Interactive Case Matrix
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              De-mystify the 6 Russian cases with live declension converters and color-coded visual charts.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <MessageCircle size={24} />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-100">
              Real Dialogue Simulators
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Practice ordering coffee in Moscow, buying train tickets, and asking directions with interactive voice playback.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Award size={24} />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-100">
              Gamified Streaks & Badges
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Earn XP points, collect rare Cyrillic achievements, and maintain your daily Russian practice streak!
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
