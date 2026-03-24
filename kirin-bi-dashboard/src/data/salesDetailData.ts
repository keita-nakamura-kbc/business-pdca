// P.41-42 容器別×チャネル別 売上高（百万円）ネスト構造
export interface ContainerChannelRow {
  label: string;
  revenue: number;          // 百万円
  sharePercent: number;     // 構成比 % (親=対全体, 子=対親容器)
  planRatio: number;        // 対計画 % (100=計画通り)
  yoyRatio: number;         // 対前年 % (100=前年並み)
  volume?: number;          // 販売数量 千箱
  isParent?: boolean;       // 容器親行
  isSummary?: boolean;      // 合計行
  children?: ContainerChannelRow[];
}

export const containerChannelData: ContainerChannelRow[] = [
  {
    label: '缶', revenue: 34839, sharePercent: 10.7, planRatio: 97.5, yoyRatio: 96.8, volume: 28450, isParent: true,
    children: [
      { label: '量販', revenue: 6505, sharePercent: 18.7, planRatio: 96.2, yoyRatio: 95.5, volume: 5320 },
      { label: 'CVS', revenue: 2046, sharePercent: 5.9, planRatio: 97.8, yoyRatio: 96.0, volume: 1679 },
      { label: '自販機', revenue: 20150, sharePercent: 57.8, planRatio: 98.1, yoyRatio: 97.5, volume: 16448 },
      { label: '卸一般', revenue: 4538, sharePercent: 13.0, planRatio: 96.5, yoyRatio: 95.0, volume: 3699 },
      { label: '手売その他', revenue: 933, sharePercent: 2.7, planRatio: 95.0, yoyRatio: 93.5, volume: 768 },
      { label: 'EC', revenue: 668, sharePercent: 1.9, planRatio: 102.5, yoyRatio: 108.0, volume: 541 },
    ],
  },
  {
    label: '小型PET', revenue: 228006, sharePercent: 70.1, planRatio: 98.2, yoyRatio: 101.5, volume: 48620, isParent: true,
    children: [
      { label: '量販', revenue: 99513, sharePercent: 43.6, planRatio: 97.5, yoyRatio: 100.8, volume: 21198 },
      { label: 'CVS', revenue: 62004, sharePercent: 27.2, planRatio: 98.8, yoyRatio: 102.0, volume: 13225 },
      { label: '自販機', revenue: 39577, sharePercent: 17.4, planRatio: 97.0, yoyRatio: 99.5, volume: 8460 },
      { label: '卸一般', revenue: 13956, sharePercent: 6.1, planRatio: 99.5, yoyRatio: 103.0, volume: 2966 },
      { label: '手売その他', revenue: 3961, sharePercent: 1.7, planRatio: 96.8, yoyRatio: 98.5, volume: 827 },
      { label: 'EC', revenue: 8995, sharePercent: 3.9, planRatio: 105.0, yoyRatio: 115.0, volume: 1896 },
    ],
  },
  {
    label: '大型PET', revenue: 57620, sharePercent: 17.7, planRatio: 96.5, yoyRatio: 103.8, volume: 52340, isParent: true,
    children: [
      { label: '量販', revenue: 45704, sharePercent: 79.3, planRatio: 95.8, yoyRatio: 103.0, volume: 41506 },
      { label: 'CVS', revenue: 2123, sharePercent: 3.7, planRatio: 97.2, yoyRatio: 105.5, volume: 1937 },
      { label: '自販機', revenue: 73, sharePercent: 0.1, planRatio: 96.0, yoyRatio: 102.0, volume: 52 },
      { label: '卸一般', revenue: 5095, sharePercent: 8.8, planRatio: 98.0, yoyRatio: 105.0, volume: 4606 },
      { label: '手売その他', revenue: 822, sharePercent: 1.4, planRatio: 95.5, yoyRatio: 101.5, volume: 733 },
      { label: 'EC', revenue: 3803, sharePercent: 6.6, planRatio: 103.0, yoyRatio: 112.0, volume: 3454 },
    ],
  },
  {
    label: 'その他', revenue: 4953, sharePercent: 1.5, planRatio: 94.0, yoyRatio: 92.5, volume: 14915, isParent: true,
  },
];

