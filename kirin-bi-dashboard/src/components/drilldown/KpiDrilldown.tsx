import { BarChart3, Table } from 'lucide-react';
import type { SlicerState } from '../../types';
import { DeltaValue } from '../common/DeltaValue';
import { SectionHeader } from '../common/SectionHeader';
import { StatusIcon } from '../common/StatusIcon';
import { Sparkline } from '../common/Sparkline';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { annualTrendData } from '../../data';
import styles from './DrilldownContent.module.css';

interface KpiDrilldownProps {
  data: Record<string, unknown>;
  slicer: SlicerState;
}

export function KpiDrilldown({ data, slicer }: KpiDrilldownProps) {
  const kpi = data.kpi as { label: string; value: number; unit: string; target?: number; ratio?: number; sparkline?: number[] } | undefined;
  if (!kpi) return <div className={styles.noData}>データがありません</div>;

  const isMonthly = slicer.period === 'monthly';
  const periodLabel = isMonthly ? '単月' : '累月';
  const hasRatio = kpi.target !== undefined && kpi.ratio !== undefined;
  const diff = hasRatio ? kpi.value - kpi.target! : undefined;
  const level = useConditionalFormat(kpi.ratio);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <SectionHeader icon={BarChart3} title={`${kpi.label} サマリ`} subtitle={`【連結】${periodLabel}`} pageRef="4,6" />
        <div className={styles.metric}>
          <span className={styles.metricLabel}>実績</span>
          <span className={styles.metricValue}>{kpi.value.toLocaleString()} {kpi.unit}</span>
        </div>
        {hasRatio && (
          <>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>目標（期央）</span>
              <span className={styles.metricValue}>{kpi.target!.toLocaleString()} {kpi.unit}</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>達成率</span>
              <span className={styles.metricValue}>
                <StatusIcon level={level} size={8} /> {kpi.ratio!.toFixed(1)}%
              </span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>差異</span>
              <span className={styles.metricValue}>
                <DeltaValue value={diff!} suffix={` ${kpi.unit}`} />
              </span>
            </div>
          </>
        )}
        {kpi.sparkline && kpi.sparkline.length >= 2 && (
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
            <Sparkline data={kpi.sparkline} width={200} height={40} />
          </div>
        )}
      </div>

      <div className={styles.section}>
        <SectionHeader icon={Table} title="月別実績" subtitle={periodLabel} pageRef="12" />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>月</th>
              {isMonthly ? (
                <>
                  <th>単月実績</th>
                  <th>単月計画</th>
                </>
              ) : (
                <>
                  <th>累月実績</th>
                  <th>累月計画</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {annualTrendData.map(d => (
              <tr key={d.month}>
                <td>{d.month}</td>
                {isMonthly ? (
                  <>
                    <td>{d.monthlyActual.toFixed(1)}</td>
                    <td>{d.monthlyPlan.toFixed(1)}</td>
                  </>
                ) : (
                  <>
                    <td>{d.cumActual.toFixed(1)}</td>
                    <td>{d.cumPlan.toFixed(1)}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
