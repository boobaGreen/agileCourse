import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import {
  GitBranch, LayoutDashboard, User, Trophy, Award,
  ChevronLeft, ChevronRight, Zap, Menu, X, Package, Ship
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/git/module/git-1', label: 'Git Course', icon: GitBranch },
  { path: '/docker/module/docker-1', label: 'Docker Course', icon: Package },
  { path: '/k8s/module/k8s-1', label: 'K8s Course', icon: Ship },
  { path: '/certifications', label: 'Certifications', icon: Award },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/profile', label: 'My Profile', icon: User },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { userName, xp, badges } = useAppStore()

  const sidebarWidth = collapsed ? 72 : 240

  return (
    <div className="flex min-h-screen gradient-bg">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar (Desktop) */}
      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-full z-30"
        style={{
          background: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          overflow: 'hidden'
        }}
      >
        <SidebarContent
          collapsed={collapsed}
          location={location}
          userName={userName}
          xp={xp}
          badges={badges.length}
          onNavigate={(path) => navigate(path)}
        />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -right-3 w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', cursor: 'pointer' }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 top-0 h-full w-60 z-50 md:hidden flex flex-col"
            style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}
          >
            <div className="p-4 flex justify-end">
              <button onClick={() => setMobileOpen(false)} className="text-slate-400">
                <X size={24} />
              </button>
            </div>
            <SidebarContent
              collapsed={false}
              location={location}
              userName={userName}
              xp={xp}
              badges={badges.length}
              onNavigate={(path) => { navigate(path); setMobileOpen(false) }}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div
        className="flex-1 flex flex-col transition-all duration-200"
        style={{ marginLeft: collapsed ? 72 : 240, width: '100%' }}
      >
        {/* Top bar (mobile) */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-20"
          style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
          <button onClick={() => setMobileOpen(true)} className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer">
            <Menu size={22} />
          </button>
          <span className="fw-black text-white">DevHarbor</span>
          <div className="flex items-center gap-1 text-xp text-sm">
            <Zap size={14} />{xp} XP
          </div>
        </div>

        <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ collapsed, location, userName, xp, badges, onNavigate }: {
  collapsed: boolean
  location: { pathname: string }
  userName: string
  xp: number
  badges: number
  onNavigate: (path: string) => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header/Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <span className="text-2xl flex-shrink-0 animate-float">⚓</span>
        {!collapsed && <span className="fw-black text-white text-lg tracking-tight">DevHarbor</span>}
      </div>

      {/* User profile card */}
      {!collapsed && (
        <div className="mx-3 my-4 p-4 rounded-xl" style={{ background: 'var(--color-surface2)' }}>
          <p className="text-white fw-bold text-sm truncate">{userName}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-xp text-xs fw-bold">
              <Zap size={12} /> {xp} XP
            </div>
            <div className="flex items-center gap-1 text-k8s text-xs fw-med">
              <Award size={12} /> {badges}
            </div>
          </div>
        </div>
      )}

      {/* Navigation list */}
      <nav className="flex flex-col gap-1 px-2 flex-1 mt-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="p-4 text-xs text-muted text-center border-t" style={{ borderColor: 'var(--color-border)' }}>
          DevHarbor v1.1
        </div>
      )}
    </div>
  )
}
