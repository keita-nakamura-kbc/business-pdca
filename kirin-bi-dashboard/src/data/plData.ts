import type { TableRow, WaterfallSegment } from '../types/index';

// 連結損益テーブル（単月 対期央 + 前年比較）
export const consolidatedPlMonthlyVsPlan: TableRow[] = [
  {
    label: '販売数量（千箱）',
    values: { actual: 12845, plan: 13212, diff: -367, prevYear: 13180, yoyDiff: -335 },
  },
  {
    label: '売上高（億円）',
    values: { actual: 184.2, plan: 188.5, diff: -4.3, prevYear: 186.0, yoyDiff: -1.8 },
  },
  {
    label: '売上高単価（円/箱）',
    values: { actual: 1434, plan: 1427, diff: 7, prevYear: 1412, yoyDiff: 22 },
  },
  {
    label: '変動費（億円）',
    values: { actual: 129.8, plan: 131.2, diff: 1.4, prevYear: 131.0, yoyDiff: 1.2 },
  },
  {
    label: '変動費高比（%）',
    values: { actual: 70.5, plan: 69.6, diff: 0.9, prevYear: 70.4, yoyDiff: 0.1 },
  },
  {
    label: '限界利益（億円）',
    values: { actual: 54.4, plan: 57.3, diff: -2.9, prevYear: 55.0, yoyDiff: -0.6 },
  },
  {
    label: '限界利益単価（円/箱）',
    values: { actual: 424, plan: 434, diff: -10, prevYear: 417, yoyDiff: 7 },
  },
  {
    label: '固定費（億円）',
    values: { actual: 33.2, plan: 38.5, diff: 5.3, prevYear: 37.8, yoyDiff: 4.6 },
  },
  {
    label: '事業利益（億円）',
    values: { actual: 21.2, plan: 18.8, diff: 2.4, prevYear: 17.2, yoyDiff: 4.0 },
    isTotal: true,
  },
  {
    label: '利益率（%）',
    values: { actual: 11.5, plan: 10.0, diff: 1.5, prevYear: 9.2, yoyDiff: 2.3 },
  },
];

// 連結損益テーブル（累月 対期央 + 前年比較）
export const consolidatedPlCumulativeVsPlan: TableRow[] = [
  {
    label: '販売数量（千箱）',
    values: { actual: 144325, plan: 149437, diff: -5112, prevYear: 146814, yoyDiff: -2489 },
  },
  {
    label: '売上高（億円）',
    values: { actual: 2067.9, plan: 2129.0, diff: -61.1, prevYear: 2092.3, yoyDiff: -24.4 },
  },
  {
    label: '売上高単価（円/箱）',
    values: { actual: 1433, plan: 1426, diff: 7, prevYear: 1425, yoyDiff: 8 },
  },
  {
    label: '変動費（億円）',
    values: { actual: 1455.9, plan: 1491.5, diff: 35.6, prevYear: 1476.4, yoyDiff: 20.5 },
  },
  {
    label: '変動費高比（%）',
    values: { actual: 70.4, plan: 70.0, diff: 0.4, prevYear: 70.6, yoyDiff: -0.2 },
  },
  {
    label: '限界利益（億円）',
    values: { actual: 612.0, plan: 637.5, diff: -25.5, prevYear: 615.9, yoyDiff: -3.9 },
  },
  {
    label: '限界利益単価（円/箱）',
    values: { actual: 424, plan: 427, diff: -3, prevYear: 420, yoyDiff: 4 },
  },
  {
    label: '固定費（億円）',
    values: { actual: 404.9, plan: 427.5, diff: 22.6, prevYear: 428.1, yoyDiff: 23.2 },
  },
  {
    label: '事業利益（億円）',
    values: { actual: 207.1, plan: 210.0, diff: -2.9, prevYear: 187.8, yoyDiff: 19.3 },
    isTotal: true,
  },
  {
    label: '利益率（%）',
    values: { actual: 10.0, plan: 9.9, diff: 0.1, prevYear: 9.0, yoyDiff: 1.0 },
  },
];

// 単社収益性指標（単月）
export const singleCompanyProfitabilityMonthly: TableRow[] = [
  {
    label: '売上高単価（円/箱）',
    values: { actual: 2131, plan: 2131, diff: 72, prevYear: 1980, yoyDiff: 151 },
  },
  {
    label: '変動費高比（%）',
    values: { actual: 38.6, plan: 40.9, diff: -2.3, prevYear: 41.9, yoyDiff: -3.3 },
  },
  {
    label: '限界利益単価（円/箱）',
    values: { actual: 402, plan: 420, diff: -18, prevYear: 397, yoyDiff: 5 },
  },
];

