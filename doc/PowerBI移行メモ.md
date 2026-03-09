# Power BI 移行 — 実装パターンメモ

> 作成日: 2026-02-20
> Reactモックアップ → Power BI移行の再現性分析結果

---

## 再現度サマリ

| パターン | ツール構成 | 再現度 | 追加コスト |
|----------|-----------|--------|-----------|
| **A. 無料のみ** | ネイティブ + Power KPI Matrix + Multi KPI + Deneb | **85-88%** | 0円 |
| A+. 既存OKVIZ活用 | パターンA + OKVIZ Bullet Chart(導入済) + OKVIZ Sparkline(無料) | **87-90%** | 0円 |
| **B. Zebra BI追加** | パターンA+ + Zebra BI Charts/Tables/Cards | **92-95%** | ~5.80 EUR/月/ユーザー (~950円) |

---

## パターンA: 無料のみ（ネイティブ + 無料カスタムビジュアル）

### 使用ビジュアル一覧

| カテゴリ | ビジュアル | ライセンス | 用途 |
|----------|-----------|-----------|------|
| ネイティブ | 折れ線+集合縦棒グラフ | 組込 | ComboChart |
| ネイティブ | ウォーターフォール図 | 組込 | WaterfallChart |
| ネイティブ | 折れ線グラフ | 組込 | MarketPanel, BuTrend, BrandTrend |
| ネイティブ | マトリックス | 組込 | RegionalPlSummary, SalesBreakdown, BrandSalesTable |
| ネイティブ | 新カードビジュアル (GA) | 組込 | KPIカード |
| ネイティブ | スライサー | 組込 | 単月/累月 + 月選択 |
| ネイティブ | ブックマーク+ボタン | 組込 | タブ切替 |
| ネイティブ | Small Multiples (GA 2024) | 組込 | ミニチャートグリッド |
| 無料カスタム | **Power KPI Matrix** | MS公式/無料 | HeatmapTable, BrandHeatmapTable (KPI+スパークライン+条件付き色) |
| 無料カスタム | **Multi KPI** | MS公式/MIT/無料 | KPIカード代替 (メインKPI+複数スパークライン) |
| 無料カスタム | **Deneb** (Vega/Vega-Lite) | 無料 | 折れ線ポイント別色、データバー重ね掛け等の補完 |
| 既存導入済 | **OKVIZ Bullet Chart** | 社内導入済 | BU実績 vs 計画バー |
| 無料 | **OKVIZ Sparkline** | 無料 | テーブル外スパークライン (ネイティブ制限回避) |

### パネル別マッピング

| Reactコンポーネント | Power BI実装 | 再現度 |
|-------------------|-------------|--------|
| KPI x 5 | Multi KPI or 新カード + DAX SVGスパークライン | 80-85% |
| ComboChart (棒+折れ線2軸) | 折れ線+集合縦棒グラフ | 95% |
| WaterfallChart | ネイティブウォーターフォール + DAX FORMAT(△) | 80% |
| MarketPanel (5社折れ線) | 折れ線グラフ + 定数線 | 95% |
| BuTrend/BrandTrend (ミニチャート3列) | 折れ線 x Small Multiples | 75% |
| HeatmapTable (BU x 5指標+スパークライン) | Power KPI Matrix | 85% |
| BrandHeatmapTable (ブランド x 5指標) | Power KPI Matrix | 85% |
| RegionalPlSummary (展開/折りたたみ) | マトリックス + 条件付き書式 + ネイティブスパークライン | 80% |
| SalesBreakdownPanel (容器+チャネル) | マトリックス + 条件付き書式 | 80% |
| BrandSalesTable (容器>ブランド>詳細 3階層) | マトリックス 3階層ドリルダウン | 80% |
| ドリルダウン (4種) | ドリルスルーページ x 5 | 80% |
| タブ切替 | ブックマーク + ボタン | 95% |
| スライサー (単月/累月 + 月) | スライサービジュアル | 100% |
| CSSホバーツールチップ | ツールチップページ | 75% |
| △記号 / DeltaValue | DAX FORMAT | 90% |
| 5段階条件付き書式 | 条件付き書式ルール | 95% |
| StatusIcon (達成度ドット) | 条件付きアイコン (●/○/◎) | 85% |

