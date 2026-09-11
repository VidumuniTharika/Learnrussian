import React, { useState } from 'react';
import { DictationItem } from '../types';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { Volume2, Sparkles, CheckCircle2, RefreshCw, ArrowRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const DICTATION_ITEMS: DictationItem[] = [
  {
    id: 'd1',
    audioPrompt: 'Здравствуйте, как вас зовут?',
    targetRu: 'Здравствуйте, как вас зовут?',
    translationEn: 'Hello, what is your name?',
    hint: 'Starts with formal greeting "Здравствуйте"'
  },
  {
    id: 'd2',
    audioPrompt: 'Я говорю по-русски и изучаю грамматику.',
    targetRu: 'Я говорю по-русски и изучаю грамматику.',
    translationEn: 'I speak Russian and study grammar.',
    hint: 'Includes hyphenated word "по-русски"'
  },
  {
    id: 'd3',
    audioPrompt: 'Большое спасибо за интересную экскурсию в музей.',
    targetRu: 'Большое спасибо за интересную экскурсию в музей.',
    translationEn: 'Thank you very much for the interesting excursion to the museum.',
    hint: 'Accusative case: "экскурсию в музей"'
  }
];

export const DictationView: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userText, setUserText] = useState('');
  const [speechRate, setSpeechRate] = useState(1.0);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentDict = DICTATION_ITEMS[currentIdx];

  const handlePlayAudio = () => {
    playRussianSpeech(currentDict.audioPrompt, speechRate);
  };

  const handleInsertChar = (char: string) => {
    playSoundEffect('click');
    setUserText(prev => prev + char);
  };

  const handleCheckDictation = () => {
    const cleanUser = userText.trim().toLowerCase().replace(/[.,!?]/g, '');
    const cleanTarget = currentDict.targetRu.trim().toLowerCase().replace(/[.,!?]/g, '');
    
    const correct = cleanUser === cleanTarget;
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      playSoundEffect('correct');
      confetti({ particleCount: 80, spread: 60 });
    } else {
      playSoundEffect('wrong');
    }
  };

  const handleNext = () => {
    setSubmitted(false);
    setUserText('');
    if (currentIdx + 1 < DICTATION_ITEMS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      
      {/* HEADER */}
      <div className="border-b border-[var(--text-primary)] pb-8 space-y-4">
        <span className="pill-badge">Stage 3 Audio Laboratory</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
          Cyrillic Audio Dictation Studio
        </h1>
        
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
          Listen to native Russian audio recordings at your chosen speed and type out the Cyrillic text to build active listening mastery!
        </p>

        {/* Speed Controls */}
        <div className="flex items-center gap-3 pt-2">
          <span className="text-xs font-mono text-[var(--text-muted)] font-bold">Audio Speed:</span>
          {[0.75, 1.0, 1.25].map(rate => (
            <button
              key={rate}
              onClick={() => setSpeechRate(rate)}
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                speechRate === rate
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] shadow-sm'
                  : 'bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-secondary)]'
              }`}
            >
              {rate}x {rate === 0.75 ? 'Slow' : rate === 1.0 ? 'Normal' : 'Fast'}
            </button>
          ))}
        </div>
      </div>

      {/* DICTATION WORKSPACE */}
      <div className="editorial-card p-8 bg-[var(--bg-surface)] space-y-8">
        
        <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
          <span className="pill-badge text-[9px]">
            Dictation {currentIdx + 1} of {DICTATION_ITEMS.length}
          </span>

          <button
            onClick={handlePlayAudio}
            className="pill-btn py-2 px-4 text-xs"
          >
            <Volume2 size={18} />
            <span>Play Spoken Prompt ({speechRate}x)</span>
          </button>
        </div>

        {/* Soft / Hard sign insertion helpers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-[var(--text-muted)] font-bold">
              Type What You Hear in Cyrillic:
            </label>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[var(--text-muted)]">Quick Signs:</span>
              {['ь', 'ъ', 'ы', 'ё', 'щ'].map(char => (
                <button
                  key={char}
                  onClick={() => handleInsertChar(char)}
                  className="px-2 py-0.5 rounded border border-[var(--border-light)] bg-[var(--bg-main)] font-serif font-bold text-xs hover:border-[var(--text-primary)]"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            disabled={submitted}
            rows={3}
            placeholder="Слушайте и пишите здесь..."
            className="w-full p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] font-serif text-lg font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] resize-none"
          />
        </div>

        {/* Feedback Section */}
        {submitted && (
          <div className={`p-4 rounded-2xl border text-xs font-bold ${
            isCorrect
              ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-700 border-rose-500/30'
          }`}>
            <p className="text-sm font-bold">{isCorrect ? '100% Correct Dictation! 🎉' : 'Needs Practice!'}</p>
            <p className="text-xs mt-1">Target Phrase: "{currentDict.targetRu}"</p>
            <p className="text-xs opacity-75 italic">Translation: "{currentDict.translationEn}"</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between border-t border-[var(--border-light)] pt-4">
          <span className="text-xs text-[var(--text-muted)] italic">
            Hint: {currentDict.hint}
          </span>

          {!submitted ? (
            <button
              disabled={!userText.trim()}
              onClick={handleCheckDictation}
              className="pill-btn text-xs disabled:opacity-30"
            >
              <span>Check Dictation</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="pill-btn text-xs"
            >
              <span>Next Audio Dictation</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
