import { LineChart, MessageSquare, GitCompare, Table2, TrendingUp } from 'lucide-react';
import type { SlicerState, DrilldownType } from '../../types';
import { KpiCard } from '../common/KpiCard';
import { SectionHeader } from '../common/SectionHeader';
import { ComboChart } from '../charts/ComboChart';
import { WaterfallChart } from '../charts/WaterfallChart';
import { MarketPanel } from '../charts/MarketPanel';
import { RegionalPlSummary } from '../charts/RegionalPlSummary';
import { BuTrendChart } from '../charts/BuTrendChart';
import { BrandTrendChart } from '../charts/BrandTrendChart';
import {
  monthlyKpis,
  cumulativeKpis,
  annualTrendData,
  waterfallMonthly,
  waterfallCumulative,
  buMonthlySales,
  buCumulativeSales,
  buHeatmapData,
  buHeatmapDataMonthly,
  brandMonthlySales,
  brandCumulativeSales,
} from '../../data';
import styles from './TrendsTab.module.css';

interface TrendsTabProps {
  slicer: SlicerState;
  onDrilldown: (type: DrilldownType, title: string, data: Record<string, unknown>) => void;
}

export function TrendsTab({ slicer, onDrilldown }: TrendsTabProps) {
  const isMonthly = slicer.period === 'monthly';
  const kpis = isMonthly ? monthlyKpis : cumulativeKpis;
  const waterfall = isMonthly ? waterfallMonthly : waterfallCumulative;
  const buTrend = isMonthly ? buMonthlySales : buCumulativeSales;
  const buDetail = isMonthly ? buHeatmapDataMonthly : buHeatmapData;
  const brandTrend = isMonthly ? brandMonthlySales : brandCumulativeSales;

  return (
    <div className={styles.container}>
      {/* Top row: KPI cards + Commentary */}
      <div className={styles.topRow}>
        {kpis.map(kpi => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
            unit={kpi.unit}
            target={kpi.target}
            ratio={kpi.ratio}
            trend={kpi.trend}
            sparkline={kpi.sparkline}
            onClick={() => onDrilldown((kpi.drilldownType || 'kpi') as DrilldownType, `${kpi.label} 詳細`, { kpi })}
          />
        ))}
        <div className={styles.commentary}>
          <SectionHeader icon={MessageSquare} title="キーメッセージ" />
          <ul className={styles.commentaryList}>
            <li>事業利益は11月累月207.1億で目標△2.9億。固定費削減で利益率は改善</li>
            <li>売上は未達（△35.6億）だが、固定費+22.6億の削減で吸収</li>
          </ul>
        </div>
      </div>

      {/* Upper charts: ComboChart + Waterfall + RegionalPlSummary (1/3 each) */}
      <div className={styles.chartRowUpper}>
        <div className={styles.chartPanelThird}>
          <SectionHeader icon={LineChart} title="年間事業利益推移" subtitle="【連結】" pageRef="12" />
          <ComboChart data={annualTrendData} height={390} />
        </div>
        <div className={styles.chartPanelThird}>
          <SectionHeader
            icon={GitCompare}
            title="事業利益増減分析"
            subtitle={isMonthly ? '【連結】単月 百万円' : '【連結】累月 百万円'}
            pageRef="37-38"
            interactive
          />
          <WaterfallChart
            data={waterfall}
            height={390}
            onSegmentClick={(seg) =>
              onDrilldown('waterfall', `${seg.name} BU別内訳`, { segment: seg })
            }
          />
        </div>
        <div className={styles.chartPanelThird}>
          <SectionHeader icon={Table2} title="連結領域別損益" subtitle={isMonthly ? '【単月 億円】' : '【累月 億円】'} pageRef="36" />
          <RegionalPlSummary slicer={slicer} />
        </div>
      </div>

      {/* Lower charts: MarketPanel + BuTrend + BrandTrend (1/3 each) */}
      <div className={styles.chartRowLower}>
        <div className={styles.chartPanelThird}>
          <MarketPanel slicer={slicer} />
        </div>
        <div className={styles.chartPanelThird}>
          <SectionHeader icon={TrendingUp} title="BU別売上推移" subtitle={isMonthly ? '【単社】月別' : '【単社】累月'} pageRef="9" />
          <div style={{ flex: 1, minHeight: 0 }}>
            <BuTrendChart data={buTrend} buDetails={buDetail} />
          </div>
        </div>
        <div className={styles.chartPanelThird}>
          <SectionHeader icon={TrendingUp} title="ブランド別売上推移" subtitle={isMonthly ? '【単社】月別' : '【単社】累月'} pageRef="14,17,19" />
          <div style={{ flex: 1, minHeight: 0 }}>
            <BrandTrendChart data={brandTrend} />
          </div>
        </div>
      </div>
    </div>
  );
}
