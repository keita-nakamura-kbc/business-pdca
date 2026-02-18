// P.30 市場シェアデータ
export interface MarketShareData {
  company: string;
  annualVolume: number; // 万箱
  annualRatio: number;  // %
  monthlyShare?: number;
  cumulativeShare?: number;
}

export const marketShareData: MarketShareData[] = [
  { company: 'KBC', annualVolume: 19790, annualRatio: 103, monthlyShare: 93, cumulativeShare: 95 },
  { company: 'CCJC', annualVolume: 47100, annualRatio: 101 },
  { company: 'SU', annualVolume: 44870, annualRatio: 99 },
  { company: 'I', annualVolume: 21530, annualRatio: 99 },
];

export const kbcShareMonthly = 93;
export const kbcShareCumulative = 95;

// P.30 市場出荷推移（月別万箱）
export interface MarketTrendPoint {
  month: string;
  kbc: number;
  ccjc: number;
  su: number;
  asahi: number;
  ito: number;
}

const marketTrendMonthlyRaw: MarketTrendPoint[] = [
  { month: '1月',  kbc: 1100, ccjc: 2800, su: 2600, asahi: 1200, ito: 1300 },
  { month: '2月',  kbc: 1050, ccjc: 2700, su: 2500, asahi: 1150, ito: 1250 },
  { month: '3月',  kbc: 1200, ccjc: 3100, su: 2900, asahi: 1350, ito: 1400 },
  { month: '4月',  kbc: 1500, ccjc: 3800, su: 3600, asahi: 1650, ito: 1800 },
  { month: '5月',  kbc: 1700, ccjc: 4200, su: 3900, asahi: 1850, ito: 2000 },
  { month: '6月',  kbc: 1800, ccjc: 4500, su: 4200, asahi: 1950, ito: 2100 },
  { month: '7月',  kbc: 2100, ccjc: 5200, su: 4900, asahi: 2250, ito: 2400 },
  { month: '8月',  kbc: 2050, ccjc: 5100, su: 4800, asahi: 2200, ito: 2350 },
  { month: '9月',  kbc: 1800, ccjc: 4400, su: 4100, asahi: 1900, ito: 2050 },
  { month: '10月', kbc: 1630, ccjc: 3620, su: 3090, asahi: 1700, ito: 1740 },
  { month: '11月', kbc: 1370, ccjc: 3370, su: 3170, asahi: 1500, ito: 1540 },
];

export const marketTrendMonthly = marketTrendMonthlyRaw;

export const marketTrendCumulative: MarketTrendPoint[] = marketTrendMonthlyRaw.reduce<MarketTrendPoint[]>(
  (acc, cur, i) => {
    const prev = i > 0 ? acc[i - 1] : { kbc: 0, ccjc: 0, su: 0, asahi: 0, ito: 0 };
    acc.push({
      month: cur.month,
      kbc: prev.kbc + cur.kbc,
      ccjc: prev.ccjc + cur.ccjc,
      su: prev.su + cur.su,
      asahi: prev.asahi + cur.asahi,
      ito: prev.ito + cur.ito,
    });
    return acc;
  },
  [],
);

// P.36 連結領域別PL（累月/単月 億円）
export interface RegionalPlRow {
  item: string;
  hs: number;
  food: number;
  consolidated: number;
  consolidatedPlanDiff?: number;
  consolidatedYoyDiff?: number;
  hsPlanRatio?: number;
  foodPlanRatio?: number;
  consolidatedPlanRatio?: number;
  consolidatedYoyRatio?: number;
  isCostItem?: boolean;
  isSubtotal?: boolean;
  isTotal?: boolean;
  isRate?: boolean;
}

