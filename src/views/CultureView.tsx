import React, { useState } from 'react';
import { CultureStory } from '../types';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { RussiaPhotoGallery } from '../components/RussiaPhotoGallery';
import { BookOpen, Volume2, Feather } from 'lucide-react';

const CULTURAL_STORIES: (CultureStory & { image: string })[] = [
  {
    id: 'cult-1',
    title: 'Pushkin: У лукоморья дуб зелёный',
    titleRu: 'Александр Пушкин — Поэзия',
    category: 'Literature',
    readTimeMinutes: 4,
    image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1000',
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
    image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=1000',
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
    image: 'https://images.pexels.com/photos/753339/pexels-photo-753339.jpeg?auto=compress&cs=tinysrgb&w=1000',
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
  const [selectedStory, setSelectedStory] = useState<CultureStory & { image: string }>(CULTURAL_STORIES[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeech = async (text: string) => {
    setIsPlaying(true);
    await playRussianSpeech(text);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-12 py-8 animate-fade-in-up">
      
      {/* HEADER */}
      <div className="border-b border-[var(--text-primary)] pb-8 space-y-4">
        <span className="pill-badge">Cultural Reader & Narration</span>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
          Russian Cultural Immersion Hub
        </h1>
        
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
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
              className={`px-4 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-2 ${
                selectedStory.id === story.id
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] shadow-md scale-105'
                  : 'bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-secondary)]'
              }`}
            >
              <span>{story.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE STORY READER WITH PHOTO & 3D TILT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Story Text & Narration */}
        <div className="lg:col-span-8 space-y-6">
          <div className="editorial-card p-8 sm:p-10 bg-[var(--bg-surface)] space-y-6 card-3d-hover">
            
            {/* Story Header Photo Banner */}
            <div className="img-editorial h-64 sm:h-80 border border-[var(--border-light)] bg-slate-900">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="pill-badge bg-white/20 backdrop-blur-md text-white border-white/30 text-[10px] w-fit mb-1">
                  {selectedStory.category} • {selectedStory.readTimeMinutes} Mins Read
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
                  {selectedStory.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
              <div>
                <p className="text-xs text-amber-600 font-serif font-bold italic text-base">
                  «{selectedStory.titleRu}»
                </p>
              </div>

              <button
                onClick={() => handleSpeech(selectedStory.fullStoryRu)}
                disabled={isPlaying}
                className="pill-btn py-2 px-4 text-xs"
              >
                <Volume2 size={16} className={isPlaying ? 'animate-bounce' : ''} />
                <span>Listen Audio Narration</span>
              </button>
            </div>

            {/* Russian Text Box */}
            <div className="p-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] space-y-2">
              <span className="text-xs font-mono uppercase text-amber-600 font-bold block">
                Russian Text (Текст):
              </span>
              <p className="font-serif text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed font-semibold">
                "{selectedStory.fullStoryRu}"
              </p>
            </div>

            {/* English Translation Box */}
            <div className="p-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] space-y-2">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase font-bold block">
                English Parallel Translation:
              </span>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
                "{selectedStory.fullStoryEn}"
              </p>
            </div>

          </div>
        </div>

        {/* Right: Vocabulary Spotlight */}
        <div className="lg:col-span-4 space-y-6">
          <div className="editorial-card p-6 bg-[var(--bg-surface)] space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--border-light)] pb-3">
              <BookOpen size={18} className="text-amber-600" />
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Key Story Vocabulary
              </h3>
            </div>

            <div className="space-y-2.5">
              {selectedStory.vocabularyList.map((v, i) => (
                <div
                  key={i}
                  onClick={() => playRussianSpeech(v.word)}
                  className="p-3.5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] hover:border-[var(--text-primary)] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="font-serif text-base font-bold text-[var(--text-primary)]">
                      {v.word}
                    </span>
                    <p className="text-xs text-[var(--text-secondary)]">{v.translation}</p>
                  </div>
                  <span className="text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    🔊
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* IMPERIAL RUSSIA CRYSTAL PHOTO GALLERY */}
      <RussiaPhotoGallery />

    </div>
  );
};
