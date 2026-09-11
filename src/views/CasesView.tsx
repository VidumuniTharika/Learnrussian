import React, { useState } from 'react';
import { RUSSIAN_CASES } from '../data/mockData';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { Compass, Volume2 } from 'lucide-react';

export const CasesView: React.FC = () => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
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
    <div className="space-y-12 py-8">
      
      {/* HEADER */}
      <div className="border-b border-[var(--text-primary)] pb-8 space-y-4">
        <span className="pill-badge">Grammar & Declension Studio</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
          The 6 Russian Cases Matrix (Падежи)
        </h1>
        
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
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
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCaseIdx === idx
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] shadow-md scale-105'
                  : 'bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{c.caseName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE CASE DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Case Explanation Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="editorial-card p-8 bg-[var(--bg-surface)] space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
              <div>
                <span className="pill-badge">Case Overview</span>
                <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mt-1">{activeCase.caseName} Case</h2>
                <p className="text-xs text-amber-600 font-serif font-bold italic">«{activeCase.caseNameRu}»</p>
              </div>

              <span className="pill-badge bg-[var(--bg-main)] font-mono text-[var(--text-primary)]">
                {activeCase.questionRu}
              </span>
            </div>

            <div className="space-y-4 text-xs text-[var(--text-secondary)]">
              <p className="text-sm text-[var(--text-primary)] leading-relaxed font-semibold">
                {activeCase.usageSummary}
              </p>

              <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] space-y-3">
                <span className="text-[var(--text-primary)] font-bold block">Singular Endings:</span>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-light)]">
                    <span className="text-[var(--text-muted)] block">Masculine:</span>
                    <span className="font-bold text-[var(--text-primary)]">{activeCase.masculineEnding}</span>
                  </div>
                  <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-light)]">
                    <span className="text-[var(--text-muted)] block">Feminine:</span>
                    <span className="font-bold text-amber-600">{activeCase.feminineEnding}</span>
                  </div>
                  <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-light)]">
                    <span className="text-[var(--text-muted)] block">Neuter:</span>
                    <span className="font-bold text-indigo-600">{activeCase.neuterEnding}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] space-y-2">
                <span className="text-emerald-600 font-bold block">Example Sentence:</span>
                <div className="flex items-center justify-between">
                  <p className="font-serif text-base font-bold text-[var(--text-primary)]">
                    {activeCase.exampleSentence}
                  </p>
                  <button
                    onClick={() => handleSpeech(activeCase.exampleSentence)}
                    className="p-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-main)]"
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
          <div className="editorial-card p-8 bg-[var(--bg-surface)] space-y-6">
            <div className="space-y-1">
              <span className="pill-badge">Live Converter</span>
              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                Noun Declension Converter
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Pick a word to see its complete declension table live across all 6 cases!
              </p>
            </div>

            {/* Word Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(WORD_PRESETS).map(w => (
                <button
                  key={w}
                  onClick={() => setSelectedWordPreset(w)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    selectedWordPreset === w
                      ? 'bg-[var(--text-primary)] text-[var(--bg-main)] shadow-sm'
                      : 'bg-[var(--bg-main)] border border-[var(--border-light)] text-[var(--text-secondary)]'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>

            {/* Declension Table Output */}
            <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2">
                <span className="font-serif text-lg font-bold text-amber-600">{activePreset.stem}</span>
                <span className="pill-badge text-[9px]">{activePreset.gender}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between p-2 rounded bg-[var(--bg-surface)]">
                  <span className="text-[var(--text-muted)]">1. Nominative (Кто/Что):</span>
                  <span className="font-serif font-bold text-[var(--text-primary)]">{activePreset.nom}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--bg-surface)]">
                  <span className="text-[var(--text-muted)]">2. Genitive (Кого/Чего):</span>
                  <span className="font-serif font-bold text-[var(--text-primary)]">{activePreset.gen}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--bg-surface)]">
                  <span className="text-[var(--text-muted)]">3. Dative (Кому/Чему):</span>
                  <span className="font-serif font-bold text-[var(--text-primary)]">{activePreset.dat}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--bg-surface)]">
                  <span className="text-[var(--text-muted)]">4. Accusative (Кого/Что):</span>
                  <span className="font-serif font-bold text-[var(--text-primary)]">{activePreset.acc}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--bg-surface)]">
                  <span className="text-[var(--text-muted)]">5. Instrumental (Кем/Чем):</span>
                  <span className="font-serif font-bold text-[var(--text-primary)]">{activePreset.inst}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--bg-surface)]">
                  <span className="text-[var(--text-muted)]">6. Prepositional (О ком/Где):</span>
                  <span className="font-serif font-bold text-[var(--text-primary)]">{activePreset.prep}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
