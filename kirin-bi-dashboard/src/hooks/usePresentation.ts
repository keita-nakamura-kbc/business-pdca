import { useState, useCallback } from 'react';
import type { PresentationStep } from '../types';

export const PRESENTATION_STEPS: PresentationStep[] = [
  { tab: 'trends',  period: 'cumulative', label: '連結業績サマリ',           focusArea: 'kpi-row' },
  { tab: 'trends',  period: 'cumulative', label: '事業利益増減要因',         focusArea: 'waterfall' },
  { tab: 'trends',  period: 'cumulative', label: '市場動向・BU/ブランド推移' },
  { tab: 'drivers', period: 'cumulative', label: 'BU別業績（累月）',         focusArea: 'bu-heatmap' },
  { tab: 'drivers', period: 'cumulative', label: 'ブランド別業績（累月）',   focusArea: 'brand-heatmap' },
  { tab: 'drivers', period: 'monthly',    label: 'BU別業績（当月）',         focusArea: 'bu-heatmap' },
  { tab: 'drivers', period: 'monthly',    label: 'ブランド別業績（当月）',   focusArea: 'brand-heatmap' },
  { tab: 'trends',  period: 'cumulative', label: 'まとめ・次月アクション' },
];

export function usePresentation() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const start = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  const exit = useCallback(() => {
    setIsActive(false);
  }, []);

  const goNext = useCallback(() => {
    setCurrentStep(s => Math.min(s + 1, PRESENTATION_STEPS.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentStep(s => Math.max(s - 1, 0));
  }, []);

  const goToStep = useCallback((idx: number) => {
    if (idx >= 0 && idx < PRESENTATION_STEPS.length) {
      setCurrentStep(idx);
    }
  }, []);

  return {
    isActive,
    currentStep,
    step: PRESENTATION_STEPS[currentStep],
    totalSteps: PRESENTATION_STEPS.length,
    start,
    exit,
    goNext,
    goPrev,
    goToStep,
  };
}
