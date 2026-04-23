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

export interface DockerImage {
  id: string;
  name: string;
  tag: string;
  size: string;
}

export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'exited';
  ports: string[];
  volumes?: string[];
  networks?: string[];
}

export interface DockerVolume {
  id: string;
  name: string;
}

export interface DockerNetwork {
  id: string;
  name: string;
  driver: string;
}

export interface DockerState {
  images: DockerImage[];
  containers: DockerContainer[];
  volumes?: DockerVolume[];
  networks?: DockerNetwork[];
}

export interface DockerGameData {
  startState: DockerState;
  tasks: { id: string, instruction: string, condition: string, completed?: boolean }[];
}

export interface K8sNode {
  id: string;
  name: string;
  status: 'Ready' | 'NotReady';
}

export interface K8sPod {
  id: string;
  name: string;
  node: string;
  status: 'Running' | 'Pending' | 'Error';
  labels: Record<string, string>;
  env?: Record<string, string>;
  volumes?: string[];
}

export interface K8sService {
  id: string;
  name: string;
  type: string;
  selector: Record<string, string>;
  clusterIP: string;
  externalIP?: string;
}

export interface K8sDeployment {
  id: string;
  name: string;
  replicas: number;
  selector: Record<string, string>;
}

export interface K8sConfigMap {
  id: string;
  name: string;
  data: Record<string, string>;
}

export interface K8sSecret {
  id: string;
  name: string;
  data: Record<string, string>;
  type: string;
}

export interface K8sPVC {
  id: string;
  name: string;
  size: string;
  status: 'Bound' | 'Pending' | 'Lost';
}

export interface K8sPV {
  id: string;
  name: string;
  capacity: string;
  status: 'Bound' | 'Available';
}

export interface K8sState {
  nodes: K8sNode[];
  pods: K8sPod[];
  services: K8sService[];
  deployments: K8sDeployment[];
  configMaps?: K8sConfigMap[];
  secrets?: K8sSecret[];
  pvc?: K8sPVC[];
  pv?: K8sPV[];
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

export interface Track {
  id: string
  icon: React.ElementType
  emoji: string
  label: string
  color: string
  glow: string
  modules: Module[]
  available: boolean
}

export interface GameDataItem {
  id: string;
  label: string;
}

export interface GameDataClassify {
  categories: { id: string, label: string }[];
  items: { id: string, label: string, categoryId: string }[];
}

export interface TerminalGameData {
  startText?: string;
  steps: {
    instruction: string;
    expectedCommand: string;
    output?: string;
  }[];
}