export const regionalPlData: RegionalPlRow[] = [
  { item: '売上収益',       hs: 378.8, food: 2086.9, consolidated: 2465.7, consolidatedPlanDiff: -35.6, consolidatedYoyDiff: 3.1, hsPlanRatio: 97.2, foodPlanRatio: 98.4, consolidatedPlanRatio: 98.6, consolidatedYoyRatio: 100.1 },
  { item: '売上原価',       hs: 201.5, food: 1101.0, consolidated: 1302.5, isCostItem: true, hsPlanRatio: 101.5, foodPlanRatio: 97.8, consolidatedPlanRatio: 98.5, consolidatedYoyRatio: 99.5 },
  { item: '売上総利益',     hs: 177.3, food: 985.9,  consolidated: 1163.2, isSubtotal: true, hsPlanRatio: 96.8, foodPlanRatio: 97.1, consolidatedPlanRatio: 97.0, consolidatedYoyRatio: 99.8 },
  { item: '変動販促費',     hs: 10.3,  food: 81.8,   consolidated: 92.1, isCostItem: true, hsPlanRatio: 103.2, foodPlanRatio: 98.5, consolidatedPlanRatio: 99.0, consolidatedYoyRatio: 102.0 },
  { item: '運搬費',         hs: 31.7,  food: 196.5,  consolidated: 228.3, isCostItem: true, hsPlanRatio: 99.1, foodPlanRatio: 96.8, consolidatedPlanRatio: 97.2, consolidatedYoyRatio: 97.8 },
  { item: '限界利益',       hs: 135.2, food: 707.6,  consolidated: 842.8, isSubtotal: true, hsPlanRatio: 96.5, foodPlanRatio: 96.8, consolidatedPlanRatio: 96.7, consolidatedYoyRatio: 100.5 },
  { item: '固定販促費',     hs: 18.0,  food: 106.9,  consolidated: 124.9, isCostItem: true, hsPlanRatio: 101.8, foodPlanRatio: 99.2, consolidatedPlanRatio: 99.5, consolidatedYoyRatio: 103.0 },
  { item: '広告費',         hs: 24.2,  food: 47.9,   consolidated: 72.1, isCostItem: true, hsPlanRatio: 98.0, foodPlanRatio: 102.5, consolidatedPlanRatio: 100.7, consolidatedYoyRatio: 106.0 },
  { item: '販売機器費',     hs: 9.0,   food: 49.5,   consolidated: 58.5, isCostItem: true, hsPlanRatio: 102.3, foodPlanRatio: 97.5, consolidatedPlanRatio: 98.2, consolidatedYoyRatio: 102.0 },
  { item: '直接利益',       hs: 84.0,  food: 503.3,  consolidated: 587.4, isSubtotal: true, hsPlanRatio: 95.8, foodPlanRatio: 96.2, consolidatedPlanRatio: 96.1, consolidatedYoyRatio: 103.5 },
  { item: '営業費・一般管理費', hs: 48.2, food: 332.0, consolidated: 380.2, isCostItem: true, hsPlanRatio: 100.5, foodPlanRatio: 98.8, consolidatedPlanRatio: 99.0, consolidatedYoyRatio: 101.5 },
  { item: '事業利益',       hs: 35.8,  food: 171.3,  consolidated: 207.1, consolidatedPlanDiff: -2.9, consolidatedYoyDiff: 19.3, isTotal: true, hsPlanRatio: 102.1, foodPlanRatio: 96.5, consolidatedPlanRatio: 98.6, consolidatedYoyRatio: 110.3 },
  { item: '事業利益率',     hs: 9.5,   food: 8.2,    consolidated: 8.4, isTotal: true, isRate: true },
];

