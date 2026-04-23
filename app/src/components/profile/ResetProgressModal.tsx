import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw } from 'lucide-react'

interface ResetProgressModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ResetProgressModal({ isOpen, onClose, onConfirm }: ResetProgressModalProps) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
             onClick={onClose}
          />
          <motion.div
             initial={{ scale: 0.95, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.95, opacity: 0, y: 20 }}
             className="card p-8 max-w-md w-full relative z-10 border border-red-500/30 shadow-2xl"
             style={{ background: 'var(--color-surface)' }}
          >
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 mx-auto">
              <RotateCcw size={28} />
            </div>
            <h3 className="text-2xl fw-black text-white text-center mb-2">Erase all progress?</h3>
            <p className="text-muted text-sm text-center mb-8 leading-relaxed">
              This action is irreversible. All your <strong className="text-xp">XP</strong>, badges, and completed modules will be 
              <span className="text-red-400"> permanently wiped</span> from the system.
            </p>
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="flex-1 btn bg-surface2 text-white border border-border hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button 
                onClick={onConfirm} 
                className="flex-1 btn bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white transition-colors"
              >
                Yes, wipe it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
