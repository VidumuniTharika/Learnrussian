import React from 'react';
import { UserProfile, CEFRLevel } from '../types';
import { Award, CheckCircle2, ShieldCheck, Download, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  userProfile: UserProfile;
  level: CEFRLevel;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  userProfile,
  level,
  onClose
}) => {
  React.useEffect(() => {
    confetti({ particleCount: 150, spread: 90 });
  }, []);

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="editorial-card p-10 max-w-2xl w-full bg-[var(--bg-surface)] space-y-6 shadow-2xl relative border-2 border-[var(--text-primary)]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] font-bold"
        >
          <X size={20} />
        </button>

        {/* CERTIFICATE DESIGN FRAME */}
        <div className="border-4 border-double border-[var(--text-primary)] p-8 text-center space-y-6 bg-[var(--bg-main)] rounded-2xl">
          
          <div className="w-16 h-16 rounded-full bg-[var(--text-primary)] text-[var(--bg-main)] flex items-center justify-center font-display font-extrabold text-2xl mx-auto shadow-lg">
            РМ.
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block">
              International CEFR Certification
            </span>
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[var(--text-primary)]">
              Certificate of Completion
            </h2>
            <p className="text-xs font-serif italic text-[var(--text-secondary)]">
              «Свидетельство об окончании курса русского языка»
            </p>
          </div>

          <div className="py-4 space-y-2 border-t border-b border-[var(--border-light)] max-w-md mx-auto">
            <p className="text-xs text-[var(--text-muted)] font-mono uppercase">This certifies that</p>
            <h3 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
              {userProfile.name}
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              has successfully mastered the curriculum and demonstrated fluency in
            </p>
            <span className="font-display text-2xl font-extrabold text-amber-600 block pt-1">
              Russian CEFR Level {level}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-2 px-4">
            <div>
              <span className="block font-bold text-[var(--text-primary)]">Issued Date:</span>
              <span>{issueDate}</span>
            </div>
            <div>
              <span className="block font-bold text-[var(--text-primary)]">Verification Code:</span>
              <span>RUSSIA-CEFR-{level}-2026</span>
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="pill-btn text-xs"
          >
            <Download size={14} />
            <span>Print & Save Certificate</span>
          </button>
        </div>

      </div>
    </div>
  );
};
