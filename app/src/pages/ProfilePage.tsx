import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { RotateCcw, BarChart3, Award } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { StatsTab } from '../components/profile/StatsTab'
import { RoadmapTab } from '../components/profile/RoadmapTab'
import { ResetProgressModal } from '../components/profile/ResetProgressModal'
import { useLanguage } from '../contexts/LanguageContext'

export default function ProfilePage() {
  const { t, resolveString } = useLanguage()
  const { resetProgress } = useAppStore()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'stats'
  
  // Scroll to hash on mount or tab change
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = hash.replace('#', '')
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [activeTab])

  return (
    <div className="animate-fade-up w-full pt-4 md:pt-8 pb-12">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl fw-black text-white mb-2">
            {t('profile.title')} <span className="text-primary">{t('profile.subtitle')}</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl">
            {resolveString({
              en: 'Manage your professional identity, track your skills progression, and view your certification roadmap.',
              it: 'Gestisci la tua identità professionale, traccia la progressione delle tue competenze e visualizza la tua roadmap delle certificazioni.'
            })}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-surface/50 p-1.5 rounded-2xl border border-white/5 gap-2 backdrop-blur-xl">
          {[
            { id: 'stats', label: t('profile.expertise'), icon: BarChart3 },
            { id: 'roadmap', label: t('profile.roadmap'), icon: Award },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSearchParams({ tab: tab.id })}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs fw-black transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'stats' ? <StatsTab /> : <RoadmapTab />}
      </AnimatePresence>

      {/* Danger Zone */}
      <div className="mt-24 card p-6 border-red-900/30 bg-red-900/5">
        <h3 className="text-white fw-bold mb-2 flex items-center gap-2">
          <RotateCcw size={18} className="text-red-400" /> {t('profile.danger')}
        </h3>
        <p className="text-sub text-sm mb-6">{t('profile.dangerDesc')}</p>
        <button onClick={() => setShowConfirmModal(true)} className="btn btn-danger text-xs px-6">
          {t('profile.wipe')}
        </button>
      </div>

      <ResetProgressModal 
        isOpen={showConfirmModal} 
        onClose={() => setShowConfirmModal(false)} 
        onConfirm={() => { resetProgress(); setShowConfirmModal(false); }} 
      />
    </div>
  )
}
