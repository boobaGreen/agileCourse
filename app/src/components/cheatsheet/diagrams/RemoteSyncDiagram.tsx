import { motion } from 'framer-motion';
import { AreaBox, FlowArrow, CommitNode } from './shared';
import { COLORS, fadeIn } from './theme';

interface Props { highlight: string; }

export function RemoteSyncDiagram({ highlight }: Props) {
  const h = highlight;
  const isClone = h === 'clone';
  const isPull = h === 'pull';
  const isPush = h === 'push';
  const isPushTags = h === 'push-tags';

  const localX = 15;
  const remoteX = 320; // Increased gap
  const boxW = 160;
  const boxH = 100;
  const midY = 70;

  return (
    <svg viewBox="0 0 520 160" width="100%" style={{ maxHeight: 180 }}>
      {/* Local Repository */}
      <AreaBox
        x={localX} y={20} w={boxW} h={boxH}
        icon="💻" label="Local Repo"
        color={COLORS.repo}
        active={isPush || isPushTags || isClone}
        delay={0}
      />

      {/* Remote Repository */}
      <AreaBox
        x={remoteX} y={20} w={boxW} h={boxH}
        icon="☁️" label="Remote (Origin)"
        color={COLORS.remote}
        active={isPull || isClone}
        delay={0.1}
      />

      {/* Commits inside Local */}
      <CommitNode cx={localX + 35} cy={midY} label="C1" color={COLORS.dim} delay={0.15} size={7} />
      <CommitNode cx={localX + 70} cy={midY} label="C2" color={COLORS.dim} delay={0.18} size={7} />
      {(isPush || isPushTags) && (
        <CommitNode cx={localX + 105} cy={midY} label="C3" color={COLORS.git} active delay={0.22} size={7} />
      )}

      {/* Commits inside Remote */}
      <CommitNode cx={remoteX + 35} cy={midY} label="C1" color={COLORS.dim} delay={0.15} size={7} />
      <CommitNode cx={remoteX + 70} cy={midY} label="C2" color={COLORS.dim} delay={0.18} size={7} />
      {isPull && (
        <CommitNode cx={remoteX + 105} cy={midY} label="C3" color={COLORS.remote} active delay={0.22} size={7} />
      )}

      {/* Clone: big arrow Remote → Local */}
      {isClone && (
        <>
          <FlowArrow
            x1={remoteX - 5} y1={midY - 15}
            x2={localX + boxW + 5} y2={midY - 15}
            active color={COLORS.git} label="clone" delay={0.25}
          />
          {/* Full copy indicator - Moved down to avoid arrows */}
          <motion.g {...fadeIn(0.35)}>
            <rect x={remoteX - 100} y={midY + 15} width={70} height={18} rx={9}
              fill={`${COLORS.git}20`} stroke={COLORS.git} strokeWidth={1} />
            <text x={remoteX - 65} y={midY + 27} textAnchor="middle"
              fill={COLORS.git} fontSize={8} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace">
              FULL COPY
            </text>
          </motion.g>
        </>
      )}

      {/* Pull: arrow Remote → Local */}
      {isPull && (
        <FlowArrow
          x1={remoteX - 5} y1={midY - 15}
          x2={localX + boxW + 5} y2={midY - 15}
          active color={COLORS.remote} label="fetch + merge" delay={0.25}
        />
      )}

      {/* Push: arrow Local → Remote */}
      {isPush && (
        <FlowArrow
          x1={localX + boxW + 5} y1={midY + 15}
          x2={remoteX - 5} y2={midY + 15}
          active color={COLORS.git} label="push" delay={0.25}
        />
      )}

      {/* Push Tags: arrow with tag indicators */}
      {isPushTags && (
        <>
          <FlowArrow
            x1={localX + boxW + 5} y1={midY + 15}
            x2={remoteX - 5} y2={midY + 15}
            active color={COLORS.staging} label="push --tags" delay={0.25}
          />
          {/* Tag badges - inside Local */}
          <motion.g {...fadeIn(0.35)}>
            <rect x={localX + 110} y={midY + 10} width={36} height={14} rx={7}
              fill={`${COLORS.staging}25`} stroke={COLORS.staging} strokeWidth={1} />
            <text x={localX + 128} y={midY + 20} textAnchor="middle"
              fill={COLORS.staging} fontSize={7} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace">
              v1.0
            </text>
          </motion.g>
        </>
      )}

      {/* Connection lines between commits */}
      <line x1={localX + 42} y1={midY} x2={localX + 63} y2={midY} stroke="#ffffff15" strokeWidth={1.5} />
      <line x1={localX + 77} y1={midY} x2={localX + 98} y2={midY} stroke="#ffffff15" strokeWidth={1.5} />
      <line x1={remoteX + 42} y1={midY} x2={remoteX + 63} y2={midY} stroke="#ffffff15" strokeWidth={1.5} />
      <line x1={remoteX + 77} y1={midY} x2={remoteX + 98} y2={midY} stroke="#ffffff15" strokeWidth={1.5} />
    </svg>
  );
}
