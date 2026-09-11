import React, { useState } from 'react';
import { SRSCardItem } from '../types';
import { calculateNextSRSReview } from '../utils/srsAlgorithm';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { Sparkles, Volume2, RotateCcw, CheckCircle2, Award, Clock } from 'lucide-react';

interface SRSFlashcardsViewProps {
  cards: SRSCardItem[];
  onUpdateCards: (newCards: SRSCardItem[]) => void;
}

export const SRSFlashcardsView: React.FC<SRSFlashcardsViewProps> = ({
  cards,
  onUpdateCards
}) => {
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[activeCardIdx];

  const handleSpeech = (text: string) => {
    playRussianSpeech(text);
  };

  const handleRate = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    playSoundEffect(rating === 'good' || rating === 'easy' ? 'correct' : 'click');
    
    if (currentCard) {
      const updatedCard = calculateNextSRSReview(currentCard, rating);
      const newDeck = cards.map(c => c.id === updatedCard.id ? updatedCard : c);
      onUpdateCards(newDeck);
    }

    setIsFlipped(false);
    if (activeCardIdx + 1 < cards.length) {
      setActiveCardIdx(prev => prev + 1);
    } else {
      setActiveCardIdx(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 animate-fade-in-up">
      
      {/* HEADER */}
      <div className="border-b border-[var(--text-primary)] pb-8 space-y-4">
        <span className="pill-badge">Leitner 5-Box SRS Engine</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
          Spaced Repetition Memory Deck
        </h1>
        
        <p className="text-sm text-[var(--text-secondary)]">
          Review vocabulary based on scientific memory intervals. Ratings recalculate future review schedules automatically!
        </p>

        <div className="flex items-center gap-4 text-xs font-mono font-bold text-[var(--text-primary)] pt-1">
          <span>Active Review Queue: {cards.length} Cards</span>
        </div>
      </div>

      {currentCard ? (
        <div className="space-y-6">
          
          {/* TRUE 3D FLIP CARD ANIMATION */}
          <div className="flip-card-3d">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`flip-card-inner-3d ${isFlipped ? 'flipped' : ''}`}
            >
              
              {/* FRONT OF CARD */}
              <div className="editorial-card p-10 sm:p-14 bg-[var(--bg-surface)] text-center cursor-pointer min-h-[300px] flex flex-col justify-between items-center transition-all border-2 border-[var(--text-primary)] shadow-2xl">
                <div className="flex justify-between w-full text-xs font-mono">
                  <span className="pill-badge text-[10px]">
                    Box {currentCard.box} / 5
                  </span>
                  <span className="text-[var(--text-muted)] italic">Click card to flip 3D 🔄</span>
                </div>

                <div className="space-y-4 py-8">
                  <span className="text-xs font-mono uppercase text-[var(--text-muted)] tracking-widest block font-bold">
                    Russian Word
                  </span>
                  <h2 className="font-serif text-5xl font-extrabold text-[var(--text-primary)]">
                    {currentCard.word}
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] font-mono">
                    [{currentCard.pronunciation}]
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeech(currentCard.word);
                    }}
                    className="pill-btn py-2 px-4 text-xs mx-auto"
                  >
                    <Volume2 size={16} />
                    <span>Play Audio</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-[var(--text-muted)]">
                  Card {activeCardIdx + 1} of {cards.length}
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="editorial-card p-10 sm:p-14 bg-[var(--bg-surface)] text-center cursor-pointer min-h-[300px] flex flex-col justify-between items-center transition-all border-2 border-amber-600 shadow-2xl flip-card-back-3d">
                <div className="flex justify-between w-full text-xs font-mono">
                  <span className="pill-badge text-[10px] text-amber-600 border-amber-600">
                    Translation & Example
                  </span>
                  <span className="text-[var(--text-muted)] italic">Click to flip 🔄</span>
                </div>

                <div className="space-y-4 py-6">
                  <span className="text-xs font-mono text-amber-600 uppercase tracking-widest block font-bold">
                    English Meaning
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
                    "{currentCard.translation}"
                  </h3>

                  <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] max-w-md mx-auto space-y-1 text-xs">
                    <p className="font-serif text-sm font-bold text-[var(--text-primary)]">
                      {currentCard.exampleRu}
                    </p>
                    <p className="text-[var(--text-secondary)] italic">
                      "{currentCard.exampleEn}"
                    </p>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[var(--text-muted)]">
                  Select your rating below 👇
                </div>
              </div>

            </div>
          </div>

          {/* SRS RATING BUTTONS */}
          {isFlipped && (
            <div className="grid grid-cols-4 gap-3 pt-2">
              <button
                onClick={() => handleRate('again')}
                className="pill-btn-outline justify-center text-xs py-2 text-rose-600 border-rose-600"
              >
                <span>Again</span>
              </button>

              <button
                onClick={() => handleRate('hard')}
                className="pill-btn-outline justify-center text-xs py-2 text-amber-600 border-amber-600"
              >
                <span>Hard</span>
              </button>

              <button
                onClick={() => handleRate('good')}
                className="pill-btn-outline justify-center text-xs py-2 text-emerald-600 border-emerald-600"
              >
                <span>Good</span>
              </button>

              <button
                onClick={() => handleRate('easy')}
                className="pill-btn justify-center text-xs py-2"
              >
                <span>Easy</span>
              </button>
            </div>
          )}

        </div>
      ) : (
        <div className="text-center py-12 text-[var(--text-muted)]">
          No cards in review queue. Bookmarks words during lessons to add them to your SRS deck!
        </div>
      )}

    </div>
  );
};
