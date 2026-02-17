"""
PDF構造比較スクリプト
4カ月分のPDCAレポートPDFの構造一貫性を検証する
"""
import os
import json
from pathlib import Path
from config import get_azure_client, setup_proxy_env

# PDFライブラリの選択（pymupdf優先、なければpdfplumber）
try:
    import pymupdf  # PyMuPDF
    PDF_LIBRARY = "pymupdf"
except ImportError:
    try:
        import pdfplumber
        PDF_LIBRARY = "pdfplumber"
    except ImportError:
        PDF_LIBRARY = None
        print("警告: PyMuPDFまたはpdfplumberをインストールしてください")
        print("pip install pymupdf  または  pip install pdfplumber")

# 対象PDFファイル
PDF_FILES = [
    r"C:\claudeproject\BIpdca\doc\250819_資料_25年度事業計画_7月度PDCA.pdf",
    r"C:\claudeproject\BIpdca\doc\250924_資料_25年度事業計画_8月度PDCA.pdf",
    r"C:\claudeproject\BIpdca\doc\251126_資料_25年度事業計画_10月度PDCA.pdf",
    r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf",
]

OUTPUT_DIR = Path(r"C:\claudeproject\BIpdca\files")


def extract_pdf_structure_pymupdf(pdf_path: str) -> dict:
    """PyMuPDFを使用してPDFの構造を抽出"""
    import pymupdf

    doc = pymupdf.open(pdf_path)
    structure = {
        "file_name": Path(pdf_path).name,
        "total_pages": len(doc),
        "pages": []
    }

    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()

        # ページの最初の数行（タイトル部分）を抽出
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        title_lines = lines[:5] if lines else []

        page_info = {
            "page_num": page_num + 1,
            "title_lines": title_lines,
            "text_length": len(text),
            "has_tables": "※" in text or "%" in text,  # 表の簡易判定
        }
        structure["pages"].append(page_info)

    doc.close()
    return structure


def extract_pdf_structure_pdfplumber(pdf_path: str) -> dict:
    """pdfplumberを使用してPDFの構造を抽出"""
    import pdfplumber

    with pdfplumber.open(pdf_path) as pdf:
        structure = {
            "file_name": Path(pdf_path).name,
            "total_pages": len(pdf.pages),
            "pages": []
        }

        for page_num, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            tables = page.extract_tables()

            lines = [line.strip() for line in text.split('\n') if line.strip()]
            title_lines = lines[:5] if lines else []

            page_info = {
                "page_num": page_num + 1,
                "title_lines": title_lines,
                "text_length": len(text),
                "has_tables": len(tables) > 0,
                "table_count": len(tables),
            }
            structure["pages"].append(page_info)

    return structure


def extract_pdf_structure(pdf_path: str) -> dict:
    """PDFの構造を抽出（利用可能なライブラリを使用）"""
    if PDF_LIBRARY == "pymupdf":
        return extract_pdf_structure_pymupdf(pdf_path)
    elif PDF_LIBRARY == "pdfplumber":
        return extract_pdf_structure_pdfplumber(pdf_path)
    else:
        raise RuntimeError("PDFライブラリが利用できません")


def analyze_structure_with_gpt(structures: list[dict], client) -> str:
    """GPT-5.1を使用して構造パターンを比較分析"""

    # 構造情報を要約（トークン節約）
    summary = []
    for s in structures:
        month_info = {
            "file": s["file_name"],
            "pages": s["total_pages"],
            "page_titles": []
        }
        for p in s["pages"]:
            if p["title_lines"]:
                month_info["page_titles"].append({
                    "page": p["page_num"],
                    "title": p["title_lines"][0] if p["title_lines"] else ""
                })
        summary.append(month_info)

    prompt = f"""以下は4カ月分の月次PDCAレポートPDFの構造情報です。
各月の構造パターンを比較分析し、以下の点を明確にしてください：

1. **共通する定型ページ**: 全月で一貫して存在するセクション
2. **ページ構成の一致率**: どの程度構造が一致しているか（%）
3. **非定型ページ**: 月によって異なる部分
4. **BI化推奨ページ**: 定型性が高くBI化に適したページの特定

PDFの構造情報:
```json
{json.dumps(summary, ensure_ascii=False, indent=2)}
```

分析結果をマークダウン形式で出力してください。
"""

    response = client.chat.completions.create(
        model="gpt-5.1",
        messages=[{"role": "user", "content": prompt}],
        max_completion_tokens=4000,
        temperature=0.3
    )

    return response.choices[0].message.content


