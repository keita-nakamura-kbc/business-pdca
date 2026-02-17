import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { SlicerState } from '../../types';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { SectionHeader } from '../common/SectionHeader';
import { StatusIcon } from '../common/StatusIcon';
import {
  marketByCompanyMonthly,
  marketByCompanyCumulative,
} from '../../data';
import type { MarketTrendWithPrevPoint } from '../../data/appendixData';
import styles from './MarketPanel.module.css';

interface MarketPanelProps {
  slicer: SlicerState;
}

const LINES = [
  { key: 'ccjc',  name: 'CCJC', color: '#F40009' },
  { key: 'su',    name: 'SU',   color: '#003DA5' },
  { key: 'asahi', name: 'A',    color: '#005BAC' },
  { key: 'ito',   name: 'I',    color: '#009944' },
  { key: 'kbc',   name: 'KBC',  color: '#B8860B' },
] as const;

const SHOW_MONTHS = new Set(['1月', '4月', '7月', '10月']);

const BG_TINT: Record<string, string> = {
  achieved: 'rgba(76, 175, 80, 0.06)',
  warning:  'rgba(255, 152, 0, 0.06)',
  missed:   'rgba(244, 67, 54, 0.06)',
  none:     'transparent',
};

function calcYoyRatio(data: MarketTrendWithPrevPoint[]): number {
  const sumCur = data.reduce((s, p) => s + p.current, 0);
  const sumPrev = data.reduce((s, p) => s + p.prevYear, 0);
  return sumPrev > 0 ? Math.round(sumCur / sumPrev * 100) : 0;
}

function YoyBadge({ ratio }: { ratio: number }) {
  const level = useConditionalFormat(ratio);
  return (
    <div className={styles.yoyBadge}>
      <StatusIcon level={level} size={6} />
      <span className={`cf-${level}`}>前年比 {ratio}%</span>
    </div>
  );
}

export function MarketPanel({ slicer }: MarketPanelProps) {
  const isMonthly = slicer.period === 'monthly';
  const dataset = isMonthly ? marketByCompanyMonthly : marketByCompanyCumulative;

  return (
    <div className={styles.panel}>
      <SectionHeader icon={TrendingUp} title="清涼飲料市場" pageRef="30" />

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendLine} />当年実績
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDash} />前年実績
        </span>
      </div>

      <div className={styles.chartGrid}>
        {LINES.map((line, idx) => {
          const companyData = dataset[line.key];
          const ratio = calcYoyRatio(companyData);
          const level = ratio >= 100 ? 'achieved' : ratio >= 95 ? 'warning' : 'missed';
          return (
          <div key={line.key} className={styles.miniChart} style={{ backgroundColor: BG_TINT[level], borderRadius: 4 }}>
            <div className={styles.miniTitle}>
              <span className={styles.colorDot} style={{ backgroundColor: line.color }} />
              {line.name}
            </div>
            <YoyBadge ratio={ratio} />
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dataset[line.key]}
                  margin={{ top: 4, right: 4, bottom: 0, left: idx === 0 ? 0 : -8 }}
                >
                  <CartesianGrid vertical={false} stroke="var(--color-border)" strokeOpacity={0.5} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9 }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--color-border)' }}
                    tickFormatter={(v: string) => SHOW_MONTHS.has(v) ? v : ''}
                  />
                  {idx === 0 ? (
                    <YAxis
                      tick={{ fontSize: 9 }}
                      tickLine={false}
                      axisLine={false}
                      width={36}
                      tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                    />
                  ) : (
                    <YAxis hide width={0} />
                  )}
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any, name: any) => [`${Number(value).toLocaleString()} 万箱`, name]}
                    contentStyle={{
                      fontSize: 11,
                      borderRadius: 6,
                      border: '1px solid var(--color-border)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    name="当年"
                    stroke={line.color}
                    strokeWidth={line.key === 'kbc' ? 2.5 : 2}
                    dot={false}
                    activeDot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="prevYear"
                    name="前年"
                    stroke={line.color}
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                    strokeOpacity={0.5}
                    dot={false}
                    activeDot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
