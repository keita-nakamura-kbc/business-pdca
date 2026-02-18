# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Kirin Beverage monthly PDCA dashboard — React + Recharts, fixed 1920×1080 viewport.

## Build & Dev

**Windows gotcha**: `cd` doesn't work in bash for Windows paths. Use:
```bash
powershell.exe -Command "Set-Location 'C:\claudeproject\BIpdca\kirin-bi-dashboard'; npm run build 2>&1 | Out-String"
powershell.exe -Command "Set-Location 'C:\claudeproject\BIpdca\kirin-bi-dashboard'; npm run dev 2>&1 | Out-String"
powershell.exe -Command "Set-Location 'C:\claudeproject\BIpdca\kirin-bi-dashboard'; npm run lint 2>&1 | Out-String"
```
- `npm run build` = `tsc -b && vite build` (type-check + bundle)
- `npm run dev` → http://localhost:5173
- `npm run lint` = `eslint .` (ESLint 9 flat config)
- `npm run preview` → serve production build locally
- No test framework configured — there are no tests

**TypeScript strict mode**: `noUnusedLocals` and `noUnusedParameters` are enabled — unused variables/imports cause **build failures**. Remove them before building. **`verbatimModuleSyntax`** is enabled — type-only imports must use `import type { X }` (not `import { X }`).

**Project config**: ESM (`"type": "module"` in package.json). HTML uses `lang="ja"` and `<meta name="viewport" content="width=1920">`.

## Deployment

- **GitHub**: `keita-nakamura-kbc/business-pdca`
- **Render Static Site**: Root Directory = `kirin-bi-dashboard`, Build Command = `npm install && npm run build`, Publish Directory = `dist`
- `git push origin main` triggers automatic deploy

## Tech Stack

- **React 19.2** + **TypeScript ~5.9.3** + **Vite 7.3.1**
- **Recharts 3.7.0** — all charts (bar, line, waterfall, heatmap, combo)
- **lucide-react 0.563** — icons (tree-shakeable)
- **ESLint 9** — flat config format (`eslint.config.js`)
- **CSS Modules** + global design tokens (`src/styles/global.css`)
- Fixed **1920×1080** viewport, no scrolling

## Architecture

### Component Hierarchy

```
App.tsx (1920×1080 fixed, flex column)
├── TopBar (44px) — red K logo, 2 tab buttons (業績トレンド / 要因分析), calendar
├── SlicerBar (28px) — 単月/累月 toggle + 対象月セレクタ (1〜11月)
├── <main> (flex:1, overflow:hidden)
│   ├── TrendsTab (業績トレンド)
│   └── DriversTab (要因分析)
└── DrilldownPanel (480px slide-in overlay, right side)
    └── 5 types: Kpi / Brand / Waterfall / Channel / Cost
```

Total header height: 76px → content area: 1004px.

### TrendsTab Layout — 連結 focus (2×3 grid)

| Row | Height | Col 1 | Col 2 | Col 3 |
|-----|--------|-------|-------|-------|
| Top | 100px | 5 KpiCards + キーメッセージ (spans full width) |||
| Upper | flex:1 | ComboChart | WaterfallChart | BuTrendChart |
| Lower | flex:1 | MarketPanel | RegionalPlSummary | BrandTrendChart |

### DriversTab Layout — 単社 analysis (2×2 grid)

Left panels use `chartPanelThird` (flex: 1) for wide heatmaps, right panels use `chartPanelNarrow` (flex: 0.55).

| Row | Left (wide) | Right (narrow) |
|-----|------------|----------------|
| 上段 BU | HeatmapTable (BU×5指標+セル内スパークライン) | SalesBreakdownPanel (容器別+チャネル別) |
| 下段 Brand | BrandHeatmapTable (ブランド×5指標+セル内スパークライン) | BrandSalesTable (容器>ブランド>詳細 3階層) |

### State Management (3 hooks)

- **useSlicer** → `{ period: 'monthly' | 'cumulative', selectedMonth: number }` — toggles data sources + selects target month (1-12, default 11)
- **useDrilldown** → open/close 480px panel with type-based routing (`DrilldownType`)
- **useConditionalFormat** → `ratio → 'achieved' | 'warning' | 'missed' | 'none'`

### Data Layer

All static data in `src/data/`, barrel-exported via `index.ts`. Most datasets have monthly + cumulative variants.

