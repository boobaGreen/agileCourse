import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { ArrowRight, Sparkles, GitBranch, Box, Workflow, Terminal, Database, Code2, type LucideIcon } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'


const PARTICLE_ICONS = [GitBranch, Box, Workflow, Terminal, Database, Code2]

interface Particle {
  Icon: LucideIcon
  isOdd: boolean
  left: string
  top: string
  color: string
  duration: number
  size: number
}

const STATIC_PARTICLES: Particle[] = [...Array(24)].map((_, i) => ({
  Icon: PARTICLE_ICONS[i % 6],
  isOdd: i % 2 === 0,
  left: `${(i * 13) % 100}%`,
  top: `${(i * 17) % 100}%`,
  color: i % 3 === 0 ? 'var(--color-git)' : i % 3 === 1 ? 'var(--color-docker)' : 'var(--color-k8s)',
  duration: 7 + Math.random() * 5,
  size: 16 + Math.random() * 16,
}))

export default function LandingPage() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const setUserName = useAppStore((s) => s.setUserName)
  const userName = useAppStore((s) => s.userName)
  const navigate = useNavigate()

  useEffect(() => {
    if (userName) {
      navigate('/dashboard', { replace: true })
    }
  }, [userName, navigate])

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2) return
    setUserName(name.trim())
    navigate('/dashboard')
  }

  const particles = STATIC_PARTICLES

  return (
    <div className="gradient-bg min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Tech Particles Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center p-2 rounded-xl bg-white/5 backdrop-blur-3xl"
            style={{ left: p.left, top: p.top, color: p.color }}
            animate={{ 
              y: [0, p.isOdd ? -60 : 60, 0], 
              rotate: [0, p.isOdd ? 45 : -45, 0],
              opacity: [0.1, 0.6, 0.1]
            }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
          >
            <p.Icon size={p.size} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="mb-6 flex justify-center">
              <motion.div 
                className="brand-logo-container p-2 shadow-2xl shadow-primary/20"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src="/agilelab.jpg" 
                  alt="Agile Lab Logo" 
                  className="brand-logo w-48 h-auto"
                />
              </motion.div>
            </div>
            <h1 className="text-4xl fw-black text-white tracking-tight">
              Agile <span className="text-docker">Learning</span>
            </h1>
            <p className="text-sub mt-2 fw-med">{t('landing.subtitle')}</p>
          </div>

          <div className="card p-8">
            <h2 className="text-lg fw-bold text-white mb-6 flex items-center gap-2">
              <Sparkles size={18} className="text-git" /> {t('landing.welcome')}
            </h2>
            <form onSubmit={handleNameSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder={t('landing.placeholder')}
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
                {t('landing.enter')} <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
