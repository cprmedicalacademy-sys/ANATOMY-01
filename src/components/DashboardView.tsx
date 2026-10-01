import React from 'react';
import { 
  Play, 
  BookOpen, 
  Award, 
  Dna, 
  Brain, 
  Microscope, 
  Baby, 
  ArrowRight, 
  History, 
  CheckCircle2, 
  Flame,
  Zap
} from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import { QuizAttempt, QuestionCategory } from '../types';
import { getLeaderboard, getBookmarks } from '../utils/storage';

interface DashboardViewProps {
  userName: string;
  attempts: QuizAttempt[];
  onStartExam: (mode: 'exam' | 'practice') => void;
  onOpenStudy: () => void;
  onOpenLeaderboard: () => void;
  onReviewAttempt: (attempt: QuizAttempt) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userName,
  attempts,
  onStartExam,
  onOpenStudy,
  onOpenLeaderboard,
  onReviewAttempt,
}) => {
  const leaderboard = getLeaderboard();
  const bookmarkedCount = getBookmarks().length;

  // Compute aggregate stats
  const totalQuestions = QUESTIONS.length;
  const bestScoreAttempt = attempts.length > 0
    ? attempts.reduce((max, att) => (att.score > max.score ? att : max), attempts[0])
    : null;

  const avgPercentage = attempts.length > 0
    ? Math.round(attempts.reduce((sum, att) => sum + att.percentage, 0) / attempts.length)
    : 0;

  // Category counts and user category performance
  const categories: { name: QuestionCategory; icon: React.ReactNode; count: number; color: string }[] = [
    { name: 'Cell Biology', icon: <Dna className="w-4 h-4 text-emerald-600" />, count: QUESTIONS.filter(q => q.category === 'Cell Biology').length, color: 'bg-emerald-500' },
    { name: 'General Histology', icon: <Microscope className="w-4 h-4 text-blue-600" />, count: QUESTIONS.filter(q => q.category === 'General Histology').length, color: 'bg-blue-500' },
    { name: 'Embryology & Development', icon: <Baby className="w-4 h-4 text-amber-600" />, count: QUESTIONS.filter(q => q.category === 'Embryology & Development').length, color: 'bg-amber-500' },
    { name: 'Neuroanatomy', icon: <Brain className="w-4 h-4 text-purple-600" />, count: QUESTIONS.filter(q => q.category === 'Neuroanatomy').length, color: 'bg-purple-500' },
  ];

  const getCategoryMastery = (catName: QuestionCategory) => {
    if (attempts.length === 0) return 0;
    let totalCorrect = 0;
    let totalAsked = 0;
    attempts.forEach(att => {
      if (att.categoryScores && att.categoryScores[catName]) {
        totalCorrect += att.categoryScores[catName].correct;
        totalAsked += att.categoryScores[catName].total;
      }
    });
    return totalAsked > 0 ? Math.round((totalCorrect / totalAsked) * 100) : 0;
  };

  const displayName = userName ? (userName.startsWith('Dr.') ? userName : `Dr. ${userName}`) : 'Doctor';

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome & Action Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 text-white border border-slate-800 shadow-sm">
        {/* Subtle decorative medical cross grid */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:flex items-center justify-center">
          <svg className="w-72 h-72 text-emerald-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
            <path d="M50 20 V80 M20 50 H80" />
            <circle cx="50" cy="50" r="15" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2">
            <span>CPR Medical Academy</span>
            <span aria-hidden="true">·</span>
            <span>Special BCS Crystal Batch</span>
            <span aria-hidden="true">·</span>
            <span>Anatomy-01</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Welcome back, {displayName}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Master the 50 high-yield questions covering Cell Biology, Histology, Embryology, and Neuroanatomy. Assess your readiness under timed BCS exam conditions or study with instant clinical rationales.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartExam('exam')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center space-x-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start BCS Exam (50 Qs)</span>
            </button>

            <button
              onClick={() => onStartExam('practice')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Practice Mode (Instant Feedback)</span>
            </button>

            <button
              onClick={onOpenStudy}
              className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:underline transition-colors flex items-center space-x-1"
            >
              <BookOpen className="w-4 h-4" />
              <span>Study Question Bank</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Total Questions</span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {totalQuestions}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            4 sub-disciplines included
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Personal Best</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {bestScoreAttempt ? `${bestScoreAttempt.score} / ${bestScoreAttempt.totalQuestions}` : '—'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {bestScoreAttempt ? `${bestScoreAttempt.percentage}% accuracy` : 'Take your first test'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Average Score</span>
            <Flame className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {attempts.length > 0 ? `${avgPercentage}%` : '—'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Across {attempts.length} {attempts.length === 1 ? 'attempt' : 'attempts'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Saved for Review</span>
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {bookmarkedCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Bookmarked questions in Bank
          </p>
        </div>
      </div>

      {/* Category Mastery Cards */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Anatomy-01 Category Mastery
            </h2>
            <p className="text-xs text-slate-500">
              Granular breakdown across the BCS Crystal Batch curriculum
            </p>
          </div>
          <button
            onClick={onOpenStudy}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
          >
            <span>Explore Bank</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const mastery = getCategoryMastery(cat.name);
            return (
              <div 
                key={cat.name} 
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 leading-tight">
                      {cat.name}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span>{cat.count} Questions</span>
                    <span className="font-semibold text-slate-700 tabular-nums">{mastery}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${cat.color} transition-all duration-500 rounded-full`}
                      style={{ width: `${mastery}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column Section: History & Batch Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Exam Attempts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <History className="w-4 h-4 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Recent Exam Runs
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {attempts.length} Recorded
              </span>
            </div>

            {attempts.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-slate-800">
                  No Exam Records Yet
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Take your first 50-question Anatomy-01 exam to record your score, analyze weaknesses, and see your name on the batch leaderboard.
                </p>
                <button
                  onClick={() => onStartExam('exam')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition"
                >
                  Start Exam Now
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 overflow-y-auto max-h-[300px]">
                {attempts.slice(0, 5).map((att) => {
                  const mins = Math.floor(att.timeElapsedSeconds / 60);
                  const secs = att.timeElapsedSeconds % 60;
                  return (
                    <div key={att.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          att.percentage >= 80 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : att.percentage >= 60 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {att.percentage}%
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">
                            Score: {att.score} / {att.totalQuestions}
                          </p>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                            <span>{att.mode === 'exam' ? 'BCS Exam' : 'Practice'}</span>
                            <span aria-hidden="true">·</span>
                            <span>{mins}m {secs}s</span>
                            <span aria-hidden="true">·</span>
                            <span>{att.completedAt}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onReviewAttempt(att)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                      >
                        Review
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {attempts.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => onStartExam('exam')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <span>Take Another Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Batch Leaderboard Preview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">
                  Crystal Batch Top Rankers
                </h3>
              </div>
              <button
                onClick={onOpenLeaderboard}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                View All
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Special BCS Crystal Batch official rankings
            </p>

            {leaderboard.length === 0 ? (
              <div className="py-8 text-center">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-xs font-semibold text-slate-700">Leaderboard is Fresh & Reset</p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-[220px] mx-auto">
                  No records yet. Be the first doctor in the Crystal Batch to secure a rank!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.slice(0, 5).map((entry, index) => {
                  const isUser = entry.name.toLowerCase() === userName.toLowerCase();
                  return (
                    <div
                      key={entry.id || index}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition ${
                        isUser
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-slate-50/60 border-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate max-w-[170px]">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] ${
                          index === 0
                            ? 'bg-amber-100 text-amber-800'
                            : index === 1
                            ? 'bg-slate-200 text-slate-800'
                            : index === 2
                            ? 'bg-amber-50 text-amber-700'
                            : 'text-slate-400'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="truncate">
                          {entry.name}
                          {isUser && ' (You)'}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="font-bold text-slate-900 tabular-nums">
                          {entry.score}/50
                        </span>
                        <span className="text-[10px] text-slate-400 tabular-nums">
                          {entry.percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={onOpenLeaderboard}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition text-center"
            >
              Open Full Leaderboard
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
