import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { GIT_MODULES } from '../data/git/modules/index'
import { DOCKER_MODULES } from '../data/docker/modules/index'
import { K8S_MODULES } from '../data/k8s/modules/index'
import type { QuizQuestion } from '../data/types'
import {
  ArrowLeft, ArrowRight, Zap,
  ExternalLink, BookOpen, Sparkles
} from 'lucide-react'
import confetti from 'canvas-confetti'

// Modular Components
import { SectionCard } from '../components/modules/SectionCard'

export default function ModulePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { completedModules, completeModule, saveQuizScore, addXP, awardBadge } = useAppStore()

  // --- STATE HOOKS (Must be at top level) ---
  const [view, setView] = useState<'theory' | 'quiz' | 'result'>('theory')
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)
  const [xpImport, setXpImport] = useState('')
  const [prevId, setPrevId] = useState(id)
  
  interface ShuffledQuiz extends QuizQuestion {
    shuffledOptions: string[]
    shuffledCorrect: number
  }
  const [quizData, setQuizData] = useState<ShuffledQuiz[]>([])
  const [timeLeft, setTimeLeft] = useState(15 * 60)

  // --- DATA RESOLUTION ---
  const allModules = useMemo(() => [...GIT_MODULES, ...DOCKER_MODULES, ...K8S_MODULES], [])
  const mod = allModules.find((m) => m.id === id)
  const trackColor = mod?.track === 'git' ? 'var(--color-git)' : mod?.track === 'docker' ? 'var(--color-docker)' : 'var(--color-k8s)'

  // --- STATE SYNC (Render Phase) ---
  if (id !== prevId) {
    setPrevId(id)
    setView('theory')
    setQuizAnswers({})
    setSubmitted(false)
    setXpEarned(0)
    setXpImport('')
    setQuizData([])
    setTimeLeft(15 * 60)
  }

  // --- HANDLERS (Defined before Effects) ---
  const handleAnswer = (qId: string, idx: number) => {
    if (submitted) return
    setQuizAnswers((prev) => ({ ...prev, [qId]: idx }))
  }

  const handleSubmitQuiz = useCallback(() => {
    if (!mod || quizData.length === 0) return
    const correctCount = quizData.filter((q) => quizAnswers[q.id] === q.shuffledCorrect).length
    const scorePct = Math.round((correctCount / quizData.length) * 100)
    const bonus = scorePct === 100 ? 100 : 0
    const earned = correctCount * 10 + bonus
    
    saveQuizScore(mod.id, correctCount)
    addXP(earned)
    setXpEarned(earned)
    setSubmitted(true)
    setView('result')

    if (scorePct === 100) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06d6a0', '#ffb703', '#118ab2', '#ff4b4b']
      })
    }
  }, [mod, quizData, quizAnswers, saveQuizScore, addXP])

  const handleInternalGameComplete = useCallback((moduleId: string, gameTitle: string) => {
    addXP(50)
    
    // Dynamic badges for specific lab completions
    if (moduleId === 'git-6') {
      awardBadge({ id: 'git-workflow', emoji: '🏗️', title: 'The Architect', description: 'Mastered professional Git workflows' })
    }
    if (moduleId === 'git-8') {
      awardBadge({ id: 'git-destructive', emoji: '🛡️', title: 'Safety First', description: 'Mastered Reset and Revert safety' })
    }
    
    console.log(`Lab Completed: ${gameTitle} in ${moduleId}`)
  }, [addXP, awardBadge])

  const handleCompleteTheory = () => {
    if (!mod) return

    if (mod.quiz) {
       const randomized = mod.quiz.map(q => {
          const pairs = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }));
          for (let i = pairs.length - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1));
             [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
          }
          return {
             ...q,
             shuffledOptions: pairs.map(p => p.opt),
             shuffledCorrect: pairs.findIndex(p => p.isCorrect)
          };
       });
       setQuizData(randomized);
    }

    if (!completedModules.includes(mod.id)) {
      completeModule(mod.id)
      
      // Track milestones and Badges
      if (mod.id === 'git-1') awardBadge({ id: 'git-seedling', emoji: '🌱', title: 'Git Seedling', description: 'Completed your first Git module' })
      if (mod.id === 'git-9') awardBadge({ id: 'git-branching', emoji: '🌿', title: 'Branch Master', description: 'Mastered branching and merging logic' })
      if (mod.id === 'git-11') awardBadge({ id: 'git-pro', emoji: '🏆', title: 'Git Pro', description: 'Completed the entire Git track' })
      
      if (mod.id === 'docker-1') awardBadge({ id: 'docker-swim', emoji: '🐳', title: 'First Swim', description: 'Completed your first Docker module' })
      if (mod.id === 'docker-9') awardBadge({ id: 'docker-harbor', emoji: '⚓', title: 'Harbor Master', description: 'Completed all Docker modules' })
      
      if (mod.id === 'k8s-1') awardBadge({ id: 'k8s-deck', emoji: '☸️', title: 'Deck Hand', description: 'Completed your first K8s module' })
      if (mod.id === 'k8s-11') awardBadge({ id: 'k8s-helmsman', emoji: '🎖️', title: 'The Helmsman', description: 'Completed all K8s modules' })
    }

    const trackModules = mod.track === 'git' ? GIT_MODULES : mod.track === 'docker' ? DOCKER_MODULES : K8S_MODULES
    const nextIdx = trackModules.findIndex((m) => m.id === id) + 1
    const nId = trackModules[nextIdx]?.id

    if (mod.quiz && mod.quiz.length > 0) {
      setView('quiz')
    } else {
      navigate(nId ? `/${mod.track}/module/${nId}` : '/dashboard')
    }
  }

  // --- EFFECTS ---
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id, view])

  useEffect(() => {
    let timer: number
    if (view === 'quiz' && !submitted && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && view === 'quiz' && !submitted) {
      setTimeout(() => handleSubmitQuiz(), 0)
    }
    return () => clearInterval(timer)
  }, [view, submitted, timeLeft, handleSubmitQuiz])

  // --- EARLY RETURN ---
  if (!mod) return (
    <div className="text-white p-8 card">
      <h2 className="text-2xl fw-black mb-4">Module not found</h2>
      <button onClick={() => navigate('/dashboard')} className="btn btn-primary">Back to Dashboard</button>
    </div>
  )

  const trackModules = mod.track === 'git' ? GIT_MODULES : mod.track === 'docker' ? DOCKER_MODULES : K8S_MODULES
  const nextId = trackModules[trackModules.findIndex((m) => m.id === id) + 1]?.id
  const correctResults = quizData.length > 0 ? quizData.filter((q) => quizAnswers[q.id] === q.shuffledCorrect).length : 0
  const totalQuestions = quizData.length
  const scorePct = totalQuestions > 0 ? Math.round((correctResults / totalQuestions) * 100) : 0
  const allAnswered = quizData.length > 0 ? quizData.every((q) => quizAnswers[q.id] !== undefined) : false

  return (
    <div className="animate-fade-up w-full">
      <div className="flex items-center gap-2 text-xs text-muted mb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1 hover:text-white bg-transparent border-none cursor-pointer p-0 transition-colors">
          <ArrowLeft size={12} /> Dashboard
        </button>
        <span className="opacity-30">/</span>
        <span className="text-sub">Module {mod.order}: {mod.title}</span>
      </div>

      <AnimatePresence mode="wait">
        {view === 'theory' && (
          <motion.div key="theory" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
            <div className="card mb-8" style={{ borderColor: `${trackColor}40` }}>
              <div className="flex items-start gap-4 flex-col sm:flex-row">
                <span className="text-4xl sm:text-5xl animate-float">{mod.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="badge-pill bg-surface text-muted mono">Module {mod.order}</span>
                    <span className="badge-pill text-white uppercase text-[10px]" style={{ background: trackColor }}>
                      {mod.track} Track
                    </span>
                    <span className="text-xs text-muted fw-med">⏱ {mod.duration}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl fw-black text-white">{mod.title}</h1>
                  <p className="text-sub mt-2">{mod.subtitle}</p>
                </div>
                <div className="sm:text-right flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
                  <p className="text-xs text-muted uppercase tracking-wider mb-1">XP Reward</p>
                  <p className="text-xp text-xl fw-black flex items-center gap-1"><Zap size={18} /> {mod.xpReward}</p>
                </div>
              </div>
              {mod.funFact && (
                <div className="funfact mt-6 flex gap-3">
                  <Sparkles size={18} className="text-purple-400 shrink-0" />
                  <p><strong>Fun fact: </strong>{mod.funFact}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {mod.sections.map((section, i) => (
                <SectionCard key={i} section={section} onCompleteGame={(title) => handleInternalGameComplete(mod.id, title)} />
              ))}
            </div>

            {mod.externalLink && (
              <div className="mt-8 card" style={{ borderColor: `${trackColor}50` }}>
                <h3 className="text-white fw-bold mb-4 flex items-center gap-2">
                  <ExternalLink size={18} style={{ color: trackColor }} /> Practical Mission
                </h3>
                <p className="text-sub text-sm mb-6">{mod.externalLink.xpPrompt}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={mod.externalLink.url} target="_blank" rel="noopener noreferrer" className="btn flex-1 justify-center" style={{ background: trackColor, color: 'white' }}>
                    Launch {mod.externalLink.label} <ExternalLink size={14} />
                  </a>
                  <div className="flex gap-2 flex-1">
                    <input type="number" placeholder="Report level achieved..." value={xpImport} onChange={(e) => setXpImport(e.target.value)} className="flex-1 bg-surface2 border border-border p-3 rounded-xl text-white outline-none" />
                    <button onClick={() => { if(xpImport) { addXP(parseInt(xpImport)*5); setXpImport('') } }} className="btn btn-primary">Claim</button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 flex justify-end">
              <button onClick={handleCompleteTheory} className="btn py-4 px-10 text-lg" style={{ background: trackColor, color: 'white' }}>
                {mod.quiz && mod.quiz.length > 0 ? <><BookOpen size={20} /> Start Knowledge Check</> : <><ArrowRight size={20} /> Complete Module</>}
              </button>
            </div>
          </motion.div>
        )}

        {view === 'quiz' && quizData.length > 0 && (
          <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
            <div className="card p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl fw-black text-white">Knowledge Check</h2>
                <p className="text-muted text-sm">{quizData.length} questions to verify your understanding</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-surface2" />
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent"
                      strokeDasharray={2 * Math.PI * 20}
                      strokeDashoffset={2 * Math.PI * 20 * (1 - timeLeft / 900)}
                      style={{ color: timeLeft > 300 ? '#06d6a0' : timeLeft > 60 ? '#ffb703' : '#ff4b4b' }} 
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="absolute text-[10px] fw-black text-white">
                    {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                  </span>
                </div>
                <div className="bg-surface2 px-4 py-2 rounded-xl text-xs fw-bold text-sub">
                  {Object.keys(quizAnswers).length} / {quizData.length} Answered
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {quizData.map((q, idx) => (
                <div key={q.id} className="card">
                  <p className="text-white fw-bold mb-5 flex gap-3">
                    <span className="text-muted mono">Q{idx+1}</span> {q.question}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.shuffledOptions.map((opt, oi) => (
                      <button key={oi} onClick={() => handleAnswer(q.id, oi)} className={`quiz-option ${quizAnswers[q.id] === oi ? 'selected' : ''}`}>
                        <span className="mono fw-black opacity-50">{String.fromCharCode(65 + oi)}</span> {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 pb-12">
              <button onClick={() => setView('theory')} className="btn btn-ghost"><ArrowLeft size={16} /> Review Theory</button>
              <button onClick={handleSubmitQuiz} disabled={!allAnswered} className={`btn py-4 px-12 text-lg ${!allAnswered ? 'opacity-30 cursor-not-allowed' : ''}`} style={{ background: trackColor, color: 'white' }}>Submit Assessment</button>
            </div>
          </motion.div>
        )}

        {view === 'result' && quizData.length > 0 && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-3xl mx-auto">
            <div className="score-banner mb-8">
              <div className="text-6xl mb-4">{scorePct === 100 ? '👑' : scorePct >= 70 ? '🌟' : '📚'}</div>
              <h2 className="text-4xl fw-black text-white mb-2">{scorePct}% Score</h2>
              <p className="text-sub mb-4">{correctResults} out of {totalQuestions} correct</p>
              <div className="flex items-center justify-center gap-2 text-xp text-2xl fw-black"><Zap size={24} /> +{xpEarned} XP Earned</div>
              {scorePct === 100 && <p className="text-k8s fw-bold mt-2">✨ Flawless Performance Bonus +100 XP!</p>}
            </div>

            <div className="flex flex-col gap-4 mb-10">
              {quizData.map((q, idx) => (
                <div key={q.id} className="card p-5" style={{ borderColor: quizAnswers[q.id] === q.shuffledCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)' }}>
                  <p className="text-white fw-bold mb-4 flex gap-3"><span className="text-muted mono">Q{idx+1}</span> {q.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {q.shuffledOptions.map((opt, oi) => (
                      <div key={oi} className={`quiz-option cursor-default ${oi === q.shuffledCorrect ? 'correct' : ''} ${oi === quizAnswers[q.id] && oi !== q.shuffledCorrect ? 'wrong' : ''}`}>
                        <span className="mono fw-black">{oi === q.shuffledCorrect ? '✓' : oi === quizAnswers[q.id] ? '✗' : String.fromCharCode(65 + oi)}</span> {opt}
                      </div>
                    ))}
                  </div>
                  <div className="explanation"><strong>Explanation: </strong> {q.explanation}</div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col sm:flex-row justify-between gap-6 pb-12">
              <button onClick={() => { setView('theory'); setSubmitted(false); setQuizAnswers({}); }} className="btn btn-ghost">Reset & Retry</button>
              <button onClick={() => navigate(nextId ? `/${mod.track}/module/${nextId}` : '/dashboard')} className="btn btn-git px-10" style={{ background: mod.track === 'docker' ? 'var(--color-docker)' : mod.track === 'k8s' ? 'var(--color-k8s)' : undefined }}>
                {nextId ? 'Continue to Next Module' : 'Back to Dashboard'} <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
