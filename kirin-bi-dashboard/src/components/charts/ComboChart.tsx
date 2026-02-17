import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import type { TrendDataPoint } from '../../types';
import { CustomTooltip } from '../common/CustomTooltip';
import styles from './ComboChart.module.css';

interface ComboChartProps {
  data: TrendDataPoint[];
  height?: number;
}

function getBarColor(actual: number, plan: number): string {
  if (!plan || plan === 0) return 'var(--color-primary)';
  const ratio = (actual / plan) * 100;
  if (ratio >= 100) return 'var(--color-achieved)';
  if (ratio >= 95) return 'var(--color-warning)';
  return 'var(--color-missed)';
}

export function ComboChart({ data, height = 260 }: ComboChartProps) {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 10, right: 40, bottom: 5, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
            axisLine={{ stroke: 'var(--color-border)' }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
            axisLine={false}
            tickLine={false}
            label={{ value: '億円', position: 'insideTopLeft', offset: -5, fontSize: 9, fill: 'var(--color-text-secondary)' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
            axisLine={false}
            tickLine={false}
            label={{ value: '億円(累計)', position: 'insideTopRight', offset: -5, fontSize: 9, fill: 'var(--color-text-secondary)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 10, paddingTop: 4 }}
            iconType="rect"
            iconSize={10}
          />
          <ReferenceLine
            yAxisId="right"
            y={200}
            stroke="var(--color-warning)"
            strokeDasharray="8 4"
            label={{ value: '目標200億', position: 'right', fontSize: 10, fill: 'var(--color-warning)' }}
          />
          <Bar
            yAxisId="left"
            dataKey="monthlyActual"
            name="単月実績"
            barSize={24}
            radius={[2, 2, 0, 0]}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={getBarColor(entry.monthlyActual, entry.monthlyPlan)} />
            ))}
          </Bar>
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cumActual"
            name="累月実績"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--color-primary)' }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cumPlan"
            name="累月計画"
            stroke="var(--color-text-secondary)"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