| File | Contents |
|------|----------|
| `kpiData.ts` | monthlyKpis, cumulativeKpis (5 KPI cards each) |
| `plData.ts` | consolidatedPlMonthlyVsPlan, consolidatedPlCumulativeVsPlan, waterfallMonthly, waterfallCumulative, plItemTrends |
| `buData.ts` | buHeatmapData, buHeatmapDataMonthly, variableCostImpactMonthly/Cumulative (+Total variants) |
| `brandData.ts` | brandCards, brandPerformanceDetails, shipmentDetails, shipmentDetailsMonthly |
| `brandTrendData.ts` | brandMonthlySales, brandCumulativeSales |
| `brandMetricData.ts` | brandMetricData, brandMetricDataMonthly (BrandMetricRow[] — 5指標) |
| `trendData.ts` | annualTrendData (12-month combo chart) |
| `costData.ts` | priceVarianceDataMonthly, priceVarianceDataCumulative |
| `buTrendData.ts` | buMonthlySales, buCumulativeSales (3BU月別売上推移 億円) |
| `appendixData.ts` | regionalPlData, salesByBrand/Container/Channel (monthly+cumulative), containerChannelData, rawMaterialData, rawMaterialCostTotal, channelPlData, channelSummary, marketMultiYearMonthly/Cumulative (3-year market data). Defines `SalesDetailRow`, `RegionalPlRow`, `MarketShareData`, `MarketMultiYearPoint` interfaces. Legacy `MarketTrendPoint`/`marketTrendMonthly`/`marketTrendCumulative` still exported but unused by components |
| `containerBrandData.ts` | containerBrandData, containerBrandDataMonthly (ContainerBrandGroup[] — 容器>ブランド>詳細 3階層) |
| `brandIcons.ts` | Shield(purple)=プラズマ/iMUSE, Coffee(red)=午後の紅茶, Leaf(green)=生茶 |

### File Organization

```
kirin-bi-dashboard/src/
├── components/
│   ├── layout/      TopBar, SlicerBar, DrilldownPanel
│   ├── common/      KpiCard, StatusIcon, DeltaValue, SectionHeader, Sparkline, DataTable, CustomTooltip
│   ├── charts/      ComboChart, WaterfallChart, HeatmapTable, BrandHeatmapTable,
│   │                BuTrendChart, BrandTrendChart, SalesBreakdownPanel, BrandSalesTable,
│   │                MarketPanel, RegionalPlSummary, heatmapUtils
│   ├── drilldown/   KpiDrilldown, BrandDrilldown, PlRowDrilldown,
│   │                ChannelDrilldown, CostDrilldown, BrandMarketCharts
│   └── tabs/        TrendsTab, DriversTab
├── hooks/           useSlicer, useDrilldown, useConditionalFormat
├── data/            Static data files (see table above)
├── types/           index.ts (all TypeScript types)
└── styles/          global.css (CSS variables, reset, utilities)
```

## Key Patterns

### Shared Components
- **StatusIcon** — green/yellow/red circle based on achievement level
- **DeltaValue** — renders negative values with △ symbol (not -)
- **SectionHeader** — lucide icon + title + optional subtitle, consistent styling. `interactive` prop adds 深堀 badge (only for panels with actual drilldown: WaterfallChart, BrandHeatmapTable, SalesBreakdownPanel)
- **Sparkline** — tiny inline SVG line chart, supports dual-line (data + data2 props)
- **KpiCard** — value + unit + ratio + sparkline, clickable → drilldown

### Heatmap Tables with In-Cell Sparklines

HeatmapTable and BrandHeatmapTable display a 5-metric grid (販売数量/売上高/売上収益/限界利益/直接利益). Each cell contains:
- StatusIcon dot + ratio% (or actual value for 売上高) + DeltaValue diff
- **Sparkline (36×14px)** inline next to values, showing the metric's monthly ratio trend

SparklineData structure: `Record<string, Record<string, number[]>>` — `sparklineData[entityName][metricKey]`.
Data is generated via `generateRatioTrend()` in DriversTab.tsx from final ratio values with seasonal variation + noise.

### Shared Heatmap Utilities (`heatmapUtils.tsx`)

Common functions used by 5 components:
- `getCellColor(ratio)` — HeatmapTable, BrandHeatmapTable
- `getCellBg(ratio)` — RegionalPlSummary, SalesBreakdownPanel, BrandSalesTable
- `barGradient(actual, colMax)` — HeatmapTable, BrandHeatmapTable
- `CellDot` component — HeatmapTable, BrandHeatmapTable
- `metrics` / `MetricDef` — HeatmapTable, BrandHeatmapTable

