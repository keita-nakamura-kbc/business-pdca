// ブランド別 5指標データ（BuDataと同構造）
// volume.actual は salesByBrand と整合
// marginalProfit / directProfit は推定値

export interface BrandMetricRow {
  brandName: string;
  volume: { actual: number; plan: number; diff: number; ratio: number };
  sales: { actual: number; plan: number; diff: number; ratio: number; prevYear?: number };
  marginalProfit: { actual: number; plan: number; diff: number; ratio: number };
  directProfit: { actual: number; plan: number; diff: number; ratio: number };
}

// 累月
export const brandMetricData: BrandMetricRow[] = [
  {
    brandName: '生茶',
    volume: { actual: 28450, plan: 29300, diff: -850, ratio: 97.1 },
    sales: { actual: 487.5, plan: 546.1, diff: -58.6, ratio: 89.3, prevYear: 496.0 },
    marginalProfit: { actual: 146.3, plan: 165.2, diff: -18.9, ratio: 88.6 },
    directProfit: { actual: 58.5, plan: 67.8, diff: -9.3, ratio: 86.3 },
  },
  {
    brandName: '午後の紅茶',
    volume: { actual: 25680, plan: 26204, diff: -524, ratio: 98.0 },
    sales: { actual: 1033.5, plan: 1033.5, diff: 0.0, ratio: 100.0, prevYear: 1060.0 },
    marginalProfit: { actual: 361.7, plan: 359.7, diff: 2.0, ratio: 100.6 },
    directProfit: { actual: 155.0, plan: 153.0, diff: 2.0, ratio: 101.3 },
  },
  {
    brandName: 'ファイア',
    volume: { actual: 18920, plan: 19505, diff: -585, ratio: 97.0 },
    sales: { actual: 355.0, plan: 367.9, diff: -12.9, ratio: 96.5 },
    marginalProfit: { actual: 99.4, plan: 104.6, diff: -5.2, ratio: 95.0 },
    directProfit: { actual: 35.5, plan: 38.3, diff: -2.8, ratio: 92.7 },
  },
  {
    brandName: '小岩井',
    volume: { actual: 8420, plan: 8655, diff: -235, ratio: 97.3 },
    sales: { actual: 148.0, plan: 152.6, diff: -4.6, ratio: 97.0 },
    marginalProfit: { actual: 47.4, plan: 49.1, diff: -1.7, ratio: 96.5 },
    directProfit: { actual: 17.8, plan: 18.7, diff: -0.9, ratio: 95.2 },
  },
  {
    brandName: 'iMUSE',
    volume: { actual: 6240, plan: 6500, diff: -260, ratio: 96.0 },
    sales: { actual: 245.0, plan: 256.3, diff: -11.3, ratio: 95.6, prevYear: 207.0 },
    marginalProfit: { actual: 98.0, plan: 103.4, diff: -5.4, ratio: 94.8 },
    directProfit: { actual: 44.1, plan: 47.2, diff: -3.1, ratio: 93.4 },
  },
  {
    brandName: 'その他',
    volume: { actual: 11025, plan: 10906, diff: 119, ratio: 101.1 },
    sales: { actual: 195.0, plan: 193.1, diff: 1.9, ratio: 101.0 },
    marginalProfit: { actual: 58.5, plan: 57.6, diff: 0.9, ratio: 101.6 },
    directProfit: { actual: 21.5, plan: 21.1, diff: 0.4, ratio: 101.9 },
  },
];

// 単月
export const brandMetricDataMonthly: BrandMetricRow[] = [
  {
    brandName: '生茶',
    volume: { actual: 2850, plan: 2984, diff: -134, ratio: 95.5 },
    sales: { actual: 44.0, plan: 50.3, diff: -6.3, ratio: 87.5, prevYear: 45.5 },
    marginalProfit: { actual: 13.2, plan: 15.2, diff: -2.0, ratio: 86.8 },
    directProfit: { actual: 5.3, plan: 6.3, diff: -1.0, ratio: 84.1 },
  },
  {
    brandName: '午後の紅茶',
    volume: { actual: 2540, plan: 2537, diff: 3, ratio: 100.1 },
    sales: { actual: 94.0, plan: 92.6, diff: 1.4, ratio: 101.5, prevYear: 92.2 },
    marginalProfit: { actual: 32.9, plan: 32.2, diff: 0.7, ratio: 102.2 },
    directProfit: { actual: 14.1, plan: 13.7, diff: 0.4, ratio: 102.9 },
  },
  {
    brandName: 'ファイア',
    volume: { actual: 1810, plan: 1876, diff: -66, ratio: 96.5 },
    sales: { actual: 32.0, plan: 33.7, diff: -1.7, ratio: 95.0 },
    marginalProfit: { actual: 9.0, plan: 9.6, diff: -0.6, ratio: 93.8 },
    directProfit: { actual: 3.2, plan: 3.5, diff: -0.3, ratio: 91.4 },
  },
  {
    brandName: '小岩井',
    volume: { actual: 820, plan: 835, diff: -15, ratio: 98.2 },
    sales: { actual: 13.5, plan: 13.8, diff: -0.3, ratio: 98.0 },
    marginalProfit: { actual: 4.3, plan: 4.4, diff: -0.1, ratio: 97.7 },
    directProfit: { actual: 1.6, plan: 1.7, diff: -0.1, ratio: 94.1 },
  },
  {
    brandName: 'iMUSE',
    volume: { actual: 610, plan: 629, diff: -19, ratio: 97.0 },
    sales: { actual: 22.5, plan: 23.3, diff: -0.8, ratio: 96.6, prevYear: 18.6 },
    marginalProfit: { actual: 9.0, plan: 9.4, diff: -0.4, ratio: 95.7 },
    directProfit: { actual: 4.1, plan: 4.3, diff: -0.2, ratio: 95.3 },
  },
  {
    brandName: 'その他',
    volume: { actual: 1080, plan: 1054, diff: 26, ratio: 102.5 },
    sales: { actual: 18.0, plan: 17.6, diff: 0.4, ratio: 102.3 },
    marginalProfit: { actual: 5.4, plan: 5.3, diff: 0.1, ratio: 101.9 },
    directProfit: { actual: 2.0, plan: 1.9, diff: 0.1, ratio: 105.3 },
  },
];
