import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { QuizView } from './components/QuizView';
import { ResultsView } from './components/ResultsView';
import { StudyBankView } from './components/StudyBankView';
import { LeaderboardView } from './components/LeaderboardView';
import { LoginModal } from './components/LoginModal';
import { ShareModal } from './components/ShareModal';
import { QUESTIONS } from './data/questions';
import { QuizAttempt, QuizMode, LeaderboardEntry } from './types';
import { getStoredUser, getAttempts, saveAttempt } from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'quiz' | 'study' | 'leaderboard' | 'results'>('dashboard');
  const [userName, setUserName] = useState<string>('');
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [activeQuizMode, setActiveQuizMode] = useState<QuizMode>('exam');
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareEntry, setShareEntry] = useState<LeaderboardEntry | null>(null);

  // Initialize from storage
  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setUserName(user);
    } else {
      // Prompt user login on first visit
      setIsLoginModalOpen(true);
    }
    setAttempts(getAttempts());
  }, []);

  const handleStartExam = (mode: QuizMode = 'exam') => {
    if (!userName) {
      setIsLoginModalOpen(true);
      return;
    }
    setActiveQuizMode(mode);
    setCurrentTab('quiz');
  };

  const handleFinishQuiz = (attempt: QuizAttempt) => {
    saveAttempt(attempt);
    setAttempts(getAttempts());
    setCurrentAttempt(attempt);
    setCurrentTab('results');
  };

  const handleReviewAttempt = (attempt: QuizAttempt) => {
    setCurrentAttempt(attempt);
    setCurrentTab('results');
  };

  const handleOpenShareModalFromAttempt = () => {
    if (!currentAttempt) return;
    const mins = Math.floor(currentAttempt.timeElapsedSeconds / 60).toString().padStart(2, '0');
    const secs = (currentAttempt.timeElapsedSeconds % 60).toString().padStart(2, '0');

    setShareEntry({
      id: currentAttempt.id,
      name: currentAttempt.userName,
      batch: 'Special BCS Crystal Batch',
      score: currentAttempt.score,
      total: currentAttempt.totalQuestions,
      percentage: currentAttempt.percentage,
      time: `${mins}:${secs}`,
      date: currentAttempt.completedAt,
    });
    setIsShareModalOpen(true);
  };

  const handleShareEntry = (entry: LeaderboardEntry) => {
    setShareEntry(entry);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Header */}
      <Header
        currentTab={currentTab === 'results' ? 'dashboard' : currentTab}
        setCurrentTab={(tab) => setCurrentTab(tab)}
        userName={userName}
        onOpenProfile={() => setIsLoginModalOpen(true)}
        onStartExam={() => handleStartExam('exam')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {currentTab === 'dashboard' && (
          <DashboardView
            userName={userName}
            attempts={attempts}
            onStartExam={handleStartExam}
            onOpenStudy={() => setCurrentTab('study')}
            onOpenLeaderboard={() => setCurrentTab('leaderboard')}
            onReviewAttempt={handleReviewAttempt}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            questions={QUESTIONS}
            mode={activeQuizMode}
            userName={userName}
            onFinishQuiz={handleFinishQuiz}
            onExitQuiz={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'results' && currentAttempt && (
          <ResultsView
            attempt={currentAttempt}
            questions={QUESTIONS}
            onRetake={() => handleStartExam(activeQuizMode)}
            onGoToDashboard={() => setCurrentTab('dashboard')}
            onOpenLeaderboard={() => setCurrentTab('leaderboard')}
            onOpenShareModal={handleOpenShareModalFromAttempt}
          />
        )}

        {currentTab === 'study' && (
          <StudyBankView
            questions={QUESTIONS}
            onStartExam={() => handleStartExam('exam')}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView
            userName={userName}
            onGoToDashboard={() => setCurrentTab('dashboard')}
            onShareEntry={handleShareEntry}
            onStartExam={() => handleStartExam('exam')}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-medium text-slate-600">
            CPR Medical Academy · Special BCS Crystal Batch · Anatomy-01 Assessment
          </p>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>50 High-Yield Questions</span>
            <span aria-hidden="true">·</span>
            <span>Cell Biology, Histology, Embryology & Neuroanatomy</span>
          </div>
        </div>
      </footer>

      {/* Doctor Login / Profile Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentName={userName}
        onUserSaved={(name) => setUserName(name)}
      />

      {/* Share Scorecard Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        entry={shareEntry}
      />

    </div>
  );
}
