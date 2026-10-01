import React, { useState } from 'react';
import { 
  Award, 
  RotateCcw, 
  Share2, 
  LayoutDashboard, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  Sparkles,
  Trophy
} from 'lucide-react';
import { QuizAttempt, Question } from '../types';
import { toggleBookmark, isQuestionBookmarked } from '../utils/storage';

interface ResultsViewProps {
  attempt: QuizAttempt;
  questions: Question[];
  onRetake: () => void;
  onGoToDashboard: () => void;
  onOpenLeaderboard: () => void;
  onOpenShareModal: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  attempt,
  questions,
  onRetake,
  onGoToDashboard,
  onOpenLeaderboard,
  onOpenShareModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [bookmarkedSet, setBookmarkedSet] = useState<Set<number>>(() => {
    const s = new Set<number>();
    questions.forEach(q => {
      if (isQuestionBookmarked(q.id)) s.add(q.id);
    });
    return s;
  });

  const mins = Math.floor(attempt.timeElapsedSeconds / 60);
  const secs = attempt.timeElapsedSeconds % 60;

  const getTier = (percentage: number) => {
    if (percentage >= 90) return { label: 'Honors Distinction', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (percentage >= 80) return { label: 'Outstanding Pass', color: 'text-teal-700 bg-teal-50 border-teal-200' };
    if (percentage >= 70) return { label: 'Pass with Merit', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (percentage >= 50) return { label: 'Candidate Pass', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Needs In-Depth Review', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const tier = getTier(attempt.percentage);

  const toggleExpand = (qId: number) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleBookmarkToggle = (qId: number) => {
    const res = toggleBookmark(qId);
    setBookmarkedSet(prev => {
      const next = new Set(prev);
      if (res) next.add(qId);
      else next.delete(qId);
      return next;
    });
  };

  const answersMap = new Map(attempt.answers.map(a => [a.questionId, a]));

  const filteredQuestions = questions.filter(q => {
    const ans = answersMap.get(q.id);
    if (filter === 'incorrect') return !ans || !ans.isCorrect;
    if (filter === 'correct') return ans && ans.isCorrect;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto w-full pb-16 space-y-6">
      
      {/* Score Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 mb-2">
          <span>CPR Medical Academy</span>
          <span aria-hidden="true">·</span>
          <span>Special BCS Crystal Batch</span>
          <span aria-hidden="true">·</span>
          <span>Anatomy-01</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Assessment Completed
        </h1>

        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold border mb-6" style={{ borderColor: 'inherit' }}>
          <span className={`px-2 py-0.5 rounded-full ${tier.color}`}>
            {tier.label}
          </span>
        </div>

        {/* 3 Metrics Block */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase">Correct</p>
            <p className="text-2xl font-bold text-emerald-600 tabular-nums">
              {attempt.score} <span className="text-xs font-normal text-slate-400">/ {attempt.totalQuestions}</span>
            </p>
          </div>
          <div className="border-x border-slate-200/60">
            <p className="text-[11px] font-semibold text-slate-400 uppercase">Accuracy</p>
            <p className="text-2xl font-bold text-slate-900 tabular-nums">
              {attempt.percentage}%
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase">Time</p>
            <p className="text-2xl font-bold text-slate-900 tabular-nums">
              {mins}:{secs.toString().padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenShareModal}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Achievement Card</span>
          </button>

          <button
            onClick={onOpenLeaderboard}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition flex items-center space-x-2"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>View Batch Leaderboard</span>
          </button>

          <button
            onClick={onRetake}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>

          <button
            onClick={onGoToDashboard}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center space-x-1.5"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      {/* Category Performance Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-4">
          Sub-discipline Performance Breakdown
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(attempt.categoryScores || {}).map(([cat, data]) => {
            const catPercent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            return (
              <div key={cat} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-800">{cat}</span>
                  <span className="font-bold text-slate-700 tabular-nums">{catPercent}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span>{data.correct} of {data.total} correct</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${catPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question-by-Question Review Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Exam Review & Explanations
            </h2>
            <p className="text-xs text-slate-500">
              Review full clinical rationales and key takeaways
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                filter === 'incorrect'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Incorrect ({questions.length - attempt.score})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                filter === 'correct'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Correct ({attempt.score})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const ans = answersMap.get(q.id);
            const isCorrect = ans ? ans.isCorrect : false;
            const selectedOpt = ans ? ans.selectedOption : -1;
            const isExpanded = expandedQuestions.has(q.id);
            const isBookmarked = bookmarkedSet.has(q.id);

            return (
              <div 
                key={q.id}
                className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                      isCorrect 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </span>
                    <span className="text-xs font-bold text-slate-700">Q{q.id}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{q.category}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleBookmarkToggle(q.id)}
                      className={`p-1.5 rounded-lg transition ${
                        isBookmarked ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark question'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-600' : ''}`} />
                    </button>

                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  {q.question}
                </h3>

                {/* Selected vs Correct Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                  <div className={`p-2.5 rounded-lg border ${
                    isCorrect 
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-medium' 
                      : 'bg-rose-50/60 border-rose-200 text-rose-900'
                  }`}>
                    <span className="font-bold">Your Choice: </span>
                    {selectedOpt >= 0 ? `${String.fromCharCode(65 + selectedOpt)}. ${q.options[selectedOpt]}` : 'Unanswered'}
                  </div>

                  {!isCorrect && (
                    <div className="p-2.5 rounded-lg border bg-emerald-50/60 border-emerald-200 text-emerald-900 font-medium">
                      <span className="font-bold">Correct Choice: </span>
                      {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}
                    </div>
                  )}
                </div>

                {/* Explanation Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-700 space-y-2">
                    <p className="leading-relaxed">
                      <span className="font-bold text-slate-900">Clinical Explanation: </span>
                      {q.explanation}
                    </p>
                    {q.highYieldPearl && (
                      <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-100 text-emerald-900 flex items-start space-x-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>BCS Pearl:</strong> {q.highYieldPearl}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
