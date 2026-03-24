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

// チャネル別サマリ（チャート用：トップレベルチャネルのみ）
export interface ChannelSummaryItem {
  name: string;
  sales: number;          // 百万円
  directProfitRate: number; // %
}

// チャネル別サマリ（単月 チャート用）
export const channelSummaryMonthly: ChannelSummaryItem[] = [
  { name: '手売り計', sales: 23200, directProfitRate: 11.8 },
  { name: '自販機計', sales: 5350, directProfitRate: 15.2 },
  { name: 'ドライ計', sales: 28550, directProfitRate: 12.5 },
  { name: 'チルド', sales: 870, directProfitRate: 9.5 },
  { name: 'OEM', sales: 280, directProfitRate: 20.5 },
  { name: '海外', sales: 120, directProfitRate: 17.0 },
];

export const channelSummary: ChannelSummaryItem[] = channelPlData
  .filter(r => r.isTotal || (!r.indent && !r.isGrandTotal))
  .map(r => ({ name: r.channel, sales: r.sales, directProfitRate: r.directProfitRate }));
