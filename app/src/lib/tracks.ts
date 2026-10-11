import type { LucideIcon } from 'lucide-react'
import { GitBranch, Container, Ship } from 'lucide-react'
import { GIT_MODULES } from '../data/git/modules/index'
import { DOCKER_MODULES } from '../data/docker/modules/index'
import { K8S_MODULES } from '../data/k8s/modules/index'
import type { LocalizedString, Module } from '../data/types'

export type TrackId = 'git' | 'docker' | 'k8s'

export interface TrackMeta {
  id: TrackId
  name: string
  tagline: LocalizedString
  description: LocalizedString
  /** CSS variable reference, e.g. var(--t-git) */
  color: string
  icon: LucideIcon
  modules: Module[]
  cheatsheetLabel: LocalizedString
}

export const TRACKS: Record<TrackId, TrackMeta> = {
  git: {
    id: 'git',
    name: 'Git',
    tagline: { en: 'Version control, from first commit to team workflows', it: 'Version control, dal primo commit ai workflow di team' },
    description: { en: 'Snapshots, branches, merges and the collaboration rituals every engineer uses daily.', it: 'Snapshot, branch, merge e i rituali di collaborazione che ogni ingegnere usa ogni giorno.' },
    color: 'var(--t-git)',
    icon: GitBranch,
    modules: GIT_MODULES,
    cheatsheetLabel: { en: 'Git cheat sheet', it: 'Cheat sheet Git' },
  },
  docker: {
    id: 'docker',
    name: 'Docker',
    tagline: { en: 'Package anything into a container that runs anywhere', it: 'Impacchetta qualsiasi cosa in un container che gira ovunque' },
    description: { en: 'Images, Dockerfiles, volumes, networks and Compose, with a live engine simulator.', it: 'Immagini, Dockerfile, volumi, reti e Compose, con un simulatore del motore in tempo reale.' },
    color: 'var(--t-docker)',
    icon: Container,
    modules: DOCKER_MODULES,
    cheatsheetLabel: { en: 'Docker cheat sheet', it: 'Cheat sheet Docker' },
  },
  k8s: {
    id: 'k8s',
    name: 'Kubernetes',
    tagline: { en: 'Orchestrate thousands of containers with confidence', it: 'Orchestra migliaia di container con sicurezza' },
    description: { en: 'Cluster architecture, Deployments, Services, config, storage and Helm on a simulated cluster.', it: 'Architettura del cluster, Deployment, Service, configurazione, storage e Helm su un cluster simulato.' },
    color: 'var(--t-k8s)',
    icon: Ship,
    modules: K8S_MODULES,
    cheatsheetLabel: { en: 'kubectl cheat sheet', it: 'Cheat sheet kubectl' },
  },
}

export const TRACK_LIST: TrackMeta[] = [TRACKS.git, TRACKS.docker, TRACKS.k8s]

export function isTrackId(v: string | undefined): v is TrackId {
  return v === 'git' || v === 'docker' || v === 'k8s'
}

export function getTrack(id: string | undefined): TrackMeta | undefined {
  return isTrackId(id) ? TRACKS[id] : undefined
}

export const ALL_MODULES: Module[] = [...GIT_MODULES, ...DOCKER_MODULES, ...K8S_MODULES]

export function findModule(id: string | undefined): Module | undefined {
  return ALL_MODULES.find((m) => m.id === id)
}

export interface TrackProgress {
  done: number
  total: number
  pct: number
  next?: Module
  xpEarned: number
  xpTotal: number
}

export function trackProgress(track: TrackMeta, completedModules: string[]): TrackProgress {
  const total = track.modules.length
  const done = track.modules.filter((m) => completedModules.includes(m.id)).length
  const next = track.modules.find((m) => !completedModules.includes(m.id))
  const xpTotal = track.modules.reduce((a, m) => a + m.xpReward, 0)
  const xpEarned = track.modules.filter((m) => completedModules.includes(m.id)).reduce((a, m) => a + m.xpReward, 0)
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0, next, xpEarned, xpTotal }
}

export function levelFor(xp: number) {
  // Smooth curve: level n requires roughly 250 * n^1.4 XP
  let level = 1
  let need = 250
  let remaining = xp
  while (remaining >= need && level < 50) {
    remaining -= need
    level += 1
    need = Math.round(250 * Math.pow(level, 1.4))
  }
  return { level, into: remaining, need, pct: Math.min(100, Math.round((remaining / need) * 100)) }
}
