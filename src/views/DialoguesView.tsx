import React, { useState } from 'react';
import { DIALOGUE_SCENARIOS } from '../data/mockData';
import { DialogueScenario } from '../types';
import { playRussianSpeech, playSoundEffect } from '../utils/audioEngine';
import { MessageSquare, Volume2, Sparkles, MapPin, User, CheckCircle2 } from 'lucide-react';

export const DialoguesView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<DialogueScenario>(DIALOGUE_SCENARIOS[0]);
  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
  const [userChatHistory, setUserChatHistory] = useState<{ speaker: string; textRu: string; textEn: string }[]>([]);
  const [showTranslations, setShowTranslations] = useState(true);

  const currentMessage = selectedScenario.messages[currentMsgIdx];

  const handleSpeech = (text: string) => {
    playRussianSpeech(text);
  };

  const handleSelectOption = (option: { textRu: string; textEn: string; isCorrect: boolean }) => {
    playSoundEffect(option.isCorrect ? 'correct' : 'click');
    
    // Add student message to chat history
    setUserChatHistory(prev => [
      ...prev,
      { speaker: 'student', textRu: option.textRu, textEn: option.textEn }
    ]);

    // Advance dialogue
    if (currentMsgIdx + 1 < selectedScenario.messages.length) {
      setTimeout(() => {
        const nextMsg = selectedScenario.messages[currentMsgIdx + 1];
        setUserChatHistory(prev => [
          ...prev,
          { speaker: selectedScenario.avatarName, textRu: nextMsg.textRu, textEn: nextMsg.textEn }
        ]);
        setCurrentMsgIdx(prev => prev + 1);
        playRussianSpeech(nextMsg.textRu);
      }, 1000);
    }
  };

  return (
    <div className="space-y-12 py-6">
      
      {/* HEADER */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <MessageSquare size={14} />
          <span>Conversational Practice Studio</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-100">
          Real-World Russian Dialogue Simulator
        </h1>
        
        <p className="text-sm text-slate-300 max-w-2xl">
          Simulate real conversations with Russian speakers in Moscow cafes, railway stations, and cultural landmarks.
        </p>

        {/* Scenario Selector Tabs */}
        <div className="flex flex-wrap gap-3 pt-2">
          {DIALOGUE_SCENARIOS.map(sc => (
            <button
              key={sc.id}
              onClick={() => {
                playSoundEffect('click');
                setSelectedScenario(sc);
                setCurrentMsgIdx(0);
                setUserChatHistory([]);
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                selectedScenario.id === sc.id
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg scale-105'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{sc.title}</span>
              <span className="text-[10px] block font-serif opacity-80">{sc.titleRu}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT SIMULATOR LAYOUT */}
      <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 bg-slate-950/90 space-y-6 max-w-3xl mx-auto shadow-2xl">
        
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-white shadow-md">
              <User size={24} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-100">{selectedScenario.avatarName}</h3>
              <p className="text-xs text-amber-400 font-semibold">{selectedScenario.avatarRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className="px-3 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs text-slate-300 hover:text-amber-400"
            >
              {showTranslations ? 'Hide English Hints' : 'Show English Hints'}
            </button>
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="space-y-4 min-h-[250px] max-h-[400px] overflow-y-auto p-4 rounded-2xl bg-slate-900/60 border border-white/5">
          
          {/* Avatar Initial Message */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1">
              Е
            </div>
            <div className="p-4 rounded-2xl bg-slate-800 border border-white/10 text-slate-100 max-w-md space-y-2">
              <div className="flex items-center justify-between gap-4">
                <p className="font-serif text-base font-bold text-amber-300">{selectedScenario.messages[0].textRu}</p>
                <button
                  onClick={() => handleSpeech(selectedScenario.messages[0].textRu)}
                  className="text-amber-400 hover:scale-110 transition-transform"
                >
                  <Volume2 size={16} />
                </button>
              </div>
              {showTranslations && (
                <p className="text-xs text-slate-400 italic">{selectedScenario.messages[0].textEn}</p>
              )}
            </div>
          </div>

          {/* User History */}
          {userChatHistory.map((chat, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${chat.speaker === 'student' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1 ${
                chat.speaker === 'student' ? 'bg-amber-500' : 'bg-rose-600'
              }`}>
                {chat.speaker === 'student' ? 'You' : 'Е'}
              </div>
              <div className={`p-4 rounded-2xl border max-w-md space-y-1 ${
                chat.speaker === 'student'
                  ? 'bg-amber-500/20 border-amber-400/40 text-amber-100'
                  : 'bg-slate-800 border-white/10 text-slate-100'
              }`}>
                <p className="font-serif text-base font-bold">{chat.textRu}</p>
                {showTranslations && <p className="text-xs opacity-75 italic">{chat.textEn}</p>}
              </div>
            </div>
          ))}

        </div>

        {/* Student Option Picker */}
        {currentMessage && currentMessage.options && (
          <div className="space-y-3 pt-4 border-t border-white/10">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
              Choose Spoken Response:
            </span>

            <div className="space-y-2">
              {currentMessage.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full p-4 rounded-2xl bg-slate-900 border border-white/10 hover:border-amber-400 text-left transition-all hover:bg-slate-800 group"
                >
                  <p className="font-serif text-sm font-bold text-slate-100 group-hover:text-amber-300">
                    "{opt.textRu}"
                  </p>
                  {showTranslations && (
                    <p className="text-xs text-slate-400 italic mt-0.5">
                      Translation: "{opt.textEn}"
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
