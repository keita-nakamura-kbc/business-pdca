import type { KpiData } from '../types/index';

// 単月 KPI
export const monthlyKpis: KpiData[] = [
  {
    label: '事業利益',
    value: 11.6,
    unit: '億円',
    target: 18.8,
    ratio: 112.8,
    trend: 'up',
    sparkline: [8.2, 12.5, 11.8, 22.3, 19.5, 21.4, 37.5, 36.8, 33.5, 10.6, 11.6],
    drilldownType: 'kpi',
  },
  {
    label: '売上収益',
    value: 205.1,
    unit: '億円',
    target: 210.5,
    ratio: 97.4,
    trend: 'down',
    sparkline: [168, 175, 182, 195, 188, 192, 215, 210, 205, 190, 205],
    drilldownType: 'kpi',
  },
  {
    label: '年間着地見通し',
    value: 199,
    unit: '億円',
    target: 200,
    ratio: 99.5,
    trend: 'flat',
    sparkline: [180, 185, 190, 195, 197, 198, 199, 199, 199, 199, 199],
    drilldownType: 'kpi',
  },
  {
    label: '変動費高比',
    value: 70.5,
    unit: '%',
    target: 69.6,
    ratio: 98.7, // plan/actual*100 (逆指標: lower is better)
    trend: 'down',
    sparkline: [71.2, 70.8, 71.0, 70.2, 69.8, 70.1, 70.5, 70.3, 70.6, 70.8, 70.5],
    drilldownType: 'cost',
  },
  {
    label: '原材料コスト',
    value: 105,
    unit: '百万円',
    trend: 'up',
    drilldownType: 'cost',
  },
];

// 累月 KPI
export const cumulativeKpis: KpiData[] = [
  {
    label: '事業利益',
    value: 207.1,
    unit: '億円',
    target: 210.0,
    ratio: 98.6,
    trend: 'down',
    sparkline: [6, 13, 21, 39, 58, 78.1, 115.6, 152.4, 185.9, 196.5, 207.1],
    drilldownType: 'kpi',
  },
  {
    label: '売上収益',
    value: 2465.7,
    unit: '億円',
    target: 2501.3,
    ratio: 98.6,
    trend: 'down',
    sparkline: [168, 343, 525, 720, 908, 1100, 1315, 1525, 1730, 1920, 2068],
    drilldownType: 'kpi',
  },
  {
    label: '年間着地見通し',
    value: 199,
    unit: '億円',
    target: 200,
    ratio: 99.5,
    trend: 'flat',
    sparkline: [180, 185, 190, 195, 197, 198, 199, 199, 199, 199, 199],
    drilldownType: 'kpi',
  },
  {
    label: '変動費高比',
    value: 70.4,
    unit: '%',
    target: 70.0,
    ratio: 99.4, // plan/actual*100 (逆指標: lower is better)
    trend: 'down',
    sparkline: [71.2, 70.9, 70.7, 70.5, 70.3, 70.2, 70.4, 70.3, 70.5, 70.4, 70.4],
    drilldownType: 'cost',
  },
  {
    label: '原材料コスト',
    value: 1111,
    unit: '百万円',
    trend: 'up',
    drilldownType: 'cost',
  },
];
