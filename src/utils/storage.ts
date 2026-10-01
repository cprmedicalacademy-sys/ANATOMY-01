import { LeaderboardEntry, QuizAttempt } from '../types';

const USER_KEY = 'cpr_anatomy_user';
const ATTEMPTS_KEY = 'cpr_anatomy_attempts';
const BOOKMARKS_KEY = 'cpr_anatomy_bookmarks';
const SOUND_KEY = 'cpr_anatomy_sound';

const INITIAL_PEER_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'peer-1',
    name: 'Dr. Samira Rahman',
    batch: 'Crystal Batch #01',
    score: 49,
    total: 50,
    percentage: 98,
    time: '24:15',
    date: '2026-09-28 10:30'
  },
  {
    id: 'peer-2',
    name: 'Dr. Kazi Nahid Hasan',
    batch: 'Crystal Batch #01',
    score: 48,
    total: 50,
    percentage: 96,
    time: '26:40',
    date: '2026-09-29 14:12'
  },
  {
    id: 'peer-3',
    name: 'Dr. Farzana Yasmin',
    batch: 'Crystal Batch #01',
    score: 47,
    total: 50,
    percentage: 94,
    time: '29:05',
    date: '2026-09-29 18:45'
  },
  {
    id: 'peer-4',
    name: 'Dr. Tariqul Islam',
    batch: 'Crystal Batch #01',
    score: 45,
    total: 50,
    percentage: 90,
    time: '31:20',
    date: '2026-09-30 09:15'
  },
  {
    id: 'peer-5',
    name: 'Dr. Nusrat Jahan',
    batch: 'Crystal Batch #01',
    score: 44,
    total: 50,
    percentage: 88,
    time: '33:10',
    date: '2026-09-30 16:50'
  },
  {
    id: 'peer-6',
    name: 'Dr. Ashraf Hossain',
    batch: 'Crystal Batch #01',
    score: 42,
    total: 50,
    percentage: 84,
    time: '28:44',
    date: '2026-10-01 02:10'
  }
];

export function getStoredUser(): string {
  return localStorage.getItem(USER_KEY) || '';
}

export function setStoredUser(name: string): void {
  localStorage.setItem(USER_KEY, name.trim());
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_KEY);
}

export function getAttempts(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAttempt(attempt: QuizAttempt): void {
  const attempts = getAttempts();
  attempts.unshift(attempt);
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

export function getLeaderboard(): LeaderboardEntry[] {
  const attempts = getAttempts();
  const currentUser = getStoredUser();

  const userEntries: LeaderboardEntry[] = attempts.map(att => {
    const mins = Math.floor(att.timeElapsedSeconds / 60).toString().padStart(2, '0');
    const secs = (att.timeElapsedSeconds % 60).toString().padStart(2, '0');
    return {
      id: att.id,
      name: att.userName,
      batch: 'Crystal Batch #01',
      score: att.score,
      total: att.totalQuestions,
      percentage: att.percentage,
      time: `${mins}:${secs}`,
      date: att.completedAt,
      isCurrentUser: att.userName.toLowerCase() === currentUser.toLowerCase()
    };
  });

  // Combine user attempts with peer benchmark entries
  const allEntries = [...userEntries, ...INITIAL_PEER_LEADERBOARD];

  // Sort by score desc, then percentage desc, then time
  allEntries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    return a.time.localeCompare(b.time);
  });

  return allEntries;
}

export function clearUserAttempts(): void {
  localStorage.removeItem(ATTEMPTS_KEY);
}

export function getBookmarks(): number[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(questionId: number): boolean {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(questionId);
  let isBookmarked = false;
  if (index >= 0) {
    bookmarks.splice(index, 1);
    isBookmarked = false;
  } else {
    bookmarks.push(questionId);
    isBookmarked = true;
  }
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  return isBookmarked;
}

export function isQuestionBookmarked(questionId: number): boolean {
  return getBookmarks().includes(questionId);
}

export function getSoundEnabled(): boolean {
  const val = localStorage.getItem(SOUND_KEY);
  return val === null ? true : val === 'true';
}

export function setSoundEnabled(enabled: boolean): void {
  localStorage.setItem(SOUND_KEY, String(enabled));
}
