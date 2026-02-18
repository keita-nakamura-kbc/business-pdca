import type { SlicerState } from '../../types';
import styles from './SlicerBar.module.css';

interface SlicerBarProps {
  slicer: SlicerState;
  onTogglePeriod: () => void;
  onMonthChange: (month: number) => void;
}

export function SlicerBar({ slicer, onTogglePeriod, onMonthChange }: SlicerBarProps) {
  return (
    <div className={styles.slicerBar}>
      <div className={styles.group}>
        <span className={styles.groupLabel}>期間</span>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.btn} ${slicer.period === 'monthly' ? styles.active : ''}`}
            onClick={onTogglePeriod}
          >
            単月
          </button>
          <button
            className={`${styles.btn} ${slicer.period === 'cumulative' ? styles.active : ''}`}
            onClick={onTogglePeriod}
          >
            累月
          </button>
        </div>
      </div>
      <div className={styles.group}>
        <span className={styles.groupLabel}>対象月</span>
        <select
          className={styles.monthSelect}
          value={slicer.selectedMonth}
          onChange={e => onMonthChange(Number(e.target.value))}
        >
          {Array.from({ length: 11 }, (_, i) => i + 1).map(m => (
            <option key={m} value={m}>{m}月</option>
          ))}
        </select>
      </div>
    </div>
  );
}