export const containerChannelDataMonthly: ContainerChannelRow[] = [
  {
    label: '缶', revenue: 3168, sharePercent: 10.7, planRatio: 96.8, yoyRatio: 95.5, volume: 2680, isParent: true,
    children: [
      { label: '量販', revenue: 591, sharePercent: 18.7, planRatio: 95.5, yoyRatio: 94.2, volume: 501 },
      { label: 'CVS', revenue: 186, sharePercent: 5.9, planRatio: 97.0, yoyRatio: 95.0, volume: 158 },
      { label: '自販機', revenue: 1831, sharePercent: 57.8, planRatio: 97.2, yoyRatio: 96.0, volume: 1549 },
      { label: '卸一般', revenue: 412, sharePercent: 13.0, planRatio: 95.8, yoyRatio: 93.8, volume: 348 },
      { label: '手売その他', revenue: 85, sharePercent: 2.7, planRatio: 94.0, yoyRatio: 92.0, volume: 72 },
      { label: 'EC', revenue: 63, sharePercent: 2.0, planRatio: 101.5, yoyRatio: 106.5, volume: 54 },
    ],
  },
  {
    label: '小型PET', revenue: 20727, sharePercent: 70.0, planRatio: 97.5, yoyRatio: 100.8, volume: 4510, isParent: true,
    children: [
      { label: '量販', revenue: 10172, sharePercent: 49.1, planRatio: 96.8, yoyRatio: 100.0, volume: 2214 },
      { label: 'CVS', revenue: 5277, sharePercent: 25.5, planRatio: 98.0, yoyRatio: 101.5, volume: 1150 },
      { label: '自販機', revenue: 2909, sharePercent: 14.0, planRatio: 96.2, yoyRatio: 98.8, volume: 631 },
      { label: '卸一般', revenue: 1454, sharePercent: 7.0, planRatio: 98.8, yoyRatio: 102.0, volume: 316 },
      { label: '手売その他', revenue: 547, sharePercent: 2.6, planRatio: 96.0, yoyRatio: 97.5, volume: 117 },
      { label: 'EC', revenue: 368, sharePercent: 1.8, planRatio: 104.2, yoyRatio: 113.5, volume: 81 },
    ],
  },
  {
    label: '大型PET', revenue: 5237, sharePercent: 17.7, planRatio: 95.8, yoyRatio: 102.5, volume: 4820, isParent: true,
    children: [
      { label: '量販', revenue: 2773, sharePercent: 52.9, planRatio: 95.0, yoyRatio: 102.0, volume: 2550 },
      { label: 'CVS', revenue: 744, sharePercent: 14.2, planRatio: 96.5, yoyRatio: 104.0, volume: 684 },
      { label: '自販機', revenue: 527, sharePercent: 10.1, planRatio: 95.2, yoyRatio: 101.0, volume: 487 },
      { label: '卸一般', revenue: 738, sharePercent: 14.1, planRatio: 97.2, yoyRatio: 103.5, volume: 680 },
      { label: '手売その他', revenue: 318, sharePercent: 6.1, planRatio: 94.8, yoyRatio: 100.5, volume: 294 },
      { label: 'EC', revenue: 137, sharePercent: 2.6, planRatio: 102.0, yoyRatio: 110.5, volume: 125 },
    ],
  },
  {
    label: 'その他', revenue: 450, sharePercent: 1.5, planRatio: 93.2, yoyRatio: 91.0, volume: 1370, isParent: true,
    children: [
      { label: '量販', revenue: 191, sharePercent: 42.4, planRatio: 92.5, yoyRatio: 90.5, volume: 581 },
      { label: 'CVS', revenue: 73, sharePercent: 16.2, planRatio: 93.0, yoyRatio: 90.8, volume: 222 },
      { label: '自販機', revenue: 32, sharePercent: 7.1, planRatio: 94.2, yoyRatio: 92.0, volume: 97 },
      { label: '卸一般', revenue: 109, sharePercent: 24.2, planRatio: 93.8, yoyRatio: 91.5, volume: 332 },
      { label: '手売その他', revenue: 29, sharePercent: 6.4, planRatio: 92.0, yoyRatio: 89.5, volume: 88 },
      { label: 'EC', revenue: 16, sharePercent: 3.6, planRatio: 95.0, yoyRatio: 93.5, volume: 49 },
    ],
  },
];

// P.39-42 単社販売実績（千箱）
export interface SalesDetailRow {
  label: string;
  actual: number;
  planRatio: number;
  yoyRatio: number;
  sharePercent?: number;
  indent?: number;
  salesAmount?: number;     // 売上高 億円
  salesPlanRatio?: number;  // 売上計画比 %
}

// ブランド別
export const salesByBrand: SalesDetailRow[] = [
  { label: '生茶', actual: 28450, planRatio: 97.1, yoyRatio: 98.3, salesAmount: 487.5, salesPlanRatio: 89.3 },
  { label: '午後の紅茶', actual: 25680, planRatio: 98.0, yoyRatio: 97.5, salesAmount: 1033.5, salesPlanRatio: 100.0 },
  { label: 'ファイア', actual: 18920, planRatio: 97.0, yoyRatio: 95.2, salesAmount: 355.0, salesPlanRatio: 96.5 },
  { label: '小岩井', actual: 8420, planRatio: 97.3, yoyRatio: 104.2, salesAmount: 148.0, salesPlanRatio: 97.0 },
  { label: 'iMUSE', actual: 6240, planRatio: 96.0, yoyRatio: 118.5, salesAmount: 245.0, salesPlanRatio: 95.6 },
  { label: 'その他', actual: 11025, planRatio: 101.1, yoyRatio: 97.8, salesAmount: 195.0, salesPlanRatio: 101.0 },
];

