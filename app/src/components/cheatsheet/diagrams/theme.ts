export const COLORS = {
  wd:      '#3b82f6', // blue - Working Directory
  staging: '#f59e0b', // amber - Staging Area
  repo:    '#22c55e', // green - Repository
  remote:  '#a78bfa', // purple - Remote
  git:     '#f97316', // orange - active/highlight
  danger:  '#ef4444', // red - destructive
  muted:   '#4b5563', // gray
  text:    '#e2e8f0', // light text
  dim:     '#6b7280', // dim text
  bg:      '#111827', // dark bg
  surface: '#1a2235', // card bg
};

// ─── Shared Animation Variants ───
export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.4 } },
});

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1, transition: { delay, duration: 0.35, type: 'spring' as const, stiffness: 300, damping: 20 } },
});

export const pulseGlow = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  },
};
