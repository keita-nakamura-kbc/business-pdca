import type { SlicerState } from '../../types';
import styles from './SlicerBar.module.css';

interface SlicerBarProps {
  slicer: SlicerState;
  onTogglePeriod: () => void;
}

export function SlicerBar({ slicer, onTogglePeriod }: SlicerBarProps) {
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
    </div>
  );
}
