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
import type { BrandMonthlyPoint } from '../../data/brandTrendData';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { StatusIcon } from '../common/StatusIcon';
import styles from './BrandTrendChart.module.css';

interface BrandTrendChartProps {
  data: BrandMonthlyPoint[];
  height?: number | `${number}%`;
  selectedMonth?: number;
}

const BRANDS = [
  { key: 'plasma', targetKey: 'plasmaTarget', prevKey: 'plasmaPrev', name: 'プラズマ乳酸菌', color: '#7B1FA2' },
  { key: 'gogo', targetKey: 'gogoTarget', prevKey: 'gogoPrev', name: '午後の紅茶', color: '#DC0000' },
  { key: 'namacha', targetKey: 'namachaTarget', prevKey: 'namachaPrev', name: '生茶', color: '#2E7D32' },
] as const;

const SHOW_MONTHS = new Set(['1月', '4月', '7月', '10月']);

const BG_TINT: Record<string, string> = {
  achieved: 'rgba(76, 175, 80, 0.06)',
  warning:  'rgba(255, 152, 0, 0.06)',
  missed:   'rgba(244, 67, 54, 0.06)',
  none:     'transparent',
};

interface MiniPoint {
  month: string;
  actual: number;
  target: number;
  prevYear: number;
}

function extractSeries(
  data: BrandMonthlyPoint[],
  key: keyof BrandMonthlyPoint,
  targetKey: keyof BrandMonthlyPoint,
  prevKey: keyof BrandMonthlyPoint,
): MiniPoint[] {
  return data.map(d => ({
    month: d.month,
    actual: d[key] as number,
    target: d[targetKey] as number,
    prevYear: d[prevKey] as number,
  }));
}

function calcRatios(series: MiniPoint[]) {
  const sumActual = series.reduce((s, p) => s + p.actual, 0);
  const sumTarget = series.reduce((s, p) => s + p.target, 0);
  const sumPrev = series.reduce((s, p) => s + p.prevYear, 0);
  return {
    planRatio: sumTarget > 0 ? Math.round(sumActual / sumTarget * 100) : 0,
    yoyRatio: sumPrev > 0 ? Math.round(sumActual / sumPrev * 100) : 0,
  };
}

function Badge({ label, ratio }: { label: string; ratio: number }) {
  const level = useConditionalFormat(ratio);
  return (
    <div className={styles.badge}>
      <StatusIcon level={level} size={6} />
      <span className={`cf-${level}`}>{label} {ratio}%</span>
    </div>
  );
}

function getAchievementColor(actual: number, target: number): string {
  if (!target || target === 0) return 'var(--color-text-secondary)';
  const ratio = (actual / target) * 100;
  if (ratio >= 100) return 'var(--color-achieved)';
  if (ratio >= 95) return 'var(--color-warning)';
  return 'var(--color-missed)';
}

function AchievementDot(props: Record<string, unknown>) {
  const { cx, cy, payload } = props as {
    cx: number; cy: number; payload: MiniPoint;
  };
  if (cx == null || cy == null || !payload) return null;
  const fill = getAchievementColor(payload.actual, payload.target);
  return <circle cx={cx} cy={cy} r={3} fill={fill} stroke={fill} strokeWidth={1} />;
}

export function BrandTrendChart({ data, selectedMonth }: BrandTrendChartProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendLine} />実績
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDash} />計画
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} />前年
        </span>
      </div>

      <div className={styles.chartGrid}>
        {BRANDS.map((brand, idx) => {
          const series = extractSeries(data, brand.key, brand.targetKey, brand.prevKey);
          const { planRatio, yoyRatio } = calcRatios(series);
          const level = planRatio >= 100 ? 'achieved' : planRatio >= 95 ? 'warning' : 'missed';
          return (
            <div
              key={brand.key}
              className={styles.miniChart}
              style={{ backgroundColor: BG_TINT[level], borderRadius: 4 }}
            >
              <div className={styles.miniTitle}>
                <span className={styles.colorDot} style={{ backgroundColor: brand.color }} />
                {brand.name}
              </div>
              <div className={styles.badgeRow}>
                <Badge label="計画比" ratio={planRatio} />
                <Badge label="前年比" ratio={yoyRatio} />
              </div>
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={series}
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
                        width={32}
                        tickFormatter={(v: number) => String(v)}
                      />
                    ) : (
                      <YAxis hide width={0} />
                    )}
                    <Tooltip
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(value: any, name: any) => {
                        const label = name === 'actual' ? '実績' : name === 'target' ? '計画' : '前年';
                        return [`${Number(value).toFixed(1)} 億円`, label];
                      }}
                      contentStyle={{
                        fontSize: 11,
                        borderRadius: 6,
                        border: '1px solid var(--color-border)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="actual"
                      stroke={brand.color}
                      strokeWidth={2}
                      dot={<AchievementDot />}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      name="target"
                      stroke={brand.color}
                      strokeWidth={1}
                      strokeDasharray="4 3"
                      strokeOpacity={0.35}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="prevYear"
                      name="prevYear"
                      stroke="#999"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                      strokeOpacity={0.5}
                      dot={false}
                    />
                    {selectedMonth != null && (
                      <ReferenceLine
                        x={`${selectedMonth}月`}
                        stroke="var(--color-accent)"
                        strokeWidth={2}
                        strokeOpacity={0.5}
                      />
                    )}
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
