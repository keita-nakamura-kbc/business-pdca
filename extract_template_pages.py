"""
定型ページ抽出・データ構造定義スクリプト
BI化対象の定型ページを確定し、データ構造を定義する
"""
import os
import json
from pathlib import Path
from config import get_azure_client, setup_proxy_env

# PDFライブラリの選択
try:
    import pymupdf
    PDF_LIBRARY = "pymupdf"
except ImportError:
    try:
        import pdfplumber
        PDF_LIBRARY = "pdfplumber"
    except ImportError:
        PDF_LIBRARY = None

# 対象PDFファイル
PDF_FILES = [
    r"C:\claudeproject\BIpdca\doc\250819_資料_25年度事業計画_7月度PDCA.pdf",
    r"C:\claudeproject\BIpdca\doc\250924_資料_25年度事業計画_8月度PDCA.pdf",
    r"C:\claudeproject\BIpdca\doc\251126_資料_25年度事業計画_10月度PDCA.pdf",
    r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf",
]

OUTPUT_DIR = Path(r"C:\claudeproject\BIpdca\files")

# 事前分析で特定された定型セクション
KNOWN_SECTIONS = [
    "エグゼクティブサマリ",
    "決算概況",
    "定量サマリ",
    "PL（損益構造）",
    "BU別損益",
    "基盤ブランド別",
    "年間事業利益推移",
    "ブランド概況",
    "プラズマ乳酸菌",
    "午後の紅茶",
    "生茶",
    "本日の論点",
    "Appendix",
]


def extract_page_content_pymupdf(pdf_path: str, page_num: int) -> str:
    """PyMuPDFで特定ページのテキストを抽出"""
    import pymupdf
    doc = pymupdf.open(pdf_path)
    if page_num < 1 or page_num > len(doc):
        doc.close()
        return ""
    text = doc[page_num - 1].get_text()
    doc.close()
    return text


def extract_page_content_pdfplumber(pdf_path: str, page_num: int) -> str:
    """pdfplumberで特定ページのテキストを抽出"""
    import pdfplumber
    with pdfplumber.open(pdf_path) as pdf:
        if page_num < 1 or page_num > len(pdf.pages):
            return ""
        return pdf.pages[page_num - 1].extract_text() or ""


def extract_page_content(pdf_path: str, page_num: int) -> str:
    """特定ページのテキストを抽出"""
    if PDF_LIBRARY == "pymupdf":
        return extract_page_content_pymupdf(pdf_path, page_num)
    elif PDF_LIBRARY == "pdfplumber":
        return extract_page_content_pdfplumber(pdf_path, page_num)
    return ""


def identify_section(text: str) -> str:
    """テキストからセクション名を特定"""
    text_lower = text[:500].lower()
    for section in KNOWN_SECTIONS:
        if section.lower() in text_lower or section in text[:500]:
            return section
    return "不明"


def extract_kpis_from_text(text: str) -> list[str]:
    """テキストからKPI/指標名を抽出"""
    kpi_keywords = [
        "売上収益", "売上高", "事業利益", "営業利益", "限界利益",
        "販売箱数", "販売数量", "売上高単価", "変動費高比", "限界利益単価",
        "直接利益", "EBITDA", "ROI", "ROE", "経常利益",
        "累月", "単月", "対期央", "対前年", "YoY", "MoM",
    ]

    found = []
    for kpi in kpi_keywords:
        if kpi in text:
            found.append(kpi)
    return list(set(found))


def analyze_template_pages_with_gpt(pages_data: list[dict], client) -> str:
    """GPT-5.2を使用して定型ページの詳細仕様を生成"""

    # ページデータを要約
    summary = []
    for page in pages_data[:20]:  # 最初の20ページを分析
        summary.append({
            "page_num": page["page_num"],
            "section": page["section"],
            "kpis": page["kpis"],
            "text_preview": page["text"][:300] if page["text"] else ""
        })

    prompt = f"""以下は月次PDCAレポートの定型ページ情報です。
Power BIダッシュボード化のために、各定型ページの詳細仕様を定義してください。

## 要求事項

1. **各セクションのデータ構造定義**
   - 含まれるKPI/指標の一覧
   - データの粒度（月次/累計/前年比など）
   - 分析軸（BU/ブランド/チャネル/時系列）

2. **Power BI実装仕様**
   - 推奨ビジュアルタイプ（カード、折れ線、棒グラフ、テーブル等）
   - フィルター/スライサー要件
   - DAXメジャー候補

3. **データソース要件**
   - 必要なデータ項目
   - 更新頻度
   - データ連携方法の推奨

ページ情報:
```json
{json.dumps(summary, ensure_ascii=False, indent=2)}
```

マークダウン形式で「定型ページ仕様書」を出力してください。
"""

    response = client.chat.completions.create(
        model="gpt-5.2",
        messages=[{"role": "user", "content": prompt}],
        max_completion_tokens=6000,
        temperature=0.2
    )

    return response.choices[0].message.content


