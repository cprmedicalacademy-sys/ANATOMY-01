import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Trash2, 
  Share2, 
  ArrowLeft, 
  Trophy, 
  Medal, 
  RotateCcw,
  Play,
  Users
} from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard, resetLeaderboard, restoreSampleLeaderboard } from '../utils/storage';

interface LeaderboardViewProps {
  userName: string;
  onGoToDashboard: () => void;
  onShareEntry: (entry: LeaderboardEntry) => void;
  onStartExam?: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  userName,
  onGoToDashboard,
  onShareEntry,
  onStartExam,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => getLeaderboard());
  const [search, setSearch] = useState('');
  const [filterMine, setFilterMine] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClear = () => {
    resetLeaderboard();
    setEntries(getLeaderboard());
    setShowClearConfirm(false);
  };

  const handleRestoreSample = () => {
    restoreSampleLeaderboard();
    setEntries(getLeaderboard());
  };

  const filteredEntries = entries.filter(e => {
    if (filterMine && !e.isCurrentUser && e.name.toLowerCase() !== userName.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      return e.name.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  const top3 = entries.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto w-full pb-16 space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-1">
            <span>CPR Medical Academy</span>
            <span aria-hidden="true">·</span>
            <span>Special BCS Crystal Batch</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Anatomy-01 Official Batch Leaderboard</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Top performing doctors ranked by highest accuracy and completion efficiency.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onGoToDashboard}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="px-3 py-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5"
            title="Reset Leaderboard"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset Leaderboard</span>
          </button>
        </div>
      </div>

      {/* Top 3 Podium (Only when entries exist) */}
      {top3.length >= 3 && !filterMine && !search && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
          {/* #2 Rank */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col items-center text-center mt-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-sm mb-2 shadow-xs border border-slate-200">
              #2
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-full">
              {top3[1].name}
            </p>
            <p className="text-xs text-slate-500">{top3[1].score}/50 ({top3[1].percentage}%)</p>
            <span className="mt-2 text-[10px] text-slate-400 font-mono tabular-nums">{top3[1].time}</span>
          </div>

          {/* #1 Rank (Elevated) */}
          <div className="bg-gradient-to-b from-amber-50 to-white rounded-2xl border border-amber-200 shadow-sm p-4 sm:p-5 flex flex-col items-center text-center -mt-2">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-white font-bold flex items-center justify-center text-base mb-2 shadow-sm">
              <Medal className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-0.5">Top Candidate</span>
            <p className="text-xs sm:text-base font-bold text-slate-900 truncate max-w-full">
              {top3[0].name}
            </p>
            <p className="text-xs sm:text-sm font-bold text-amber-600 tabular-nums">
              {top3[0].score}/50 ({top3[0].percentage}%)
            </p>
            <span className="mt-1 text-[11px] text-slate-400 font-mono tabular-nums">{top3[0].time}</span>
          </div>

          {/* #3 Rank */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col items-center text-center mt-6">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-sm mb-2 shadow-xs border border-amber-100">
              #3
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-full">
              {top3[2].name}
            </p>
            <p className="text-xs text-slate-500">{top3[2].score}/50 ({top3[2].percentage}%)</p>
            <span className="mt-2 text-[10px] text-slate-400 font-mono tabular-nums">{top3[2].time}</span>
          </div>
        </div>
      )}

      {/* Controls & Search */}
      {entries.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate doctor..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-center">
            <button
              onClick={() => setFilterMine(!filterMine)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                filterMine
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              My Attempts Only
            </button>
          </div>
        </div>
      )}

      {/* Table Container / Empty State */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredEntries.length === 0 ? (
          <div className="py-16 px-6 text-center">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-4">
              <Trophy className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Leaderboard is Currently Reset & Empty
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              All previous leaderboard records have been cleared. Complete the 50-question Anatomy-01 assessment to record the first official rank!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {onStartExam && (
                <button
                  onClick={onStartExam}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start 50-Question Exam</span>
                </button>
              )}

              <button
                onClick={handleRestoreSample}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Load Sample Peer Batch</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Rank</th>
                  <th className="py-3.5 px-4 sm:px-6">Candidate Doctor</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Score</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Accuracy</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Duration</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Date</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredEntries.map((entry, index) => {
                  const isUser = entry.isCurrentUser || entry.name.toLowerCase() === userName.toLowerCase();

                  return (
                    <tr
                      key={entry.id || index}
                      className={`transition-colors ${
                        isUser
                          ? 'bg-emerald-50/60 font-semibold'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3.5 px-4 sm:px-6 tabular-nums font-bold text-slate-700">
                        #{index + 1}
                      </td>

                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-900 font-semibold">
                            {entry.name}
                          </span>
                          {isUser && (
                            <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">
                              You
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {entry.batch}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 sm:px-6 text-center font-bold text-emerald-700 tabular-nums">
                        {entry.score} / {entry.total}
                      </td>

                      <td className="py-3.5 px-4 sm:px-6 text-center font-semibold text-slate-800 tabular-nums">
                        {entry.percentage}%
                      </td>

                      <td className="py-3.5 px-4 sm:px-6 text-center text-slate-500 font-mono tabular-nums">
                        {entry.time}
                      </td>

                      <td className="py-3.5 px-4 sm:px-6 text-right text-slate-400 tabular-nums">
                        {entry.date}
                      </td>

                      <td className="py-3.5 px-4 sm:px-6 text-center">
                        <button
                          onClick={() => onShareEntry(entry)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          title="Share Scorecard"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Reset Entire Leaderboard?
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              This will clear all entries from the leaderboard, leaving a clean fresh board for the batch.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
