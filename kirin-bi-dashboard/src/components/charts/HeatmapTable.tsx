import type { BuData } from '../../types';
import { DeltaValue } from '../common/DeltaValue';
import { Sparkline } from '../common/Sparkline';
import { StatusIcon } from '../common/StatusIcon';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { getCellColor, CellDot, barGradient, metrics } from './heatmapUtils';
import type { MetricDef } from './heatmapUtils';
import styles from './HeatmapTable.module.css';

interface HeatmapTableProps {
  data: BuData[];
  sparklineData?: Record<string, Record<string, number[]>>;
}

function BuTooltipContent({ bu }: { bu: BuData }) {
  const salesLevel = useConditionalFormat(bu.sales.ratio);
  const mpLevel = useConditionalFormat(bu.marginalProfit.ratio);
  const dpLevel = useConditionalFormat(bu.directProfit.ratio);
  return (
    <div className={styles.buTooltip}>
      <div className={styles.tooltipTitle}>{bu.buName}</div>
      <div className={styles.tooltipRow}>
        <span>売上高</span>
        <span><StatusIcon level={salesLevel} size={6} /> {bu.sales.actual.toFixed(1)}億円 ({bu.sales.ratio.toFixed(1)}%)</span>
      </div>
      <div className={styles.tooltipRow}>
        <span>限界利益</span>
        <span><StatusIcon level={mpLevel} size={6} /> {bu.marginalProfit.actual.toFixed(1)}億円 ({bu.marginalProfit.ratio.toFixed(1)}%)</span>
      </div>
      <div className={styles.tooltipRow}>
        <span>直接利益</span>
        <span><StatusIcon level={dpLevel} size={6} /> {bu.directProfit.actual.toFixed(1)}億円 ({bu.directProfit.ratio.toFixed(1)}%)</span>
      </div>
      <div className={styles.tooltipRow}>
        <span>変動費高比</span>
        <span>{bu.variableCostRatio.actual.toFixed(1)}%</span>
      </div>
      <div className={styles.tooltipRow}>
        <span>直接利益率</span>
        <span>{bu.directProfitRate.actual.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export function HeatmapTable({ data, sparklineData }: HeatmapTableProps) {
  // Pre-compute column max actual values for data bar scaling
  const colMax: Record<string, number> = {};
  for (const m of metrics) {
    colMax[m.key] = Math.max(...data.map(bu => {
      const md = bu[m.field as keyof BuData] as { actual: number };
      return Math.abs(md.actual);
    }));
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>BU</th>
            {metrics.map((m: MetricDef) => (
              <th key={m.key} className={styles.th}>{m.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(bu => (
            <tr key={bu.buName} className={styles.row}>
              <td className={styles.rowHeader}>
                <div className={styles.tooltipTrigger}>
                  {bu.buName}
                  <BuTooltipContent bu={bu} />
                </div>
              </td>
              {metrics.map((m: MetricDef) => {
                const metricData = bu[m.field as keyof BuData] as { actual: number; ratio: number; diff: number };
                const ratio = metricData.ratio;
                const sparkData = sparklineData?.[bu.buName]?.[m.key];

                if (m.showActual) {
                  return (
                    <td
                      key={m.key}
                      className={styles.cell}
                      style={{
                        backgroundColor: getCellColor(ratio),
                        backgroundImage: barGradient(metricData.actual, colMax[m.key]),
                      }}
                    >
                      <div className={styles.cellContent}>
                        <div>
                          <div className={styles.cellRatio}>
                            <CellDot ratio={ratio} />
                            {metricData.actual.toFixed(1)}
                          </div>
                          <div className={styles.cellDiff}>億円</div>
                        </div>
                        {sparkData && (
                          <Sparkline data={sparkData} width={48} height={20} color="var(--color-primary)" />
                        )}
                      </div>
                    </td>
                  );
                }

                const diff = metricData.diff;
                return (
                  <td
                    key={m.key}
                    className={styles.cell}
                    style={{
                      backgroundColor: getCellColor(ratio),
                      backgroundImage: barGradient(metricData.actual, colMax[m.key]),
                    }}
                  >
                    <div className={styles.cellContent}>
                      <div>
                        <div className={styles.cellRatio}>
                          <CellDot ratio={ratio} />
                          {ratio.toFixed(1)}%
                        </div>
                        <div className={styles.cellDiff}>
                          <DeltaValue value={diff} suffix="" />
                        </div>
                      </div>
                      {sparkData && (
                        <Sparkline data={sparkData} width={48} height={20} color="var(--color-primary)" />
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
