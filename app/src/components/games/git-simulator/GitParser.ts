import { GitEngine } from './GitEngine';

export class GitParser {
  public static execute(engine: GitEngine, input: string): { success: boolean, out: string } {
    const cmd = input.trim().replace(/\s+/g, ' '); // normalize spaces
    
    // Support aliases/shorthands
    if (!cmd.startsWith('git ')) {
      return { success: false, out: `bash: ${cmd.split(' ')[0]}: command not found` };
    }

    // Pulisce anche eventuali virgolette attorno agli argomenti (es: git branch "feature")
    const args = cmd.substring(4).split(' ').map(a => a.replace(/^["']|["']$/g, ''));
    const action = args[0];

    switch (action) {
      case 'commit': {
        const msgIndex = args.indexOf('-m');
        let msg = 'New commit';
        if (msgIndex !== -1 && args[msgIndex + 1]) {
          msg = args.slice(msgIndex + 1).join(' ').replace(/["']/g, '');
        }
        const result = engine.commit(msg);
        return { success: result.success, out: result.msg };
      }

      case 'branch': {
        if (args.length === 1) {
          // Just list branches (mock response)
          const state = engine.getState();
          const current = state.head.type === 'branch' ? state.head.target : null;
          const out = Object.keys(state.branches).map(b => (b === current ? `* \x1b[32m${b}\x1b[0m` : `  ${b}`)).join('\n');
          return { success: true, out };
        }
        const branchName = args[1];
        if (branchName.startsWith('-')) {
            return { success: false, out: `error: Unknown switch or command not supported yet.` };
        }
        const result = engine.branch(branchName);
        return { success: result.success, out: result.msg };
      }

      case 'checkout':
      case 'switch': {
        if (args.length < 2) return { success: false, out: `fatal: missing branch name or commit hash` };

        // Handle `git checkout -b <name>` or `git switch -c <name>`
        if (args[1] === '-b' || args[1] === '-c') {
          if (args.length < 3) return { success: false, out: `fatal: requires a branch name` };
          const branchName = args[2];
          const newBranch = engine.branch(branchName);
          if (!newBranch.success) return { success: false, out: newBranch.msg };
          return { success: true, out: engine.checkout(branchName).msg };
        }

        return { success: true, out: engine.checkout(args[1]).msg };
      }

      case 'merge': {
        if (args.length < 2) return { success: false, out: `fatal: missing branch name` };
        const result = engine.merge(args[1]);
        return { success: result.success, out: result.msg };
      }

      case 'reset': {
        // e.g. git reset --hard HEAD~1
        let target = args[1];
        if (args[1] === '--hard' && args[2]) target = args[2];
        if (!target) return { success: false, out: `fatal: missing target` };
        const result = engine.reset(target);
        return { success: result.success, out: result.msg };
      }

      case 'revert': {
        if (args.length < 2) return { success: false, out: `fatal: missing commit to revert` };
        const result = engine.revert(args[1]);
        return { success: result.success, out: result.msg };
      }

      case 'cherry-pick': {
        if (args.length < 2) return { success: false, out: `fatal: missing commit hash to cherry-pick` };
        const result = engine.cherryPick(args[1]);
        return { success: result.success, out: result.msg };
      }

      default:
        return { success: false, out: `git: '${action}' is not a git command or not supported in this simulator.` };
    }
  }
}
