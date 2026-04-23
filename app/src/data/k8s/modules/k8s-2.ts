import type { Module } from '../../types'

export const k8s2: Module = {
  id: 'k8s-2',
  track: 'k8s',
  order: 2,
  title: { en: 'Cluster Architecture', it: 'Architettura del Cluster' },
  subtitle: { en: 'The Brain and the Muscles', it: 'Il Cervello e i Muscoli' },
  emoji: '🧠',
  duration: '20 min',
  xpReward: 120,
  sections: [
    {
      type: 'intro',
      content: { en: 'A Kubernetes cluster is not a single entity. It is a collection of distinct machines (physical or virtual VMs) working together. They are strictly divided into two distinct roles: The Control Plane (The Brain) and the Worker Nodes (The Muscle).', it: 'Un cluster Kubernetes non è un\'unica entità. È una collezione di macchine distinte (VM fisiche o virtuali) che lavorano insieme. Sono rigorosamente divise in due ruoli distinti: il Control Plane (il Cervello) e i Worker Node (i Muscoli).' }
    },
    {
      type: 'video',
      title: { en: '📺 Architecture Deep Dive', it: '📺 Approfondimento sull\'architettura' },
      content: { en: 'TechWorld with Nana provides the absolute best visual breakdown of every component inside a K8s node.', it: 'TechWorld with Nana fornisce la migliore analisi visiva di ogni componente all\'interno di un nodo K8s.' },
      videoUrl: 'https://www.youtube.com/watch?v=umXEmn3cMWY'
    },
    {
      type: 'concept',
      title: { en: '🧠 The Control Plane (Master Node)', it: '🧠 Il Control Plane (Master Node)' },
      content: { en: 'The Control Plane makes global decisions about the cluster. It does not run your application code.\n\n- **API Server**: The only component you interact with directly. The front-door.\n- **etcd**: The cluster\'s memory. A highly-available key-value store containing the cluster state.\n- **Scheduler**: Watches for new unassigned containers and assigns them to an appropriate Worker node.\n- **Controller Manager**: The endless "loop" that ensures the current state matches your desired state.', it: 'Il Control Plane prende decisioni globali sul cluster. Non esegue il codice della tua applicazione.\n\n- **API Server**: L\'unico componente con cui interagisci direttamente. La porta d\'ingresso.\n- **etcd**: La memoria del cluster. Un archivio chiave-valore ad alta disponibilità che contiene lo stato del cluster.\n- **Scheduler**: Controlla i nuovi container non assegnati e li assegna a un nodo Worker appropriato.\n- **Controller Manager**: Il "ciclo" infinito che assicura che lo stato attuale corrisponda allo stato desiderato.' }
    },
    {
      type: 'concept',
      title: { en: '💪 The Worker Nodes', it: '💪 I Worker Node' },
      content: { en: 'Worker Nodes are the machines that actually run your application containers.\n\n- **Kubelet**: The captain of the worker node. It listens to the API Server and makes sure containers are running healthy.\n- **Kube-Proxy**: Maintains network rules, allowing communication to and from containers.\n- **Container Runtime**: The actual engine pulling images and running them (like containerd or Docker).', it: 'I Worker Node sono le macchine che eseguono effettivamente i container della tua applicazione.\n\n- **Kubelet**: Il capitano del nodo worker. Ascolta l\'API Server e si assicura che i container funzionino correttamente.\n- **Kube-Proxy**: Gestisce le regole di rete, permettendo la comunicazione da e verso i container.\n- **Container Runtime**: Il motore reale che scarica le immagini e le esegue (come containerd o Docker).' }
    },
    {
      type: 'flowchart',
      content: { en: '**The Architecture Visualized**', it: '**L\'architettura visualizzata**' },
      diagramSteps: [
        { label: { en: 'Developer\n(kubectl)', it: 'Sviluppatore\n(kubectl)' }, icon: '👨‍💻', color: '#118ab2' },
        { label: { en: 'Control Plane\n(API Server)', it: 'Control Plane\n(API Server)' }, icon: '🧠', color: '#ffb703' },
        { label: { en: 'Worker Node 1\n(Kubelet)', it: 'Worker Node 1\n(Kubelet)' }, icon: '💪', color: '#06d6a0' },
        { label: { en: 'Worker Node 2\n(Kubelet)', it: 'Worker Node 2\n(Kubelet)' }, icon: '💪', color: '#06d6a0' }
      ]
    },
    {
      type: 'game',
      title: { en: 'Challenge: Master vs Worker', it: 'Sfida: Master vs Worker' },
      content: { en: 'Drag the components to their correct architectural home.', it: 'Trascina i componenti nella loro corretta sede architettonica.' },
      gameType: 'drag-classify',
      gameData: {
        categories: [
          { id: 'master', label: { en: 'Control Plane (Master)', it: 'Control Plane (Master)' } },
          { id: 'worker', label: { en: 'Worker Node', it: 'Nodo Worker' } }
        ],
        items: [
          { id: 'api', label: { en: 'API Server', it: 'API Server' }, categoryId: 'master' },
          { id: 'etcd', label: { en: 'etcd Database', it: 'Database etcd' }, categoryId: 'master' },
          { id: 'scheduler', label: { en: 'Scheduler', it: 'Scheduler' }, categoryId: 'master' },
          { id: 'kubelet', label: { en: 'Kubelet', it: 'Kubelet' }, categoryId: 'worker' },
          { id: 'proxy', label: { en: 'Kube-Proxy', it: 'Kube-Proxy' }, categoryId: 'worker' },
          { id: 'runtime', label: { en: 'Container Runtime', it: 'Runtime del container' }, categoryId: 'worker' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-2-q1',
      question: { en: 'Which component serves as the cluster\'s fundamental "Brain and Memory", storing all state information?', it: 'Quale componente funge da "Cervello e Memoria" fondamentale del cluster, memorizzando tutte le informazioni sullo stato?' },
      options: ['Kubelet', 'Kube-Proxy', 'The API Server', 'etcd'],
      correct: 3,
      explanation: { en: '`etcd` is arguably the most critical component. It is the highly-available dictionary where Kubernetes stores all data. If you lose your etcd data cleanly, your cluster forgets everything.', it: '`etcd` è probabilmente il componente più critico. È il dizionario ad alta disponibilità dove Kubernetes memorizza tutti i dati. Se perdi i dati di etcd, il tuo cluster dimentica tutto.' }
    },
    {
      id: 'k8s-2-q2',
      question: { en: 'When you type a command into your terminal to deploy an app, which component receives it?', it: 'Quando digiti un comando nel tuo terminale per distribuire un\'app, quale componente lo riceve?' },
      options: [
        { en: 'The Worker node directly', it: 'Il nodo Worker direttamente' },
        { en: 'The Scheduler', it: 'Lo Scheduler' },
        { en: 'The API Server', it: 'L\'API Server' },
        { en: 'The Container Runtime', it: 'Il Runtime del container' }
      ],
      correct: 2,
      explanation: { en: 'The `kube-apiserver` acts as the grand central station. No component bypasses it; everything, including UI dashboards, CLIs, and internal nodes, must talk to the API Server.', it: 'Il `kube-apiserver` funge da stazione centrale. Nessun componente lo bypassa; tutto, incluse le dashboard UI, le CLI e i nodi interni, deve parlare con l\'API Server.' }
    },
    {
      id: 'k8s-2-q3',
      question: { en: 'What is the primary job of the Kubelet?', it: 'Qual è il compito principale del Kubelet?' },
      options: [
        { en: 'To route external internet traffic into the cluster', it: 'Instradare il traffico internet esterno nel cluster' },
        { en: 'To store secret passwords', it: 'Memorizzare password segrete' },
        { en: 'To ensure that containers scheduled to its specific node are actively running and healthy', it: 'Assicurarsi che i container pianificati sul suo nodo specifico siano attivi e sani' },
        { en: 'To schedule pods to other nodes', it: 'Pianificare pod su altri nodi' }
      ],
      correct: 2,
      explanation: { en: 'The Kubelet is the local agent on every worker node. It registers the node with the cluster and ensures the containers it was assigned are actually running.', it: 'Il Kubelet è l\'agente locale su ogni nodo worker. Registra il nodo nel cluster e assicura che i container assegnati siano effettivamente in esecuzione.' }
    }
  ]
}
