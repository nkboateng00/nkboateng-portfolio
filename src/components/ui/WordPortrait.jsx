import { useEffect, useRef } from 'react'

/*
  A typographic portrait: the photo redrawn entirely in words.

  1. Words are set in rows across the silhouette (each run of a row starts on a
     fresh word). Every fifteenth row is a larger "feature" row with the key words.
  2. The letters are then filled with the photo's own tones (source-in), after
     the tones have been stretched and given local contrast. Shading lives at
     pixel level inside the letters, so eyes, teeth and highlights come through
     while the image is still made of nothing but words.

  Drawn at device resolution, so it stays sharp at any size even though the
  source photo is small. On first paint the rows fill in from the top; resizes
  redraw instantly.
*/

const KEY = ['creative', 'reliable', 'curious', 'detail-obsessed', 'problem-solver', 'thoughtful', 'builder']
const WORDS = [
  'pixel-perfect', 'ships on time', 'calm', 'bold', 'inventive', 'honest', 'fast learner',
  'clear communicator', 'tasteful', 'driven', 'collaborative', 'precise', 'human', 'considered',
  'resourceful', 'kind', 'ambitious', 'dependable', 'hands-on', 'imaginative', 'curious',
  'creative', 'reliable', 'thoughtful', 'problem-solver', 'detail-obsessed',
]
const INK = [28, 29, 32]
const LIGHT = [246, 246, 248] // highlights fade almost to paper, which is what draws the face

const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v)

// Separable box blur, used to find each area's local average for contrast.
function boxBlur(src, w, h, r) {
  const tmp = new Float32Array(w * h)
  const out = new Float32Array(w * h)
  for (let y = 0; y < h; y++) {
    let acc = 0
    for (let x = -r; x <= r; x++) acc += src[y * w + Math.min(w - 1, Math.max(0, x))]
    for (let x = 0; x < w; x++) {
      tmp[y * w + x] = acc / (2 * r + 1)
      acc += src[y * w + Math.min(w - 1, x + r + 1)] - src[y * w + Math.max(0, x - r)]
    }
  }
  for (let x = 0; x < w; x++) {
    let acc = 0
    for (let y = -r; y <= r; y++) acc += tmp[Math.min(h - 1, Math.max(0, y)) * w + x]
    for (let y = 0; y < h; y++) {
      out[y * w + x] = acc / (2 * r + 1)
      acc += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x]
    }
  }
  return out
}

// Silhouette coverage at half resolution, for finding where each row has body.
function silhouette(img, W, H) {
  const sw = Math.max(8, Math.round(W / 2))
  const sh = Math.max(8, Math.round(H / 2))
  const c = document.createElement('canvas')
  c.width = sw
  c.height = sh
  const cx = c.getContext('2d', { willReadFrequently: true })
  cx.drawImage(img, 0, 0, sw, sh)
  const px = cx.getImageData(0, 0, sw, sh).data
  const alpha = new Float32Array(sw * sh)
  for (let i = 0; i < alpha.length; i++) alpha[i] = px[i * 4 + 3] / 255
  return { sw, sh, alpha, kx: sw / W, ky: sh / H }
}

function coverage(s, x0, y0, x1, y1) {
  const ax = Math.max(0, Math.floor(x0 * s.kx))
  const bx = Math.min(s.sw - 1, Math.ceil(x1 * s.kx))
  const ay = Math.max(0, Math.floor(y0 * s.ky))
  const by = Math.min(s.sh - 1, Math.ceil(y1 * s.ky))
  let sum = 0
  let count = 0
  for (let y = ay; y <= by; y++) for (let x = ax; x <= bx; x++) (sum += s.alpha[y * s.sw + x]), count++
  return count ? sum / count : 0
}

