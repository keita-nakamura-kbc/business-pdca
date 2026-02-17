# Layout Optimization Testing Checklist

## Pre-Test Setup

### 1. Browser Configuration
- **Browser**: Chrome or Edge (recommended)
- **Resolution**: Set to 1920×1080
- **Zoom**: 100% (Ctrl+0 to reset)
- **DevTools**: F12 → Console tab (check for errors)

### 2. Open File
```
File: C:\claudeproject\BIpdca\files\mockup_v4_design_prototype.html
Method: Drag to browser or double-click
```

---

## Phase 1 Testing: Layout & Fonts

### Test 1: No Horizontal Scrolling ⬜
**Steps**:
1. Press F11 for fullscreen
2. Navigate through all 9 main tabs
3. Check each Appendix subtab

**Expected**: No horizontal scrollbar on any page
**Status**: ⬜ Pass / ⬜ Fail

---

### Test 2: Font Readability ⬜

#### P.6 定量サマリ
**Font**: Should be 10px (.large-table)
**Check**:
- [ ] Table headers readable
- [ ] Numeric values clear
- [ ] No text overlapping

#### P.30-47 Appendix
**Font**: Should be 11px (.appendix-table)
**Check**:
- [ ] Small tables readable
- [ ] Multi-row headers clear
- [ ] Footer notes visible

#### Other Pages
**Font**: Should be 13px (.data-table)
**Check**:
- [ ] Standard tables comfortable to read
- [ ] Column headers not cramped
- [ ] Numeric alignment correct

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 3: Column Widths ⬜

#### P.6 定量サマリ (単月・累月)
**Expected**:
- Left table (単月): ~48% screen width
- Right table (累月): ~48% screen width
- Gap: 12px

**Check**:
- [ ] Both tables roughly equal width
- [ ] Small gap between tables
- [ ] Tables extend near screen edges

#### P.7-8 連結損益構造
**Expected**: Similar to P.6

**Check**:
- [ ] Waterfall charts side-by-side
- [ ] Equal widths
- [ ] 12px gap

**Status**: ⬜ Pass / ⬜ Fail

---

## Phase 2 Testing: SVG Charts

### Test 4: Trend Chart Resolution ⬜

**Pages to test**: P.14, P.17, P.19

**Steps**:
1. Open P.14 (プラズマ乳酸菌 → 主要トレンド)
2. Right-click chart → Inspect
3. Verify SVG viewBox: `0 0 1800 400`
4. Zoom browser to 150%
5. Check line sharpness

**Expected**:
- [ ] Lines crisp and smooth
- [ ] Text labels not pixelated
- [ ] Data points clearly visible
- [ ] No jagged edges on zoom

**Repeat for**: P.17 (午後の紅茶), P.19 (生茶)

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 5: Market Analysis Chart Resolution ⬜

**Pages to test**: P.15, P.16, P.18, P.20 (12 charts total)

**Steps**:
1. Open P.15 (プラズマ乳酸菌 → 市場分析1)
2. Verify 3 charts visible vertically
3. Right-click top chart → Inspect
4. Verify SVG viewBox: `0 0 900 504`
5. Zoom browser to 200%
6. Check clarity

**Expected**:
- [ ] Weekly data points distinct
- [ ] Grid lines visible but subtle
- [ ] Legend readable
- [ ] Y-axis labels not cut off
- [ ] X-axis labels (週次) clear

**Chart types to verify**:
- [ ] 販売店率 (%) - Top chart
- [ ] 回転数 (本数) - Middle chart
- [ ] 平均販売単価 (円/本) - Bottom chart

**Repeat for**: P.16 (3 charts), P.18 (3 charts), P.20 (3 charts)

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 6: Brand Panel Widths ⬜

**Pages to test**: P.14-20

**Expected**:
- Left panel: 49.5% width
- Right panel: 49.5% width
- Gap: 20px

**Check**:
- [ ] Trend chart (left) wider than before
- [ ] Market analysis charts (right) wider
- [ ] Balanced appearance
- [ ] No content cutoff

**Status**: ⬜ Pass / ⬜ Fail

---

## Comprehensive Page Review

### Main Pages (9 total)

#### ⬜ P.4 エグゼクティブサマリ
- [ ] Brand table visible
- [ ] Considerations text readable
- [ ] KPI cards properly sized

#### ⬜ P.6 定量サマリ
- [ ] 単月 table clear
- [ ] 累月 table clear
- [ ] Font size 10px readable
- [ ] No horizontal scroll