// P.36 単月版（P.7-8等から推計）
export const regionalPlDataMonthly: RegionalPlRow[] = [
  { item: '売上収益',       hs: 34.2,  food: 188.5,  consolidated: 222.7, consolidatedPlanDiff: -5.1, consolidatedYoyDiff: 1.2, hsPlanRatio: 96.5, foodPlanRatio: 97.2, consolidatedPlanRatio: 97.8, consolidatedYoyRatio: 100.5 },
  { item: '売上原価',       hs: 18.2,  food: 99.5,   consolidated: 117.7, isCostItem: true, hsPlanRatio: 99.8, foodPlanRatio: 96.2, consolidatedPlanRatio: 97.0, consolidatedYoyRatio: 98.8 },
  { item: '売上総利益',     hs: 16.0,  food: 89.0,   consolidated: 105.0, isSubtotal: true, hsPlanRatio: 95.2, foodPlanRatio: 95.8, consolidatedPlanRatio: 95.6, consolidatedYoyRatio: 99.0 },
  { item: '変動販促費',     hs: 0.9,   food: 7.4,    consolidated: 8.3, isCostItem: true, hsPlanRatio: 105.0, foodPlanRatio: 97.0, consolidatedPlanRatio: 97.6, consolidatedYoyRatio: 101.5 },
  { item: '運搬費',         hs: 2.9,   food: 17.8,   consolidated: 20.7, isCostItem: true, hsPlanRatio: 97.5, foodPlanRatio: 95.2, consolidatedPlanRatio: 95.5, consolidatedYoyRatio: 96.5 },
  { item: '限界利益',       hs: 12.2,  food: 63.8,   consolidated: 76.0, isSubtotal: true, hsPlanRatio: 94.8, foodPlanRatio: 95.0, consolidatedPlanRatio: 94.9, consolidatedYoyRatio: 99.8 },
  { item: '固定販促費',     hs: 1.6,   food: 9.7,    consolidated: 11.3, isCostItem: true, hsPlanRatio: 103.5, foodPlanRatio: 98.0, consolidatedPlanRatio: 98.8, consolidatedYoyRatio: 102.0 },
  { item: '広告費',         hs: 2.2,   food: 4.3,    consolidated: 6.5, isCostItem: true, hsPlanRatio: 96.5, foodPlanRatio: 104.2, consolidatedPlanRatio: 101.0, consolidatedYoyRatio: 107.5 },
  { item: '販売機器費',     hs: 0.8,   food: 4.5,    consolidated: 5.3, isCostItem: true, hsPlanRatio: 104.0, foodPlanRatio: 96.0, consolidatedPlanRatio: 97.2, consolidatedYoyRatio: 101.0 },
  { item: '直接利益',       hs: 7.6,   food: 45.3,   consolidated: 52.9, isSubtotal: true, hsPlanRatio: 93.5, foodPlanRatio: 94.8, consolidatedPlanRatio: 94.5, consolidatedYoyRatio: 102.0 },
  { item: '営業費・一般管理費', hs: 4.4, food: 30.1, consolidated: 34.5, isCostItem: true, hsPlanRatio: 99.0, foodPlanRatio: 97.5, consolidatedPlanRatio: 97.8, consolidatedYoyRatio: 100.5 },
  { item: '事業利益',       hs: 3.2,   food: 15.2,   consolidated: 18.4, consolidatedPlanDiff: -0.8, consolidatedYoyDiff: 2.1, isTotal: true, hsPlanRatio: 105.2, foodPlanRatio: 93.8, consolidatedPlanRatio: 95.8, consolidatedYoyRatio: 112.9 },
  { item: '事業利益率',     hs: 9.4,   food: 8.1,    consolidated: 8.3, isTotal: true, isRate: true },
];

// P.37-38 連結増減分析 (ウォーターフォール) - uses plData waterfall exports

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
// singleCompanyBrandSalesMonthly (plData L110-131) と整合:
// 全体294.6、プラズマ35.8、午後100.3、生茶34.5
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

// P.43 単社原材料
export interface RawMaterialRow {
  category: string;
  items: string[];
  trend: 'up' | 'down' | 'flat';
  impact: string;
}

export const rawMaterialData: RawMaterialRow[] = [
  { category: '原材料', items: ['茶葉', '砂糖', '果汁'], trend: 'up', impact: '原材料費上昇傾向' },
  { category: '容器・包材', items: ['PETボトル', 'ラベル', '段ボール'], trend: 'up', impact: '石油由来原料高騰' },
  { category: 'エネルギー', items: ['電力', 'ガス'], trend: 'flat', impact: '安定推移' },
];

// P.43 原材料コストアップ総額
export const rawMaterialCostTotalCumulative = 1111; // 百万円（累月）
export const rawMaterialCostTotalMonthly = 105;     // 百万円（11月単月）

// P.46 単価差異分析 - uses costData exports

// P.47 チャネル別PL（累月）
export interface ChannelPlRow {
  channel: string;
  volume: number;        // 千箱
  sales: number;         // 百万円
  variableCostRatio: number; // %
  marginalProfit: number;    // 百万円
  marginalProfitPerCase: number; // 円/箱
  directProfit: number;      // 百万円
  directProfitRate: number;  // %
  indent?: number;
  isTotal?: boolean;
  isGrandTotal?: boolean;
}

