"""モックアップの実装ページ一覧を作成"""
import re
from pathlib import Path

mockup_path = Path(r"C:\claudeproject\BIpdca\files\mockup_faithful_v3.html")

with open(mockup_path, "r", encoding="utf-8") as f:
    content = f.read()

# ページセクションを抽出
page_pattern = r'<div class="page-content[^"]*" id="([^"]+)">'
pages = re.findall(page_pattern, content)

print("="*80)
print("モックアップ実装ページ一覧")
print("="*80)

# 各ページのタイトルと参照元資料ページを抽出
for page_id in pages:
    # ページIDの周辺コンテンツを取得
    page_start = content.find(f'id="{page_id}"')
    page_section = content[page_start:page_start+2000]

    # コメントからページ番号を抽出
    comment_match = re.search(r'<!-- Page \d+: ([^(]+)(\(P\.[\d\-,]+\))?', content[max(0, page_start-200):page_start+200])
    if comment_match:
        title = comment_match.group(1).strip()
        page_ref = comment_match.group(2) if comment_match.group(2) else ""
        print(f"\nID: {page_id}")
        print(f"  タイトル: {title}")
        print(f"  元資料: {page_ref}")
    else:
        # section-headerからタイトルを抽出
        header_match = re.search(r'<div class="section-header">([^<]+)</div>', page_section)
        if header_match:
            title = header_match.group(1).strip()
            print(f"\nID: {page_id}")
            print(f"  タイトル: {title}")
            print(f"  元資料: (コメントなし)")
        else:
            print(f"\nID: {page_id}")
            print(f"  タイトル: (不明)")

print("\n" + "="*80)
print(f"合計: {len(pages)} ページ")
print("="*80)

# 詳細統計
print("\n実装ページ統計:")
print(f"  - エグゼクティブサマリ: {'page-executive' in pages}")
print(f"  - 定量サマリ: {'page-quantitative' in pages}")
print(f"  - 連結損益構造: {'page-pl-consolidated' in pages}")
print(f"  - BU別損益: {'page-bu' in pages}")
print(f"  - 年間推移: {'page-trend' in pages}")
print(f"  - ブランド概況: {'page-brand' in pages}")
print(f"  - Appendix: {'page-appendix' in pages}")

# 検証: 基盤ブランド別損益の有無
print("\n未実装ページ候補:")
if '基盤ブランド' not in content:
    print("  - 基盤ブランド別損益 (P.10)")
if '変動費高比分析' not in content:
    print("  - 変動費高比分析 (P.11)")
