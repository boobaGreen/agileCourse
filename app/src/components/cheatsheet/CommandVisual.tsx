import type { VisualType } from '../../data/git/cheatsheet';
import { AreaFlowDiagram } from './diagrams/AreaFlowDiagram';
import { BranchGraphDiagram } from './diagrams/BranchGraphDiagram';
import { RemoteSyncDiagram } from './diagrams/RemoteSyncDiagram';
import { TimelineDiagram } from './diagrams/TimelineDiagram';
import { UndoOpDiagram } from './diagrams/UndoOpDiagram';

interface Props {
  type: VisualType;
  highlight: string;
}

export function CommandVisual({ type, highlight }: Props) {
  const DiagramMap: Record<VisualType, React.FC<{ highlight: string }>> = {
    'area-flow': AreaFlowDiagram,
    'branch-graph': BranchGraphDiagram,
    'remote-sync': RemoteSyncDiagram,
    'timeline': TimelineDiagram,
    'undo-op': UndoOpDiagram,
  };

  const Diagram = DiagramMap[type];
  if (!Diagram) return null;

  return <Diagram highlight={highlight} />;
}
