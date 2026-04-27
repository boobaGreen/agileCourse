import { motion } from 'framer-motion';

// ─── Color Palette ───
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
  animate: { opacity: 1, scale: 1, transition: { delay, duration: 0.35, type: 'spring', stiffness: 300, damping: 20 } },
});

export const pulseGlow = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ─── SVG Primitives ───

interface AreaBoxProps {
  x: number; y: number; w: number; h: number;
  label: string; icon: string;
  active?: boolean; color: string;
  delay?: number;
}

export function AreaBox({ x, y, w, h, label, icon, active, color, delay = 0 }: AreaBoxProps) {
  return (
    <motion.g {...fadeIn(delay)}>
      {/* Glow effect */}
      {active && (
        <motion.rect
          x={x - 2} y={y - 2} width={w + 4} height={h + 4} rx={14}
          fill="none" stroke={color} strokeWidth={2}
          {...pulseGlow}
        />
      )}
      {/* Box background */}
      <rect
        x={x} y={y} width={w} height={h} rx={12}
        fill={active ? `${color}15` : '#0d111780'}
        stroke={active ? `${color}60` : '#ffffff12'}
        strokeWidth={1.5}
      />
      {/* Icon */}
      <text x={x + w / 2} y={y + h / 2 - 6} textAnchor="middle" fontSize={18}>
        {icon}
      </text>
      {/* Label */}
      <text
        x={x + w / 2} y={y + h / 2 + 14}
        textAnchor="middle"
        fill={active ? color : COLORS.dim}
        fontSize={9} fontWeight={700}
        fontFamily="'Inter', sans-serif"
        letterSpacing={0.5}
      >
        {label.toUpperCase()}
      </text>
    </motion.g>
  );
}

interface FlowArrowProps {
  x1: number; y1: number; x2: number; y2: number;
  active?: boolean; color?: string;
  label?: string; delay?: number;
  dashed?: boolean;
}

export function FlowArrow({ x1, y1, x2, y2, active, color = COLORS.git, label, delay = 0, dashed }: FlowArrowProps) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const arrowColor = active ? color : '#ffffff20';

  return (
    <motion.g {...fadeIn(delay)}>
      <defs>
        <marker
          id={`arrow-${x1}-${y1}-${x2}-${y2}`}
          viewBox="0 0 10 10" refX={8} refY={5}
          markerWidth={6} markerHeight={6}
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={arrowColor} />
        </marker>
      </defs>
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={arrowColor}
        strokeWidth={active ? 2 : 1.5}
        strokeDasharray={dashed ? '6 4' : undefined}
        markerEnd={`url(#arrow-${x1}-${y1}-${x2}-${y2})`}
        {...(active ? pulseGlow : {})}
      />
      {label && (
        <text
          x={midX} y={midY - 8}
          textAnchor="middle"
          fill={active ? color : COLORS.dim}
          fontSize={7.5} fontWeight={600}
          fontFamily="'JetBrains Mono', monospace"
        >
          {label}
        </text>
      )}
    </motion.g>
  );
}

interface CommitNodeProps {
  cx: number; cy: number;
  label?: string;
  color?: string;
  active?: boolean;
  delay?: number;
  size?: number;
}

export function CommitNode({ cx, cy, label, color = COLORS.git, active, delay = 0, size = 10 }: CommitNodeProps) {
  return (
    <motion.g {...scaleIn(delay)}>
      {active && (
        <motion.circle
          cx={cx} cy={cy} r={size + 4}
          fill="none" stroke={color} strokeWidth={1.5}
          {...pulseGlow}
        />
      )}
      <circle cx={cx} cy={cy} r={size} fill={active ? color : COLORS.surface} stroke={active ? color : '#ffffff25'} strokeWidth={2} />
      {label && (
        <text
          x={cx} y={cy + 3.5}
          textAnchor="middle"
          fill={active ? '#fff' : COLORS.dim}
          fontSize={8} fontWeight={700}
          fontFamily="'JetBrains Mono', monospace"
        >
          {label}
        </text>
      )}
    </motion.g>
  );
}

interface BranchLabelProps {
  x: number; y: number;
  name: string;
  color?: string;
  active?: boolean;
  isHead?: boolean;
  delay?: number;
}

export function BranchLabel({ x, y, name, color = COLORS.git, active, isHead, delay = 0 }: BranchLabelProps) {
  return (
    <motion.g {...fadeIn(delay)}>
      <rect
        x={x - 24} y={y - 9} width={48} height={18} rx={9}
        fill={active ? `${color}30` : '#ffffff08'}
        stroke={active ? color : '#ffffff15'}
        strokeWidth={1}
      />
      <text
        x={x} y={y + 3}
        textAnchor="middle"
        fill={active ? color : COLORS.dim}
        fontSize={7.5} fontWeight={700}
        fontFamily="'JetBrains Mono', monospace"
      >
        {name}
      </text>
      {isHead && (
        <motion.g {...scaleIn(delay + 0.1)}>
          <rect
            x={x + 26} y={y - 7} width={30} height={14} rx={7}
            fill={`${COLORS.git}25`} stroke={COLORS.git} strokeWidth={1}
          />
          <text
            x={x + 41} y={y + 3}
            textAnchor="middle"
            fill={COLORS.git}
            fontSize={6.5} fontWeight={800}
            fontFamily="'JetBrains Mono', monospace"
          >
            HEAD
          </text>
        </motion.g>
      )}
    </motion.g>
  );
}
