import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bookmark, 
  Sparkles, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  BookOpen,
  Filter
} from 'lucide-react';
import { Question, QuestionCategory } from '../types';
import { toggleBookmark, getBookmarks } from '../utils/storage';

interface StudyBankViewProps {
  questions: Question[];
  onStartExam: () => void;
}

export const StudyBankView: React.FC<StudyBankViewProps> = ({
  questions,
  onStartExam,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [bookmarkedSet, setBookmarkedSet] = useState<Set<number>>(() => new Set(getBookmarks()));
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const categories: (string | QuestionCategory)[] = [
    'All',
    'Cell Biology',
    'General Histology',
    'Embryology & Development',
    'Neuroanatomy',
  ];

  const handleToggleBookmark = (id: number) => {
    const isNow = toggleBookmark(id);
    setBookmarkedSet(prev => {
      const next = new Set(prev);
      if (isNow) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleExpandAll = () => {
    if (expandedIds.size === filteredQuestions.length) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(filteredQuestions.map(q => q.id)));
    }
  };

  const handleCopyQuestion = (q: Question) => {
    const text = `Q${q.id}: ${q.question}\n\nOptions:\n` +
      q.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n') +
      `\n\nCorrect Answer: ${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}` +
      `\n\nClinical Explanation: ${q.explanation}` +
      (q.highYieldPearl ? `\n\nBCS Pearl: ${q.highYieldPearl}` : '');

    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      if (selectedCategory !== 'All' && q.category !== selectedCategory) {
        return false;
      }
      if (onlyBookmarked && !bookmarkedSet.has(q.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inOptions = q.options.some(opt => opt.toLowerCase().includes(query));
        const inExpl = q.explanation.toLowerCase().includes(query);
        const inPearl = q.highYieldPearl?.toLowerCase().includes(query);
        return inQuestion || inOptions || inExpl || inPearl;
      }
      return true;
    });
  }, [questions, selectedCategory, onlyBookmarked, bookmarkedSet, searchQuery]);

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
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Anatomy-01 Question Bank & Notes</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete collection of 50 verified questions with official answers and clinical rationales.
          </p>
        </div>

        <button
          onClick={onStartExam}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center space-x-2 shrink-0"
        >
          <span>Test Yourself (50 Qs)</span>
        </button>
      </div>

      {/* Controls: Search, Category Tabs, Filter */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 space-y-4">
        
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, options, organ names, anatomical structures..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl">
          {categories.map(cat => {
            const count = cat === 'All' 
              ? questions.length 
              : questions.filter(q => q.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{cat}</span>
                <span className="ml-1.5 text-[10px] text-slate-400 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Sub-bar: Bookmarked toggle & Expand all */}
        <div className="flex items-center justify-between text-xs pt-1">
          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`px-3 py-1.5 rounded-lg border transition flex items-center space-x-1.5 ${
              onlyBookmarked
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                : 'text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-emerald-600' : ''}`} />
            <span>Bookmarked Only ({bookmarkedSet.size})</span>
          </button>

          <button
            onClick={handleExpandAll}
            className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            {expandedIds.size === filteredQuestions.length && filteredQuestions.length > 0
              ? 'Collapse All Answers'
              : 'Expand All Answers'}
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-12 text-center">
            <Filter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No questions match your filter.</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search or switching categories.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedIds.has(q.id);
            const isBookmarked = bookmarkedSet.has(q.id);

            return (
              <div 
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 transition-all"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 tabular-nums">
                      Q{q.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {q.category}
                    </span>
                    {q.difficulty && (
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        · {q.difficulty}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleCopyQuestion(q)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                      title="Copy Question & Notes"
                    >
                      {copiedId === q.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => handleToggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg transition ${
                        isBookmarked 
                          ? 'text-emerald-600 bg-emerald-50' 
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark question'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-600' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Question Stem */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4 leading-snug">
                  {q.question}
                </h3>

                {/* Options list */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = isExpanded && optIdx === q.answer;
                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                            : 'bg-slate-50/70 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isCorrect && (
                          <div className="flex items-center space-x-1 text-emerald-700 font-semibold text-xs">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Correct Answer</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Toggle Answer & Rationale */}
                <div className="pt-2 flex flex-col space-y-3">
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="self-start text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
                  >
                    <span>{isExpanded ? 'Hide Explanation' : 'Show Answer & Clinical Rationale'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 space-y-2.5">
                      <div>
                        <span className="font-bold text-slate-900">Clinical Explanation: </span>
                        <span className="leading-relaxed">{q.explanation}</span>
                      </div>
                      {q.highYieldPearl && (
                        <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-100 text-emerald-900 text-xs flex items-start space-x-2">
                          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>High-Yield BCS Pearl:</strong> {q.highYieldPearl}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
