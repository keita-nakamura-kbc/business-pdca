import { BarChart3, Table, GitCompare } from 'lucide-react';
import type { SlicerState, WaterfallSegment } from '../../types';
import {
  consolidatedPlMonthlyVsPlan,
  consolidatedPlCumulativeVsPlan,
  plItemTrends,
  waterfallMonthly,
  waterfallCumulative,
} from '../../data';
import { DeltaValue } from '../common/DeltaValue';
import { SectionHeader } from '../common/SectionHeader';
import { PlTrendChart } from './PlTrendChart';
import styles from './DrilldownContent.module.css';

// Waterfall segment → consolidatedPl label mapping
const segmentToPlLabel: Record<string, string> = {
  '数量差':   '販売数量（千箱）',
  '単価差':   '売上高単価（円/箱）',
  '変動費差': '変動費（億円）',
  '固定費差': '固定費（億円）',
};

interface WaterfallViewProps {
  segment: WaterfallSegment;
  slicer: SlicerState;
}

export function WaterfallView({ segment, slicer }: WaterfallViewProps) {
  const isMonthly = slicer.period === 'monthly';
  const periodLabel = isMonthly ? '単月' : '累月';
  const allSegments = isMonthly ? waterfallMonthly : waterfallCumulative;
  const plData = isMonthly ? consolidatedPlMonthlyVsPlan : consolidatedPlCumulativeVsPlan;

  const isFactorSegment = segment.type !== 'start' && segment.type !== 'total';
  const direction = segment.value > 0 ? '利益増' : segment.value < 0 ? '利益減' : '';

  const plLabel = segmentToPlLabel[segment.name];
  const relatedPl = plLabel ? plData.find(r => r.label === plLabel) : undefined;
  const trendData = plLabel ? plItemTrends[plLabel] : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <SectionHeader icon={GitCompare} title={segment.name} subtitle={`【事業利益増減 ${periodLabel}】`} />
        <div className={styles.metric}>
          <span className={styles.metricLabel}>影響額</span>
          <span className={styles.metricValue}>
            <DeltaValue value={segment.value} /> 百万円
          </span>
        </div>
        {isFactorSegment && (
          <div className={styles.metric}>
            <span className={styles.metricLabel}>影響方向</span>
            <span className={styles.metricValue} style={{ color: segment.value >= 0 ? 'var(--color-text-positive)' : 'var(--color-text-negative)' }}>
              {direction}
            </span>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <SectionHeader icon={BarChart3} title="増減ブリッジ全体" subtitle="百万円" />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>要因</th>
              <th>金額</th>
              <th>種別</th>
            </tr>
          </thead>
          <tbody>
            {allSegments.map(seg => {
              const isHighlighted = seg.name === segment.name;
              const typeLabel = seg.type === 'start' ? '期央計画' : seg.type === 'total' ? '実績' : seg.value >= 0 ? '増加' : '減少';
              return (
                <tr
                  key={seg.name}
                  style={isHighlighted ? { backgroundColor: 'var(--color-warning-bg)' } : undefined}
                  className={seg.type === 'start' || seg.type === 'total' ? styles.totalRow : ''}
                >
                  <td>{seg.name}</td>
                  <td>
                    {seg.type === 'start' || seg.type === 'total'
                      ? seg.value.toLocaleString()
                      : <DeltaValue value={seg.value} />}
                  </td>
                  <td>{typeLabel}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {relatedPl && (
        <div className={styles.section}>
          <SectionHeader icon={Table} title="関連P&L項目" subtitle={relatedPl.label} />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>指標</th>
                <th>値</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>実績</td>
                <td>{typeof relatedPl.values.actual === 'number' ? relatedPl.values.actual.toLocaleString() : relatedPl.values.actual}</td>
              </tr>
              <tr>
                <td>期央計画</td>
                <td>{typeof relatedPl.values.plan === 'number' ? relatedPl.values.plan.toLocaleString() : relatedPl.values.plan}</td>
              </tr>
              <tr>
                <td>対計画差</td>
                <td>
                  {typeof relatedPl.values.diff === 'number'
                    ? <DeltaValue value={relatedPl.values.diff} />
                    : relatedPl.values.diff}
                </td>
              </tr>
              {relatedPl.values.prevYear !== undefined && (
                <tr>
                  <td>前年実績</td>
                  <td>{typeof relatedPl.values.prevYear === 'number' ? relatedPl.values.prevYear.toLocaleString() : relatedPl.values.prevYear}</td>
                </tr>
              )}
              {relatedPl.values.yoyDiff !== undefined && (
                <tr>
                  <td>対前年差</td>
                  <td>
                    {typeof relatedPl.values.yoyDiff === 'number'
                      ? <DeltaValue value={relatedPl.values.yoyDiff} />
                      : relatedPl.values.yoyDiff}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {trendData && plLabel && (
        <PlTrendChart trendData={trendData} subtitle={plLabel} />
      )}
    </div>
  );
}
