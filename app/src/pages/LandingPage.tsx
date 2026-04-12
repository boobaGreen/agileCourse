import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { ArrowRight, Sparkles } from 'lucide-react'

const tracks = [
  {
    id: 'git',
    emoji: '🔴',
    title: 'Git',
    tagline: 'The Version Time Machine',
    description: 'Master distributed version control from first commit to team workflows.',
    color: 'var(--color-git)',
    available: true,
  },
  {
    id: 'docker',
    emoji: '🐳',
    title: 'Docker',
    tagline: 'The Whale That Ships Everything',
    description: 'Containerize and ship apps anywhere with lightweight isolation.',
    color: 'var(--color-docker)',
    available: false,
  },
  {
    id: 'k8s',
    emoji: '☸️',
    title: 'Kubernetes',
    tagline: 'The Helmsman of the Fleet',
    description: 'Orchestrate containers at scale with pods and automation.',
    color: 'var(--color-k8s)',
    available: false,
  },
]

export default function LandingPage() {
  const [name, setName] = useState('')
  const [step, setStep] = useState<'name' | 'choose'>('name')
  const setUserName = useAppStore((s) => s.setUserName)
  const navigate = useNavigate()

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2) return
    setUserName(name.trim())
    setStep('choose')
  }

  return (
    <div className="gradient-bg min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? 'var(--color-git)' : i % 3 === 1 ? 'var(--color-docker)' : 'var(--color-k8s)',
            }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'name' ? (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="text-5xl mb-4 animate-float">⚓</div>
              <h1 className="text-4xl fw-black text-white tracking-tight">
                Dev<span className="text-git">Harbor</span>
              </h1>
              <p className="text-sub mt-2">Internal Training Platform</p>
            </div>

            <div className="card p-8">
              <h2 className="text-lg fw-bold text-white mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-git" /> Welcome Learner
              </h2>
              <form onSubmit={handleNameSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter your name..."
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-surface2 border border-border p-4 rounded-xl text-white outline-none focus:border-git transition-colors"
                />
                <button
                  type="submit"
                  disabled={name.trim().length < 2}
                  className={`btn btn-git py-4 text-lg justify-center ${name.trim().length < 2 ? 'opacity-30' : ''}`}
                >
                  Enter Harbor <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="choose"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl fw-black text-white">Welcome, {name}!</h2>
              <p className="text-muted mt-2 text-lg font-medium">Select your first destination</p>
            </div>

            <div className="page-grid-3">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => track.available && navigate('/dashboard')}
                  className={`card p-6 flex flex-col gap-4 relative overflow-hidden transition-all ${track.available ? 'cursor-pointer hover:scale-105 hover:bg-surface2' : 'opacity-40 grayscale'}`}
                  style={{ borderColor: track.available ? track.color + '40' : undefined }}
                >
                  <div className="text-4xl">{track.emoji}</div>
                  <div>
                    <h3 className="text-xl fw-bold text-white mb-1">{track.title}</h3>
                    <p className="text-xs fw-black uppercase tracking-widest" style={{ color: track.color }}>{track.tagline}</p>
                  </div>
                  <p className="text-muted text-sm leading-relaxed flex-1">{track.description}</p>
                  
                  <div className="mt-4 pt-4 border-t flex justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-xs text-sub fw-med">9 Modules</span>
                    {track.available ? (
                      <span className="text-xs fw-bold text-git">Start Learning →</span>
                    ) : (
                      <span className="text-xs fw-bold text-muted">Locked</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
