import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import { Sparkline } from './Sparkline';
import styles from './KpiCard.module.css';

interface KpiCardProps {
  label: string;
  value: number | string;
  unit: string;
  target?: number;
  ratio?: number;
  trend?: 'up' | 'down' | 'flat';
  sparkline?: number[];
  onClick?: () => void;
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

const sparklineColors: Record<string, string> = {
  achieved: 'var(--color-achieved)',
  missed: 'var(--color-missed)',
  warning: 'var(--color-warning)',
  none: 'var(--color-primary)',
};

export function KpiCard({ label, value, unit, ratio, trend, sparkline, onClick }: KpiCardProps) {
  const level = useConditionalFormat(ratio);

  const signalClass =
    level === 'achieved'
      ? styles.signalGreen
      : level === 'warning'
        ? styles.signalYellow
        : level === 'missed'
          ? styles.signalRed
          : '';

  const TrendIcon = trend ? trendIcons[trend] : null;

  return (
    <div
      className={`${styles.card} ${signalClass} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      aria-label={onClick ? `${label} の詳細を表示` : undefined}
    >
      <div className={styles.label}>
        {label}
        {onClick && <ChevronRight size={10} className={styles.drillIcon} />}
      </div>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}>{unit}</span>
      </div>
      <div className={styles.footer}>
        {ratio !== undefined && (
          <span className={`${styles.ratio} ${styles[level]}`}>
            {ratio.toFixed(1)}%
          </span>
        )}
        {TrendIcon && (
          <span className={`${styles.trend} ${styles[`trend${trend!.charAt(0).toUpperCase() + trend!.slice(1)}`]}`}>
            <TrendIcon size={12} />
          </span>
        )}
        {sparkline && sparkline.length > 1 && (
          <span className={styles.sparkline}>
            <Sparkline data={sparkline} width={60} height={20} color={sparklineColors[level]} />
          </span>
        )}
      </div>
    </div>
  );
}
