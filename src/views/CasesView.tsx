import React, { useState } from 'react';
import { RUSSIAN_CASES } from '../data/mockData';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { Compass, Sparkles, Volume2, Search, ArrowRight, HelpCircle } from 'lucide-react';

export const CasesView: React.FC = () => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [searchWord, setSearchWord] = useState('Студент');
  const [selectedWordPreset, setSelectedWordPreset] = useState('Студент');

  const activeCase = RUSSIAN_CASES[activeCaseIdx];

  const WORD_PRESETS: Record<string, { stem: string; gender: string; nom: string; gen: string; dat: string; acc: string; inst: string; prep: string }> = {
    'Студент': { stem: 'Студент', gender: 'Masculine (Animate)', nom: 'Студент', gen: 'Студента', dat: 'Студенту', acc: 'Студента', inst: 'Студентом', prep: 'о Студенте' },
    'Книга': { stem: 'Книг', gender: 'Feminine', nom: 'Книга', gen: 'Книги', dat: 'Книге', acc: 'Книгу', inst: 'Книгой', prep: 'о Книге' },
    'Окно': { stem: 'Окн', gender: 'Neuter', nom: 'Окно', gen: 'Окна', dat: 'Окну', acc: 'Окно', inst: 'Окном', prep: 'в Окне' },
    'Москва': { stem: 'Москв', gender: 'Feminine City', nom: 'Москва', gen: 'Москвы', dat: 'Москве', acc: 'Москву', inst: 'Москвой', prep: 'в Москве' },
    'Друг': { stem: 'Друг', gender: 'Masculine (Animate)', nom: 'Друг', gen: 'Друга', dat: 'Другу', acc: 'Друга', inst: 'Другом', prep: 'о Друге' }
  };

  const activePreset = WORD_PRESETS[selectedWordPreset] || WORD_PRESETS['Студент'];

  const handleSpeech = (text: string) => {
    playRussianSpeech(text);
  };

  return (
    <div className="space-y-12 py-6">
      
      {/* HEADER */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Compass size={14} />
          <span>Grammar & Declension Studio</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-100">
          The 6 Russian Cases Matrix (Падежи)
        </h1>
        
        <p className="text-sm text-slate-300 max-w-2xl">
          Master Russian case declensions. Learn when and why nouns and adjectives change endings, and test live words across all 6 cases!
        </p>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          {RUSSIAN_CASES.map((c, idx) => (
            <button
              key={c.caseName}
              onClick={() => {
                playSoundEffect('click');
                setActiveCaseIdx(idx);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCaseIdx === idx
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md scale-105'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{c.caseName}</span>
              <span className="text-[10px] block font-serif opacity-80">{c.caseNameRu}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE CASE DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Case Explanation Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 bg-slate-950/80 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Case Rule Overview</span>
                <h2 className="font-serif text-3xl font-bold text-slate-100">{activeCase.caseName} Case</h2>
                <p className="text-xs text-amber-300 font-serif font-bold italic">«{activeCase.caseNameRu}»</p>
              </div>

              <div className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold">
                {activeCase.questionRu}
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <p className="text-sm text-slate-200 leading-relaxed font-semibold">
                {activeCase.usageSummary}
              </p>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
                <span className="text-amber-400 font-bold block">Singular Endings:</span>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-950 border border-white/5">
                    <span className="text-slate-400 block">Masculine:</span>
                    <span className="font-bold text-amber-300">{activeCase.masculineEnding}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-white/5">
                    <span className="text-slate-400 block">Feminine:</span>
                    <span className="font-bold text-rose-300">{activeCase.feminineEnding}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-white/5">
                    <span className="text-slate-400 block">Neuter:</span>
                    <span className="font-bold text-indigo-300">{activeCase.neuterEnding}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
                <span className="text-emerald-400 font-bold block">Example Sentence:</span>
                <div className="flex items-center justify-between">
                  <p className="font-serif text-base font-bold text-slate-100">
                    {activeCase.exampleSentence}
                  </p>
                  <button
                    onClick={() => handleSpeech(activeCase.exampleSentence)}
                    className="p-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right: Live Interactive Declension Converter */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-rose-500/30 bg-slate-950/90 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">
                Live Declension Converter
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-100">
                Inspect Noun Across All 6 Cases
              </h3>
              <p className="text-xs text-slate-400">
                Pick a word to see its complete declension table live!
              </p>
            </div>

            {/* Word Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(WORD_PRESETS).map(w => (
                <button
                  key={w}
                  onClick={() => setSelectedWordPreset(w)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    selectedWordPreset === w
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-slate-900 border border-white/10 text-slate-300'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>

            {/* Declension Table Output */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-serif text-lg font-bold text-amber-400">{activePreset.stem}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                  {activePreset.gender}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded bg-slate-950/80">
                  <span className="text-slate-400">1. Nominative (Кто/Что):</span>
                  <span className="font-serif font-bold text-amber-300">{activePreset.nom}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-950/80">
                  <span className="text-slate-400">2. Genitive (Кого/Чего):</span>
                  <span className="font-serif font-bold text-amber-300">{activePreset.gen}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-950/80">
                  <span className="text-slate-400">3. Dative (Кому/Чему):</span>
                  <span className="font-serif font-bold text-amber-300">{activePreset.dat}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-950/80">
                  <span className="text-slate-400">4. Accusative (Кого/Что):</span>
                  <span className="font-serif font-bold text-amber-300">{activePreset.acc}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-950/80">
                  <span className="text-slate-400">5. Instrumental (Кем/Чем):</span>
                  <span className="font-serif font-bold text-amber-300">{activePreset.inst}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-950/80">
                  <span className="text-slate-400">6. Prepositional (О ком/Где):</span>
                  <span className="font-serif font-bold text-amber-300">{activePreset.prep}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
