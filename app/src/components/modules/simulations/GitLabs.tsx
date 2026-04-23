import { MergeRebaseLab } from './git/MergeRebaseLab'
import { RemoteSyncLab } from './git/RemoteSyncLab'
import { ForcePushLab } from './git/ForcePushLab'
import { StageLab } from './git/StageLab'
import { HeadLab } from './git/HeadLab'
import { UndoSandbox } from './git/UndoSandbox'
import { CherryPickLab } from './git/CherryPickLab'
import { ManualVsGitLab } from './git/ManualVsGitLab'
import { StashLab } from './git/StashLab'
import { BisectLab } from './git/BisectLab'
import { IgnoreLab } from './git/IgnoreLab'
import { CoreConceptsLab } from './git/CoreConceptsLab'

export function GitLabs({ type, onComplete }: { type: string, onComplete?: () => void }) {
  if (type.toLowerCase().includes('merge') || type.toLowerCase().includes('rebase')) {
    return <MergeRebaseLab />
  }

  if (type.toLowerCase().includes('remote') || type.toLowerCase().includes('sim')) {
    return <RemoteSyncLab />
  }
  
  if (type === 'git-force-danger') {
    return <ForcePushLab />
  }

  if (type === 'git-stage-lab') {
    return <StageLab />
  }

  if (type === 'git-head-lab') {
    return <HeadLab />
  }

  if (type === 'git-undo-lab') {
    return <UndoSandbox />
  }

  if (type === 'git-cherry-pick-lab') {
    return <CherryPickLab />
  }

  if (type === 'git-vs-manual') {
    return <ManualVsGitLab />
  }

  if (type === 'git-stash-lab') {
    return <StashLab />
  }

  if (type === 'git-bisect-lab') {
    return <BisectLab />
  }

  if (type === 'git-ignore-lab') {
    return <IgnoreLab onComplete={onComplete} />
  }

  if (type.toLowerCase().includes('core') || type === 'git-core-sim') {
    return <CoreConceptsLab />
  }

  return null
}
