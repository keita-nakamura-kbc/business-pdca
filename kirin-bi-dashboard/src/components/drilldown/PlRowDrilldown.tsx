import type { SlicerState, WaterfallSegment } from '../../types';
import type { RegionalPlRow } from '../../data/appendixData';
import { PlRowView } from './PlRowView';
import { WaterfallView } from './WaterfallView';
import styles from './DrilldownContent.module.css';

interface PlRowDrilldownProps {
  data: Record<string, unknown>;
  slicer: SlicerState;
}

export function PlRowDrilldown({ data, slicer }: PlRowDrilldownProps) {
  const row = data.row as RegionalPlRow | undefined;
  const segment = data.segment as WaterfallSegment | undefined;

  if (row)     return <PlRowView row={row} slicer={slicer} />;
  if (segment) return <WaterfallView segment={segment} slicer={slicer} />;
  return <div className={styles.noData}>データがありません</div>;
}
