import React, { useState } from 'react';
import { CityLandmark } from '../types';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { MapPin, Volume2, Compass, Sparkles, Navigation } from 'lucide-react';

const CITIES_DATA: CityLandmark[] = [
  {
    id: 'city-1',
    cityName: 'Moscow',
    cityNameRu: 'Москва',
    region: 'Capital Region',
    description: 'The historic capital of Russia, famous for the Kremlin, Red Square, Saint Basil Cathedral, and Bolshoi Theatre.',
    keyPhrases: [
      { ru: 'Где находится Красная площадь?', en: 'Where is Red Square located?' },
      { ru: 'Как проехать в Кремль?', en: 'How to get to the Kremlin?' },
      { ru: 'Москва — красивый город.', en: 'Moscow is a beautiful city.' }
    ]
  },
  {
    id: 'city-2',
    cityName: 'Saint Petersburg',
    cityNameRu: 'Санкт-Петербург',
    region: 'Northwest Region',
    description: 'The cultural capital of Russia, renowned for the Winter Palace, Hermitage Museum, white nights, and Neva bridges.',
    keyPhrases: [
      { ru: 'Когда разводят мосты?', en: 'When do the drawbridges open?' },
      { ru: 'Где вход в Эрмитаж?', en: 'Where is the entrance to the Hermitage?' }
    ]
  },
  {
    id: 'city-3',
    cityName: 'Lake Baikal',
    cityNameRu: 'Озеро Байкал',
    region: 'Siberia',
    description: 'The deepest and oldest freshwater lake in the world, holding 20% of the world unfrozen fresh surface water.',
    keyPhrases: [
      { ru: 'Байкал очень глубокий.', en: 'Baikal is very deep.' },
      { ru: 'Вода в Байкале чистая.', en: 'The water in Baikal is clean.' }
    ]
  },
  {
    id: 'city-4',
    cityName: 'Vladivostok',
    cityNameRu: 'Владивосток',
    region: 'Far East',
    description: 'The eastern terminus of the Trans-Siberian Railway and Russia major Pacific ocean port city.',
    keyPhrases: [
      { ru: 'Это конец Транссибирской магистрали.', en: 'This is the end of the Trans-Siberian Railway.' }
    ]
  }
];

export const MapStudioView: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityLandmark>(CITIES_DATA[0]);

  const handleSpeech = (text: string) => {
    playRussianSpeech(text);
  };

  return (
    <div className="space-y-10 py-8">
      
      {/* HEADER */}
      <div className="border-b border-[var(--text-primary)] pb-8 space-y-4">
        <span className="pill-badge">Stage 5 Cultural Map Studio</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
          Russian Landmarks & Cities Explorer
        </h1>
        
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
          Explore Russia iconic travel destinations from Moscow to Vladivostok, and learn local travel phrases with audio pronunciation.
        </p>

        {/* City Selector Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          {CITIES_DATA.map(city => (
            <button
              key={city.id}
              onClick={() => {
                playSoundEffect('click');
                setSelectedCity(city);
              }}
              className={`px-4 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-2 ${
                selectedCity.id === city.id
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] shadow-md scale-105'
                  : 'bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-secondary)]'
              }`}
            >
              <MapPin size={14} />
              <span>{city.cityName} ({city.cityNameRu})</span>
            </button>
          ))}
        </div>
      </div>

      {/* CITY DETAIL STUDIO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 editorial-card p-8 bg-[var(--bg-surface)] space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
            <div>
              <span className="pill-badge">{selectedCity.region}</span>
              <h2 className="font-display text-3xl font-extrabold text-[var(--text-primary)] mt-1">
                {selectedCity.cityName}
              </h2>
              <p className="text-xs font-serif font-bold text-amber-600 italic">
                «{selectedCity.cityNameRu}»
              </p>
            </div>

            <button
              onClick={() => handleSpeech(selectedCity.cityNameRu)}
              className="p-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-main)]"
            >
              <Volume2 size={20} />
            </button>
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-semibold">
            {selectedCity.description}
          </p>

          <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] space-y-3">
            <span className="text-xs font-mono text-[var(--text-muted)] font-bold block">
              Essential Local Travel Phrases:
            </span>

            <div className="space-y-2">
              {selectedCity.keyPhrases.map((phrase, i) => (
                <div
                  key={i}
                  onClick={() => handleSpeech(phrase.ru)}
                  className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)] flex items-center justify-between cursor-pointer hover:border-[var(--text-primary)] transition-all group"
                >
                  <div>
                    <span className="font-serif text-base font-bold text-[var(--text-primary)]">
                      {phrase.ru}
                    </span>
                    <p className="text-xs text-[var(--text-secondary)] italic">{phrase.en}</p>
                  </div>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">🔊</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 editorial-card p-8 bg-[var(--bg-surface)] space-y-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-main)] border border-[var(--border-light)] flex items-center justify-center mx-auto text-amber-600">
            <Navigation size={32} />
          </div>

          <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
            Trans-Siberian Route Info
          </h3>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Spanning 9,289 km across 8 time zones, the Trans-Siberian Railway connects European Moscow with the Pacific Ocean port of Vladivostok.
          </p>

          <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-light)] font-mono text-xs font-bold text-amber-600">
            Train Duration: 7 Days & 7 Nights
          </div>
        </div>

      </div>

    </div>
  );
};
