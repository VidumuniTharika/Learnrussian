import React, { useState } from 'react';
import { Sparkles, MapPin, Volume2, Eye, X, Compass, ExternalLink, Shield } from 'lucide-react';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import saviorOnBloodImg from '../assets/photos/savior_on_blood.jpg';
import winterPalaceImg from '../assets/photos/winter_palace_facade.jpg';

export interface RussiaPhotoItem {
  id: string;
  titleRu: string;
  titleEn: string;
  location: string;
  coordinates: string;
  description: string;
  culturalNote: string;
  imgUrl: string;
  tag: string;
  speechPhrase: string;
}

export const RUSSIA_PHOTOS: RussiaPhotoItem[] = [
  {
    id: 'red-square',
    titleRu: 'Красная Площадь и Собор Василия Блаженного',
    titleEn: 'Red Square & St. Basil Cathedral',
    location: 'Moscow, Russia',
    coordinates: '55.7558° N, 37.6173° E',
    description: 'The historic heart of Moscow, featuring colorful onion domes built under Tsar Ivan the Terrible in 1561.',
    culturalNote: 'In Old Russian, "Красная" (Krasnaya) originally meant "Beautiful", making it "Beautiful Square".',
    imgUrl: 'https://images.pexels.com/photos/753339/pexels-photo-753339.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tag: 'Imperial Landmark',
    speechPhrase: 'Красная Площадь'
  },
  {
    id: 'winter-palace',
    titleRu: 'Эрмитаж и Зимний Дворец',
    titleEn: 'Hermitage Museum & Winter Palace',
    location: 'St. Petersburg, Russia',
    coordinates: '59.9398° N, 30.3146° E',
    description: 'The grand residence of Russian Emperors along the Neva River, housing over 3 million art masterpieces.',
    culturalNote: 'Founded by Empress Catherine the Great in 1764, it features 1,057 rooms and turquoise Baroque facades.',
    imgUrl: winterPalaceImg,
    tag: 'Tsarist Architecture',
    speechPhrase: 'Зимний Дворец'
  },
  {
    id: 'lake-baikal',
    titleRu: 'Озеро Байкал — Кристальный Лёд',
    titleEn: 'Lake Baikal Crystal Ice Fields',
    location: 'Siberia, Russia',
    coordinates: '53.5587° N, 108.1650° E',
    description: 'The world\'s deepest freshwater lake holding 20% of Earth\'s unfrozen surface freshwater.',
    culturalNote: 'Known as the "Sacred Sea" of Siberia, the winter ice is so clear you can see 40 meters deep.',
    imgUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tag: 'Natural Wonder',
    speechPhrase: 'Озеро Байкал'
  },
  {
    id: 'savior-blood',
    titleRu: 'Храм Спаса на Крови',
    titleEn: 'Church of the Savior on Spilled Blood',
    location: 'St. Petersburg, Russia',
    coordinates: '59.9401° N, 30.3289° E',
    description: 'Iconic Russian Revival church adorned with over 7,500 square meters of intricate glass mosaics.',
    culturalNote: 'Built on the exact canal spot where Tsar Alexander II was assassinated in 1881.',
    imgUrl: saviorOnBloodImg,
    tag: 'Mosaic Masterpiece',
    speechPhrase: 'Храм Спаса на Крови'
  },
  {
    id: 'trans-siberian',
    titleRu: 'Транссибирская Магистраль',
    titleEn: 'Trans-Siberian Railway & Winter Forests',
    location: 'Ural Mountains to Vladivostok',
    coordinates: '56.8389° N, 60.6057° E',
    description: 'The world\'s longest railway spanning 9,289 kilometers across 8 time zones through pristine birch forests.',
    culturalNote: 'A journey across two continents connecting Moscow with the Pacific Ocean.',
    imgUrl: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tag: 'Epic Expedition',
    speechPhrase: 'Транссибирская Магистраль'
  },
  {
    id: 'kamchatka',
    titleRu: 'Вулканы и Долины Камчатки',
    titleEn: 'Kamchatka Volcanic Wilderness',
    location: 'Kamchatka Peninsula, Far East',
    coordinates: '54.4900° N, 160.0200° E',
    description: 'A dramatic UNESCO wilderness of active snow-capped volcanoes, hot geysers, and pristine rivers.',
    culturalNote: 'Home to 300 volcanoes including Klyuchevskaya Sopka, Eurasia\'s tallest active volcano.',
    imgUrl: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tag: 'UNESCO Heritage',
    speechPhrase: 'Вулканы Камчатки'
  }
];

