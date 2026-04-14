import type { Module } from '../../types'

export const k8s2: Module = {
  id: 'k8s-2',
  track: 'k8s',
  order: 2,
  title: 'Cluster Architecture',
  subtitle: 'The Brain and the Muscles',
  emoji: '🧠',
  duration: '20 min',
  xpReward: 120,
  sections: [
    {
      type: 'intro',
      content: 'A Kubernetes cluster is not a single entity. It is a collection of distinct machines (physical or virtual VMs) working together. They are strictly divided into two distinct roles: The Control Plane (The Brain) and the Worker Nodes (The Muscle).'
    },
    {
      type: 'video',
      title: '📺 Architecture Deep Dive',
      content: 'TechWorld with Nana provides the absolute best visual breakdown of every component inside a K8s node.',
      videoUrl: 'https://www.youtube.com/watch?v=umXEmn3cMWY'
    },
    {
      type: 'concept',
      title: '🧠 The Control Plane (Master Node)',
      content: 'The Control Plane makes global decisions about the cluster. It does not run your application code.\n\n- **API Server**: The only component you interact with directly. The front-door.\n- **etcd**: The cluster\'s memory. A highly-available key-value store containing the cluster state.\n- **Scheduler**: Watches for new unassigned containers and assigns them to an appropriate Worker node.\n- **Controller Manager**: The endless "loop" that ensures the current state matches your desired state.'
    },
    {
      type: 'concept',
      title: '💪 The Worker Nodes',
      content: 'Worker Nodes are the machines that actually run your application containers.\n\n- **Kubelet**: The captain of the worker node. It listens to the API Server and makes sure containers are running healthy.\n- **Kube-Proxy**: Maintains network rules, allowing communication to and from containers.\n- **Container Runtime**: The actual engine pulling images and running them (like containerd or Docker).'
    },
    {
      type: 'flowchart',
      content: '**The Architecture Visualized**',
      diagramSteps: [
        { label: 'Developer\n(kubectl)', icon: '👨‍💻', color: '#118ab2' },
        { label: 'Control Plane\n(API Server)', icon: '🧠', color: '#ffb703' },
        { label: 'Worker Node 1\n(Kubelet)', icon: '💪', color: '#06d6a0' },
        { label: 'Worker Node 2\n(Kubelet)', icon: '💪', color: '#06d6a0' }
      ]
    },
    {
      type: 'game',
      title: 'Challenge: Master vs Worker',
      content: 'Drag the components to their correct architectural home.',
      gameType: 'drag-classify',
      gameData: {
        categories: [
          { id: 'master', label: 'Control Plane (Master)' },
          { id: 'worker', label: 'Worker Node' }
        ],
        items: [
          { id: 'api', label: 'API Server', categoryId: 'master' },
          { id: 'etcd', label: 'etcd Database', categoryId: 'master' },
          { id: 'scheduler', label: 'Scheduler', categoryId: 'master' },
          { id: 'kubelet', label: 'Kubelet', categoryId: 'worker' },
          { id: 'proxy', label: 'Kube-Proxy', categoryId: 'worker' },
          { id: 'runtime', label: 'Container Runtime', categoryId: 'worker' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-2-q1',
      question: 'Which component serves as the cluster\'s fundamental "Brain and Memory", storing all state information?',
      options: ['Kubelet', 'Kube-Proxy', 'The API Server', 'etcd'],
      correct: 3,
      explanation: '`etcd` is arguably the most critical component. It is the highly-available dictionary where Kubernetes stores all data. If you lose your etcd data cleanly, your cluster forgets everything.'
    },
    {
      id: 'k8s-2-q2',
      question: 'When you type a command into your terminal to deploy an app, which component receives it?',
      options: ['The Worker node directly', 'The Scheduler', 'The API Server', 'The Container Runtime'],
      correct: 2,
      explanation: 'The `kube-apiserver` acts as the grand central station. No component bypasses it; everything, including UI dashboards, CLIs, and internal nodes, must talk to the API Server.'
    },
    {
      id: 'k8s-2-q3',
      question: 'What is the primary job of the Kubelet?',
      options: [
        'To route external internet traffic into the cluster',
        'To store secret passwords',
        'To ensure that containers scheduled to its specific node are actively running and healthy',
        'To schedule pods to other nodes'
      ],
      correct: 2,
      explanation: 'The Kubelet is the local agent on every worker node. It registers the node with the cluster and ensures the containers it was assigned are actually running.'
    }
  ]
}
