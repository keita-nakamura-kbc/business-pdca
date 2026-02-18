import { SectionHeader } from '../common/SectionHeader';
import { DeltaValue } from '../common/DeltaValue';
import { StatusIcon } from '../common/StatusIcon';
import { DollarSign, Package } from 'lucide-react';
import type { SlicerState } from '../../types';
import {
  variableCostImpactMonthly,
  variableCostImpactCumulative,
  priceVarianceDataMonthly,
  priceVarianceDataCumulative,
  rawMaterialData,
} from '../../data';
import styles from './DrilldownContent.module.css';

interface CostDrilldownProps {
  data: Record<string, unknown>;
  slicer: SlicerState;
}

export function CostDrilldown({ data, slicer }: CostDrilldownProps) {
  const buName = data.buName as string | undefined;
  const kpi = data.kpi as { label: string } | undefined;
  const isRawMaterial = kpi?.label === '原材料コスト';
  const isMonthly = slicer.period === 'monthly';
  const periodLabel = isMonthly ? '単月' : '累月';
  const costImpact = isMonthly ? variableCostImpactMonthly : variableCostImpactCumulative;
  const priceVariance = isMonthly ? priceVarianceDataMonthly : priceVarianceDataCumulative;

  return (
    <div className={styles.container}>
      {!isRawMaterial && (
        <>
          <div className={styles.section}>
            <SectionHeader icon={DollarSign} title="変動費影響" subtitle={`【単社】${periodLabel} 億円`} pageRef="11" />
            <table className={styles.table}>
              <thead>
                <tr><th>BU</th><th>影響額</th><th>要因</th></tr>
              </thead>
              <tbody>
                {costImpact.map(row => (
                  <tr
                    key={row.buName}
                    style={row.buName === buName ? { backgroundColor: 'var(--color-warning-bg)' } : undefined}
                  >
                    <td>{row.buName}</td>
                    <td><DeltaValue value={row.impact} /></td>
                    <td>{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.section}>
            <SectionHeader icon={DollarSign} title="売上高単価差異" subtitle={`【単社】${periodLabel} 百万円`} pageRef="46" />
            <table className={styles.table}>
              <thead>
                <tr><th>BU</th><th>単価差</th><th>数量差</th><th>価格差</th><th>MIX差</th></tr>
              </thead>
              <tbody>
                {priceVariance.map(row => (
                  <tr key={row.buName}>
                    <td>{row.buName}</td>
                    <td><DeltaValue value={row.unitPrice.diff} /></td>
                    <td><DeltaValue value={row.volumeImpact} /></td>
                    <td><DeltaValue value={row.priceImpact} /></td>
                    <td><DeltaValue value={row.mixImpact} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {isRawMaterial && (
        <div className={styles.section}>
          <SectionHeader icon={Package} title="原材料動向" subtitle="【単社】" pageRef="43" />
          <table className={styles.table}>
            <thead>
              <tr><th>カテゴリ</th><th>主要品目</th><th>動向</th><th>影響</th></tr>
            </thead>
            <tbody>
              {rawMaterialData.map(row => (
                <tr key={row.category}>
                  <td className={styles.categoryCell}>{row.category}</td>
                  <td>{row.items.join('、')}</td>
                  <td>
                    <StatusIcon
                      level={row.trend === 'up' ? 'missed' : row.trend === 'down' ? 'achieved' : 'warning'}
                    />
                    {row.trend === 'up' ? '上昇' : row.trend === 'down' ? '下落' : '横ばい'}
                  </td>
                  <td>{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
