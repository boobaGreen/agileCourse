import type { Module } from '../../types'

export const k8s7: Module = {
  id: 'k8s-7',
  track: 'k8s',
  order: 7,
  title: 'Storage & Persistence',
  subtitle: 'Where data goes to survive',
  emoji: '💾',
  duration: '20 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: 'Just like Docker, Kubernetes Pods are entirely ephemeral. When a pod is deleted, everything on its local disk is utterly wiped out. For a frontend app this is fine. For a Database, it\'s a disaster. Kubernetes introduces a complex but brilliant dual-layer system for permanent storage.'
    },
    {
      type: 'video',
      title: '📺 Kubernetes Storage Explained',
      content: 'Understand why the PV and PVC objects are intentionally separated.',
      videoUrl: 'https://www.youtube.com/watch?v=0swOh5C3OVM'
    },
    {
      type: 'concept',
      title: '💽 Persistent Volumes (PV)',
      content: 'A PV is the actual physical representation of storage. It is an AWS EBS drive, an Azure Disk, or an NFS share pre-provisioned by your infrastructure admin. It sits in the cluster, completely separate from any pods, waiting to be used.'
    },
    {
      type: 'concept',
      title: '📜 Persistent Volume Claims (PVC)',
      content: 'A PVC is a **request** by a Pod. \n\nThink of a PV as an empty hotel room. The PVC is the reservation ticket. \nThe application developer writes a PVC saying: "I need 10GB of fast SSD storage." \nKubernetes then searches the available PVs. If it finds a match, it **Binds** them together. The Pod then mounts the PVC.'
    },
    {
      type: 'flowchart',
      content: '**Separation of Concerns: DevOps vs Devs**',
      diagramSteps: [
        { label: 'Cloud Admin\nCreates PV (100GB Disk)', icon: '☁️', color: '#118ab2' },
        { label: 'Kubernetes\n(Binding Layer)', icon: '🤝', color: '#ffb703' },
        { label: 'Developer\nRequests PVC (10GB)', icon: '📝', color: '#06d6a0' },
        { label: 'Pod\nMounts PVC', icon: '🫛', color: '#06d6a0' }
      ]
    },
    {
      type: 'game',
      title: 'Terminal: Diagnosing State',
      content: 'Common status checks every admin does.',
      gameType: 'terminal-sim',
      gameData: {
        startText: 'k8s-admin@k8s-master:~$ ',
        steps: [
          {
            instruction: 'List your Persistent Volume Claims to see their statuses. Type: kubectl get pvc',
            expectedCommand: 'kubectl get pvc',
            output: 'NAME          STATUS    VOLUME   CAPACITY   ACCESS MODES   AGE\npg-data-pvc   Bound     pvc-x7   5Gi        RWO            10d\nminio-pvc     Pending                       RWO            2m'
          },
          {
            instruction: 'The minio-pvc is stuck in "Pending". We need clues. Describe it using the describe command. Type: kubectl describe pvc minio-pvc',
            expectedCommand: 'kubectl describe pvc minio-pvc',
            output: '...\nEvents:\n  Type     Reason              Age               From                         Message\n  ----     ------              ----              ----                         -------\n  Warning  ProvisioningFailed  12s (x4 over 2m)  persistentvolume-controller  no volume plugin matched'
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-7-q1',
      question: 'What is the primary reason K8s splits storage into two objects (PV and PVC)?',
      options: [
        'To increase the speed of SSDs',
        'Separation of concerns: It allows Cloud Admins to deal with the exact hardware details (PV), while Developers only need to write generic requests for size and access modes (PVC).',
        'Because AWS requires it',
        'To allow K8s to compress the data automatically'
      ],
      correct: 1,
      explanation: 'A developer shouldn\'t have to know the exact ARN of an AWS disk. They just want 10GB of space. By splitting the logic, the file becomes portable. It works on AWS, and if moved to Azure, it binds to Azure disks transparently.'
    },
    {
      id: 'k8s-7-q2',
      question: 'If a PVC is stuck in the "Pending" state, what does it most likely mean?',
      options: [
        'The K8s cluster ran out of memory',
        'The Pod crashed inside',
        'Kubernetes could not find a physical volume (PV) that met the exact size and access requirements requested in the PVC.',
        'The base64 secret failed to decrypt'
      ],
      correct: 2,
      explanation: 'A claim must bind to a volume. If you ask for a 50GB fast SSD, and the cluster only has 10GB slow HDDs available, the claim stays Pending forever until an Admin provisions the right hardware.'
    }
  ]
}
