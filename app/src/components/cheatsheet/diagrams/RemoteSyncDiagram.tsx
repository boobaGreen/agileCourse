import { motion } from 'framer-motion';
import { AreaBox, FlowArrow, CommitNode, COLORS, fadeIn } from './shared';

interface Props { highlight: string; }

export function RemoteSyncDiagram({ highlight }: Props) {
  const h = highlight;
  const isClone = h === 'clone';
  const isPull = h === 'pull';
  const isPush = h === 'push';
  const isPushTags = h === 'push-tags';

  const localX = 10;
  const remoteX = 270;
  const boxW = 170;
  const boxH = 110;
  const midY = 75;

  return (
    <svg viewBox="0 0 460 150" width="100%" style={{ maxHeight: 170 }}>
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
      <CommitNode cx={50} cy={midY} label="C1" color={COLORS.dim} delay={0.15} size={7} />
      <CommitNode cx={80} cy={midY} label="C2" color={COLORS.dim} delay={0.18} size={7} />
      {(isPush || isPushTags) && (
        <CommitNode cx={110} cy={midY} label="C3" color={COLORS.git} active delay={0.22} size={7} />
      )}

      {/* Commits inside Remote */}
      <CommitNode cx={310} cy={midY} label="C1" color={COLORS.dim} delay={0.15} size={7} />
      <CommitNode cx={340} cy={midY} label="C2" color={COLORS.dim} delay={0.18} size={7} />
      {isPull && (
        <CommitNode cx={370} cy={midY} label="C3" color={COLORS.remote} active delay={0.22} size={7} />
      )}

      {/* Clone: big arrow Remote → Local */}
      {isClone && (
        <>
          <FlowArrow
            x1={remoteX - 5} y1={midY - 12}
            x2={localX + boxW + 5} y2={midY - 12}
            active color={COLORS.git} label="clone" delay={0.25}
          />
          {/* Full copy indicator */}
          <motion.g {...fadeIn(0.35)}>
            <rect x={195} y={midY + 4} width={60} height={16} rx={8}
              fill={`${COLORS.git}20`} stroke={COLORS.git} strokeWidth={1} />
            <text x={225} y={midY + 15} textAnchor="middle"
              fill={COLORS.git} fontSize={7} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace">
              FULL COPY
            </text>
          </motion.g>
        </>
      )}

      {/* Pull: arrow Remote → Local */}
      {isPull && (
        <FlowArrow
          x1={remoteX - 5} y1={midY - 12}
          x2={localX + boxW + 5} y2={midY - 12}
          active color={COLORS.remote} label="fetch + merge" delay={0.25}
        />
      )}

      {/* Push: arrow Local → Remote */}
      {isPush && (
        <FlowArrow
          x1={localX + boxW + 5} y1={midY + 12}
          x2={remoteX - 5} y2={midY + 12}
          active color={COLORS.git} label="push" delay={0.25}
        />
      )}

      {/* Push Tags: arrow with tag indicators */}
      {isPushTags && (
        <>
          <FlowArrow
            x1={localX + boxW + 5} y1={midY + 12}
            x2={remoteX - 5} y2={midY + 12}
            active color={COLORS.staging} label="push --tags" delay={0.25}
          />
          {/* Tag badges */}
          <motion.g {...fadeIn(0.35)}>
            <rect x={100} y={midY + 8} width={32} height={14} rx={7}
              fill={`${COLORS.staging}25`} stroke={COLORS.staging} strokeWidth={1} />
            <text x={116} y={midY + 18} textAnchor="middle"
              fill={COLORS.staging} fontSize={6.5} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace">
              v1.0
            </text>
          </motion.g>
        </>
      )}

      {/* Connection lines between commits */}
      <line x1={57} y1={midY} x2={73} y2={midY} stroke="#ffffff15" strokeWidth={1.5} />
      <line x1={87} y1={midY} x2={103} y2={midY} stroke="#ffffff15" strokeWidth={1.5} />
      <line x1={317} y1={midY} x2={333} y2={midY} stroke="#ffffff15" strokeWidth={1.5} />
      <line x1={347} y1={midY} x2={363} y2={midY} stroke="#ffffff15" strokeWidth={1.5} />
    </svg>
  );
}