export const channelPlData: ChannelPlRow[] = [
  { channel: '手売り計', volume: 124245, sales: 264472, variableCostRatio: 44.4, marginalProfit: 44304, marginalProfitPerCase: 357, directProfit: 31886, directProfitRate: 12.1, isTotal: true },
  { channel: '量販', volume: 64497, sales: 152875, variableCostRatio: 49.2, marginalProfit: 26001, marginalProfitPerCase: 403, directProfit: 18744, directProfitRate: 12.3, indent: 1 },
  { channel: 'CVS', volume: 31767, sales: 66174, variableCostRatio: 41.7, marginalProfit: 9996, marginalProfitPerCase: 315, directProfit: 7006, directProfitRate: 10.6, indent: 1 },
  { channel: '卸一般', volume: 10390, sales: 25324, variableCostRatio: 40.6, marginalProfit: 5428, marginalProfitPerCase: 522, directProfit: 4254, directProfitRate: 16.8, indent: 1 },
  { channel: 'EC', volume: 10315, sales: 14228, variableCostRatio: 29.1, marginalProfit: 3606, marginalProfitPerCase: 350, directProfit: 2725, directProfitRate: 19.2, indent: 1 },
  { channel: 'その他', volume: 7276, sales: 5871, variableCostRatio: 1.6, marginalProfit: -728, marginalProfitPerCase: -100, directProfit: -843, directProfitRate: -14.4, indent: 1 },
  { channel: '自販機計', volume: 34125, sales: 60950, variableCostRatio: 8.7, marginalProfit: 21881, marginalProfitPerCase: 641, directProfit: 9456, directProfitRate: 15.5, isTotal: true },
  { channel: 'オペレーター', volume: 15545, sales: 31091, variableCostRatio: 15.5, marginalProfit: 10575, marginalProfitPerCase: 680, directProfit: 4014, directProfitRate: 12.9, indent: 1 },
  { channel: '自販機販社', volume: 13736, sales: 22107, variableCostRatio: 0.1, marginalProfit: 8612, marginalProfitPerCase: 627, directProfit: 3815, directProfitRate: 17.3, indent: 1 },
  { channel: 'ヤクルト', volume: 3968, sales: 6575, variableCostRatio: 7.0, marginalProfit: 2319, marginalProfitPerCase: 584, directProfit: 1267, directProfitRate: 19.3, indent: 1 },
  { channel: 'ダイドー', volume: 875, sales: 1177, variableCostRatio: 0.0, marginalProfit: 363, marginalProfitPerCase: 415, directProfit: 315, directProfitRate: 26.7, indent: 1 },
  { channel: 'ドライ計', volume: 158370, sales: 325422, variableCostRatio: 37.7, marginalProfit: 66185, marginalProfitPerCase: 418, directProfit: 41342, directProfitRate: 12.7, isTotal: true },
  { channel: 'チルド', volume: 10047, sales: 9920, variableCostRatio: 2.1, marginalProfit: 1039, marginalProfitPerCase: 103, directProfit: 970, directProfitRate: 9.8 },
  { channel: 'OEM', volume: 4622, sales: 3117, variableCostRatio: 0.0, marginalProfit: 647, marginalProfitPerCase: 140, directProfit: 647, directProfitRate: 20.8 },
  { channel: '海外', volume: 1305, sales: 1317, variableCostRatio: 0.0, marginalProfit: 230, marginalProfitPerCase: 176, directProfit: 227, directProfitRate: 17.3 },
  { channel: 'KBC単社計', volume: 174345, sales: 339775, variableCostRatio: 36.1, marginalProfit: 68101, marginalProfitPerCase: 391, directProfit: 43186, directProfitRate: 12.7, isGrandTotal: true },
];

