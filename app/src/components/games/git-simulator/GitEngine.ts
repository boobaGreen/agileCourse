import type { GitGraphState } from '../../../data/types';

export class GitEngine {
  private state: GitGraphState;

  constructor(initialState?: GitGraphState) {
    if (initialState) {
      this.state = JSON.parse(JSON.stringify(initialState));
    } else {
      this.state = {
        commits: {
          'C1': { id: 'C1', parents: [], message: 'Initial commit' }
        },
        branches: {
          'main': 'C1'
        },
        head: { type: 'branch', target: 'main' }
      };
    }
  }

  public getState(): GitGraphState {
    return JSON.parse(JSON.stringify(this.state)); 
  }

  // Restituisce l'hash su cui si trova HEAD attualmente
  public getCurrentCommitId(): string {
    if (this.state.head.type === 'branch') {
      return this.state.branches[this.state.head.target];
    }
    return this.state.head.target; // detached
  }

  // Genera un nuovo ID per un commit (C2, C3...)
  private generateCommitId(): string {
    const ids = Object.keys(this.state.commits)
      .map(id => parseInt(id.replace('C', '')) || 0)
      .sort((a,b) => b-a);
    const nextNum = (ids[0] || 0) + 1;
    return `C${nextNum}`;
  }

  public commit(message: string = 'New commit'): { success: boolean, msg: string } {
    const parentId = this.getCurrentCommitId();
    const newId = this.generateCommitId();
    
    this.state.commits[newId] = {
      id: newId,
      parents: [parentId],
      message
    };

    if (this.state.head.type === 'branch') {
      // Se siamo su un branch, il pointer del branch avanza
      this.state.branches[this.state.head.target] = newId;
    } else {
      // Se in detached head, head si attacca al nuovo commit
      this.state.head.target = newId;
    }

    return { success: true, msg: `[${this.state.head.type === 'branch' ? this.state.head.target : 'detached HEAD'} ${newId}] ${message}` };
  }

  public branch(name: string): { success: boolean, msg: string } {
    if (this.state.branches[name]) {
      return { success: false, msg: `fatal: A branch named '${name}' already exists.` };
    }
    
    this.state.branches[name] = this.getCurrentCommitId();
    return { success: true, msg: `Created branch ${name}` };
  }

  public checkout(target: string): { success: boolean, msg: string } {
    // 1. Is it a branch?
    if (this.state.branches[target]) {
      this.state.head = { type: 'branch', target };
      return { success: true, msg: `Switched to branch '${target}'` };
    }

    // 2. Is it a commit hash?
    if (this.state.commits[target]) {
      this.state.head = { type: 'commit', target };
      return { success: true, msg: `Note: switching to '${target}'.\n\nYou are in 'detached HEAD' state.` };
    }

    return { success: false, msg: `error: pathspec '${target}' did not match any file(s) known to git` };
  }

  public merge(branchName: string): { success: boolean, msg: string } {
    if (this.state.head.type !== 'branch') {
      return { success: false, msg: `fatal: Cannot merge in a detached HEAD state.` };
    }

    const targetCommit = this.state.branches[branchName];
    if (!targetCommit) {
      return { success: false, msg: `merge: ${branchName} - not something we can merge` };
    }

    const currentCommit = this.getCurrentCommitId();
    
    // Simplification for the game engine: Always create a merge commit if different,
    // ignore fast-forwarding logic for now to keep the code simpler and visualize merges.
    if (targetCommit === currentCommit) {
      return { success: true, msg: `Already up to date.` };
    }

    // Is current commit an ancestor of target? (Fast-forward)
    // Actually, let's implement basic fast forward:
    // If targetCommit is a direct child path of currentCommit...
    // In our sim, checking full graph ancestry is O(n), doable but maybe not necessary for prototype.
    // Let's just create a merge commit.
    const newId = this.generateCommitId();
    this.state.commits[newId] = {
      id: newId,
      parents: [currentCommit, targetCommit],
      message: `Merge branch '${branchName}'`
    };

    this.state.branches[this.state.head.target] = newId;
    return { success: true, msg: `Merge made by the 'recursive' strategy.` };
  }

  public reset(target: string): { success: boolean, msg: string } {
    if (this.state.head.type !== 'branch') {
      return { success: false, msg: `fatal: Cannot reset in a detached HEAD state (for this sim).` };
    }
    
    // We only support hard reset and only moving the branch pointer back
    // (We don't actually delete commits from the DAG to keep them rendering or we could orphan them)
    // Actually Git keeps them as orphans. They will still render unless we clean them, which is fine!
    
    // Check if target is 'HEAD~1' etc. Very simple resolver:
    let resolvedTarget = target;
    if (target.startsWith('HEAD~')) {
      const steps = parseInt(target.replace('HEAD~', '')) || 1;
      let curr = this.getCurrentCommitId();
      for(let i=0; i<steps; i++) {
        const c = this.state.commits[curr];
        if (c && c.parents.length > 0) curr = c.parents[0];
      }
      resolvedTarget = curr;
    }

    if (!this.state.commits[resolvedTarget]) {
      return { success: false, msg: `fatal: Could not parse object '${target}'.` };
    }

    this.state.branches[this.state.head.target] = resolvedTarget;
    return { success: true, msg: `HEAD is now at ${resolvedTarget}` };
  }

  public revert(target: string): { success: boolean, msg: string } {
    // Resolve target (HEAD or commit hash)
    let resolvedTarget = target;
    if (target === 'HEAD') resolvedTarget = this.getCurrentCommitId();
    
    const targetCommit = this.state.commits[resolvedTarget];
    if (!targetCommit) {
      return { success: false, msg: `fatal: bad revision '${target}'` };
    }

    const currentCommit = this.getCurrentCommitId();
    const newId = this.generateCommitId();
    
    this.state.commits[newId] = {
      id: newId,
      parents: [currentCommit],
      message: `Revert "${targetCommit.message}"`
    };

    if (this.state.head.type === 'branch') {
      this.state.branches[this.state.head.target] = newId;
    } else {
      this.state.head.target = newId;
    }

    return { success: true, msg: `[${this.state.head.type === 'branch' ? this.state.head.target : 'detached HEAD'} ${newId}] Revert "${targetCommit.message}"` };
  }

  public cherryPick(target: string): { success: boolean, msg: string } {
    const targetCommit = this.state.commits[target];
    if (!targetCommit) {
      return { success: false, msg: `fatal: bad revision '${target}'` };
    }

    const currentCommit = this.getCurrentCommitId();
    const newId = this.generateCommitId();
    
    this.state.commits[newId] = {
      id: newId,
      parents: [currentCommit],
      message: targetCommit.message + " (cherry-picked)"
    };

    if (this.state.head.type === 'branch') {
      this.state.branches[this.state.head.target] = newId;
    } else {
      this.state.head.target = newId;
    }

    return { success: true, msg: `[${this.state.head.type === 'branch' ? this.state.head.target : 'detached HEAD'} ${newId}] ${targetCommit.message}` };
  }
}
