// 容器別×ブランド別 3階層データ
// 容器行 actual/planRatio/yoyRatio/salesAmount は salesByContainer から取得
// ブランド行 actual 合計は salesByBrand の actual に完全一致
// 3rd level details は shipmentDetails のアイテムを該当容器にマッピング

export interface BrandDetail {
  label: string;
  actual: number;
  planRatio: number;
  yoyRatio: number;
}

export interface ContainerBrandEntry {
  brandName: string;
  actual: number;        // 千箱
  planRatio: number;
  yoyRatio: number;
  salesAmount?: number;  // 億円
  details?: BrandDetail[];
}

export interface ContainerBrandGroup {
  container: string;
  actual: number;        // 容器合計 千箱 (= salesByContainer value)
  planRatio: number;
  yoyRatio: number;
  salesAmount?: number;  // 億円
  brands: ContainerBrandEntry[];
}

// ── 累月 ──────────────────────────────────────────────
export const containerBrandData: ContainerBrandGroup[] = [
  {
    container: '大型PET', actual: 52340, planRatio: 95.5, yoyRatio: 96.2, salesAmount: 576.2,
    brands: [
      { brandName: '生茶',       actual: 14220, planRatio: 98.5, yoyRatio: 97.0, salesAmount: 243.7,
        details: [
          { label: '大型計', actual: 15660, planRatio: 99, yoyRatio: 84 },
        ],
      },
      { brandName: '午後の紅茶', actual: 7700,  planRatio: 97.2, yoyRatio: 96.8, salesAmount: 309.9 },
      { brandName: '小岩井',     actual: 2100,  planRatio: 96.8, yoyRatio: 105.0, salesAmount: 36.9 },
      { brandName: 'その他',     actual: 3310,  planRatio: 100.5, yoyRatio: 97.2, salesAmount: 58.5 },
      { brandName: 'ファイア',   actual: 950,   planRatio: 96.5, yoyRatio: 94.5, salesAmount: 17.8 },
      { brandName: 'iMUSE',      actual: 310,   planRatio: 95.5, yoyRatio: 117.0, salesAmount: 12.2 },
    ],
  },
  {
    container: '小型PET', actual: 48620, planRatio: 96.9, yoyRatio: 97.8, salesAmount: 2280.1,
    brands: [
      { brandName: '午後の紅茶', actual: 15920, planRatio: 98.5, yoyRatio: 98.0, salesAmount: 640.8,
        details: [
          { label: 'レギュラー3品計', actual: 66162, planRatio: 97, yoyRatio: 100 },
          { label: 'おいしい無糖計', actual: 27258, planRatio: 98, yoyRatio: 109 },
        ],
      },
      { brandName: '生茶',       actual: 12780, planRatio: 96.0, yoyRatio: 99.0, salesAmount: 218.9,
        details: [
          { label: '小型計', actual: 23594, planRatio: 86, yoyRatio: 88 },
          { label: 'ほうじ煎茶計', actual: 10190, planRatio: 93, yoyRatio: 117 },
        ],
      },
      { brandName: 'ファイア',   actual: 5680,  planRatio: 97.5, yoyRatio: 95.8, salesAmount: 106.6 },
      { brandName: 'iMUSE',      actual: 5620,  planRatio: 96.2, yoyRatio: 119.0, salesAmount: 220.7,
        details: [
          { label: '超小型計', actual: 8954, planRatio: 93, yoyRatio: 135 },
          { label: 'イミューズ計', actual: 15287, planRatio: 98, yoyRatio: 112 },
        ],
      },
      { brandName: 'その他',     actual: 4050,  planRatio: 101.5, yoyRatio: 98.2, salesAmount: 71.6 },
      { brandName: '小岩井',     actual: 3370,  planRatio: 97.8, yoyRatio: 103.5, salesAmount: 59.2 },
    ],
  },
  {
    container: '缶', actual: 28450, planRatio: 97.4, yoyRatio: 97.2, salesAmount: 348.4,
    brands: [
      { brandName: 'ファイア',   actual: 12100, planRatio: 97.2, yoyRatio: 95.0, salesAmount: 227.1 },
      { brandName: 'その他',     actual: 2950,  planRatio: 101.0, yoyRatio: 97.5, salesAmount: 52.2 },
      { brandName: '午後の紅茶', actual: 1540,  planRatio: 97.5, yoyRatio: 96.5, salesAmount: 62.0 },
      { brandName: '生茶',       actual: 570,   planRatio: 96.5, yoyRatio: 97.8, salesAmount: 9.8 },
      { brandName: '小岩井',     actual: 290,   planRatio: 96.0, yoyRatio: 103.8, salesAmount: 5.1 },
      { brandName: 'iMUSE',      actual: 250,   planRatio: 95.0, yoyRatio: 118.0, salesAmount: 9.8 },
    ],
  },
  {
    container: '瓶', actual: 8650, planRatio: 97.2, yoyRatio: 102.5, salesAmount: 28.7,
    brands: [
      { brandName: '小岩井',     actual: 1750,  planRatio: 97.5, yoyRatio: 104.8, salesAmount: 30.7 },
      { brandName: 'その他',     actual: 420,   planRatio: 100.8, yoyRatio: 98.0, salesAmount: 7.4 },
      { brandName: '生茶',       actual: 330,   planRatio: 96.8, yoyRatio: 98.0, salesAmount: 5.7 },
      { brandName: '午後の紅茶', actual: 270,   planRatio: 97.0, yoyRatio: 97.0, salesAmount: 10.9 },
      { brandName: 'ファイア',   actual: 130,   planRatio: 96.0, yoyRatio: 94.0, salesAmount: 2.4 },
      { brandName: 'iMUSE',      actual: 30,    planRatio: 94.5, yoyRatio: 116.0, salesAmount: 1.2 },
    ],
  },
  {
    container: '紙パック', actual: 6265, planRatio: 112.9, yoyRatio: 108.5, salesAmount: 20.8,
    brands: [
      { brandName: '小岩井',     actual: 910,   planRatio: 98.0, yoyRatio: 105.0, salesAmount: 16.0 },
      { brandName: '生茶',       actual: 550,   planRatio: 97.5, yoyRatio: 99.0, salesAmount: 9.4 },
      { brandName: 'その他',     actual: 295,   planRatio: 102.0, yoyRatio: 98.5, salesAmount: 5.2 },
      { brandName: '午後の紅茶', actual: 250,   planRatio: 98.8, yoyRatio: 98.0, salesAmount: 10.1 },
      { brandName: 'ファイア',   actual: 60,    planRatio: 96.0, yoyRatio: 93.5, salesAmount: 1.1 },
      { brandName: 'iMUSE',      actual: 30,    planRatio: 95.0, yoyRatio: 117.5, salesAmount: 1.2 },
    ],
  },
];

