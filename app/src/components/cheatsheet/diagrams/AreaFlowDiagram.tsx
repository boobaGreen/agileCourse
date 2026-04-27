import { AreaBox, FlowArrow } from './shared';
import { COLORS } from './theme';

interface Props { highlight: string; }

export function AreaFlowDiagram({ highlight }: Props) {
  const h = highlight;
  const isAdd = h === 'add' || h === 'add-all';
  const isCommit = h === 'commit';
  const isDiff = h === 'diff';
  const isStatus = h === 'status';
  const isInit = h === 'init';
  const isStash = h === 'stash';
  const isStashPop = h === 'stash-pop';

  const boxW = 130;
  const boxH = 90;
  const boxY = 25;
  const midY = boxY + boxH / 2;

  return (
    <svg viewBox="0 0 540 175" width="100%" style={{ maxHeight: 220 }}>
      {/* Three main areas */}
      <AreaBox
        x={15} y={boxY} w={boxW} h={boxH}
        icon="📂" label="Working Dir"
        color={COLORS.wd}
        active={isAdd || isDiff || isStatus || isStash}
        delay={0}
      />
      <AreaBox
        x={205} y={boxY} w={boxW} h={boxH}
        icon="📋" label="Staging"
        color={COLORS.staging}
        active={isAdd || isCommit || isDiff || isStatus || isStashPop}
        delay={0.1}
      />
      <AreaBox
        x={395} y={boxY} w={boxW} h={boxH}
        icon="📦" label="Repository"
        color={COLORS.repo}
        active={isCommit || isInit || isStatus}
        delay={0.2}
      />

      {/* Arrow: WD → Staging */}
      <FlowArrow
        x1={150} y1={midY} x2={200} y2={midY}
        active={isAdd} color={COLORS.git}
        label="add" delay={0.15}
      />

      {/* Arrow: Staging → Repo */}
      <FlowArrow
        x1={340} y1={midY} x2={390} y2={midY}
        active={isCommit} color={COLORS.git}
        label="commit" delay={0.25}
      />

      {/* Diff indicator */}
      {isDiff && (
        <g>
          <line x1={152} y1={midY - 18} x2={198} y2={midY - 18} stroke={COLORS.danger} strokeWidth={2} strokeDasharray="4 3" />
          <line x1={152} y1={midY + 18} x2={198} y2={midY + 18} stroke={COLORS.danger} strokeWidth={2} strokeDasharray="4 3" />
          <text x={175} y={midY + 4} textAnchor="middle" fill={COLORS.danger} fontSize={8} fontWeight={700} fontFamily="'JetBrains Mono', monospace">
            diff
          </text>
        </g>
      )}

      {/* Init indicator */}
      {isInit && (
        <g>
          <rect x={420} y={boxY + boxH - 24} width={80} height={18} rx={9} fill={`${COLORS.repo}25`} stroke={COLORS.repo} strokeWidth={1} />
          <text x={460} y={boxY + boxH - 12} textAnchor="middle" fill={COLORS.repo} fontSize={9} fontWeight={700} fontFamily="'JetBrains Mono', monospace">
            .git/
          </text>
        </g>
      )}

      {/* Stash shelf */}
      {(isStash || isStashPop) && (
        <g>
          <AreaBox
            x={15} y={boxY + boxH + 20} w={boxW} h={35}
            icon="📥" label="Stash"
            color={COLORS.staging}
            active delay={0.3}
          />
          {isStash && (
            <FlowArrow x1={80} y1={boxY + boxH + 4} x2={80} y2={boxY + boxH + 17} active color={COLORS.staging} delay={0.35} />
          )}
          {isStashPop && (
            <FlowArrow x1={80} y1={boxY + boxH + 17} x2={80} y2={boxY + boxH + 4} active color={COLORS.repo} delay={0.35} />
          )}
        </g>
      )}

      {/* Status indicators */}
      {isStatus && (
        <g>
          <circle cx={35} cy={boxY + boxH - 16} r={4} fill={COLORS.danger} opacity={0.8} />
          <text x={45} y={boxY + boxH - 13} fill={COLORS.danger} fontSize={7} fontFamily="'JetBrains Mono', monospace">modified</text>
          <circle cx={225} cy={boxY + boxH - 16} r={4} fill={COLORS.repo} opacity={0.8} />
          <text x={235} y={boxY + boxH - 13} fill={COLORS.repo} fontSize={7} fontFamily="'JetBrains Mono', monospace">staged</text>
          <circle cx={415} cy={boxY + boxH - 16} r={4} fill={COLORS.dim} opacity={0.8} />
          <text x={425} y={boxY + boxH - 13} fill={COLORS.dim} fontSize={7} fontFamily="'JetBrains Mono', monospace">clean</text>
        </g>
      )}
    </svg>
  );
}
