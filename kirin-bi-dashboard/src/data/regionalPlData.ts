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
