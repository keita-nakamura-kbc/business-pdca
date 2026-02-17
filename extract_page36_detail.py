"""
P.36（【連結】11月累月 領域別PL）の詳細データを抽出
"""
import fitz
import json
from config import get_azure_client, setup_proxy_env

def extract_page36_text():
    """P.36のテキストを抽出"""
    pdf_path = r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf"
    doc = fitz.open(pdf_path)

    # P.36は0-indexedで35番目
    page = doc[35]
    text = page.get_text("text")

    return text

def analyze_with_gpt(text):
    """GPT-5.2でテキストを分析し、テーブルデータを抽出"""
    setup_proxy_env()
    client = get_azure_client("gpt-5.2")

    prompt = f"""以下はPDF P.36「【連結】11月累月 領域別PL」から抽出したテキストです。

このページには、ヘルスサイエンス領域（HS領域）と食領域の2つの領域別損益計算書が含まれています。

以下の情報を抽出してJSON形式で出力してください：

1. テーブルの列構造（どのような列があるか）
2. 各領域（HS領域、食領域、連結合計）の以下の数値：
   - 売上収益（実績、対期央差異、対前年差異）
   - 売上原価（実績、対期央差異、対前年差異）
   - 売上総利益（実績、対期央差異、対前年差異）
   - 販売費及び一般管理費（実績、対期央差異、対前年差異）
   - 事業利益（実績、対期央差異、対前年差異）
   - 事業利益率
   - その他の主要項目があれば全て

3. 販売費及び一般管理費の内訳（広告宣伝費、販売促進費、物流費、人件費、その他）

注意：
- 数値は百万円単位
- マイナス値は「△」記号で表記
- 全ての数値を正確に抽出してください

---
{text}
---

JSON形式で出力してください。"""

    response = client.chat.completions.create(
        model="gpt-5.2",
        messages=[{"role": "user", "content": prompt}],
        max_completion_tokens=4000,
        temperature=0.1
    )

    return response.choices[0].message.content

def main():
    import sys
    sys.stdout.reconfigure(encoding='utf-8')

    print("Extracting P.36 text...")
    text = extract_page36_text()

    # テキストをファイルに保存
    with open(r"C:\claudeproject\BIpdca\files\page36_text.txt", 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"Text saved. Length: {len(text)} characters")

    print("Analyzing with GPT-5.2...")
    analysis = analyze_with_gpt(text)

    print("\n=== Analysis Result ===\n")
    print(analysis)

    # 結果をファイルに保存
    output_file = r"C:\claudeproject\BIpdca\files\page36_detail.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        # GPTの出力がJSON文字列の場合はそのまま保存
        # マークダウンコードブロックで囲まれている場合は除去
        cleaned = analysis.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        f.write(cleaned.strip())

    print(f"\n結果を保存しました: {output_file}")

if __name__ == "__main__":
    main()
