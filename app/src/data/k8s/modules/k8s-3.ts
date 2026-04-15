import type { Module } from '../../types'

export const k8s3: Module = {
  id: 'k8s-3',
  track: 'k8s',
  order: 3,
  title: 'Pods & kubectl',
  subtitle: 'The smallest atomic unit',
  emoji: '🫛',
  duration: '20 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: 'In Docker, the smallest unit is a Container. In Kubernetes, the smallest unit is a **Pod**. Kubernetes does not run individual containers; it runs Pods, which are wrappers that *contain* one or more containers.'
    },
    {
      type: 'concept',
      title: '🫛 Why Pods instead of Containers?',
      content: 'Why add a wrapper layer? Because sometimes, containers are forcefully coupled. \n\nImagine a Web Server container and a Logging container. By putting them in the **same Pod**, they are guaranteed to run on the exact same physical machine, share the same IP address, and share the same internal localhost network.'
    },
    {
      type: 'flowchart',
      content: '**The Pod Wrapper Structure**',
      diagramSteps: [
        { label: 'Node (Server)', icon: '🖥️', color: '#118ab2' },
        { label: 'Pod Environment\n(Shared IP)', icon: '🫛', color: '#06d6a0' },
        { label: 'Container 1\n(App)', icon: '📦', color: '#ffd166' },
        { label: 'Container 2\n(Logger)', icon: '📦', color: '#ffd166' }
      ]
    },
    {
      type: 'concept',
      title: '⌨️ The kubectl CLI',
      content: '`kubectl` (pronounced "kube-control" or "kube-cuddle") is the command line tool used to communicate with the API Server. It is the absolute daily-driver for a DevOps engineer.'
    },
    {
      type: 'table',
      title: '🛠️ Essential kubectl Commands',
      content: 'Memorize these, you will use them thousands of times.',
      tableData: {
        headers: ['Command', 'Purpose'],
        rows: [
          ['`kubectl get pods`', 'List all pods in the current namespace'],
          ['`kubectl describe pod [name]`', 'Show incredibly detailed info and events (vital for debugging)'],
          ['`kubectl logs [name]`', 'View the internal console logs of the containers in the pod'],
          ['`kubectl apply -f [file.yml]`', 'Create or update resources from a YAML definition file'],
          ['`kubectl delete pod [name]`', 'Destroy a pod (It will likely be immediately recreated!)']
        ]
      }
    },
    {
      type: 'game',
      title: 'Lab: Orchestrating an App',
      content: 'Let\'s deploy a real structure. In this lab, your `kubectl` commands will live-update the cluster topology above.',
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'minikube-worker', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: []
        },
        tasks: [
          { id: '1', instruction: 'Apply the deployment manifest: `kubectl apply -f nginx-deployment.yaml`', condition: 'DEPLOYMENT_EXISTS:nginx' },
          { id: '2', instruction: 'Expose the deployment with a service: `kubectl apply -f nginx-service.yaml`', condition: 'SERVICE_EXISTS:nginx-svc' },
          { id: '3', instruction: 'Scale the deployment to 3 replicas: `kubectl scale deployment/nginx --replicas=3`', condition: 'REPLICAS:nginx:3' },
          { id: '4', instruction: 'Verify you have at least 3 pods running: `kubectl get pods`', condition: 'PODS_RUNNING:3' }
        ]
      }
    },
    {
      type: 'tip',
      title: '💡 Wait, why did it come back?',
      content: 'Pods are mortal. When you deleted the Pod, Kubernetes immediately created a BRAND NEW one (`z9rtc`) to replace it. This is because Pods are managed by higher-level controllers (like Deployments) which enforce a desired state. Never make naked Pods!'
    }
  ],
  quiz: [
    {
      id: 'k8s-3-q1',
      question: 'What is true about containers inside the exact same Pod?',
      options: [
        'They must be written in the same programming language',
        'They share the exact same localhost network space and IP address',
        'They are automatically protected against infinite loops',
        'They cannot communicate with each other'
      ],
      correct: 1,
      explanation: 'Containers in the same pod share networking and storage. If Container A runs an app on port 8080, Container B can reach it simply by pinging `localhost:8080`.'
    },
    {
      id: 'k8s-3-q2',
      question: 'Which tool is the primary way human administrators give commands to the Kubernetes API server?',
      options: ['docker-compose', 'kubelet', 'kubectl', 'k8s-admin'],
      correct: 2,
      explanation: '`kubectl` translates human commands like `get pods` into secure REST API HTTP requests aimed at the cluster\'s Control Plane.'
    }
  ]
}