// チャネル別損益（単月）— channelPlData と同構造、単月値
export const channelPlDataMonthly: ChannelPlRow[] = [
  { channel: '手売り計', volume: 11295, sales: 23200, variableCostRatio: 44.8, marginalProfit: 3880, marginalProfitPerCase: 344, directProfit: 2740, directProfitRate: 11.8, isTotal: true },
  { channel: '量販', volume: 5860, sales: 13400, variableCostRatio: 49.5, marginalProfit: 2275, marginalProfitPerCase: 388, directProfit: 1607, directProfitRate: 12.0, indent: 1 },
  { channel: 'CVS', volume: 2888, sales: 5800, variableCostRatio: 42.0, marginalProfit: 874, marginalProfitPerCase: 302, directProfit: 600, directProfitRate: 10.3, indent: 1 },
  { channel: '卸一般', volume: 945, sales: 2220, variableCostRatio: 41.0, marginalProfit: 475, marginalProfitPerCase: 503, directProfit: 367, directProfitRate: 16.5, indent: 1 },
  { channel: 'EC', volume: 938, sales: 1250, variableCostRatio: 29.5, marginalProfit: 316, marginalProfitPerCase: 337, directProfit: 233, directProfitRate: 18.6, indent: 1 },
  { channel: 'その他', volume: 664, sales: 530, variableCostRatio: 1.8, marginalProfit: -60, marginalProfitPerCase: -90, directProfit: -67, directProfitRate: -12.6, indent: 1 },
  { channel: '自販機計', volume: 3100, sales: 5350, variableCostRatio: 8.9, marginalProfit: 1920, marginalProfitPerCase: 619, directProfit: 813, directProfitRate: 15.2, isTotal: true },
  { channel: 'オペレーター', volume: 1413, sales: 2730, variableCostRatio: 15.8, marginalProfit: 928, marginalProfitPerCase: 657, directProfit: 345, directProfitRate: 12.6, indent: 1 },
  { channel: '自販機販社', volume: 1249, sales: 1940, variableCostRatio: 0.2, marginalProfit: 755, marginalProfitPerCase: 604, directProfit: 327, directProfitRate: 16.9, indent: 1 },
  { channel: 'ヤクルト', volume: 361, sales: 578, variableCostRatio: 7.2, marginalProfit: 204, marginalProfitPerCase: 565, directProfit: 109, directProfitRate: 18.9, indent: 1 },
  { channel: 'ダイドー', volume: 80, sales: 103, variableCostRatio: 0.0, marginalProfit: 32, marginalProfitPerCase: 400, directProfit: 27, directProfitRate: 26.2, indent: 1 },
  { channel: 'ドライ計', volume: 14395, sales: 28550, variableCostRatio: 38.0, marginalProfit: 5800, marginalProfitPerCase: 403, directProfit: 3553, directProfitRate: 12.5, isTotal: true },
  { channel: 'チルド', volume: 913, sales: 870, variableCostRatio: 2.3, marginalProfit: 91, marginalProfitPerCase: 100, directProfit: 83, directProfitRate: 9.5 },
  { channel: 'OEM', volume: 420, sales: 280, variableCostRatio: 0.0, marginalProfit: 58, marginalProfitPerCase: 138, directProfit: 57, directProfitRate: 20.5 },
  { channel: '海外', volume: 119, sales: 120, variableCostRatio: 0.0, marginalProfit: 21, marginalProfitPerCase: 176, directProfit: 20, directProfitRate: 17.0 },
  { channel: 'KBC単社計', volume: 15847, sales: 29820, variableCostRatio: 36.5, marginalProfit: 5970, marginalProfitPerCase: 377, directProfit: 3713, directProfitRate: 12.5, isGrandTotal: true },
];

// チャネル別サマリ（単月 チャート用）
export const channelSummaryMonthly: ChannelSummaryItem[] = [
  { name: '手売り計', sales: 23200, directProfitRate: 11.8 },
  { name: '自販機計', sales: 5350, directProfitRate: 15.2 },
  { name: 'ドライ計', sales: 28550, directProfitRate: 12.5 },
  { name: 'チルド', sales: 870, directProfitRate: 9.5 },
  { name: 'OEM', sales: 280, directProfitRate: 20.5 },
  { name: '海外', sales: 120, directProfitRate: 17.0 },
];

// チャネル別サマリ（チャート用：トップレベルチャネルのみ）
export interface ChannelSummaryItem {
  name: string;
  sales: number;          // 百万円
  directProfitRate: number; // %
}

export const channelSummary: ChannelSummaryItem[] = channelPlData
  .filter(r => r.isTotal || (!r.indent && !r.isGrandTotal))
  .map(r => ({ name: r.channel, sales: r.sales, directProfitRate: r.directProfitRate }));

// P.30 市場出荷推移 — 3ヵ年（会社別）
export interface MarketMultiYearPoint {
  label: string;   // "23/01", "24/04" etc.
  month: number;   // 1-12 (累月リセット用)
  year: number;    // 2023, 2024, 2025
  kbc: number;     // 万箱
  ccjc: number;
  su: number;
  asahi: number;
  ito: number;
}

// FY2025 (当年 1-11月) & FY2024 (前年 1-11月 + 12月推定)
const companyMonthlyRaw: Record<string, { current: number[]; prevYear: number[] }> = {
  kbc:   { current: [1100,1050,1200,1500,1700,1800,2100,2050,1800,1630,1370], prevYear: [1180,1090,1270,1580,1770,1910,2200,2170,1870,1740,1440] },
  ccjc:  { current: [2800,2700,3100,3800,4200,4500,5200,5100,4400,3620,3370], prevYear: [2830,2720,3130,3840,4240,4550,5260,5160,4440,3660,3400] },
  su:    { current: [2600,2500,2900,3600,3900,4200,4900,4800,4100,3090,3170], prevYear: [2710,2600,3020,3750,4060,4380,5100,5000,4270,3220,3300] },
  asahi: { current: [1200,1150,1350,1650,1850,1950,2250,2200,1900,1700,1500], prevYear: [1300,1270,1480,1820,2030,2150,2480,2410,2080,1880,1660] },
  ito:   { current: [1300,1250,1400,1800,2000,2100,2400,2350,2050,1740,1540], prevYear: [1290,1260,1410,1790,2010,2090,2410,2340,2060,1730,1540] },
};

