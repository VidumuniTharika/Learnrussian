import React, { useState } from 'react';
import { UserProfile, DailyQuest } from '../types';
import { playSoundEffect } from '../utils/audioEngine';
import { Trophy, Award, CheckCircle2, Sparkles, Flame, ShieldCheck } from 'lucide-react';
import { CertificateModal } from '../components/CertificateModal';

const INITIAL_QUESTS: DailyQuest[] = [
  {
    id: 'q1',
    title: 'Cyrillic Master',
    titleRu: 'Мастер Азбуки',
    rewardXp: 50,
    targetCount: 5,
    currentCount: 5,
    isCompleted: true
  },
  {
    id: 'q2',
    title: 'Dialogue Practice',
    titleRu: 'Практика Диалога',
    rewardXp: 75,
    targetCount: 1,
    currentCount: 1,
    isCompleted: true
  },
  {
    id: 'q3',
    title: 'SRS Deck Revision',
    titleRu: 'Повторение Слов',
    rewardXp: 100,
    targetCount: 3,
    currentCount: 2,
    isCompleted: false
  }
];

interface DailyQuestsViewProps {
  userProfile: UserProfile;
}

export const DailyQuestsView: React.FC<DailyQuestsViewProps> = ({ userProfile }) => {
  const [quests, setQuests] = useState<DailyQuest[]>(INITIAL_QUESTS);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleClaimQuest = (questId: string) => {
    playSoundEffect('correct');
    setQuests(prev => prev.map(q => q.id === questId ? { ...q, isCompleted: true, currentCount: q.targetCount } : q));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8">
      
      {/* HEADER */}
      <div className="border-b border-[var(--text-primary)] pb-8 space-y-4">
        <span className="pill-badge">Stage 4 Gamification Engine</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
          Daily Quests & CEFR Certificates
        </h1>
        
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
          Complete daily micro-challenges to earn bonus XP, preserve your streak, and generate verifiable level certificates!
        </p>
      </div>

      {/* DAILY QUESTS LIST */}
      <div className="editorial-card p-8 bg-[var(--bg-surface)] space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-amber-600" />
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
              Today's Daily Micro-Challenges
            </h3>
          </div>
          <span className="pill-badge font-mono">Reset in 12h 30m</span>
        </div>

        <div className="space-y-4">
          {quests.map(quest => (
            <div
              key={quest.id}
              className={`p-5 rounded-2xl border flex items-center justify-between transition-all ${
                quest.isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-[var(--text-primary)]'
                  : 'bg-[var(--bg-main)] border-[var(--border-light)] text-[var(--text-primary)]'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-lg font-bold">{quest.title}</h4>
                  <span className="text-xs text-amber-600 font-serif italic">«{quest.titleRu}»</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  Progress: {quest.currentCount} / {quest.targetCount}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-amber-600">+{quest.rewardXp} XP</span>
                {quest.isCompleted ? (
                  <span className="pill-badge bg-emerald-600 text-white flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Completed</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleClaimQuest(quest.id)}
                    className="pill-btn text-xs py-1.5 px-4"
                  >
                    <span>Complete Goal</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CEFR CERTIFICATE GENERATOR BANNER */}
      <div className="editorial-card p-8 bg-[var(--bg-surface)] space-y-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-[var(--text-primary)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Award size={24} className="text-amber-600" />
            <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              Verified CEFR Level A1 Certificate
            </h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] max-w-lg">
            Generate and print your official verifiable certificate of completion for Russian Level A1 Starter!
          </p>
        </div>

        <button
          onClick={() => setShowCertificate(true)}
          className="pill-btn text-xs px-6 py-3 shrink-0"
        >
          <ShieldCheck size={16} />
          <span>View & Download Certificate</span>
        </button>
      </div>

      {showCertificate && (
        <CertificateModal
          userProfile={userProfile}
          level="A1"
          onClose={() => setShowCertificate(false)}
        />
      )}

    </div>
  );
};
