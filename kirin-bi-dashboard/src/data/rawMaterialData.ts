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
