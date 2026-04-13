import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { LayoutDashboard, User, Award, ChevronLeft, ChevronRight, Zap, Menu, X } from 'lucide-react'
import { matchPath } from 'react-router-dom'
import { GIT_MODULES } from '../data/git/modules'
import { DOCKER_MODULES } from '../data/docker/modules'
import { K8S_MODULES } from '../data/k8s/modules'
import ModuleSidebar from './ModuleSidebar'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/certifications', label: 'Certifications', icon: Award },
  { path: '/profile', label: 'My Profile', icon: User },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { userName, xp, badges } = useAppStore()

  const sidebarWidth = collapsed ? 72 : 272

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
        className="hide-on-mobile flex-col fixed left-0 top-0 h-full z-30"
        style={{
          background: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          overflow: 'visible'
        }}
      >
        <SidebarContent
          collapsed={collapsed}
          location={location}
          userName={userName}
          xp={xp}
          badges={badges.length}
          onNavigate={(path) => navigate(path)}
          onItemClick={() => {}}
        />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -right-[14px] w-[28px] h-[28px] rounded-full flex items-center justify-center bg-surface border border-white/20 text-white hover:bg-primary hover:border-primary hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all z-20 cursor-pointer"
        >
          {collapsed ? <ChevronRight size={16} strokeWidth={3} /> : <ChevronLeft size={16} strokeWidth={3} />}
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
              onItemClick={() => setMobileOpen(false)}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 main-content-layout ${collapsed ? 'collapsed' : 'expanded'}`}
      >
        {/* Top bar (mobile) */}
        <div className="hide-on-desktop items-center justify-between px-4 py-3 sticky top-0 z-20 w-full"
          style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
          <button onClick={() => setMobileOpen(true)} className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer">
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚓</span>
            <span className="fw-black text-white">DevHarbor</span>
          </div>
          <div className="flex items-center gap-1 text-xp text-sm">
            <Zap size={14} />{xp} XP
          </div>
        </div>

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ collapsed, location, userName, xp, badges, onNavigate, onItemClick }: {
  collapsed: boolean
  location: { pathname: string }
  userName: string
  xp: number
  badges: number
  onNavigate: (path: string) => void
  onItemClick: () => void
}) {
  const match = matchPath({ path: '/:track/module/:id' }, location.pathname)
  const trackId = match?.params.track
  const moduleId = match?.params.id
  const completedModules = useAppStore(s => s.completedModules)

  const modules = trackId === 'git' ? GIT_MODULES : trackId === 'docker' ? DOCKER_MODULES : trackId === 'k8s' ? K8S_MODULES : []
  const trackColor = trackId === 'git' ? 'var(--color-git)' : trackId === 'docker' ? 'var(--color-docker)' : 'var(--color-k8s)'

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
      <nav className={`${modules.length > 0 ? 'pb-4 border-b mb-4' : 'flex-1'} flex flex-col gap-1 px-2 mt-2`} style={{ borderColor: 'var(--color-border)' }}>
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

      {/* Dynamic Module Sidebar (Curriculum) */}
      {!collapsed && modules.length > 0 && (
        <div className="flex-1 px-2 overflow-y-auto custom-scrollbar">
           <ModuleSidebar 
              modules={modules} 
              currentId={moduleId || ''} 
              completedIds={completedModules} 
              trackColor={trackColor} 
              onItemClick={onItemClick}
           />
        </div>
      )}

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="p-4 text-xs text-muted text-center border-t" style={{ borderColor: 'var(--color-border)' }}>
          DevHarbor v1.1
        </div>
      )}
    </div>
  )
}
