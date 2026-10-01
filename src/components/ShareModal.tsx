import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  Award, 
  Stethoscope, 
  Share2 
} from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: LeaderboardEntry | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  entry,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !entry) return null;

  const shareText = `🎓 CPR Medical Academy — Special BCS Crystal Batch\n` +
    `Anatomy-01 High-Yield Assessment\n` +
    `Candidate: ${entry.name}\n` +
    `Score: ${entry.score}/${entry.total} (${entry.percentage}% Accuracy)\n` +
    `Completion Time: ${entry.time}\n` +
    `Can you beat my score in BCS Anatomy-01?`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Share Assessment Result
          </h2>
          <p className="text-xs text-slate-500">
            Challenge fellow doctors in the CPR Medical Academy Crystal Batch
          </p>
        </div>

        {/* Certificate / Score Card Preview */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white border border-slate-800 mb-5 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold tracking-tight text-white">
                CPR Medical Academy
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
              BCS Crystal Batch
            </span>
          </div>

          <div className="space-y-1 text-center py-2">
            <p className="text-[11px] text-slate-300 font-medium">Candidate Doctor</p>
            <h3 className="text-lg font-bold text-white tracking-tight">{entry.name}</h3>
            <p className="text-xs text-emerald-400 font-medium">Topic: Anatomy-01 Assessment</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 text-center text-xs">
            <div className="bg-white/5 p-2 rounded-lg">
              <span className="text-[10px] text-slate-400 block">Score</span>
              <span className="font-bold text-base text-emerald-400 tabular-nums">
                {entry.score} / {entry.total}
              </span>
            </div>
            <div className="bg-white/5 p-2 rounded-lg">
              <span className="text-[10px] text-slate-400 block">Accuracy</span>
              <span className="font-bold text-base text-white tabular-nums">
                {entry.percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleCopy}
            className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition"
          >
            <Send className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleTelegram}
            className="py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Telegram</span>
          </button>

          <button
            onClick={handleTwitter}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition"
          >
            <span>Twitter / X</span>
          </button>
        </div>

      </div>
    </div>
  );
};
