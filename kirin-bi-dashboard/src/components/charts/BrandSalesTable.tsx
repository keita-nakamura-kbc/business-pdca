import { Fragment, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { SlicerState } from '../../types';
import type { ShipmentDetail } from '../../data/brandData';
import { StatusIcon } from '../common/StatusIcon';
import { Sparkline } from '../common/Sparkline';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { getCellBg } from './heatmapUtils';
import {
  salesByBrand,
  salesByBrandMonthly,
  shipmentDetails,
  shipmentDetailsMonthly,
} from '../../data';
import styles from './BrandSalesTable.module.css';

interface BrandSalesTableProps {
  slicer: SlicerState;
}

/** salesByBrand label → shipmentDetails brandName */
const brandNameMap: Record<string, string> = {
  'iMUSE': 'プラズマ乳酸菌',
};

function barStyle(value: number, colMax: number, ratio: number | undefined): React.CSSProperties {
  const barWidth = colMax > 0 ? (Math.abs(value) / colMax) * 100 : 0;
  return {
    backgroundColor: getCellBg(ratio),
    backgroundImage: barWidth > 0
      ? `linear-gradient(to right, rgba(27,50,90,0.07) 0%, rgba(27,50,90,0.07) ${barWidth}%, transparent ${barWidth}%)`
      : undefined,
  };
}

function generateRatioTrend(finalRatio: number, seed: number): number[] {
  const seasonal = [0.97, 0.96, 0.98, 1.01, 1.02, 1.01, 1.00, 0.99, 0.98, 1.01, 1.00];
  return seasonal.map((s, i) => {
    const base = finalRatio * s;
    const noise = (((seed * (i + 7)) % 11) - 5) * 0.3;
    return i === seasonal.length - 1 ? finalRatio : Math.round((base + noise) * 10) / 10;
  });
}

function DiffDot({ ratio }: { ratio: number | undefined }) {
  const level = useConditionalFormat(ratio);
  return <StatusIcon level={level} size={6} />;
}

function findShipment(label: string, details: ShipmentDetail[]): ShipmentDetail | undefined {
  const mapped = brandNameMap[label] ?? label;
  return details.find(d => d.brandName === mapped);
}

export function BrandSalesTable({ slicer }: BrandSalesTableProps) {
  const isMonthly = slicer.period === 'monthly';
  const data = isMonthly ? salesByBrandMonthly : salesByBrand;
  const shipments = isMonthly ? shipmentDetailsMonthly : shipmentDetails;
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (label: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const actualMax = Math.max(...data.map(r => r.actual));
  const salesMax = Math.max(...data.map(r => r.salesAmount ?? 0));

  // Sparkline data for each brand
  const sparklines: Record<string, number[]> = {};
  for (const row of data) {
    sparklines[row.label] = generateRatioTrend(row.planRatio, row.label.charCodeAt(0));
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ブランド</th>
            <th>販売数量(千箱)</th>
            <th>売上高(億円)</th>
            <th>計画比</th>
            <th>前年比</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => {
            const shipment = findShipment(row.label, shipments);
            const hasChildren = !!shipment;
            const isExpanded = expanded.has(row.label);

            return (
              <Fragment key={row.label}>
                <tr
                  className={hasChildren ? styles.parentRow : undefined}
                  onClick={hasChildren ? () => toggle(row.label) : undefined}
                >
                  <td className={hasChildren ? styles.parentLabelCell : styles.labelCell}>
                    {hasChildren ? (
                      <div className={styles.cellContent}>
                        {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                        {row.label}
                      </div>
                    ) : row.label}
                  </td>
                  <td className={styles.valueCell} style={barStyle(row.actual, actualMax, row.planRatio)}>
                    {row.actual.toLocaleString()}
                  </td>
                  <td className={styles.valueCell} style={barStyle(row.salesAmount ?? 0, salesMax, row.salesPlanRatio)}>
                    {row.salesAmount !== undefined ? row.salesAmount.toFixed(1) : '—'}
                  </td>
                  <td className={styles.diffCell} style={{ backgroundColor: getCellBg(row.planRatio) }}>
                    <div className={styles.cellContent}>
                      <DiffDot ratio={row.planRatio} />
                      <span>{row.planRatio.toFixed(1)}%</span>
                      {sparklines[row.label] && (
                        <Sparkline data={sparklines[row.label]} width={48} height={20} color="var(--color-primary)" />
                      )}
                    </div>
                  </td>
                  <td className={styles.diffCell} style={{ backgroundColor: getCellBg(row.yoyRatio) }}>
                    <div className={styles.cellContent}>
                      <DiffDot ratio={row.yoyRatio} />
                      <span>{row.yoyRatio.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
                {isExpanded && shipment?.items
                  .filter(item => item.indent === 1)
                  .map(item => (
                    <tr
                      key={`${row.label}-${item.label}`}
                      className={styles.childRow}
                    >
                      <td className={styles.childLabelCell}>{item.label}</td>
                      <td className={styles.valueCell}>
                        {item.actual.toLocaleString()}
                      </td>
                      <td className={styles.valueCell}>—</td>
                      <td className={styles.diffCell} style={{ backgroundColor: getCellBg(item.planRatio) }}>
                        <div className={styles.cellContent}>
                          <DiffDot ratio={item.planRatio} />
                          <span>{item.planRatio.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className={styles.diffCell} style={{ backgroundColor: getCellBg(item.yoyRatio) }}>
                        <div className={styles.cellContent}>
                          <DiffDot ratio={item.yoyRatio} />
                          <span>{item.yoyRatio.toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