### Heatmap Color Convention (HeatmapTable, BrandHeatmapTable, RegionalPlSummary)
- `ratio ≥ 105` → strong green
- `100 ≤ ratio < 105` → light green
- `95 ≤ ratio < 100` → light orange
- `90 ≤ ratio < 95` → light red
- `ratio < 90` → strong red

Cost items use inverted semantics: `isCostItem: true` means actual < plan is good (ratios pre-inverted in data).

### CSS Architecture
- CSS Modules co-located with components (`.module.css`)
- Global tokens in `src/styles/global.css`: 8px spacing grid, color palette, shadows
- Conditional format classes: `.cf-achieved` (green), `.cf-warning` (yellow), `.cf-missed` (red)

### CSS Pitfall: No flex on `<td>`
Never apply `display: flex` directly to `<td>` elements — it overrides `display: table-cell` and breaks table layout. Instead, use an inner `<div>` wrapper with `display: inline-flex` (respects parent `text-align`). See RegionalPlSummary's `.cellContent` or HeatmapTable's cell wrapper for the correct pattern.

### CSS Pitfall: Flex-filling tables
Tables inside flex containers need explicit `height: 100%` on `<table>` to fill available space — without it, the table collapses to content height and leaves empty space below. Height cascade: flex panel → wrapper (`flex:1; min-height:0`) → overflow container (`overflow-y:auto`) → `<table height="100%">`. Used by RegionalPlSummary, SalesBreakdownPanel, BrandSalesTable.

### Recharts Tooltip Typing Pitfall
Recharts 3.x types `Tooltip formatter` value as `number | undefined`. Custom formatters need:
```tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
formatter={(value: any, name: any) => [`${Number(value).toFixed(1)} 億円`, name]}
```

### Mini-Chart Grid Pattern (BuTrendChart, BrandTrendChart)
Side-by-side `ResponsiveContainer + LineChart` in a flex row:
- `.chartGrid` (flex row, gap: 4px, flex: 1, min-height: 0)
- `.miniChart` (flex: 1, flex-column) — background tinted by achievement
- Y-axis only on first chart (`idx === 0`); others `<YAxis hide width={0} />`
- X-axis shows only quarter markers (1月/4月/7月/10月)
- Each mini-chart: colorDot + title → badge(s) → chart area (flex: 1)
- BrandTrendChart and BuTrendChart have no drilldown (info-only / hover tooltip)

### MarketPanel — Unified 3-Year Chart
Single `ResponsiveContainer + LineChart` with 5 company `<Line>` series (KBC/CCJC/SU/A/I):
- 3 fiscal years (FY2023–2025, ~35 data points): X-axis labels `23/01` → `25/11`
- `ReferenceLine` at year boundaries (`24/01`, `25/01`) with dashed stroke
- Company legend row + YoY badge row (StatusIcon + achievement-colored ratio) above chart
- Cumulative mode: year-based reset (sawtooth pattern via `buildMultiYearCumulative`)
- Data source: `marketMultiYearMonthly` / `marketMultiYearCumulative` (`MarketMultiYearPoint` from `appendixData.ts`)

### BU Hover Tooltip Pattern (HeatmapTable, BuTrendChart)
Instead of opening a drilldown panel, BU entities show CSS hover tooltips with `BuTooltipContent`. The tooltip displays a compact summary: 売上高/限界利益/直接利益/変動費高比/直接利益率 with StatusIcon achievement colors. BuTrendChart receives a `buDetails` prop (`BuData[]`) for tooltip data.

### Drilldown Entry Points (4 total)

| Trigger | Tab | DrilldownType | Visual Hint |
|---------|-----|---------------|-------------|
| KpiCard (5 cards) | Trends | `kpi` / `cost` | ChevronRight icon |
| WaterfallChart bar click | Trends | `waterfall` | cursor:pointer + 深堀 badge |
| BrandHeatmapTable cell (4 brands) | Drivers | `brand` | cursor:pointer + 深堀 badge |
| SalesBreakdownPanel child row | Drivers | `channel` | cursor:pointer + 深堀 badge |

Other chart interactions are info-only: BuTrendChart/HeatmapTable use CSS hover tooltips, RegionalPlSummary/BrandSalesTable use expand/collapse only, BrandTrendChart has no interaction.

### DRILLABLE_BRANDS Filtering
Only brands with deep data trigger brand drilldowns: 生茶, 午後の紅茶, iMUSE, プラズマ乳酸菌. Other brands (ファイア, 小岩井, その他) are non-interactive (no click handler, no cursor pointer). Filtering is applied in DriversTab.tsx (BrandHeatmapTable only — BrandSalesTable has no drilldown).

