// Logos live in public/brands/ as black-on-transparent PNGs, drawn flat black by .logo-mono.
// `height` is the rendered height in px on desktop (scaled down on phones), tuned so
// every mark carries similar visual weight. `size` is the file's pixel size, so each
// logo holds its width before it has loaded and the rolling row never jumps.

export const brands = [
  { name: 'Bellavino', logo: '/brands/bellavino.png', size: [358, 160], height: 68, url: 'https://www.thebellavinoexperience.com' },
  { name: 'mNotify', logo: '/brands/mnotify.png', size: [264, 71], height: 44, url: 'https://www.mnotify.com' },
  { name: 'ChopEasy', logo: '/brands/chopeasy.png', size: [611, 160], height: 64 },
  { name: 'The Dothan School', logo: '/brands/dothan.png', size: [191, 200], height: 104 },
  { name: 'Lancaster University Ghana', logo: '/brands/lancaster.png', size: [184, 76], height: 68, url: 'https://lancaster.edu.gh' },
  { name: 'MERKI', logo: '/brands/merki.png', size: [341, 62], height: 34, url: 'https://merki-five.vercel.app' },
  { name: 'Bevelyn B Event Management', logo: '/brands/bevelyn-b.png', size: [196, 160], height: 92 },
  { name: 'De Keuken', logo: '/brands/dekeuken.png', size: [1026, 160], height: 44, url: 'https://dekeukengh.com' },
  { name: 'LUG FA League', logo: '/brands/lug.png', size: [536, 114], height: 52, url: 'https://www.lugfootball.com' },
]
