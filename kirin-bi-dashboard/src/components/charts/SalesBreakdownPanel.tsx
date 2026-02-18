import { Fragment, useState } from 'react';
import { Package, ChevronRight, ChevronDown } from 'lucide-react';
import type { SlicerState, DrilldownType } from '../../types';
import type { ContainerChannelRow } from '../../data/appendixData';
import { StatusIcon } from '../common/StatusIcon';
import { Sparkline } from '../common/Sparkline';
import { SectionHeader } from '../common/SectionHeader';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { getCellBg } from './heatmapUtils';
import {
  containerChannelData,
  containerChannelDataMonthly,
} from '../../data';
import styles from './SalesBreakdownPanel.module.css';

interface SalesBreakdownPanelProps {
  slicer: SlicerState;
  onDrilldown: (type: DrilldownType, title: string, data: Record<string, unknown>) => void;
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

function DiffDot({ ratio }: { ratio: number }) {
  const level = useConditionalFormat(ratio);
  return <StatusIcon level={level} size={6} />;
}

function RatioCell({ ratio, sparklineData }: { ratio: number; sparklineData?: number[] }) {
  return (
    <td className={styles.diffCell} style={{ backgroundColor: getCellBg(ratio) }}>
      <div className={styles.cellContent}>
        <DiffDot ratio={ratio} />
        <span>{ratio.toFixed(1)}%</span>
        {sparklineData && (
          <Sparkline data={sparklineData} width={48} height={20} color="var(--color-primary)" />
        )}
      </div>
    </td>
  );
}

export function SalesBreakdownPanel({ slicer, onDrilldown }: SalesBreakdownPanelProps) {
  const isMonthly = slicer.period === 'monthly';
  const data = isMonthly ? containerChannelDataMonthly : containerChannelData;
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (label: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  // Max values among parent rows (excluding summary) for data bar scaling
  const parentRows = data.filter(r => !r.isSummary);
  const volumeMax = Math.max(...parentRows.map(r => r.volume ?? 0));
  const salesMax = Math.max(...parentRows.map(r => r.revenue / 100));

  // Sparkline data for parent rows
  const sparklines: Record<string, number[]> = {};
  for (const row of parentRows) {
    sparklines[row.label] = generateRatioTrend(row.planRatio, row.label.charCodeAt(0));
  }

  const handleChildClick = (parentLabel: string, childLabel: string) =>
    onDrilldown('channel', `${parentLabel} / ${childLabel} 詳細`, {
      channel: childLabel,
      container: parentLabel,
    });

  return (
    <div className={styles.wrapper}>
      <SectionHeader
        icon={Package}
        title="容器別BU売上実績"
        subtitle={isMonthly ? '単月' : '累月'}
        pageRef="41"
        interactive
      />
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>容器別</th>
              <th>販売数量(千箱)</th>
              <th>売上高(億円)</th>
              <th>計画比</th>
              <th>前年比</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: ContainerChannelRow) => {
              const hasChildren = !!(row.children && row.children.length > 0);
              const isExpanded = expanded.has(row.label);
              const salesOku = row.revenue / 100;

              return (
                <Fragment key={row.label}>
                  <tr
                    className={hasChildren ? styles.parentRow : undefined}
                    onClick={hasChildren
                      ? () => toggle(row.label)
                      : () => onDrilldown('channel', `${row.label} 詳細`, { channel: row.label })
                    }
                  >
                    <td className={hasChildren ? styles.parentLabelCell : styles.labelCell}>
                      {hasChildren ? (
                        <div className={styles.cellContent}>
                          {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                          {row.label}
                        </div>
                      ) : row.label}
                    </td>
                    <td className={styles.valueCell} style={barStyle(row.volume ?? 0, volumeMax, row.planRatio)}>
                      {row.volume != null ? row.volume.toLocaleString() : '—'}
                    </td>
                    <td className={styles.valueCell} style={barStyle(salesOku, salesMax, undefined)}>
                      {salesOku.toFixed(1)}
                    </td>
                    <RatioCell ratio={row.planRatio} sparklineData={sparklines[row.label]} />
                    <RatioCell ratio={row.yoyRatio} />
                  </tr>
                  {isExpanded && row.children?.map(child => {
                    const childSalesOku = child.revenue / 100;
                    return (
                      <tr
                        key={`${row.label}-${child.label}`}
                        className={styles.childRow}
                        onClick={() => handleChildClick(row.label, child.label)}
                      >
                        <td className={styles.childLabelCell}>{child.label}</td>
                        <td className={styles.valueCell}>
                          {child.volume != null ? child.volume.toLocaleString() : '—'}
                        </td>
                        <td className={styles.valueCell}>
                          {childSalesOku.toFixed(1)}
                        </td>
                        <RatioCell ratio={child.planRatio} />
                        <RatioCell ratio={child.yoyRatio} />
                      </tr>
                    );
                  })}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
