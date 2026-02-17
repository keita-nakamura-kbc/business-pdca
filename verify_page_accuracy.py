"""実装済みページの精度検証"""
import pymupdf
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pdf_path = r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf"
doc = pymupdf.open(pdf_path)

# 検証対象ページ
verification_targets = [
    (4, "エグゼクティブサマリ", [
        "事業利益", "207.1", "億円", "対期央", "△2.9",
        "売上収益", "2,465.7"
    ]),
    (6, "定量サマリ", [
        "売上高", "売上収益", "限界利益", "事業利益",
        "単月", "累月", "対期央", "対前年"
    ]),
    (7, "連結損益構造 (1/2)", [
        "ウォーターフォール", "売上高", "変動費", "限界利益",
        "固定費", "事業利益"
    ]),
    (8, "連結損益構造 (2/2)", [
        "対期央", "対前年", "売上収益"
    ]),
    (9, "BU別損益", [
        "量販", "一般", "NCVS", "DS量販", "EC", "自販機",
        "変動費高比", "限界利益", "直接利益"
    ]),
    (12, "年間事業利益推移", [
        "1Q", "2Q", "3Q", "4Q",
        "期央", "前年実績", "当年実績"
    ]),
    (14, "ブランド概況 - プラズマ乳酸菌", [
        "プラズマ乳酸菌", "iMUSE", "単月", "累月"
    ]),
    (17, "ブランド概況 - 午後の紅茶", [
        "午後の紅茶", "単月", "累月"
    ]),
    (19, "ブランド概況 - 生茶", [
        "生茶", "単月", "累月"
    ]),
]

print("="*80)
print("実装済みページの精度検証")
print("="*80)

for page_num, title, keywords in verification_targets:
    print(f"\nP.{page_num}: {title}")
    print("-" * 80)

    page = doc[page_num - 1]
    text = page.get_text()

    # キーワード存在確認
    found_keywords = []
    missing_keywords = []

    for keyword in keywords:
        if keyword in text:
            found_keywords.append(keyword)
        else:
            missing_keywords.append(keyword)

    print(f"  ✓ 検出キーワード: {len(found_keywords)}/{len(keywords)}")

    if missing_keywords:
        print(f"  ⚠ 未検出キーワード: {', '.join(missing_keywords)}")

    # 主要な数値を抽出（サンプル表示）
    if page_num == 4:
        # エグゼクティブサマリの主要数値
        if "207.1" in text:
            print(f"  → 事業利益: 207.1億円 (確認済み)")
        if "2,465.7" in text:
            print(f"  → 売上収益: 2,465.7億円 (確認済み)")

    # テキストプレビュー（最初の300文字）
    preview = text[:400].replace('\n', ' ').strip()
    if len(preview) > 150:
        preview = preview[:150] + "..."
    print(f"  プレビュー: {preview}")

doc.close()

print("\n" + "="*80)
print("検証完了")
print("="*80)
