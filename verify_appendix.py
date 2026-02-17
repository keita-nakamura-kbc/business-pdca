"""Appendixセクションの詳細検証"""
import pymupdf
import sys
import io
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pdf_path = r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf"
doc = pymupdf.open(pdf_path)

print("="*80)
print("Appendixセクション詳細一覧 (P.30-50)")
print("="*80)

appendix_pages = []

for page_num in range(30, 51):
    page = doc[page_num - 1]
    text = page.get_text()

    # タイトル行を抽出（Appendixの後の行）
    lines = [line.strip() for line in text.split('\n') if line.strip()]

    # Appendixまたは【単社】【連結】などのキーワードを含む行を探す
    title = None
    for i, line in enumerate(lines[:15]):
        if '【' in line and '】' in line and len(line) < 100:
            title = line
            break
        elif 'Appendix' in line and i < len(lines) - 1:
            # 次の行をタイトルとして取得
            next_line = lines[i+1] if i+1 < len(lines) else ""
            if '【' in next_line:
                title = next_line
                break

    if not title and len(lines) > 5:
        # 5行目あたりから探す
        for line in lines[3:10]:
            if len(line) > 10 and len(line) < 100:
                if any(keyword in line for keyword in ['販売', 'PL', '損益', '実績', 'チャネル', 'ブランド', 'コスト', '廃棄', '管理費', '推移', '領域別']):
                    title = line
                    break

    if not title:
        title = "(タイトル不明)"

    appendix_pages.append({
        "page": page_num,
        "title": title,
        "length": len(text)
    })

    print(f"\nP.{page_num}: {title}")

doc.close()

print("\n" + "="*80)
print("Appendixページ数: 21ページ (P.30-50)")
print("="*80)

# 主要なAppendixセクションをリスト化
print("\n主要セクション:")
print("  - P.30: 清涼飲料市場・競合実績・シェア")
print("  - P.32-35: 連結・単社PL詳細")
print("  - P.36: 連結領域別PL")
print("  - P.37-38: 事業利益増減分析")
print("  - P.39-42: 販売実績（ブランド別・容器別・チャネル別）")
print("  - P.43: 原材料コスト")
print("  - P.44: 廃棄・余剰品状況")
print("  - P.45: 一般管理費・固定費等")
print("  - P.47: チャネル別損益")
print("  - P.48-50: その他詳細分析")
