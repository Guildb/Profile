#!/usr/bin/env bash
set -euo pipefail

# Run this against the original, full-resolution source photos
# (public/dark-background.jpg and public/light-background.jpg before any
# resizing) to regenerate both the WebP and JPEG variants from scratch.

# Backgrounds are used as full-bleed CSS layers; 1920px wide is ample.
# The originals are 4000x3000 and 3577x2370, which is print resolution.
# q=72 and q=65 both left light-background.webp over 200KB in practice
# (these are detail-heavy photos), so quality was lowered further until
# both backgrounds cleared the budget.
cwebp -q 35 -resize 1920 0 public/dark-background.jpg  -o public/dark-background.webp
cwebp -q 35 -resize 1920 0 public/light-background.jpg -o public/light-background.webp

# The portrait is displayed at ~240px wide; 640px covers 2x displays.
cwebp -q 82 public/profile-web.jpg -o public/profile-web.webp

# Shrink the JPEG <picture> fallbacks too - resizing alone (sips
# --resampleWidth) left them at 700KB+ each because it doesn't touch JPEG
# compression quality. These fallbacks only load in browsers without WebP
# support, so a lower quality here is an acceptable trade for payload size.
sips --resampleWidth 1920 public/dark-background.jpg  --out public/dark-background.jpg
sips --resampleWidth 1920 public/light-background.jpg --out public/light-background.jpg
sips -s formatOptions 30 public/dark-background.jpg  --out public/dark-background.jpg
sips -s formatOptions 30 public/light-background.jpg --out public/light-background.jpg

echo "--- resulting sizes ---"
ls -lh public/*.webp public/*.jpg
