import React from 'react';
import { ActiveView } from '../types';
import { Globe, Heart, Shield, BookOpen, Sparkles } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Institute Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-serif font-bold text-white text-xl">
                РМ
              </div>
              <span className="font-serif text-xl font-bold text-slate-100">РусскийМир</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global Russian Language Learning Platform empowering students across 140+ countries to master Cyrillic, Russian grammar cases, and conversational fluency.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <Globe size={14} />
              <span>International CEFR Standard A1 - C1</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif font-bold text-sm text-slate-200 mb-4 uppercase tracking-wider">
              Learning Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('alphabet')} className="hover:text-amber-400 transition-colors">
                  🔤 Cyrillic Alphabet Soundboard (Азбука)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('courses')} className="hover:text-amber-400 transition-colors">
                  📚 CEFR Curriculum Roadmap (A1-B2)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('cases')} className="hover:text-amber-400 transition-colors">
                  ⚙️ Live Russian Case Declension Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dialogues')} className="hover:text-amber-400 transition-colors">
                  💬 Real-World Dialogue Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cultural Features */}
          <div>
            <h4 className="font-serif font-bold text-sm text-slate-200 mb-4 uppercase tracking-wider">
              Cultural Immersion
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-400">
                <Sparkles size={12} className="text-rose-400" />
                <span>Pushkin Literary Excerpts</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <BookOpen size={12} className="text-amber-400" />
                <span>Hermitage & Red Square Immersion</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <Shield size={12} className="text-emerald-400" />
                <span>Verified Native Pronunciation Engine</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Motto */}
          <div className="glass-panel p-4 rounded-xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent">
            <h4 className="font-serif font-bold text-amber-400 text-sm mb-2">
              «Знание — сила»
            </h4>
            <p className="text-xs text-slate-300 italic mb-3">
              "Knowledge is power" — Ancient Russian proverb.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
              Daily practice of just 15 minutes builds permanent neural pathways for Russian fluency!
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 РусскийМир (RussoLearn Global LMS). All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500" />
            <span>for Russian language learners worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