export const RussiaPhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<RussiaPhotoItem | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayAudio = async (photo: RussiaPhotoItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSoundEffect('click');
    setPlayingId(photo.id);
    await playRussianSpeech(photo.speechPhrase);
    setPlayingId(null);
  };

  const handleOpenInspector = (photo: RussiaPhotoItem) => {
    playSoundEffect('click');
    setSelectedPhoto(photo);
  };

  return (
    <section className="space-y-8 py-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-light)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-mono font-bold uppercase mb-2">
            <Sparkles size={13} className="animate-spin" />
            <span>Interactive 3D Crystal Gallery</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[var(--text-primary)]">
            Explore <span className="text-gradient-animated-full">Imperial Russia</span>
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-serif italic mt-1">
            Click any photo frame to inspect high-resolution details, cultural stories, and hear native speech.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Compass size={14} className="text-rose-500" />
          <span>6 World-Famous Destinations</span>
        </div>
      </div>

      {/* 3D Crystal Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RUSSIA_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            onClick={() => handleOpenInspector(photo)}
            className="photo-crystal-card group cursor-pointer h-96 flex flex-col justify-between"
          >
            {/* Background Image */}
            <img
              src={photo.imgUrl}
              alt={photo.titleEn}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-105"
            />

            {/* Dark Glass Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

            {/* Top Badges */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <span className="photo-glow-badge px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase text-amber-400">
                {photo.tag}
              </span>

              <button
                onClick={(e) => handlePlayAudio(photo, e)}
                className={`p-2.5 rounded-full photo-glow-badge text-white hover:scale-110 transition-all ${
                  playingId === photo.id ? 'bg-rose-600 border-rose-400 animate-pulse' : 'hover:border-amber-400'
                }`}
                title="Listen to Russian pronunciation"
              >
                <Volume2 size={14} className={playingId === photo.id ? 'animate-bounce text-white' : 'text-amber-400'} />
              </button>
            </div>

            {/* Bottom Content Info */}
            <div className="relative z-10 p-6 space-y-2.5 text-white">
              <div className="flex items-center gap-2 text-[11px] font-mono text-amber-300">
                <span className="glow-dot-pulse" />
                <span>{photo.location}</span>
              </div>

              {/* Russian Name with Stunning Gold Letter Shine */}
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight leading-snug text-shine-gold">
                {photo.titleRu}
              </h3>

              {/* English Name Prominently Featured with Silver Letter Shine */}
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/25 text-amber-300 font-extrabold border border-amber-500/40 shrink-0">
                  EN
                </span>
                <p className="font-sans text-sm sm:text-base font-extrabold text-shine-silver tracking-wide leading-tight">
                  {photo.titleEn}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-amber-400 group-hover:translate-x-1.5 transition-transform">
                <Eye size={13} className="text-amber-400 animate-pulse" />
                <span className="underline uppercase tracking-wider font-bold">Inspect Holographic View</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Inspector Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lightbox-modal-overlay">
          <div 
            className="bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-3 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-all border border-slate-700 shadow-xl"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Left Photo View */}
              <div className="md:col-span-6 relative min-h-[300px] md:min-h-[450px]">
                <img
                  src={selectedPhoto.imgUrl}
                  alt={selectedPhoto.titleEn}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:hidden" />
              </div>

              {/* Right Content View */}
              <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="pill-badge bg-amber-500/20 text-amber-500 border-amber-500/40 text-xs font-mono font-bold uppercase">
                      {selectedPhoto.tag}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1">
                      <MapPin size={12} className="text-rose-500" />
                      {selectedPhoto.coordinates}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase text-shine-gold">
                      {selectedPhoto.titleRu}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                        ENGLISH
                      </span>
                      <p className="text-lg font-sans font-extrabold text-shine-silver">
                        {selectedPhoto.titleEn}
                      </p>
                    </div>
                    <p className="font-serif italic text-base text-amber-500 font-bold mt-1">
                      «{selectedPhoto.speechPhrase}»
                    </p>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {selectedPhoto.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-light)] space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-rose-500 block">
                      ✦ Cultural & Linguistic Insight
                    </span>
                    <p className="text-xs text-[var(--text-primary)] font-serif italic">
                      "{selectedPhoto.culturalNote}"
                    </p>
                  </div>
                </div>

                {/* Speech Button CTA */}
                <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-[var(--border-light)]">
                  <button
                    onClick={() => handlePlayAudio(selectedPhoto)}
                    className="pill-btn bg-amber-600 border-amber-600 text-white hover:scale-105 transition-all shadow-lg flex-1 justify-center"
                  >
                    <Volume2 size={16} />
                    <span>Hear Russian Speech</span>
                  </button>

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="pill-btn-outline"
                  >
                    <span>Close Inspection</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
