import { Fragment, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { SlicerState } from '../../types';
import type { RegionalPlRow } from '../../data/appendixData';
import { StatusIcon } from '../common/StatusIcon';
import { Sparkline } from '../common/Sparkline';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { getCellBg } from './heatmapUtils';
import { regionalPlData, regionalPlDataMonthly } from '../../data';
import styles from './RegionalPlSummary.module.css';

interface RegionalPlSummaryProps {
  slicer: SlicerState;
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

interface PlSection {
  parent: RegionalPlRow;
  children: RegionalPlRow[];
}

function buildSections(data: RegionalPlRow[]): (PlSection | RegionalPlRow)[] {
  const result: (PlSection | RegionalPlRow)[] = [];
  let children: RegionalPlRow[] = [];
  for (const row of data) {
    if (row.isSubtotal || (row.isTotal && !row.isRate)) {
      result.push({ parent: row, children });
      children = [];
    } else if (row.isTotal && row.isRate) {
      result.push(row);
    } else {
      children.push(row);
    }
  }
  return result;
}

export function RegionalPlSummary({ slicer }: RegionalPlSummaryProps) {
  const isMonthly = slicer.period === 'monthly';
  const data = isMonthly ? regionalPlDataMonthly : regionalPlData;
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  const sections = buildSections(data);

  const sparklines: Record<string, number[]> = {};
  for (const row of data) {
    if (row.consolidatedPlanRatio !== undefined && !row.isRate) {
      sparklines[row.item] = generateRatioTrend(row.consolidatedPlanRatio, row.item.charCodeAt(0));
    }
  }

  const formatValue = (val: number, isRate?: boolean) =>
    isRate ? `${val.toFixed(1)}%` : val.toFixed(1);

  // Column max for data bar normalization (exclude rate rows)
  const nonRateRows = data.filter(r => !r.isRate);
  const hsMax = Math.max(...nonRateRows.map(r => Math.abs(r.hs)));
  const foodMax = Math.max(...nonRateRows.map(r => Math.abs(r.food)));
  const consolidatedMax = Math.max(...nonRateRows.map(r => Math.abs(r.consolidated)));

  function cellStyle(value: number, colMax: number, ratio: number | undefined, isRate?: boolean): React.CSSProperties | undefined {
    const bg = (!isRate && ratio !== undefined) ? getCellBg(ratio) : undefined;
    const barWidth = (!isRate && colMax > 0) ? (Math.abs(value) / colMax) * 100 : 0;
    if (!bg && barWidth === 0) return undefined;
    return {
      backgroundColor: bg,
      backgroundImage: barWidth > 0
        ? `linear-gradient(to right, rgba(27,50,90,0.07) 0%, rgba(27,50,90,0.07) ${barWidth}%, transparent ${barWidth}%)`
        : undefined,
    };
  }

  function renderRow(row: RegionalPlRow, isParent: boolean, hasChildren: boolean) {
    const rowClass = row.isTotal ? styles.totalRow : row.isSubtotal ? styles.subtotalRow : '';
    const isExpanded = expanded.has(row.item);
    return (
      <tr
        key={row.item}
        className={rowClass}
        onClick={isParent && hasChildren ? () => toggle(row.item) : undefined}
      >
        <td className={isParent ? styles.parentLabelCell : styles.labelCell}>
          {isParent && hasChildren ? (
            <div className={styles.cellContent}>
              {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              {row.item}
            </div>
          ) : row.item}
        </td>
        <td className={styles.valueCell} style={cellStyle(row.hs, hsMax, row.hsPlanRatio, row.isRate)}>
          {formatValue(row.hs, row.isRate)}
        </td>
        <td className={styles.valueCell} style={cellStyle(row.food, foodMax, row.foodPlanRatio, row.isRate)}>
          {formatValue(row.food, row.isRate)}
        </td>
        <td className={styles.valueCell} style={cellStyle(row.consolidated, consolidatedMax, row.consolidatedPlanRatio, row.isRate)}>
          {formatValue(row.consolidated, row.isRate)}
        </td>
        <td className={styles.diffCell}>
          {row.consolidatedPlanRatio !== undefined && !row.isRate && (
            <div className={styles.cellContent}>
              <DiffDot ratio={row.consolidatedPlanRatio} />
              <span>{row.consolidatedPlanRatio.toFixed(1)}%</span>
              {sparklines[row.item] && (
                <Sparkline data={sparklines[row.item]} width={48} height={20} color="var(--color-primary)" />
              )}
            </div>
          )}
        </td>
        <td className={styles.diffCell}>
          {row.consolidatedYoyRatio !== undefined && !row.isRate && (
            <div className={styles.cellContent}>
              <DiffDot ratio={row.consolidatedYoyRatio} />
              <span>{row.consolidatedYoyRatio.toFixed(1)}%</span>
            </div>
          )}
        </td>
      </tr>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>項目</th>
            <th>HS</th>
            <th>Food</th>
            <th>連結</th>
            <th>対計画</th>
            <th>対前年</th>
          </tr>
        </thead>
        <tbody>
          {sections.map(item =>
            'parent' in item ? (
              <Fragment key={item.parent.item}>
                {renderRow(item.parent, true, item.children.length > 0)}
                {expanded.has(item.parent.item) && item.children.map(child =>
                  renderRow(child, false, false)
                )}
              </Fragment>
            ) : (
              renderRow(item, false, false)
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
