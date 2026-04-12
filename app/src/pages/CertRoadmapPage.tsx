import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Award, CheckCircle, Filter, Zap, Clock } from 'lucide-react'
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
  const { badges, completedModules } = useAppStore()
  const earnedBadgeIds = badges.map(b => b.id)
  const [filter, setFilter] = useState<'all' | 'ready' | 'progress'>('all')

  const filteredPaths = useMemo(() => {
    return certPaths.map(path => ({
      ...path,
      certs: path.certs.filter(() => {
        const isReady = earnedBadgeIds.includes(path.badge)
        if (filter === 'ready') return isReady
        if (filter === 'progress') {
          if (isReady) return false
          // Check if at least one module of this track has been completed
          const trackPrefix = path.badge.split('-')[0]
          return completedModules.some(m => m.startsWith(trackPrefix + '-'))
        }
        return true
      })
    })).filter(path => path.certs.length > 0)
  }, [filter, earnedBadgeIds, completedModules])

  return (
    <div className="animate-fade-up w-full max-w-5xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl fw-black text-white flex items-center gap-3">
            <Award size={32} className="text-k8s" /> Career <span className="text-primary">Roadmap</span>
          </h1>
          <p className="text-muted mt-1">Scale the DevOps mountain from internal fundamentals to global mastery.</p>
        </div>

        <div className="flex bg-surface/50 p-1 rounded-xl border border-white/5 gap-1">
          {[
            { id: 'all', label: 'All Exams', icon: Filter },
            { id: 'ready', label: 'Ready', icon: CheckCircle },
            { id: 'progress', label: 'In Progress', icon: Clock },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as 'all' | 'ready' | 'progress')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs fw-bold transition-all ${
                filter === btn.id 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <btn.icon size={14} /> {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative pl-8 md:pl-0">
        {/* Central vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-purple-500/50 to-k8s/50 opacity-20 hidden md:block" />
        <div className="absolute left-4 md:hidden top-0 bottom-0 w-1 bg-border opacity-20" />

        <div className="flex flex-col gap-12 relative z-10">
          <AnimatePresence mode="popLayout">
            {filteredPaths.map((path) => (
              <div key={path.category} className="relative">
                {/* Category Header (Center) */}
                <div className="flex justify-center mb-10">
                   <div className="bg-surface2 px-6 py-2 rounded-full border border-white/10 shadow-xl relative z-20">
                     <h2 className="text-sm fw-black text-white uppercase tracking-[0.3em]" style={{ color: path.color }}>
                       {path.category}
                     </h2>
                   </div>
                </div>

                <div className="flex flex-col gap-8">
                  {path.certs.map((cert, certIdx) => {
                    const isReady = earnedBadgeIds.includes(path.badge)
                    const isEven = certIdx % 2 === 0
                    
                    return (
                      <motion.div
                        key={cert.name}
                        layout
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`flex w-full ${isEven ? 'md:justify-start' : 'md:justify-end'} justify-start`}
                      >
                        <div className={`relative w-full md:w-[45%] group`}>
                          {/* Connection Dot */}
                          <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-surface shadow-lg z-30
                            ${isEven ? 'md:-right-[11%] -left-[30px] md:left-auto' : 'md:-left-[11.5%] -left-[30px]'}
                          `} style={{ backgroundColor: isReady ? 'var(--color-green)' : 'var(--color-border)' }} />

                          {/* Connection Line (Desktop) */}
                          <div className={`absolute top-1/2 -translate-y-1/2 h-1 bg-white/5 hidden md:block
                            ${isEven ? 'left-full w-[11%]' : 'right-full w-[11%]'}
                          `} />

                          <div className={`card p-6 border-white/10 hover:border-white/20 transition-all bg-surface/80 backdrop-blur-sm relative`}>
                            <div className="flex justify-between items-start mb-4">
                              <span className="badge-pill bg-surface2 text-muted mono text-[10px]">LVL: {cert.level}</span>
                              {isReady ? (
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-green flex items-center gap-1 text-[10px] fw-black uppercase">
                                  <CheckCircle size={12} /> Ready to test
                                </motion.div>
                              ) : (
                                <div className="text-sub flex items-center gap-1 text-[10px] fw-black uppercase">
                                  <Clock size={12} /> Training...
                                </div>
                              )}
                            </div>
                            
                            <h3 className="text-xl fw-black text-white group-hover:text-primary transition-colors mb-2">{cert.name}</h3>
                            <p className="text-muted text-xs leading-relaxed mb-4">{cert.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-6">
                               {cert.topics.map(t => (
                                 <span key={t} className="text-[9px] fw-bold bg-white/5 border border-border px-2 py-0.5 rounded-full text-sub">{t}</span>
                               ))}
                            </div>

                            <div className="pt-4 border-t border-border flex items-center justify-between">
                               <div className="flex items-center gap-2 text-[10px] text-muted">
                                 <Zap size={10} style={{ color: path.color }} />
                                 Requires: <span className="text-sub fw-bold">#{path.badge}</span>
                               </div>
                               <a href={cert.url} target="_blank" rel="noopener" className="btn btn-primary h-8 px-3 text-[10px] gap-1">
                                 Syllabus <ExternalLink size={10} />
                               </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-20 card p-8 bg-blue-500/5 border-blue-500/10 text-center">
        <p className="text-blue-400 text-sm fw-bold mb-2">💡 Pro Tip</p>
        <p className="text-sub text-sm max-w-2xl mx-auto leading-relaxed">
          Official exam vouchers are often covered by our professional development budget. 
          Once you've unlocked the <span className="text-white fw-bold">Ready</span> status for an exam, 
          reach out to your mentor to request the certification attempt!
        </p>
      </div>
    </div>
  )
}


