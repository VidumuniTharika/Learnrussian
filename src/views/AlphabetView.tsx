import React, { useState } from 'react';
import { CYRILLIC_ALPHABET } from '../data/mockData';
import { CyrillicLetter } from '../types';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { Volume2, Sparkles, RefreshCw, CheckCircle, HelpCircle, Eye } from 'lucide-react';

export const AlphabetView: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'vowel' | 'consonant' | 'sign'>('all');
  const [activeLetter, setActiveLetter] = useState<CyrillicLetter>(CYRILLIC_ALPHABET[0]);
  const [isCursiveMode, setIsCursiveMode] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Speed Mini-Game State
  const [gameActive, setGameActive] = useState(false);
  const [targetLetter, setTargetLetter] = useState<CyrillicLetter | null>(null);
  const [score, setScore] = useState(0);
  const [gameFeedback, setGameFeedback] = useState<string | null>(null);

  const filteredLetters = CYRILLIC_ALPHABET.filter(letter => {
    if (selectedFilter === 'all') return true;
    return letter.category === selectedFilter;
  });

  const handlePlayLetter = async (letter: CyrillicLetter) => {
    setActiveLetter(letter);
    setIsPlayingAudio(true);
    playSoundEffect('click');
    await playRussianSpeech(letter.symbol);
    setIsPlayingAudio(false);
  };

  const handlePlaySample = async (word: string) => {
    setIsPlayingAudio(true);
    await playRussianSpeech(word);
    setIsPlayingAudio(false);
  };

  const startMiniGame = () => {
    const randomLetter = CYRILLIC_ALPHABET[Math.floor(Math.random() * CYRILLIC_ALPHABET.length)];
    setTargetLetter(randomLetter);
    setGameActive(true);
    setGameFeedback(null);
    playRussianSpeech(randomLetter.symbol);
  };

  const handleGameGuess = (letter: CyrillicLetter) => {
    if (!targetLetter) return;
    if (letter.id === targetLetter.id) {
      playSoundEffect('correct');
      setScore(prev => prev + 10);
      setGameFeedback('Correct! Молодец! 🎉');
      setTimeout(() => {
        const next = CYRILLIC_ALPHABET[Math.floor(Math.random() * CYRILLIC_ALPHABET.length)];
        setTargetLetter(next);
        setGameFeedback(null);
        playRussianSpeech(next.symbol);
      }, 1000);
    } else {
      playSoundEffect('wrong');
      setGameFeedback(`Oops! That was "${letter.symbol}". Try again!`);
    }
  };

  return (
    <div className="space-y-12 py-6">
      
      {/* HEADER BANNER */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Interactive Cyrillic Master (Азбука)</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-100">
            The 33 Russian Letters & Soundboard
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Click any letter to hear native pronunciation, inspect phonetic guides, practice cursive writing, and test your recognition.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-white/10">
          {(['all', 'vowel', 'consonant', 'sign'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                selectedFilter === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All (33)' : cat === 'vowel' ? 'Vowels (10)' : cat === 'consonant' ? 'Consonants (21)' : 'Signs (2)'}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT: ALPHABET GRID & LETTER DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: 33 Letter Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Showing {filteredLetters.length} Letters
            </span>
            
            <button
              onClick={() => setIsCursiveMode(!isCursiveMode)}
              className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
            >
              <Eye size={14} />
              <span>{isCursiveMode ? 'Switch to Standard Print' : 'View Russian Cursive Script'}</span>
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {filteredLetters.map(letter => {
              const isSelected = activeLetter.id === letter.id;
              return (
                <button
                  key={letter.id}
                  onClick={() => handlePlayLetter(letter)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-1 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-amber-500 to-rose-600 border-amber-300 text-white shadow-xl scale-105'
                      : 'bg-slate-900/60 border-white/10 text-slate-100 hover:border-amber-400/50 hover:bg-slate-800'
                  }`}
                >
                  <span className={`text-3xl font-bold ${isCursiveMode ? 'font-cursive text-amber-300' : 'font-serif'}`}>
                    {letter.symbol}
                  </span>
                  <span className="text-[10px] text-slate-300 uppercase font-semibold">
                    {letter.lowercase}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate max-w-full">
                    {letter.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Letter Deep-Dive Drawer */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-slate-950/80 space-y-6 sticky top-24 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Letter Details
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-100">
                  {activeLetter.name} ({activeLetter.symbol})
                </h3>
              </div>

              <button
                onClick={() => handlePlayLetter(activeLetter)}
                disabled={isPlayingAudio}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-white hover:scale-105 transition-transform shadow-lg"
                title="Listen to Audio"
              >
                <Volume2 size={24} className={isPlayingAudio ? 'animate-bounce' : ''} />
              </button>
            </div>

            {/* Print vs Cursive Comparison */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Standard Print</span>
                <span className="font-serif text-5xl font-bold text-slate-100">
                  {activeLetter.symbol} {activeLetter.lowercase}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/20">
                <span className="text-[10px] text-amber-400 uppercase font-bold block mb-1">Russian Cursive Script</span>
                <span className="font-cursive text-5xl font-bold text-amber-300">
                  {activeLetter.symbol} {activeLetter.lowercase}
                </span>
              </div>
            </div>

            {/* Phonetic & IPA Guide */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">IPA Phonetic Symbol:</span>
                <span className="font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-white/10 font-bold">
                  {activeLetter.ipa}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">English Approximate Sound:</span>
                <span className="font-semibold text-slate-100 text-right">
                  {activeLetter.englishApprox}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Letter Classification:</span>
                <span className="capitalize px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                  {activeLetter.category}
                </span>
              </div>
            </div>

            {/* Vocabulary Example Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Sample Word Card
                </span>
                <button
                  onClick={() => handlePlaySample(activeLetter.sampleWord)}
                  className="text-xs text-slate-300 hover:text-amber-400 flex items-center gap-1"
                >
                  <Volume2 size={14} />
                  <span>Listen</span>
                </button>
              </div>

              <div className="flex items-baseline justify-between">
                <h4 className="font-serif text-2xl font-bold text-amber-300">
                  {activeLetter.sampleWord}
                </h4>
                <span className="text-xs text-slate-300 italic">
                  "{activeLetter.sampleTranslationEn}"
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* CYRILLIC SPEED MINI-GAME */}
      <section className="glass-panel p-8 rounded-3xl border border-rose-500/30 bg-slate-950/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <HelpCircle size={16} />
              <span>Interactive Audio Challenge</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-100">
              Cyrillic Sound Recognition Mini-Game
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold">
              Score: {score} XP
            </div>
            
            <button
              onClick={startMiniGame}
              className="btn-primary text-xs"
            >
              <RefreshCw size={14} />
              <span>{gameActive ? 'Restart Game' : 'Start Sound Game'}</span>
            </button>
          </div>
        </div>

        {gameActive && targetLetter ? (
          <div className="space-y-6 text-center py-4">
            
            <div className="space-y-3">
              <p className="text-sm text-slate-300">
                Listen to the Russian letter audio sound and select the matching Cyrillic symbol below!
              </p>
              
              <button
                onClick={() => playRussianSpeech(targetLetter.symbol)}
                className="px-6 py-3 rounded-full bg-rose-600 text-white font-bold inline-flex items-center gap-2 hover:bg-rose-500 transition-transform shadow-lg animate-pulse"
              >
                <Volume2 size={20} />
                <span>Replay Audio Prompt</span>
              </button>
            </div>

            {gameFeedback && (
              <div className={`p-3 rounded-xl max-w-md mx-auto text-sm font-bold ${
                gameFeedback.includes('Correct') 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {gameFeedback}
              </div>
            )}

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 max-w-2xl mx-auto pt-2">
              {CYRILLIC_ALPHABET.slice(0, 8).map(letter => (
                <button
                  key={letter.id}
                  onClick={() => handleGameGuess(letter)}
                  className="p-4 rounded-2xl bg-slate-900 border border-white/10 hover:border-amber-400 text-center font-serif text-2xl font-bold text-slate-100 hover:scale-105 transition-all shadow-md"
                >
                  {letter.symbol}
                </button>
              ))}
            </div>

          </div>
        ) : (
          <div className="text-center py-6 text-slate-400 text-sm">
            Press <strong>"Start Sound Game"</strong> to test how quickly you can recognize Russian spoken Cyrillic letters!
          </div>
        )}
      </section>

    </div>
  );
};
