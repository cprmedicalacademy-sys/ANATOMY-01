import React from 'react';
import { Stethoscope, Volume2, VolumeX, User, LogOut, Award, BookOpen, LayoutDashboard, PlayCircle } from 'lucide-react';
import { getSoundEnabled, setSoundEnabled } from '../utils/storage';

interface HeaderProps {
  currentTab: 'dashboard' | 'quiz' | 'study' | 'leaderboard';
  setCurrentTab: (tab: 'dashboard' | 'quiz' | 'study' | 'leaderboard') => void;
  userName: string;
  onOpenProfile: () => void;
  onStartExam: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  userName,
  onOpenProfile,
  onStartExam,
}) => {
  const [sound, setSound] = React.useState(getSoundEnabled());

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    setSoundEnabled(next);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Wordmark / Brand title */}
        <div 
          onClick={() => setCurrentTab('dashboard')} 
          className="flex items-center space-x-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:bg-emerald-500 transition-colors">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                CPR Medical Academy
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium tracking-wide">
              Special BCS Crystal Batch · Anatomy-01
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
              currentTab === 'dashboard'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={onStartExam}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
              currentTab === 'quiz'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            <span>BCS Exam</span>
          </button>

          <button
            onClick={() => setCurrentTab('study')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
              currentTab === 'study'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Study Bank</span>
          </button>

          <button
            onClick={() => setCurrentTab('leaderboard')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
              currentTab === 'leaderboard'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Leaderboard</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Profile */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={toggleSound}
            aria-label={sound ? "Mute audio" : "Enable audio"}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs"
            title={sound ? "Audio on (click to mute)" : "Audio muted (click to unmute)"}
          >
            {sound ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {userName ? (
            <div className="flex items-center space-x-2 bg-slate-800/90 pl-2.5 pr-2 py-1 rounded-lg border border-slate-700/60">
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-medium text-slate-200 truncate max-w-[110px] sm:max-w-[150px]">
                {userName.startsWith('Dr.') ? userName : `Dr. ${userName}`}
              </span>
              <button
                onClick={onOpenProfile}
                title="Switch Doctor Profile"
                className="text-slate-400 hover:text-emerald-400 p-1 rounded transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenProfile}
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>Doctor Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
