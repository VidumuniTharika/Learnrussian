import React from 'react';
import { UserProfile } from '../types';
import { Shield, Users, BookOpen, BarChart3, Award } from 'lucide-react';

interface AdminViewProps {
  userProfile: UserProfile;
}

export const AdminView: React.FC<AdminViewProps> = ({ userProfile }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8">
      
      {/* HEADER */}
      <div className="border-b border-[var(--text-primary)] pb-8 space-y-4">
        <span className="pill-badge">Stage 5 Teacher & Institute Management</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
          Institute Management Portal
        </h1>
        
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
          Teacher portal preview for managing student rosters, tracking CEFR class metrics, and updating course exercises.
        </p>
      </div>

      {/* ADMIN METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="editorial-card p-6 bg-[var(--bg-surface)] space-y-2 text-center">
          <Users size={24} className="mx-auto text-amber-600" />
          <span className="font-display text-3xl font-extrabold text-[var(--text-primary)]">148</span>
          <span className="text-xs text-[var(--text-muted)] font-mono block">Enrolled Students</span>
        </div>

        <div className="editorial-card p-6 bg-[var(--bg-surface)] space-y-2 text-center">
          <BookOpen size={24} className="mx-auto text-emerald-600" />
          <span className="font-display text-3xl font-extrabold text-[var(--text-primary)]">10</span>
          <span className="text-xs text-[var(--text-muted)] font-mono block">Active CEFR Lessons</span>
        </div>

        <div className="editorial-card p-6 bg-[var(--bg-surface)] space-y-2 text-center">
          <Award size={24} className="mx-auto text-indigo-600" />
          <span className="font-display text-3xl font-extrabold text-[var(--text-primary)]">32</span>
          <span className="text-xs text-[var(--text-muted)] font-mono block">Certificates Issued</span>
        </div>
      </div>

      {/* STUDENT ROSTER PREVIEW */}
      <div className="editorial-card p-8 bg-[var(--bg-surface)] space-y-4">
        <h3 className="font-display text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border-light)] pb-3">
          Active Class Student Roster
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-light)] flex items-center justify-between font-bold">
            <span>Alex Rivera (Current Student)</span>
            <span className="pill-badge bg-emerald-600 text-white text-[9px]">Level A1 • {userProfile.xp} XP</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-light)] flex items-center justify-between">
            <span>Elena Rostova</span>
            <span className="pill-badge text-[9px]">Level B1 • 2450 XP</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-light)] flex items-center justify-between">
            <span>Kenji Sato</span>
            <span className="pill-badge text-[9px]">Level A2 • 420 XP</span>
          </div>
        </div>
      </div>

    </div>
  );
};
