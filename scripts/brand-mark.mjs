// Builds the web SVGs for the logo from two Inkscape plain-SVG exports of the K layer:
// facets (all paths, transforms flattened) and outline (their union).
// Usage: node scripts/brand-mark.mjs <facets.svg> <outline.svg> <out-dir>
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { optimize } from 'svgo'

const [facetsFile, outlineFile, outDir] = process.argv.slice(2)
if (!outDir) {
  console.error('Usage: node scripts/brand-mark.mjs <facets.svg> <outline.svg> <out-dir>')
  process.exit(1)
}

function readPaths(file) {
  let svg = readFileSync(file, 'utf8')
  // Keep only the fill so SVGO can merge and shorten paths freely.
  svg = svg.replace(/\sstyle="([^"]*)"/g, (_, style) => {
    const fill = /(?:^|;)\s*fill\s*:\s*([^;]+)/.exec(style)
    return fill ? ` fill="${fill[1].trim()}"` : ''
  })
  const { data } = optimize(svg, {
    multipass: true,
    floatPrecision: 3,
    plugins: ['preset-default'],
  })
  const viewBox = /viewBox="([^"]+)"/.exec(data)?.[1]
  const paths = [...data.matchAll(/<path\b([^>]*?)\/?>/g)].map(([, attrs]) => ({
    d: /\bd="([^"]+)"/.exec(attrs)?.[1],
    fill: /\bfill="([^"]+)"/.exec(attrs)?.[1] ?? '#000',
    transform: /\btransform="/.test(attrs),
  }))
  if (!viewBox || !paths.length || paths.some(p => !p.d || p.transform)) {
    throw new Error(`${file}: expected flattened paths with a viewBox`)
  }
  return { viewBox: viewBox.split(/[\s,]+/).map(Number), paths }
}

const facets = readPaths(facetsFile)
const outline = readPaths(outlineFile)
const [x, y, w, h] = facets.viewBox
const size = Math.max(w, h)
const round = n => +n.toFixed(3)

// Hide the light hairlines anti-aliasing leaves on shared facet edges: a solid backing in the
// facets' average color sits underneath, each facet gets a thin stroke in its own color so
// neighbors overlap, and the clip keeps the outer edge exact.
const hex = c => /^#[0-9a-f]{6}$/i.test(c) ? [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)) : null
const rgbs = facets.paths.map(p => hex(p.fill)).filter(Boolean)
const backing = rgbs.length
  ? '#' + [0, 1, 2].map(i => Math.round(rgbs.reduce((s, c) => s + c[i], 0) / rgbs.length).toString(16).padStart(2, '0')).join('')
  : '#000'
const outlineD = outline.paths.map(p => p.d).join('')
const seam = round(size * 0.0015)
const body = [
  `<clipPath id="k"><path d="${outlineD}"/></clipPath>`,
  `<g clip-path="url(#k)" stroke-width="${seam}" stroke-linejoin="round">`,
  `<path fill="${backing}" d="${outlineD}"/>`,
  ...facets.paths.map(p => `<path fill="${p.fill}" stroke="${p.fill}" d="${p.d}"/>`),
  '</g>',
].join('\n')

function write(name, padRatio, px) {
  const pad = size * padRatio
  const box = [x - pad - (size - w) / 2, y - pad - (size - h) / 2, size + 2 * pad, size + 2 * pad].map(round)
  const dims = px ? ` width="${px}" height="${px}"` : ''
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"${dims} viewBox="${box.join(' ')}">\n<title>Koveesoft</title>\n${body}\n</svg>\n`
  writeFileSync(join(outDir, name), svg)
  console.log(`  ${name} (${svg.length} bytes)`)
}

write('mark.svg', 0)
write('favicon.svg', 0.02)
// width/height make Inkscape rasterize it sharply when the social card embeds it.
write('studio-mark.svg', 0.1025, 340)