// The photo as a tone plate: brightness stretched to the silhouette's own range,
// local contrast lifted (so features survive on darker skin), mapped ink → light.
function tonePlate(img, w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const cx = c.getContext('2d', { willReadFrequently: true })
  cx.drawImage(img, 0, 0, w, h)
  const data = cx.getImageData(0, 0, w, h)
  const px = data.data
  const n = w * h
  const lum = new Float32Array(n)
  const inside = []
  for (let i = 0; i < n; i++) {
    lum[i] = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255
    if (px[i * 4 + 3] > 150 && i % 7 === 0) inside.push(lum[i])
  }
  inside.sort((a, b) => a - b)
  const lo = inside[Math.floor(inside.length * 0.01)] ?? 0
  const hi = inside[Math.floor(inside.length * 0.99)] ?? 1
  for (let i = 0; i < n; i++) lum[i] = clamp01((lum[i] - lo) / Math.max(0.01, hi - lo))
  const local = boxBlur(lum, w, h, Math.max(3, Math.round(w / 14)))
  for (let i = 0; i < n; i++) {
    const t = clamp01(local[i] * 1.05 + (lum[i] - local[i]) * 2.9 + 0.03) // 0 = dark, 1 = light
    const k = Math.pow(t, 0.7)
    px[i * 4] = INK[0] + (LIGHT[0] - INK[0]) * k
    px[i * 4 + 1] = INK[1] + (LIGHT[1] - INK[1]) * k
    px[i * 4 + 2] = INK[2] + (LIGHT[2] - INK[2]) * k
  }
  cx.putImageData(data, 0, 0)
  return c
}

// Sets the words and fills them with the tone plate, on an offscreen canvas.
function compose(img, W, H, dpr, family) {
  const s = silhouette(img, W, H)
  const art = document.createElement('canvas')
  art.width = Math.round(W * dpr)
  art.height = Math.round(H * dpr)
  const ctx = art.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.textBaseline = 'middle'

  // Small base type gives the face its resolution; feature rows carry readable words.
  const base = Math.min(8, Math.max(4.75, W / 100))
  const font = (weight, size) => `${weight} ${size}px ${family}`
  let y = 0
  let r = 0
  let wi = 0
  let ki = 0
  while (y < H) {
    const feature = r % 15 === 9
    const size = feature ? Math.round(base * 1.7 * 10) / 10 : base
    const lh = size * (feature ? 0.92 : 0.98)
    ctx.font = font(feature ? 900 : 800, size)
    const space = ctx.measureText(' ').width
    const step = 1 / s.kx
    let x = 0
    while (x < W) {
      while (x < W && coverage(s, x, y + lh * 0.3, x + step, y + lh * 0.7) < 0.4) x += step
      let end = x
      while (end < W && coverage(s, end, y + lh * 0.3, end + step, y + lh * 0.7) >= 0.4) end += step
      // Each run of the row starts on a fresh word, so edges read as text, not noise.
      let cx = x
      while (end - x > size && cx < end) {
        const word = feature ? KEY[ki++ % KEY.length] : WORDS[wi++ % WORDS.length]
        ctx.fillText(word, cx, y + lh / 2)
        cx += ctx.measureText(word).width + space
      }
      x = end + step
    }
    y += lh
    r++
  }

  // Keep only the letters, coloured by the photo (also trims them to the silhouette).
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalCompositeOperation = 'source-in'
  ctx.drawImage(tonePlate(img, art.width, art.height), 0, 0)
  return art
}

export default function WordPortrait({ src, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const img = new Image()
    img.src = src
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let cancelled = false
    let raf = 0
    let timer = 0
    let first = true
    let size = ''

    const render = async () => {
      try {
        await img.decode()
        await document.fonts?.ready
      } catch {
        return
      }
      if (cancelled) return
      const { width: W, height: H } = canvas.getBoundingClientRect()
      if (!W || !H) return
      size = `${Math.round(W)}x${Math.round(H)}`
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const art = compose(img, W, H, dpr, getComputedStyle(canvas).fontFamily)
      if (cancelled) return
      canvas.width = art.width
      canvas.height = art.height
      const ctx = canvas.getContext('2d')
      cancelAnimationFrame(raf)

      if (!first || reduce) {
        ctx.drawImage(art, 0, 0)
        return
      }
      // First paint: the words fill in from the top, decelerating.
      first = false
      const start = performance.now()
      const duration = 1400
      let drawn = 0
      const tick = now => {
        // rAF's timestamp is the frame's start, which can precede `start`.
        const t = Math.min(1, Math.max(0, (now - start) / duration))
        const upto = Math.round((1 - Math.pow(1 - t, 3)) * art.height)
        if (upto > drawn) ctx.drawImage(art, 0, drawn, art.width, upto - drawn, 0, drawn, art.width, upto - drawn)
        drawn = upto
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    render()
    // Redraw only when the box really changes size (the observer also fires once on start).
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      // Not drawn yet: the pending first render will measure the latest size itself.
      if (!size || `${Math.round(width)}x${Math.round(height)}` === size) return
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        first = false
        render()
      }, 120)
    })
    ro.observe(canvas)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      ro.disconnect()
    }
  }, [src])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