const COMPANIES = ['kbc', 'ccjc', 'su', 'asahi', 'ito'] as const;

// FY2024 12月推定: 11月から-5%程度
const fy24Dec: Record<string, number> = {
  kbc: 1370, ccjc: 3200, su: 3010, asahi: 1420, ito: 1460,
};

// FY2023: FY2024 prevYear から逆算 (前年比 97-103% のバリエーション)
const fy23Factors: Record<string, number[]> = {
  kbc:   [0.98, 0.97, 0.99, 1.01, 0.98, 0.97, 1.00, 0.99, 0.98, 0.97, 0.99, 0.98],
  ccjc:  [1.01, 1.00, 0.99, 1.02, 1.01, 1.00, 0.99, 1.01, 1.00, 0.99, 1.01, 1.00],
  su:    [0.99, 1.00, 0.98, 0.97, 0.99, 1.00, 0.98, 0.99, 1.00, 0.98, 0.99, 0.98],
  asahi: [1.02, 1.01, 1.00, 1.03, 1.02, 1.01, 1.00, 1.02, 1.01, 1.00, 1.02, 1.01],
  ito:   [1.00, 0.99, 1.01, 1.00, 0.99, 1.01, 1.00, 0.99, 1.01, 1.00, 0.99, 1.00],
};

function buildMultiYearMonthly(): MarketMultiYearPoint[] {
  const points: MarketMultiYearPoint[] = [];

  // FY2023 (12ヶ月): FY2024 prevYear ÷ factor
  for (let i = 0; i < 12; i++) {
    const m = i + 1;
    const label = `23/${String(m).padStart(2, '0')}`;
    const pt: MarketMultiYearPoint = { label, month: m, year: 2023, kbc: 0, ccjc: 0, su: 0, asahi: 0, ito: 0 };
    for (const co of COMPANIES) {
      const fy24val = i < 11 ? companyMonthlyRaw[co].prevYear[i] : fy24Dec[co];
      pt[co] = Math.round(fy24val / fy23Factors[co][i]);
    }
    points.push(pt);
  }

  // FY2024 (12ヶ月): prevYear[0..10] + Dec推定
  for (let i = 0; i < 12; i++) {
    const m = i + 1;
    const label = `24/${String(m).padStart(2, '0')}`;
    const pt: MarketMultiYearPoint = { label, month: m, year: 2024, kbc: 0, ccjc: 0, su: 0, asahi: 0, ito: 0 };
    for (const co of COMPANIES) {
      pt[co] = i < 11 ? companyMonthlyRaw[co].prevYear[i] : fy24Dec[co];
    }
    points.push(pt);
  }

  // FY2025 (11ヶ月): current[0..10]
  for (let i = 0; i < 11; i++) {
    const m = i + 1;
    const label = `25/${String(m).padStart(2, '0')}`;
    const pt: MarketMultiYearPoint = { label, month: m, year: 2025, kbc: 0, ccjc: 0, su: 0, asahi: 0, ito: 0 };
    for (const co of COMPANIES) {
      pt[co] = companyMonthlyRaw[co].current[i];
    }
    points.push(pt);
  }

  return points;
}

function buildMultiYearCumulative(monthly: MarketMultiYearPoint[]): MarketMultiYearPoint[] {
  const cum: Record<string, number> = { kbc: 0, ccjc: 0, su: 0, asahi: 0, ito: 0 };
  let prevYear = 0;
  return monthly.map(p => {
    // 年が変わったらリセット
    if (p.year !== prevYear) {
      for (const co of COMPANIES) cum[co] = 0;
      prevYear = p.year;
    }
    for (const co of COMPANIES) cum[co] += p[co];
    return { ...p, kbc: cum.kbc, ccjc: cum.ccjc, su: cum.su, asahi: cum.asahi, ito: cum.ito };
  });
}

export const marketMultiYearMonthly = buildMultiYearMonthly();
export const marketMultiYearCumulative = buildMultiYearCumulative(buildMultiYearMonthly());
