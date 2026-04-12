import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Track = 'git' | 'docker' | 'k8s'

export interface Badge {
  id: string
  title: string
  emoji: string
  description: string
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
  'git-seedling':   { id: 'git-seedling',   emoji: '🌱', title: 'Git Seedling',     description: 'Completed your first Git module' },
  'git-branching':  { id: 'git-branching',  emoji: '🌿', title: 'Branching Out',    description: 'Completed all Git modules' },
  'docker-swim':    { id: 'docker-swim',    emoji: '🐳', title: 'First Swim',        description: 'Completed your first Docker module' },
  'docker-harbor':  { id: 'docker-harbor',  emoji: '⚓', title: 'Harbor Master',     description: 'Completed all Docker modules' },
  'k8s-deck':       { id: 'k8s-deck',       emoji: '☸️', title: 'Deck Hand',         description: 'Completed your first K8s module' },
  'k8s-helmsman':   { id: 'k8s-helmsman',   emoji: '🎖️', title: 'The Helmsman',      description: 'Completed all K8s modules' },
  'full-stack':     { id: 'full-stack',     emoji: '🏆', title: 'Full Stack Sailor', description: 'Completed all three tracks' },
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
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...defaultState,

      setUserName: (name) => set({ userName: name }),

      addXP: (amount) => set((s) => ({ xp: s.xp + amount })),

      completeModule: (moduleId) =>
        set((s) => {
          if (s.completedModules.includes(moduleId)) return s
          const updated = [...s.completedModules, moduleId]
          return { completedModules: updated, xp: s.xp + 50 }
        }),

      saveQuizScore: (moduleId, score) =>
        set((s) => ({
          quizScores: { ...s.quizScores, [moduleId]: score },
          xp: s.xp + score * 10,
        })),

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
