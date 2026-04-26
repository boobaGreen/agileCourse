import { GitEngine } from './GitEngine';
import type { LocalizedString } from '../../../data/types';

const KNOWN_GIT_COMMANDS = [
  'add', 'am', 'archive', 'bisect', 'branch', 'bundle', 'checkout', 'cherry-pick',
  'citool', 'clean', 'clone', 'commit', 'describe', 'diff', 'fetch', 'format-patch',
  'gc', 'grep', 'gui', 'init', 'log', 'merge', 'mv', 'notes', 'pull', 'push',
  'range-diff', 'rebase', 'reset', 'restore', 'revert', 'rm', 'shortlog', 'show',
  'stash', 'status', 'submodule', 'switch', 'tag', 'worktree', 'config', 'help', 'remote'
];

export class GitParser {
  public static execute(engine: GitEngine, input: string): { success: boolean, out: LocalizedString } {
    const cmd = input.trim().replace(/\s+/g, ' '); // normalize spaces
    
    if (cmd === 'git') {
      return { 
        success: false, 
        out: {
          en: "usage: git <command> [<args>]\n\nCommon commands: commit, branch, checkout, merge, reset, revert.",
          it: "utilizzo: git <comando> [<argomenti>]\n\nComandi comuni: commit, branch, checkout, merge, reset, revert."
        }
      };
    }

    if (!cmd.startsWith('git ')) {
      return { success: false, out: `bash: ${cmd.split(' ')[0]}: command not found` };
    }

    // Tokenizer that respects quotes
    const tokens: string[] = [];
    let currentToken = '';
    let inQuote: string | null = null;

    for (let i = 4; i < cmd.length; i++) {
      const char = cmd[i];
      if (inQuote) {
        if (char === inQuote) {
          inQuote = null;
        } else {
          currentToken += char;
        }
      } else if (char === '"' || char === "'") {
        inQuote = char;
      } else if (char === ' ') {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = '';
        }
      } else {
        currentToken += char;
      }
    }
    if (currentToken) tokens.push(currentToken);

    if (inQuote) {
      return { success: false, out: `error: unclosed quotation mark found in command.` };
    }

    const action = tokens[0];
    const args = tokens; // tokens already contains everything after 'git '

    switch (action) {
      case 'commit': {
        const msgIndex = args.indexOf('-m');
        let msg = 'New commit';
        if (msgIndex !== -1 && args[msgIndex + 1]) {
          msg = args[msgIndex + 1];
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

      case 'status': {
          return {
              success: true,
              out: {
                  en: "On branch main\nnothing to commit, working tree clean",
                  it: "Sul branch main\nnulla da committare, working tree pulito"
              }
          };
      }

      default:
        if (action && KNOWN_GIT_COMMANDS.includes(action)) {
          return { 
            success: false, 
            out: {
              en: `git: '${action}' is a valid git command, but it is not supported in this simulation or not needed for this exercise.`,
              it: `git: '${action}' è un comando git valido, ma non è supportato in questo simulatore o non è necessario per questo esercizio.`
            } 
          };
        }
        return { 
          success: false, 
          out: {
            en: `git: '${action}' is not a git command. See 'git --help'.`,
            it: `git: '${action}' non è un comando git. Vedi 'git --help'.`
          }
        };
    }
  }
}

