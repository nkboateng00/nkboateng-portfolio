// To add a project: drop a 16:10 screenshot (WebP, ~1800px wide) into
// public/projects/ and add an object below.
//   summary    one or two sentences, used in the home page list
//   about      the longer story, one string per paragraph (used on /work)
//   highlights what it does, short and concrete
//   stack      the main technologies, most important first

export const projects = [
  {
    slug: 'bellavino',
    title: 'The Bellavino Experience',
    client: 'Bellavino',
    platform: 'Website',
    year: '2026',
    role: 'Design & Development',
    summary:
      'The online home of one of Accra’s loudest nights out, with a live countdown to 23.12.26 and a ticket-first layout.',
    about: [
      'The Bellavino Experience is one of Accra’s biggest nights out, and its website has one job: build the excitement and get people to a ticket. It opens on a live countdown to 23.12.26 and keeps the ticket button within reach from the first scroll.',
      'I designed and built it end to end, carrying the brand’s energy into the type, colour and motion while keeping the site quick on phones.',
    ],
    highlights: [
      'Live countdown to the 23 December show',
      'Ticket-first layout, with the call to action always in reach',
      'Art direction that carries the brand through type, colour and motion',
      'Built mobile-first and deployed on Vercel',
    ],
    outcome: 'The ticket hub for the 23 December show.',
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    image: '/projects/bellavino.webp',
    url: 'https://www.thebellavinoexperience.com',
  },
  {
    slug: 'de-keuken',
    title: 'De Keuken',
    client: 'De Keuken, East Legon',
    platform: 'Website',
    year: '2026',
    role: 'Design & Development',
    summary:
      'A warm, appetite-first website for a restaurant in Accra, with live reservations and instant WhatsApp booking alerts.',
    about: [
      'De Keuken is a restaurant in East Legon, Accra. The site is designed to make people hungry first: generous food photography, a menu that is easy to browse and a reservation flow that takes seconds.',
      'Every booking sends an instant WhatsApp alert to the restaurant team through the WhatsApp Cloud API, so nobody has to watch an inbox. Google Analytics 4 shows the team how people find and use the site.',
    ],
    highlights: [
      'Menu exploration designed around the food',
      'Online reservations',
      'Instant WhatsApp booking alerts for staff',
      'GA4 analytics for the team',
    ],
    outcome: 'Live for a real restaurant, taking reservations online.',
    stack: ['Next.js', 'WhatsApp Cloud API', 'Vercel', 'GA4'],
    image: '/projects/de-keuken.webp',
    url: 'https://dekeukengh.com',
  },
  {
    slug: 'lug-fa-league',
    title: 'LUG FA League',
    client: 'Lancaster University Ghana',
    platform: 'Web platform',
    year: '2026',
    role: 'Design & Development',
    summary:
      'The official home of Lancaster University Ghana’s football league: fixtures, a live table, news, clubs and player profiles.',
    about: [
      'The official home of Lancaster University Ghana’s six-team student football league. Fans get fixtures, results, a live league table, news, club pages, player profiles and kick-off countdowns, all shown in Accra time.',
      'Behind it is an admin area where league officials run the season. The table is computed in the database, live updates arrive through Supabase Realtime, and every admin change is checked by row-level security and written to an audit log, so the league always knows who changed what.',
    ],
    highlights: [
      'Live league table computed in Postgres',
      'Fixtures, results, club pages and player profiles',
      'Admin area with row-level security and an audit log',
      'Media uploads to Cloudflare R2 through short-lived signed links',
      'Fast, build-free front end in plain HTML, CSS and JavaScript',
    ],
    outcome: 'Six clubs. Every result, goal and signing in one place.',
    stack: ['JavaScript', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel Functions', 'Cloudflare R2', 'Vitest', 'Playwright'],
    image: '/projects/lug-fa-league.webp',
    url: 'https://www.lugfootball.com',
  },
  {
    slug: 'mnotify-points',
    title: 'mNotify Points System',
    client: 'mNotify',
    platform: 'Internal tool',
    year: '2025',
    role: 'Product & Development',
    summary:
      'An internal rewards platform for a Ghanaian bulk-messaging company, with leaderboards, an activity feed and live email tracking.',
    about: [
      'mNotify is a Ghanaian bulk-messaging company. The Points System is its internal rewards platform: a way to recognise contributions with points and make the results visible to the whole team.',
      'Admins distribute points and manage users from a dashboard, while staff follow the leaderboards and an activity feed. Emails sent by the system are tracked live.',
    ],
    highlights: [
      'Admin dashboard for distributing points',
      'Leaderboards and a live activity feed',
      'User management',
      'Live email tracking',
    ],
    outcome: 'Used by mNotify staff at pointing.mnotify.com.',
    stack: ['Laravel', 'PHP', 'MySQL'],
    image: '/projects/mnotify-points.webp',
    url: 'https://pointing.mnotify.com',
  },
  {
    slug: 'campusfix',
    title: 'CampusFix',
    client: 'Lancaster University Ghana',
    platform: 'Web app (PWA)',
    year: '2026',
    role: 'Product & Development',
    summary:
      'A full-stack maintenance ticketing app: scan a QR code, report the issue, and follow it until it’s fixed.',
    about: [
      'CampusFix is the maintenance and infrastructure system for Lancaster University Ghana. Students, staff and lecturers report a problem by scanning the QR code on their floor, which fills in the exact location, then follow the ticket until it is resolved.',
      'Each role gets its own view. Technicians are kept up to date through WhatsApp notifications, and admins can see which blocks and categories report the most, how long issues take to fix and how the team is performing.',
    ],
    highlights: [
      'QR codes on every floor for instant, location-aware reports',
      'Separate roles for students, staff, lecturers, technicians and admins',
      'OTP-secured access and WhatsApp notifications',
      'Analytics for resolution times, trends and technician performance',
      'Installable as a Progressive Web App',
      'Anonymous suggestions for sensitive matters',
    ],
    outcome: 'Streamlining maintenance requests across campus.',
    stack: ['Laravel 11', 'PHP', 'MySQL', 'Alpine.js', 'Tailwind CSS', 'Twilio WhatsApp', 'PWA'],
    image: '/projects/campusfix.webp',
    url: 'https://lugcampusfix.online',
  },
  {
    slug: 'intellilearn',
    title: 'IntelliLearn',
    client: 'LUG students',
    platform: 'Web app',
    year: '2026',
    role: 'Product & Development',
    summary:
      'A study platform with past exam papers, AI explanations, quizzes and a discussion-first learning flow.',
    about: [
      'IntelliLearn is a study platform for students at Lancaster University Ghana. It brings past exam papers together in one place and adds AI explanations, quizzes and discussion, so revising starts with context instead of a blank page.',
    ],
    highlights: [
      'Past exam papers in one place',
      'AI explanations of questions',
      'Quizzes for self-testing',
      'A discussion-first learning flow',
    ],
    outcome: 'Smarter access to study resources for LUG students.',
    stack: ['React', 'Node.js', 'Cloudflare R2'],
    image: '/projects/intellilearn.webp',
    url: 'https://intellilearnlug.com',
  },
]
