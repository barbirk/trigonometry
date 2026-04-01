import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, isToday, isYesterday } from 'date-fns';

export interface SM2Item {
  id: string; // e.g. "lesson_1_vocab"
  repetition: number;
  interval: number;
  easeFactor: number;
  nextReviewDate: string; // ISO string
}

interface ProgressState {
  completedLessons: string[];
  completedModules: number[];
  sm2Deck: Record<string, SM2Item>;
  streak: number;
  lastActiveDate: string | null;
  xp: number;

  // Actions
  completeLesson: (lessonId: string, moduleId: number) => void;
  reviewItem: (itemId: string, quality: number) => void; // quality 0-5
  recordActivity: () => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      completedModules: [],
      sm2Deck: {},
      streak: 0,
      lastActiveDate: null,
      xp: 0,

      recordActivity: () => set((state) => {
        const today = new Date().toISOString();
        if (!state.lastActiveDate) {
          return { lastActiveDate: today, streak: 1 };
        }
        
        const lastDate = new Date(state.lastActiveDate);
        if (isYesterday(lastDate)) {
          return { lastActiveDate: today, streak: state.streak + 1 };
        } else if (!isToday(lastDate)) {
          return { lastActiveDate: today, streak: 1 }; // Reset streak
        }
        return {}; // Already active today
      }),

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      completeLesson: (lessonId: string, _moduleId: number) => set((state) => {
        const isNew = !state.completedLessons.includes(lessonId);
        if (!isNew) return state;

        get().recordActivity();

        return {
          completedLessons: [...state.completedLessons, lessonId],
          xp: state.xp + 50,
          // Simplified: we just add to array, checking if module is complete would require full dict
          // For MVP, we just append.
        };
      }),

      reviewItem: (itemId: string, quality: number) => set((state) => {
        get().recordActivity();

        const item = state.sm2Deck[itemId] || {
          id: itemId,
          repetition: 0,
          interval: 1,
          easeFactor: 2.5,
          nextReviewDate: new Date().toISOString()
        };

        // SM-2 Algorithm
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

      resetProgress: () => set({
        completedLessons: [],
        completedModules: [],
        sm2Deck: {},
        streak: 0,
        lastActiveDate: null,
        xp: 0
      })
    }),
    {
      name: 'trigpath-progress',
    }
  )
);
