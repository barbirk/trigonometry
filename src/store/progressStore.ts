import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, isToday, isYesterday } from 'date-fns';

export interface SM2Item {
  id: string;
  repetition: number;
  interval: number;
  easeFactor: number;
  nextReviewDate: string;
}

export interface ConceptMastery {
  conceptId: string;
  label: string;
  attemptsTotal: number;
  attemptsCorrect: number;
  lastAttempted: string;
  confidenceLevel: 'new' | 'learning' | 'reviewing' | 'mastered';
}

export interface ProblemAttempt {
  problemId: string;
  completedAt: string;
  hintsUsed: number;
  stepsAttempted: number;
  correct: boolean;
  timeSpentSeconds: number;
}

export interface Badge {
  id: string;
  unlockedAt: string;
}

interface ProgressState {
  // User Progress
  completedLessons: string[];
  completedModules: number[];
  sm2Deck: Record<string, SM2Item>;
  streak: number;
  lastActiveDate: string | null;
  xp: number;
  totalTimeMinutes: number;
  
  // Enhanced tracking
  conceptMastery: Record<string, ConceptMastery>;
  problemAttempts: ProblemAttempt[];
  badges: Badge[];
  quizScores: Record<number, number>; // moduleId -> score
  teachBackScores: Record<number, number>; // moduleId -> score
  
  // Session tracking
  sessionStartTime: number | null;

  // Actions
  completeLesson: (lessonId: string, moduleId: number) => void;
  completeModule: (moduleId: number, quizScore: number, teachBackScore: number) => void;
  updateCardReview: (itemId: string, quality: number) => void;
  recordActivity: () => void;
  startSession: () => void;
  endSession: () => void;
  recordProblemAttempt: (attempt: Omit<ProblemAttempt, 'completedAt'>) => void;
  updateConceptMastery: (conceptId: string, correct: boolean) => void;
  checkAndUnlockBadges: () => string[];
  getDueCardsCount: () => number;
  resetProgress: () => void;
}

