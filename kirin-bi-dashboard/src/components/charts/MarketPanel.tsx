import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import type { SlicerState } from '../../types';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { SectionHeader } from '../common/SectionHeader';
import { StatusIcon } from '../common/StatusIcon';
import {
  marketMultiYearMonthly,
  marketMultiYearCumulative,
} from '../../data';
import type { MarketMultiYearPoint } from '../../data/appendixData';
import styles from './MarketPanel.module.css';

interface MarketPanelProps {
  slicer: SlicerState;
  selectedMonth?: number;
}

const COMPANIES = [
  { key: 'kbc'   as const, name: 'KBC',  color: '#B8860B', strokeWidth: 2.5 },
  { key: 'ccjc'  as const, name: 'CCJC', color: '#F40009', strokeWidth: 2 },
  { key: 'su'    as const, name: 'SU',    color: '#003DA5', strokeWidth: 2 },
  { key: 'asahi' as const, name: 'A',     color: '#005BAC', strokeWidth: 2 },
  { key: 'ito'   as const, name: 'I',     color: '#009944', strokeWidth: 2 },
];

// Show year label at January, quarter labels at 4/7/10, hide others
function tickFormatter(label: string): string {
  const parts = label.split('/');
  if (parts.length !== 2) return '';
  const month = parseInt(parts[1], 10);
  if (month === 1) return `'${parts[0]}`;
  if (month === 4 || month === 7 || month === 10) return `${month}月`;
  return '';
}

// Year boundary labels for ReferenceLine
const YEAR_BOUNDARIES = ['24/01', '25/01'];

function calcYoyRatio(data: MarketMultiYearPoint[], companyKey: keyof MarketMultiYearPoint): number {
  // Compare FY2025 available months vs same months in FY2024
  const fy25 = data.filter(p => p.year === 2025);
  const fy24 = data.filter(p => p.year === 2024);
  if (fy25.length === 0 || fy24.length === 0) return 0;
  const maxMonth = Math.max(...fy25.map(p => p.month));
  const sum25 = fy25.reduce((s, p) => s + (p[companyKey] as number), 0);
  const sum24 = fy24.filter(p => p.month <= maxMonth).reduce((s, p) => s + (p[companyKey] as number), 0);
  return sum24 > 0 ? Math.round(sum25 / sum24 * 100) : 0;
}

function YoyBadge({ name, color, ratio }: { name: string; color: string; ratio: number }) {
  const level = useConditionalFormat(ratio);
  return (
    <div className={styles.yoyBadge}>
      <span className={styles.colorDot} style={{ backgroundColor: color }} />
      <span>{name}</span>
      <StatusIcon level={level} size={5} />
      <span className={`cf-${level}`}>{ratio}%</span>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className={styles.tooltipBox}>
      <div className={styles.tooltipLabel}>{label}</div>
      {payload.map((entry: { name: string; value: number; color: string }) => (
        <div key={entry.name} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ backgroundColor: entry.color }} />
          <span className={styles.tooltipName}>{entry.name}</span>
          <span className={styles.tooltipValue}>{Number(entry.value).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export function MarketPanel({ slicer, selectedMonth }: MarketPanelProps) {
  const isMonthly = slicer.period === 'monthly';
  const data = isMonthly ? marketMultiYearMonthly : marketMultiYearCumulative;

  return (
    <div className={styles.panel}>
      <SectionHeader icon={TrendingUp} title="清涼飲料市場" subtitle="3ヵ年推移" pageRef="30" />

      <div className={styles.legend}>
        {COMPANIES.map(co => (
          <span key={co.key} className={styles.legendItem}>
            <span
              className={styles.legendLine}
              style={{ borderTop: `${co.strokeWidth}px solid ${co.color}` }}
            />
            {co.name}
          </span>
        ))}
      </div>

      <div className={styles.badgeRow}>
        {COMPANIES.map(co => (
          <YoyBadge
            key={co.key}
            name={co.name}
            color={co.color}
            ratio={calcYoyRatio(isMonthly ? marketMultiYearMonthly : marketMultiYearMonthly, co.key)}
          />
        ))}
      </div>

      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeOpacity={0.5} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 9 }}
              tickLine={false}
              axisLine={{ stroke: 'var(--color-border)' }}
              tickFormatter={tickFormatter}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 9 }}
              tickLine={false}
              axisLine={false}
              width={36}
              tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
            />
            <Tooltip content={<CustomTooltip />} />
            {YEAR_BOUNDARIES.map(b => (
              <ReferenceLine
                key={b}
                x={b}
                stroke="var(--color-text-secondary)"
                strokeDasharray="3 3"
                strokeOpacity={0.6}
              />
            ))}
            {selectedMonth != null && (
              <ReferenceLine
                x={`25/${String(selectedMonth).padStart(2, '0')}`}
                stroke="var(--color-accent)"
                strokeWidth={2}
                strokeOpacity={0.5}
              />
            )}
            {COMPANIES.map(co => (
              <Line
                key={co.key}
                type="monotone"
                dataKey={co.key}
                name={co.name}
                stroke={co.color}
                strokeWidth={co.strokeWidth}
                dot={false}
                activeDot={{ r: 3 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
