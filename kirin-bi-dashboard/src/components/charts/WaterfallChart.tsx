import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import type { WaterfallSegment } from '../../types';
import { CustomTooltip } from '../common/CustomTooltip';
import styles from './WaterfallChart.module.css';

interface WaterfallChartProps {
  data: WaterfallSegment[];
  height?: number;
  onSegmentClick?: (segment: WaterfallSegment) => void;
  targetValue?: number;
}

interface WaterfallBarData {
  name: string;
  invisible: number;
  positive: number;
  negative: number;
  rawValue: number;
  type: string;
}

function buildWaterfallData(segments: WaterfallSegment[]): WaterfallBarData[] {
  const result: WaterfallBarData[] = [];
  let running = 0;

  for (const seg of segments) {
    if (seg.type === 'start' || seg.type === 'total') {
      result.push({
        name: seg.name,
        invisible: 0,
        positive: seg.type === 'total' ? Math.max(seg.value, 0) : Math.max(seg.value, 0),
        negative: seg.type === 'total' ? Math.min(seg.value, 0) : Math.min(seg.value, 0),
        rawValue: seg.value,
        type: seg.type,
      });
      running = seg.value;
    } else {
      const base = seg.value >= 0 ? running : running + seg.value;
      result.push({
        name: seg.name,
        invisible: Math.max(base, 0),
        positive: seg.value >= 0 ? seg.value : 0,
        negative: seg.value < 0 ? seg.value : 0,
        rawValue: seg.value,
        type: seg.type,
      });
      running += seg.value;
    }
  }

  return result;
}

export function WaterfallChart({ data, height = 240, onSegmentClick, targetValue }: WaterfallChartProps) {
  const barData = buildWaterfallData(data);

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={barData}
          margin={{ top: 20, right: 20, bottom: 5, left: 20 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
            axisLine={{ stroke: 'var(--color-border)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {targetValue !== undefined && (
            <ReferenceLine
              y={targetValue}
              stroke="var(--color-warning)"
              strokeDasharray="5 5"
              label={{ value: `${targetValue}`, position: 'right', fontSize: 10, fill: 'var(--color-warning)' }}
            />
          )}
          <Bar dataKey="invisible" stackId="stack" fill="transparent" />
          <Bar
            dataKey="positive"
            stackId="stack"
            fill="var(--color-achieved)"
            radius={[2, 2, 0, 0]}
            onClick={(_, index) => onSegmentClick?.(data[index])}
            cursor={onSegmentClick ? 'pointer' : 'default'}
          >
            {barData.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.type === 'start' || entry.type === 'total' ? 'var(--color-primary)' : 'var(--color-achieved)'}
              />
            ))}
            <LabelList
              dataKey="rawValue"
              position="top"
              fontSize={9}
              fill="var(--color-text-secondary)"
              formatter={((value: unknown) => {
                const v = Number(value);
                if (v <= 0 || isNaN(v)) return '';
                return v.toFixed(1);
              }) as (label: unknown) => string}
            />
          </Bar>
          <Bar
            dataKey="negative"
            stackId="stack"
            fill="var(--color-missed)"
            radius={[0, 0, 2, 2]}
            onClick={(_, index) => onSegmentClick?.(data[index])}
            cursor={onSegmentClick ? 'pointer' : 'default'}
          >
            <LabelList
              dataKey="rawValue"
              position="bottom"
              fontSize={9}
              fill="var(--color-text-negative)"
              formatter={((value: unknown) => {
                const v = Number(value);
                if (v >= 0 || isNaN(v)) return '';
                return `\u25B3${Math.abs(v).toFixed(1)}`;
              }) as (label: unknown) => string}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
