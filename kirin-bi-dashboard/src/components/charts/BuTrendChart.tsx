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
import type { BuData } from '../../types';
import type { BuMonthlyPoint } from '../../data/buTrendData';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { StatusIcon } from '../common/StatusIcon';
import styles from './BuTrendChart.module.css';

interface BuTrendChartProps {
  data: BuMonthlyPoint[];
  height?: number | `${number}%`;
  buDetails?: BuData[];
  selectedMonth?: number;
}

const BUS = [
  { key: 'ryohan', targetKey: 'ryohanTarget', prevKey: 'ryohanPrev', name: '量販', buName: '量販BU', color: '#003DA5' },
  { key: 'cvs', targetKey: 'cvsTarget', prevKey: 'cvsPrev', name: 'CVS', buName: 'CVS BU', color: '#666666' },
  { key: 'jihan', targetKey: 'jihanTarget', prevKey: 'jihanPrev', name: '自販機', buName: '自販BU', color: '#AAAAAA' },
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
  data: BuMonthlyPoint[],
  key: keyof BuMonthlyPoint,
  targetKey: keyof BuMonthlyPoint,
  prevKey: keyof BuMonthlyPoint,
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

function BuTooltipContent({ bu }: { bu: BuData }) {
  const salesLevel = useConditionalFormat(bu.sales.ratio);
  const mpLevel = useConditionalFormat(bu.marginalProfit.ratio);
  const dpLevel = useConditionalFormat(bu.directProfit.ratio);
  return (
    <div className={styles.buTooltip}>
      <div className={styles.tooltipTitle}>{bu.buName}</div>
      <div className={styles.tooltipRow}>
        <span>売上高</span>
        <span><StatusIcon level={salesLevel} size={6} /> {bu.sales.actual.toFixed(1)}億円 ({bu.sales.ratio.toFixed(1)}%)</span>
      </div>
      <div className={styles.tooltipRow}>
        <span>限界利益</span>
        <span><StatusIcon level={mpLevel} size={6} /> {bu.marginalProfit.actual.toFixed(1)}億円 ({bu.marginalProfit.ratio.toFixed(1)}%)</span>
      </div>
      <div className={styles.tooltipRow}>
        <span>直接利益</span>
        <span><StatusIcon level={dpLevel} size={6} /> {bu.directProfit.actual.toFixed(1)}億円 ({bu.directProfit.ratio.toFixed(1)}%)</span>
      </div>
      <div className={styles.tooltipRow}>
        <span>変動費高比</span>
        <span>{bu.variableCostRatio.actual.toFixed(1)}%</span>
      </div>
      <div className={styles.tooltipRow}>
        <span>直接利益率</span>
        <span>{bu.directProfitRate.actual.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export function BuTrendChart({ data, buDetails, selectedMonth }: BuTrendChartProps) {
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
        {BUS.map((bu, idx) => {
          const series = extractSeries(data, bu.key, bu.targetKey, bu.prevKey);
          const { planRatio, yoyRatio } = calcRatios(series);
          const level = planRatio >= 100 ? 'achieved' : planRatio >= 95 ? 'warning' : 'missed';
          const buDetail = buDetails?.find(b => b.buName === bu.buName);
          return (
            <div
              key={bu.key}
              className={`${styles.miniChart} ${buDetail ? styles.tooltipTrigger : ''}`}
              style={{ backgroundColor: BG_TINT[level], borderRadius: 4 }}
            >
              <div className={styles.miniTitle}>
                <span className={styles.colorDot} style={{ backgroundColor: bu.color }} />
                {bu.name}
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
                      stroke={bu.color}
                      strokeWidth={2}
                      dot={<AchievementDot />}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      name="target"
                      stroke={bu.color}
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
              {buDetail && <BuTooltipContent bu={buDetail} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
