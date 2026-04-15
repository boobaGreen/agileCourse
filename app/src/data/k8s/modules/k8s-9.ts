import type { Module } from '../../types'

export const k8s9: Module = {
  id: 'k8s-9',
  track: 'k8s',
  order: 9,
  title: 'Final K8s Challenge',
  subtitle: 'The Helm Master Certification',
  emoji: '🥇',
  duration: '25 min',
  xpReward: 250,
  sections: [
    {
      type: 'intro',
      content: 'So you think you understand the orchestrator? Prove it. In this final challenge, you must use **Helm**, the Kubernetes package manager, to deploy a complete stack.'
    },
    {
      type: 'game',
      title: 'Certification Lab: The Helm Master',
      content: 'Install the "enterprise-stack" chart using Helm. It will provision everything: Redis, the backend, and secrets.',
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'prod-cluster', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: []
        },
        tasks: [
          { id: '1', instruction: 'Install the chart: `helm install enterprise-stack ./my-chart`', condition: 'PODS_RUNNING:3' },
          { id: '2', instruction: 'Verify the release is running: `kubectl get pods`', condition: 'PODS_RUNNING:3' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-9-q1',
      question: 'Which component physically resides on the Worker Nodes (not the Control Plane)?',
      options: ['etcd database', 'Kubelet', 'Kube-apiserver', 'Controller Manager'],
      correct: 1,
      explanation: 'Kubelet is the local agent on every worker node that reports back to the master.'
    },
    {
      id: 'k8s-9-q2',
      question: 'Under normal K8s best practices, how should you scale a web application from 1 to 5 instances?',
      options: [
        'Run `kubectl run web --replicas=5`',
        'Deploy 5 separate individual Pod YAMLs',
        'Change the `replicas: 5` property in the existing Deployment YAML and `kubectl apply` it.',
        'Manually provision 4 more worker nodes'
      ],
      correct: 2,
      explanation: 'Kubernetes relies on declarative Deployments. Altering the `replicas` field in the file and reapplying it is the standard GitOps way.'
    },
    {
      id: 'k8s-9-q3',
      question: 'You type `kubectl get pods` and see a pod\'s status is `ImagePullBackOff`. What is the most likely cause?',
      options: [
        'The application script crashed with a stack trace error',
        'Kubernetes could not download the container image (perhaps a typo in the image name, or the image is perfectly private and lacks credentials)',
        'The cluster ran out of CPU resources',
        'The API server is currently offline'
      ],
      correct: 1,
      explanation: '`ImagePullBackOff` explicitly means the Container Runtime failed to pull the image from the registry (Hub/ECR). The pod hasn\'t even started executing code yet.'
    },
    {
      id: 'k8s-9-q4',
      question: 'True or False: A ClusterIP Service allows public internet users to access your frontend Pods.',
      options: ['True', 'False'],
      correct: 1,
      explanation: 'False. ClusterIP is strictly for internal cluster-only communication.'
    },
    {
      id: 'k8s-9-q5',
      question: 'What is the function of an Ingress Resource?',
      options: [
        'It deletes old containers',
        'It encrypts Secret data in etcd',
        'It acts as an intelligent Nginx/HAProxy load balancer managing external URL routing rules (e.g. sending /api traffic to the backend, and / traffic to the frontend).',
        'It manages the deployment rollout process'
      ],
      correct: 2,
      explanation: 'Ingress is a smart layer 7 router at the front of the cluster.'
    },
    {
      id: 'k8s-9-q6',
      question: 'If a worker node catches fire and completely dies, what does a Deployment controller do?',
      options: [
        'Nothing, it awaits admin commands',
        'It immediately re-creates the missing Pods by scheduling them onto surviving, healthy Worker nodes',
        'It sends an email via SendGrid',
        'It shuts down the cluster to prevent data corruption'
      ],
      correct: 1,
      explanation: 'This is the self-healing power. The controller notices 3 active pods dropped to 1, and commands the scheduler to provision 2 new ones instantly.'
    },
    {
      id: 'k8s-9-q7',
      question: 'Regarding storage, what is the role of a PVC?',
      options: [
        'To format the hard drive on a worker node',
        'To encrypt the volume data',
        'To act as a flexible "request" or "claim" ticket from the developer asking the cluster for an appropriate amount of storage.',
        'To define persistent variables'
      ],
      correct: 2,
      explanation: 'A Persistent Volume Claim (PVC) is the developer\'s abstract request for storage hardware.'
    },
    {
      id: 'k8s-9-q8',
      question: 'You type `kubectl get pods` and see a pod\'s status is `CrashLoopBackOff`. You run `kubectl logs <pod-name>`. What are you hoping to find?',
      options: [
        'Kubelet authorization failure messages',
        'Node resource starvation metrics',
        'The actual stack trace error outputted by your application crashing (e.g. Runtime Exception or DB Timeout)',
        'Docker pull errors'
      ],
      correct: 2,
      explanation: '`CrashLoopBackOff` means the container starts running, crashes, restarts, and crashes again. The `logs` command outputs the std-out/std-err of the app, revealing the code issue.'
    },
    {
      id: 'k8s-9-q9',
      question: 'Where is the safest and most proper place to store a third-party API Access Token for your application in K8s?',
      options: [
        'Hardcoded into the Docker Image',
        'As a Kubernetes ConfigMap',
        'As a Kubernetes Secret',
        'Inside the Deployment YAML as plaintext'
      ],
      correct: 2,
      explanation: 'You must use a K8s Secret. While it\'s technically similar to a ConfigMap, Secrets are mounted securely into RAM (tmpfs) on worker nodes to prevent them from landing on physical disk drives.'
    },
    {
      id: 'k8s-9-q10',
      question: 'What happens to the data inside a container\'s default writable filesystem when a naked Pod is deleted?',
      options: [
        'It is backed up to etcd',
        'It is completely and irreversibly destroyed along with the Pod',
        'It transfers instantly to the new Pod',
        'It is converted to a PV automatically'
      ],
      correct: 1,
      explanation: 'Without mounted Volumes, ALL data inside a container/pod is totally completely ephemeral.'
    }
  ]
}
