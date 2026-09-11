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
    <div className="space-y-12 py-8">
      
      {/* HEADER BANNER */}
      <div className="border-b border-[var(--text-primary)] pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="pill-badge">Interactive Cyrillic Master</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
            Азбука Soundboard
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl">
            Click any of the 33 letters to inspect phonetic guides, listen to native voice playback, and practice cursive handwriting.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full border border-[var(--border-light)] bg-[var(--bg-surface)]">
          {(['all', 'vowel', 'consonant', 'sign'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
                selectedFilter === cat
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
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
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase">
              Showing {filteredLetters.length} Letters
            </span>
            
            <button
              onClick={() => setIsCursiveMode(!isCursiveMode)}
              className="pill-btn-outline text-xs py-1 px-3"
            >
              <Eye size={14} />
              <span>{isCursiveMode ? 'Standard Print' : 'Cursive Script'}</span>
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
                      ? 'bg-[var(--text-primary)] text-[var(--bg-main)] border-[var(--text-primary)] shadow-lg scale-105'
                      : 'bg-[var(--bg-surface)] border-[var(--border-light)] text-[var(--text-primary)] hover:border-[var(--text-primary)]'
                  }`}
                >
                  <span className={`text-3xl font-bold ${isCursiveMode ? 'font-cursive text-amber-600' : 'font-serif'}`}>
                    {letter.symbol}
                  </span>
                  <span className="text-[10px] uppercase font-mono">
                    {letter.lowercase}
                  </span>
                  <span className="text-[9px] truncate max-w-full opacity-75">
                    {letter.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Letter Detail Drawer */}
        <div className="lg:col-span-5 space-y-6">
          <div className="editorial-card p-6 bg-[var(--bg-surface)] space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
              <div>
                <span className="pill-badge">Letter Overview</span>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mt-1">
                  {activeLetter.name} ({activeLetter.symbol})
                </h3>
              </div>

              <button
                onClick={() => handlePlayLetter(activeLetter)}
                disabled={isPlayingAudio}
                className="p-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-main)] hover:scale-105 transition-transform"
              >
                <Volume2 size={22} className={isPlayingAudio ? 'animate-bounce' : ''} />
              </button>
            </div>

            {/* Print vs Cursive Comparison */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)]">
                <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block mb-1">Print</span>
                <span className="font-serif text-5xl font-bold">
                  {activeLetter.symbol}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)]">
                <span className="text-[10px] font-mono uppercase text-amber-600 block mb-1">Cursive Script</span>
                <span className="font-cursive text-5xl font-bold text-amber-600">
                  {activeLetter.symbol}
                </span>
              </div>
            </div>

            {/* Phonetic & IPA Guide */}
            <div className="space-y-3 p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-muted)]">IPA Symbol:</span>
                <span className="font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-light)] font-bold">
                  {activeLetter.ipa}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[var(--text-muted)]">English Approx Sound:</span>
                <span className="font-bold text-[var(--text-primary)]">
                  {activeLetter.englishApprox}
                </span>
              </div>
            </div>

            {/* Vocabulary Example Card */}
            <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--text-muted)]">Sample Word:</span>
                <button
                  onClick={() => handlePlaySample(activeLetter.sampleWord)}
                  className="text-xs text-amber-600 font-bold flex items-center gap-1"
                >
                  <Volume2 size={14} />
                  <span>Listen</span>
                </button>
              </div>

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
        </div>

      </div>

      {/* CYRILLIC SPEED MINI-GAME */}
      <section className="editorial-card p-8 bg-[var(--bg-surface)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-4">
          <div className="space-y-1">
            <span className="pill-badge">Audio Challenge</span>
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              Cyrillic Sound Recognition Game
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-amber-600">Score: {score} XP</span>
            <button
              onClick={startMiniGame}
              className="pill-btn text-xs"
            >
              <RefreshCw size={14} />
              <span>{gameActive ? 'Restart Game' : 'Start Sound Game'}</span>
            </button>
          </div>
        </div>

        {gameActive && targetLetter ? (
          <div className="space-y-6 text-center py-4">
            <div className="space-y-3">
              <p className="text-xs text-[var(--text-secondary)]">
                Listen to the Russian letter audio sound and click the matching symbol below!
              </p>
              
              <button
                onClick={() => playRussianSpeech(targetLetter.symbol)}
                className="pill-btn mx-auto"
              >
                <Volume2 size={18} />
                <span>Replay Audio Prompt</span>
              </button>
            </div>

            {gameFeedback && (
              <div className="p-3 rounded-xl max-w-md mx-auto text-xs font-bold border border-[var(--text-primary)] bg-[var(--bg-main)]">
                {gameFeedback}
              </div>
            )}

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 max-w-2xl mx-auto pt-2">
              {CYRILLIC_ALPHABET.slice(0, 8).map(letter => (
                <button
                  key={letter.id}
                  onClick={() => handleGameGuess(letter)}
                  className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] font-serif text-2xl font-bold hover:border-[var(--text-primary)] hover:scale-105 transition-all shadow-sm"
                >
                  {letter.symbol}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-[var(--text-muted)] text-xs">
            Click <strong>"Start Sound Game"</strong> to test how quickly you recognize spoken Cyrillic letters!
          </div>
        )}
      </section>

    </div>
  );
};
