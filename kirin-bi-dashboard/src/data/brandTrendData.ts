// ブランド月別売上推移データ（億円）
// 累月合計はbrandCardsと整合:
//   プラズマ乳酸菌: 245.0億 (計画256.2億, 前年207.0億)
//   午後の紅茶: 1033.5億 (計画1033.5億, 前年1060.0億)
//   生茶: 487.5億 (計画545.8億, 前年496.0億)

export interface BrandMonthlyPoint {
  month: string;
  plasma: number;
  plasmaTarget: number;
  plasmaPrev: number;
  gogo: number;
  gogoTarget: number;
  gogoPrev: number;
  namacha: number;
  namachaTarget: number;
  namachaPrev: number;
}

export const brandMonthlySales: BrandMonthlyPoint[] = [
  { month: '1月',  plasma: 18.0, plasmaTarget: 19.0, plasmaPrev: 15.0, gogo: 78.0, gogoTarget: 80.0, gogoPrev: 80.0, namacha: 30.0, namachaTarget: 35.0, namachaPrev: 30.5 },
  { month: '2月',  plasma: 17.5, plasmaTarget: 18.5, plasmaPrev: 14.5, gogo: 75.0, gogoTarget: 76.0, gogoPrev: 77.0, namacha: 28.0, namachaTarget: 33.0, namachaPrev: 28.5 },
  { month: '3月',  plasma: 19.0, plasmaTarget: 20.0, plasmaPrev: 16.0, gogo: 82.0, gogoTarget: 82.0, gogoPrev: 84.0, namacha: 32.0, namachaTarget: 38.0, namachaPrev: 32.5 },
  { month: '4月',  plasma: 22.0, plasmaTarget: 23.0, plasmaPrev: 18.5, gogo: 95.0, gogoTarget: 94.0, gogoPrev: 97.5, namacha: 48.0, namachaTarget: 52.0, namachaPrev: 49.0 },
  { month: '5月',  plasma: 24.0, plasmaTarget: 25.0, plasmaPrev: 20.5, gogo: 100.0, gogoTarget: 98.0, gogoPrev: 102.5, namacha: 52.0, namachaTarget: 56.0, namachaPrev: 53.0 },
  { month: '6月',  plasma: 25.0, plasmaTarget: 26.0, plasmaPrev: 21.0, gogo: 105.0, gogoTarget: 102.0, gogoPrev: 107.5, namacha: 55.0, namachaTarget: 58.0, namachaPrev: 56.0 },
  { month: '7月',  plasma: 28.0, plasmaTarget: 30.0, plasmaPrev: 24.0, gogo: 115.0, gogoTarget: 112.0, gogoPrev: 118.0, namacha: 58.0, namachaTarget: 62.0, namachaPrev: 59.0 },
  { month: '8月',  plasma: 27.5, plasmaTarget: 29.0, plasmaPrev: 23.5, gogo: 112.0, gogoTarget: 110.0, gogoPrev: 115.0, namacha: 56.0, namachaTarget: 60.0, namachaPrev: 57.0 },
  { month: '9月',  plasma: 23.0, plasmaTarget: 24.0, plasmaPrev: 19.5, gogo: 98.0, gogoTarget: 96.0, gogoPrev: 100.5, namacha: 48.0, namachaTarget: 52.0, namachaPrev: 49.0 },
  { month: '10月', plasma: 21.0, plasmaTarget: 22.2, plasmaPrev: 17.5, gogo: 90.0, gogoTarget: 90.0, gogoPrev: 92.0, namacha: 42.0, namachaTarget: 50.0, namachaPrev: 43.0 },
  { month: '11月', plasma: 20.0, plasmaTarget: 19.5, plasmaPrev: 17.0, gogo: 83.5, gogoTarget: 93.5, gogoPrev: 86.0, namacha: 38.5, namachaTarget: 49.8, namachaPrev: 38.5 },
];
// 累月合計: プラズマ=245.0(計画256.2,前年207.0), 午後=1033.5(計画1033.5,前年1060.0), 生茶=487.5(計画545.8,前年496.0) ✓

// 累月（各月累計）
function computeCumulative(monthly: BrandMonthlyPoint[]): BrandMonthlyPoint[] {
  let pCum = 0, pTCum = 0, pPCum = 0, gCum = 0, gTCum = 0, gPCum = 0, nCum = 0, nTCum = 0, nPCum = 0;
  return monthly.map(m => {
    pCum += m.plasma; pTCum += m.plasmaTarget; pPCum += m.plasmaPrev;
    gCum += m.gogo; gTCum += m.gogoTarget; gPCum += m.gogoPrev;
    nCum += m.namacha; nTCum += m.namachaTarget; nPCum += m.namachaPrev;
    return {
      month: m.month,
      plasma: Math.round(pCum * 10) / 10,
      plasmaTarget: Math.round(pTCum * 10) / 10,
      plasmaPrev: Math.round(pPCum * 10) / 10,
      gogo: Math.round(gCum * 10) / 10,
      gogoTarget: Math.round(gTCum * 10) / 10,
      gogoPrev: Math.round(gPCum * 10) / 10,
      namacha: Math.round(nCum * 10) / 10,
      namachaTarget: Math.round(nTCum * 10) / 10,
      namachaPrev: Math.round(nPCum * 10) / 10,
    };
  });
}

export const brandCumulativeSales: BrandMonthlyPoint[] = computeCumulative(brandMonthlySales);
