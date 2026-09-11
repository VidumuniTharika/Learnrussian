import React, { useState } from 'react';
import { CultureStory } from '../types';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { BookOpen, Volume2, Sparkles, Compass, MapPin, Feather } from 'lucide-react';

const CULTURAL_STORIES: CultureStory[] = [
  {
    id: 'cult-1',
    title: 'Pushkin: У лукоморья дуб зелёный',
    titleRu: 'Александр Пушкин — Поэзия',
    category: 'Literature',
    readTimeMinutes: 4,
    excerptRu: 'У лукоморья дуб зелёный; Златая цепь на дубе том: И днём и ночью кот учёный Всё ходит по цепи кругом...',
    excerptEn: 'By the curved seashore stands a green oak; A golden chain is upon that oak: And day and night a learned cat walks round and round upon the chain...',
    fullStoryRu: 'У лукоморья дуб зелёный; Златая цепь на дубе том: И днём и ночью кот учёный Всё ходит по цепи кругом; Идёт направо — песнь заводит, Налево — сказку говорит.',
    fullStoryEn: 'By the curved seashore stands a green oak; A golden chain is upon that oak: And day and night a learned cat walks round and round upon the chain; Going to the right — he sings a song, To the left — he tells a fairy tale.',
    vocabularyList: [
      { word: 'Дуб', translation: 'Oak tree' },
      { word: 'Зелёный', translation: 'Green' },
      { word: 'Кот учёный', translation: 'Learned cat' },
      { word: 'Сказка', translation: 'Fairy tale / Story' }
    ]
  },
  {
    id: 'cult-2',
    title: 'The State Hermitage Museum',
    titleRu: 'Государственный Эрмитаж в Санкт-Петербурге',
    category: 'History',
    readTimeMinutes: 5,
    excerptRu: 'Эрмитаж — один из крупнейших художественных музеев мира, расположенный в Зимнем дворце на берегу Невы.',
    excerptEn: 'The Hermitage is one of the largest art museums in the world, located in the Winter Palace on the banks of the Neva River.',
    fullStoryRu: 'Основанный в 1764 году императрицей Екатериной Великой, музей содержит более трёх миллионов произведений искусства.',
    fullStoryEn: 'Founded in 1764 by Empress Catherine the Great, the museum contains over three million works of art.',
    vocabularyList: [
      { word: 'Музей', translation: 'Museum' },
      { word: 'Дворец', translation: 'Palace' },
      { word: 'Река Нева', translation: 'Neva River' },
      { word: 'Искусство', translation: 'Art' }
    ]
  },
  {
    id: 'cult-3',
    title: 'The Trans-Siberian Express & Lake Baikal',
    titleRu: 'Транссибирская магистраль и Озеро Байкал',
    category: 'Travel',
    readTimeMinutes: 6,
    excerptRu: 'Самая длинная железная дорога в мире соединяет Москву с Владивостоком, проходя мимо великого озера Байкал.',
    excerptEn: 'The longest railway in the world connects Moscow with Vladivostok, passing by the great Lake Baikal.',
    fullStoryRu: 'Озеро Байкал — самое глубокое и древнее пресноводное озеро на Земле. Его вода кристально чистая.',
    fullStoryEn: 'Lake Baikal is the deepest and oldest freshwater lake on Earth. Its water is crystal clear.',
    vocabularyList: [
      { word: 'Поезд', translation: 'Train' },
      { word: 'Озеро', translation: 'Lake' },
      { word: 'Вода', translation: 'Water' },
      { word: 'Путешествие', translation: 'Journey / Travel' }
    ]
  }
];

export const CultureView: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<CultureStory>(CULTURAL_STORIES[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeech = async (text: string) => {
    setIsPlaying(true);
    await playRussianSpeech(text);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-12 py-6">
      
      {/* HEADER */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Feather size={14} />
          <span>Cultural Reader & Narration</span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-slate-100">
          Russian Cultural Immersion Hub
        </h1>
        
        <p className="text-sm text-slate-300 max-w-2xl">
          Immerse yourself in Pushkin's poetry, St. Petersburg history, and Trans-Siberian travel narratives with audio narration and vocabulary guides.
        </p>

        {/* Story Tabs */}
        <div className="flex flex-wrap gap-3 pt-2">
          {CULTURAL_STORIES.map(story => (
            <button
              key={story.id}
              onClick={() => {
                playSoundEffect('click');
                setSelectedStory(story);
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                selectedStory.id === story.id
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg scale-105'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{story.title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-amber-400 font-serif">
                {story.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE STORY READER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Story Text & Narration */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-amber-500/30 bg-slate-950/90 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  {selectedStory.category} • {selectedStory.readTimeMinutes} Mins Read
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
                  {selectedStory.title}
                </h2>
                <p className="text-xs text-amber-300 font-serif font-bold italic">
                  «{selectedStory.titleRu}»
                </p>
              </div>

              <button
                onClick={() => handleSpeech(selectedStory.fullStoryRu)}
                disabled={isPlaying}
                className="p-3.5 rounded-2xl bg-rose-600 text-white hover:bg-rose-500 transition-transform shadow-lg flex items-center gap-2"
                title="Play Audio Narration"
              >
                <Volume2 size={20} className={isPlaying ? 'animate-bounce' : ''} />
                <span className="text-xs font-bold hidden sm:inline">Listen Narration</span>
              </button>
            </div>

            {/* Russian Text Box */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                Russian Text (Текст):
              </span>
              <p className="font-serif text-lg sm:text-xl text-amber-200 leading-relaxed font-semibold">
                "{selectedStory.fullStoryRu}"
              </p>
            </div>

            {/* English Translation Box */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                English Parallel Translation:
              </span>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{selectedStory.fullStoryEn}"
              </p>
            </div>

          </div>
        </div>

        {/* Right: Vocabulary Spotlight */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/80 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <BookOpen size={18} className="text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-slate-100">
                Key Story Vocabulary
              </h3>
            </div>

            <div className="space-y-3">
              {selectedStory.vocabularyList.map((v, i) => (
                <div
                  key={i}
                  onClick={() => playRussianSpeech(v.word)}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-white/5 hover:border-amber-400/50 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="font-serif text-base font-bold text-amber-300 group-hover:text-amber-400">
                      {v.word}
                    </span>
                    <p className="text-xs text-slate-400">{v.translation}</p>
                  </div>
                  <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    🔊
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
