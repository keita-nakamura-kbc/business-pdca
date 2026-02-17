"""
Calculate scaled coordinates for SVG transformation
Trend charts: 1600x400 -> 1800x400 (scale factor 1.125)
Market charts: 500x280 -> 900x504 (scale x by 1.8, y by 1.8)
"""

def scale_trend_coords(x, y=None):
    """Scale coordinates for trend charts (1.125x)"""
    if y is None:
        return round(x * 1.125, 1)
    return round(x * 1.125, 1), y  # Y stays the same for trend charts

def scale_market_coords(x, y):
    """Scale coordinates for market charts (1.8x both directions)"""
    return round(x * 1.8, 1), round(y * 1.8, 1)

# Test with some sample coordinates from the first trend chart
print("=== TREND CHART SCALING (1.125x horizontal only) ===")
print("Original x=80 -> New x=", scale_trend_coords(80))
print("Original x=1500 -> New x=", scale_trend_coords(1500))
print("Original x=120 -> New x=", scale_trend_coords(120))
print("Original x=1220 -> New x=", scale_trend_coords(1220))

print("\n=== SAMPLE TREND CHART COORDINATES ===")
# Line coordinates
coords = [
    ("80", "30", "80", "340"),
    ("80", "340", "1500", "340"),
    ("80", "340", "1500", "340"),
    ("80", "263", "1500", "263"),
]

for x1, y1, x2, y2 in coords:
    new_x1 = scale_trend_coords(int(x1))
    new_x2 = scale_trend_coords(int(x2))
    print(f"x1={x1} y1={y1} x2={x2} y2={y2} -> x1={new_x1} y1={y1} x2={new_x2} y2={y2}")

print("\n=== POLYLINE POINTS SCALING ===")
# Example polyline: "120,240 220,230 320,220 420,210 520,200 620,190 720,180 820,170 920,150 1020,130 1120,110 1220,95"
points = "120,240 220,230 320,220 420,210 520,200 620,190 720,180 820,170 920,150 1020,130 1120,110 1220,95"
pairs = points.split()
new_pairs = []
for pair in pairs:
    x, y = pair.split(',')
    new_x = scale_trend_coords(int(x))
    new_pairs.append(f"{new_x},{y}")
print("Original:", points)
print("Scaled:  ", " ".join(new_pairs))

print("\n=== MARKET CHART SCALING (1.8x both directions) ===")
print("Original x=50, y=30 -> New:", scale_market_coords(50, 30))
print("Original x=450, y=250 -> New:", scale_market_coords(450, 250))
