import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { GIT_MODULES } from '../data/git/modules'
import { DOCKER_MODULES } from '../data/docker/modules'
import { K8S_MODULES } from '../data/k8s/modules'
import type { Section, QuizQuestion } from '../data/git/modules'
import {
  ArrowLeft, ArrowRight, CheckCircle, Zap,
  ExternalLink, BookOpen, Code2, Lightbulb, Sparkles
} from 'lucide-react'

export default function ModulePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { completedModules, completeModule, saveQuizScore, addXP, awardBadge } = useAppStore()

  // Find module in all tracks
  const allModules = [...GIT_MODULES, ...DOCKER_MODULES, ...K8S_MODULES]
  const mod = allModules.find((m) => m.id === id)
  
  if (!mod) return (
    <div className="text-white p-8 card">
      <h2 className="text-2xl fw-black mb-4">Module not found</h2>
      <p className="text-muted mb-4">We couldn't find a module with ID: <span className="text-git mono">{id}</span></p>
      <button onClick={() => navigate('/dashboard')} className="btn btn-primary">Back to Dashboard</button>
      <div className="mt-8 text-[10px] text-muted opacity-20">
        Debug: Tracks loaded: Git({GIT_MODULES.length}), Docker({DOCKER_MODULES.length}), K8s({K8S_MODULES.length})
      </div>
    </div>
  )

  const trackModules = mod.track === 'git' ? GIT_MODULES : mod.track === 'docker' ? DOCKER_MODULES : K8S_MODULES
  const nextId = trackModules[trackModules.findIndex((m) => m.id === id) + 1]?.id
  
  const trackColor = mod.track === 'git' ? 'var(--color-git)' : mod.track === 'docker' ? 'var(--color-docker)' : 'var(--color-k8s)'

  const [view, setView] = useState<'theory' | 'quiz' | 'result'>('theory')
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)
  const [xpImport, setXpImport] = useState('')

  // Reset local state when navigating between modules
  useEffect(() => {
    setView('theory')
    setQuizAnswers({})
    setSubmitted(false)
    setXpEarned(0)
    setXpImport('')
  }, [id])

  // Dynamically shuffle options so they are never in the same order
  type ShuffledQuiz = QuizQuestion & { shuffledOptions: string[], shuffledCorrect: number }
  const [quizData, setQuizData] = useState<ShuffledQuiz[]>([])

  useEffect(() => {
    if (mod?.quiz) {
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
    } else {
       setQuizData([]);
    }
  }, [mod?.id]);

  const handleCompleteTheory = () => {
    if (!completedModules.includes(mod.id)) {
      completeModule(mod.id)
      
      // Badge logic
      if (mod.id === 'git-1') awardBadge({ id: 'git-seedling', emoji: '🌱', title: 'Git Seedling', description: 'Completed your first Git module' })
      if (mod.id === 'git-9') awardBadge({ id: 'git-branching', emoji: '🌿', title: 'Branching Out', description: 'Completed all Git modules' })
      
      if (mod.id === 'docker-1') awardBadge({ id: 'docker-mate', emoji: '⚓', title: 'First Mate', description: 'Mastered the basics of containers' })
      if (mod.id === 'docker-9') awardBadge({ id: 'docker-harbor', emoji: '🐋', title: 'Harbor Master', description: 'Completed the full Docker curriculum' })
      
      if (mod.id === 'k8s-1') awardBadge({ id: 'k8s-kybernitis', emoji: '☸️', title: 'Kybernitis', description: 'Started the Kubernetes journey' })
      if (mod.id === 'k8s-9') awardBadge({ id: 'k8s-admiral', emoji: '🤴', title: 'Fleet Admiral', description: 'Mastered the art of orchestration' })
    }
    if (mod.quiz && mod.quiz.length > 0) {
      setView('quiz')
    } else {
      navigate(nextId ? `/${mod.track}/module/${nextId}` : '/dashboard')
    }
  }

  const handleAnswer = (qId: string, idx: number) => {
    if (submitted) return
    setQuizAnswers((prev) => ({ ...prev, [qId]: idx }))
  }

  const handleSubmitQuiz = () => {
    if (quizData.length === 0) return
    const correctCount = quizData.filter((q) => quizAnswers[q.id] === q.shuffledCorrect).length
    const scorePct = Math.round((correctCount / quizData.length) * 100)
    const bonus = scorePct === 100 ? 100 : 0
    const earned = correctCount * 10 + bonus
    
    saveQuizScore(mod.id, correctCount)
    addXP(earned)
    setXpEarned(earned)
    setSubmitted(true)
    setView('result')
  }

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
              <div className="bg-surface2 px-4 py-2 rounded-xl text-xs fw-bold text-sub">
                {Object.keys(quizAnswers).length} / {quizData.length} Answered
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
  const icons: Record<string, any> = {
    intro: BookOpen,
    concept: Sparkles,
    code: Code2,
    tip: Lightbulb,
    analogy: Lightbulb,
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
             {line.split(/\*\*(.*?)\*\*/g).map((part, pi) => 
               pi % 2 === 1 ? <strong key={pi} className="text-white">{part}</strong> : part
             )}
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
    </div>
  )
}
