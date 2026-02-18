import { Grid3X3, ClipboardList } from 'lucide-react';
import type { SlicerState, DrilldownType } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { SalesBreakdownPanel } from '../charts/SalesBreakdownPanel';
import { BrandSalesTable } from '../charts/BrandSalesTable';
import { HeatmapTable } from '../charts/HeatmapTable';
import { BrandHeatmapTable } from '../charts/BrandHeatmapTable';
import {
  buHeatmapData,
  buHeatmapDataMonthly,
  brandCards,
  brandMetricData,
  brandMetricDataMonthly,
} from '../../data';
import styles from './DriversTab.module.css';

interface DriversTabProps {
  slicer: SlicerState;
  onDrilldown: (type: DrilldownType, title: string, data: Record<string, unknown>) => void;
}

// Map brand metric names → brandCards brandNames
const brandNameMap: Record<string, string> = {
  'iMUSE': 'プラズマ乳酸菌',
};

// Brands with deep drilldown data (MarketCharts + Shipment)
const DRILLABLE_BRANDS = new Set(['生茶', '午後の紅茶', 'iMUSE', 'プラズマ乳酸菌']);

export function DriversTab({ slicer, onDrilldown }: DriversTabProps) {
  const isMonthly = slicer.period === 'monthly';
  const heatmap = isMonthly ? buHeatmapDataMonthly : buHeatmapData;
  const brandMetric = isMonthly ? brandMetricDataMonthly : brandMetricData;

  // Generate per-metric sparkline ratio trends from final ratio
  // Seasonal pattern + seed-based noise → unique sparkline per cell
  function generateRatioTrend(finalRatio: number, seed: number): number[] {
    const seasonal = [0.97, 0.96, 0.98, 1.01, 1.02, 1.01, 1.00, 0.99, 0.98, 1.01, 1.00];
    return seasonal.map((s, i) => {
      const base = finalRatio * s;
      const noise = (((seed * (i + 7)) % 11) - 5) * 0.3;
      return i === seasonal.length - 1 ? finalRatio : Math.round((base + noise) * 10) / 10;
    });
  }

  // BU sparkline data — per-metric
  const buSparklines: Record<string, Record<string, number[]>> = {};
  for (const bu of heatmap) {
    const seed = bu.buName.charCodeAt(0);
    buSparklines[bu.buName] = {
      volume: generateRatioTrend(bu.volume.ratio, seed + 1),
      grossSales: generateRatioTrend(bu.sales.ratio, seed + 2),
      sales: generateRatioTrend(bu.sales.ratio, seed + 3),
      marginalProfit: generateRatioTrend(bu.marginalProfit.ratio, seed + 4),
      directProfit: generateRatioTrend(bu.directProfit.ratio, seed + 5),
    };
  }

  // Brand sparkline data — per-metric
  const brandSparklines: Record<string, Record<string, number[]>> = {};
  for (const row of brandMetric) {
    const seed = row.brandName.charCodeAt(0);
    brandSparklines[row.brandName] = {
      volume: generateRatioTrend(row.volume.ratio, seed + 1),
      grossSales: generateRatioTrend(row.sales.ratio, seed + 2),
      sales: generateRatioTrend(row.sales.ratio, seed + 3),
      marginalProfit: generateRatioTrend(row.marginalProfit.ratio, seed + 4),
      directProfit: generateRatioTrend(row.directProfit.ratio, seed + 5),
    };
  }

  return (
    <div className={styles.container}>
      {/* Top Row: BU/事業 */}
      <div className={styles.rowBu}>
        <div className={styles.chartPanelThird}>
          <SectionHeader icon={Grid3X3} title="BU×指標 パフォーマンス" subtitle={isMonthly ? '【単社】単月' : '【単社】累月'} pageRef="9" />
          <HeatmapTable
            data={heatmap}
            sparklineData={buSparklines}
          />
        </div>
        <div className={styles.chartPanelNarrow}>
          <SalesBreakdownPanel slicer={slicer} onDrilldown={onDrilldown} />
        </div>
      </div>

      {/* Bottom Row: Brand/ブランド */}
      <div className={styles.rowBrand}>
        <div className={styles.chartPanelThird}>
          <SectionHeader icon={Grid3X3} title="ブランド×指標 パフォーマンス" subtitle={isMonthly ? '【単社】単月' : '【単社】累月'} pageRef="39-42" interactive />
          <BrandHeatmapTable
            data={brandMetric}
            sparklineData={brandSparklines}
            onCellClick={(name, _metric) => {
              if (!DRILLABLE_BRANDS.has(name)) return;
              const mapped = brandNameMap[name] || name;
              const brand = brandCards.find(c => c.brandName === mapped);
              onDrilldown('brand', `${name} 詳細`, brand ? { brand } : { brandName: name });
            }}
          />
        </div>
        <div className={styles.chartPanelNarrow}>
          <SectionHeader icon={ClipboardList} title="容器別ブランド売上実績" subtitle={isMonthly ? '【単社】単月' : '【単社】累月'} pageRef="39-40" />
          <BrandSalesTable slicer={slicer} />
        </div>
      </div>
    </div>
  );
}
