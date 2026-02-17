"""
P.6を画像として抽出して構造を視覚的に確認
"""
import pymupdf
import sys
import io

# UTF-8出力設定
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pdf_path = r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf"
page_num = 6

print("=" * 80)
print(f"P.{page_num} を画像として抽出")
print("=" * 80)

# PDF読み込み
doc = pymupdf.open(pdf_path)
page = doc[page_num - 1]

# 画像として抽出（300dpi）
mat = pymupdf.Matrix(300/72, 300/72)  # 高解像度
pix = page.get_pixmap(matrix=mat)

# 画像を保存
output_path = r"C:\claudeproject\BIpdca\files\page6_screenshot.png"
pix.save(output_path)

print(f"\n✓ 画像を保存しました: {output_path}")
print(f"  サイズ: {pix.width} x {pix.height} ピクセル")

doc.close()
