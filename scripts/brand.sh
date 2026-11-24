#!/usr/bin/env bash
# Regenerates every logo asset (website icons, social card, profile pictures) from logo.svg.
#
#   ./scripts/brand.sh
#
# Needs Inkscape 1.x, ImageMagick 7 (`magick`), Node, and `npm ci`. Set INKSCAPE or
# LOGO_LAYER (the Inkscape layer name holding the mark, default "K") to override.
set -euo pipefail

cd "$(dirname "$0")/.."
layer_label="${LOGO_LAYER:-K}"
tmp=".cache/brand"

find_inkscape() {
  if [[ -n "${INKSCAPE:-}" ]]; then echo "$INKSCAPE"; return; fi
  if command -v inkscape >/dev/null 2>&1; then command -v inkscape; return; fi
  local p
  for p in "/c/Program Files/Inkscape/bin/inkscape.com" \
           "/Applications/Inkscape.app/Contents/MacOS/inkscape"; do
    if [[ -x "$p" ]]; then echo "$p"; return; fi
  done
  echo "Inkscape not found. Install it or set INKSCAPE=/path/to/inkscape" >&2
  exit 1
}
INKSCAPE="$(find_inkscape)"
command -v magick >/dev/null || { echo "ImageMagick 7 ('magick') not found" >&2; exit 1; }
[[ -d node_modules/svgo ]] || { echo "Run 'npm ci' first" >&2; exit 1; }

ink() { "$INKSCAPE" "$@" 2>/dev/null; }
# Renders an SVG at 4x and downsamples; supersampling gives cleaner edges than a direct render.
render() { # svg size out.png
  ink "$1" -w $(($2 * 4)) -h $(($2 * 4)) --export-filename="$tmp/big.png"
  magick "$tmp/big.png" -filter Lanczos -resize "$2x$2" -strip "$3"
}
# Centers the mark on a square background, filling `percent` of the width.
compose() { # size percent background out.png
  local k=$(($1 * $2 / 100))
  render "$tmp/mark.svg" "$k" "$tmp/k.png"
  magick -size "$1x$1" "xc:$3" "$tmp/k.png" -gravity center -composite -strip "$4"
}

rm -rf "$tmp"; mkdir -p "$tmp" design/avatars

layer_id="$(node -e '
  const s = require("fs").readFileSync("logo.svg", "utf8")
  for (const [g] of s.matchAll(/<g\b[^>]*>/g)) {
    if (/inkscape:groupmode="layer"/.test(g) && g.includes(`inkscape:label="${process.argv[1]}"`)) {
      console.log(/\bid="([^"]+)"/.exec(g)[1]); process.exit(0)
    }
  }
  process.exit(1)' "$layer_label")" || { echo "No layer labeled \"$layer_label\" in logo.svg" >&2; exit 1; }

echo "Exporting layer \"$layer_label\" ($layer_id) from logo.svg"
ink logo.svg --export-id="$layer_id" --export-id-only --export-area-drawing --export-plain-svg \
  --export-filename="$tmp/layer.svg"
# Ungrouping bakes every layer transform into the path coordinates.
flatten="select-all:all;selection-ungroup;selection-ungroup;selection-ungroup;selection-ungroup;select-all:all"
ink "$tmp/layer.svg" --actions="$flatten;export-filename:$tmp/facets.svg;export-plain-svg;export-do"
ink "$tmp/layer.svg" --actions="$flatten;path-union;export-filename:$tmp/outline.svg;export-plain-svg;export-do"

echo "Writing SVGs"
node scripts/brand-mark.mjs "$tmp/facets.svg" "$tmp/outline.svg" "$tmp"
cp "$tmp/favicon.svg" "$tmp/studio-mark.svg" public/

echo "Writing PNGs"
render public/favicon.svg 48 "$tmp/fav48.png"
render public/favicon.svg 32 "$tmp/fav32.png"
render public/favicon.svg 16 "$tmp/fav16.png"
magick "$tmp/fav16.png" "$tmp/fav32.png" "$tmp/fav48.png" public/favicon.ico
compose 180 70 white public/apple-touch-icon.png
compose 512 84 white public/logo-512.png
compose 1080 60 white design/avatars/avatar-white-1080.png
compose 1080 60 "#f1f4f8" design/avatars/avatar-light-1080.png
compose 1080 60 "#0f1d33" design/avatars/avatar-dark-1080.png
compose 1080 60 none design/avatars/avatar-transparent-1080.png
render "$tmp/mark.svg" 2048 design/avatars/mark-transparent-2048.png
ink design/social-card.svg -w 1200 -h 630 --export-filename=public/social-card.png

rm -rf "$tmp"
cat <<'EOF'

Done. Updated:
  public/favicon.svg, favicon.ico, apple-touch-icon.png, studio-mark.svg, logo-512.png, social-card.png
  design/avatars/avatar-{white,light,dark,transparent}-1080.png  (profile pictures)
  design/avatars/mark-transparent-2048.png  (just the K, no padding, for other uses)

To publish the website:
  git add -A && git commit -m "Update logo" && git push
  gh release create X.Y.Z --title X.Y.Z --generate-notes
EOF
