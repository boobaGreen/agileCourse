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
        'Run the imperative command `kubectl run web --replicas=5` directly',
        'Deploy 5 separate individual Pod YAML manifests to the current cluster',
        'Update the `replicas` count in the Deployment YAML and apply it',
        'Manually provision exactly 4 more worker nodes to handle the load'
      ],
      correct: 2,
      explanation: 'Kubernetes relies on declarative Deployments. Altering the `replicas` field in the file and reapplying it is the standard GitOps way.'
    },
    {
      id: 'k8s-9-q3',
      question: 'You type `kubectl get pods` and see a pod\'s status is `ImagePullBackOff`. What is the most likely cause?',
      options: [
        'The application script crashed with a severe internal stack trace error',
        'Kubernetes could not download the container image from the registry',
        'The cluster has completely ran out of available CPU or RAM resources',
        'The Kubernetes API server is currently offline and unreachable by nodes'
      ],
      correct: 1,
      explanation: '`ImagePullBackOff` explicitly means the Container Runtime failed to pull the image from the registry (Hub/ECR). The pod hasn\'t even started executing code yet.'
    },
    {
      id: 'k8s-9-q4',
      question: 'True or False: A ClusterIP Service allows public internet users to access your frontend Pods.',
      options: ['True (Public Access)', 'False (Internal Only)'],
      correct: 1,
      explanation: 'False. ClusterIP is strictly for internal cluster-only communication.'
    },
    {
      id: 'k8s-9-q5',
      question: 'What is the function of an Ingress Resource?',
      options: [
        'It deletes old containers and ephemeral filesystem layers automatically',
        'It encrypts Secret data using etcd and manages internal cluster networking',
        'It acts as an intelligent URL-based load balancer for external routing',
        'It manages the deployment rollout process and health checks for pods'
      ],
      correct: 2,
      explanation: 'Ingress is a smart layer 7 router at the front of the cluster.'
    },
    {
      id: 'k8s-9-q6',
      question: 'If a worker node catches fire and completely dies, what does a Deployment controller do?',
      options: [
        'Nothing, it awaits manual intervention or admin commands to restore state',
        'It re-creates the missing Pods by scheduling them onto healthy Worker nodes',
        'It sends an automatic email via SendGrid to the registered cluster admin',
        'It shuts down the entire cluster to prevent any potential data corruption'
      ],
      correct: 1,
      explanation: 'This is the self-healing power. The controller notices 3 active pods dropped to 1, and commands the scheduler to provision 2 new ones instantly.'
    },
    {
      id: 'k8s-9-q7',
      question: 'Regarding storage, what is the role of a PVC?',
      options: [
        'To format the physical hard drive on a worker node for local storage usage',
        'To encrypt the volume data and ensure safe communication between pods',
        'To act as a "request" or "claim" ticket from the developer for storage',
        'To define persistent environment variables for the application containers'
      ],
      correct: 2,
      explanation: 'A Persistent Volume Claim (PVC) is the developer\'s abstract request for storage hardware.'
    },
    {
      id: 'k8s-9-q8',
      question: 'You type `kubectl get pods` and see a pod\'s status is `CrashLoopBackOff`. You run `kubectl logs <pod-name>`. What are you hoping to find?',
      options: [
        'Kubelet authorization and authentication failure logs from the node',
        'Node resource starvation metrics and cluster-wide performance data',
        'The actual application stack trace or error output from the container crash',
        'Docker image pull errors and container runtime permission issues'
      ],
      correct: 2,
      explanation: '`CrashLoopBackOff` means the container starts running, crashes, restarts, and crashes again. The `logs` command outputs the std-out/std-err of the app, revealing the code issue.'
    },
    {
      id: 'k8s-9-q9',
      question: 'Where is the safest and most proper place to store a third-party API Access Token for your application in K8s?',
      options: [
        'Hardcoded directly into the Docker Image layers',
        'As a standard plain-text Kubernetes ConfigMap',
        'As a secure and encrypted Kubernetes Secret',
        'Inside the Deployment YAML manifest as plaintext'
      ],
      correct: 2,
      explanation: 'You must use a K8s Secret. While it\'s technically similar to a ConfigMap, Secrets are mounted securely into RAM (tmpfs) on worker nodes to prevent them from landing on physical disk drives.'
    },
    {
      id: 'k8s-9-q10',
      question: 'What happens to the data inside a container\'s default writable filesystem when a naked Pod is deleted?',
      options: [
        'It is automatically backed up to the etcd database state',
        'It is completely and irreversibly destroyed along with the Pod instance',
        'It transfers instantly and transparently to the new replacement Pod',
        'It is converted to a Persistent Volume (PV) automatically by the cluster'
      ],
      correct: 1,
      explanation: 'Without mounted Volumes, ALL data inside a container/pod is totally completely ephemeral.'
    }
  ]
}
