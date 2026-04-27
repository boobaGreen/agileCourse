import type { LocalizedString } from '../types';

export type VisualType = 'area-flow' | 'branch-graph' | 'remote-sync' | 'timeline' | 'undo-op';

export interface CheatsheetCommand {
  command: string;
  description: LocalizedString;
  visualType?: VisualType;
  visualHighlight?: string;
  example?: string;
  output?: string;
}

export interface CheatsheetCategory {
  title: LocalizedString;
  level: 'beginner' | 'intermediate' | 'advanced';
  commands: CheatsheetCommand[];
}

export const GIT_CHEATSHEET: CheatsheetCategory[] = [
  {
    title: { en: 'Beginner', it: 'Principiante' },
    level: 'beginner',
    commands: [
      { 
        command: 'git init', 
        description: { en: 'start a new repo', it: 'inizializza un nuovo repo' }, 
        visualType: 'area-flow', 
        visualHighlight: 'init',
        example: 'git init',
        output: 'Initialized empty Git repository in /home/user/project/.git/'
      },
      { 
        command: 'git clone <url>', 
        description: { en: 'copy remote repo', it: 'clona un repo remoto' }, 
        visualType: 'remote-sync', 
        visualHighlight: 'clone',
        example: 'git clone https://github.com/user/repo.git',
        output: 'Cloning into \'repo\'...\nremote: Enumerating objects: 154, done.\nremote: Counting objects: 100% (154/154), done.\nremote: Compressing objects: 100% (98/98), done.\nReceiving objects: 100% (154/154), 45.21 KiB | 1.51 MiB/s, done.'
      },
      { 
        command: 'git status', 
        description: { en: 'check changes', it: 'controlla lo stato dei file' }, 
        visualType: 'area-flow', 
        visualHighlight: 'status',
        example: 'git status',
        output: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\tmodified:   index.html'
      },
      { 
        command: 'git add <file>', 
        description: { en: 'stage file', it: 'aggiungi file alla staging area' }, 
        visualType: 'area-flow', 
        visualHighlight: 'add',
        example: 'git add index.html',
        output: '' 
      },
      { 
        command: 'git add .', 
        description: { en: 'stage all files', it: 'aggiungi tutti i file alla staging area' }, 
        visualType: 'area-flow', 
        visualHighlight: 'add-all',
        example: 'git add .',
        output: ''
      },
      { 
        command: 'git commit -m "msg"', 
        description: { en: 'commit changes', it: 'crea un commit con un messaggio' }, 
        visualType: 'area-flow', 
        visualHighlight: 'commit',
        example: 'git commit -m "feat: add landing page"',
        output: '[main 395a1b2] feat: add landing page\n 1 file changed, 25 insertions(+)\n create mode 100644 index.html'
      },
      { 
        command: 'git log', 
        description: { en: 'show commit history', it: 'mostra la cronologia dei commit' }, 
        visualType: 'timeline', 
        visualHighlight: 'log',
        example: 'git log --oneline -n 5',
        output: '380a1b2 (HEAD -> main) refactor\n300c4d5 feat B\n220e6f7 fix bug\n140g8h9 feat A\n060i0j1 init'
      },
      { 
        command: 'git diff', 
        description: { en: 'see unstaged changes', it: 'mostra le modifiche non in stage' }, 
        visualType: 'area-flow', 
        visualHighlight: 'diff',
        example: 'git diff',
        output: 'diff --git a/index.html b/index.html\nindex 71152e1..9f06439 100644\n--- a/index.html\n+++ b/index.html\n@@ -10,5 +10,5 @@\n-    <h1>Hello World</h1>\n+    <h1>Hello Git</h1>'
      },
    ]
  },
  {
    title: { en: 'Intermediate', it: 'Intermedio' },
    level: 'intermediate',
    commands: [
      { 
        command: 'git branch', 
        description: { en: 'list branches', it: 'elenca i branch' }, 
        visualType: 'branch-graph', 
        visualHighlight: 'list',
        example: 'git branch',
        output: '  develop\n* main\n  feature/login'
      },
      { 
        command: 'git branch <name>', 
        description: { en: 'create branch', it: 'crea un nuovo branch' }, 
        visualType: 'branch-graph', 
        visualHighlight: 'create',
        example: 'git branch feature/new-idea',
        output: ''
      },
      { 
        command: 'git checkout <name>', 
        description: { en: 'switch branch', it: 'cambia branch attivo' }, 
        visualType: 'branch-graph', 
        visualHighlight: 'checkout',
        example: 'git checkout feature',
        output: 'Switched to branch \'feature\''
      },
      { 
        command: 'git merge <branch>', 
        description: { en: 'merge into current', it: 'unisce un branch in quello attuale' }, 
        visualType: 'branch-graph', 
        visualHighlight: 'merge',
        example: 'git merge feature',
        output: 'Updating 240b2c3..420a1b2\nFast-forward\n src/auth.ts | 15 +++++++++++++++\n 1 file changed, 15 insertions(+)'
      },
      { 
        command: 'git stash', 
        description: { en: 'save uncommitted changes', it: 'salva temporaneamente le modifiche' }, 
        visualType: 'area-flow', 
        visualHighlight: 'stash',
        example: 'git stash',
        output: 'Saved working directory and index state WIP on main: a1b2c3d feat: add landing page'
      },
      { 
        command: 'git stash pop', 
        description: { en: 'restore stashed changes', it: 'ripristina le modifiche salvate' }, 
        visualType: 'area-flow', 
        visualHighlight: 'stash-pop',
        example: 'git stash pop',
        output: 'On branch main\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n\tmodified:   style.css\nDropped refs/stash@{0} (739b...)'
      },
      { 
        command: 'git reset --soft <commit>', 
        description: { en: 'undo but keep changes staged', it: 'annulla commit ma tiene le modifiche in stage' }, 
        visualType: 'undo-op', 
        visualHighlight: 'reset-soft',
        example: 'git reset --soft HEAD~1',
        output: ''
      },
      { 
        command: 'git reset --hard <commit>', 
        description: { en: 'reset & delete changes', it: 'annulla commit e cancella le modifiche' }, 
        visualType: 'undo-op', 
        visualHighlight: 'reset-hard',
        example: 'git reset --hard HEAD~1',
        output: 'HEAD is now at 115b2c3 C2'
      },
      { 
        command: 'git pull', 
        description: { en: 'fetch + merge remote changes', it: 'scarica e unisce le modifiche remote' }, 
        visualType: 'remote-sync', 
        visualHighlight: 'pull',
        example: 'git pull origin main',
        output: 'remote: Enumerating objects: 5, done.\nremote: Total 3 (delta 1), reused 0 (delta 0)\nUnpacking objects: 100% (3/3), 654 bytes | 654.00 KiB/s, done.\nFrom https://github.com/user/repo\n * branch            main       -> FETCH_HEAD\nUpdating 085b2c3..120a1b2\nFast-forward\n README.md | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)'
      },
      { 
        command: 'git push', 
        description: { en: 'push commits to remote', it: 'invia i commit sul server remoto' }, 
        visualType: 'remote-sync', 
        visualHighlight: 'push',
        example: 'git push origin main',
        output: 'Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (3/3), done.\nWriting objects: 100% (3/3), 324 bytes | 324.00 KiB/s, done.\nTotal 3 (delta 2), reused 0 (delta 0)\nTo https://github.com/user/repo.git\n   085b2c3..120a1b2  main -> main'
      },
    ]
  },
  {
    title: { en: 'Advanced', it: 'Avanzato' },
    level: 'advanced',
    commands: [
      { 
        command: 'git rebase <branch>', 
        description: { en: 'replay commits on another branch', it: 'riapplica i commit su un altro branch' }, 
        visualType: 'branch-graph', 
        visualHighlight: 'rebase',
        example: 'git rebase main',
        output: 'Successfully rebased and updated refs/heads/feature/auth.'
      },
      { 
        command: 'git cherry-pick <commit>', 
        description: { en: 'apply specific commit', it: 'applica uno specifico commit' }, 
        visualType: 'branch-graph', 
        visualHighlight: 'cherry-pick',
        example: 'git cherry-pick 330a1b2',
        output: '[main 330b2c3] C5\'\n Date: Mon Apr 27 18:05:00 2026 +0200\n 1 file changed, 10 insertions(+)'
      },
      { 
        command: 'git revert <commit>', 
        description: { en: 'undo commit with new one', it: 'annulla un commit con uno nuovo' }, 
        visualType: 'undo-op', 
        visualHighlight: 'revert',
        example: 'git revert 180a1b2',
        output: '[main 470b2c3] Revert "C3"\n 1 file changed, 5 deletions(-)'
      },
      { 
        command: 'git reflog', 
        description: { en: 'history of all actions (even deleted)', it: 'cronologia di tutte le azioni (anche cancellate)' }, 
        visualType: 'timeline', 
        visualHighlight: 'reflog',
        example: 'git reflog',
        output: '380a1b2 HEAD@{0}: commit: refactor\n300c4d5 HEAD@{1}: commit: feat B\n220e6f7 HEAD@{2}: commit: fix bug\n430d8e9 HEAD@{3}: commit (amended): deleted feature'
      },
      { 
        command: 'git bisect', 
        description: { en: 'find commit that introduced a bug', it: 'trova il commit che ha introdotto un bug' }, 
        visualType: 'timeline', 
        visualHighlight: 'bisect',
        example: 'git bisect start\ngit bisect bad\ngit bisect good v1.0.0',
        output: 'Bisecting: 2 revisions left to test after this (roughly 1 step)\n[220e6f7] fix bug'
      },
      { 
        command: 'git blame <file>', 
        description: { en: 'see who last edited each line', it: 'mostra chi ha modificato ogni riga' }, 
        visualType: 'timeline', 
        visualHighlight: 'blame',
        example: 'git blame app.js',
        output: '140g8h91 (Alice 2026-04-27 17:30:00 +0200 1) const app = express();\n220e6f72 (Bob   2026-04-27 17:35:00 +0200 2) app.use(cors());\n300c4d53 (Alice 2026-04-27 17:40:00 +0200 3) app.get("/", handler);\n380a1b24 (Carol 2026-04-27 17:45:00 +0200 4) app.listen(3000);'
      },
      { 
        command: 'git tag <tag_name>', 
        description: { en: 'mark a commit', it: 'contrassegna un commit con un tag' }, 
        visualType: 'timeline', 
        visualHighlight: 'tag',
        example: 'git tag v1.0.0',
        output: ''
      },
      { 
        command: 'git push origin --tags', 
        description: { en: 'push tags to remote', it: 'invia i tag sul server remoto' }, 
        visualType: 'remote-sync', 
        visualHighlight: 'push-tags',
        example: 'git push origin --tags',
        output: 'Total 0 (delta 0), reused 0 (delta 0)\nTo https://github.com/user/repo.git\n * [new tag]         v1.0.0 -> v1.0.0'
      },
    ]
  }
];
