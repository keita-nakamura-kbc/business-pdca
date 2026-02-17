"""
P.6（定量サマリ）の元資料データを抽出して、現在のHTMLと比較
"""
import pymupdf
import sys
import io

# UTF-8出力設定
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pdf_path = r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf"
page_num = 6

print("=" * 80)
print(f"P.{page_num} 定量サマリのデータ抽出")
print("=" * 80)

# PDF読み込み
doc = pymupdf.open(pdf_path)
page = doc[page_num - 1]

# テキスト抽出
text = page.get_text()
print("\n■ 抽出テキスト:")
print(text)
print("\n" + "=" * 80)

# テーブル抽出を試みる
try:
    # pdfplumberで詳細なテーブル抽出
    import pdfplumber

    with pdfplumber.open(pdf_path) as pdf:
        page_plumber = pdf.pages[page_num - 1]

        # テーブル抽出
        tables = page_plumber.extract_tables()

        if tables:
            print(f"\n■ テーブル数: {len(tables)}")
            for i, table in enumerate(tables):
                print(f"\n--- テーブル {i+1} ---")
                for row in table:
                    print(" | ".join([str(cell) if cell else "" for cell in row]))
        else:
            print("\n※ テーブルが検出されませんでした")

except ImportError:
    print("\n※ pdfplumberがインストールされていないため、詳細なテーブル抽出はスキップされました")
    print("※ インストール方法: pip install pdfplumber")

doc.close()
