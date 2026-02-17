import type { BrandMetricRow } from '../../data/brandMetricData';
import { DeltaValue } from '../common/DeltaValue';
import { Sparkline } from '../common/Sparkline';
import { getCellColor, CellDot, barGradient, metrics } from './heatmapUtils';
import type { MetricDef } from './heatmapUtils';
import styles from './HeatmapTable.module.css';

interface BrandHeatmapTableProps {
  data: BrandMetricRow[];
  sparklineData?: Record<string, Record<string, number[]>>;
  onCellClick?: (brandName: string, metric: string) => void;
}

export function BrandHeatmapTable({ data, sparklineData, onCellClick }: BrandHeatmapTableProps) {
  // Pre-compute column max actual values for data bar scaling
  const colMax: Record<string, number> = {};
  for (const m of metrics) {
    colMax[m.key] = Math.max(...data.map(row =>
      Math.abs(row[m.field as keyof BrandMetricRow as 'volume' | 'sales' | 'marginalProfit' | 'directProfit'].actual)
    ));
  }

  const handleKeyDown = (e: React.KeyboardEvent, brandName: string, metricKey: string) => {
    if (onCellClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onCellClick(brandName, metricKey);
    }
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ブランド</th>
            {metrics.map((m: MetricDef) => (
              <th key={m.key} className={styles.th}>{m.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.brandName} className={styles.row}>
              <td className={styles.rowHeader}>{row.brandName}</td>
              {metrics.map((m: MetricDef) => {
                const metricData = row[m.field as 'volume' | 'sales' | 'marginalProfit' | 'directProfit'];
                const ratio = metricData.ratio;
                const sparkData = sparklineData?.[row.brandName]?.[m.key];

                if (m.showActual) {
                  return (
                    <td
                      key={m.key}
                      className={`${styles.cell} ${onCellClick ? styles.clickable : ''}`}
                      style={{
                        backgroundColor: getCellColor(ratio),
                        backgroundImage: barGradient(metricData.actual, colMax[m.key]),
                      }}
                      onClick={() => onCellClick?.(row.brandName, m.key)}
                      tabIndex={onCellClick ? 0 : undefined}
                      onKeyDown={onCellClick ? (e) => handleKeyDown(e, row.brandName, m.key) : undefined}
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
                    className={`${styles.cell} ${onCellClick ? styles.clickable : ''}`}
                    style={{
                      backgroundColor: getCellColor(ratio),
                      backgroundImage: barGradient(metricData.actual, colMax[m.key]),
                    }}
                    onClick={() => onCellClick?.(row.brandName, m.key)}
                    tabIndex={onCellClick ? 0 : undefined}
                    onKeyDown={onCellClick ? (e) => handleKeyDown(e, row.brandName, m.key) : undefined}
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
