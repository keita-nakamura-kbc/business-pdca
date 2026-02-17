import { Table } from 'lucide-react';
import type { SlicerState } from '../../types';
import { shipmentDetails, shipmentDetailsMonthly } from '../../data';
import { brandMetricData, brandMetricDataMonthly } from '../../data/brandMetricData';
import { brandMarketMetrics } from '../../data/brandData';
import { SectionHeader } from '../common/SectionHeader';
import { StatusIcon } from '../common/StatusIcon';
import { BrandMarketCharts } from './BrandMarketCharts';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import styles from './DrilldownContent.module.css';

interface BrandDrilldownProps {
  data: Record<string, unknown>;
  slicer: SlicerState;
}

// Map display labels to brandMetricData brandNames
const brandNameMap: Record<string, string> = {
  'プラズマ乳酸菌': 'iMUSE',
};

export function BrandDrilldown({ data, slicer }: BrandDrilldownProps) {
  const isMonthly = slicer.period === 'monthly';
  const periodLabel = isMonthly ? '単月' : '累月';
  const metricRows = isMonthly ? brandMetricDataMonthly : brandMetricData;

  // Resolve brand name
  let brandName = data.brandName as string | undefined;
  if (!brandName && data.brand) {
    brandName = (data.brand as { brandName: string }).brandName;
  }
  if (!brandName) return <div className={styles.noData}>データがありません</div>;

  // Normalize name for metric lookup
  const metricName = brandNameMap[brandName] || brandName;
  const metric = metricRows.find(m => m.brandName === metricName);

  if (!metric) {
    return <div className={styles.noData}>詳細データがありません</div>;
  }

  return <BrandMetricView brandName={brandName} slicer={slicer} periodLabel={periodLabel} />;
}

function BrandMetricView({ brandName, slicer, periodLabel }: {
  brandName: string;
  slicer: SlicerState;
  periodLabel: string;
}) {
  const isMonthly = slicer.period === 'monthly';
  const shipments = isMonthly ? shipmentDetailsMonthly : shipmentDetails;
  const displayName = brandName === 'iMUSE' ? 'プラズマ乳酸菌' : brandName;
  const shipment = shipments.find(s => s.brandName === displayName);
  const marketData = brandMarketMetrics.find(m => m.brandName === displayName);

  return (
    <div className={styles.container}>
      {marketData && (
        <div className={styles.section}>
          <BrandMarketCharts
            metrics={marketData.metrics}
            brandName={displayName}
          />
        </div>
      )}

      {shipment && (
        <div className={styles.section}>
          <SectionHeader icon={Table} title={`出荷実績内訳（千箱）`} subtitle={periodLabel} pageRef="14-20" />
          {shipment.items.map(item => (
            <div
              key={item.label}
              className={`${styles.shipmentItem} ${item.indent ? styles.indented : ''}`}
            >
              <span className={styles.shipmentLabel}>{item.label}</span>
              <span className={styles.shipmentValue}>{item.actual.toLocaleString()}</span>
              <span className={styles.shipmentRatio}>
                <StatusIcon level={useConditionalFormat(item.planRatio)} size={6} />
                {' '}期央{item.planRatio}%
              </span>
              <span className={styles.shipmentRatio}>
                <StatusIcon level={useConditionalFormat(item.yoyRatio)} size={6} />
                {' '}前年{item.yoyRatio}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
