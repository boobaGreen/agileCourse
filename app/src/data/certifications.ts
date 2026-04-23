export const certPaths = [
  {
    category: { en: 'Git & Collaboration', it: 'Git e Collaborazione' },
    color: 'var(--color-git)',
    badge: 'git-branching',
    certs: [
      {
        name: 'GitHub Foundations',
        level: 'Entry',
        url: 'https://examregistration.github.com',
        description: { en: 'Covers core GitHub concepts: repositories, pull requests, issues, and basic team collaboration.', it: 'Copre i concetti base di GitHub: repository, pull request, issue e collaborazione base del team.' },
        topics: ['History', 'Workflow', 'Branching', 'PRs'],
      },
      {
        name: 'GitLab Fundamentals',
        level: 'Associate',
        url: 'https://about.gitlab.com/learn/certifications/',
        description: { en: 'Focuses on the GitLab ecosystem, CI/CD basic pipelines, and DevSecOps fundamentals.', it: 'Si concentra sull\'ecosistema GitLab, pipeline CI/CD di base e fondamentali DevSecOps.' },
        topics: ['Pipelines', 'MRs', 'Registry', 'Security'],
      },
    ],
  },
  {
    category: { en: 'Containerization', it: 'Containerizzazione' },
    color: 'var(--color-docker)',
    badge: 'docker-harbor',
    certs: [
      {
        name: 'Docker Certified Associate',
        level: 'Professional',
        url: 'https://training.mirantis.com/dca-certification-exam/',
        description: { en: 'The definitive recognition for Docker experts. Significant hands-on experience required.', it: 'Il riconoscimento definitivo per gli esperti Docker. Richiesta una significativa esperienza pratica.' },
        topics: ['Dockerfile', 'Orchestration', 'Net/Vol', 'Security'],
      },
    ],
  },
  {
    category: { en: 'Orchestration', it: 'Orchestrazione' },
    color: 'var(--color-k8s)',
    badge: 'k8s-helmsman',
    certs: [
      {
        name: 'KCNA (Cloud Native Associate)',
        level: 'Entry',
        url: 'https://training.linuxfoundation.org/certification/kubernetes-cloud-native-associate/',
        description: { en: 'Knowledge-based cert for the entire cloud native landscape. Entry point for Kubernetes.', it: 'Certificazione basata sulla conoscenza dell\'intero panorama cloud native. Punto di ingresso per Kubernetes.' },
        topics: ['K8s Architecture', 'Containers', 'Observability'],
      },
      {
        name: 'CKAD (Application Developer)',
        level: 'Hands-on',
        url: 'https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/',
        description: { en: 'A 2-hour practical exam where you solve real-world tasks on a live cluster.', it: 'Un esame pratico di 2 ore in cui si risolvono task reali su un cluster live.' },
        topics: ['Deployment', 'Networking', 'Config', 'Storage'],
      },
      {
        name: 'CKA (Administrator)',
        level: 'Expert',
        url: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/',
        description: { en: 'Deep dive into cluster administration, networking, and expert troubleshooting.', it: 'Approfondimento sull\'amministrazione del cluster, networking e risoluzione dei problemi a livello esperto.' },
        topics: ['Cluster Ops', 'Storage', 'Troubleshooting'],
      },
    ],
  },
]
