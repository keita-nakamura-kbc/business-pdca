import { useState, useCallback } from 'react';
import type { DrilldownState, DrilldownType } from '../types';

const initialState: DrilldownState = {
  isOpen: false,
  type: null,
  title: '',
  data: {},
};

export function useDrilldown() {
  const [drilldown, setDrilldown] = useState<DrilldownState>(initialState);

  const open = useCallback(
    (type: DrilldownType, title: string, data: Record<string, unknown>) => {
      setDrilldown({ isOpen: true, type, title, data });
    },
    []
  );

  const close = useCallback(() => {
    setDrilldown(initialState);
  }, []);

  return { drilldown, open, close };
}
