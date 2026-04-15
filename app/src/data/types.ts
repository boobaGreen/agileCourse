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
  gameType?: 'drag-order' | 'drag-classify' | 'choose-path' | 'terminal-sim' | 'git-graph-sim' | 'docker-sim' | 'k8s-sim' | 'external'
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

export interface DockerState {
  images: { id: string, name: string, tag: string, size: string }[];
  containers: { id: string, name: string, image: string, status: 'running' | 'exited', ports: string[], volumes?: string[], networks?: string[] }[];
  volumes?: { id: string, name: string }[];
  networks?: { id: string, name: string, driver: string }[];
}

export interface DockerGameData {
  startState: DockerState;
  tasks: { id: string, instruction: string, condition: string, completed?: boolean }[];
}

export interface K8sState {
  nodes: { id: string, name: string, status: 'Ready' | 'NotReady' }[];
  pods: { id: string, name: string, node: string, status: 'Running' | 'Pending' | 'Error', labels: Record<string, string>, env?: Record<string, string>, volumes?: string[] }[];
  services: { id: string, name: string, type: string, selector: Record<string, string>, clusterIP: string, externalIP?: string }[];
  deployments: { id: string, name: string, replicas: number, selector: Record<string, string> }[];
  configMaps?: { id: string, name: string, data: Record<string, string> }[];
  secrets?: { id: string, name: string, data: Record<string, string>, type: string }[];
  pvc?: { id: string, name: string, size: string, status: 'Bound' | 'Pending' | 'Lost' }[];
  pv?: { id: string, name: string, capacity: string, status: 'Bound' | 'Available' }[];
}

export interface K8sGameData {
  startState: K8sState;
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
