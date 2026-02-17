import type { BrandData } from '../types/index';

// ブランドカード（累月）
export const brandCards: BrandData[] = [
  {
    brandName: 'プラズマ乳酸菌',
    color: '#7B1FA2',
    volume: { actual: 25302, plan: 26356, ratio: 96 },
    sales: { actual: 245.0, plan: 256.2, ratio: 95.6 },
    profitRate: { actual: 86.6, plan: 100, diff: -13.4 },
    signal: 'yellow',
  },
  {
    brandName: '午後の紅茶',
    color: '#DC0000',
    volume: { actual: 107083, plan: 107083, ratio: 100 },
    sales: { actual: 1033.5, plan: 1033.5, ratio: 100.0 },
    profitRate: { actual: 95.1, plan: 100, diff: -4.9 },
    signal: 'green',
  },
  {
    brandName: '生茶',
    color: '#2E7D32',
    volume: { actual: 51513, plan: 57237, ratio: 90 },
    sales: { actual: 487.5, plan: 545.8, ratio: 89.3 },
    profitRate: { actual: 81.2, plan: 100, diff: -18.8 },
    signal: 'red',
  },
];

// ブランド市場指標（PDF P.14-20由来）
export interface BrandMarketMetric {
  month: string;
  distributionRate: number;  // 販売店率 %
  turnoverRate: number;      // 回転数 本
  avgSellingPrice: number;   // 平均販売単価 円/本
}

export interface BrandMarketData {
  brandName: string;
  metrics: BrandMarketMetric[];
}

export const brandMarketMetrics: BrandMarketData[] = [
  {
    brandName: 'プラズマ乳酸菌',
    metrics: [
      { month: '1月', distributionRate: 62.0, turnoverRate: 105, avgSellingPrice: 28.5 },
      { month: '2月', distributionRate: 63.5, turnoverRate: 108, avgSellingPrice: 28.2 },
      { month: '3月', distributionRate: 65.0, turnoverRate: 112, avgSellingPrice: 27.8 },
      { month: '4月', distributionRate: 68.0, turnoverRate: 118, avgSellingPrice: 27.5 },
      { month: '5月', distributionRate: 70.0, turnoverRate: 122, avgSellingPrice: 27.0 },
      { month: '6月', distributionRate: 72.0, turnoverRate: 125, avgSellingPrice: 26.5 },
      { month: '7月', distributionRate: 75.0, turnoverRate: 135, avgSellingPrice: 26.0 },
      { month: '8月', distributionRate: 74.0, turnoverRate: 132, avgSellingPrice: 26.2 },
      { month: '9月', distributionRate: 71.0, turnoverRate: 120, avgSellingPrice: 27.0 },
      { month: '10月', distributionRate: 68.0, turnoverRate: 115, avgSellingPrice: 27.5 },
      { month: '11月', distributionRate: 66.0, turnoverRate: 110, avgSellingPrice: 28.0 },
    ],
  },
  {
    brandName: '午後の紅茶',
    metrics: [
      { month: '1月', distributionRate: 88.0, turnoverRate: 35, avgSellingPrice: 82.0 },
      { month: '2月', distributionRate: 88.5, turnoverRate: 33, avgSellingPrice: 81.5 },
      { month: '3月', distributionRate: 89.0, turnoverRate: 38, avgSellingPrice: 80.0 },
      { month: '4月', distributionRate: 90.0, turnoverRate: 42, avgSellingPrice: 78.5 },
      { month: '5月', distributionRate: 91.0, turnoverRate: 45, avgSellingPrice: 77.0 },
      { month: '6月', distributionRate: 92.0, turnoverRate: 48, avgSellingPrice: 76.0 },
      { month: '7月', distributionRate: 93.0, turnoverRate: 52, avgSellingPrice: 75.0 },
      { month: '8月', distributionRate: 92.5, turnoverRate: 50, avgSellingPrice: 75.5 },
      { month: '9月', distributionRate: 91.0, turnoverRate: 44, avgSellingPrice: 77.0 },
      { month: '10月', distributionRate: 90.0, turnoverRate: 40, avgSellingPrice: 78.0 },
      { month: '11月', distributionRate: 89.0, turnoverRate: 37, avgSellingPrice: 79.0 },
    ],
  },
  {
    brandName: '生茶',
    metrics: [
      { month: '1月', distributionRate: 78.0, turnoverRate: 80, avgSellingPrice: 72.0 },
      { month: '2月', distributionRate: 79.0, turnoverRate: 85, avgSellingPrice: 71.0 },
      { month: '3月', distributionRate: 80.0, turnoverRate: 95, avgSellingPrice: 70.0 },
      { month: '4月', distributionRate: 83.0, turnoverRate: 130, avgSellingPrice: 68.0 },
      { month: '5月', distributionRate: 85.0, turnoverRate: 150, avgSellingPrice: 67.0 },
      { month: '6月', distributionRate: 86.0, turnoverRate: 165, avgSellingPrice: 66.0 },
      { month: '7月', distributionRate: 88.0, turnoverRate: 200, avgSellingPrice: 65.0 },
      { month: '8月', distributionRate: 87.0, turnoverRate: 190, avgSellingPrice: 65.5 },
      { month: '9月', distributionRate: 84.0, turnoverRate: 145, avgSellingPrice: 67.0 },
      { month: '10月', distributionRate: 82.0, turnoverRate: 120, avgSellingPrice: 68.5 },
      { month: '11月', distributionRate: 80.0, turnoverRate: 105, avgSellingPrice: 69.0 },
    ],
  },
];

