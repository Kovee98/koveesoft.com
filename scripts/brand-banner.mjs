// Writes an SVG banner that reproduces the navy `.home-art` background from app/assets/site.css
// at any size, so it matches the site exactly: node brand-banner.mjs <width> <height> <out.svg>
import { writeFileSync } from 'node:fs'

const [w, h] = process.argv.slice(2, 4).map(Number)
const out = process.argv[4]
const r = (n) => +n.toFixed(2)

// CSS linear-gradient(<deg>) runs along a line through the center, long enough to reach the corners.
function cssLine(id, deg, stops) {
  const a = (deg * Math.PI) / 180
  const dx = Math.sin(a), dy = -Math.cos(a)
  const half = (Math.abs(w * dx) + Math.abs(h * dy)) / 2
  const [x1, y1, x2, y2] = [w / 2 - dx * half, h / 2 - dy * half, w / 2 + dx * half, h / 2 + dy * half].map(r)
  return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops}</linearGradient>`
}
const facet = (at, opacity) =>
  `<stop offset="${at}" stop-color="#fff" stop-opacity="0"/><stop offset="${at}" stop-color="#fff" stop-opacity="${opacity}"/>`

// CSS `ellipse at 60% 50%` defaults to farthest-corner: the farthest-side ellipse scaled by sqrt(2).
const cx = w * 0.6, cy = h * 0.5
const rx = Math.SQRT2 * Math.max(cx, w - cx), ry = Math.SQRT2 * Math.max(cy, h - cy)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    ${cssLine('base', 160, '<stop stop-color="#13294f"/><stop offset="1" stop-color="#0c1a33"/>')}
    <radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="${r(cx)}" cy="${r(cy)}" r="${r(rx)}" gradientTransform="translate(${r(cx)} ${r(cy)}) scale(1 ${+(ry / rx).toFixed(5)}) translate(${r(-cx)} ${r(-cy)})"><stop stop-color="#1d3f7a"/><stop offset=".7" stop-color="#1d3f7a" stop-opacity="0"/></radialGradient>
    ${cssLine('f62', 62, facet(0.7, 0.0235))}
    ${cssLine('f118', 118, facet(0.58, 0.0353))}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#base)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect width="${w}" height="${h}" fill="url(#f62)"/>
  <rect width="${w}" height="${h}" fill="url(#f118)"/>
</svg>
`
writeFileSync(out, svg)
