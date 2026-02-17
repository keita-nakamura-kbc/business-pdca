import { BarChart3, Table } from 'lucide-react';
import type { SlicerState } from '../../types';
import type { RegionalPlRow } from '../../data/appendixData';
import { plItemTrends } from '../../data';
import { DeltaValue } from '../common/DeltaValue';
import { SectionHeader } from '../common/SectionHeader';
import { StatusIcon } from '../common/StatusIcon';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { PlTrendChart } from './PlTrendChart';
import styles from './DrilldownContent.module.css';

// RegionalPlSummary item → plItemTrends key mapping
const itemToTrendKey: Record<string, string> = {
  '売上収益':   '売上高（億円）',
  '限界利益':   '限界利益（億円）',
  '事業利益':   '事業利益（億円）',
  '事業利益率': '利益率（%）',
};

function RatioWithIcon({ ratio }: { ratio: number | undefined }) {
  const level = useConditionalFormat(ratio);
  if (ratio === undefined) return null;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <StatusIcon level={level} size={8} />
      {ratio.toFixed(1)}%
    </span>
  );
}

interface PlRowViewProps {
  row: RegionalPlRow;
  slicer: SlicerState;
}

export function PlRowView({ row, slicer }: PlRowViewProps) {
  const planLevel = useConditionalFormat(row.consolidatedPlanRatio);
  const yoyLevel = useConditionalFormat(row.consolidatedYoyRatio);
  const isMonthly = slicer.period === 'monthly';
  const periodLabel = isMonthly ? '単月' : '累月';
  const unit = row.isRate ? '%' : '億円';

  const trendKey = itemToTrendKey[row.item];
  const trendData = trendKey ? plItemTrends[trendKey] : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <SectionHeader icon={BarChart3} title={row.item} subtitle={`【連結 ${periodLabel}】`} />
        <div className={styles.metric}>
          <span className={styles.metricLabel}>連結実績</span>
          <span className={styles.metricValue}>
            {row.isRate ? `${row.consolidated.toFixed(1)}%` : `${row.consolidated.toFixed(1)} ${unit}`}
          </span>
        </div>
        {row.consolidatedPlanRatio !== undefined && !row.isRate && (
          <div className={styles.metric}>
            <span className={styles.metricLabel}>対計画比</span>
            <span className={styles.metricValue}>
              <StatusIcon level={planLevel} size={8} />
              {' '}{row.consolidatedPlanRatio.toFixed(1)}%
            </span>
          </div>
        )}
        {row.consolidatedYoyRatio !== undefined && !row.isRate && (
          <div className={styles.metric}>
            <span className={styles.metricLabel}>対前年比</span>
            <span className={styles.metricValue}>
              <StatusIcon level={yoyLevel} size={8} />
              {' '}{row.consolidatedYoyRatio.toFixed(1)}%
            </span>
          </div>
        )}
        {row.consolidatedPlanDiff !== undefined && (
          <div className={styles.metric}>
            <span className={styles.metricLabel}>対計画差額</span>
            <span className={styles.metricValue}>
              <DeltaValue value={row.consolidatedPlanDiff} /> {unit}
            </span>
          </div>
        )}
        {row.consolidatedYoyDiff !== undefined && (
          <div className={styles.metric}>
            <span className={styles.metricLabel}>対前年差額</span>
            <span className={styles.metricValue}>
              <DeltaValue value={row.consolidatedYoyDiff} /> {unit}
            </span>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <SectionHeader icon={Table} title="領域別内訳" />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>領域</th>
              <th>実績 ({unit})</th>
              <th>対計画比</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HS</td>
              <td>{row.isRate ? `${row.hs.toFixed(1)}%` : row.hs.toFixed(1)}</td>
              <td><RatioWithIcon ratio={row.hsPlanRatio} /></td>
            </tr>
            <tr>
              <td>Food</td>
              <td>{row.isRate ? `${row.food.toFixed(1)}%` : row.food.toFixed(1)}</td>
              <td><RatioWithIcon ratio={row.foodPlanRatio} /></td>
            </tr>
            <tr className={styles.totalRow}>
              <td>連結</td>
              <td>{row.isRate ? `${row.consolidated.toFixed(1)}%` : row.consolidated.toFixed(1)}</td>
              <td><RatioWithIcon ratio={row.consolidatedPlanRatio} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {trendData && trendKey && (
        <PlTrendChart trendData={trendData} subtitle={trendKey} />
      )}
    </div>
  );
}