// ブランド別（単月）
export const salesByBrandMonthly: SalesDetailRow[] = [
  { label: '生茶', actual: 2850, planRatio: 95.5, yoyRatio: 96.8, salesAmount: 44.0, salesPlanRatio: 87.5 },
  { label: '午後の紅茶', actual: 2540, planRatio: 100.1, yoyRatio: 102.0, salesAmount: 94.0, salesPlanRatio: 101.5 },
  { label: 'ファイア', actual: 1810, planRatio: 96.5, yoyRatio: 94.0, salesAmount: 32.0, salesPlanRatio: 95.0 },
  { label: '小岩井', actual: 820, planRatio: 98.2, yoyRatio: 105.5, salesAmount: 13.5, salesPlanRatio: 98.0 },
  { label: 'iMUSE', actual: 610, planRatio: 97.0, yoyRatio: 121.0, salesAmount: 22.5, salesPlanRatio: 96.5 },
  { label: 'その他', actual: 1080, planRatio: 102.5, yoyRatio: 98.5, salesAmount: 18.0, salesPlanRatio: 102.0 },
];

// 容器別（単月）
export const salesByContainerMonthly: SalesDetailRow[] = [
  { label: '大型PET', actual: 4820, planRatio: 94.8, yoyRatio: 95.5, salesAmount: 52.4 },
  { label: '小型PET', actual: 4510, planRatio: 96.2, yoyRatio: 97.0, salesAmount: 207.3 },
  { label: '缶',      actual: 2680, planRatio: 96.8, yoyRatio: 96.5, salesAmount: 31.7 },
  { label: '瓶',      actual: 790,  planRatio: 97.5, yoyRatio: 103.0, salesAmount: 2.6 },
  { label: '紙パック', actual: 580,  planRatio: 111.5, yoyRatio: 107.8, salesAmount: 1.9 },
];

// チャネル別（単月）
export const salesByChannelMonthly: SalesDetailRow[] = [
  { label: '量販店', actual: 4820, planRatio: 95.8, yoyRatio: 96.5, sharePercent: 36.0, salesAmount: 137.3 },
  { label: 'CVS',    actual: 4010, planRatio: 96.5, yoyRatio: 97.8, sharePercent: 30.0, salesAmount: 62.8 },
  { label: '自販機', actual: 3020, planRatio: 97.2, yoyRatio: 98.5, sharePercent: 22.5, salesAmount: 53.0 },
  { label: 'ネット', actual: 810,  planRatio: 96.8, yoyRatio: 111.0, sharePercent: 6.1, salesAmount: 5.8 },
  { label: 'その他', actual: 720,  planRatio: 97.5, yoyRatio: 96.0, sharePercent: 5.4, salesAmount: 36.9 },
];

// 容器別
export const salesByContainer: SalesDetailRow[] = [
  { label: '大型PET', actual: 52340, planRatio: 95.5, yoyRatio: 96.2, salesAmount: 576.2 },
  { label: '小型PET', actual: 48620, planRatio: 96.9, yoyRatio: 97.8, salesAmount: 2280.1 },
  { label: '缶', actual: 28450, planRatio: 97.4, yoyRatio: 97.2, salesAmount: 348.4 },
  { label: '瓶', actual: 8650, planRatio: 97.2, yoyRatio: 102.5, salesAmount: 28.7 },
  { label: '紙パック', actual: 6265, planRatio: 112.9, yoyRatio: 108.5, salesAmount: 20.8 },
];

// チャネル別
export const salesByChannel: SalesDetailRow[] = [
  { label: '量販店', actual: 52340, planRatio: 96.6, yoyRatio: 97.2, sharePercent: 36.3, salesAmount: 1540.7 },
  { label: 'CVS', actual: 43280, planRatio: 97.0, yoyRatio: 98.5, sharePercent: 30.0, salesAmount: 672.0 },
  { label: '自販機', actual: 32450, planRatio: 97.7, yoyRatio: 99.2, sharePercent: 22.5, salesAmount: 607.2 },
  { label: 'ネット', actual: 8650, planRatio: 97.2, yoyRatio: 112.5, sharePercent: 6.0, salesAmount: 136.7 },
  { label: 'その他', actual: 7605, planRatio: 98.1, yoyRatio: 96.8, sharePercent: 5.3, salesAmount: 297.6 },
];
