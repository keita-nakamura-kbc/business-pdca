import { useState } from 'react';
import type { SlicerState } from '../types';

export function useSlicer() {
  const [slicer, setSlicer] = useState<SlicerState>({
    period: 'monthly',
    selectedMonth: 11,
  });

  const togglePeriod = () =>
    setSlicer(s => ({ ...s, period: s.period === 'monthly' ? 'cumulative' : 'monthly' }));

  const setSelectedMonth = (month: number) =>
    setSlicer(s => ({ ...s, selectedMonth: month }));

  return { slicer, togglePeriod, setSelectedMonth };
}