// ── 単月 ──────────────────────────────────────────────
export const containerBrandDataMonthly: ContainerBrandGroup[] = [
  {
    container: '大型PET', actual: 4820, planRatio: 94.8, yoyRatio: 95.5, salesAmount: 52.4,
    brands: [
      { brandName: '生茶',       actual: 1425, planRatio: 96.8, yoyRatio: 95.5, salesAmount: 22.0,
        details: [
          { label: '大型計', actual: 1168, planRatio: 97, yoyRatio: 81 },
        ],
      },
      { brandName: '午後の紅茶', actual: 760,  planRatio: 99.5, yoyRatio: 101.2, salesAmount: 28.2 },
      { brandName: '小岩井',     actual: 205,  planRatio: 97.5, yoyRatio: 106.2, salesAmount: 3.4 },
      { brandName: 'その他',     actual: 324,  planRatio: 102.0, yoyRatio: 98.0, salesAmount: 5.7 },
      { brandName: 'ファイア',   actual: 91,   planRatio: 95.8, yoyRatio: 93.2, salesAmount: 1.6 },
      { brandName: 'iMUSE',      actual: 30,   planRatio: 96.5, yoyRatio: 120.0, salesAmount: 1.1 },
    ],
  },
  {
    container: '小型PET', actual: 4510, planRatio: 96.2, yoyRatio: 97.0, salesAmount: 207.3,
    brands: [
      { brandName: '午後の紅茶', actual: 1575, planRatio: 100.8, yoyRatio: 102.5, salesAmount: 58.3,
        details: [
          { label: 'レギュラー3品計', actual: 5512, planRatio: 99, yoyRatio: 102 },
          { label: 'おいしい無糖計', actual: 2271, planRatio: 100, yoyRatio: 112 },
        ],
      },
      { brandName: '生茶',       actual: 1280, planRatio: 94.5, yoyRatio: 97.5, salesAmount: 19.9,
        details: [
          { label: '小型計', actual: 1760, planRatio: 84, yoyRatio: 85 },
          { label: 'ほうじ煎茶計', actual: 760, planRatio: 91, yoyRatio: 120 },
        ],
      },
      { brandName: 'ファイア',   actual: 544,  planRatio: 97.0, yoyRatio: 94.5, salesAmount: 9.7 },
      { brandName: 'iMUSE',      actual: 550,  planRatio: 97.2, yoyRatio: 121.5, salesAmount: 20.1,
        details: [
          { label: '超小型計', actual: 962, planRatio: 91, yoyRatio: 140 },
          { label: 'イミューズ計', actual: 1642, planRatio: 96, yoyRatio: 114 },
        ],
      },
      { brandName: 'その他',     actual: 397,  planRatio: 103.0, yoyRatio: 99.0, salesAmount: 6.5 },
      { brandName: '小岩井',     actual: 328,  planRatio: 98.5, yoyRatio: 104.8, salesAmount: 5.4 },
    ],
  },
  {
    container: '缶', actual: 2680, planRatio: 96.8, yoyRatio: 96.5, salesAmount: 31.7,
    brands: [
      { brandName: 'ファイア',   actual: 1158, planRatio: 96.8, yoyRatio: 93.8, salesAmount: 20.6 },
      { brandName: 'その他',     actual: 289,  planRatio: 102.2, yoyRatio: 98.0, salesAmount: 4.8 },
      { brandName: '午後の紅茶', actual: 152,  planRatio: 99.5, yoyRatio: 101.0, salesAmount: 5.6 },
      { brandName: '生茶',       actual: 57,   planRatio: 95.0, yoyRatio: 96.2, salesAmount: 0.9 },
      { brandName: '小岩井',     actual: 28,   planRatio: 97.0, yoyRatio: 104.5, salesAmount: 0.5 },
      { brandName: 'iMUSE',      actual: 24,   planRatio: 96.0, yoyRatio: 119.5, salesAmount: 0.9 },
    ],
  },
  {
    container: '瓶', actual: 790, planRatio: 97.5, yoyRatio: 103.0, salesAmount: 2.6,
    brands: [
      { brandName: '小岩井',     actual: 170,  planRatio: 98.0, yoyRatio: 106.0, salesAmount: 2.8 },
      { brandName: 'その他',     actual: 41,   planRatio: 101.5, yoyRatio: 98.8, salesAmount: 0.7 },
      { brandName: '生茶',       actual: 33,   planRatio: 95.5, yoyRatio: 96.5, salesAmount: 0.5 },
      { brandName: '午後の紅茶', actual: 27,   planRatio: 99.0, yoyRatio: 101.5, salesAmount: 1.0 },
      { brandName: 'ファイア',   actual: 12,   planRatio: 95.0, yoyRatio: 92.5, salesAmount: 0.2 },
      { brandName: 'iMUSE',      actual: 3,    planRatio: 95.5, yoyRatio: 118.0, salesAmount: 0.1 },
    ],
  },
  {
    container: '紙パック', actual: 580, planRatio: 111.5, yoyRatio: 107.8, salesAmount: 1.9,
    brands: [
      { brandName: '小岩井',     actual: 89,   planRatio: 98.8, yoyRatio: 106.5, salesAmount: 1.5 },
      { brandName: '生茶',       actual: 55,   planRatio: 96.0, yoyRatio: 97.5, salesAmount: 0.9 },
      { brandName: 'その他',     actual: 29,   planRatio: 103.0, yoyRatio: 99.0, salesAmount: 0.5 },
      { brandName: '午後の紅茶', actual: 26,   planRatio: 100.0, yoyRatio: 102.5, salesAmount: 0.9 },
      { brandName: 'ファイア',   actual: 5,    planRatio: 95.5, yoyRatio: 92.0, salesAmount: 0.1 },
      { brandName: 'iMUSE',      actual: 3,    planRatio: 96.0, yoyRatio: 119.0, salesAmount: 0.1 },
    ],
  },
];
