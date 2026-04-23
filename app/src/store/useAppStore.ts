import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LocalizedString } from '../data/types'

export type Track = 'git' | 'docker' | 'k8s'

export interface Badge {
  id: string
  title: LocalizedString
  emoji: string
  description: LocalizedString
  earnedAt?: string
}

export interface UserProgress {
  userName: string
  xp: number
  completedModules: string[]   // e.g. ['git-1', 'git-2', ...]
  quizScores: Record<string, number>  // moduleId -> score
  badges: Badge[]
  streakDays: number
  lastActiveDate: string
  activityLog: Record<string, number> // YYYY-MM-DD -> XP gained
}

interface AppStore extends UserProgress {
  setUserName: (name: string) => void
  addXP: (amount: number) => void
  completeModule: (moduleId: string) => void
  saveQuizScore: (moduleId: string, score: number) => void
  awardBadge: (badge: Badge) => void
  resetProgress: () => void
  totalXP: () => number
  trackXP: (track: Track) => number
}

const BADGES: Record<string, Badge> = {
  'git-seedling': { 
    id: 'git-seedling', 
    emoji: '🌱', 
    title: { en: 'Git Seedling', it: 'Germoglio Git' }, 
    description: { en: 'Completed your first Git module', it: 'Completato il primo modulo Git' } 
  },
  'git-branching': { 
    id: 'git-branching', 
    emoji: '🌿', 
    title: { en: 'Branch Master', it: 'Maestro dei Branch' }, 
    description: { en: 'Mastered branching and merging logic', it: 'Padroneggiata la logica di branching e merging' } 
  },
  'git-workflow': { 
    id: 'git-workflow', 
    emoji: '🏗️', 
    title: { en: 'The Architect', it: 'L\'Architetto' }, 
    description: { en: 'Mastered professional Git workflows', it: 'Padroneggiati i workflow Git professionali' } 
  },
  'git-destructive': { 
    id: 'git-destructive', 
    emoji: '🛡️', 
    title: { en: 'Safety First', it: 'Sicurezza Prima di Tutto' }, 
    description: { en: 'Mastered Reset and Revert safety', it: 'Padroneggiata la sicurezza con Reset e Revert' } 
  },
  'git-pro': { 
    id: 'git-pro', 
    emoji: '🏆', 
    title: { en: 'Git Pro', it: 'Esperto Git' }, 
    description: { en: 'Completed the entire Git track', it: 'Completata l\'intera track Git' } 
  },
  'docker-swim': { 
    id: 'docker-swim', 
    emoji: '🐳', 
    title: { en: 'First Swim', it: 'Prima Nuotata' }, 
    description: { en: 'Completed your first Docker module', it: 'Completato il primo modulo Docker' } 
  },
  'docker-harbor': { 
    id: 'docker-harbor', 
    emoji: '⚓', 
    title: { en: 'Harbor Master', it: 'Mastro del Porto' }, 
    description: { en: 'Completed all Docker modules', it: 'Completati tutti i moduli Docker' } 
  },
  'k8s-deck': { 
    id: 'k8s-deck', 
    emoji: '☸️', 
    title: { en: 'Deck Hand', it: 'Mozzo' }, 
    description: { en: 'Completed your first K8s module', it: 'Completato il primo modulo K8s' } 
  },
  'k8s-helmsman': { 
    id: 'k8s-helmsman', 
    emoji: '🎖️', 
    title: { en: 'The Helmsman', it: 'Il Timoniere' }, 
    description: { en: 'Completed all K8s modules', it: 'Completati tutti i moduli K8s' } 
  },
  'full-stack': { 
    id: 'full-stack', 
    emoji: '🥇', 
    title: { en: 'Full Stack Sailor', it: 'Marinaio Full Stack' }, 
    description: { en: 'Completed all three tracks', it: 'Completate tutte e tre le track' } 
  },
}

export { BADGES }

const defaultState: UserProgress = {
  userName: '',
  xp: 0,
  completedModules: [],
  quizScores: {},
  badges: [],
  streakDays: 0,
  lastActiveDate: '',
  activityLog: {},
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...defaultState,

      setUserName: (name) => set({ userName: name }),

      addXP: (amount) => set((s) => {
        const today = new Date().toISOString().split('T')[0]
        const currentActivity = s.activityLog[today] || 0
        return { 
          xp: s.xp + amount,
          activityLog: { ...s.activityLog, [today]: currentActivity + amount }
        }
      }),

      completeModule: (moduleId) =>
        set((s) => {
          if (s.completedModules.includes(moduleId)) return s
          const today = new Date().toISOString().split('T')[0]
          const currentActivity = s.activityLog[today] || 0
          const updated = [...s.completedModules, moduleId]
          return { 
            completedModules: updated, 
            xp: s.xp + 50,
            activityLog: { ...s.activityLog, [today]: currentActivity + 50 }
          }
        }),

      saveQuizScore: (moduleId, score) =>
        set((s) => {
          const today = new Date().toISOString().split('T')[0]
          const currentActivity = s.activityLog[today] || 0
          const reward = score * 10
          return {
            quizScores: { ...s.quizScores, [moduleId]: score },
            xp: s.xp + reward,
            activityLog: { ...s.activityLog, [today]: currentActivity + reward }
          }
        }),

      awardBadge: (badge) =>
        set((s) => {
          if (s.badges.find((b) => b.id === badge.id)) return s
          return { badges: [...s.badges, { ...badge, earnedAt: new Date().toISOString() }] }
        }),

      resetProgress: () => set(defaultState),

      totalXP: () => get().xp,

      trackXP: (track) => {
        const s = get()
        return s.completedModules
          .filter((id) => id.startsWith(track))
          .length * 50
      },
    }),
    { name: 'learning-platform-v1' }
  )
)
