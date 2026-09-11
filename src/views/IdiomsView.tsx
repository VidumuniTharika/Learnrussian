import React, { useState } from 'react';
import { IdiomItem } from '../types';
import { playRussianSpeech } from '../utils/audioEngine';
import { Volume2, Sparkles, BookOpen } from 'lucide-react';

const IDIOMS_DATA: IdiomItem[] = [
  {
    id: 'id1',
    idiomRu: 'Первый блин комом',
    literalEn: 'The first pancake is a lump.',
    meaningEn: 'Things rarely go perfectly on the first try (Practice makes perfect).',
    exampleRu: 'Не переживай, первый блин всегда комом!'
  },
  {
    id: 'id2',
    idiomRu: 'Не имей 100 рублей, а имей 100 друзей',
    literalEn: 'Do not have 100 rubles, have 100 friends.',
    meaningEn: 'Friendship is far more valuable than money.',
    exampleRu: 'Друзья всегда помогут в трудную минуту.'
  },
  {
    id: 'id3',
    idiomRu: 'Делу время, потехе час',
    literalEn: 'Time for business, an hour for fun.',
    meaningEn: 'Work comes first before leisure.',
    exampleRu: 'Сначала сделаем уроки, а потом будем играть.'
  },
  {
    id: 'id4',
    idiomRu: 'Век живи — век учись',
    literalEn: 'Live a century — learn a century.',
    meaningEn: 'You are never too old to learn something new (Lifelong learning).',
    exampleRu: 'Я выучил русский язык в 40 лет! Век живи — век учись.'
  }
];

export const IdiomsView: React.FC = () => {
  const handleSpeech = (text: string) => {
    playRussianSpeech(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8">
      
      {/* HEADER */}
      <div className="border-b border-[var(--text-primary)] pb-8 space-y-4">
        <span className="pill-badge">Stage 5 Russian Cultural Wisdom</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
          Russian Idioms & Proverbs Dictionary
        </h1>
        
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
          Discover authentic Russian proverbs, idioms, and colloquial wisdom with literal vs figurative translations and spoken audio.
        </p>
      </div>

      {/* IDIOMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {IDIOMS_DATA.map(item => (
          <div key={item.id} className="editorial-card p-6 bg-[var(--bg-surface)] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2">
                <span className="pill-badge text-[9px]">Russian Proverb</span>
                <button
                  onClick={() => handleSpeech(item.idiomRu)}
                  className="p-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-main)]"
                >
                  <Volume2 size={14} />
                </button>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
                «{item.idiomRu}»
              </h3>

              <div className="space-y-1 text-xs">
                <p className="text-[var(--text-muted)] italic">
                  <strong>Literal:</strong> "{item.literalEn}"
                </p>
                <p className="font-bold text-amber-600">
                  <strong>Meaning:</strong> {item.meaningEn}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-light)] text-xs">
              <span className="text-[var(--text-muted)] font-mono block">Example Usage:</span>
              <p className="font-serif font-bold text-[var(--text-primary)]">{item.exampleRu}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
