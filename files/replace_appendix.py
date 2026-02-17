#!/usr/bin/env python3
# Script to replace appendix sections in mockup_faithful_v3.html

# Read the original file
with open(r'C:\claudeproject\BIpdca\files\mockup_faithful_v3.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Read the replacement content
with open(r'C:\claudeproject\BIpdca\files\appendix_replacement.html', 'r', encoding='utf-8') as f:
    replacement_lines = f.readlines()

# Lines to replace: 2545-4247 (1-indexed), so in 0-indexed it's 2544-4246
# Keep lines 0-2544, insert replacement, then keep lines 4247-end

output_lines = lines[0:2544] + replacement_lines + lines[4247:]

# Write the output
with open(r'C:\claudeproject\BIpdca\files\mockup_faithful_v3.html', 'w', encoding='utf-8') as f:
    f.writelines(output_lines)

print(f"Replacement complete!")
print(f"Original lines 2545-4247 ({4247-2545+1} lines) replaced with {len(replacement_lines)} lines")
print(f"New total lines: {len(output_lines)}")