### 妥協ポイント (85-88%に留まる理由)

- **ウォーターフォールの△カスタムラベル** — DAX FORMAT近似のみ
- **KPIカードスパークライン** — DAX SVG手動生成 (実現可能だが学習コスト高)
- **ミニチャートの背景ティント・バッジ行** — テキストボックス回避策
- **データバー+ヒートマップ色の重ね掛け** — ヒートマップ色のみ (両方同時は不可)
- **スライドインドリルダウン** — ページ遷移に変更 (アニメーション不可)
- **折れ線ポイント別カラードット** — 単色 (Denebで対応可能)

### ネイティブスパークライン制約

- テーブル/マトリックスの列として追加
- **制限**: 1ビジュアルあたり最大5本、1スパークラインあたり52データポイント、スパークライン有効時最大25列
- HeatmapTableの5指標 x スパークライン = ちょうど5本 (ギリギリ適合)
- 超過する場合は **Power KPI Matrix** (制限なし) を使用

---

## パターンB: Zebra BI追加（有料）

### 追加ビジュアル

| 製品 | 主な機能 | パターンAからの改善点 |
|------|---------|---------------------|
| **Zebra BI Charts** | ウォーターフォール+小計自動挿入、分散チャート、IBCS準拠 | ウォーターフォールの小計+自動差異ラベル+IBCS書式 |
| **Zebra BI Tables** | Formula Editor、小計+コスト反転、列並替、条件付き書式 | 自動差異計算+Formula Editor+コスト反転 |
| **Zebra BI Cards** | 複数KPI統合、スパークライン内蔵、参照ラベル、ドリルスルー | 内蔵スパークライン+自動差異計算+ドリルスルー |

### IBCS準拠のメリット
- Actual = 塗りつぶし棒、Plan = アウトライン棒、前年 = 破線 — 意味が統一される
- パターンAでは個別設定で近似するのに対し、Zebra BIは自動適用

### コスト

| 規模 | 月額 | 年額 |
|------|------|------|
| 1ユーザー | ~5.80 EUR (~950円) | ~69.60 EUR (~11,400円) |
| 10ユーザー | ~58.00 EUR (~9,500円) | ~700 EUR (~115,000円) |

- チームライセンス (10ユーザーパック最小)
- AppSource日本語版あり、ただし国内代理店は未確認
- サポートは英語ベース (support@zebrabi.com)
- Microsoft認定ビジュアル → 組織のPower BI管理者が承認すれば展開可能

### パターンBでも残る妥協点 (92-95%)

- **スライドインドリルダウン** — ページ遷移 (Power BI構造的制約)
- **1920x1080ピクセル精度** — 16:9近似 (~95%精度)
- **ミニチャート背景ティント** — Denebのみ対応可能

---

## 有料ビジュアル比較

| 製品 | WF小計 | KPI+Sparkline | IBCS | コスト | 日本展開 | 備考 |
|------|:------:|:------------:|:----:|--------|---------|------|
| **Zebra BI** | Yes自動 | Yes内蔵 | Yes | ~5.80 EUR/月/ユーザー | AppSource日本語あり | 最も統合的 |
| **Inforiver Analytics+** | Yes 10+種 | Yes 40+スパークライン | Yes | **$95/creator/月** (閲覧者無料) | 不明 | xViz後継。高額 |
| **ZoomCharts Drill Down WF PRO** | Yes自動 | No | No | 有料(要問合せ) | 不明 | WF特化 |
| **KPI by Powerviz** | No | Yes 16レイヤー | No | 有料(30日無料) | 不明 | KPIカード特化、100+テンプレ |
| **OKVIZ Sparkline** | No | Sparklineのみ | No | **無料** | Bullet Chart導入済 | 同ベンダー |

---

## Denebの位置づけ

**「最終手段兼差別化ツール」**

- 戦略: ネイティブ + Power KPI Matrixで85%再現 → Denebで残り10%の妥協点を補完
- 対応可能: ポイント別カラードット、データバー重ね掛け、ミニチャート背景ティント
- 全てをDenebで構築すると保守性が低下
- 学習曲線: 中〜高 (Vega/Vega-Lite JSON仕様の知識が必要)
- リスク: BIチーム内でVegaを理解する人がいないとブラックボックス化
- コミュニティ: 27+テンプレート公開済

