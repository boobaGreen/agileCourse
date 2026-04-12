import { motion } from 'framer-motion'
import { ExternalLink, Award, CheckCircle, Zap } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const certPaths = [
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

export default function CertRoadmapPage() {
  const { badges } = useAppStore()
  const earnedBadgeIds = badges.map(b => b.id)

  return (
    <div className="animate-fade-up w-full">
      <div className="mb-8">
        <h1 className="text-3xl fw-black text-white flex items-center gap-3">
          <Award size={28} className="text-k8s" /> Professional Roadmap
        </h1>
        <p className="text-muted mt-1">Your internal badges are the first step to global certifications</p>
      </div>

      <div className="card p-6 border-primary/20 bg-primary/5 mb-10 leading-relaxed text-sub text-sm">
        DevHarbor curriculum is designed in alignment with the **Linux Foundation (CNCF)** and 
        **Cloud provider** standards. Below is the mapping of your current progress to official industry certifications.
      </div>

      <div className="flex flex-col gap-12 mb-20">
        {certPaths.map((path, i) => (
          <motion.div
            key={path.category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl fw-black text-white">{path.category}</h2>
              <div className="flex-1 h-px bg-border opacity-50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {path.certs.map((cert) => {
                const isReady = earnedBadgeIds.includes(path.badge)
                return (
                  <div key={cert.name} className="card p-5 group hover:border-white/20 transition-all flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <span className="badge-pill bg-surface text-muted mono">EXAM: {cert.level}</span>
                      {isReady && (
                        <div className="text-green flex items-center gap-1 text-[10px] fw-black uppercase">
                          <CheckCircle size={10} /> Prepared
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg fw-bold text-white group-hover:text-primary transition-colors">{cert.name}</h3>
                    <p className="text-muted text-xs leading-relaxed flex-1">{cert.description}</p>
                    
                    <div className="flex flex-wrap gap-2 my-2">
                       {cert.topics.map(t => (
                         <span key={t} className="text-[9px] fw-bold bg-white/5 border border-border px-2 py-0.5 rounded-full text-sub">{t}</span>
                       ))}
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                       <div className="flex items-center gap-1 text-[10px] text-muted">
                         Badge req: <span className="text-sub fw-bold">#{path.badge}</span>
                       </div>
                       <a href={cert.url} target="_blank" rel="noopener" className="text-primary hover:underline text-xs fw-bold flex items-center gap-1">
                         Official Site <ExternalLink size={12} />
                       </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center p-8 text-muted text-[10px] opacity-40">
        DevHarbor is an internal tool to help you grow. Official exam vouchers and training materials 
        remain subject to company policy and official vendor availability.
      </div>
    </div>
  )
}

// Dummy for Zap
const BookOpen = (props: any) => <Zap {...props} />
const Container = (props: any) => <Zap {...props} />
const Anchor = (props: any) => <Zap {...props} />
