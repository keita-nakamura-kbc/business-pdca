import type { BuData, CostRatioRow } from '../types/index';

// BU別ヒートマップデータ（累月）
export const buHeatmapData: BuData[] = [
  {
    buName: '量販',
    sales: { actual: 892.5, plan: 925.3, diff: -32.8, ratio: 96.5, prevYear: 865.0 },
    volume: { actual: 64497, plan: 66800, diff: -2303, ratio: 96.6 },
    variableCostRatio: { actual: 72.4, plan: 71.0, diff: 1.4 },
    marginalProfit: { actual: 246.1, plan: 265.0, diff: -18.9, ratio: 92.9 },
    directProfit: { actual: 68.2, plan: 76.5, diff: -8.3, ratio: 89.2 },
    directProfitRate: { actual: 7.6, plan: 8.3, diff: -0.7 },
  },
  {
    buName: 'CVS',
    sales: { actual: 412.3, plan: 420.5, diff: -8.2, ratio: 98.1, prevYear: 400.0 },
    volume: { actual: 31767, plan: 32500, diff: -733, ratio: 97.7 },
    variableCostRatio: { actual: 69.5, plan: 69.0, diff: 0.5 },
    marginalProfit: { actual: 125.8, plan: 127.9, diff: -2.1, ratio: 98.4 },
    directProfit: { actual: 52.4, plan: 50.6, diff: 1.8, ratio: 103.6 },
    directProfitRate: { actual: 12.7, plan: 12.0, diff: 0.7 },
  },
  {
    buName: 'EC',
    sales: { actual: 156.2, plan: 153.8, diff: 2.4, ratio: 101.6, prevYear: 135.0 },
    volume: { actual: 10315, plan: 10100, diff: 215, ratio: 102.1 },
    variableCostRatio: { actual: 68.9, plan: 69.5, diff: -0.6 },
    marginalProfit: { actual: 48.5, plan: 47.3, diff: 1.2, ratio: 102.5 },
    directProfit: { actual: 22.1, plan: 21.3, diff: 0.8, ratio: 103.8 },
    directProfitRate: { actual: 14.2, plan: 13.9, diff: 0.3 },
  },
  {
    buName: '一般',
    sales: { actual: 188.3, plan: 193.5, diff: -5.2, ratio: 97.3, prevYear: 185.0 },
    volume: { actual: 10390, plan: 10800, diff: -410, ratio: 96.2 },
    variableCostRatio: { actual: 69.8, plan: 69.2, diff: 0.6 },
    marginalProfit: { actual: 56.8, plan: 58.0, diff: -1.2, ratio: 97.9 },
    directProfit: { actual: 18.2, plan: 17.7, diff: 0.5, ratio: 102.8 },
    directProfitRate: { actual: 9.7, plan: 9.2, diff: 0.5 },
  },
  {
    buName: '手売り他',
    sales: { actual: 120.0, plan: 124.8, diff: -4.8, ratio: 96.2, prevYear: 118.0 },
    volume: { actual: 7276, plan: 7600, diff: -324, ratio: 95.7 },
    variableCostRatio: { actual: 69.5, plan: 69.0, diff: 0.5 },
    marginalProfit: { actual: 36.6, plan: 37.3, diff: -0.7, ratio: 98.1 },
    directProfit: { actual: 12.8, plan: 12.6, diff: 0.2, ratio: 101.6 },
    directProfitRate: { actual: 10.7, plan: 10.1, diff: 0.6 },
  },
  {
    buName: '自販機',
    sales: { actual: 298.6, plan: 311.1, diff: -12.5, ratio: 96.0, prevYear: 290.0 },
    volume: { actual: 34125, plan: 35500, diff: -1375, ratio: 96.1 },
    variableCostRatio: { actual: 67.1, plan: 66.5, diff: 0.6 },
    marginalProfit: { actual: 98.2, plan: 102.0, diff: -3.8, ratio: 96.3 },
    directProfit: { actual: 38.5, plan: 40.6, diff: -2.1, ratio: 94.8 },
    directProfitRate: { actual: 12.9, plan: 13.1, diff: -0.2 },
  },
];

