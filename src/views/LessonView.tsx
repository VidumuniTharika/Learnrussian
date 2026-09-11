import React, { useState } from 'react';
import { Lesson } from '../types';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Award, 
  BookOpen, 
  RotateCcw,
  ListOrdered
} from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onCompleteLesson: (xpEarned: number) => void;
  onExitLesson: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onCompleteLesson,
  onExitLesson
}) => {
  const [currentStage, setCurrentStage] = useState<'vocab' | 'grammar' | 'exercises' | 'summary'>('vocab');
  const [activeVocabIdx, setActiveVocabIdx] = useState(0);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  
  // Drag & drop order state
  const [userOrderedWords, setUserOrderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const currentExercise = lesson.exercises[currentExerciseIdx];

  // Initialize drag order game if exercise changes
  React.useEffect(() => {
    if (currentExercise && currentExercise.type === 'drag_order' && currentExercise.wordsToOrder) {
      const shuffled = [...currentExercise.wordsToOrder].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setUserOrderedWords([]);
    }
  }, [currentExerciseIdx, currentExercise]);

  const handlePlayAudio = (text: string) => {
    playRussianSpeech(text);
  };

  const handleSelectWordForOrder = (word: string) => {
    playSoundEffect('click');
    setAvailableWords(prev => prev.filter(w => w !== word));
    setUserOrderedWords(prev => [...prev, word]);
  };

  const handleRemoveWordFromOrder = (word: string) => {
    playSoundEffect('click');
    setUserOrderedWords(prev => prev.filter(w => w !== word));
    setAvailableWords(prev => [...prev, word]);
  };

  const handleCheckAnswer = () => {
    if (!currentExercise) return;

    let correct = false;

    if (currentExercise.type === 'multiple_choice' || currentExercise.type === 'audio_listen') {
      const selected = currentExercise.options?.find(o => o.id === selectedOptionId);
      correct = !!selected?.isCorrect;
    } else if (currentExercise.type === 'drag_order') {
      const assembledSentence = userOrderedWords.join(' ');
      correct = assembledSentence.trim().toLowerCase() === currentExercise.correctSentence?.trim().toLowerCase();
    }

    setIsCorrect(correct);
    setExerciseSubmitted(true);

    if (correct) {
      playSoundEffect('correct');
      setScore(prev => prev + 1);
    } else {
      playSoundEffect('wrong');
    }
  };

  const handleNextExercise = () => {
    setExerciseSubmitted(false);
    setSelectedOptionId(null);

    if (currentExerciseIdx + 1 < lesson.exercises.length) {
      setCurrentExerciseIdx(prev => prev + 1);
    } else {
      // Finished all exercises!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      playSoundEffect('streak');
      setCurrentStage('summary');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* TOP LESSON HEADER & PROGRESS BAR */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onExitLesson}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white text-xs font-bold"
          >
            ← Exit Studio
          </button>
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-100">{lesson.title}</h2>
            <p className="text-xs text-amber-400 italic">«{lesson.titleRu}»</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(['vocab', 'grammar', 'exercises', 'summary'] as const).map(stage => (
            <div
              key={stage}
              className={`h-2 rounded-full transition-all ${
                currentStage === stage
                  ? 'w-12 bg-amber-400'
                  : 'w-4 bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STAGE 1: VOCABULARY FLASHCARDS */}
      {currentStage === 'vocab' && (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 space-y-8 text-center bg-slate-950/80">
          <div className="space-y-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              Step 1 of 3: Vocabulary Flashcards ({activeVocabIdx + 1}/{lesson.vocabulary.length})
            </span>
            <h3 className="font-serif text-3xl font-bold text-slate-100">
              Listen & Master New Russian Words
            </h3>
          </div>

          {/* Flashcard Component */}
          {lesson.vocabulary[activeVocabIdx] && (
            <div className="max-w-md mx-auto p-10 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-900 to-amber-950/40 border-2 border-amber-500/40 space-y-6 shadow-2xl">
              
              <div className="space-y-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Russian Word</span>
                <h4 className="font-serif text-4xl font-extrabold text-amber-300">
                  {lesson.vocabulary[activeVocabIdx].word}
                </h4>
                <p className="text-xs text-slate-300 font-mono">
                  [{lesson.vocabulary[activeVocabIdx].pronunciation}]
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5">
                <span className="text-xs text-slate-400 block mb-1">Translation:</span>
                <p className="text-lg font-bold text-slate-100">
                  "{lesson.vocabulary[activeVocabIdx].translation}"
                </p>
              </div>

              <button
                onClick={() => handlePlayAudio(lesson.vocabulary[activeVocabIdx].word)}
                className="btn-gold text-sm mx-auto"
              >
                <Volume2 size={20} />
                <span>Hear Native Audio</span>
              </button>

            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <button
              disabled={activeVocabIdx === 0}
              onClick={() => setActiveVocabIdx(prev => prev - 1)}
              className="btn-ghost text-xs disabled:opacity-30"
            >
              Previous Card
            </button>

            {activeVocabIdx + 1 < lesson.vocabulary.length ? (
              <button
                onClick={() => setActiveVocabIdx(prev => prev + 1)}
                className="btn-gold text-xs"
              >
                <span>Next Word Card</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => setCurrentStage('grammar')}
                className="btn-primary text-xs"
              >
                <span>Proceed to Grammar Rule</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STAGE 2: GRAMMAR RULE SPOTLIGHT */}
      {currentStage === 'grammar' && (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-rose-500/30 space-y-8 bg-slate-950/80">
          <div className="space-y-2 text-center">
            <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">
              Step 2 of 3: Grammar Rule Spotlight
            </span>
            <h3 className="font-serif text-3xl font-bold text-slate-100">
              {lesson.grammarFocus}
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <BookOpen size={18} />
              <span>Core Language Pattern</span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              In Russian, word endings change based on context. Pay close attention to vowels like <strong className="text-amber-400">-А / -Я</strong> for Feminine nouns and <strong className="text-rose-400">-О / -Е</strong> for Neuter nouns!
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
              <div className="p-2 rounded bg-amber-500/10 text-amber-300">Masculine: Consonant</div>
              <div className="p-2 rounded bg-rose-500/10 text-rose-300">Feminine: -А / -Я</div>
              <div className="p-2 rounded bg-indigo-500/10 text-indigo-300">Neuter: -О / -Е</div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => setCurrentStage('exercises')}
              className="btn-primary text-sm"
            >
              <span>Start Interactive Practice Exercises</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: INTERACTIVE EXERCISES */}
      {currentStage === 'exercises' && currentExercise && (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/40 space-y-8 bg-slate-950/90">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                Exercise {currentExerciseIdx + 1} of {lesson.exercises.length}
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-100 mt-1">
                {currentExercise.question}
              </h3>
            </div>

            {currentExercise.audioPrompt && (
              <button
                onClick={() => handlePlayAudio(currentExercise.audioPrompt!)}
                className="p-3 rounded-full bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-lg"
                title="Play Prompt Audio"
              >
                <Volume2 size={22} />
              </button>
            )}
          </div>

          {/* Exercise Type A: Multiple Choice or Audio Listen */}
          {(currentExercise.type === 'multiple_choice' || currentExercise.type === 'audio_listen') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentExercise.options?.map(option => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    disabled={exerciseSubmitted}
                    onClick={() => {
                      playSoundEffect('click');
                      setSelectedOptionId(option.id);
                    }}
                    className={`p-5 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                        : 'bg-slate-900 border-white/10 text-slate-200 hover:border-white/30'
                    }`}
                  >
                    <span>{option.text}</span>
                    {isSelected && <CheckCircle size={18} className="text-amber-400" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Exercise Type B: Drag-and-Drop Sentence Builder */}
          {currentExercise.type === 'drag_order' && (
            <div className="space-y-6">
              
              {/* Assembled Sentence Box */}
              <div className="p-6 rounded-2xl bg-slate-900 border-2 border-dashed border-amber-500/30 min-h-[80px] flex flex-wrap items-center gap-2">
                {userOrderedWords.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">
                    Click the Russian words below in the correct order...
                  </span>
                ) : (
                  userOrderedWords.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRemoveWordFromOrder(word)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-serif font-bold text-base shadow-md hover:scale-105 transition-transform"
                    >
                      {word} ✕
                    </button>
                  ))
                )}
              </div>

              {/* Available Word Bank */}
              <div className="flex flex-wrap items-center gap-3">
                {availableWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectWordForOrder(word)}
                    className="px-4 py-2 rounded-xl bg-slate-800 border border-white/10 hover:border-amber-400 text-slate-200 font-serif font-semibold text-sm transition-all hover:bg-slate-700"
                  >
                    {word}
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* Feedback Area */}
          {exerciseSubmitted && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center gap-3 ${
              isCorrect
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {isCorrect ? <CheckCircle size={24} /> : <XCircle size={24} />}
              <div>
                <p className="font-bold">{isCorrect ? 'Excellent! Отлично! 🎉' : 'Not quite right.'}</p>
                <p className="text-xs opacity-90">{currentExercise.explanation}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
            {!exerciseSubmitted ? (
              <button
                disabled={
                  (currentExercise.type === 'multiple_choice' && !selectedOptionId) ||
                  (currentExercise.type === 'drag_order' && userOrderedWords.length === 0)
                }
                onClick={handleCheckAnswer}
                className="btn-gold text-sm disabled:opacity-30"
              >
                <span>Check Answer</span>
              </button>
            ) : (
              <button
                onClick={handleNextExercise}
                className="btn-primary text-sm"
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

        </div>
      )}

      {/* STAGE 4: LESSON SUMMARY & XP REWARD CELEBRATION */}
      {currentStage === 'summary' && (
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-amber-400/50 space-y-8 text-center bg-slate-950/95 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-rose-600 to-amber-300 flex items-center justify-center mx-auto shadow-2xl animate-bounce">
            <Award size={40} className="text-white" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-4xl font-extrabold text-slate-100">
              Урок завершён! Lesson Completed!
            </h3>
            <p className="text-sm text-amber-300 italic">
              You have successfully completed "{lesson.title}".
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 max-w-sm mx-auto grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase">XP Earned</span>
              <p className="font-serif text-3xl font-bold text-amber-400">+{lesson.xpReward}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase">Score</span>
              <p className="font-serif text-3xl font-bold text-emerald-400">{score}/{lesson.exercises.length}</p>
            </div>
          </div>

          <button
            onClick={() => {
              onCompleteLesson(lesson.xpReward);
              onExitLesson();
            }}
            className="btn-gold text-base px-8 py-3.5 mx-auto"
          >
            <span>Return to Course Roadmap</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

    </div>
  );
};
