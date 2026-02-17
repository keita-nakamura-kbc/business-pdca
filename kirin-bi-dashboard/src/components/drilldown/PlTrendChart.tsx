import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { CustomTooltip } from '../common/CustomTooltip';
import styles from './DrilldownContent.module.css';

const MONTHS = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月'];

interface PlTrendChartProps {
  trendData: number[];
  subtitle?: string;
}

export function PlTrendChart({ trendData, subtitle }: PlTrendChartProps) {
  const chartData = MONTHS.map((m, i) => ({ month: m, value: trendData[i] }));

  return (
    <div className={styles.section}>
      <SectionHeader icon={TrendingUp} title="月次推移" subtitle={subtitle} />
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 0, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 9, fill: 'var(--color-text-secondary)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: 'var(--color-text-secondary)' }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-primary)"
              strokeWidth={1.5}
              dot={{ r: 2, fill: 'var(--color-primary)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
