import sys
sys.stdout.reconfigure(encoding='utf-8')
import fitz
import json

pdf_path = r"C:\claudeproject\BIpdca\doc\251216_資料_25年度事業計画_11月度PDCA.pdf"
doc = fitz.open(pdf_path)
page = doc[35]

# Get text with layout preservation
text = page.get_text("text", sort=True)
print("=== SORTED TEXT ===")
print(text)
print("\n=== TABLE EXTRACTION ===")

# Try extracting tables
tables = page.find_tables()
for i, table in enumerate(tables):
    print(f"\n--- Table {i} ---")
    data = table.extract()
    for row in data:
        print(" | ".join([str(c) if c else "" for c in row]))
