"""P.11-12の内容を確認するスクリプト"""
import pymupdf
import sys
import io

# UTF-8出力設定
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pdf_path = r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf"

doc = pymupdf.open(pdf_path)

for page_num in [11, 12]:
    print(f"\n{'='*70}")
    print(f"ページ {page_num}")
    print(f"{'='*70}")

    page = doc[page_num - 1]
    text = page.get_text()

    # 最初の800文字を表示
    print(text[:800])
    print("\n...")

    # 「変動費高比分析」というキーワードをチェック
    if "変動費高比分析" in text:
        print("\n>>> '変動費高比分析' が見つかりました！")
        # 該当箇所の前後を表示
        idx = text.find("変動費高比分析")
        print(text[max(0, idx-50):idx+100])
    else:
        print("\n>>> '変動費高比分析' は見つかりませんでした")

doc.close()
