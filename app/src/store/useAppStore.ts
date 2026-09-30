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
  completedLabs: string[]      // e.g. ['git-6:workflow', ...]
  completedQuizzes: string[]   // e.g. ['git-1', 'docker-2', ...]
  completedMissions: string[]  // e.g. ['docker-8', ...]
  quizScores: Record<string, number>  // moduleId -> score
  badges: Badge[]
  streakDays: number
  lastActiveDate: string
  activityLog: Record<string, number> // YYYY-MM-DD -> XP gained
}

interface AppStore extends UserProgress {
  setUserName: (name: string) => void
  addXP: (amount: number) => void
  completeModule: (moduleId: string, rewardXp?: number) => void
  saveQuizScore: (moduleId: string, score: number, totalQuestions: number) => number
  completeLab: (labId: string, rewardXp?: number) => boolean
  claimMission: (moduleId: string, amount: number) => boolean
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
  completedLabs: [],
  completedQuizzes: [],
  completedMissions: [],
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

      completeModule: (moduleId, rewardXp) =>
        set((s) => {
          const completed = s.completedModules || []
          if (completed.includes(moduleId)) return s
          const today = new Date().toISOString().split('T')[0]
          const currentActivity = s.activityLog[today] || 0
          const earned = rewardXp && rewardXp > 0 ? rewardXp : 100
          const updated = [...completed, moduleId]
          return { 
            completedModules: updated, 
            xp: s.xp + earned,
            activityLog: { ...s.activityLog, [today]: currentActivity + earned }
          }
        }),

      saveQuizScore: (moduleId, score, totalQuestions) => {
        const state = get()
        const completed = state.completedQuizzes || []
        const isFirstTime = !completed.includes(moduleId)
        
        const today = new Date().toISOString().split('T')[0]
        const currentActivity = state.activityLog[today] || 0

        if (!isFirstTime) {
          // If retaking, only update quiz score record if better, but do NOT award XP again
          const prevScore = state.quizScores[moduleId] || 0
          set({
            quizScores: { ...state.quizScores, [moduleId]: Math.max(prevScore, score) }
          })
          return 0
        }

        // First time completing quiz: calculate XP
        const scorePct = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
        const bonus = scorePct === 100 ? 100 : 0
        const earned = score * 10 + bonus

        set({
          completedQuizzes: [...completed, moduleId],
          quizScores: { ...state.quizScores, [moduleId]: score },
          xp: state.xp + earned,
          activityLog: { ...state.activityLog, [today]: currentActivity + earned }
        })

        return earned
      },

      completeLab: (labId, rewardXp = 25) => {
        const state = get()
        const completed = state.completedLabs || []
        if (completed.includes(labId)) return false

        const today = new Date().toISOString().split('T')[0]
        const currentActivity = state.activityLog[today] || 0

        set({
          completedLabs: [...completed, labId],
          xp: state.xp + rewardXp,
          activityLog: { ...state.activityLog, [today]: currentActivity + rewardXp }
        })

        return true
      },

      claimMission: (moduleId, amount) => {
        const state = get()
        const completed = state.completedMissions || []
        if (completed.includes(moduleId)) return false

        const today = new Date().toISOString().split('T')[0]
        const currentActivity = state.activityLog[today] || 0

        set({
          completedMissions: [...completed, moduleId],
          xp: state.xp + amount,
          activityLog: { ...state.activityLog, [today]: currentActivity + amount }
        })

        return true
      },

      awardBadge: (badge) =>
        set((s) => {
          if (s.badges.find((b) => b.id === badge.id)) return s
          return { badges: [...s.badges, { ...badge, earnedAt: new Date().toISOString() }] }
        }),

      resetProgress: () => set(defaultState),

      totalXP: () => get().xp,

      trackXP: (track) => {
        const s = get()
        return (s.completedModules || [])
          .filter((id) => id.startsWith(track))
          .length * 100
      },
    }),
    { name: 'learning-platform-v1' }
  )
)
