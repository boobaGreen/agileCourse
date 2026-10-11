/**
 * Lightweight track metadata with no dependency on module content.
 * The landing page and the app shell import only this file, so they load
 * without pulling the full course data into the first bundle.
 * `tracks.ts` checks in development that these numbers match the real content.
 */
import type { LucideIcon } from 'lucide-react'
import { GitBranch, Container, Ship } from 'lucide-react'
import type { LocalizedString } from '../data/types'

export type TrackId = 'git' | 'docker' | 'k8s'

export interface TrackInfo {
  id: TrackId
  name: string
  tagline: LocalizedString
  description: LocalizedString
  /** CSS variable reference, e.g. var(--t-git) */
  color: string
  icon: LucideIcon
  moduleCount: number
  cheatsheetLabel: LocalizedString
}

export const TRACK_INFO: Record<TrackId, TrackInfo> = {
  git: {
    id: 'git',
    name: 'Git',
    tagline: { en: 'Version control, from first commit to team workflows', it: 'Version control, dal primo commit ai workflow di team' },
    description: { en: 'Snapshots, branches, merges and the collaboration rituals every engineer uses daily.', it: 'Snapshot, branch, merge e i rituali di collaborazione che ogni ingegnere usa ogni giorno.' },
    color: 'var(--t-git)',
    icon: GitBranch,
    moduleCount: 11,
    cheatsheetLabel: { en: 'Git cheat sheet', it: 'Cheat sheet Git' },
  },
  docker: {
    id: 'docker',
    name: 'Docker',
    tagline: { en: 'Package anything into a container that runs anywhere', it: 'Impacchetta qualsiasi cosa in un container che gira ovunque' },
    description: { en: 'Images, Dockerfiles, volumes, networks and Compose, with a live engine simulator.', it: 'Immagini, Dockerfile, volumi, reti e Compose, con un simulatore del motore in tempo reale.' },
    color: 'var(--t-docker)',
    icon: Container,
    moduleCount: 9,
    cheatsheetLabel: { en: 'Docker cheat sheet', it: 'Cheat sheet Docker' },
  },
  k8s: {
    id: 'k8s',
    name: 'Kubernetes',
    tagline: { en: 'Orchestrate thousands of containers with confidence', it: 'Orchestra migliaia di container con sicurezza' },
    description: { en: 'Cluster architecture, Deployments, Services, config, storage and Helm on a simulated cluster.', it: 'Architettura del cluster, Deployment, Service, configurazione, storage e Helm su un cluster simulato.' },
    color: 'var(--t-k8s)',
    icon: Ship,
    moduleCount: 9,
    cheatsheetLabel: { en: 'kubectl cheat sheet', it: 'Cheat sheet kubectl' },
  },
}

export const TRACK_INFO_LIST: TrackInfo[] = [TRACK_INFO.git, TRACK_INFO.docker, TRACK_INFO.k8s]

/** Course totals shown on the landing page. Verified against content in tracks.ts (dev only). */
export const COURSE_STATS = { modules: 29, quiz: 139, labs: 38 }

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
