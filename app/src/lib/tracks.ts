/**
 * Full track data: metadata from trackMeta.ts joined with the module content.
 * Imported only by pages that need module content, so it lands in lazy chunks.
 */
import { GIT_MODULES } from '../data/git/modules/index'
import { DOCKER_MODULES } from '../data/docker/modules/index'
import { K8S_MODULES } from '../data/k8s/modules/index'
import type { Module } from '../data/types'
import { TRACK_INFO, COURSE_STATS, type TrackId, type TrackInfo } from './trackMeta'

export { levelFor, COURSE_STATS, type TrackId } from './trackMeta'

export interface TrackMeta extends TrackInfo {
  modules: Module[]
}

export const TRACKS: Record<TrackId, TrackMeta> = {
  git: { ...TRACK_INFO.git, modules: GIT_MODULES },
  docker: { ...TRACK_INFO.docker, modules: DOCKER_MODULES },
  k8s: { ...TRACK_INFO.k8s, modules: K8S_MODULES },
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

// Keep the hand-written landing numbers honest while developing.
if (import.meta.env.DEV) {
  const real = {
    modules: ALL_MODULES.length,
    quiz: ALL_MODULES.reduce((a, m) => a + (m.quiz?.length ?? 0), 0),
    labs: ALL_MODULES.reduce((a, m) => a + m.sections.filter((s) => s.type === 'game' || s.type === 'animation').length, 0),
  }
  if (JSON.stringify(real) !== JSON.stringify(COURSE_STATS)) {
    console.warn('[trackMeta] COURSE_STATS is out of date. Update src/lib/trackMeta.ts to:', real)
  }
  for (const t of TRACK_LIST) {
    if (t.moduleCount !== t.modules.length) console.warn(`[trackMeta] ${t.id}.moduleCount should be ${t.modules.length}`)
  }
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