// BU別ヒートマップデータ（単月）
// 単月売上合計 184.2億（consolidatedPlMonthlyVsPlan整合）
// 6BUの構成比は累月と同比率で按分
export const buHeatmapDataMonthly: BuData[] = [
  {
    buName: '量販',
    sales: { actual: 78.6, plan: 81.4, diff: -2.8, ratio: 96.6, prevYear: 76.0 },
    volume: { actual: 5680, plan: 5880, diff: -200, ratio: 96.6 },
    variableCostRatio: { actual: 73.0, plan: 71.5, diff: 1.5 },
    marginalProfit: { actual: 21.2, plan: 23.2, diff: -2.0, ratio: 91.4 },
    directProfit: { actual: 5.8, plan: 6.7, diff: -0.9, ratio: 86.6 },
    directProfitRate: { actual: 7.4, plan: 8.2, diff: -0.8 },
  },
  {
    buName: 'CVS',
    sales: { actual: 36.3, plan: 37.0, diff: -0.7, ratio: 98.1, prevYear: 35.2 },
    volume: { actual: 2797, plan: 2860, diff: -63, ratio: 97.8 },
    variableCostRatio: { actual: 70.0, plan: 69.5, diff: 0.5 },
    marginalProfit: { actual: 10.9, plan: 11.3, diff: -0.4, ratio: 96.5 },
    directProfit: { actual: 4.6, plan: 4.4, diff: 0.2, ratio: 104.5 },
    directProfitRate: { actual: 12.7, plan: 11.9, diff: 0.8 },
  },
  {
    buName: 'EC',
    sales: { actual: 13.7, plan: 13.5, diff: 0.2, ratio: 101.5, prevYear: 11.9 },
    volume: { actual: 908, plan: 889, diff: 19, ratio: 102.1 },
    variableCostRatio: { actual: 69.2, plan: 70.0, diff: -0.8 },
    marginalProfit: { actual: 4.2, plan: 4.1, diff: 0.1, ratio: 102.4 },
    directProfit: { actual: 1.9, plan: 1.9, diff: 0.0, ratio: 100.0 },
    directProfitRate: { actual: 13.9, plan: 14.1, diff: -0.2 },
  },
  {
    buName: '一般',
    sales: { actual: 16.6, plan: 17.0, diff: -0.4, ratio: 97.6, prevYear: 16.2 },
    volume: { actual: 915, plan: 950, diff: -35, ratio: 96.3 },
    variableCostRatio: { actual: 70.2, plan: 69.5, diff: 0.7 },
    marginalProfit: { actual: 5.0, plan: 5.2, diff: -0.2, ratio: 96.2 },
    directProfit: { actual: 1.6, plan: 1.6, diff: 0.0, ratio: 100.0 },
    directProfitRate: { actual: 9.6, plan: 9.4, diff: 0.2 },
  },
  {
    buName: '手売り他',
    sales: { actual: 10.6, plan: 11.0, diff: -0.4, ratio: 96.4, prevYear: 10.4 },
    volume: { actual: 641, plan: 669, diff: -28, ratio: 95.8 },
    variableCostRatio: { actual: 69.8, plan: 69.2, diff: 0.6 },
    marginalProfit: { actual: 3.2, plan: 3.3, diff: -0.1, ratio: 97.0 },
    directProfit: { actual: 1.1, plan: 1.1, diff: 0.0, ratio: 100.0 },
    directProfitRate: { actual: 10.4, plan: 10.0, diff: 0.4 },
  },
  {
    buName: '自販機',
    sales: { actual: 28.4, plan: 29.6, diff: -1.2, ratio: 95.9, prevYear: 27.5 },
    volume: { actual: 3904, plan: 3964, diff: -60, ratio: 98.5 },
    variableCostRatio: { actual: 67.5, plan: 67.0, diff: 0.5 },
    marginalProfit: { actual: 9.2, plan: 9.8, diff: -0.6, ratio: 93.9 },
    directProfit: { actual: 3.7, plan: 3.9, diff: -0.2, ratio: 94.9 },
    directProfitRate: { actual: 13.0, plan: 13.2, diff: -0.2 },
  },
];

// 変動費高比影響（単月 億円）
export const variableCostImpactMonthly: CostRatioRow[] = [
  { buName: '量販', costRatio: { actual: 72.4, plan: 71.0, diff: 1.4 }, impact: -5.6, details: '原材料費上昇' },
  { buName: 'NCVS生販', costRatio: { actual: 70.2, plan: 69.0, diff: 1.2 }, impact: -2.1, details: '容器コスト増' },
  { buName: 'DS量販', costRatio: { actual: 71.5, plan: 70.8, diff: 0.7 }, impact: -0.9, details: '販促費増' },
  { buName: 'BU構成', costRatio: { actual: 0, plan: 0, diff: 0 }, impact: -0.5, details: '構成比変化' },
  { buName: '手売り他', costRatio: { actual: 69.5, plan: 69.0, diff: 0.5 }, impact: 0.4, details: '効率改善' },
  { buName: 'EC', costRatio: { actual: 68.9, plan: 69.5, diff: -0.6 }, impact: -0.3, details: '配送コスト増' },
  { buName: '一般', costRatio: { actual: 69.8, plan: 69.2, diff: 0.6 }, impact: -0.3, details: '原材料費' },
  { buName: '自販機', costRatio: { actual: 67.1, plan: 66.5, diff: 0.6 }, impact: 0.3, details: '単価改善' },
];

// 変動費高比影響 単月合計
export const variableCostImpactMonthlyTotal = -6.6;

// 変動費高比影響（累月 億円）
export const variableCostImpactCumulative: CostRatioRow[] = [
  { buName: '量販', costRatio: { actual: 72.4, plan: 71.0, diff: 1.4 }, impact: -21.1, details: '原材料費上昇' },
  { buName: 'NCVS生販', costRatio: { actual: 70.2, plan: 69.0, diff: 1.2 }, impact: -6.4, details: '容器コスト増' },
  { buName: 'EC', costRatio: { actual: 68.9, plan: 69.5, diff: -0.6 }, impact: -3.3, details: '配送コスト増' },
  { buName: '一般', costRatio: { actual: 69.8, plan: 69.2, diff: 0.6 }, impact: -1.6, details: '原材料費' },
  { buName: 'BU構成', costRatio: { actual: 0, plan: 0, diff: 0 }, impact: 6.9, details: '構成比改善' },
  { buName: '手売り他', costRatio: { actual: 69.5, plan: 69.0, diff: 0.5 }, impact: 0.7, details: '効率改善' },
  { buName: 'DS量販', costRatio: { actual: 71.5, plan: 70.8, diff: 0.7 }, impact: -0.4, details: '販促費' },
  { buName: '自販機', costRatio: { actual: 67.1, plan: 66.5, diff: 0.6 }, impact: 0.1, details: '単価改善' },
];

// 変動費高比影響 累月合計
export const variableCostImpactCumulativeTotal = -21.6;
