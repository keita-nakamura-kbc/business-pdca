import { Fragment, useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { DeltaValue } from '../common/DeltaValue';
import { Truck, ChevronRight, ChevronDown } from 'lucide-react';
import type { SlicerState } from '../../types';
import type { ChannelPlRow } from '../../data/appendixData';
import { channelPlData, channelPlDataMonthly } from '../../data';
import styles from './DrilldownContent.module.css';

interface ChannelDrilldownProps {
  data: Record<string, unknown>;
  slicer: SlicerState;
}

interface ChannelGroup {
  parent: ChannelPlRow;
  children: ChannelPlRow[];
}

function groupChannelRows(rows: ChannelPlRow[]): (ChannelGroup | ChannelPlRow)[] {
  const result: (ChannelGroup | ChannelPlRow)[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row.isTotal && !row.isGrandTotal) {
      const children: ChannelPlRow[] = [];
      while (i + 1 < rows.length && rows[i + 1].indent) {
        children.push(rows[++i]);
      }
      result.push(children.length > 0 ? { parent: row, children } : row);
    } else {
      result.push(row);
    }
  }
  return result;
}

function renderCells(row: ChannelPlRow) {
  return (
    <>
      <td>{row.volume.toLocaleString()}</td>
      <td>{row.sales.toLocaleString()}</td>
      <td>{row.variableCostRatio.toFixed(1)}</td>
      <td>{row.marginalProfitPerCase < 0
        ? <DeltaValue value={row.marginalProfitPerCase} />
        : row.marginalProfitPerCase}
      </td>
      <td>{row.directProfit < 0
        ? <DeltaValue value={row.directProfit} />
        : row.directProfit.toLocaleString()}
      </td>
      <td>{row.directProfitRate < 0
        ? <DeltaValue value={row.directProfitRate} />
        : row.directProfitRate.toFixed(1)}
      </td>
    </>
  );
}

export function ChannelDrilldown({ data, slicer }: ChannelDrilldownProps) {
  const channelName = data.channelName as string | undefined;
  const isMonthly = slicer.period === 'monthly';
  const periodLabel = isMonthly ? '単月' : '累月';
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const plRows = isMonthly ? channelPlDataMonthly : channelPlData;
  const groups = groupChannelRows(plRows);

  const toggle = (channel: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(channel) ? next.delete(channel) : next.add(channel);
      return next;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <SectionHeader icon={Truck} title="チャネル別損益" subtitle={`【単社】${periodLabel}`} pageRef="47" />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>チャネル</th>
              <th>販売箱数<br/>(千箱)</th>
              <th>売上高<br/>(百万円)</th>
              <th>変動費<br/>高比(%)</th>
              <th>限利単価<br/>(円/箱)</th>
              <th>直接利益<br/>(百万円)</th>
              <th>直利率<br/>(%)</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(item =>
              'parent' in item ? (
                <Fragment key={item.parent.channel}>
                  <tr
                    className={styles.totalRow}
                    style={item.parent.channel === channelName ? { backgroundColor: 'var(--color-warning-bg)' } : undefined}
                    onClick={() => toggle(item.parent.channel)}
                  >
                    <td style={{ textAlign: 'left', fontWeight: 700 }}>
                      <div className={styles.parentChannelCell}>
                        {expanded.has(item.parent.channel) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                        {item.parent.channel}
                      </div>
                    </td>
                    {renderCells(item.parent)}
                  </tr>
                  {expanded.has(item.parent.channel) && item.children.map(child => (
                    <tr
                      key={child.channel}
                      style={child.channel === channelName ? { backgroundColor: 'var(--color-warning-bg)' } : undefined}
                    >
                      <td style={{ textAlign: 'left', paddingLeft: 20, fontWeight: 400 }}>
                        {child.channel}
                      </td>
                      {renderCells(child)}
                    </tr>
                  ))}
                </Fragment>
              ) : (
                <tr
                  key={item.channel}
                  className={item.isGrandTotal ? styles.grandTotalRow : item.isTotal ? styles.totalRow : ''}
                  style={item.channel === channelName ? { backgroundColor: 'var(--color-warning-bg)' } : undefined}
                >
                  <td style={{ textAlign: 'left', fontWeight: (item.isTotal || item.isGrandTotal) ? 700 : 400 }}>
                    {item.channel}
                  </td>
                  {renderCells(item)}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
