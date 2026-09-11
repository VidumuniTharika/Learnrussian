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
      setActiveCardIdx(0); // Loop back for practice
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      
      {/* HEADER */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} />
          <span>Leitner 5-Box SRS Engine</span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-slate-100">
          Spaced Repetition Memory Deck
        </h1>
        
        <p className="text-sm text-slate-300">
          Review vocabulary based on scientific memory intervals. Ratings recalculate future review schedules automatically!
        </p>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-300 pt-2">
          <span>Active Review Queue: {cards.length} Cards</span>
        </div>
      </div>

      {currentCard ? (
        <div className="space-y-6">
          
          {/* FLASHCARD (FLIPPABLE) */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="glass-panel p-10 sm:p-14 rounded-3xl border-2 border-amber-500/40 bg-slate-950/90 text-center cursor-pointer min-h-[300px] flex flex-col justify-between items-center transition-all hover:border-amber-400 shadow-2xl relative"
          >
            <div className="flex justify-between w-full text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-amber-400 font-bold">
                Leitner Box {currentCard.box} / 5
              </span>
              <span className="text-slate-400 italic">Click card to flip 🔄</span>
            </div>

            {!isFlipped ? (
              {/* FRONT OF CARD */}
              <div className="space-y-4 py-8">
                <span className="text-xs text-slate-400 uppercase tracking-widest block font-bold">
                  Russian Word
                </span>
                <h2 className="font-serif text-5xl font-extrabold text-amber-300">
                  {currentCard.word}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  [{currentCard.pronunciation}]
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeech(currentCard.word);
                  }}
                  className="p-3 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600 hover:text-white transition-all mx-auto inline-flex items-center gap-2"
                >
                  <Volume2 size={18} />
                  <span className="text-xs font-bold">Play Audio</span>
                </button>
              </div>
            ) : (
              {/* BACK OF CARD */}
              <div className="space-y-4 py-6">
                <span className="text-xs text-amber-400 uppercase tracking-widest block font-bold">
                  English Translation & Context
                </span>
                <h3 className="font-serif text-3xl font-bold text-slate-100">
                  "{currentCard.translation}"
                </h3>

                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 max-w-md mx-auto space-y-1 text-xs">
                  <p className="font-serif text-sm font-bold text-amber-300">
                    {currentCard.exampleRu}
                  </p>
                  <p className="text-slate-400 italic">
                    "{currentCard.exampleEn}"
                  </p>
                </div>
              </div>
            )}

            <div className="text-[11px] text-slate-400">
              Card {activeCardIdx + 1} of {cards.length}
            </div>
          </div>

          {/* SRS RATING BUTTONS (SHOWN WHEN FLIPPED) */}
          {isFlipped && (
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => handleRate('again')}
                className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600 hover:text-white text-xs font-bold transition-all text-center"
              >
                <span>Again</span>
                <span className="block text-[10px] font-normal opacity-80">Today</span>
              </button>

              <button
                onClick={() => handleRate('hard')}
                className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-600 hover:text-white text-xs font-bold transition-all text-center"
              >
                <span>Hard</span>
                <span className="block text-[10px] font-normal opacity-80">1 Day</span>
              </button>

              <button
                onClick={() => handleRate('good')}
                className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all text-center"
              >
                <span>Good</span>
                <span className="block text-[10px] font-normal opacity-80">4 Days</span>
              </button>

              <button
                onClick={() => handleRate('easy')}
                className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-all text-center"
              >
                <span>Easy</span>
                <span className="block text-[10px] font-normal opacity-80">7 Days</span>
              </button>
            </div>
          )}

        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">
          No cards in review queue. Bookmarks words during lessons to add them to your SRS deck!
        </div>
      )}

    </div>
  );
};
