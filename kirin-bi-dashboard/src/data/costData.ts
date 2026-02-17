import type { CostRatioRow } from '../types/index';

// Re-export from buData for convenience (cost data is closely tied to BU analysis)
export {
  variableCostImpactMonthly,
  variableCostImpactMonthlyTotal,
  variableCostImpactCumulative,
  variableCostImpactCumulativeTotal,
} from './buData';

// BU別変動費高比詳細（累月）
export const buVariableCostDetails: CostRatioRow[] = [
  { buName: '量販', costRatio: { actual: 72.4, plan: 71.0, diff: 1.4 }, impact: -21.1, details: '原材料費上昇が主因。容器・包材コストも増加傾向' },
  { buName: 'CVS', costRatio: { actual: 69.5, plan: 69.0, diff: 0.5 }, impact: -2.1, details: 'チルド製品比率増による変動費増' },
  { buName: 'EC', costRatio: { actual: 68.9, plan: 69.5, diff: -0.6 }, impact: -3.3, details: '配送コスト増加が影響' },
  { buName: '一般', costRatio: { actual: 69.8, plan: 69.2, diff: 0.6 }, impact: -1.6, details: '原材料費影響' },
  { buName: '手売り他', costRatio: { actual: 69.5, plan: 69.0, diff: 0.5 }, impact: 0.7, details: 'オペレーション効率化' },
  { buName: '自販機', costRatio: { actual: 67.1, plan: 66.5, diff: 0.6 }, impact: 0.1, details: '高単価製品へのシフト' },
];

// 単価差異分析データ（BU別）
export interface PriceVarianceData {
  buName: string;
  unitPrice: { actual: number; plan: number; diff: number };
  volumeImpact: number;
  priceImpact: number;
  mixImpact: number;
}

export const priceVarianceDataMonthly: PriceVarianceData[] = [
  { buName: '量販', unitPrice: { actual: 1384, plan: 1385, diff: -1 }, volumeImpact: -45.2, priceImpact: -0.6, mixImpact: 2.1 },
  { buName: 'CVS', unitPrice: { actual: 2083, plan: 2035, diff: 48 }, volumeImpact: -15.3, priceImpact: 15.2, mixImpact: 3.8 },
  { buName: '自販機', unitPrice: { actual: 1786, plan: 1765, diff: 21 }, volumeImpact: -22.3, priceImpact: 7.2, mixImpact: -1.5 },
  { buName: 'EC', unitPrice: { actual: 1379, plan: 1523, diff: -144 }, volumeImpact: 3.3, priceImpact: -14.9, mixImpact: 0.5 },
  { buName: '一般', unitPrice: { actual: 2438, plan: 2421, diff: 17 }, volumeImpact: -12.7, priceImpact: 1.8, mixImpact: 0.8 },
];

export const priceVarianceDataCumulative: PriceVarianceData[] = [
  { buName: '量販', unitPrice: { actual: 1384, plan: 1385, diff: -1 }, volumeImpact: -453.2, priceImpact: -6.5, mixImpact: 21.1 },
  { buName: 'CVS', unitPrice: { actual: 2083, plan: 2035, diff: 48 }, volumeImpact: -153.0, priceImpact: 152.3, mixImpact: 38.2 },
  { buName: '自販機', unitPrice: { actual: 1786, plan: 1765, diff: 21 }, volumeImpact: -245.6, priceImpact: 71.6, mixImpact: -14.5 },
  { buName: 'EC', unitPrice: { actual: 1379, plan: 1523, diff: -144 }, volumeImpact: 30.5, priceImpact: -148.5, mixImpact: 5.2 },
  { buName: '一般', unitPrice: { actual: 2438, plan: 2421, diff: 17 }, volumeImpact: -127.0, priceImpact: 17.7, mixImpact: 8.4 },
];
