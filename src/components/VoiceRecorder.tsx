import React, { useState, useEffect } from 'react';
import { Mic, MicOff, RefreshCw, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';
import { playRussianSpeech } from '../utils/audioEngine';

interface VoiceRecorderProps {
  targetPhrase: string;
  onMatchResult?: (scorePercentage: number) => void;
}

// Extend Window interface for WebkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  targetPhrase,
  onMatchResult
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const calculateSimilarity = (str1: string, str2: string): number => {
    const clean1 = str1.toLowerCase().replace(/[^\wа-яё]/gi, '').trim();
    const clean2 = str2.toLowerCase().replace(/[^\wа-яё]/gi, '').trim();
    
    if (!clean1 || !clean2) return 0;
    if (clean1 === clean2) return 100;

    // Simple character overlap ratio
    let matches = 0;
    const minLength = Math.min(clean1.length, clean2.length);
    for (let i = 0; i < minLength; i++) {
      if (clean1[i] === clean2[i]) matches++;
    }
    
    const percentage = Math.round((matches / Math.max(clean1.length, clean2.length)) * 100);
    return Math.max(percentage, clean1.includes(clean2) || clean2.includes(clean1) ? 80 : percentage);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ru-RU';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      setTranscript('');
      setMatchScore(null);

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        setTranscript(spoken);
        const score = calculateSimilarity(spoken, targetPhrase);
        setMatchScore(score);
        if (onMatchResult) onMatchResult(score);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-4 text-center">
      <div className="flex items-center justify-between">
        <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
          🎙️ Spoken Pronunciation Analyzer
        </span>
        
        <button
          onClick={() => playRussianSpeech(targetPhrase)}
          className="text-xs text-slate-300 hover:text-amber-400 flex items-center gap-1"
          title="Listen to Target Pronunciation"
        >
          <Volume2 size={14} />
          <span>Listen Target</span>
        </button>
      </div>

      <div className="py-2">
        <p className="font-serif text-xl font-bold text-slate-100">
          "{targetPhrase}"
        </p>
      </div>

      {/* Record Trigger Button */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={startListening}
          disabled={isListening || !isSupported}
          className={`px-5 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
            isListening
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-gradient-to-r from-amber-500 to-rose-600 text-white hover:scale-105'
          }`}
        >
          {isListening ? (
            <>
              <MicOff size={18} className="animate-spin" />
              <span>Listening... Speak Now in Russian!</span>
            </>
          ) : (
            <>
              <Mic size={18} />
              <span>Click & Speak Russian</span>
            </>
          )}
        </button>
      </div>

      {/* Transcript & Feedback Output */}
      {transcript && (
        <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-2 text-xs">
          <p className="text-slate-400">
            You Spoke: <strong className="text-slate-100">"{transcript}"</strong>
          </p>

          {matchScore !== null && (
            <div className={`p-2 rounded-lg font-bold flex items-center justify-center gap-2 ${
              matchScore >= 75
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {matchScore >= 75 ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{matchScore}% Match — {matchScore >= 75 ? 'Great Native Pronunciation! 🎉' : 'Good try! Listen to target audio and try again.'}</span>
            </div>
          )}
        </div>
      )}

      {!isSupported && (
        <p className="text-[11px] text-slate-400 italic">
          Voice recording requires browser speech support (Google Chrome, MS Edge, or Safari).
        </p>
      )}
    </div>
  );
};
