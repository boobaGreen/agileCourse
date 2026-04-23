export const certPaths = [
  {
    category: 'Git & Collaboration',
    color: 'var(--color-git)',
    badge: 'git-branching',
    certs: [
      {
        name: 'GitHub Foundations',
        level: 'Entry',
        url: 'https://examregistration.github.com',
        description: 'Covers core GitHub concepts: repositories, pull requests, issues, and basic team collaboration.',
        topics: ['History', 'Workflow', 'Branching', 'PRs'],
      },
      {
        name: 'GitLab Fundamentals',
        level: 'Associate',
        url: 'https://about.gitlab.com/learn/certifications/',
        description: 'Focuses on the GitLab ecosystem, CI/CD basic pipelines, and DevSecOps fundamentals.',
        topics: ['Pipelines', 'MRs', 'Registry', 'Security'],
      },
    ],
  },
  {
    category: 'Containerization',
    color: 'var(--color-docker)',
    badge: 'docker-harbor',
    certs: [
      {
        name: 'Docker Certified Associate',
        level: 'Professional',
        url: 'https://training.mirantis.com/dca-certification-exam/',
        description: 'The definitive recognition for Docker experts. Significant hands-on experience required.',
        topics: ['Dockerfile', 'Orchestration', 'Net/Vol', 'Security'],
      },
    ],
  },
  {
    category: 'Orchestration',
    color: 'var(--color-k8s)',
    badge: 'k8s-helmsman',
    certs: [
      {
        name: 'KCNA (Cloud Native Associate)',
        level: 'Entry',
        url: 'https://training.linuxfoundation.org/certification/kubernetes-cloud-native-associate/',
        description: 'Knowledge-based cert for the entire cloud native landscape. Entry point for Kubernetes.',
        topics: ['K8s Architecture', 'Containers', 'Observability'],
      },
      {
        name: 'CKAD (Application Developer)',
        level: 'Hands-on',
        url: 'https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/',
        description: 'A 2-hour practical exam where you solve real-world tasks on a live cluster.',
        topics: ['Deployment', 'Networking', 'Config', 'Storage'],
      },
      {
        name: 'CKA (Administrator)',
        level: 'Expert',
        url: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/',
        description: 'Deep dive into cluster administration, networking, and expert troubleshooting.',
        topics: ['Cluster Ops', 'Storage', 'Troubleshooting'],
      },
    ],
  },
]
