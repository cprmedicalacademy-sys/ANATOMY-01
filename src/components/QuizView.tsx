import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Bookmark, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Grid, 
  X, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Question, QuizMode, UserAnswer, QuizAttempt, QuestionCategory } from '../types';
import { sounds } from '../utils/sound';
import { toggleBookmark, isQuestionBookmarked } from '../utils/storage';

interface QuizViewProps {
  questions: Question[];
  mode: QuizMode;
  userName: string;
  onFinishQuiz: (attempt: QuizAttempt) => void;
  onExitQuiz: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  mode,
  userName,
  onFinishQuiz,
  onExitQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(() => {
    const s = new Set<number>();
    questions.forEach(q => {
      if (isQuestionBookmarked(q.id)) s.add(q.id);
    });
    return s;
  });

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showPalette, setShowPalette] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const currentSelection = selectedAnswers[currentQuestion.id];
  const isAnswered = currentSelection !== undefined;

  // Sound & selection handler
  const handleSelectOption = (optionIndex: number) => {
    // In practice mode, if already answered, don't allow changing
    if (mode === 'practice' && isAnswered) return;

    sounds.playClick();
    const updated = { ...selectedAnswers, [currentQuestion.id]: optionIndex };
    setSelectedAnswers(updated);

    if (mode === 'practice') {
      if (optionIndex === currentQuestion.answer) {
        sounds.playCorrect();
      } else {
        sounds.playIncorrect();
      }
    }
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  const handleToggleBookmark = () => {
    const isNowBookmarked = toggleBookmark(currentQuestion.id);
    setBookmarkedQuestions(prev => {
      const next = new Set(prev);
      if (isNowBookmarked) {
        next.add(currentQuestion.id);
      } else {
        next.delete(currentQuestion.id);
      }
      return next;
    });
  };

  const goToNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const calculateAttempt = useCallback((): QuizAttempt => {
    let score = 0;
    const userAnswers: UserAnswer[] = [];
    const categoryScores: Record<QuestionCategory, { correct: number; total: number }> = {
      'Cell Biology': { correct: 0, total: 0 },
      'General Histology': { correct: 0, total: 0 },
      'Embryology & Development': { correct: 0, total: 0 },
      'Neuroanatomy': { correct: 0, total: 0 },
    };

    questions.forEach(q => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.answer;
      if (isCorrect) score++;

      if (categoryScores[q.category]) {
        categoryScores[q.category].total += 1;
        if (isCorrect) categoryScores[q.category].correct += 1;
      }

      userAnswers.push({
        questionId: q.id,
        selectedOption: selected !== undefined ? selected : -1,
        isCorrect: isCorrect,
      });
    });

    const percentage = Math.round((score / total) * 100);
    const dateStr = new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return {
      id: 'att_' + Date.now(),
      userName: userName || 'Dr. Candidate',
      score,
      totalQuestions: total,
      percentage,
      timeElapsedSeconds: secondsElapsed,
      completedAt: dateStr,
      mode,
      categoryScores,
      answers: userAnswers,
    };
  }, [questions, selectedAnswers, total, userName, secondsElapsed, mode]);

  const handleSubmit = () => {
    setIsTimerRunning(false);
    sounds.playComplete();
    const attempt = calculateAttempt();
    onFinishQuiz(attempt);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showConfirmSubmit || showExitConfirm || showPalette) return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (idx < currentQuestion.options.length) {
          handleSelectOption(idx);
        }
      } else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
        const idx = e.key.toLowerCase().charCodeAt(0) - 97;
        if (idx < currentQuestion.options.length) {
          handleSelectOption(idx);
        }
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'f') {
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, showConfirmSubmit, showExitConfirm, showPalette, isAnswered]);

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / total) * 100);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-16">
      
      {/* Quiz Top Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-slate-700 tabular-nums">
            Question {currentIndex + 1} of {total}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            {currentQuestion.category}
          </span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            {mode === 'exam' ? 'Timed Exam Mode' : 'Instant Practice Mode'}
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Live Timer */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 tabular-nums">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>

          {/* Palette Toggle */}
          <button
            onClick={() => setShowPalette(!showPalette)}
            className={`p-2 rounded-lg text-xs font-semibold border transition flex items-center space-x-1.5 ${
              showPalette
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Question Palette (1-50)"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Palette</span>
          </button>

          {/* Quit button */}
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
            title="Exit Exam"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-1.5 rounded-full mb-4 overflow-hidden">
        <div 
          className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Question Card & Drawer Layout */}
      <div className="relative">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
          
          {/* Question Header & Action icons */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 tabular-nums">
                Q{currentQuestion.id}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {currentQuestion.category}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleToggleFlag}
                className={`p-2 rounded-lg text-xs transition flex items-center space-x-1 ${
                  flaggedQuestions.has(currentQuestion.id)
                    ? 'bg-amber-50 text-amber-600 font-semibold'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
                title="Flag for review"
              >
                <Flag className={`w-4 h-4 ${flaggedQuestions.has(currentQuestion.id) ? 'fill-amber-500' : ''}`} />
                <span className="hidden sm:inline">
                  {flaggedQuestions.has(currentQuestion.id) ? 'Flagged' : 'Flag'}
                </span>
              </button>

              <button
                onClick={handleToggleBookmark}
                className={`p-2 rounded-lg text-xs transition flex items-center space-x-1 ${
                  bookmarkedQuestions.has(currentQuestion.id)
                    ? 'bg-emerald-50 text-emerald-600 font-semibold'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
                title="Bookmark question for study bank"
              >
                <Bookmark className={`w-4 h-4 ${bookmarkedQuestions.has(currentQuestion.id) ? 'fill-emerald-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Question Stem */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-6 text-balance">
            {currentQuestion.question}
          </h2>

          {/* Options Container */}
          <div className="space-y-3 mb-6" role="radiogroup" aria-label="Question choices">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = currentSelection === idx;
              const isCorrectAnswer = idx === currentQuestion.answer;

              let style = "bg-slate-50/70 border-slate-200/90 text-slate-700 hover:bg-slate-100 hover:border-slate-300";

              if (mode === 'practice' && isAnswered) {
                if (isCorrectAnswer) {
                  style = "bg-emerald-50/90 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500";
                } else if (isSelected && !isCorrectAnswer) {
                  style = "bg-rose-50/90 border-rose-400 text-rose-950 ring-1 ring-rose-400";
                } else {
                  style = "bg-slate-50/40 border-slate-100 text-slate-400 opacity-60";
                }
              } else if (isSelected) {
                style = "bg-emerald-50/80 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-500";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between group ${style}`}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 group-hover:border-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm leading-relaxed">{option}</span>
                  </div>

                  {mode === 'practice' && isAnswered && (
                    <div className="shrink-0 ml-2">
                      {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-500" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Clinical Explanation (In Practice Mode) */}
          {mode === 'practice' && isAnswered && (
            <div className={`p-4 rounded-xl border transition-all mb-6 ${
              currentSelection === currentQuestion.answer
                ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                : 'bg-amber-50/70 border-amber-200 text-slate-800'
            }`}>
              <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider mb-2">
                {currentSelection === currentQuestion.answer ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-800">Correct Answer</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-800">Clinical Rationale</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2.5">
                {currentQuestion.explanation}
              </p>
              {currentQuestion.highYieldPearl && (
                <div className="pt-2 border-t border-slate-200/60 flex items-start space-x-1.5 text-xs text-emerald-800 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>High-Yield Pearl:</strong> {currentQuestion.highYieldPearl}</span>
                </div>
              )}
            </div>
          )}

          {/* Question Footer Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
                currentIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {currentIndex < total - 1 ? (
                <button
                  onClick={goToNext}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition flex items-center space-x-1.5 shadow-xs"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition flex items-center space-x-1.5 shadow-xs"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Submit Exam</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Floating Question Palette Modal/Drawer */}
        {showPalette && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-xl p-6 z-20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Question Palette (50 Questions)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click any number to jump directly to that question.
                  </p>
                </div>
                <button
                  onClick={() => setShowPalette(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[11px] text-slate-600 mb-4">
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded bg-emerald-500" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded bg-amber-400" />
                  <span>Flagged ({flaggedQuestions.size})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded bg-slate-200" />
                  <span>Unanswered ({total - answeredCount})</span>
                </div>
              </div>

              {/* Grid 1 to 50 */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-h-[300px] overflow-y-auto p-1">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isQAnswered = selectedAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions.has(q.id);

                  let bg = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                  if (isFlagged) {
                    bg = 'bg-amber-100 text-amber-900 border border-amber-300 font-bold';
                  } else if (isQAnswered) {
                    bg = 'bg-emerald-500 text-white font-semibold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowPalette(false);
                      }}
                      className={`h-9 rounded-lg text-xs flex items-center justify-center relative transition ${bg} ${
                        isCurrent ? 'ring-2 ring-slate-900 ring-offset-1 font-bold' : ''
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {answeredCount} of {total} answered
              </span>
              <button
                onClick={() => {
                  setShowPalette(false);
                  setShowConfirmSubmit(true);
                }}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition"
              >
                Submit Exam Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal to Submit */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Ready to submit your exam?
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              You will receive your score report, category breakdown, and high-yield question review immediately.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-2 mb-6 text-left">
              <div className="flex justify-between">
                <span>Answered:</span>
                <span className="font-bold text-emerald-700 tabular-nums">{answeredCount} / {total}</span>
              </div>
              <div className="flex justify-between">
                <span>Unanswered:</span>
                <span className="font-bold text-slate-700 tabular-nums">{total - answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Flagged for Review:</span>
                <span className="font-bold text-amber-600 tabular-nums">{flaggedQuestions.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Taken:</span>
                <span className="font-bold text-slate-900 tabular-nums">{formatTimer(secondsElapsed)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
              >
                Keep Reviewing
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
              >
                Yes, Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal to Quit */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Quit current assessment?
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Your ongoing progress for this session will not be submitted to the leaderboard.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
              >
                Continue Test
              </button>
              <button
                onClick={onExitQuiz}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition"
              >
                Quit Assessment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
