import styles from './CustomTooltip.module.css';

interface PayloadEntry {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadEntry[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={styles.tooltip}>
      {label && <div className={styles.label}>{label}</div>}
      {payload.map((entry, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.dot} style={{ background: entry.color }} />
          <span className={styles.name}>{entry.name}</span>
          <span className={styles.value}>{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
