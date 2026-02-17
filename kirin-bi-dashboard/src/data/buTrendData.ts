// BU月別売上推移データ（億円）
// 累月合計はbuHeatmapDataと整合:
//   量販: 892.5億 (計画925.3億, 前年865.0億)
//   CVS: 412.3億 (計画420.5億, 前年400.0億)
//   自販機: 298.6億 (計画311.1億, 前年290.0億)

export interface BuMonthlyPoint {
  month: string;
  ryohan: number;
  ryohanTarget: number;
  ryohanPrev: number;
  cvs: number;
  cvsTarget: number;
  cvsPrev: number;
  jihan: number;
  jihanTarget: number;
  jihanPrev: number;
}

export const buMonthlySales: BuMonthlyPoint[] = [
  { month: '1月',  ryohan: 66.0, ryohanTarget: 68.5, ryohanPrev: 64.0, cvs: 30.5, cvsTarget: 31.0, cvsPrev: 29.5, jihan: 16.0, jihanTarget: 17.5, jihanPrev: 15.5 },
  { month: '2月',  ryohan: 63.5, ryohanTarget: 66.0, ryohanPrev: 61.5, cvs: 29.0, cvsTarget: 30.0, cvsPrev: 28.0, jihan: 15.5, jihanTarget: 17.0, jihanPrev: 15.0 },
  { month: '3月',  ryohan: 70.0, ryohanTarget: 72.5, ryohanPrev: 67.5, cvs: 32.5, cvsTarget: 33.0, cvsPrev: 31.5, jihan: 19.0, jihanTarget: 20.5, jihanPrev: 18.5 },
  { month: '4月',  ryohan: 82.0, ryohanTarget: 85.0, ryohanPrev: 79.5, cvs: 38.0, cvsTarget: 38.5, cvsPrev: 37.0, jihan: 27.0, jihanTarget: 28.5, jihanPrev: 26.0 },
  { month: '5月',  ryohan: 87.0, ryohanTarget: 90.0, ryohanPrev: 84.5, cvs: 40.0, cvsTarget: 40.5, cvsPrev: 38.5, jihan: 31.0, jihanTarget: 32.5, jihanPrev: 30.0 },
  { month: '6月',  ryohan: 91.0, ryohanTarget: 94.5, ryohanPrev: 88.5, cvs: 42.0, cvsTarget: 43.0, cvsPrev: 40.5, jihan: 34.5, jihanTarget: 36.0, jihanPrev: 33.5 },
  { month: '7月',  ryohan: 100.0, ryohanTarget: 103.5, ryohanPrev: 97.0, cvs: 46.0, cvsTarget: 47.0, cvsPrev: 44.5, jihan: 41.0, jihanTarget: 43.0, jihanPrev: 40.0 },
  { month: '8月',  ryohan: 97.5, ryohanTarget: 101.0, ryohanPrev: 94.5, cvs: 45.0, cvsTarget: 46.0, cvsPrev: 43.5, jihan: 39.5, jihanTarget: 41.5, jihanPrev: 38.5 },
  { month: '9月',  ryohan: 85.0, ryohanTarget: 88.0, ryohanPrev: 83.0, cvs: 39.5, cvsTarget: 40.5, cvsPrev: 38.5, jihan: 31.0, jihanTarget: 32.5, jihanPrev: 30.0 },
  { month: '10月', ryohan: 78.0, ryohanTarget: 81.0, ryohanPrev: 76.5, cvs: 36.0, cvsTarget: 37.0, cvsPrev: 35.0, jihan: 24.5, jihanTarget: 26.0, jihanPrev: 23.5 },
  { month: '11月', ryohan: 72.5, ryohanTarget: 75.3, ryohanPrev: 68.5, cvs: 33.8, cvsTarget: 34.0, cvsPrev: 33.5, jihan: 19.6, jihanTarget: 16.1, jihanPrev: 19.5 },
];
// 累月合計: 量販=892.5(計画925.3,前年865.0), CVS=412.3(計画420.5,前年400.0), 自販機=298.6(計画311.1,前年290.0) ✓

// 累月（各月累計）
function computeCumulative(monthly: BuMonthlyPoint[]): BuMonthlyPoint[] {
  let rCum = 0, rTCum = 0, rPCum = 0, cCum = 0, cTCum = 0, cPCum = 0, jCum = 0, jTCum = 0, jPCum = 0;
  return monthly.map(m => {
    rCum += m.ryohan; rTCum += m.ryohanTarget; rPCum += m.ryohanPrev;
    cCum += m.cvs; cTCum += m.cvsTarget; cPCum += m.cvsPrev;
    jCum += m.jihan; jTCum += m.jihanTarget; jPCum += m.jihanPrev;
    return {
      month: m.month,
      ryohan: Math.round(rCum * 10) / 10,
      ryohanTarget: Math.round(rTCum * 10) / 10,
      ryohanPrev: Math.round(rPCum * 10) / 10,
      cvs: Math.round(cCum * 10) / 10,
      cvsTarget: Math.round(cTCum * 10) / 10,
      cvsPrev: Math.round(cPCum * 10) / 10,
      jihan: Math.round(jCum * 10) / 10,
      jihanTarget: Math.round(jTCum * 10) / 10,
      jihanPrev: Math.round(jPCum * 10) / 10,
    };
  });
}

export const buCumulativeSales: BuMonthlyPoint[] = computeCumulative(buMonthlySales);