def compare_page_titles(structures: list[dict]) -> dict:
    """ページタイトルを比較して一致率を計算"""
    if not structures:
        return {}

    # 各ページ番号ごとにタイトルを収集
    page_titles = {}
    max_pages = max(s["total_pages"] for s in structures)

    for page_num in range(1, max_pages + 1):
        titles = []
        for s in structures:
            page_info = next((p for p in s["pages"] if p["page_num"] == page_num), None)
            if page_info and page_info["title_lines"]:
                titles.append(page_info["title_lines"][0])
            else:
                titles.append("")
        page_titles[page_num] = titles

    # 一致率の計算
    consistent_pages = 0
    for page_num, titles in page_titles.items():
        non_empty = [t for t in titles if t]
        if non_empty and len(set(non_empty)) == 1:
            consistent_pages += 1

    return {
        "total_pages": max_pages,
        "consistent_pages": consistent_pages,
        "consistency_rate": round(consistent_pages / max_pages * 100, 1) if max_pages > 0 else 0,
        "page_titles": page_titles
    }


def main():
    """メイン処理"""
    print("=" * 60)
    print("PDF構造比較分析")
    print("=" * 60)

    if PDF_LIBRARY is None:
        print("エラー: PDFライブラリをインストールしてください")
        return

    print(f"使用ライブラリ: {PDF_LIBRARY}")
    print()

    # 各PDFの構造を抽出
    structures = []
    for pdf_path in PDF_FILES:
        if not os.path.exists(pdf_path):
            print(f"警告: ファイルが見つかりません: {pdf_path}")
            continue

        print(f"処理中: {Path(pdf_path).name}")
        try:
            structure = extract_pdf_structure(pdf_path)
            structures.append(structure)
            print(f"  -> {structure['total_pages']}ページ")
        except Exception as e:
            print(f"  -> エラー: {e}")

    if not structures:
        print("処理可能なPDFがありません")
        return

    print()
    print("-" * 60)
    print("ローカル分析: ページタイトル比較")
    print("-" * 60)

    # ローカルでの比較分析
    comparison = compare_page_titles(structures)
    print(f"総ページ数（最大）: {comparison['total_pages']}")
    print(f"一致ページ数: {comparison['consistent_pages']}")
    print(f"構造一致率: {comparison['consistency_rate']}%")

    # 構造データをJSONとして保存
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    structure_data = {
        "structures": structures,
        "comparison": comparison
    }

    json_path = OUTPUT_DIR / "pdf_structure_raw.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(structure_data, f, ensure_ascii=False, indent=2)
    print(f"\n構造データを保存: {json_path}")

    # GPT-5.1による分析
    print()
    print("-" * 60)
    print("GPT-5.1による構造分析")
    print("-" * 60)

    try:
        setup_proxy_env()
        client = get_azure_client("gpt-5.1")

        print("API呼び出し中...")
        analysis = analyze_structure_with_gpt(structures, client)

        # 分析結果を保存
        md_path = OUTPUT_DIR / "資料構造分析_詳細.md"
        with open(md_path, "w", encoding="utf-8") as f:
            f.write("# 月次PDCAレポート 構造比較分析\n\n")
            f.write("## 分析概要\n\n")
            f.write(f"- 対象ファイル数: {len(structures)}\n")
            f.write(f"- 構造一致率（ローカル計算）: {comparison['consistency_rate']}%\n\n")
            f.write("## GPT-5.1 分析結果\n\n")
            f.write(analysis)

        print(f"分析結果を保存: {md_path}")
        print()
        print("分析結果: ファイルを参照してください")

    except Exception as e:
        print(f"API呼び出しエラー: {e}")
        print("ローカル分析結果のみを保存します")

        # ローカル分析のみの結果を保存
        md_path = OUTPUT_DIR / "資料構造分析_詳細.md"
        with open(md_path, "w", encoding="utf-8") as f:
            f.write("# 月次PDCAレポート 構造比較分析（ローカル分析のみ）\n\n")
            f.write("## 分析概要\n\n")
            f.write(f"- 対象ファイル数: {len(structures)}\n")
            f.write(f"- 構造一致率: {comparison['consistency_rate']}%\n\n")
            f.write("## 各月のページ数\n\n")
            for s in structures:
                f.write(f"- {s['file_name']}: {s['total_pages']}ページ\n")
            f.write("\n※GPT API接続エラーのため、詳細分析は後で実施してください\n")

        print(f"ローカル分析結果を保存: {md_path}")

    print()
    print("=" * 60)
    print("処理完了")
    print("=" * 60)


if __name__ == "__main__":
    main()