// 単社ブランド別売上高（単月 億円）
export const singleCompanyBrandSalesMonthly: TableRow[] = [
  {
    label: '全体',
    values: { actual: 294.6, plan: 290.6, diff: 4.0, prevYear: 294.8, yoyDiff: -0.2 },
    isTotal: true,
  },
  {
    label: 'プラズマ乳酸菌',
    values: { actual: 35.8, plan: 31.5, diff: 4.3, prevYear: 31.4, yoyDiff: 4.4 },
    indent: 1,
  },
  {
    label: '午後の紅茶',
    values: { actual: 100.3, plan: 100.2, diff: 0.1, prevYear: 98.3, yoyDiff: 2.0 },
    indent: 1,
  },
  {
    label: '生茶',
    values: { actual: 34.5, plan: 42.0, diff: -7.5, prevYear: 40.5, yoyDiff: -6.0 },
    indent: 1,
  },
];

// 単社収益性指標（累月）
export const singleCompanyProfitabilityCumulative: TableRow[] = [
  {
    label: '売上高単価（円/箱）',
    values: { actual: 1949, plan: 1960, diff: -11, prevYear: 1830, yoyDiff: 119 },
  },
  {
    label: '変動費高比（%）',
    values: { actual: 36.1, plan: 36.7, diff: -0.6, prevYear: 36.8, yoyDiff: -0.7 },
  },
  {
    label: '限界利益単価（円/箱）',
    values: { actual: 391, plan: 408, diff: -17, prevYear: 368, yoyDiff: 23 },
  },
];

// 単社ブランド別売上高（累月 億円）
export const singleCompanyBrandSalesCumulative: TableRow[] = [
  {
    label: '全体',
    values: { actual: 3397.8, plan: 3428.7, diff: -30.9, prevYear: 3350.5, yoyDiff: 47.3 },
    isTotal: true,
  },
  {
    label: 'プラズマ乳酸菌',
    values: { actual: 245.0, plan: 256.2, diff: -11.2, prevYear: 213.8, yoyDiff: 31.2 },
    indent: 1,
  },
  {
    label: '午後の紅茶',
    values: { actual: 1033.5, plan: 1033.0, diff: 0.5, prevYear: 980.0, yoyDiff: 53.5 },
    indent: 1,
  },
  {
    label: '生茶',
    values: { actual: 487.5, plan: 545.8, diff: -58.3, prevYear: 549.7, yoyDiff: -62.2 },
    indent: 1,
  },
];

// PL各項目の月次推移データ（1月～11月、11か月分）
// 最終値(11月)は consolidatedPlMonthlyVsPlan の actual と一致
export const plItemTrends: Record<string, number[]> = {
  '販売数量（千箱）': [11200, 12500, 13800, 14200, 15500, 16800, 17800, 16500, 14200, 13500, 12845],
  '売上高（億円）':   [155.0, 168.0, 178.0, 188.0, 205.0, 222.0, 238.0, 218.0, 195.0, 190.0, 184.2],
  '売上高単価（円/箱）': [1384, 1344, 1290, 1324, 1323, 1321, 1338, 1321, 1373, 1407, 1434],
  '変動費（億円）':   [110.0, 118.0, 127.0, 133.0, 144.0, 155.0, 165.0, 152.0, 137.0, 133.0, 129.8],
  '変動費高比（%）':  [70.9, 70.2, 71.3, 70.7, 70.2, 69.8, 69.3, 69.7, 70.3, 70.0, 70.5],
  '限界利益（億円）': [45.0, 50.0, 51.0, 55.0, 61.0, 67.0, 73.0, 66.0, 58.0, 57.0, 54.4],
  '限界利益単価（円/箱）': [402, 400, 370, 387, 394, 399, 410, 400, 408, 422, 424],
  '固定費（億円）':   [38.0, 37.5, 36.0, 37.0, 38.5, 37.0, 35.5, 34.0, 33.5, 34.0, 33.2],
  '事業利益（億円）': [7.0, 12.5, 15.0, 18.0, 22.5, 30.0, 37.5, 32.0, 24.5, 23.0, 21.2],
  '利益率（%）':      [4.5, 7.4, 8.4, 9.6, 11.0, 13.5, 15.8, 14.7, 12.6, 12.1, 11.5],
};

// ウォーターフォール（単月 百万円）
export const waterfallMonthly: WaterfallSegment[] = [
  { name: '期央', value: 1880, type: 'start' },
  { name: '数量差', value: -160, type: 'negative' },
  { name: '単価差', value: 10, type: 'positive' },
  { name: '変動費差', value: -140, type: 'negative' },
  { name: '固定費差', value: 530, type: 'positive' },
  { name: '実績', value: 2120, type: 'total' },
];

// ウォーターフォール（累月 百万円）
export const waterfallCumulative: WaterfallSegment[] = [
  { name: '期央', value: 21000, type: 'start' },
  { name: '数量差', value: -1560, type: 'negative' },
  { name: '単価差', value: 280, type: 'positive' },
  { name: '変動費差', value: -2140, type: 'negative' },
  { name: '固定費差', value: 2260, type: 'positive' },
  { name: '実績', value: 20712, type: 'total' },
];