### BrandDrilldown (Simplified)
Contains only BrandMarketCharts (販売店率/回転数/平均販売単価) + 出荷実績内訳. No overview table, no fallback path for brands without deep data.

### CostDrilldown (KPI-Based Routing)
Content splits by source KPI (`data.kpi.label`):
- **変動費高比** → 変動費影響 + 売上高単価差異 tables
- **原材料コスト** → 原材料動向 table only
No accordion/expand-collapse — all sections always visible.

### Data Bar Pattern (RegionalPlSummary)
Value cells combine two background layers via inline style:
- `backgroundColor`: heatmap color from `getCellBg(ratio)` (achievement 5-level)
- `backgroundImage`: `linear-gradient(to right, rgba(27,50,90,0.07) 0% barWidth%, transparent barWidth%)` — bar width = `|value| / colMax * 100`, normalized per column, excluding `isRate` rows

### Key Types (`src/types/index.ts`)
- `TabId = 'trends' | 'drivers'`
- `DrilldownType = 'kpi' | 'brand' | 'waterfall' | 'channel' | 'cost' | null`
- `SlicerState = { period: 'monthly' | 'cumulative', selectedMonth: number }`
- `KpiData`, `TableRow`, `WaterfallSegment`, `BuData`, `BrandData`, `TrendDataPoint`, `CostRatioRow`

### Types in `src/data/` (not in types/index.ts)
- `BrandMetricRow` (brandMetricData.ts) — brand × 5 metrics (volume/sales/marginalProfit/directProfit)
- `RegionalPlRow` (appendixData.ts) — 13-row P&L with hs/food/consolidated values + planRatio/yoyRatio. Cost items have pre-inverted ratios.
- `SalesDetailRow` (appendixData.ts) — brand sales detail with actual/plan/ratio/yoy + salesAmount/salesPlanRatio
- `MarketMultiYearPoint` (appendixData.ts) — 3-year market data (label/month/year + 5 company values in 万箱). `MarketShareData`, `MarketTrendPoint` also exported (legacy, unused by components)
- `BuMonthlyPoint` (buTrendData.ts) — BU monthly sales with target/prev year per BU
- `ContainerBrandGroup` / `ContainerBrandEntry` / `BrandDetail` (containerBrandData.ts) — 容器>ブランド>詳細 3階層データ

## Critical Constraints

- **No fake data**: Only real brands/BU names from source PDFs
  - Allowed: 生茶, 午後の紅茶, ファイア, iMUSE, 小岩井, プラズマ乳酸菌, おい免, 国産水
  - Allowed BUs: 量販BU, CVS BU, 自販BU, 受託BU, EC BU, NCVS
  - Banned: 淡麗グリーンラベル, キリンレモン, トロピカーナ, 永昌源, 小岩井乳業(企業名)
- **△ symbol for negatives** (DeltaValue component handles this automatically)
- **Achievement colors**: ratio ≥100% → green, 95-99% → yellow, <95% → red
- **Fiscal year**: January start (calendar year). "11月累月" = Jan–Nov cumulative.
- **1920×1080 fit**: No scrolling on primary views; only drilldown panels scroll vertically.

## Non-Source Files

Dead code has been cleaned up — no known unused component files remain. **Reference artifacts** (not actively developed): `files/` (HTML mockups, JSON structure), `doc/` (source PDFs), `*.py` (root — PDF extraction scripts).

**`.gitignore` notes**: `config.py` (Azure API keys) and `doc/*.pdf` (confidential) are excluded — do not commit these files.

## Development Workflows

### Adding a new chart
1. Create component in `src/components/charts/` with `.module.css`
2. Accept `height` prop + interaction: either `onDrilldown` callback (opens drilldown panel) or data prop for CSS hover tooltips (see BuTrendChart's `buDetails` pattern)
3. Import data from `src/data/` (provide monthly + cumulative variants)
4. Add to the appropriate tab (TrendsTab or DriversTab)

### Adding a new drilldown type
1. Add to `DrilldownType` union in `src/types/index.ts`
2. Create component in `src/components/drilldown/`
3. Add `case` in `renderDrilldownContent()` in `App.tsx`
4. Wire up click handler in the parent chart/card

### Adding new data
1. Create or extend a file in `src/data/`
2. Provide both monthly and cumulative variants if the slicer should affect it
3. Export from `src/data/index.ts`
4. Select the correct variant based on `slicer.period === 'monthly'` in the tab component
