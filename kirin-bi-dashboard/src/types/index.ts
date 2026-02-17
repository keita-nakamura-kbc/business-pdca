// スライサー状態
export interface SlicerState {
  period: 'monthly' | 'cumulative';
}

// KPI
export interface KpiData {
  label: string;
  value: number;
  unit: string;
  target?: number;
  ratio?: number;
  trend: 'up' | 'down' | 'flat';
  sparkline?: number[];
  drilldownType?: DrilldownType;
}

// テーブル行
export interface TableRow {
  label: string;
  indent?: number;
  values: {
    actual: number | string;
    plan: number | string;
    diff: number | string;
    ratio?: number | string;
    prevYear?: number | string;
    yoyDiff?: number | string;
  };
  isTotal?: boolean;
  isSubtotal?: boolean;
}

// ウォーターフォールデータ
export interface WaterfallSegment {
  name: string;
  value: number;
  type: 'start' | 'positive' | 'negative' | 'total';
}

// BU別データ
export interface BuData {
  buName: string;
  sales: { actual: number; plan: number; diff: number; ratio: number; prevYear?: number };
  volume: { actual: number; plan: number; diff: number; ratio: number };
  variableCostRatio: { actual: number; plan: number; diff: number };
  marginalProfit: { actual: number; plan: number; diff: number; ratio: number };
  directProfit: { actual: number; plan: number; diff: number; ratio: number };
  directProfitRate: { actual: number; plan: number; diff: number };
}

// ブランドデータ
export interface BrandData {
  brandName: string;
  color: string;
  volume: { actual: number; plan: number; ratio: number };
  sales: { actual: number; plan: number; ratio: number };
  profitRate: { actual: number; plan: number; diff: number };
  signal: 'green' | 'yellow' | 'red';
}

// 年間推移データ
export interface TrendDataPoint {
  month: string;
  monthlyActual: number;
  monthlyPlan: number;
  cumActual: number;
  cumPlan: number;
}

// ドリルダウン
export type DrilldownType = 'kpi' | 'brand' | 'waterfall' | 'channel' | 'cost' | null;

export interface DrilldownState {
  isOpen: boolean;
  type: DrilldownType;
  title: string;
  data: Record<string, unknown>;
}

// 条件付き書式
export type ConditionalFormatLevel = 'achieved' | 'warning' | 'missed' | 'none';

// タブ (2タブ構成)
export type TabId = 'trends' | 'drivers';

// ブランドトレンド
export interface BrandTrendPoint {
  period: string;
  values: Record<string, number>;
}

// 変動費高比データ
export interface CostRatioRow {
  buName: string;
  costRatio: { actual: number; plan: number; diff: number };
  impact: number;
  details: string;
}
