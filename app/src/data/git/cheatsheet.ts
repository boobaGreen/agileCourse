import type { LocalizedString } from '../types';

export interface CheatsheetCommand {
  command: string;
  description: LocalizedString;
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
      { command: 'git init', description: { en: 'start a new repo', it: 'inizializza un nuovo repo' } },
      { command: 'git clone <url>', description: { en: 'copy remote repo', it: 'clona un repo remoto' } },
      { command: 'git status', description: { en: 'check changes', it: 'controlla lo stato dei file' } },
      { command: 'git add <file>', description: { en: 'stage file', it: 'aggiungi file alla staging area' } },
      { command: 'git add .', description: { en: 'stage all files', it: 'aggiungi tutti i file alla staging area' } },
      { command: 'git commit -m "msg"', description: { en: 'commit changes', it: 'crea un commit con un messaggio' } },
      { command: 'git log', description: { en: 'show commit history', it: 'mostra la cronologia dei commit' } },
      { command: 'git diff', description: { en: 'see unstaged changes', it: 'mostra le modifiche non in stage' } },
    ]
  },
  {
    title: { en: 'Intermediate', it: 'Intermedio' },
    level: 'intermediate',
    commands: [
      { command: 'git branch', description: { en: 'list branches', it: 'elenca i branch' } },
      { command: 'git branch <name>', description: { en: 'create branch', it: 'crea un nuovo branch' } },
      { command: 'git checkout <name>', description: { en: 'switch branch', it: 'cambia branch attivo' } },
      { command: 'git merge <branch>', description: { en: 'merge into current', it: 'unisce un branch in quello attuale' } },
      { command: 'git stash', description: { en: 'save uncommitted changes', it: 'salva temporaneamente le modifiche' } },
      { command: 'git stash pop', description: { en: 'restore stashed changes', it: 'ripristina le modifiche salvate' } },
      { command: 'git reset --soft <commit>', description: { en: 'undo but keep changes staged', it: 'annulla commit ma tiene le modifiche in stage' } },
      { command: 'git reset --hard <commit>', description: { en: 'reset & delete changes', it: 'annulla commit e cancella le modifiche' } },
      { command: 'git pull', description: { en: 'fetch + merge remote changes', it: 'scarica e unisce le modifiche remote' } },
      { command: 'git push', description: { en: 'push commits to remote', it: 'invia i commit sul server remoto' } },
    ]
  },
  {
    title: { en: 'Advanced', it: 'Avanzato' },
    level: 'advanced',
    commands: [
      { command: 'git rebase <branch>', description: { en: 'replay commits on another branch', it: 'riapplica i commit su un altro branch' } },
      { command: 'git cherry-pick <commit>', description: { en: 'apply specific commit', it: 'applica uno specifico commit' } },
      { command: 'git revert <commit>', description: { en: 'undo commit with new one', it: 'annulla un commit con uno nuovo' } },
      { command: 'git reflog', description: { en: 'history of all actions (even deleted)', it: 'cronologia di tutte le azioni (anche cancellate)' } },
      { command: 'git bisect', description: { en: 'find commit that introduced a bug', it: 'trova il commit che ha introdotto un bug' } },
      { command: 'git blame <file>', description: { en: 'see who last edited each line', it: 'mostra chi ha modificato ogni riga' } },
      { command: 'git tag <tag_name>', description: { en: 'mark a commit', it: 'contrassegna un commit con un tag' } },
      { command: 'git push origin --tags', description: { en: 'push tags to remote', it: 'invia i tag sul server remoto' } },
    ]
  }
];
