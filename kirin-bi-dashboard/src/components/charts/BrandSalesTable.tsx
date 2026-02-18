import { Fragment, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { SlicerState } from '../../types';
import type { ContainerBrandGroup } from '../../data/containerBrandData';
import { StatusIcon } from '../common/StatusIcon';
import { Sparkline } from '../common/Sparkline';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { getCellBg } from './heatmapUtils';
import {
  containerBrandData,
  containerBrandDataMonthly,
} from '../../data';
import styles from './BrandSalesTable.module.css';

interface BrandSalesTableProps {
  slicer: SlicerState;
}

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

export function BrandSalesTable({ slicer }: BrandSalesTableProps) {
  const isMonthly = slicer.period === 'monthly';
  const data: ContainerBrandGroup[] = isMonthly ? containerBrandDataMonthly : containerBrandData;
  const [expandedContainers, setExpandedContainers] = useState<Set<string>>(new Set());
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set());

  const toggleContainer = (container: string) => {
    setExpandedContainers(prev => {
      const next = new Set(prev);
      if (next.has(container)) next.delete(container);
      else next.add(container);
      return next;
    });
  };

  const toggleBrand = (key: string) => {
    setExpandedBrands(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const actualMax = Math.max(...data.map(g => g.actual));
  const salesMax = Math.max(...data.map(g => g.salesAmount ?? 0));

  // Sparkline data for container rows only
  const sparklines: Record<string, number[]> = {};
  for (const group of data) {
    sparklines[group.container] = generateRatioTrend(group.planRatio, group.container.charCodeAt(0));
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>容器 / ブランド</th>
            <th>販売数量(千箱)</th>
            <th>売上高(億円)</th>
            <th>計画比</th>
            <th>前年比</th>
          </tr>
        </thead>
        <tbody>
          {data.map(group => {
            const containerExpanded = expandedContainers.has(group.container);

            return (
              <Fragment key={group.container}>
                {/* Level 1: Container row */}
                <tr
                  className={styles.parentRow}
                  onClick={() => toggleContainer(group.container)}
                >
                  <td className={styles.parentLabelCell}>
                    <div className={styles.cellContent}>
                      {containerExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                      {group.container}
                    </div>
                  </td>
                  <td className={styles.valueCell} style={barStyle(group.actual, actualMax, group.planRatio)}>
                    {group.actual.toLocaleString()}
                  </td>
                  <td className={styles.valueCell} style={barStyle(group.salesAmount ?? 0, salesMax, group.planRatio)}>
                    {group.salesAmount !== undefined ? group.salesAmount.toFixed(1) : '—'}
                  </td>
                  <td className={styles.diffCell} style={{ backgroundColor: getCellBg(group.planRatio) }}>
                    <div className={styles.cellContent}>
                      <DiffDot ratio={group.planRatio} />
                      <span>{group.planRatio.toFixed(1)}%</span>
                      {sparklines[group.container] && (
                        <Sparkline data={sparklines[group.container]} width={48} height={20} color="var(--color-primary)" />
                      )}
                    </div>
                  </td>
                  <td className={styles.diffCell} style={{ backgroundColor: getCellBg(group.yoyRatio) }}>
                    <div className={styles.cellContent}>
                      <DiffDot ratio={group.yoyRatio} />
                      <span>{group.yoyRatio.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>

                {/* Level 2: Brand rows */}
                {containerExpanded && group.brands.map(brand => {
                  const brandKey = `${group.container}|${brand.brandName}`;
                  const brandExpanded = expandedBrands.has(brandKey);
                  const hasDetails = !!brand.details && brand.details.length > 0;

                  return (
                    <Fragment key={brandKey}>
                      <tr
                        className={hasDetails ? styles.brandRow : styles.brandRowPlain}
                        onClick={hasDetails ? () => toggleBrand(brandKey) : undefined}
                      >
                        <td className={styles.brandLabelCell}>
                          <div className={styles.cellContent}>
                            {hasDetails && (brandExpanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />)}
                            {brand.brandName}
                          </div>
                        </td>
                        <td className={styles.valueCell}>
                          {brand.actual.toLocaleString()}
                        </td>
                        <td className={styles.valueCell}>
                          {brand.salesAmount !== undefined ? brand.salesAmount.toFixed(1) : '—'}
                        </td>
                        <td className={styles.diffCell} style={{ backgroundColor: getCellBg(brand.planRatio) }}>
                          <div className={styles.cellContent}>
                            <DiffDot ratio={brand.planRatio} />
                            <span>{brand.planRatio.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className={styles.diffCell} style={{ backgroundColor: getCellBg(brand.yoyRatio) }}>
                          <div className={styles.cellContent}>
                            <DiffDot ratio={brand.yoyRatio} />
                            <span>{brand.yoyRatio.toFixed(1)}%</span>
                          </div>
                        </td>
                      </tr>

                      {/* Level 3: Detail rows */}
                      {brandExpanded && brand.details?.map(detail => (
                        <tr
                          key={`${brandKey}|${detail.label}`}
                          className={styles.detailRow}
                        >
                          <td className={styles.detailLabelCell}>{detail.label}</td>
                          <td className={styles.valueCell}>
                            {detail.actual.toLocaleString()}
                          </td>
                          <td className={styles.valueCell}>—</td>
                          <td className={styles.diffCell} style={{ backgroundColor: getCellBg(detail.planRatio) }}>
                            <div className={styles.cellContent}>
                              <DiffDot ratio={detail.planRatio} />
                              <span>{detail.planRatio.toFixed(1)}%</span>
                            </div>
                          </td>
                          <td className={styles.diffCell} style={{ backgroundColor: getCellBg(detail.yoyRatio) }}>
                            <div className={styles.cellContent}>
                              <DiffDot ratio={detail.yoyRatio} />
                              <span>{detail.yoyRatio.toFixed(1)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  );
                })}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
