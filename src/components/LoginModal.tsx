import React, { useState } from 'react';
import { UserCheck, Stethoscope, Sparkles } from 'lucide-react';
import { setStoredUser } from '../utils/storage';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onUserSaved: (name: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentName,
  onUserSaved,
}) => {
  const [name, setName] = useState(currentName || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const cleanName = name.trim();
    setStoredUser(cleanName);
    onUserSaved(cleanName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-md w-full p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
          <Stethoscope className="w-7 h-7" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            CPR Medical Academy Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Special BCS Crystal Batch · Anatomy-01 Assessment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Full Name or Medical Title
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Tanvir Ahmed"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                autoFocus
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              Your score and percentile will be recorded under this name.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            {currentName && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center justify-center space-x-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Continue to Academy</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
