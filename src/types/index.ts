export type UILanguage = 'en' | 'es' | 'zh' | 'fr' | 'ar' | 'de';

export type ActiveView = 
  | 'home' 
  | 'alphabet' 
  | 'courses' 
  | 'lesson' 
  | 'cases' 
  | 'dialogues' 
  | 'dashboard'
  | 'placement'
  | 'srs'
  | 'culture'
  | 'dictation'
  | 'quests'
  | 'map'
  | 'idioms'
  | 'admin';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface CyrillicLetter {
  id: string;
  symbol: string;
  lowercase: string;
  name: string;
  englishApprox: string;
  ipa: string;
  category: 'vowel' | 'consonant' | 'sign';
  isSoftOrHardSign?: boolean;
  sampleWord: string;
  sampleTranslation: string;
  sampleTranslationEn: string;
  sampleStressIndex: number;
}

export interface ExerciseOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export type ExerciseType = 'multiple_choice' | 'drag_order' | 'case_fill' | 'audio_listen';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  questionRu?: string;
  audioPrompt?: string;
  options?: ExerciseOption[];
  wordsToOrder?: string[];
  correctSentence?: string;
  caseTargetWord?: string;
  caseHint?: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  level: CEFRLevel;
  title: string;
  titleRu: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  grammarFocus: string;
  vocabulary: { word: string; translation: string; pronunciation: string }[];
  exercises: Exercise[];
  isUnlocked: boolean;
  isCompleted: boolean;
}

export interface Course {
  id: string;
  title: string;
  titleRu: string;
  level: CEFRLevel;
  description: string;
  iconName: string;
  lessons: Lesson[];
}

export interface RussianCaseRule {
  caseName: string;
  caseNameRu: string;
  questionRu: string;
  questionEn: string;
  usageSummary: string;
  masculineEnding: string;
  feminineEnding: string;
  neuterEnding: string;
  pluralEnding: string;
  exampleSentence: string;
}

export interface DialogueMessage {
  id: string;
  speaker: 'avatar' | 'student';
  textRu: string;
  textEn: string;
  audioText?: string;
  options?: { id: string; textRu: string; textEn: string; isCorrect: boolean }[];
}

export interface DialogueScenario {
  id: string;
  title: string;
  titleRu: string;
  location: string;
  description: string;
  avatarName: string;
  avatarRole: string;
  messages: DialogueMessage[];
}

export interface Badge {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface PlacementQuestion {
  id: string;
  question: string;
  questionRu?: string;
  audioPrompt?: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  targetLevel: CEFRLevel;
}

export interface SRSCardItem {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  exampleRu: string;
  exampleEn: string;
  box: number;
  lastReviewed: string;
  nextReviewDate: string;
}

export interface CultureStory {
  id: string;
  title: string;
  titleRu: string;
  category: 'Literature' | 'History' | 'Travel' | 'Tradition';
  readTimeMinutes: number;
  excerptRu: string;
  excerptEn: string;
  fullStoryRu: string;
  fullStoryEn: string;
  vocabularyList: { word: string; translation: string }[];
}

export interface DictationItem {
  id: string;
  audioPrompt: string;
  targetRu: string;
  translationEn: string;
  hint: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  titleRu: string;
  rewardXp: number;
  targetCount: number;
  currentCount: number;
  isCompleted: boolean;
}

export interface IdiomItem {
  id: string;
  idiomRu: string;
  literalEn: string;
  meaningEn: string;
  exampleRu: string;
}

export interface CityLandmark {
  id: string;
  cityName: string;
  cityNameRu: string;
  region: string;
  description: string;
  keyPhrases: { ru: string; en: string }[];
}

export interface DailyActivityLog {
  date: string;
  minutesSpent: number;
  lessonsCompleted: number;
  xpEarned: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  selectedLanguage: UILanguage;
  xp: number;
  streak: number;
  lastActiveDate: string;
  levelTitle: string;
  completedLessonIds: string[];
  bookmarkedWords: string[];
  badges: Badge[];
  srsCards: SRSCardItem[];
  placementResult?: {
    recommendedLevel: CEFRLevel;
    score: number;
    total: number;
    testedAt: string;
  };
  activityLogs: DailyActivityLog[];
}
