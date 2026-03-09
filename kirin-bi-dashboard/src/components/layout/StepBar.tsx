import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './StepBar.module.css';

interface StepBarProps {
  currentStep: number;
  totalSteps: number;
  label: string;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (idx: number) => void;
  onExit: () => void;
}

export function StepBar({ currentStep, totalSteps, label, onPrev, onNext, onGoTo, onExit }: StepBarProps) {
  return (
    <div className={styles.bar}>
      <button className={styles.navBtn} onClick={onPrev} disabled={currentStep === 0}>
        <ChevronLeft size={16} />
      </button>

      <div className={styles.dots}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === currentStep ? styles.dotActive : ''}`}
            onClick={() => onGoTo(i)}
            aria-label={`ステップ ${i + 1}`}
          />
        ))}
      </div>

      <button className={styles.navBtn} onClick={onNext} disabled={currentStep === totalSteps - 1}>
        <ChevronRight size={16} />
      </button>

      <span className={styles.label}>
        {currentStep + 1}/{totalSteps}  {label}
      </span>

      <button className={styles.exitBtn} onClick={onExit}>
        <X size={14} />
        終了
      </button>
    </div>
  );
}