---

## Power BI のReactモックアップに対する優位点/劣位点

### 優位点
- **リアルデータ接続** (現状 = 静的JSON → SQL/API直接接続)
- **スライサー/フィルタのクロスインタラクション** — 宣言的 (コード不要)
- **Row Level Security (RLS)**
- **自動更新スケジュール**
- **モバイルレスポンシブレイアウト**
- **エクスポート** (PDF/Excel/PPT)

### 劣位点
- **ピクセル精度レイアウト** — 1920x1080完全適合は困難
- **スライドインドリルダウン** — ページ遷移になる
- **カスタムツールチップ** — ツールチップページはCSS tooltip より柔軟性が低い
- **ポイント別条件付きドット色** — シリーズレベルのみ
- **データバー+ヒートマップ色の重ね掛け** — どちらか一方のみ

---

## ソースURL

### Microsoft公式ドキュメント
- [Power BI ネイティブスパークライン](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-sparklines-tables)
- [Power BI ウォーターフォール図](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-waterfall-charts)
- [新カードビジュアル (GA)](https://powerbi.microsoft.com/en-us/blog/deep-dive-into-the-new-card-visual-in-reports-generally-available/)
- [カードにDAX SVGスパークライン追加](https://kerrykolosko.com/adding-sparklines-to-new-card-visual/)
- [Sparklines リリース計画](https://learn.microsoft.com/en-us/power-platform-release-plan/2021wave2/power-bi/sparklines-table-matrix-visuals)

### 無料カスタムビジュアル
- [Power KPI Matrix](https://github.com/microsoft/PowerBI-visuals-PowerKPIMatrix) — MS公式
- [Multi KPI](https://github.com/microsoft/PowerBI-visuals-MultiKPI) — MS公式/MIT
- [Power KPI](https://appsource.microsoft.com/en-us/product/power-bi-visuals/wa104381083) — MS公式
- [Deneb (Vega/Vega-Lite)](https://deneb-viz.github.io/)
- [Deneb Showcase (27+ templates)](https://github.com/PBI-David/Deneb-Showcase)
- [Deneb Templates](https://github.com/PowerBI-tips/Deneb-Templates)
- [avatorl/Deneb-Vega-Templates](https://github.com/avatorl/Deneb-Vega-Templates)

### OKVIZ (Bullet Chart社内導入済)
- [OKVIZ Bullet Chart](https://okviz.com/bullet-chart/)
- [OKVIZ Sparkline](https://okviz.com/sparkline/) — 無料
- [OKVIZ Card with States](https://marketplace.microsoft.com/en-us/product/power-bi-visuals/wa104380967)
- [OKVIZ Free Visuals (GitHub)](https://github.com/okviz/free-visuals)

### Zebra BI
- [Zebra BI カスタムビジュアル](https://zebrabi.com/power-bi-custom-visuals/)
- [Zebra BI 料金](https://zebrabi.com/pricing/)
- [Zebra BI Cards (日本語AppSource)](https://appsource.microsoft.com/ja-jp/product/power-bi-visuals/zebrabi1634048186304.zebrabicards)

### その他有料ビジュアル
- [Inforiver Analytics+](https://inforiver.com/analytics-plus/) — xViz後継
- [Inforiver 料金](https://inforiver.com/analytics-plus/pricing/)
- [ZoomCharts Drill Down Waterfall PRO](https://zoomcharts.com/en/microsoft-power-bi-custom-visuals/custom-visuals/drill-down-waterfall-visual/)
- [KPI by Powerviz](https://powerviz.ai/kpi)
- [KPI by Powerviz (AppSource)](https://marketplace.microsoft.com/en-us/product/power-bi-visuals/truvizinc1674781244292.kpi-by-powerviz)

### コミュニティ・参考記事
- [Sparkline in matrix (Fabric Community)](https://community.fabric.microsoft.com/t5/Desktop/sparkline-in-matrix/td-p/2923970)
- [How to Create Sparklines (phData)](https://www.phdata.io/blog/how-to-create-sparklines-in-power-bi/)
- [Power BI Matrix Guide (DataCamp)](https://www.datacamp.com/tutorial/power-bi-matrix-a-comprehensive-guide)
