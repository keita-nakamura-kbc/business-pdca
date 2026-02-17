import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Store, RotateCw, DollarSign } from 'lucide-react';
import type { BrandMarketMetric } from '../../data/brandData';
import { SectionHeader } from '../common/SectionHeader';
import { CustomTooltip } from '../common/CustomTooltip';

interface BrandMarketChartsProps {
  metrics: BrandMarketMetric[];
  brandName: string;
}

function MiniChart({
  data,
  dataKey,
  title,
  icon,
  unit,
  domain,
}: {
  data: BrandMarketMetric[];
  dataKey: keyof BrandMarketMetric;
  title: string;
  icon: typeof Store;
  unit: string;
  domain: [number, number];
}) {
  return (
    <div style={{ marginBottom: 4 }}>
      <SectionHeader icon={icon} title={title} subtitle={unit} />
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 8, fill: 'var(--color-text-secondary)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={domain}
            tick={{ fontSize: 8, fill: 'var(--color-text-secondary)' }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="var(--color-primary)"
            strokeWidth={1.5}
            dot={{ r: 2, fill: 'var(--color-primary)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BrandMarketCharts({ metrics, brandName }: BrandMarketChartsProps) {
  // Determine Y-axis ranges based on brand (per CLAUDE.md specs)
  const isPlasma = brandName.includes('プラズマ');
  const isGogo = brandName.includes('午後');

  const distDomain: [number, number] = isGogo ? [75, 105] : [0, 100];
  const turnoverDomain: [number, number] = isPlasma ? [90, 150] : isGogo ? [0, 60] : [0, 250];
  const priceDomain: [number, number] = isPlasma ? [0, 40] : [0, 100];

  return (
    <div>
      <MiniChart
        data={metrics}
        dataKey="distributionRate"
        title="販売店率"
        icon={Store}
        unit="%"
        domain={distDomain}
      />
      <MiniChart
        data={metrics}
        dataKey="turnoverRate"
        title="回転数"
        icon={RotateCw}
        unit="本数"
        domain={turnoverDomain}
      />
      <MiniChart
        data={metrics}
        dataKey="avgSellingPrice"
        title="平均販売単価"
        icon={DollarSign}
        unit="円/本"
        domain={priceDomain}
      />
    </div>
  );
}