def main():
    """メイン処理"""
    print("=" * 60)
    print("定型ページ抽出・データ構造定義")
    print("=" * 60)

    if PDF_LIBRARY is None:
        print("エラー: PDFライブラリをインストールしてください")
        return

    print(f"使用ライブラリ: {PDF_LIBRARY}")
    print()

    # 構造データを読み込み（compare_pdf_structure.pyの出力）
    structure_json = OUTPUT_DIR / "pdf_structure_raw.json"
    if structure_json.exists():
        with open(structure_json, "r", encoding="utf-8") as f:
            structure_data = json.load(f)
        print(f"構造データを読み込み: {structure_json}")
    else:
        print("警告: 構造データが見つかりません。先にcompare_pdf_structure.pyを実行してください")
        structure_data = None

    # 代表的なPDF（最新の11月度）から詳細抽出
    representative_pdf = PDF_FILES[-1]  # 11月度
    if not os.path.exists(representative_pdf):
        print(f"エラー: 代表PDFが見つかりません: {representative_pdf}")
        return

    print(f"代表PDF: {Path(representative_pdf).name}")
    print()

    # 各ページの内容を抽出
    print("ページ内容を抽出中...")
    pages_data = []

    # ページ数を取得
    if PDF_LIBRARY == "pymupdf":
        import pymupdf
        doc = pymupdf.open(representative_pdf)
        total_pages = len(doc)
        doc.close()
    else:
        import pdfplumber
        with pdfplumber.open(representative_pdf) as pdf:
            total_pages = len(pdf.pages)

    for page_num in range(1, min(total_pages + 1, 51)):  # 最大50ページ
        text = extract_page_content(representative_pdf, page_num)
        section = identify_section(text)
        kpis = extract_kpis_from_text(text)

        pages_data.append({
            "page_num": page_num,
            "section": section,
            "kpis": kpis,
            "text": text,
        })

        if page_num % 10 == 0:
            print(f"  -> {page_num}ページ処理完了")

    print(f"  -> 合計{len(pages_data)}ページ処理完了")
    print()

    # セクション別の集計
    print("-" * 60)
    print("セクション別集計")
    print("-" * 60)

    section_summary = {}
    for page in pages_data:
        section = page["section"]
        if section not in section_summary:
            section_summary[section] = {
                "pages": [],
                "kpis": set()
            }
        section_summary[section]["pages"].append(page["page_num"])
        section_summary[section]["kpis"].update(page["kpis"])

    for section, info in section_summary.items():
        pages = info["pages"]
        kpis = list(info["kpis"])
        print(f"- {section}: ページ {pages[0]}-{pages[-1] if len(pages) > 1 else pages[0]}")
        if kpis:
            print(f"    KPI: {', '.join(kpis[:5])}")

    # GPT-5.2による仕様書生成
    print()
    print("-" * 60)
    print("GPT-5.2による定型ページ仕様書生成")
    print("-" * 60)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    try:
        setup_proxy_env()
        client = get_azure_client("gpt-5.2")

        print("API呼び出し中...")
        specification = analyze_template_pages_with_gpt(pages_data, client)

        # 仕様書を保存
        spec_path = OUTPUT_DIR / "定型ページ仕様書.md"
        with open(spec_path, "w", encoding="utf-8") as f:
            f.write("# 月次PDCAレポート 定型ページ仕様書\n\n")
            f.write("## 作成日\n")
            f.write("2026-01-26\n\n")
            f.write("## 対象資料\n")
            f.write(f"- 代表分析: {Path(representative_pdf).name}\n\n")
            f.write("## セクション一覧\n\n")
            for section, info in section_summary.items():
                f.write(f"### {section}\n")
                f.write(f"- ページ: {info['pages']}\n")
                f.write(f"- KPI: {', '.join(info['kpis']) if info['kpis'] else 'なし'}\n\n")
            f.write("---\n\n")
            f.write("## GPT-5.2 生成仕様\n\n")
            f.write(specification)

        print(f"仕様書を保存: {spec_path}")
        print()
        print("仕様書プレビュー: ファイルを参照してください")

    except Exception as e:
        print(f"API呼び出しエラー: {e}")
        print("ローカル分析結果のみを保存します")

        # ローカル分析のみの仕様書
        spec_path = OUTPUT_DIR / "定型ページ仕様書.md"
        with open(spec_path, "w", encoding="utf-8") as f:
            f.write("# 月次PDCAレポート 定型ページ仕様書（ローカル分析）\n\n")
            f.write("## 作成日\n")
            f.write("2026-01-26\n\n")
            f.write("## 対象資料\n")
            f.write(f"- 代表分析: {Path(representative_pdf).name}\n\n")
            f.write("## セクション一覧\n\n")
            for section, info in section_summary.items():
                f.write(f"### {section}\n")
                f.write(f"- ページ: {info['pages']}\n")
                f.write(f"- KPI: {', '.join(info['kpis']) if info['kpis'] else 'なし'}\n\n")
            f.write("\n※GPT API接続エラーのため、詳細仕様は後で生成してください\n")

        print(f"ローカル分析結果を保存: {spec_path}")

    # ページデータをJSONとして保存
    json_path = OUTPUT_DIR / "template_pages_raw.json"
    export_data = [{
        "page_num": p["page_num"],
        "section": p["section"],
        "kpis": p["kpis"],
        "text_length": len(p["text"])
    } for p in pages_data]

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(export_data, f, ensure_ascii=False, indent=2)
    print(f"ページデータを保存: {json_path}")

    print()
    print("=" * 60)
    print("処理完了")
    print("=" * 60)


if __name__ == "__main__":
    main()
