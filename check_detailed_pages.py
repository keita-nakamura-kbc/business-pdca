"""P.10, P.11の詳細確認"""
import pymupdf
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pdf_path = r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf"
doc = pymupdf.open(pdf_path)

for page_num in [10, 11]:
    print(f"\n{'='*80}")
    print(f"P.{page_num} 詳細")
    print(f"{'='*80}")

    page = doc[page_num - 1]
    text = page.get_text()

    # 最初の1500文字を表示
    print(text[:1500])
    print("\n[...]")

    # セクションタイトルを探す
    lines = text.split('\n')
    for i, line in enumerate(lines[:30]):
        line = line.strip()
        if any(keyword in line for keyword in ['【単社】', '【連結】', '決算概況', 'Appendix', 'ブランド']):
            print(f"\n>>> キーワード行 {i+1}: {line}")

doc.close()
