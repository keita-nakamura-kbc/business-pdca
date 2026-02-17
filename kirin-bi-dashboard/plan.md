# MarketPanel: 前年比の好不調を即座に視認できるようにする

## 問題
5社ミニチャートで当年(実線)と前年(点線)が同じコーポレートカラーのため、各社が前年に対して好調か不調か一目で判断しづらい。

## 解決策: 2つの視覚強化

### (A) YoY比率バッジ — 各社タイトル直下に前年比%表示
- 各社のデータから `sum(current) / sum(prevYear) * 100` を算出
- StatusIcon (green/yellow/red dot) + 「前年比 XX%」テキストを achievement色で表示
- 既存の `useConditionalFormat` フックを再利用
- フォントサイズ: 10px、タイトル直下

### (B) チャート背景のサブタイル色 — 好調=緑系 / 不調=赤系
- 各ミニチャートの背景に achievement に応じた超薄い色をつける
  - achieved (≥100%): `rgba(76, 175, 80, 0.06)` (うっすら緑)
  - warning (95-99%): `rgba(255, 152, 0, 0.06)` (うっすらオレンジ)
  - missed (<95%): `rgba(244, 67, 54, 0.06)` (うっすら赤)
- これにより、チャート5個を横並びで見た瞬間に「緑=好調、赤=不調」が分かる

## 変更ファイル

### 1. `src/components/charts/MarketPanel.tsx`
- `useConditionalFormat` フックをインポート
- 各社ごとに YoY 比率を算出するヘルパー追加
- タイトル下に StatusIcon + ratio テキスト表示
- ミニチャートの背景色を achievement に応じて設定

### 2. `src/components/charts/MarketPanel.module.css`
- `.yoyBadge` スタイル追加 (font-size:10px, text-align:center, margin-bottom:2px)
- `.miniChart` に border-radius + overflow:hidden 追加 (背景色が角に合うように)

### データ変更なし
- 既存の `marketByCompanyMonthly` / `marketByCompanyCumulative` をそのまま使用
- YoY比率はコンポーネント内で算出

## 検証
1. `npm run build` エラーなし
2. 各社タイトル下に「前年比 XX%」が緑/黄/赤で表示
3. チャート背景が好調=薄緑、不調=薄赤
4. 単月/累月切替で比率と背景色が連動
