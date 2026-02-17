import { useState } from 'react';
import type { SlicerState } from '../types';

export function useSlicer() {
  const [slicer, setSlicer] = useState<SlicerState>({
    period: 'monthly',
  });

  const togglePeriod = () =>
    setSlicer(s => ({ ...s, period: s.period === 'monthly' ? 'cumulative' : 'monthly' }));

  return { slicer, togglePeriod };
}
