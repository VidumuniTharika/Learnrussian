import React, { useState } from 'react';
import { CEFRLevel, PlacementQuestion } from '../types';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { Sparkles, Award, CheckCircle2, Volume2, ArrowRight, RefreshCw, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'pq1',
    question: 'Select the correct English meaning for the Russian greeting "Здравствуйте":',
    options: [
      { id: '1', text: 'Good morning (Informal)', isCorrect: false },
      { id: '2', text: 'Hello (Formal)', isCorrect: true },
      { id: '3', text: 'Goodbye', isCorrect: false },
      { id: '4', text: 'Thank you', isCorrect: false }
    ],
    explanation: '"Здравствуйте" is the formal Russian greeting.',
    targetLevel: 'A1'
  },
  {
    id: 'pq2',
    question: 'Listen to the audio or read: What letter is "Ж"?',
    audioPrompt: 'Ж',
    options: [
      { id: '1', text: 'Sounds like "z" in zoo', isCorrect: false },
      { id: '2', text: 'Sounds like "s" in measure / treasure', isCorrect: true },
      { id: '3', text: 'Sounds like "k" in kite', isCorrect: false }
    ],
    explanation: 'Ж (Zhe) represents the voiced postalveolar fricative [ʐ], like the "s" in measure.',
    targetLevel: 'A1'
  },
  {
    id: 'pq3',
    question: 'Complete the sentence: "У меня нет русского _____ (dictionary)."',
    options: [
      { id: '1', text: 'словарь (Nominative)', isCorrect: false },
      { id: '2', text: 'словаря (Genitive)', isCorrect: true },
      { id: '3', text: 'словарю (Dative)', isCorrect: false }
    ],
    explanation: 'The phrase "нет" (absence) requires the Genitive case ending -я.',
    targetLevel: 'A2'
  },
  {
    id: 'pq4',
    question: 'Which verb indicates motion BY FOOT in Russian?',
    options: [
      { id: '1', text: 'Ехать (Yekhat)', isCorrect: false },
      { id: '2', text: 'Идти (Idti)', isCorrect: true },
      { id: '3', text: 'Летать (Letat)', isCorrect: false }
    ],
    explanation: 'Идти means to go on foot, whereas Ехать means to go by transport.',
    targetLevel: 'B1'
  },
  {
    id: 'pq5',
    question: 'Select the correct Prepositional case for "в _____ (Moscow)":',
    options: [
      { id: '1', text: 'Москву', isCorrect: false },
      { id: '2', text: 'Москве', isCorrect: true },
      { id: '3', text: 'Москвой', isCorrect: false }
    ],
    explanation: 'Location in a city uses "в" + Prepositional case (-е for feminine nouns ending in -а).',
    targetLevel: 'A2'
  }
];

interface PlacementTestViewProps {
  onSaveResult: (level: CEFRLevel, score: number, total: number) => void;
  onNavigateCourses: () => void;
}

export const PlacementTestView: React.FC<PlacementTestViewProps> = ({
  onSaveResult,
  onNavigateCourses
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = PLACEMENT_QUESTIONS[currentIdx];

  const handleSelectOption = (optionId: string) => {
    playSoundEffect('click');
    setSelectedOptionId(optionId);
  };

  const handleNextQuestion = () => {
    const selectedOpt = currentQ.options.find(o => o.id === selectedOptionId);
    let newScore = userScore;
    if (selectedOpt?.isCorrect) {
      newScore += 1;
      setUserScore(newScore);
    }

    setSelectedOptionId(null);

    if (currentIdx + 1 < PLACEMENT_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Completed Test
      setIsFinished(true);
      confetti({ particleCount: 100, spread: 70 });
      playSoundEffect('streak');

      let level: CEFRLevel = 'A1';
      if (newScore >= 4) level = 'B1';
      else if (newScore >= 2) level = 'A2';
      
      onSaveResult(level, newScore, PLACEMENT_QUESTIONS.length);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      
      {/* HEADER */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <HelpCircle size={14} />
          <span>Diagnostic Proficiency Evaluation</span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-slate-100">
          Russian Language Placement Quiz
        </h1>
        
        <p className="text-sm text-slate-300">
          Answer 5 quick diagnostic questions to discover your optimal starting CEFR level!
        </p>
      </div>

      {!isFinished ? (
        <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 bg-slate-950/90 space-y-8 shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              Question {currentIdx + 1} of {PLACEMENT_QUESTIONS.length}
            </span>

            {currentQ.audioPrompt && (
              <button
                onClick={() => playRussianSpeech(currentQ.audioPrompt!)}
                className="p-2 rounded-full bg-rose-600 text-white hover:bg-rose-500 transition-colors"
              >
                <Volume2 size={18} />
              </button>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-slate-100">
              {currentQ.question}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                    selectedOptionId === opt.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                      : 'bg-slate-900 border-white/10 text-slate-200 hover:border-white/30'
                  }`}
                >
                  <span>{opt.text}</span>
                  {selectedOptionId === opt.id && <CheckCircle2 size={18} className="text-amber-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              disabled={!selectedOptionId}
              onClick={handleNextQuestion}
              className="btn-gold text-sm disabled:opacity-30"
            >
              <span>{currentIdx + 1 === PLACEMENT_QUESTIONS.length ? 'Submit Quiz' : 'Next Question'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      ) : (
        <div className="glass-panel p-10 rounded-3xl border border-amber-400/50 space-y-6 text-center bg-slate-950/95 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center mx-auto text-white shadow-xl">
            <Award size={40} />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-extrabold text-slate-100">
              Diagnostic Complete!
            </h2>
            <p className="text-sm text-slate-300">
              You scored <strong className="text-amber-400">{userScore} / {PLACEMENT_QUESTIONS.length}</strong> on the diagnostic placement quiz.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 max-w-sm mx-auto space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              Recommended Starting Level
            </span>
            <span className="font-serif text-4xl font-extrabold text-gradient-gold block">
              Level {userScore >= 4 ? 'B1 Intermediate' : userScore >= 2 ? 'A2 Elementary' : 'A1 Starter'}
            </span>
          </div>

          <button
            onClick={onNavigateCourses}
            className="btn-gold text-sm px-6 py-3 mx-auto"
          >
            <span>Go to Recommended Courses</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

    </div>
  );
};
