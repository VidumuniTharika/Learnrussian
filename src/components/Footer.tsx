import React from 'react';
import { ActiveView } from '../types';
import { Globe, Heart, Shield, BookOpen, Sparkles } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--bg-surface)] text-[var(--text-secondary)] py-14 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Institute Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--text-primary)] text-[var(--bg-main)] font-display font-bold text-lg flex items-center justify-center">
                РМ.
              </div>
              <span className="font-display text-xl font-bold text-[var(--text-primary)]">РусскийМир</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Global Russian Language Learning Platform empowering students across 140+ countries to master Cyrillic, Russian grammar cases, and conversational fluency.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase text-[var(--text-primary)] tracking-wider mb-3">
              Learning Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('alphabet')} className="hover:text-amber-600 transition-colors">
                  🔤 Cyrillic Alphabet Soundboard (Азбука)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('courses')} className="hover:text-amber-600 transition-colors">
                  📚 CEFR Curriculum Roadmap (A1-B2)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('cases')} className="hover:text-amber-600 transition-colors">
                  ⚙️ Live Russian Case Declension Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dialogues')} className="hover:text-amber-600 transition-colors">
                  💬 Real-World Dialogue Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Advanced Features */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase text-[var(--text-primary)] tracking-wider mb-3">
              Stage 2 Studio
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('placement')} className="hover:text-amber-600 transition-colors">
                  🎯 Proficiency Placement Diagnostic
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('srs')} className="hover:text-amber-600 transition-colors">
                  🎴 Leitner SRS Flashcard Deck
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('culture')} className="hover:text-amber-600 transition-colors">
                  📖 Cultural Reader & Narration
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Proverb */}
          <div className="editorial-card p-4 bg-[var(--bg-main)] space-y-2">
            <span className="text-[10px] font-mono uppercase text-amber-600 font-bold block">Russian Proverb</span>
            <h5 className="font-serif font-bold text-sm text-[var(--text-primary)]">
              «Знание — сила»
            </h5>
            <p className="text-xs text-[var(--text-secondary)] italic">
              "Knowledge is power" — Practice 15 mins daily for permanent fluency!
            </p>
          </div>

        </div>

        <div className="border-t border-[var(--border-light)] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
          <p>© 2026 РусскийМир (RussoLearn Global LMS). Awwwards Editorial Design.</p>
          <div className="flex items-center gap-1">
            <span>Designed with excellence for Russian language learners worldwide</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
