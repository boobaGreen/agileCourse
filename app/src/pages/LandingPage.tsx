import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { ArrowRight, Sparkles } from 'lucide-react'


export default function LandingPage() {
  const [name, setName] = useState('')
  const setUserName = useAppStore((s) => s.setUserName)
  const navigate = useNavigate()

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2) return
    setUserName(name.trim())
    navigate('/dashboard')
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
      </AnimatePresence>
    </div>
  )
}