// ブランド別業績詳細（累月）
export interface BrandPerformanceDetail {
  brandName: string;
  color: string;
  marginalProfit: { actual: number; ratio: number };
  volume: { actual: number; ratio: number };
  yoyRatio: number;
}

export const brandPerformanceDetails: BrandPerformanceDetail[] = [
  {
    brandName: 'プラズマ乳酸菌',
    color: '#7B1FA2',
    marginalProfit: { actual: 5938, ratio: 86.6 },
    volume: { actual: 9038, ratio: 95.5 },
    yoyRatio: 114.6,
  },
  {
    brandName: '午後の紅茶',
    color: '#DC0000',
    marginalProfit: { actual: 23221, ratio: 95.1 },
    volume: { actual: 43860, ratio: 100.7 },
    yoyRatio: 105.5,
  },
  {
    brandName: '生茶',
    color: '#2E7D32',
    marginalProfit: { actual: 8382, ratio: 81.2 },
    volume: { actual: 23608, ratio: 91.9 },
    yoyRatio: 88.7,
  },
];

// 出荷実績詳細（累月 千箱）
export interface ShipmentDetail {
  brandName: string;
  color: string;
  items: {
    label: string;
    actual: number;
    planRatio: number;
    yoyRatio: number;
    indent?: number;
  }[];
}

export const shipmentDetails: ShipmentDetail[] = [
  {
    brandName: 'プラズマ乳酸菌',
    color: '#7B1FA2',
    items: [
      { label: 'プラズマ乳酸菌計', actual: 25302, planRatio: 96, yoyRatio: 115 },
      { label: '超小型計', actual: 8954, planRatio: 93, yoyRatio: 135, indent: 1 },
      { label: 'イミューズ計', actual: 15287, planRatio: 98, yoyRatio: 112, indent: 1 },
    ],
  },
  {
    brandName: '午後の紅茶',
    color: '#DC0000',
    items: [
      { label: '午後の紅茶計', actual: 107083, planRatio: 100, yoyRatio: 105 },
      { label: 'レギュラー3品計', actual: 66162, planRatio: 97, yoyRatio: 100, indent: 1 },
      { label: 'おいしい無糖計', actual: 27258, planRatio: 98, yoyRatio: 109, indent: 1 },
    ],
  },
  {
    brandName: '生茶',
    color: '#2E7D32',
    items: [
      { label: '生茶計', actual: 51513, planRatio: 90, yoyRatio: 89 },
      { label: '大型計', actual: 15660, planRatio: 99, yoyRatio: 84, indent: 1 },
      { label: '小型計', actual: 23594, planRatio: 86, yoyRatio: 88, indent: 1 },
      { label: 'ほうじ煎茶計', actual: 10190, planRatio: 93, yoyRatio: 117, indent: 1 },
    ],
  },
];

// 出荷実績詳細（単月 千箱）
export const shipmentDetailsMonthly: ShipmentDetail[] = [
  {
    brandName: 'プラズマ乳酸菌',
    color: '#7B1FA2',
    items: [
      { label: 'プラズマ乳酸菌計', actual: 2718, planRatio: 94, yoyRatio: 118 },
      { label: '超小型計', actual: 962, planRatio: 91, yoyRatio: 140, indent: 1 },
      { label: 'イミューズ計', actual: 1642, planRatio: 96, yoyRatio: 114, indent: 1 },
    ],
  },
  {
    brandName: '午後の紅茶',
    color: '#DC0000',
    items: [
      { label: '午後の紅茶計', actual: 8923, planRatio: 102, yoyRatio: 107 },
      { label: 'レギュラー3品計', actual: 5512, planRatio: 99, yoyRatio: 102, indent: 1 },
      { label: 'おいしい無糖計', actual: 2271, planRatio: 100, yoyRatio: 112, indent: 1 },
    ],
  },
  {
    brandName: '生茶',
    color: '#2E7D32',
    items: [
      { label: '生茶計', actual: 3842, planRatio: 88, yoyRatio: 86 },
      { label: '大型計', actual: 1168, planRatio: 97, yoyRatio: 81, indent: 1 },
      { label: '小型計', actual: 1760, planRatio: 84, yoyRatio: 85, indent: 1 },
      { label: 'ほうじ煎茶計', actual: 760, planRatio: 91, yoyRatio: 120, indent: 1 },
    ],
  },
];
