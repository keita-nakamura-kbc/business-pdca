import { StatusIcon } from '../common/StatusIcon';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';

/** 5-level heatmap cell background (HeatmapTable / BrandHeatmapTable) */
export function getCellColor(ratio: number): string {
  if (ratio >= 105) return 'rgba(100, 200, 100, 0.30)';
  if (ratio >= 100) return 'var(--color-achieved-bg)';
  if (ratio >= 95) return 'var(--color-warning-bg)';
  if (ratio >= 90) return 'var(--color-missed-bg)';
  return 'rgba(200, 100, 100, 0.30)';
}

/** 5-level heatmap cell background (RegionalPlSummary / SalesBreakdownPanel / BrandSalesTable) */
export function getCellBg(ratio: number | undefined): string | undefined {
  if (ratio === undefined) return undefined;
  if (ratio >= 105) return 'rgba(76, 175, 80, 0.25)';
  if (ratio >= 100) return 'rgba(76, 175, 80, 0.10)';
  if (ratio >= 95)  return 'rgba(255, 152, 0, 0.10)';
  if (ratio >= 90)  return 'rgba(244, 67, 54, 0.12)';
  return 'rgba(244, 67, 54, 0.25)';
}

/** Data bar gradient overlay for heatmap cells */
export function barGradient(actual: number, colMax: number): string | undefined {
  if (colMax <= 0) return undefined;
  const barWidth = (Math.abs(actual) / colMax) * 100;
  return barWidth > 0
    ? `linear-gradient(to right, rgba(27,50,90,0.07) 0%, rgba(27,50,90,0.07) ${barWidth}%, transparent ${barWidth}%)`
    : undefined;
}

/** StatusIcon dot sized for heatmap cells */
export function CellDot({ ratio }: { ratio: number }) {
  const level = useConditionalFormat(ratio);
  return <StatusIcon level={level} size={6} />;
}

/** Metric column definition for HeatmapTable / BrandHeatmapTable */
export interface MetricDef {
  key: string;
  label: string;
  field: string;
  showActual?: boolean;
}

export const metrics: MetricDef[] = [
  { key: 'volume', label: '販売数量', field: 'volume' },
  { key: 'grossSales', label: '売上高', field: 'sales', showActual: true },
  { key: 'sales', label: '売上収益', field: 'sales' },
  { key: 'marginalProfit', label: '限界利益', field: 'marginalProfit' },
  { key: 'directProfit', label: '直接利益', field: 'directProfit' },
];
