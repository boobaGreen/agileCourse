import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { GIT_MODULES } from '../data/git/modules'
import { DOCKER_MODULES } from '../data/docker/modules'
import { K8S_MODULES } from '../data/k8s/modules'
import type { Section, QuizQuestion } from '../data/git/modules'
import {
  ArrowLeft, ArrowRight, Zap,
  ExternalLink, BookOpen, Code2, Lightbulb, Sparkles,
  LayoutGrid, Workflow, Play, Image, Gamepad2, CheckCircle, Trophy
} from 'lucide-react'
import confetti from 'canvas-confetti'

type GameDataItem = { id: string, label: string }
type GameDataClassify = { 
  categories: { id: string, label: string }[], 
  items: { id: string, label: string, categoryId: string }[] 
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
      
      if (mod.id === 'git-1') awardBadge({ id: 'git-seedling', emoji: '🌱', title: 'Git Seedling', description: 'Completed your first Git module' })
      if (mod.id === 'git-9') awardBadge({ id: 'git-branching', emoji: '🌿', title: 'Branching Out', description: 'Completed all Git modules' })
      if (mod.id === 'docker-1') awardBadge({ id: 'docker-mate', emoji: '⚓', title: 'First Mate', description: 'Mastered the basics of containers' })
      if (mod.id === 'docker-9') awardBadge({ id: 'docker-harbor', emoji: '🐋', title: 'Harbor Master', description: 'Completed the full Docker curriculum' })
      if (mod.id === 'k8s-1') awardBadge({ id: 'k8s-kybernitis', emoji: '☸️', title: 'Kybernitis', description: 'Started the Kubernetes journey' })
      if (mod.id === 'k8s-9') awardBadge({ id: 'k8s-admiral', emoji: '🤴', title: 'Fleet Admiral', description: 'Mastered the art of orchestration' })
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
            <div className="card mb-6 mb-8" style={{ borderColor: `${trackColor}40` }}>
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
                <SectionCard key={i} section={section} />
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

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
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

            <div className="flex justify-between gap-4">
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

function SectionCard({ section }: { section: Section }) {
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
          <p key={i} className="mb-2 last:mb-0">
             {line.split(/\*\*(.*?)\*\*/g).map((part, pi) => {
               if (pi % 2 === 1) return <strong key={pi} className="text-white">{part}</strong>
               // Split plain text segments by URLs and render them as links
               return part.split(/(https?:\/\/[^\s),]+)/g).map((seg, si) =>
                 /^https?:\/\//.test(seg)
                   ? <a key={`${pi}-${si}`} href={seg} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{seg}</a>
                   : <React.Fragment key={`${pi}-${si}`}>{seg}</React.Fragment>
               )
             })}
          </p>
        ))}
      </div>

      {section.type === 'code' && section.code && (
        <div className="code-block">
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

      {/* Table rendering */}
      {section.type === 'table' && section.tableData && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-white/5">
                {section.tableData.headers.map((h, hi) => (
                  <th key={hi} className="px-3 sm:px-4 py-3 text-left text-white fw-bold uppercase tracking-wider text-[10px] sm:text-[11px] border-b border-white/10">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.tableData.rows.map((row, ri) => (
                <tr key={ri} className={`${ri % 2 === 0 ? 'bg-white/[0.02]' : ''} hover:bg-white/5 transition-colors`}>
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-3 sm:px-4 py-3 text-sub border-b border-white/5 ${ci === 0 ? 'text-white fw-bold' : ''}`}>
                      {cell.split(/\*\*(.*?)\*\*/g).map((part, pi) =>
                        pi % 2 === 1 ? <strong key={pi} className="text-white">{part}</strong> : part
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Flowchart / diagram rendering */}
      {section.type === 'flowchart' && section.diagramSteps && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {section.diagramSteps.map((step, si) => (
            <React.Fragment key={si}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.1 }}
                className="flex flex-col items-center gap-2 px-5 sm:px-7 py-4 sm:py-5 rounded-2xl border border-white/10 bg-white/[0.03] min-w-fit max-w-[180px] text-center shadow-lg"
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
                  className="text-muted text-lg sm:text-xl"
                >
                  →
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Video Content */}
      {section.type === 'video' && section.videoUrl && (
        <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe
            className="w-full h-full"
            src={section.videoUrl.replace('watch?v=', 'embed/')}
            title="Educational Video"
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
           <EducationAnimation type={section.content} />
        </div>
      )}

      {/* Mini-Games */}
      {section.type === 'game' && section.gameType && (
        <div className="mt-4">
           <MiniGame gameType={section.gameType} gameData={section.gameData as GameDataItem[] | GameDataClassify} />
        </div>
      )}
    </div>
  )
}

function EducationAnimation({ type }: { type: string }) {
  const [input, setInput] = useState('Git')
  const hash = useMemo(() => {
    // Fake hash for visual demo
    let h = 0;
    for (let i = 0; i < input.length; i++) h = ((h << 5) - h) + input.charCodeAt(i) | 0
    return Math.abs(h).toString(16).padEnd(40, 'f').slice(0, 40)
  }, [input])

  if (type.includes('SHA')) {
    return (
      <div className="w-full max-w-sm flex flex-col gap-4">
         <div className="text-[10px] text-muted uppercase fw-black tracking-widest text-center">Avalanche Effect Simulator</div>
         <input 
           value={input} 
           onChange={e => setInput(e.target.value)}
           className="bg-black/20 border border-white/10 rounded-lg p-2 text-white text-center text-sm"
           placeholder="Type something..."
         />
         <div className="bg-surface p-4 rounded-lg border border-primary/20 flex flex-col items-center">
            <span className="text-[10px] text-primary fw-black uppercase mb-2">SHA-1 HASH (Snapshot ID)</span>
            <span className="mono text-[11px] text-xp break-all text-center leading-relaxed">
              {hash.split('').map((char, i) => (
                <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }} className={/[a-f]/.test(char) ? 'text-primary' : ''}>
                  {char}
                </motion.span>
              ))}
            </span>
         </div>
      </div>
    )
  }

  // Fallback icon animation
  return (
    <motion.div 
      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="text-primary"
    >
      <Zap size={48} />
    </motion.div>
  )
}

function MiniGame({ gameType, gameData }: { gameType: string, gameData: GameDataItem[] | GameDataClassify }) {
  if (gameType === 'drag-order') {
    return <DragOrderGame items={gameData as GameDataItem[]} />
  }

  if (gameType === 'drag-classify') {
    const data = gameData as GameDataClassify
    return <DragClassifyGame categories={data.categories} items={data.items} />
  }

  return <div className="p-10 text-center text-muted border border-dashed rounded-xl">Game Module Coming Soon...</div>
}

function DragOrderGame({ items }: { items: { id: string, label: string }[] }) {
  const [solved, setSolved] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(() => [...items].sort(() => Math.random() - 0.5))
  
  const moveItem = (fromIdx: number, toIdx: number) => {
    const newOrder = [...currentOrder]
    const [removed] = newOrder.splice(fromIdx, 1)
    newOrder.splice(toIdx, 0, removed)
    setCurrentOrder(newOrder)
    
    const isCorrect = newOrder.every((item, i) => item.id === items[i].id)
    if (isCorrect) setSolved(true)
  }

  return (
    <div className="card p-6 border-purple-500/20 bg-purple-500/5">
      <div className="text-center mb-6">
        <h4 className="text-white fw-black uppercase tracking-tight mb-1">Challenge: Order the Workflow</h4>
        <p className="text-muted text-xs">Drag the steps into the correct chronological sequence.</p>
      </div>

      <div className="flex flex-col gap-2 mb-6">
         {currentOrder.map((item, idx) => (
           <motion.div
             key={item.id}
             layout
             className={`p-3 rounded-xl border flex items-center justify-between cursor-move group transition-all
               ${solved ? 'bg-green/10 border-green/30' : 'bg-surface2 border-white/5 hover:border-white/20'}
             `}
           >
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center text-[10px] fw-black text-muted group-hover:text-white">
                    {idx + 1}
                 </div>
                 <span className="text-sm fw-bold text-sub group-hover:text-white">{item.label}</span>
              </div>
              {!solved && (
                <div className="flex gap-1">
                  <button onClick={() => idx > 0 && moveItem(idx, idx - 1)} className="p-1 hover:text-white"><Zap size={12} className="rotate-180" /></button>
                  <button onClick={() => idx < currentOrder.length - 1 && moveItem(idx, idx + 1)} className="p-1 hover:text-white"><Zap size={12} /></button>
                </div>
              )}
              {solved && <CheckCircle size={14} className="text-green" />}
           </motion.div>
         ))}
      </div>

      {solved && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green text-black fw-black text-sm">
              <Trophy size={16} /> Workflow Mastered! (+10 XP)
           </div>
        </motion.div>
      )}
    </div>
  )
}

function DragClassifyGame({ categories, items }: { categories: { id: string, label: string }[], items: { id: string, label: string, categoryId: string }[] }) {
  const [solved, setSolved] = useState(false)
  const [selections, setSelections] = useState<Record<string, string>>({}) // itemId -> categoryId
  const [currentItems] = useState(() => [...items].sort(() => Math.random() - 0.5))

  const classify = (itemId: string, catId: string) => {
    const newSels = { ...selections, [itemId]: catId }
    setSelections(newSels)
    
    const allDone = items.length === Object.keys(newSels).length
    const allCorrect = items.every(item => newSels[item.id] === item.categoryId)
    if (allDone && allCorrect) setSolved(true)
  }

  return (
    <div className="card p-6 border-blue-500/20 bg-blue-500/5">
      <div className="text-center mb-6">
        <h4 className="text-white fw-black uppercase tracking-tight mb-1">Challenge: Categorize Components</h4>
        <p className="text-muted text-xs">Assign each item to its correct architectural layer.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
         {categories.map(cat => (
           <div key={cat.id} className="p-4 rounded-xl border border-white/10 bg-black/20 text-center min-h-[120px] flex flex-col items-center gap-3">
              <span className="text-[10px] fw-black text-white uppercase tracking-widest">{cat.label}</span>
              <div className="flex flex-wrap justify-center gap-2">
                 {items.filter(i => selections[i.id] === cat.id).map(i => (
                   <div key={i.id} className="px-2 py-1 rounded bg-white/10 text-[10px] text-white">
                      {i.label}
                   </div>
                 ))}
              </div>
           </div>
         ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
         {currentItems.filter(i => !selections[i.id]).map(item => (
           <div key={item.id} className="p-3 pr-2 rounded-xl bg-surface2 border border-white/5 flex items-center gap-4">
              <span className="text-xs fw-bold text-white">{item.label}</span>
              <div className="flex gap-1">
                 {categories.map(cat => (
                   <button 
                     key={cat.id} 
                     onClick={() => classify(item.id, cat.id)}
                     className="px-2 py-1 rounded text-[9px] fw-black bg-white/5 hover:bg-primary hover:text-white transition-colors uppercase"
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
           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green text-black fw-black text-sm">
              <Trophy size={16} /> Architecture Validated! (+15 XP)
           </div>
        </motion.div>
      )}
    </div>
  )
}
