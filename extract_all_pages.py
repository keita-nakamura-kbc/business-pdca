"""全ページの構成を詳細に抽出するスクリプト"""
import pymupdf
import sys
import io
import json

# UTF-8出力設定
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pdf_path = r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf"

doc = pymupdf.open(pdf_path)
total_pages = len(doc)

print(f"総ページ数: {total_pages}")
print("="*80)

all_pages_data = []

for page_num in range(1, total_pages + 1):
    page = doc[page_num - 1]
    text = page.get_text()

    # 最初の600文字からタイトル・セクション情報を抽出
    preview = text[:600].strip()
    lines = [line.strip() for line in preview.split('\n') if line.strip()]

    # ページ情報を収集
    page_info = {
        "page_num": page_num,
        "first_lines": lines[:10] if len(lines) >= 10 else lines,
        "text_length": len(text),
        "has_tables": "対期央" in text or "対前年" in text or "実績" in text
    }

    all_pages_data.append(page_info)

    # コンソール出力
    print(f"\nP.{page_num}")
    print("-" * 80)
    for i, line in enumerate(page_info["first_lines"][:8], 1):
        if len(line) > 80:
            line = line[:77] + "..."
        print(f"  {line}")

    # 主要キーワードをチェック
    keywords = []
    if "エグゼクティブサマリ" in text[:300]:
        keywords.append("[エグゼクティブサマリ]")
    if "定量サマリ" in text[:300] or "定量分析" in text[:300]:
        keywords.append("[定量分析]")
    if "損益構造" in text[:300]:
        keywords.append("[損益構造]")
    if "BU別" in text[:300]:
        keywords.append("[BU別]")
    if "変動費高比分析" in text[:300]:
        keywords.append("[変動費高比分析]")
    if "ブランド概況" in text[:300]:
        keywords.append("[ブランド概況]")
    if "本日の論点" in text[:300]:
        keywords.append("[論点]")
    if "Appendix" in text[:300] or "参考資料" in text[:300]:
        keywords.append("[Appendix]")
    if "年間事業利益推移" in text[:400] or "月別利益推移" in text[:400]:
        keywords.append("[年間推移]")

    if keywords:
        print(f"  >>> {' '.join(keywords)}")

doc.close()

# JSON出力
output_path = r"C:\claudeproject\BIpdca\files\all_pages_structure.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(all_pages_data, f, ensure_ascii=False, indent=2)

print("\n" + "="*80)
print(f"JSON出力: {output_path}")
