export type QuestionCategory = 
  | 'Cell Biology' 
  | 'General Histology' 
  | 'Embryology & Development' 
  | 'Neuroanatomy';

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  category: QuestionCategory;
  highYieldPearl?: string;
  difficulty?: 'Standard' | 'High-Yield' | 'Critical';
}

export type QuizMode = 'exam' | 'practice';

export interface UserAnswer {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
  timeSpentSeconds?: number;
}

export interface QuizAttempt {
  id: string;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeElapsedSeconds: number;
  completedAt: string;
  mode: QuizMode;
  categoryScores: Record<QuestionCategory, { correct: number; total: number }>;
  answers: UserAnswer[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  batch: string;
  score: number;
  total: number;
  percentage: number;
  time: string;
  date: string;
  isCurrentUser?: boolean;
}
