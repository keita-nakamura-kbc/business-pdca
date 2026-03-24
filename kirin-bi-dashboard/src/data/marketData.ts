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
