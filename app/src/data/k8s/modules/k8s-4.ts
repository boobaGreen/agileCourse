import type { Module } from '../../types'

export const k8s4: Module = {
  id: 'k8s-4',
  track: 'k8s',
  order: 4,
  title: 'Deployments & Self-Healing',
  subtitle: 'Declaring the desired state',
  emoji: '📄',
  duration: '25 min',
  xpReward: 150,
  sections: [
    {
      type: 'intro',
      content: 'As we saw, you should never create individual Pods manually. If a naked Pod crashes, it\'s gone forever. We want K8s to maintain a **desired state** (e.g. "I always want 3 copies of this app running"). We achieve this using a **Deployment**.'
    },
    {
      type: 'video',
      title: '📺 Imperative vs Declarative',
      content: 'Understand why Kubernetes uses a Declarative system instead of a list of bash scripts.',
      videoUrl: 'https://www.youtube.com/watch?v=pPQKAR1pA9U'
    },
    {
      type: 'concept',
      title: '📄 The Deployment YAML',
      content: 'A Deployment is a YAML file where you say: \n\n"I want a Deployment named *my-app*. I want exactly *3 replicas* (Pods). Use the container image *node:18*."\n\nKubernetes constantly reads this file. If it sees only 2 Pods running, it spins up a 3rd. If it sees 4, it assassinates 1. It is a tireless robot enforcing your will.'
    },
    {
      type: 'code',
      title: 'Look at a real Deployment YAML',
      content: 'Notice the `replicas: 3` and the `template`, which is basically an embedded Pod definition.',
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:         # Everything below here is the blueprint for the Pods!
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
        ports:
        - containerPort: 80`,
      language: 'yaml'
    },
    {
      type: 'table',
      title: '🚀 Rollouts (Zero-Downtime Updates)',
      content: 'Deployments allow you to update your application without anyone noticing.',
      tableData: {
        headers: ['Action', 'What K8s does automatically under the hood', 'Result'],
        rows: [
          ['Update image to v2', 'Spins up a new v2 pod. Waits for it to be healthy.', 'No downtime'],
          ['v2 pod is Ready', 'Shuts down one of the old v1 pods.', 'Traffic smoothly shifts'],
          ['Repeat', 'Continues rolling out 1 by 1 until all are v2.', '100% updated safely'],
          ['Wait, v2 crashes!', 'Deployment halts! Old v1 pods are kept alive.', 'Vast majority of users unaffected']
        ]
      }
    },
    {
      type: 'game',
      title: 'Lab: The Self-Healing Cluster',
      content: 'Experience the power of Declarative state. In this lab, you\'ll try to break the cluster, only to see K8s fix it for you automatically.',
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'worker-1', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: []
        },
        tasks: [
          { id: '1', instruction: 'Apply the web deployment manifest: `kubectl apply -f web.yml`', condition: 'DEPLOYMENT_EXISTS:web-deployment' },
          { id: '2', instruction: 'Delete one of the pods (get the name first with `kubectl get pods`)', condition: 'PODS_RUNNING:3' },
          { id: '3', instruction: 'Scale the deployment to 6 replicas: `kubectl scale deployment/web-deployment --replicas=6`', condition: 'REPLICAS:web-deployment:6' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-4-q1',
      question: 'Why is a declarative approach (writing YAML files) better than an imperative approach (running terminal scripts sequentially)?',
      options: [
        'Imperative approaches cannot run on Linux servers',
        'Declarative files tell K8s exactly what the END RESULT should be, allowing the system to handle the complexity, self-healing, and drift-correction automatically.',
        'Declarative approaches use less CPU',
        'Declarative files are impossible to delete'
      ],
      correct: 1,
      explanation: 'If a node dies in an imperative script, you have to write a script to detect and fix it. In a declarative system, you simply stated "I want 3 pods." The system constantly acts to make reality match that file.'
    },
    {
      id: 'k8s-4-q2',
      question: 'During a Rolling Update with a Deployment, what happens if the newly deployed v2 Pod immediately crashes?',
      options: [
        'The entire cluster reboots',
        'The update proceeds anyway, destroying all old v1 pods',
        'The Deployment halts the rollout indefinitely until human intervention, preserving the remaining v1 pods so the app doesn\'t go totally offline',
        'The database is wiped'
      ],
      correct: 2,
      explanation: 'A key feature of Deployments is that they verify "readiness" of new pods. If the new pod crashes (e.g. `CrashLoopBackOff`), the rollout stops, preventing a catastrophic 100% outage.'
    }
  ]
}
