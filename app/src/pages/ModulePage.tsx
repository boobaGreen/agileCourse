import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { GIT_MODULES } from '../data/git/modules/index'
import { DOCKER_MODULES } from '../data/docker/modules/index'
import { K8S_MODULES } from '../data/k8s/modules/index'
import type { Section, QuizQuestion, GitGraphGameData } from '../data/types'
import {
  ArrowLeft, ArrowRight, Zap,
  ExternalLink, BookOpen, Code2, Lightbulb, Sparkles,
  LayoutGrid, Workflow, Play, Image, Gamepad2, CheckCircle, Trophy,
  AlertTriangle, Users, RefreshCcw, RotateCcw, Terminal as TermIcon,
  Laptop, Cloud, Search, ShieldCheck, ArrowUp
} from 'lucide-react'
import { GitGraphSim } from '../components/games/git-simulator/GitGraphSim'
import confetti from 'canvas-confetti'

type GameDataItem = { id: string, label: string }
type GameDataClassify = { 
  categories: { id: string, label: string }[], 
  items: { id: string, label: string, categoryId: string }[] 
}

export type TerminalGameData = {
  startText?: string;
  steps: {
    instruction: string;
    expectedCommand: string;
    output?: string;
  }[];
}

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
    
    // Badge dinamici al completamento di lab specifici
    if (moduleId === 'git-6') {
      awardBadge({ id: 'git-workflow', emoji: '🏗️', title: 'The Architect', description: 'Mastered professional Git workflows' })
    }
    if (moduleId === 'git-8') {
      awardBadge({ id: 'git-destructive', emoji: '🛡️', title: 'Safety First', description: 'Mastered Reset and Revert safety' })
    }
    
    // Notifica discreta
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
    let timer: number
    if (view === 'quiz' && !submitted && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && view === 'quiz' && !submitted) {
      // Small timeout to avoid sync setState warning in effect
      setTimeout(() => handleSubmitQuiz(), 0)
    }
    return () => clearInterval(timer)
  }, [view, submitted, timeLeft, handleSubmitQuiz])

  // --- EARLY RETURN (Must be after ALL hooks) ---
  if (!mod) return (
    <div className="text-white p-8 card">
      <h2 className="text-2xl fw-black mb-4">Module not found</h2>
      <p className="text-muted mb-4">We couldn't find a module with ID: <span className="text-git mono">{id}</span></p>
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
      {/* Navigation Header */}
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
                {/* Module Hero Card */}
                <div className="card mb-8" style={{ borderColor: `${trackColor}40` }}>
                  <div className="flex items-start gap-4 flex-col sm:flex-row">
                    <span className="text-4xl sm:text-5xl animate-float">{mod.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="badge-pill bg-surface text-muted mono">Module {mod.order}</span>
                        <span className="badge-pill text-white uppercase text-[10px]" 
                          style={{ background: mod.track === 'git' ? 'var(--color-git)' : mod.track === 'docker' ? 'var(--color-docker)' : 'var(--color-k8s)' }}>
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

                {/* Content Sections */}
                <div className="flex flex-col gap-4">
                  {mod.sections.map((section, i) => (
                    <SectionCard 
                      key={i} 
                      section={section} 
                      onCompleteGame={(title) => handleInternalGameComplete(mod.id, title)} 
                    />
                  ))}
                </div>

                {/* External Challenge Link */}
                {mod.externalLink && (
                  <div className="mt-8 card" style={{ borderColor: `${trackColor}50` }}>
                    <h3 className="text-white fw-bold mb-4 flex items-center gap-2">
                      <ExternalLink size={18} style={{ color: trackColor }} />
                      Practical Mission
                    </h3>
                    <p className="text-sub text-sm mb-6">{mod.externalLink.xpPrompt}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={mod.externalLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn flex-1 justify-center"
                        style={{ background: trackColor, color: 'white' }}
                      >
                        Launch {mod.externalLink.label} <ExternalLink size={14} />
                      </a>
                      
                      <div className="flex gap-2 flex-1">
                        <input
                          type="number"
                          placeholder="Report level achieved..."
                          value={xpImport}
                          onChange={(e) => setXpImport(e.target.value)}
                          className="flex-1 bg-surface2 border border-border p-3 rounded-xl text-white outline-none"
                        />
                        <button onClick={() => { if(xpImport) { addXP(parseInt(xpImport)*5); setXpImport('') } }} className="btn btn-primary">
                          Claim
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation CTA */}
                <div className="mt-10 flex justify-end">
                  <button
                    onClick={handleCompleteTheory}
                    className="btn py-4 px-10 text-lg"
                    style={{ background: trackColor, color: 'white' }}
                  >
                    {mod.quiz && mod.quiz.length > 0 ? (
                      <><BookOpen size={20} /> Start Knowledge Check</>
                    ) : (
                      <><ArrowRight size={20} /> Complete Module</>
                    )}
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
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-surface2" />
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent"
                        strokeDasharray={2 * Math.PI * 20}
                        strokeDashoffset={2 * Math.PI * 20 * (1 - timeLeft / 900)}
                        className="transition-all duration-1000 ease-linear"
                        style={{ color: timeLeft > 300 ? '#06d6a0' : timeLeft > 60 ? '#ffb703' : '#ff4b4b' }} 
                      />
                    </svg>
                    <span className="absolute text-[10px] fw-black text-white">
                      {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                    </span>
                  </div>
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
                    <span className="text-muted mono">Q{idx+1}</span>
                    {q.question}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.shuffledOptions.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => handleAnswer(q.id, oi)}
                        className={`quiz-option ${quizAnswers[q.id] === oi ? 'selected' : ''}`}
                      >
                        <span className="mono fw-black opacity-50">{String.fromCharCode(65 + oi)}</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 pb-12">
              <button onClick={() => setView('theory')} className="btn btn-ghost">
                <ArrowLeft size={16} /> Review Theory
              </button>
              <button
                onClick={handleSubmitQuiz}
                disabled={!allAnswered}
                className={`btn py-4 px-12 text-lg ${!allAnswered ? 'opacity-30 cursor-not-allowed' : ''}`}
                style={{ background: trackColor, color: 'white' }}
              >
                Submit Assessment
              </button>
            </div>
          </motion.div>
        )}

        {view === 'result' && quizData.length > 0 && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-3xl mx-auto">
            <div className="score-banner mb-8">
              <div className="text-6xl mb-4">
                {scorePct === 100 ? '👑' : scorePct >= 70 ? '🌟' : '📚'}
              </div>
              <h2 className="text-4xl fw-black text-white mb-2">{scorePct}% Score</h2>
              <p className="text-sub mb-4">{correctResults} out of {totalQuestions} correct</p>
              
              <div className="flex items-center justify-center gap-2 text-xp text-2xl fw-black">
                <Zap size={24} /> +{xpEarned} XP Earned
              </div>
              {scorePct === 100 && <p className="text-k8s fw-bold mt-2">✨ Flawless Performance Bonus +100 XP!</p>}
            </div>

            {/* Answer Review Section */}
            <div className="flex flex-col gap-4 mb-10">
              {quizData.map((q, idx) => (
                <div key={q.id} className="card p-5" style={{ 
                    borderColor: quizAnswers[q.id] === q.shuffledCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'
                }}>
                  <p className="text-white fw-bold mb-4 flex gap-3">
                    <span className="text-muted mono">Q{idx+1}</span>
                    {q.question}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {q.shuffledOptions.map((opt, oi) => {
                       const isCorrect = oi === q.shuffledCorrect;
                       const isSelected = oi === quizAnswers[q.id];
                       return (
                         <div
                           key={oi}
                           className={`quiz-option cursor-default ${isCorrect ? 'correct' : ''} ${isSelected && !isCorrect ? 'wrong' : ''}`}
                         >
                           <span className="mono fw-black">
                             {isCorrect ? '✓' : isSelected ? '✗' : String.fromCharCode(65 + oi)}
                           </span>
                           {opt}
                         </div>
                       )
                    })}
                  </div>
                  <div className="explanation">
                    <strong>Explanation: </strong> {q.explanation}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col sm:flex-row justify-between gap-6 pb-12">
              <button onClick={() => { setView('theory'); setSubmitted(false); setQuizAnswers({}); }} className="btn btn-ghost">
                Reset & Retry
              </button>
              <button 
                onClick={() => navigate(nextId ? `/${mod.track}/module/${nextId}` : '/dashboard')}
                className="btn btn-git px-10"
                style={{ background: mod.track === 'docker' ? 'var(--color-docker)' : mod.track === 'k8s' ? 'var(--color-k8s)' : undefined }}
              >
                {nextId ? 'Continue to Next Module' : 'Back to Dashboard'} <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SectionCard({ section, onCompleteGame }: { section: Section, onCompleteGame: (title: string) => void }) {
  const icons: Record<string, React.ElementType> = {
    intro: BookOpen,
    concept: Sparkles,
    code: Code2,
    tip: Lightbulb,
    analogy: Lightbulb,
    table: LayoutGrid,
    flowchart: Workflow,
    video: Play,
    infographic: Image,
    animation: Zap,
    game: Gamepad2
  }
  const Icon = icons[section.type] || BookOpen

  return (
    <div className={`section-card s-${section.type}`}>
      {section.title && (
        <div className="flex items-center gap-2 mb-3">
          <Icon size={16} className={`text-${section.type === 'code' ? 'git' : section.type === 'intro' ? 'blue-400' : 'purple-400'}`} />
          <h3 className="fw-bold text-white text-sm">{section.title}</h3>
        </div>
      )}
      
      <div className="text-sub text-sm leading-relaxed">
        {section.content.split('\n').map((line, i) => (
          <div key={i} className="mb-2 last:mb-0">
             {line.includes(' · ') && line.includes('[') ? (
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 mt-4">
                   {line.split(' · ').map((part, pi) => {
                      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                      const emoji = part.match(/^([\u2600-\u27BF]|[\uD83C-\uD83E][\uDC00-\uDFFF])/);
                      if (match) {
                         return (
                            <a 
                               key={pi} 
                               href={match[2]} 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-primary hover:bg-primary/10 hover:border-primary transition-all text-xs fw-bold w-full sm:w-auto"
                            >
                               {emoji?.[0]} {match[1]} ↗
                            </a>
                         )
                      }
                      return <span key={pi}>{part}</span>;
                   })}
                </div>
             ) : line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g).map((part, pi) => {
                 const boldMatch = part.match(/^\*\*(.*?)\*\*$/)
                 if (boldMatch) return <strong key={`${pi}-${i}`} className="text-white fw-black">{boldMatch[1]}</strong>
                 
                 const mdMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
                 if (mdMatch) {
                    return <a key={`${pi}-${i}`} href={mdMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">{mdMatch[1]} ↗</a>
                 }
                 if (/^https?:\/\//.test(part)) {
                    return <a key={`${pi}-${i}`} href={part} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{part}</a>
                 }
                 return <React.Fragment key={`${pi}-${i}`}>{part}</React.Fragment>
             })}
          </div>
        ))}
      </div>

      {/* Code Block Rendering */}
      {section.type === 'code' && section.code && (
        <div className="code-block mt-4">
          <div className="code-block-header">
            <div className="dot bg-danger" />
            <div className="dot bg-xp" />
            <div className="dot bg-green" />
            <span className="ml-2 text-xs text-muted mono">{section.language || 'bash'}</span>
          </div>
          <pre>
            {section.code.split('\n').map((line, li) => (
              <div key={li} className={line.trim().startsWith('#') ? 'comment' : ''}>
                {line}
              </div>
            ))}
          </pre>
        </div>
      )}

      {/* Table Rendering with Scroll Hint */}
      {section.type === 'table' && section.tableData && (
        <div className="mt-4 relative overflow-hidden rounded-xl border border-white/10 bg-surface2/30 shadow-2xl">
          <div className="overflow-x-auto scrollbar-hide py-2 px-1">
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none sm:hidden rounded-r-xl z-20 flex items-center justify-end pr-2">
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-white/40">
                <ArrowRight size={16} />
              </motion.div>
            </div>

            <table className="w-full text-left" style={{ minWidth: '600px' }}>
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  {section.tableData.headers.map((h, i) => (
                    <th key={i} className="p-3 text-[10px] fw-black text-white uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.tableData.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="p-3 text-xs text-sub leading-relaxed">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Flowchart / diagram rendering */}
      {section.type === 'flowchart' && section.diagramSteps && (
        <div className="mt-4 relative">
          <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-6 px-2 scrollbar-hide sm:justify-center sm:flex-wrap group">
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/60 to-transparent pointer-events-none sm:hidden z-20 flex items-center justify-end pr-2">
                <motion.div animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-white/20">
                   <ArrowRight size={14} />
                </motion.div>
             </div>

            {section.diagramSteps.map((step, si) => (
              <React.Fragment key={si}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: si * 0.1 }}
                  className="flex flex-col items-center gap-2 px-5 sm:px-7 py-4 sm:py-5 rounded-2xl border border-white/10 bg-white/[0.03] min-w-fit max-w-[180px] text-center shadow-lg relative z-10"
                  style={{ borderColor: step.color ? `${step.color}50` : undefined }}
                >
                  {step.icon && <span className="text-2xl sm:text-3xl mb-1">{step.icon}</span>}
                  <span className="text-[11px] sm:text-sm fw-bold text-white leading-tight whitespace-pre-line">{step.label}</span>
                </motion.div>
                {si < section.diagramSteps!.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: si * 0.1 + 0.05 }}
                    className="text-muted text-lg sm:text-xl shrink-0"
                  >
                    →
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Video Content */}
      {section.type === 'video' && section.videoUrl && (
        <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe
            className="w-full h-full"
            src={section.videoUrl.includes('playlist?list=')
              ? section.videoUrl.replace('youtube.com/playlist?list=', 'youtube.com/embed/videoseries?list=')
              : section.videoUrl.replace('watch?v=', 'embed/')}
            title={section.title || 'Educational Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Infographic / Image */}
      {section.type === 'infographic' && section.imageUrl && (
        <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-surface2 relative group">
           <img src={section.imageUrl} alt="Module Infographic" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-xs text-white fw-bold">Click to expand</span>
           </div>
        </div>
      )}

      {/* Specialized Animations */}
      {section.type === 'animation' && (
        <div className="mt-4 p-6 rounded-2xl border border-white/5 bg-surface2/30 flex items-center justify-center overflow-hidden min-h-[150px]">
           <EducationAnimation type={section.animationType || section.content} />
        </div>
      )}

      {/* Mini-Games */}
      {section.type === 'game' && section.gameType && (
        <div className="mt-4">
           <MiniGame 
             gameType={section.gameType} 
             gameData={section.gameData} 
             onComplete={() => onCompleteGame(section.title || 'Challenge')} 
           />
        </div>
      )}
    </div>
  )
}

function EducationAnimation({ type }: { type: string }) {
  const [input, setInput] = useState('Git')
  const [step, setStep] = useState(0)

  const hash = useMemo(() => {
    // Simple but deterministic hash for educational visual demo
    if (!type.includes('SHA')) return ''
    let h1 = 0x811c9dc5, h2 = 0xad3f3d1e
    for (let i = 0; i < input.length; i++) {
      h1 = Math.imul(h1 ^ input.charCodeAt(i), 16777619)
      h2 = Math.imul(h2 ^ input.charCodeAt(i), 0x5bd1e995)
    }
    const s1 = (h1 >>> 0).toString(16).padStart(8, '0')
    const s2 = (h2 >>> 0).toString(16).padStart(8, '0')
    const s3 = ((Math.imul(h1, h2) >>> 0).toString(16) + 'abcdef0123456789').slice(0, 24)
    return (s1 + s2 + s3).slice(0, 40)
  }, [input, type])
  
  if (type.includes('SHA')) {
    return (
      <div className="w-full max-w-sm flex flex-col gap-4">
         <div className="flex items-center justify-between">
           <div className="text-[10px] text-muted uppercase fw-black tracking-widest">Avalanche Effect Simulator</div>
           <div className="flex gap-2">
              <button 
                onClick={() => setInput('Git')} 
                className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted hover:text-white transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={() => setInput(input === 'Git' ? 'Git!' : 'Git')} 
                className="text-[9px] px-2 py-0.5 rounded bg-primary/20 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all fw-bold"
              >
                Change 1 char
              </button>
           </div>
         </div>
         <div className="relative group">
           <input 
             value={input} 
             onChange={e => setInput(e.target.value)}
             className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-center text-sm font-medium focus:border-primary/50 outline-none transition-all shadow-inner"
             placeholder="Type message here..."
           />
           <Sparkles size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
         </div>
         
         <div className="bg-surface p-5 rounded-2xl border border-primary/20 flex flex-col items-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={14} className="text-primary" />
              <span className="text-[10px] text-primary fw-black uppercase tracking-widest">Git Snapshot ID (SHA-1)</span>
            </div>
            <div className="w-full flex justify-center">
              <div className="mono text-[11px] sm:text-xs text-xp tracking-widest bg-black/40 py-3 px-4 rounded-xl border border-white/10 text-center flex flex-col gap-1 shadow-inner w-full min-w-0 overflow-hidden items-center justify-center">
                <div className="whitespace-nowrap">
                  {hash.substring(0, 20).split('').map((char, i) => (
                    <motion.span 
                      key={`${input}-${i}`}
                      initial={{ opacity: 0, scale: 0.5 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      transition={{ delay: i * 0.005 }}
                      className={/[a-f]/.test(char) ? 'text-primary/80' : 'text-xp'}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="whitespace-nowrap">
                  {hash.substring(20, 40).split('').map((char, j) => {
                    const i = j + 20;
                    return (
                      <motion.span 
                        key={`${input}-${i}`}
                        initial={{ opacity: 0, scale: 0.5 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ delay: i * 0.005 }}
                        className={/[a-f]/.test(char) ? 'text-primary/80' : 'text-xp'}
                      >
                        {char}
                      </motion.span>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 opacity-50">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-[9px] text-muted fw-bold uppercase">Integrity Verified</span>
            </div>
         </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('rolling') || type.toLowerCase().includes('update')) {
    return (
      <div className="w-full max-w-sm flex flex-col gap-6 items-center">
        <div className="text-[10px] text-muted uppercase fw-black tracking-widest text-center">Rolling Update Visualization</div>
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ backgroundColor: '#118ab2', y: 0 }}
              animate={{ backgroundColor: ['#118ab2', '#ffb703', '#06d6a0'], y: [0, -10, 0] }}
              transition={{ delay: i * 2, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              className="w-12 h-16 rounded-lg flex items-center justify-center text-white fw-black shadow-lg"
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ delay: i * 2, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                v1
              </motion.span>
              <motion.span
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1] }}
                transition={{ delay: i * 2, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                v2
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('container') || type.toLowerCase().includes('shipping')) {
    return (
      <div className="w-full max-w-sm flex flex-col gap-6 items-center">
        <div className="text-[10px] text-muted uppercase fw-black tracking-widest text-center">Build Once, Run Anywhere</div>
        <div className="flex items-center gap-4 w-full justify-between relative px-4">
          <div className="text-3xl">💻</div>
          
          <motion.div 
            className="absolute left-10 text-2xl z-10"
            animate={{ x: [0, 200], y: [0, -20, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            📦
          </motion.div>
          
          <div className="flex-1 border-b-2 border-dashed border-white/20 mx-4" />
          <div className="text-3xl">☁️</div>
        </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('core') || type === 'git-core-sim') {
    const steps = [
      { 
        title: "1. Working Directory (Workspace)", 
        desc: "Your workbench. You have multiple files (App.js, Readme), but today only App.js is ready for prime time.",
        cmd: "# Workspace: Files are dirty/modified",
        op: 'modify' 
      },
      { 
        title: "2. Staging Area (The Filter)", 
        desc: "Why Staging? It's a loading dock. You 'add' only App.js. This allows you to split your work into clean, logical snapshots.",
        cmd: "git add App.js",
        op: 'add' 
      },
      { 
        title: "3. Local Repository (The Vault)", 
        desc: "When you 'commit', Git takes only what was on the loading dock. Your Readme remains safe and unstaged in your workspace.",
        cmd: "git commit -m 'Fix login logic'",
        op: 'commit' 
      },
      { 
        title: "4. Logical History", 
        desc: "Success! You've created a clean commit with only relevant changes. This is why Git is more powerful than simple 'Save'!",
        cmd: "git log --oneline",
        op: 'done' 
      }
    ]

    return (
      <div className="w-full flex flex-col items-center gap-6 p-4">
        {/* Storyboard Navigation */}
        <div className="w-full max-w-lg bg-white/5 p-4 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex flex-col">
                 <span className="text-[10px] text-primary fw-black uppercase tracking-widest leading-none mb-1">Concept Mastery • Step {step + 1}</span>
                 <h3 className="text-sm fw-black text-white">{steps[step].title}</h3>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                 <button 
                   disabled={step === 0}
                   onClick={() => setStep(s => s - 1)}
                   className="flex-1 sm:flex-none p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all flex justify-center"
                 >
                    <ArrowLeft size={16} />
                 </button>
                 <button 
                   disabled={step === steps.length - 1}
                   onClick={() => setStep(s => s + 1)}
                   className="flex-[2] sm:flex-none px-4 py-2 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 fw-bold text-xs"
                 >
                    <span className="hidden xs:inline">Next Step</span>
                    <span className="xs:hidden">Next</span>
                    <ArrowRight size={16} />
                 </button>
              </div>
           </div>
           
           <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
           </div>
        </div>

        <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] bg-black/40 rounded-3xl border border-white/5 p-3 sm:p-6 flex flex-col overflow-hidden shadow-2xl mt-4">
           <svg viewBox="0 0 400 200" className="w-full h-full">
             {/* Area Labels */}
             <text x="65" y="30" textAnchor="middle" className="text-[7px] fw-black uppercase tracking-widest" fill="rgba(255,255,255,0.4)">Working Dir</text>
             <text x="200" y="30" textAnchor="middle" className="text-[7px] fw-black uppercase tracking-widest" fill="rgba(255,255,255,0.4)">Staging Area</text>
             <text x="335" y="30" textAnchor="middle" className="text-[7px] fw-black uppercase tracking-widest" fill="rgba(255,255,255,0.4)">Local Repo</text>

             {/* Vertical Dividers */}
             <line x1="133" y1="40" x2="133" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
             <line x1="266" y1="40" x2="266" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />

             {/* Background placeholders */}
             {[65, 200, 335].map((x, i) => (
               <rect key={i} x={x-20} y={90} width="40" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
             ))}

             {/* FILE B (The 'Excluded' file) */}
             <motion.g x={65} y={110} initial={false}>
                 <rect width="25" height="35" rx="3" x="-12.5" y="-17.5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                 <text x="0" y="5" textAnchor="middle" className="text-[5px] fw-bold" fill="rgba(255,255,255,0.3)">Readme</text>
             </motion.g>

             {/* FILE A (The 'Active' file moving through areas) */}
             <motion.g
               initial={false}
               animate={{ 
                 x: step === 0 ? 65 : step === 1 ? 200 : 335,
                 y: step === 0 ? 125 : 110
               }}
               transition={{ type: 'spring', stiffness: 80, damping: 15 }}
             >
                {/* File Visual */}
                <motion.rect 
                  width="44" height="54" rx="4" x="-22" y="-27"
                  animate={{ 
                    fill: step === 0 ? "rgba(239, 68, 68, 0.2)" : step === 1 ? "rgba(250, 204, 21, 0.2)" : "rgba(34, 197, 94, 0.2)",
                    stroke: step === 0 ? "#ef4444" : step === 1 ? "#facc15" : "#22c55e",
                    opacity: step >= 2 ? 0 : 1
                  }}
                  strokeWidth="2"
                />
                {step < 2 && (
                  <motion.g animate={{ opacity: step >= 2 ? 0 : 1 }}>
                     <line x1="-12" y1="-10" x2="12" y2="-10" stroke="white" strokeWidth="0.5" opacity="0.3" />
                     <line x1="-12" y1="-5" x2="6" y2="-5" stroke="white" strokeWidth="0.5" opacity="0.3" />
                     <motion.text x="0" y="12" textAnchor="middle" className="text-[6px] fw-bold" fill="white">App.js</motion.text>
                  </motion.g>
                )}

                {/* Commit Node Visual */}
                <motion.circle 
                  r="8"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: step >= 2 ? 1 : 0,
                    fill: "#22c55e",
                    boxShadow: "0 0 20px rgba(34,197,94,0.5)"
                  }}
                />
                {step >= 2 && (
                   <motion.text 
                     x="0" y="20" textAnchor="middle" className="text-[7px] fw-black" fill="#22c55e"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                   >
                     Commit
                   </motion.text>
                )}
             </motion.g>
           </svg>
        </div>

        {/* Narrative Panel */}
        <div className="w-full">
          <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl"
          >
             <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-primary/20 text-primary shrink-0">
                   <LayoutGrid size={18} />
                </div>
                <div className="flex flex-col gap-3 w-full min-w-0">
                   <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] text-primary fw-black uppercase tracking-widest whitespace-nowrap">Conceptual Logic</span>
                         <div className="h-[1px] w-full bg-white/10" />
                      </div>
                      <p className="text-xs text-white/90 leading-relaxed fw-medium">
                         {steps[step].desc}
                      </p>
                   </div>

                   {/* Terminal */}
                   <div className="bg-black/60 rounded-xl p-2.5 border border-white/5 shadow-inner flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
                      <div className="flex gap-1 shrink-0">
                         <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                         <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                      </div>
                      <code className="text-[10px] sm:text-[11px] mono text-git fw-bold whitespace-nowrap pr-6">
                         <span className="text-muted opacity-50 mr-2">$</span>
                         {steps[step].cmd}
                      </code>
                   </div>
                </div>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    )
  }

    if (type.toLowerCase().includes('merge') || type.toLowerCase().includes('rebase')) {
    return <MergeRebaseLab />
  }

  if (type.toLowerCase().includes('remote') || type.toLowerCase().includes('sim')) {
    return <RemoteSyncLab />
  }

  if (type === 'git-force-danger') {
    const steps = [
      { 
        title: "1. The Stable State", 
        desc: "Everyone is synchronized. The server (Origin) and your machine have the same history (A -> B).",
        cmd: "# History is clean",
        op: 'sync' 
      },
      { 
        title: "2. Teammate Work (C)", 
        desc: "A teammate pushes commit 'C'. The server now has (A -> B -> C). You don't have 'C' yet.",
        cmd: "# Teammate: git push origin main",
        op: 'remote_move' 
      },
      { 
        title: "3. Divergent Force Push", 
        desc: "You make commit 'D' from 'B', ignoring 'C'. Then you run 'git push --force'.",
        cmd: "git push origin main --force",
        op: 'force_push' 
      },
      { 
        title: "4. DISASTER: History Wiped", 
        desc: "CRITICAL: Commit 'C' is GONE from the server! Your teammate's work is deleted. Chaos ensues.",
        cmd: "# Teammate: Error! Diverged history!",
        op: 'disaster' 
      }
    ]

    return (
      <div className="w-full flex flex-col items-center gap-6 p-4">
        {/* Storyboard Navigation */}
        <div className="w-full max-w-lg bg-white/5 p-4 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex flex-col">
                 <span className="text-[10px] text-danger fw-black uppercase tracking-widest leading-none mb-1">Warning Simulation • Step {step + 1}</span>
                 <h3 className="text-sm fw-black text-white">{steps[step].title}</h3>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                 <button 
                   disabled={step === 0}
                   onClick={() => setStep(s => s - 1)}
                   className="flex-1 sm:flex-none p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all flex justify-center"
                 >
                    <ArrowLeft size={16} />
                 </button>
                 <button 
                   disabled={step === steps.length - 1}
                   onClick={() => setStep(s => s + 1)}
                   className="flex-[2] sm:flex-none px-4 py-2 rounded-xl bg-danger text-white shadow-lg shadow-danger/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 fw-bold text-xs"
                 >
                    <span className="hidden xs:inline">Next Step</span>
                    <span className="xs:hidden">Next</span>
                    <ArrowRight size={16} />
                 </button>
              </div>
           </div>
           
           <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-danger"
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
           </div>
        </div>

        <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] bg-black/40 rounded-3xl border border-white/5 p-3 sm:p-6 flex flex-col overflow-hidden shadow-2xl mt-4">
           <svg viewBox="0 0 400 200" className="w-full h-full">
             {/* Track Labels */}
             <text x="15" y="55" className="text-[8px] font-black uppercase tracking-wider" fill="#4fd1c5">Remote (Origin)</text>
             <text x="15" y="145" className="text-[8px] font-black uppercase tracking-wider" fill="#68d391">Local (Your PC)</text>

             {/* Tracks Lines */}
             <line x1="50" y1="60" x2="380" y2="60" stroke="rgba(79, 209, 197, 0.1)" strokeWidth="1" />
             <line x1="50" y1="150" x2="380" y2="150" stroke="rgba(104, 211, 145, 0.1)" strokeWidth="1" />

             {/* SHARED History (A, B) */}
             {[80, 140].map(x => (
               <g key={x}>
                 <circle cx={x} cy="60" r="5" fill="#4fd1c5" opacity="0.4" />
                 <circle cx={x} cy="150" r="5" fill="#68d391" />
               </g>
             ))}

             {/* Commit C (Teammate's Work on Server) */}
             <AnimatePresence>
                {step >= 1 && step < 3 && (
                  <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                     <circle cx="200" cy="60" r="5" fill="#4fd1c5" />
                     <text x="200" y="45" textAnchor="middle" className="text-[6px] font-bold" fill="#4fd1c5">Teammate commit (C)</text>
                     {step === 2 && (
                       <motion.circle 
                         animate={{ r: [5, 12, 5], opacity: [1, 0, 1] }}
                         transition={{ repeat: Infinity }}
                         cx="200" cy="60" stroke="#4fd1c5" fill="none" 
                       />
                     )}
                  </motion.g>
                )}
             </AnimatePresence>

             {/* Commit D (Your Work) */}
             {step >= 2 && (
               <motion.g
                 animate={{ 
                    x: step >= 3 ? 0 : 0,
                    y: step >= 3 ? -90 : 0
                 }}
                 transition={{ type: 'spring', stiffness: 60 }}
               >
                  <circle cx="200" cy="150" r="5" fill="#68d391" />
                  <text x="200" y="165" textAnchor="middle" className="text-[7px] font-bold" fill="#68d391">Your commit (D)</text>
                  
                  {step >= 3 && (
                    <motion.circle 
                      cx="200" cy="150" r="20" fill="rgba(239, 68, 68, 0.2)" 
                      initial={{ scale: 0 }} animate={{ scale: 1.5 }}
                    />
                  )}
               </motion.g>
             )}

             {/* Warning UI for step 3/4 */}
             {step >= 3 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <rect x="180" y="40" width="40" height="40" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                   <text x="200" y="85" textAnchor="middle" className="text-[10px] font-black" fill="#ef4444">OVERWRITTEN!</text>
                   <motion.text x="320" y="60" textAnchor="middle" className="text-[20px]" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity }}>😱</motion.text>
                   <text x="320" y="75" textAnchor="middle" className="text-[6px] font-bold" fill="#ef4444">Teammate is crying</text>
                </motion.g>
             )}
           </svg>
        </div>

        {/* Narrative Panel */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 p-3 sm:p-5 rounded-3xl shadow-2xl"
            >
               <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`p-2.5 rounded-2xl ${step === 3 ? 'bg-danger/20 text-danger animate-pulse' : 'bg-primary/20 text-primary'} shrink-0 shadow-lg shadow-primary/10`}>
                     {step === 3 ? <AlertTriangle size={18} /> : <Users size={18} />}
                  </div>
                  <div className="flex flex-col gap-3 w-full min-w-0">
                     <div className="flex flex-col gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                           <span className={`text-[10px] ${step === 3 ? 'text-danger' : 'text-primary'} fw-black uppercase tracking-widest whitespace-normal sm:whitespace-nowrap`}>
                             {step === 3 ? 'Critical Warning' : 'Collaboration Habit'}
                           </span>
                           <div className="h-[1px] w-full bg-white/10" />
                        </div>
                        <p className="text-xs text-white/90 leading-relaxed fw-medium">
                           {steps[step].desc}
                        </p>
                     </div>

                     {/* Mini-Terminal Badge */}
                     <div className="bg-black/60 rounded-xl p-2.5 border border-white/5 shadow-inner flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
                        <div className="flex gap-1 shrink-0">
                           <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                           <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                        </div>
                        <code className="text-[10px] sm:text-[11px] mono text-git fw-bold whitespace-nowrap pr-6">
                           <span className="text-muted opacity-50 mr-2">$</span>
                           {steps[step].cmd}
                        </code>
                     </div>
                  </div>
               </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (type === 'git-stage-lab') {
    return <StageLab />
  }

  if (type === 'git-head-lab') {
    return <HeadLab />
  }

  if (type === 'git-undo-lab') {
    return <UndoSandbox />
  }

  if (type === 'git-cherry-pick-lab') {
    return <CherryPickLab />
  }

  if (type === 'git-vs-manual') {
    return <ManualVsGitLab />
  }


  if (type === 'git-stash-lab') {
    return <StashLab />
  }

  if (type === 'git-bisect-lab') {
    return <BisectLab />
  }

  if (type === 'git-ignore-lab') {
    return <IgnoreLab />
  }

  // Fallback icon animation
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="text-primary"
      >
        <Zap size={48} />
      </motion.div>
      <span className="text-xs text-muted fw-bold">Interactive Element</span>
    </div>
  )
}

// --- SIMULATION COMPONENTS (Isolated to fix hook violations) ---

function ManualVsGitLab() {
  const [count, setCount] = useState(1)
  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/5">
       <div className="flex justify-between items-center px-4">
          <h4 className="text-[10px] fw-black text-muted uppercase tracking-widest">Scaling to {count} changes</h4>
          <button onClick={() => setCount(c => Math.min(c + 1, 5))} className="px-3 py-1 rounded-lg bg-primary text-white text-[10px] fw-bold hover:scale-105 active:scale-95 transition-all">+ Add Change</button>
       </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
             <span className="text-[9px] text-center text-danger fw-black uppercase">Manual Folder 📁</span>
             <div className="bg-black/40 rounded-2xl p-4 flex flex-col gap-1 min-h-[160px]">
                {Array.from({ length: count }).map((_, i) => (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} key={i} className="p-2 rounded-lg bg-surface2 border border-white/5 text-[9px] text-white font-mono flex items-center gap-2 overflow-hidden">
                     <span className="truncate break-all">📄 project_final{i > 0 ? `_v${i+1}` : ''}{i === count-1 ? '_REAL_FINAL' : ''}.zip</span>
                  </motion.div>
                ))}
             </div>
          </div>
          <div className="flex flex-col gap-3">
             <span className="text-[9px] text-center text-git fw-black uppercase">Git History 🐙</span>
             <div className="bg-black/40 rounded-2xl p-4 flex flex-col-reverse gap-4 min-h-[160px] relative">
                <div className="absolute left-[26px] top-6 bottom-6 w-[2px] bg-git/20" />
                {Array.from({ length: count }).map((_, i) => (
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={i} className="flex items-center gap-3 relative z-10">
                     <div className="w-4 h-4 rounded-full bg-git shadow-lg shadow-git/20" />
                     <div className="flex flex-col">
                        <span className="text-[8px] text-git font-mono fw-black uppercase">bc{i}f{i}a{i}</span>
                        <span className="text-[8px] text-white opacity-60">Feature {i+1} added</span>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>
       </div>
    </div>
  )
}


function MergeRebaseLab() {
  const [mode, setMode] = useState<'merge' | 'rebase'>('merge')
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "1. The Split",
      desc: "Problem: Your team made a change (C2) while you were working on features (A, B). Now you are out of sync. How do you join them back?",
      cmd: "# Preparing to integrate...",
      commits: { main: ['C1', 'C2'], feature: ['A', 'B'] }
    },
    {
       title: "2. The Integration",
       desc: mode === 'merge' 
         ? "MERGE: This is the 'Honest' way. It creates a new 'Merge Commit' (M) that shows exactly when branches rejoined. Safe and historical." 
         : "REBASE: This is the 'Clean' way. It moves your work (A, B) to the very end of the line, as if you just started. No messy merge nodes!",
       cmd: mode === 'merge' ? "git merge feature" : "git rebase main",
       commits: mode === 'merge' 
         ? { main: ['C1', 'C2', 'M'], feature: ['A', 'B'] } 
         : { main: ['C1', 'C2', "A'", "B'"], feature: [] }
    }
  ]

  const currentStep = steps[step] || steps[0]

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-primary fw-black uppercase tracking-widest leading-none mb-2">Integration Lab • Step {step + 1}</span>
             <h3 className="text-xl fw-black text-white">{currentStep.title}</h3>
          </div>
          <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
             <button 
               onClick={() => { setMode('merge'); setStep(0); }} 
               className={`px-5 py-2.5 rounded-xl text-xs fw-bold transition-all ${mode === 'merge' ? 'bg-git text-white shadow-lg shadow-git/20' : 'text-muted hover:text-white'}`}
             >
               Merge Path
             </button>
             <button 
               onClick={() => { setMode('rebase'); setStep(0); }} 
               className={`px-5 py-2.5 rounded-xl text-xs fw-bold transition-all ${mode === 'rebase' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted hover:text-white'}`}
             >
               Rebase Path
             </button>
          </div>
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
          <div className="flex justify-between items-start">
             <p className="text-sm text-white/90 leading-relaxed fw-medium max-w-[75%]">{currentStep.desc}</p>
             <div className="flex gap-2">
                <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-2 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"><ArrowLeft size={16} /></button>
                <button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)} className={`px-4 py-2 rounded-xl text-white shadow-lg transition-all text-xs fw-bold flex gap-2 items-center ${mode === 'merge' ? 'bg-git shadow-git/20' : 'bg-primary shadow-primary/20'} disabled:opacity-30`}>Next <ArrowRight size={16} /></button>
             </div>
          </div>
          <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
             <TermIcon size={18} className="text-muted shrink-0" />
             <code className={`text-[11px] sm:text-sm font-mono fw-bold whitespace-nowrap pr-6 ${mode === 'merge' ? 'text-git' : 'text-primary'}`}>
                <span className="text-muted opacity-50 mr-2">$</span>
                {currentStep.cmd}
             </code>
          </div>
       </div>

       {/* Timeline Visualization */}
       <div className="bg-surface2/40 rounded-2xl border border-white/5 p-10 h-[240px] relative overflow-hidden flex flex-col justify-center">
          {/* Main Timeline */}
          <div className="relative flex items-center gap-4 mb-12">
             <span className="w-24 text-[10px] fw-black text-muted uppercase tracking-widest text-right mr-4">Main Line</span>
             <div className="flex items-center gap-4 relative">
                <AnimatePresence mode="popLayout">
                   {currentStep.commits.main.map((c) => (
                     <motion.div 
                       key={c}
                       layoutId={`commit-${c}`}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: 0, opacity: 0 }}
                       className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-[10px] fw-bold shadow-xl transition-all ${
                         c === 'M' ? 'bg-git/20 border-git text-git' : 
                         c.includes("'") ? 'bg-primary/20 border-primary text-primary' :
                         'bg-surface border-white/10 text-white'
                       }`}
                     >
                        {c}
                     </motion.div>
                   ))}
                </AnimatePresence>
                <div className="absolute left-[-200px] right-[-200px] h-0.5 bg-white/5 -z-10 top-1/2" />
             </div>
          </div>

          {/* Feature Timeline */}
          <div className="relative flex items-center gap-4">
             <span className="w-24 text-[10px] fw-black text-muted uppercase tracking-widest text-right mr-4">Your Feature</span>
             <div className="flex items-center gap-4 relative">
                <AnimatePresence mode="popLayout">
                   {currentStep.commits.feature.map((c) => (
                     <motion.div 
                       key={c}
                       layoutId={`commit-${c}`}
                       initial={{ y: 0, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       exit={{ y: -60, opacity: 0, scale: 0.5 }}
                       className="w-10 h-10 rounded-full bg-surface border-2 border-primary/40 text-primary flex items-center justify-center font-mono text-[10px] fw-bold"
                     >
                        {c}
                     </motion.div>
                   ))}
                </AnimatePresence>
                <div className="absolute left-[-200px] right-[-200px] h-0.5 bg-white/5 -z-10 top-1/2" />
                
                {mode === 'merge' && step === 1 && (
                  <motion.div 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    className="absolute -top-[48px] left-[110px]"
                  >
                     <svg width="40" height="48">
                        <path d="M 0 48 Q 20 24 40 0" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 2" />
                     </svg>
                  </motion.div>
                )}
             </div>
          </div>
       </div>
    </div>
  )
}

function RemoteSyncLab() {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "1. Divergence",
      desc: "You have a new local commit (C2), but your teammate has already pushed (T1) to the server. You are out of sync!",
      cmd: "# Check remote status...",
      local: ['C1', 'C2'],
      remote: ['C1', 'T1'],
      tracking: ['C1']
    },
    {
      title: "2. The Fetch",
      desc: "Git downloads the teammate's commit (T1) into your 'Remote Tracking' branch (origin/main) so you can see it safely.",
      cmd: "git fetch origin",
      local: ['C1', 'C2'],
      remote: ['C1', 'T1'],
      tracking: ['C1', 'T1']
    },
    {
      title: "3. The Integration",
      desc: "Merge the remote changes into your local branch. Now your history contains both your work (C2) and theirs (T1).",
      cmd: "git merge origin/main",
      local: ['C1', 'T1', 'C2'],
      remote: ['C1', 'T1'],
      tracking: ['C1', 'T1']
    },
    {
      title: "4. The Push",
      desc: "Now that you are up-to-date, you can safely push your commit (C2) to the server for the whole team to see.",
      cmd: "git push origin",
      local: ['C1', 'T1', 'C2'],
      remote: ['C1', 'T1', 'C2'],
      tracking: ['C1', 'T1', 'C2']
    }
  ]

  const current = steps[step]

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 p-3 sm:p-8 bg-surface/40 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden">
       {/* Background decorative elements */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-git/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
       
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-0 sm:mb-2 z-10 gap-2 sm:gap-6">
          <div className="flex flex-col gap-0.5">
             <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded-full bg-secondary/20 text-[8px] sm:text-[10px] text-secondary fw-black uppercase tracking-wider border border-secondary/30">M5</span>
                <span className="text-[8px] sm:text-[10px] text-muted fw-bold uppercase tracking-widest">Lab • {step + 1}/4</span>
             </div>
             <h3 className="text-lg sm:text-2xl fw-black text-white tracking-tight leading-tight">{current.title}</h3>
          </div>
          <div className="flex gap-3">
             <button 
                disabled={step === 0} 
                onClick={() => setStep(s => s - 1)} 
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 active:scale-90 transition-all shadow-inner"
             >
                <ArrowLeft size={20} />
             </button>
             {step === steps.length - 1 ? (
                <button 
                   onClick={() => setStep(0)} 
                   className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-white/10 text-white border border-white/20 hover:bg-white/20 active:scale-95 transition-all text-xs sm:text-sm fw-bold flex gap-2 items-center shadow-lg"
                >
                   <RotateCcw size={16} /> Restart
                </button>
             ) : (
                <button 
                   onClick={() => setStep(s => s + 1)} 
                   className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-git text-white shadow-[0_10px_30px_rgba(240,80,50,0.4)] hover:shadow-[0_15px_40px_rgba(240,80,50,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all text-xs sm:text-sm fw-black flex gap-2 items-center"
                >
                   Next <ArrowRight size={16} />
                </button>
             )}
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-12 mt-2 sm:mt-4 pt-2 sm:pt-4 relative min-h-[auto] sm:min-h-[300px] z-10">
          {/* Animated Fiber Path */}
          <div className="absolute top-[4.5rem] left-[25%] right-[25%] h-0.5 hidden md:block z-0">
             <svg className="w-full h-12 overflow-visible">
                <path d="M 0 6 L 200 6" className="stroke-white/10 stroke-[2] fill-none" strokeDasharray="4 4" />
                <AnimatePresence>
                   {(step === 1 || step === 3) && (
                      <motion.circle
                         initial={{ cx: step === 1 ? "100%" : "0%" }}
                         animate={{ cx: step === 1 ? "0%" : "100%" }}
                         transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                         r="4"
                         cy="6"
                         className={step === 1 ? "fill-secondary shadow-[0_0_10px_rgba(var(--color-secondary),1)]" : "fill-git shadow-[0_0_10px_rgba(240,80,50,1)]"}
                      />
                   )}
                </AnimatePresence>
             </svg>
          </div>

          {/* Local Machine */}
          <div className="flex flex-col gap-4 sm:gap-6">
             <div className="bg-surface2/40 rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-8 border border-white/10 flex flex-col gap-4 sm:gap-8 shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-git/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-white/5 pb-2 sm:pb-5">
                   <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-git/10 text-git flex items-center justify-center shadow-lg border border-git/20">
                         <Laptop size={18} className="sm:hidden" />
                         <Laptop size={24} className="hidden sm:block" />
                      </div>
                      <div className="flex flex-col">
                         <div className="flex items-center gap-2">
                            <span className="text-[8px] sm:text-[10px] fw-black text-muted uppercase tracking-[0.2em] leading-none">Station</span>
                            <div className="flex items-center gap-1 sm:hidden">
                               <div className="w-1.5 h-1.5 rounded-full bg-git animate-pulse" />
                               <span className="text-[7px] fw-bold text-git/80 uppercase">Active</span>
                            </div>
                         </div>
                         <span className="text-xs sm:text-sm fw-black text-white">Local Repository</span>
                      </div>
                   </div>
                   <div className="hidden sm:flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-git animate-pulse" />
                      <span className="text-[10px] fw-bold text-git/80 uppercase">Active</span>
                   </div>
                </div>
                
                <div className="flex flex-col gap-10">
                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-1 h-3 bg-git/50 rounded-full" />
                         <span className="text-[9px] fw-black text-white/40 uppercase tracking-widest">Master / Main Branch</span>
                      </div>
                      <div className="flex flex-wrap gap-4 items-center">
                         <AnimatePresence mode="popLayout">
                            {current.local.map((c, i) => (
                              <motion.div 
                                 key={`local-node-${c}`}
                                 layoutId={`local-id-${c}`}
                                 initial={{ scale: 0, opacity: 0, y: 10 }}
                                 animate={{ scale: 1, opacity: 1, y: 0 }}
                                 exit={{ scale: 0, opacity: 0 }}
                                 transition={{ delay: i * 0.1, type: "spring", damping: 15 }}
                                 className="relative"
                              >
                                 <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-mono text-[8px] sm:text-[10px] fw-black border-2 transition-all duration-500 shadow-xl ${
                                    c === 'C2' 
                                    ? 'bg-git border-git text-white ring-4 ring-git/10' 
                                    : 'bg-surface border-white/20 text-muted/80'
                                 }`}>
                                    {c}
                                 </div>
                                 {i < current.local.length - 1 && (
                                    <div className="absolute top-1/2 -right-4 w-4 h-[2px] bg-white/5 -translate-y-1/2" />
                                 )}
                              </motion.div>
                            ))}
                         </AnimatePresence>
                      </div>
                   </div>

                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-1 h-3 bg-secondary/50 rounded-full" />
                         <span className="text-[9px] fw-black text-secondary/40 uppercase tracking-widest">Origin/Main (Mirror)</span>
                      </div>
                      <div className="flex flex-wrap gap-4 items-center">
                         <AnimatePresence mode="popLayout">
                            {current.tracking.map((c, i) => (
                              <motion.div 
                                 key={`track-node-${c}`}
                                 layoutId={`track-id-${c}`}
                                 initial={{ scale: 0, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 0.7 }}
                                 transition={{ delay: i * 0.1 }}
                                 className="relative"
                              >
                                 <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-dashed flex items-center justify-center font-mono text-[8px] sm:text-[9px] fw-black transition-all ${
                                    c === 'T1' ? 'border-secondary/60 text-secondary bg-secondary/5' : 'border-white/10 text-muted/30'
                                 }`}>
                                    {c}
                                 </div>
                              </motion.div>
                            ))}
                         </AnimatePresence>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* GitHub Remote */}
          <div className="flex flex-col gap-4 sm:gap-6">
             <div className="bg-secondary/5 rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-8 border border-secondary/20 flex flex-col gap-4 sm:gap-8 shadow-xl relative overflow-hidden h-fit sm:h-full group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="flex items-center justify-between border-b border-secondary/10 pb-2 sm:pb-5">
                   <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shadow-lg border border-secondary/20">
                         <Cloud size={18} className="sm:hidden" />
                         <Cloud size={24} className="hidden sm:block" />
                      </div>
                      <div className="flex flex-col">
                         <div className="flex items-center gap-2">
                           <span className="text-[8px] sm:text-[10px] fw-black text-secondary/40 uppercase tracking-[0.2em] leading-none">Server</span>
                           <div className="px-1.5 py-0.5 rounded-full bg-secondary/10 border border-secondary/20 flex items-center gap-1 sm:hidden">
                              <div className="w-1 h-1 rounded-full bg-secondary animate-pulse" />
                              <span className="text-[6px] fw-black text-secondary uppercase tracking-widest">Cloud</span>
                           </div>
                         </div>
                         <span className="text-xs sm:text-sm fw-black text-white">GitHub (Remote)</span>
                      </div>
                   </div>
                   <div className="hidden sm:flex px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                      <span className="text-[8px] fw-black text-secondary uppercase tracking-widest">Cloud Sync</span>
                   </div>
                </div>

                <div className="flex-1 flex flex-col h-full items-center justify-center py-4">
                   <div className="flex flex-wrap gap-6 justify-center items-center">
                      <AnimatePresence mode="popLayout">
                         {current.remote.map((c, i) => (
                           <motion.div 
                              key={`remote-node-${c}`}
                              layoutId={`remote-id-${c}`}
                              initial={{ scale: 0, opacity: 0, x: 20 }}
                              animate={{ scale: 1.1, opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, type: "spring" }}
                              className="relative"
                           >
                              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-mono text-[9px] sm:text-[12px] fw-black border-2 shadow-2xl transition-all duration-700 ${
                                 c === 'T1' 
                                 ? 'bg-secondary/20 border-secondary text-secondary shadow-[0_0_30px_rgba(var(--color-secondary),0.3)]' 
                                 : c === 'C2' 
                                 ? 'bg-git/20 border-git text-git shadow-[0_0_30px_rgba(240,80,50,0.3)]' 
                                 : 'bg-black/60 border-white/10 text-muted/40'
                              }`}>
                                 {c}
                              </div>
                              {i < current.remote.length - 1 && (
                                 <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="absolute -right-6 top-1/2 w-6 h-[1px] bg-secondary/20 -translate-y-1/2" 
                                 />
                              )}
                           </motion.div>
                         ))}
                      </AnimatePresence>
                   </div>
                </div>

                <div className="mt-auto pt-2 sm:pt-6 border-t border-secondary/5 flex items-center justify-center gap-2 text-[8px] sm:text-[10px] fw-black text-secondary/30 uppercase tracking-[0.3em]">
                   <Search size={10} className="sm:hidden" />
                   <Search size={12} className="hidden sm:block" />
                   Remote Visibility
                </div>
             </div>
          </div>
       </div>

       <div className="w-full bg-black/40 rounded-3xl p-3 sm:p-6 border border-white/5 flex flex-col gap-2 sm:gap-5 z-10 backdrop-blur-sm mt-2 sm:mt-4">
          <p className="text-[11px] sm:text-base text-white/80 leading-relaxed fw-medium italic text-center sm:text-left">"{current.desc}"</p>
          <div className="bg-black/60 border border-white/10 rounded-2xl p-2 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-inner overflow-x-auto min-w-0 scrollbar-hide">
             <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <TermIcon size={14} className="sm:hidden" />
                <TermIcon size={18} className="hidden sm:block" />
             </div>
             <code className="text-[11px] sm:text-[15px] font-mono text-secondary fw-bold flex items-center gap-2 whitespace-nowrap pr-6">
                <span className="text-muted opacity-30 select-none">course @ git:</span>
                <span className="text-white">{current.cmd}</span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-5 bg-secondary/50 rounded-sm" />
             </code>
          </div>
       </div>
    </div>
  )
}


function StageLab() {
    const [staged, setStaged] = useState<string[]>([])
    const [committed, setCommitted] = useState<string[]>([])
    const [files] = useState(['file1.js', 'file2.css', 'file3.html'])
    
    const isStaged = (f: string) => staged.includes(f)
    const isCommitted = (f: string) => committed.includes(f)
    
    const handleAdd = (f: string) => {
      if (isStaged(f)) return
      setStaged([...staged, f])
    }
    
    const handleCommit = () => {
      if (staged.length === 0) return
      setCommitted([...committed, ...staged])
      setStaged([])
    }

    const handleReset = () => {
      setStaged([])
      setCommitted([])
    }

    return (
      <div className="w-full flex flex-col gap-6 p-4 sm:p-6 bg-surface/30 rounded-3xl border border-white/5 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:h-64">
           {/* Working Directory */}
           <div className="flex flex-col gap-3">
              <span className="text-[10px] fw-black text-danger uppercase tracking-widest text-center">Working Dir</span>
              <div className="flex-1 bg-black/40 rounded-2xl border border-danger/20 p-3 flex flex-col gap-2 relative">
                 {files.filter(f => !isStaged(f) && !isCommitted(f)).map(f => (
                   <motion.button 
                     layoutId={`file-${f}`}
                     key={f}
                     onClick={() => handleAdd(f)}
                     className="w-full p-3 bg-surface2 border border-danger/30 rounded-xl text-[10px] fw-bold font-mono text-white flex items-center gap-2 hover:bg-danger/20 hover:scale-105 active:scale-95 transition-all shadow-lg"
                   >
                     📄 {f}
                   </motion.button>
                 ))}
                 {files.filter(f => !isStaged(f) && !isCommitted(f)).length === 0 && (
                   <div className="absolute inset-0 flex items-center justify-center text-[9px] text-muted fw-bold opacity-50">Empty</div>
                 )}
              </div>
           </div>

           {/* Staging Area */}
           <div className="flex flex-col gap-3">
              <span className="text-[10px] fw-black text-primary uppercase tracking-widest text-center">Staging</span>
              <div className="flex-1 bg-black/40 rounded-2xl border border-primary/20 p-3 flex flex-col gap-2 relative">
                 {staged.map(f => (
                   <motion.div 
                     layoutId={`file-${f}`}
                     key={f}
                     className="w-full p-3 bg-surface2 border border-primary/30 rounded-xl text-[10px] fw-bold font-mono text-white flex items-center gap-2 shadow-lg"
                   >
                     📄 {f}
                   </motion.div>
                 ))}
                 {staged.length === 0 && (
                   <div className="absolute inset-0 flex items-center justify-center text-[9px] text-muted fw-bold opacity-50">Empty</div>
                 )}
              </div>
           </div>

           {/* Repository */}
           <div className="flex flex-col gap-3">
              <span className="text-[10px] fw-black text-git uppercase tracking-widest text-center">Repository</span>
              <div className="flex-1 bg-black/40 rounded-2xl border border-git/20 p-3 flex flex-col gap-2 relative">
                 {committed.map((f, i) => (
                   <motion.div 
                     layoutId={`file-${f}`}
                     key={f}
                     className="w-full p-3 bg-git border border-git rounded-xl text-[10px] fw-bold font-mono text-white flex items-center gap-2 shadow-lg shadow-git/20"
                     style={{ zIndex: i }}
                   >
                     <CheckCircle size={12} className="text-white/80" /> {f}
                   </motion.div>
                 ))}
                 {committed.length === 0 && (
                   <div className="absolute inset-0 flex items-center justify-center text-[9px] text-muted fw-bold opacity-50">Empty</div>
                 )}
              </div>
           </div>
        </div>
        
        <div className="flex justify-between items-start px-2 mt-4">
           <div className="text-[12px] text-white/70 max-w-[200px] leading-relaxed fw-med">
             {staged.length === 0 && committed.length === 0 && "1. Click a file in the Working Directory to add it to staging."}
             {staged.length > 0 && "2. Hit 'Git Commit' to save staged files to the repository permanently."}
             {committed.length > 0 && staged.length === 0 && "3. Committed! Files are safely stored."}
           </div>
           <div className="flex gap-2">
             <button 
               onClick={handleReset}
               className="p-3 rounded-xl bg-surface2 text-muted hover:text-white transition-all border border-white/5 active:scale-95"
               title="Reset Lab"
             >
               <RefreshCcw size={16} />
             </button>
             <button 
               disabled={staged.length === 0} 
               onClick={handleCommit} 
               className="px-6 py-3 rounded-xl bg-git text-white text-[12px] fw-black disabled:opacity-20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-git/20"
             >
               GIT COMMIT
             </button>
           </div>
        </div>
      </div>
    )
}

function HeadLab() {
    const [step, setStep] = useState(0)
    const steps = [
      { 
        title: "Initial State", 
        desc: "HEAD points to the 'main' branch, which points to commit C1.", 
        pos: { main: 0, head: 'main' },
        cmd: "# On branch main"
      },
      { 
        title: "New Commit", 
        desc: "You made C2. 'main' moved to C2, and HEAD followed 'main'.", 
        pos: { main: 1, head: 'main' },
        cmd: "git commit -m 'Add C2'"
      },
      { 
        title: "Detached HEAD", 
        desc: "You checked out C1 directly. HEAD now points to the commit, NOT a branch!", 
        pos: { main: 1, head: 0 },
        cmd: "git checkout C1"
      }
    ]

    return (
      <div className="w-full flex flex-col items-center gap-6 p-4 sm:p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
        <div className="w-full flex items-center justify-between mb-2">
           <div className="flex flex-col">
              <span className="text-xs text-primary fw-black uppercase tracking-widest leading-none mb-2">HEAD Simulation • Step {step + 1}</span>
              <h3 className="text-xl fw-black text-white">{steps[step].title}</h3>
           </div>
           <div className="flex gap-2">
              <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-3 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"><ArrowLeft size={18} /></button>
              <button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)} className="px-5 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm fw-bold flex gap-2 items-center">Next <ArrowRight size={18} /></button>
           </div>
        </div>

        {/* Narrative & Command Panel */}
        <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
           <p className="text-sm text-white/90 leading-relaxed fw-medium">{steps[step].desc}</p>
           <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
              <TermIcon size={18} className="text-muted shrink-0" />
              <code className="text-[11px] sm:text-sm font-mono text-git fw-bold whitespace-nowrap pr-6">
                 <span className="text-muted opacity-50 mr-2">$</span>
                 {steps[step].cmd}
              </code>
           </div>
        </div>

        {/* Visualization */}
        <div className="w-full bg-surface2/40 rounded-2xl border border-white/5 p-12 relative min-h-[220px] flex flex-col items-center justify-center gap-12 mt-2">
           <div className="flex gap-24 relative">
              <div className="absolute top-1/2 left-6 right-6 h-1 bg-white/10 -translate-y-1/2 rounded-full" />
              {[0, 1].map(i => (
                <div key={i} className="flex flex-col items-center gap-4 relative">
                   <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-lg fw-black font-mono shadow-xl transition-all ${step >= i ? 'bg-surface border-git text-white shadow-git/20 scale-100' : 'bg-surface2 border-white/5 text-muted opacity-30 scale-90'}`}>C{i+1}</div>
                   {steps[step].pos.main === i && (
                     <motion.div layoutId="main-label" className="absolute -bottom-12 px-4 py-2 rounded-lg bg-git text-[11px] fw-black text-white shadow-lg">MAIN</motion.div>
                   )}
                   {steps[step].pos.head === i && (
                     <motion.div layoutId="head-label" className="absolute -top-12 px-4 py-2 rounded-lg bg-primary text-[11px] fw-black text-white shadow-lg shadow-primary/20 z-10">HEAD 📍</motion.div>
                   )}
                </div>
              ))}
           </div>
           
           {steps[step].pos.head === 'main' && (
              <motion.div layoutId="head-label" className="absolute top-6 right-8 px-4 py-2 rounded-lg bg-primary text-[11px] fw-black text-white shadow-lg shadow-primary/20 z-10">
                 HEAD 📍 (attached to Main)
              </motion.div>
           )}
        </div>
      </div>
    )
}

function UndoSandbox() {
  const [mode, setMode] = useState<'revert' | 'reset'>('revert')
  const [step, setStep] = useState(0)
  
  const scenarios = {
    revert: [
      {
        title: "1. Healthy State",
        desc: "You are working normally. History is clean and stable.",
        cmd: "# on branch main",
        commits: ['C1', 'C2']
      },
      {
        title: "2. The Mistake",
        desc: "You accidentally committed code that breaks the build (C3).",
        cmd: "git commit -m 'Oops, bug!'",
        commits: ['C1', 'C2', 'C3 (Error)']
      },
      {
        title: "3. Safe Revert",
        desc: "You run revert. Git creates a NEW commit (C4) that undoes C3's changes. History is preserved.",
        cmd: "git revert HEAD",
        commits: ['C1', 'C2', 'C3 (Error)', 'C4 (Fix)']
      }
    ],
    reset: [
      {
        title: "1. Healthy State",
        desc: "You are working normally. History is clean and stable.",
        cmd: "# on branch main",
        commits: ['C1', 'C2']
      },
      {
        title: "2. The Mistake",
        desc: "You accidentally committed code that breaks the build (C3).",
        cmd: "git commit -m 'Oops, bug!'",
        commits: ['C1', 'C2', 'C3 (Error)']
      },
      {
        title: "3. Hard Reset",
        desc: "You run reset --hard. The timeline moves back to C2, and C3 is physically deleted from history.",
        cmd: "git reset --hard HEAD~1",
        commits: ['C1', 'C2']
      }
    ]
  }

  const currentScenario = scenarios[mode]
  const currentStep = currentScenario[step] || currentScenario[0]

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-primary fw-black uppercase tracking-widest leading-none mb-2">Time Travel Simulation</span>
             <h3 className="text-xl fw-black text-white">{currentStep.title}</h3>
          </div>
          <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
             <button 
               onClick={() => { setMode('revert'); setStep(0); }} 
               className={`px-5 py-2.5 rounded-xl text-xs fw-bold transition-all ${mode === 'revert' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted hover:text-white'}`}
             >
               Revert Path
             </button>
             <button 
               onClick={() => { setMode('reset'); setStep(0); }} 
               className={`px-5 py-2.5 rounded-xl text-xs fw-bold transition-all ${mode === 'reset' ? 'bg-danger text-white shadow-lg shadow-danger/20' : 'text-muted hover:text-white'}`}
             >
               Reset Path
             </button>
          </div>
       </div>

       {/* Narrative & Command Panel */}
        <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
           <div className="flex justify-between items-start">
              <p className="text-sm text-white/90 leading-relaxed fw-medium max-w-[70%]">
                 {currentStep.desc}
              </p>
              <div className="flex gap-2">
                 <button 
                   disabled={step === 0} 
                   onClick={() => setStep(s => s - 1)} 
                   className="p-2 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"
                 >
                   <ArrowLeft size={16} />
                 </button>
                 <button 
                   disabled={step === currentScenario.length - 1} 
                   onClick={() => setStep(s => s + 1)} 
                   className={`px-4 py-2 rounded-xl text-white shadow-lg transition-all text-xs fw-bold flex gap-2 items-center ${mode === 'revert' ? 'bg-primary shadow-primary/20' : 'bg-danger shadow-danger/20'} disabled:opacity-30`}
                 >
                   Next <ArrowRight size={16} />
                 </button>
              </div>
           </div>
           <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
              <TermIcon size={18} className="text-muted shrink-0" />
              <code className={`text-[11px] sm:text-sm font-mono fw-bold whitespace-nowrap pr-6 ${mode === 'revert' ? 'text-primary' : 'text-danger'}`}>
                 <span className="text-muted opacity-50 mr-2">$</span>
                 {currentStep.cmd}
              </code>
           </div>
        </div>

       <div className="bg-surface2/40 rounded-3xl border border-white/5 p-12 flex flex-col items-center justify-center gap-8 relative min-h-[220px]">
          <div className="flex items-center relative w-full justify-center">
             <AnimatePresence mode="popLayout">
                {currentStep.commits.map((c, i) => (
                  <motion.div key={c} layout className="flex items-center">
                    <motion.div 
                      layout
                      initial={{ scale: 0, opacity: 0, rotate: -45 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0, y: 50, rotate: 90, filter: 'blur(10px)' }}
                      transition={{ type: 'spring', damping: 20 }}
                      className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center text-[10px] fw-black font-mono shadow-xl relative z-10 transition-colors ${
                        c.includes('Error')
                           ? 'border-danger/40 bg-danger/10 text-danger/60 ' + (step === 2 && mode === 'revert' ? 'line-through' : '')
                           : c.includes('Fix')
                              ? 'border-primary bg-primary/20 text-primary shadow-primary/20' 
                              : 'border-git/50 bg-surface text-white shadow-git/10'
                      }`}
                    >
                       <span className="text-base">{c.split(' ')[0]}</span>
                       {c.includes('(') && <span className="text-[8px] opacity-70 uppercase tracking-widest mt-1">{c.split(' ')[1]?.replace(/[()]/g, '')}</span>}
                    </motion.div>
                    
                    {i < currentStep.commits.length - 1 && (
                      <motion.div layout initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="text-white/20 px-3">
                         <div className="h-1 w-8 bg-white/10 rounded-full" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>
       </div>

    </div>
  )
}

function CherryPickLab() {
  const [step, setStep] = useState(0)
  const steps = [
    { 
      title: "1. The Scenario", 
      desc: "Problem: You fixed a critical bug (Fix) on the 'Experimental' branch, but the rest of that branch is a mess. You only want the fix!", 
      main: ['C1', 'C2'],
      feat: ['A', 'B', 'Fix'],
      cmd: "git log --oneline"
    },
    { 
      title: "2. The Harvest", 
      desc: "Instead of merging the whole experimental branch, you 'Cherry-pick' just the Fix commit. Surgical precision!", 
      main: ['C1', 'C2'],
      feat: ['A', 'B', 'Fix'],
      activeHash: 'Fix',
      cmd: "git cherry-pick [Fix-Hash]"
    },
    { 
      title: "3. Clean Result", 
      desc: "The fix is now in your main branch as a new commit (Fix*). Your experimental branch stays messy, but your main branch is patched.", 
      main: ['C1', 'C2', 'Fix*'],
      feat: ['A', 'B', 'Fix'],
      cmd: "# Done!"
    }
  ]

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
       <div className="w-full flex items-center justify-between mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-xp fw-black uppercase tracking-widest leading-none mb-2">Cherry-Pick Simulation • Step {step + 1}</span>
             <h3 className="text-xl fw-black text-white">{steps[step].title}</h3>
          </div>
          <div className="flex gap-2">
             <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-3 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"><ArrowLeft size={18} /></button>
             <button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)} className="px-5 py-3 rounded-xl bg-xp text-black shadow-lg shadow-xp/20 hover:scale-105 active:scale-95 transition-all text-sm fw-bold flex gap-2 items-center">Next <ArrowRight size={18} /></button>
          </div>
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
          <p className="text-sm text-white/90 leading-relaxed fw-medium">{steps[step].desc}</p>
          <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
             <TermIcon size={18} className="text-muted shrink-0" />
             <code className="text-[11px] sm:text-sm font-mono text-xp fw-bold whitespace-nowrap pr-6">
                <span className="text-muted opacity-50 mr-2">$</span>
                {steps[step].cmd}
             </code>
          </div>
       </div>

       <div className="flex flex-col gap-10 mt-4 p-8 bg-surface2/20 rounded-2xl border border-white/5 relative overflow-hidden">
          {/* Main Branch Line */}
          <div className="relative">
             <div className="flex items-center gap-6 relative z-10">
                <span className="w-20 text-[10px] fw-black text-git uppercase tracking-widest">Main</span>
                <div className="flex items-center gap-4">
                   <AnimatePresence mode="popLayout">
                      {steps[step].main.map((c, i) => (
                        <div key={c} className="flex items-center">
                           <motion.div 
                              layoutId={`main-${c}`}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[10px] fw-bold border-2 ${c === 'C*' ? 'bg-xp border-xp text-black shadow-lg shadow-xp/30' : 'bg-surface border-white/10 text-muted'}`}
                           >
                              {c}
                           </motion.div>
                           {i < steps[step].main.length - 1 && <div className="w-6 h-0.5 bg-white/5" />}
                        </div>
                      ))}
                   </AnimatePresence>
                </div>
             </div>
             <div className="absolute left-[84px] right-0 h-0.5 bg-white/5 top-1/2 -z-0" />
          </div>

          {/* Feature Branch Line */}
          <div className="relative">
             <div className="flex items-center gap-6 relative z-10">
                <span className="w-20 text-[10px] fw-black text-primary uppercase tracking-widest">Feat</span>
                <div className="flex items-center gap-4">
                   {steps[step].feat.map((c, i) => (
                     <div key={c} className="flex items-center">
                        <motion.div 
                           className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[10px] fw-bold border-2 transition-all ${
                             steps[step].activeHash === c 
                               ? 'bg-xp border-xp text-black scale-110 shadow-xl z-20' 
                               : 'bg-surface2 border-white/5 text-muted opacity-40'
                           }`}
                        >
                           {c}
                        </motion.div>
                        {i < steps[step].feat.length - 1 && <div className="w-6 h-0.5 bg-white/5" />}
                     </div>
                   ))}
                </div>
             </div>
             <div className="absolute left-[84px] right-0 h-0.5 bg-white/5 top-1/2 -z-0" />
          </div>

          {/* Connection Line */}
          <div className="absolute left-[104px] top-[48px] bottom-[48px] w-0.5 bg-white/5 border-l border-dashed border-white/10" />
       </div>
    </div>
  )
}

function MiniGame({ gameType, gameData, onComplete }: { gameType: string, gameData: unknown, onComplete?: () => void }) {
  if (gameType === 'drag-order') {
    return <DragOrderGame items={gameData as GameDataItem[]} onComplete={onComplete} />
  }

  if (gameType === 'drag-classify') {
    const data = gameData as GameDataClassify
    return <DragClassifyGame categories={data.categories} items={data.items} onComplete={onComplete} />
  }

  if (gameType === 'terminal-sim') {
    return <TerminalSimulatorGame data={gameData as TerminalGameData} onComplete={onComplete} />
  }

  if (gameType === 'git-graph-sim') {
    return <GitGraphSim data={gameData as GitGraphGameData} onComplete={onComplete} />
  }

  return <div className="p-10 text-center text-muted border border-dashed rounded-xl">Game Module Coming Soon...</div>
}


function DragOrderGame({ items, onComplete }: { items: { id: string, label: string }[], onComplete?: () => void }) {
  const [solved, setSolved] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(() => [...items].sort(() => Math.random() - 0.5))
  
  const handleReorder = (newOrder: typeof currentOrder) => {
    if (solved) return
    setCurrentOrder(newOrder)
    const isCorrect = newOrder.every((item, i) => item.id === items[i].id)
    if (isCorrect) {
        setSolved(true)
        if (onComplete) onComplete()
    }
  }

  return (
    <div className="card p-6 border-purple-500/20 bg-purple-500/5">
      <div className="text-center mb-6">
        <h4 className="text-white fw-black uppercase tracking-tight mb-1">Challenge: Order the Workflow</h4>
        <p className="text-muted text-xs">Drag the steps into the correct chronological sequence.</p>
      </div>

      <Reorder.Group axis="y" values={currentOrder} onReorder={handleReorder} className="flex flex-col gap-2 mb-6">
         {currentOrder.map((item, idx) => (
           <Reorder.Item
             key={item.id}
             value={item}
             className={`p-3 rounded-xl border flex items-center justify-between cursor-grab active:cursor-grabbing group transition-colors shadow-sm
               ${solved ? 'bg-green/10 border-green/30 !cursor-default' : 'bg-surface2 border-white/5 hover:border-white/20'}
             `}
           >
              <div className="flex items-center gap-3 select-none">
                 <div className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center text-[10px] fw-black text-muted group-hover:text-white transition-colors">
                    {idx + 1}
                 </div>
                 <span className="text-sm fw-bold text-sub group-hover:text-white transition-colors">{item.label}</span>
              </div>
              {solved && <CheckCircle size={14} className="text-green" />}
           </Reorder.Item>
         ))}
      </Reorder.Group>

      {solved && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green text-white fw-black text-sm">
              <Trophy size={16} /> Workflow Mastered! (+10 XP)
           </div>
        </motion.div>
      )}
    </div>
  )
}

function DragClassifyGame({ categories, items, onComplete }: { categories: { id: string, label: string }[], items: { id: string, label: string, categoryId: string }[], onComplete?: () => void }) {
  const [solved, setSolved] = useState(false)
  const [selections, setSelections] = useState<Record<string, string>>({}) // itemId -> categoryId
  const [currentItems] = useState(() => [...items].sort(() => Math.random() - 0.5))

  const classify = (itemId: string, catId: string) => {
    const newSels = { ...selections, [itemId]: catId }
    setSelections(newSels)
    
    const allDone = items.length === Object.keys(newSels).length
    const allCorrect = items.every(item => newSels[item.id] === item.categoryId)
    if (allDone && allCorrect) {
        setSolved(true)
        if (onComplete) onComplete()
    }
  }

  return (
    <div className="card p-6 border-blue-500/20 bg-blue-500/5">
      <div className="text-center mb-6">
        <h4 className="text-white fw-black uppercase tracking-tight mb-1">Challenge: Categorize Components</h4>
        <p className="text-muted text-xs">Assign each item to its correct architectural layer.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
         {categories.map(cat => (
           <div key={cat.id} className="p-4 rounded-xl border border-white/10 bg-black/20 text-center min-h-[120px] flex flex-col items-center gap-3">
              <span className="text-[10px] sm:text-xs fw-black text-white uppercase tracking-widest">{cat.label}</span>
              <div className="flex flex-wrap justify-center gap-2">
                 {items.filter(i => selections[i.id] === cat.id).map(i => (
                   <div key={i.id} className="px-2 py-1 rounded bg-white/10 text-[10px] sm:text-xs text-white">
                      {i.label}
                   </div>
                 ))}
              </div>
           </div>
         ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
         {currentItems.filter(i => !selections[i.id]).map(item => (
           <div key={item.id} className="p-3 pr-2 rounded-xl bg-surface2 border border-white/5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <span className="text-xs fw-bold text-white text-center sm:text-left">{item.label}</span>
              <div className="flex gap-1 flex-wrap justify-center">
                 {categories.map(cat => (
                   <button 
                     key={cat.id} 
                     onClick={() => classify(item.id, cat.id)}
                     className="px-3 py-1.5 rounded text-[10px] sm:text-xs fw-black bg-white/5 hover:bg-primary hover:text-white transition-colors uppercase"
                   >
                     {cat.label}
                   </button>
                 ))}
              </div>
           </div>
         ))}
      </div>

      {solved && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center mt-6">
           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green text-white fw-black text-sm">
              <Trophy size={16} /> Architecture Validated! (+15 XP)
           </div>
        </motion.div>
      )}
    </div>
  )
}
function StashLab() {
  const [step, setStep] = useState(0)
  const steps = [
    { 
      title: "1. Muddy Work", 
      desc: "You have unfinished files. You must switch branches to fix a bug, but you aren't ready to commit.", 
      wd: ['feat_progress.js', 'style_fix.css'],
      stash: [],
      cmd: "# I'm not ready to commit yet..."
    },
    { 
      title: "2. Git Stash", 
      desc: "You 'stash' your changes. Git takes them and puts them on a hidden shelf, leaving your workspace clean.", 
      wd: [],
      stash: ['feat_progress.js', 'style_fix.css'],
      cmd: "git stash"
    },
    { 
      title: "3. Clean Context", 
      desc: "Now your workspace is clean. You can safely switch branches, do your other work, and come back.", 
      wd: [],
      stash: ['feat_progress.js', 'style_fix.css'],
      cmd: "git checkout hotfix-branch"
    },
    { 
      title: "4. Git Stash Pop", 
      desc: "Back on main, you 'pop' the stash. Your work safely returns to your folders exactly where you left it.", 
      wd: ['feat_progress.js', 'style_fix.css'],
      stash: [],
      cmd: "git stash pop"
    }
  ]

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
       <div className="w-full flex items-center justify-between mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-primary fw-black uppercase tracking-widest leading-none mb-2">Stash Simulation • Step {step + 1}</span>
             <h3 className="text-xl fw-black text-white">{steps[step].title}</h3>
          </div>
          <div className="flex gap-2">
             <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-3 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"><ArrowLeft size={18} /></button>
             <button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)} className="px-5 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm fw-bold flex gap-2 items-center">Next <ArrowRight size={18} /></button>
          </div>
       </div>


       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          {/* Working Dir Column */}
          <div className="flex flex-col gap-3">
             <span className="text-[10px] fw-black text-muted uppercase tracking-widest text-center">Working Directory</span>
             <div className="bg-surface2/40 rounded-2xl border border-white/5 p-6 min-h-[160px] flex flex-col gap-3 items-center justify-center">
                <AnimatePresence mode="popLayout">
                   {steps[step].wd.map(f => (
                     <motion.div 
                       layoutId={`stash-file-${f}`}
                       key={f} 
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ y: 20, opacity: 0 }}
                       className="w-full p-3 bg-surface border border-white/10 rounded-xl text-[10px] fw-bold font-mono text-white flex items-center gap-2"
                     >
                        📄 {f}
                     </motion.div>
                   ))}
                </AnimatePresence>
                {steps[step].wd.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} className="text-[10px] fw-bold italic text-muted">Clean Workspace ✨</motion.div>
                )}
             </div>
          </div>

          {/* Stash Shelf Column */}
          <div className="flex flex-col gap-3">
             <span className="text-[10px] fw-black text-primary uppercase tracking-widest text-center">Git Stash (Hidden Shelf)</span>
             <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6 min-h-[160px] flex flex-col gap-3 items-center justify-center">
                <AnimatePresence mode="popLayout">
                   {steps[step].stash.map(f => (
                     <motion.div 
                       layoutId={`stash-file-${f}`}
                       key={f} 
                       initial={{ y: -20, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1, y: 0 }}
                       exit={{ scale: 0, opacity: 0 }}
                       className="w-full p-3 bg-primary/20 border border-primary/30 rounded-xl text-[10px] fw-bold font-mono text-white flex items-center gap-2"
                     >
                        📦 {f}
                     </motion.div>
                   ))}
                </AnimatePresence>
                {steps[step].stash.length === 0 && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} className="text-[10px] fw-bold italic text-white/50">Shelf Empty</motion.div>
                )}
             </div>
          </div>
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4 mt-2">
          <p className="text-sm text-white/90 leading-relaxed fw-medium">{steps[step].desc}</p>
          <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3">
             <TermIcon size={18} className="text-muted" />
             <code className="text-sm font-mono text-git fw-bold">
                <span className="text-muted opacity-50 mr-2">$</span>
                {steps[step].cmd}
             </code>
          </div>
       </div>
    </div>
  )
}
function BisectLab() {
  const [step, setStep] = useState(0)
  const marked: Partial<Record<number, 'good' | 'bad'>> = useMemo(() => {
    if (step === 1) return { 1: 'good', 7: 'bad', 4: 'bad' }
    if (step === 2) return { 1: 'good', 7: 'bad', 4: 'bad', 2: 'good' }
    if (step === 3 || step === 4) return { 1: 'good', 7: 'bad', 4: 'bad', 2: 'good', 3: 'bad' }
    return { 1: 'good', 7: 'bad' }
  }, [step])

  const steps = [
    {
      title: "1. The Bug Hunter",
      desc: "A bug was introduced somewhere! Commit 1 is 'Good' (Green), but Commit 7 is 'Bad' (Red). Let's find the exact culprit.",
      cmd: "git bisect start",
      focus: null
    },
    {
      title: "2. The Middle Ground",
      desc: "Git picks the middle commit (4) for you to test. You run your tests and find it's also 'Bad'.",
      cmd: "git bisect bad",
      focus: 4
    },
    {
      title: "3. Narrowing Down",
      desc: "Since 4 is Bad, the bug must be between 1 and 4. Git now suggests Commit 2. You test it and it's 'Good'!",
      cmd: "git bisect good",
      focus: 2
    },
    {
       title: "4. The Final Check",
       desc: "The search is almost over. Git picks Commit 3. You test it and it's 'Bad'. That's it!",
       cmd: "git bisect bad",
       focus: 3
    },
    {
       title: "5. Culprit Found!",
       desc: "Commit 3 is the first 'Bad' commit. You found the needle in the haystack! Now you can fix it.",
       cmd: "a1b2c3d is the first bad commit",
       focus: 3
    }
  ]

  const current = steps[step]

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
       <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-primary fw-black uppercase tracking-widest leading-none mb-2">Bisect Lab • Step {step + 1}</span>
             <h3 className="text-xl fw-black text-white">{current.title}</h3>
          </div>
          <div className="flex gap-2">
             <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-3 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"><ArrowLeft size={18} /></button>
             <button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)} className="px-5 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm fw-bold flex gap-2 items-center">Next <ArrowRight size={18} /></button>
          </div>
       </div>


       <div className="bg-surface2/40 rounded-2xl border border-white/5 p-10 mt-2 relative flex items-center justify-between gap-2 overflow-hidden">
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-white/5 -translate-y-1/2 rounded-full" />
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <div key={i} className="flex flex-col items-center gap-4 relative z-10">
               <motion.div 
                 animate={{ 
                   scale: current.focus === i ? 1.2 : 1,
                   borderColor: marked[i] === 'good' ? '#06d6a0' : marked[i] === 'bad' ? '#ff4b4b' : 'rgba(255,255,255,0.1)',
                   backgroundColor: marked[i] === 'good' ? 'rgba(6, 214, 160, 0.1)' : marked[i] === 'bad' ? 'rgba(255, 75, 75, 0.1)' : 'rgba(0,0,0,0.4)'
                 }}
                 className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-[10px] fw-bold shadow-xl transition-all ${current.focus === i ? 'ring-4 ring-primary/20' : ''}`}
               >
                  {i}
               </motion.div>
               {marked[i] && (
                 <motion.span 
                   initial={{ y: 20, opacity: 0 }} 
                   animate={{ y: 0, opacity: 1 }}
                   className={`text-[8px] fw-black uppercase tracking-widest ${marked[i] === 'good' ? 'text-git' : 'text-danger'}`}
                 >
                   {marked[i]}
                 </motion.span>
               )}
               {current.focus === i && (
                 <motion.div layoutId="cursor" className="absolute -top-10 text-primary animate-bounce">
                    <ArrowUp size={20} />
                 </motion.div>
               )}
            </div>
          ))}
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4 mt-2">
          <p className="text-sm text-white/90 leading-relaxed fw-medium">{current.desc}</p>
          <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
             <TermIcon size={18} className="text-muted shrink-0" />
             <code className="text-[11px] sm:text-sm font-mono text-primary fw-bold whitespace-nowrap pr-6">
                <span className="text-muted opacity-50 mr-2">$</span>
                {current.cmd}
             </code>
          </div>
       </div>
    </div>
  )
}

function IgnoreLab({ onComplete }: { onComplete?: () => void }) {
  const [ignored, setIgnored] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isDone, setIsDone] = useState(false)
  
  const files = [
    { name: 'index.html', type: 'code', shouldIgnore: false, tip: "Keep! This is your project's heart." },
    { name: 'node_modules/', type: 'bulky', shouldIgnore: true, tip: "Ignore! It's too big and can be rebuilt via npm install." },
    { name: '.env', type: 'secret', shouldIgnore: true, tip: "IGNORE! Never share your API keys or passwords." },
    { name: 'style.css', type: 'code', shouldIgnore: false, tip: "Keep! Essential for your app's look." },
    { name: 'secrets.txt', type: 'secret', shouldIgnore: true, tip: "IGNORE! Private notes should never be on GitHub." },
    { name: 'dist/', type: 'bulky', shouldIgnore: true, tip: "Ignore! These are generated files, not source code." }
  ]

  const handleToggle = (name: string) => {
    if (isDone) return;
    const file = files.find(f => f.name === name)
    if (!file) return
    
    let newIgnored;
    if (ignored.includes(name)) {
      newIgnored = ignored.filter(n => n !== name);
    } else {
      newIgnored = [...ignored, name];
      setFeedback(file.tip);
      setTimeout(() => setFeedback(null), 3000);
    }
    
    setIgnored(newIgnored);
    
    // Check completion immediately
    const newScore = files.filter(f => (f.shouldIgnore && newIgnored.includes(f.name)) || (!f.shouldIgnore && !newIgnored.includes(f.name))).length;
    if (newScore === files.length) {
      setIsDone(true);
      if (onComplete) onComplete();
    }
  }

  const score = files.filter(f => (f.shouldIgnore && ignored.includes(f.name)) || (!f.shouldIgnore && !ignored.includes(f.name))).length;

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-[#0d1117]/80 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
       <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-secondary font-black uppercase tracking-widest leading-none mb-2">Security Lab • .gitignore</span>
             <h3 className="text-xl font-black text-white">The Filtering Game</h3>
          </div>
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-[10px] font-black text-muted">
             ACCURACY: <span className={score === files.length ? 'text-[#06d6a0]' : 'text-primary'}>{Math.round((score/files.length)*100)}%</span>
          </div>
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
          <p className="text-sm text-white/90 leading-relaxed font-medium">Click on the files you think should be **ignored** (kept out of Git).</p>
          <AnimatePresence mode="wait">
            {feedback && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold flex items-center gap-2"
              >
                <Lightbulb size={14} /> {feedback}
              </motion.div>
            )}
          </AnimatePresence>
       </div>

       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
          {files.map(f => (
            <motion.button
              key={f.name}
              onClick={() => handleToggle(f.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 relative ${
                ignored.includes(f.name) 
                  ? 'bg-black/60 border-[#06d6a0] shadow-lg shadow-[#06d6a0]/10' 
                  : 'bg-[#1c2128] border-white/5 hover:border-white/10 hover:bg-[#22272e]'
              }`}
            >
               <div className={`p-3 rounded-xl ${ignored.includes(f.name) ? 'bg-[#06d6a0]/10 text-[#06d6a0]' : 'bg-white/5 text-muted'}`}>
                  {f.type === 'secret' ? <ShieldCheck size={20} /> : f.type === 'bulky' ? <Cloud size={20} /> : <Code2 size={20} />}
               </div>
               <span className={`text-[10px] font-black uppercase tracking-wider ${ignored.includes(f.name) ? 'text-white' : 'text-muted'}`}>{f.name}</span>
               {ignored.includes(f.name) && (
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#06d6a0] text-black flex items-center justify-center shadow-lg shadow-[#06d6a0]/40">
                    <CheckCircle size={14} />
                 </motion.div>
               )}
            </motion.button>
          ))}
       </div>

       {score === files.length && (
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#06d6a0]/10 border border-[#06d6a0]/20 p-4 rounded-xl flex items-center justify-center gap-3">
            <Trophy className="text-[#06d6a0]" size={20} />
            <span className="text-xs font-black text-[#06d6a0] uppercase tracking-widest italic">Mission Cleared! Your repo is safe and clean.</span>
         </motion.div>
       )}
    </div>
  )
}

function TerminalSimulatorGame({ data, onComplete }: { data: TerminalGameData, onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<{type: 'cmd' | 'out', text: string}[]>([])
  
  // Use a ref to scroll to bottom
  const scrollRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const step = data?.steps?.[currentStep]
  const isFinished = data?.steps && currentStep >= data.steps.length;

  if (!data?.steps) return null

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const val = input.trim()
      const newHistory = [...history, { type: 'cmd' as const, text: (data.startText || '$ ') + val }]
      
      if (!isFinished && val === step?.expectedCommand) {
         if (step.output) {
           newHistory.push({ type: 'out' as const, text: step.output })
         }
         const nextStep = currentStep + 1;
         setCurrentStep(nextStep);
         
         // Se abbiamo finito tutti gli step
         if (data?.steps && nextStep >= data.steps.length) {
           if (onComplete) onComplete();
           confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
         }
      } else {
         newHistory.push({ type: 'out' as const, text: `Command not found or unexpected: ${val}` })
      }
      
      setHistory(newHistory)
      setInput('')
    }
  }

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex justify-between items-center mb-2">
         <div className="flex flex-col">
            <span className="text-xs text-secondary font-black uppercase tracking-widest leading-none mb-2">Interactive Terminal</span>
            <h3 className="text-xl font-black text-white">Command Line Simulator</h3>
         </div>
         <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-[10px] font-black text-muted">
            STEP: <span className={isFinished ? 'text-git' : 'text-primary'}>{Math.min(currentStep + 1, data.steps.length)} / {data.steps.length}</span>
         </div>
      </div>

      <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
         {!isFinished ? (
           <p className="text-sm text-white/90 leading-relaxed fw-medium">
             {step.instruction}
           </p>
         ) : (
           <div className="p-3 bg-git/10 text-git rounded-xl border border-git/20 text-xs font-black tracking-wider uppercase text-center flex items-center justify-center gap-2">
             <CheckCircle size={16} /> Simulator Completed!
           </div>
         )}
      </div>

      <div className="w-full bg-black rounded-lg border border-white/10 p-4 font-mono text-xs md:text-sm flex flex-col min-h-[300px] h-[300px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-2 pb-2 scrollbar-thin scrollbar-thumb-white/10">
           {history.map((h, i) => (
             <div key={i} className={h.type === 'cmd' ? "text-white" : "text-muted whitespace-pre-wrap"}>
               {h.text}
             </div>
           ))}
           {!isFinished && (
             <div className="flex items-center mt-3 gap-2 bg-black/50 border border-white/10 focus-within:border-primary/50 focus-within:bg-black/80 rounded-md p-2 transition-all shadow-inner">
               <span className="text-primary font-black whitespace-pre">{data.startText || '$ '}</span>
               <input 
                 type="text"
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 onKeyDown={handleKeyDown}
                 spellCheck={false}
                 className="flex-1 bg-transparent outline-none border-none text-primary placeholder:text-white/20 font-mono caret-primary min-w-0"
                 placeholder="Type here..."
               />
               <div className="text-[10px] text-white/30 font-sans px-2 hidden sm:block">Press ENTER</div>
             </div>
           )}
        </div>
      </div>
    </div>
  )
}