// Badge definitions
export const BADGES = [
  { id: 'first-triangle', name: 'First Triangle', description: 'Complete the triangle explorer for the first time' },
  { id: '345-pro', name: '3-4-5 Pro', description: 'Correctly identify all three sides of a 3-4-5 triangle 5 times' },
  { id: 'diagram-master', name: 'Diagram Master', description: 'Label 25 diagrams correctly without any errors' },
  { id: 'soh-cah-toa', name: 'SOH-CAH-TOA', description: 'Score 100% on the Module 2 quiz' },
  { id: 'error-hunter', name: 'Error Hunter', description: 'Complete all Error Analysis exercises' },
  { id: 'degree-mode', name: 'Degree Mode', description: 'Trigger and correctly resolve the calculator guard' },
  { id: 'week-streak', name: 'Week Streak', description: 'Study 7 days in a row' },
  { id: 'teach-back-pro', name: 'Teach-Back Pro', description: 'Score 3/3 on any Teach-Back prompt' },
  { id: 'problem-solver', name: 'Problem Solver', description: 'Complete 50 practice problems' },
  { id: 'real-world-ready', name: 'Real World Ready', description: 'Complete all Real-World Scenarios' },
  { id: 'law-abider', name: 'Law Abider', description: 'Complete Module 5 (Law of Sines & Cosines)' },
  { id: 'trig-master', name: 'Trig Master', description: 'Complete all 6 modules with ≥ 80% quiz average' },
];

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      completedModules: [],
      sm2Deck: {},
      streak: 0,
      lastActiveDate: null,
      xp: 0,
      totalTimeMinutes: 0,
      conceptMastery: {},
      problemAttempts: [],
      badges: [],
      quizScores: {},
      teachBackScores: {},
      sessionStartTime: null,

      startSession: () => set({ sessionStartTime: Date.now() }),
      
      endSession: () => set((state) => {
        if (!state.sessionStartTime) return {};
        const sessionMinutes = Math.floor((Date.now() - state.sessionStartTime) / 60000);
        return {
          totalTimeMinutes: state.totalTimeMinutes + sessionMinutes,
          sessionStartTime: null
        };
      }),

      recordActivity: () => set((state) => {
        const today = new Date().toISOString();
        if (!state.lastActiveDate) {
          return { lastActiveDate: today, streak: 1 };
        }
        
        const lastDate = new Date(state.lastActiveDate);
        if (isYesterday(lastDate)) {
          return { lastActiveDate: today, streak: state.streak + 1 };
        } else if (!isToday(lastDate)) {
          return { lastActiveDate: today, streak: 1 };
        }
        return {};
      }),

      completeLesson: (lessonId: string, moduleId: number) => set((state) => {
        console.log('[completeLesson] Called with:', { lessonId, moduleId, currentLessons: state.completedLessons });
        const isNew = !state.completedLessons.includes(lessonId);
        if (!isNew) {
          console.log('[completeLesson] Lesson already completed, skipping');
          return state;
        }

        get().recordActivity();

        // Check if module is now complete (simplified: 3 lessons per module)
        const moduleLessons = state.completedLessons.filter(l => l.startsWith(`${moduleId}-`));
        const isModuleComplete = moduleLessons.length >= 2; // 2 lessons before + this one

        return {
          completedLessons: [...state.completedLessons, lessonId],
          xp: state.xp + 50,
          completedModules: isModuleComplete && !state.completedModules.includes(moduleId)
            ? [...state.completedModules, moduleId]
            : state.completedModules
        };
      }),

      completeModule: (moduleId: number, quizScore: number, teachBackScore: number) => set((state) => {
        get().recordActivity();
        
        const newCompletedModules = state.completedModules.includes(moduleId)
          ? state.completedModules
          : [...state.completedModules, moduleId];
        
        // Check for badges
        const newBadges: Badge[] = [];
        
        // Week streak badge
        if (state.streak >= 7 && !state.badges.find(b => b.id === 'week-streak')) {
          newBadges.push({ id: 'week-streak', unlockedAt: new Date().toISOString() });
        }
        
        // Teach-back pro badge
        if (teachBackScore === 3 && !state.badges.find(b => b.id === 'teach-back-pro')) {
          newBadges.push({ id: 'teach-back-pro', unlockedAt: new Date().toISOString() });
        }
        
        // Law Abider badge
        if (moduleId === 5 && !state.badges.find(b => b.id === 'law-abider')) {
          newBadges.push({ id: 'law-abider', unlockedAt: new Date().toISOString() });
        }
        
        // Trig Master badge
        if (newCompletedModules.length === 6) {
          const avgScore = Object.values({ ...state.quizScores, [moduleId]: quizScore }).reduce((a, b) => a + b, 0) / 6;
          if (avgScore >= 80 && !state.badges.find(b => b.id === 'trig-master')) {
            newBadges.push({ id: 'trig-master', unlockedAt: new Date().toISOString() });
          }
        }

        return {
          completedModules: newCompletedModules,
          quizScores: { ...state.quizScores, [moduleId]: quizScore },
          teachBackScores: { ...state.teachBackScores, [moduleId]: teachBackScore },
          xp: state.xp + 100 + quizScore,
          badges: [...state.badges, ...newBadges]
        };
      }),

      updateCardReview: (itemId: string, quality: number) => set((state) => {
        get().recordActivity();

        const item = state.sm2Deck[itemId] || {
          id: itemId,
          repetition: 0,
          interval: 1,
          easeFactor: 2.5,
          nextReviewDate: new Date().toISOString()
        };

        let { repetition, interval, easeFactor } = item;
        
        if (quality >= 3) {
          if (repetition === 0) {
            interval = 1;
          } else if (repetition === 1) {
            interval = 6;
          } else {
            interval = Math.round(interval * easeFactor);
          }
          repetition += 1;
        } else {
          repetition = 0;
          interval = 1;
        }

        easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (easeFactor < 1.3) easeFactor = 1.3;

        const nextDate = addDays(new Date(), interval).toISOString();

        return {
          sm2Deck: {
            ...state.sm2Deck,
            [itemId]: { id: itemId, repetition, interval, easeFactor, nextReviewDate: nextDate }
          },
          xp: state.xp + (quality * 5)
        };
      }),

      recordProblemAttempt: (attempt) => set((state) => {
        const fullAttempt: ProblemAttempt = {
          ...attempt,
          completedAt: new Date().toISOString()
        };
        
        // Check for Problem Solver badge
        const newBadges: Badge[] = [];
        const totalProblems = state.problemAttempts.length + 1;
        if (totalProblems >= 50 && !state.badges.find(b => b.id === 'problem-solver')) {
          newBadges.push({ id: 'problem-solver', unlockedAt: new Date().toISOString() });
        }
        
        return {
          problemAttempts: [...state.problemAttempts, fullAttempt],
          xp: state.xp + (attempt.correct ? 20 : 5),
          badges: [...state.badges, ...newBadges]
        };
      }),

      updateConceptMastery: (conceptId: string, correct: boolean) => set((state) => {
        const existing = state.conceptMastery[conceptId] || {
          conceptId,
          label: conceptId,
          attemptsTotal: 0,
          attemptsCorrect: 0,
          lastAttempted: new Date().toISOString(),
          confidenceLevel: 'new' as const
        };

        const newTotal = existing.attemptsTotal + 1;
        const newCorrect = existing.attemptsCorrect + (correct ? 1 : 0);
        const accuracy = newCorrect / newTotal;

        let confidenceLevel: 'new' | 'learning' | 'reviewing' | 'mastered' = 'new';
        if (newTotal >= 10 && accuracy >= 0.9) {
          confidenceLevel = 'mastered';
        } else if (newTotal >= 5 && accuracy >= 0.7) {
          confidenceLevel = 'reviewing';
        } else if (newTotal >= 2) {
          confidenceLevel = 'learning';
        }

        return {
          conceptMastery: {
            ...state.conceptMastery,
            [conceptId]: {
              ...existing,
              attemptsTotal: newTotal,
              attemptsCorrect: newCorrect,
              lastAttempted: new Date().toISOString(),
              confidenceLevel
            }
          }
        };
      }),

      checkAndUnlockBadges: () => {
        const state = get();
        const newBadgeIds: string[] = [];
        
        // Diagram Master badge
        const diagramAttempts = state.problemAttempts.filter(p => p.problemId.startsWith('label_'));
        const correctDiagrams = diagramAttempts.filter(p => p.correct && p.hintsUsed === 0).length;
        if (correctDiagrams >= 25 && !state.badges.find(b => b.id === 'diagram-master')) {
          newBadgeIds.push('diagram-master');
        }

        if (newBadgeIds.length > 0) {
          set((state) => ({
            badges: [
              ...state.badges,
              ...newBadgeIds.map(id => ({ id, unlockedAt: new Date().toISOString() }))
            ]
          }));
        }

        return newBadgeIds;
      },

      getDueCardsCount: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        return Object.values(state.sm2Deck).filter(
          card => !card.nextReviewDate || card.nextReviewDate <= today
        ).length;
      },

      resetProgress: () => set({
        completedLessons: [],
        completedModules: [],
        sm2Deck: {},
        streak: 0,
        lastActiveDate: null,
        xp: 0,
        totalTimeMinutes: 0,
        conceptMastery: {},
        problemAttempts: [],
        badges: [],
        quizScores: {},
        teachBackScores: {},
        sessionStartTime: null
      })
    }),
    {
      name: 'trigpath-progress',
    }
  )
);
