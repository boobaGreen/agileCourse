import type { Module } from '../../types'

export const k8s5: Module = {
  id: 'k8s-5',
  track: 'k8s',
  order: 5,
  title: 'Services & Networking',
  subtitle: 'Connecting the dots',
  emoji: '🌐',
  duration: '25 min',
  xpReward: 150,
  sections: [
    {
      type: 'intro',
      content: 'Pods are mortal. They die, they restart, and when they do, **they get a new IP address**. If your Frontend talks to your Backend via an IP address, your app breaks the moment a pod restarts. We need a stable identifier. We need a **Service**.'
    },
    {
      type: 'concept',
      title: '🌉 What is a Service?',
      content: 'A Service creates a static, permanent IP address and a DNS name (e.g., `backend-service`) that NEVER changes. \n\nWhen traffic hits the Service, the Service acts as a load balancer, instantly forwarding the request to one of the healthy backend Pods.'
    },
    {
      type: 'flowchart',
      content: '**The Service Load Balancer**',
      diagramSteps: [
        { label: 'Frontend Pod\n(Makes Request)', icon: '📱', color: '#118ab2' },
        { label: 'Backend Service\n(Stable static IP)', icon: '🚦', color: '#ffb703' },
        { label: 'Any Healthy Pod\n(Dynamic IP)', icon: '🫛', color: '#06d6a0' }
      ]
    },
    {
      type: 'video',
      title: '📺 Services vs Ingress',
      content: 'A great visual comparison of how traffic flows internally vs from the public internet.',
      videoUrl: 'https://www.youtube.com/watch?v=T4Z7visMM4E'
    },
    {
      type: 'table',
      title: '🌍 Types of Services',
      content: 'Depending on who needs to make the connection:',
      tableData: {
        headers: ['Service Type', 'Who can access it?', 'Use case'],
        rows: [
          ['**ClusterIP** (Default)', 'ONLY other pods inside the cluster.', 'Your Database Service. High security.'],
          ['**NodePort**', 'External traffic, but using a weird port (30000+).', 'Quick dev tests. Unprofessional for prod.'],
          ['**LoadBalancer**', 'The entire open internet.', 'Spins up an expensive AWS/Azure Load Balancer.']
        ]
      }
    },
    {
      type: 'concept',
      title: '🚪 Enter the Ingress',
      content: 'A `LoadBalancer` service is expensive. If you have 5 web apps, you don\'t want to pay for 5 AWS Load Balancers. \n\nInstead, you deploy ONE **Ingress Controller**. It is a smart router (like Nginx) that sits at the front door. It looks at the URL requested (e.g. `myapp.com/api`) and routes the traffic to the correct internal ClusterIP service.'
    }
  ],
  quiz: [
    {
      id: 'k8s-5-q1',
      question: 'Why should you NOT hardcode the IP address of a Pod into your application configuration?',
      options: [
        'Pods do not have IP addresses',
        'Because K8s IP addresses are only 4 digits long',
        'Because Pods are ephemeral; when a pod is destroyed and recreated (which is frequent), its new replica will receive a totally different IP address.',
        'IP addresses cost money inside the cluster'
      ],
      correct: 2,
      explanation: 'K8s networking assumes constant death and rebirth. You MUST use a `Service` to abstract away the dynamic Pod IPs into a single, permanent DNS hostname.'
    },
    {
      id: 'k8s-5-q2',
      question: 'You have a backend NodeJS API pod, and a PostgreSQL database pod. Which Service type should you place in front of the PostgreSQL pod to ensure maximum security?',
      options: [
        'LoadBalancer',
        'Ingress',
        'NodePort',
        'ClusterIP'
      ],
      correct: 3,
      explanation: '`ClusterIP` completely blocks external internet traffic. Only other pods INSIDE the cluster can reach the database. This is the gold standard for backend resource security.'
    }
  ]
}
