import type { ConditionalFormatLevel } from '../types';

export function useConditionalFormat(ratio: number | undefined): ConditionalFormatLevel {
  if (ratio === undefined || ratio === null || isNaN(ratio)) return 'none';
  if (ratio >= 100) return 'achieved';
  if (ratio >= 95) return 'warning';
  return 'missed';
}