#### ⬜ P.7-8 連結損益構造
- [ ] 単月 waterfall chart visible
- [ ] 累月 waterfall chart visible
- [ ] Equal widths
- [ ] Gap = 12px

#### ⬜ P.9 単社BU別損益
- [ ] Table properly sized
- [ ] Font readable
- [ ] No layout breaks

#### ⬜ P.10 単社ブランド別損益
- [ ] 3-brand table clear
- [ ] Font size comfortable
- [ ] Columns not cramped

#### ⬜ P.11 単社変動費高比分析
- [ ] Left panel (flex: 2) wider
- [ ] Right panel (flex: 1) narrower
- [ ] Gap = 12px
- [ ] Both sections readable

#### ⬜ P.12 連結年間推移
- [ ] Chart centered
- [ ] Font readable
- [ ] No issues

#### ⬜ P.14-20 単社ブランド概況
- [ ] All trend charts sharp
- [ ] All market analysis charts sharp
- [ ] Brand colors correct
- [ ] Navigation works

#### ⬜ P.30-50 Appendix
- [ ] All 7 subtabs accessible
- [ ] Font size 11px readable
- [ ] Tables properly aligned
- [ ] No content overflow

---

## High-DPI Display Testing (Optional)

**If you have a Retina/4K monitor**:

### Test 7: Retina Display Quality ⬜

**Steps**:
1. Open on high-DPI monitor (4K or Retina)
2. Set browser zoom to 100%
3. Check SVG charts

**Expected**:
- [ ] Charts razor-sharp
- [ ] No pixelation on any SVG element
- [ ] Text crisp at all sizes
- [ ] Lines smooth with no stairstep

**Status**: ⬜ Pass / ⬜ Fail / ⬜ N/A (no high-DPI display)

---

## DevTools Verification

### Test 8: CSS Inspection ⬜

**Steps**:
1. Press F12 → Elements tab
2. Find `.main-content` element
3. Check computed styles

**Verify**:
- [ ] padding: 12px (top/bottom)
- [ ] padding: 12px (left/right)

**Find any `.two-column` element**:
- [ ] gap: 12px

**Find `.brand-unified-layout`**:
- [ ] gap: 20px

**Find `.brand-left-panel`**:
- [ ] width: 49.5%

**Find `.large-table`**:
- [ ] font-size: 10px

**Find `.appendix-table`**:
- [ ] font-size: 11px

**Find `.data-table`**:
- [ ] font-size: 13px

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 9: Console Errors ⬜

**Steps**:
1. F12 → Console tab
2. Navigate through all pages
3. Check for errors

**Expected**:
- [ ] No JavaScript errors
- [ ] No CSS errors
- [ ] No resource loading failures

**Status**: ⬜ Pass / ⬜ Fail

---

## Performance Check

### Test 10: Page Load Speed ⬜

**Steps**:
1. F12 → Network tab
2. Reload page (Ctrl+R)
3. Check load time

**Expected**:
- [ ] Initial load < 2 seconds
- [ ] Tab switching instant
- [ ] No lag on scroll

**Status**: ⬜ Pass / ⬜ Fail

---

## Issue Reporting Template

If any test fails, document with this format:

```
Test Failed: [Test Number & Name]
Page: [P.X]
Issue: [Description]
Screenshot: [Path if available]
Browser: [Chrome/Edge version]
Resolution: [Actual resolution]
Suggested Fix: [If known]
```

---

## Sign-Off

### Testing Completed By
**Name**: _______________________
**Date**: _______________________

### Results Summary
- Total tests: 10
- Passed: _______
- Failed: _______
- N/A: _______

### Overall Status
⬜ **Approved** - Ready for production
⬜ **Approved with minor issues** - Document below
⬜ **Rejected** - Requires fixes

### Notes
```
[Add any additional observations or recommendations]
```

---

## Quick Test (5 minutes)

If short on time, run this minimal test:

1. ⬜ Open file in browser
2. ⬜ Press F11 (fullscreen)
3. ⬜ Check for horizontal scrollbar (should be none)
4. ⬜ Navigate to P.6 - verify tables are wider and font is bigger
5. ⬜ Navigate to P.14 - verify trend chart is sharp when zoomed
6. ⬜ Navigate to P.15 - verify market analysis charts are crisp
7. ⬜ Check DevTools console - verify no errors

**Result**: ⬜ Pass / ⬜ Fail

---

## Resources

- **Summary**: `layout_optimization_summary.md`
- **Comparison**: `before_after_comparison.md`
- **SVG Details**: `svg_transformation_report.md`
- **Scaling Script**: `calculate_svg_scaling.py`
