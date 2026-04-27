import type { LocalizedString } from '../types';

export type VisualType = 'area-flow' | 'branch-graph' | 'remote-sync' | 'timeline' | 'undo-op';

export interface CheatsheetCommand {
  command: string;
  description: LocalizedString;
  visualType?: VisualType;
  visualHighlight?: string;
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
      { command: 'git init', description: { en: 'start a new repo', it: 'inizializza un nuovo repo' }, visualType: 'area-flow', visualHighlight: 'init' },
      { command: 'git clone <url>', description: { en: 'copy remote repo', it: 'clona un repo remoto' }, visualType: 'remote-sync', visualHighlight: 'clone' },
      { command: 'git status', description: { en: 'check changes', it: 'controlla lo stato dei file' }, visualType: 'area-flow', visualHighlight: 'status' },
      { command: 'git add <file>', description: { en: 'stage file', it: 'aggiungi file alla staging area' }, visualType: 'area-flow', visualHighlight: 'add' },
      { command: 'git add .', description: { en: 'stage all files', it: 'aggiungi tutti i file alla staging area' }, visualType: 'area-flow', visualHighlight: 'add-all' },
      { command: 'git commit -m "msg"', description: { en: 'commit changes', it: 'crea un commit con un messaggio' }, visualType: 'area-flow', visualHighlight: 'commit' },
      { command: 'git log', description: { en: 'show commit history', it: 'mostra la cronologia dei commit' }, visualType: 'timeline', visualHighlight: 'log' },
      { command: 'git diff', description: { en: 'see unstaged changes', it: 'mostra le modifiche non in stage' }, visualType: 'area-flow', visualHighlight: 'diff' },
    ]
  },
  {
    title: { en: 'Intermediate', it: 'Intermedio' },
    level: 'intermediate',
    commands: [
      { command: 'git branch', description: { en: 'list branches', it: 'elenca i branch' }, visualType: 'branch-graph', visualHighlight: 'list' },
      { command: 'git branch <name>', description: { en: 'create branch', it: 'crea un nuovo branch' }, visualType: 'branch-graph', visualHighlight: 'create' },
      { command: 'git checkout <name>', description: { en: 'switch branch', it: 'cambia branch attivo' }, visualType: 'branch-graph', visualHighlight: 'checkout' },
      { command: 'git merge <branch>', description: { en: 'merge into current', it: 'unisce un branch in quello attuale' }, visualType: 'branch-graph', visualHighlight: 'merge' },
      { command: 'git stash', description: { en: 'save uncommitted changes', it: 'salva temporaneamente le modifiche' }, visualType: 'area-flow', visualHighlight: 'stash' },
      { command: 'git stash pop', description: { en: 'restore stashed changes', it: 'ripristina le modifiche salvate' }, visualType: 'area-flow', visualHighlight: 'stash-pop' },
      { command: 'git reset --soft <commit>', description: { en: 'undo but keep changes staged', it: 'annulla commit ma tiene le modifiche in stage' }, visualType: 'undo-op', visualHighlight: 'reset-soft' },
      { command: 'git reset --hard <commit>', description: { en: 'reset & delete changes', it: 'annulla commit e cancella le modifiche' }, visualType: 'undo-op', visualHighlight: 'reset-hard' },
      { command: 'git pull', description: { en: 'fetch + merge remote changes', it: 'scarica e unisce le modifiche remote' }, visualType: 'remote-sync', visualHighlight: 'pull' },
      { command: 'git push', description: { en: 'push commits to remote', it: 'invia i commit sul server remoto' }, visualType: 'remote-sync', visualHighlight: 'push' },
    ]
  },
  {
    title: { en: 'Advanced', it: 'Avanzato' },
    level: 'advanced',
    commands: [
      { command: 'git rebase <branch>', description: { en: 'replay commits on another branch', it: 'riapplica i commit su un altro branch' }, visualType: 'branch-graph', visualHighlight: 'rebase' },
      { command: 'git cherry-pick <commit>', description: { en: 'apply specific commit', it: 'applica uno specifico commit' }, visualType: 'branch-graph', visualHighlight: 'cherry-pick' },
      { command: 'git revert <commit>', description: { en: 'undo commit with new one', it: 'annulla un commit con uno nuovo' }, visualType: 'undo-op', visualHighlight: 'revert' },
      { command: 'git reflog', description: { en: 'history of all actions (even deleted)', it: 'cronologia di tutte le azioni (anche cancellate)' }, visualType: 'timeline', visualHighlight: 'reflog' },
      { command: 'git bisect', description: { en: 'find commit that introduced a bug', it: 'trova il commit che ha introdotto un bug' }, visualType: 'timeline', visualHighlight: 'bisect' },
      { command: 'git blame <file>', description: { en: 'see who last edited each line', it: 'mostra chi ha modificato ogni riga' }, visualType: 'timeline', visualHighlight: 'blame' },
      { command: 'git tag <tag_name>', description: { en: 'mark a commit', it: 'contrassegna un commit con un tag' }, visualType: 'timeline', visualHighlight: 'tag' },
      { command: 'git push origin --tags', description: { en: 'push tags to remote', it: 'invia i tag sul server remoto' }, visualType: 'remote-sync', visualHighlight: 'push-tags' },
    ]
  }
];
