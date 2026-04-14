export interface QuizQuestion {
  id: string
  track?: 'git' | 'docker' | 'k8s'
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface Section {
  type: 'intro' | 'concept' | 'diagram' | 'code' | 'analogy' | 'tip'
    | 'table'          // tabelle comparative
    | 'flowchart'      // diagrammi di flusso SVG
    | 'animation'      // animazioni didattiche
    | 'interactive'    // componenti interattivi
    | 'game'           // mini-giochi
    | 'video'          // embed video
    | 'infographic'    // immagini/infografiche
  title?: string
  content: string
  code?: string
  language?: string
  // Rich content fields
  tableData?: { headers: string[], rows: string[][] }
  diagramSteps?: { label: string, icon?: string, color?: string }[]
  videoUrl?: string
  imageUrl?: string
  animationType?: string
  gameType?: 'drag-order' | 'drag-classify' | 'choose-path' | 'terminal-sim' | 'git-graph-sim' | 'external'
  gameData?: unknown // Type will be narrowed by components
  externalLink?: { label: string, url: string, xpPrompt: string }
}

export interface GitGraphState {
  commits: Record<string, { id: string, parents: string[], message: string }>;
  branches: Record<string, string>; // name -> commit id
  head: { type: 'branch' | 'commit', target: string };
}

export interface GitGraphGameData {
  startState: GitGraphState;
  tasks: { id: string, instruction: string, condition: string, completed?: boolean }[];
}

export interface Module {
  id: string
  track: 'git' | 'docker' | 'k8s'
  order: number
  title: string
  subtitle: string
  emoji: string
  duration: string          // estimated read/play time
  xpReward: number
  funFact?: string
  sections: Section[]
  quiz?: QuizQuestion[]
  externalLink?: { label: string; url: string; xpPrompt: string }
}
