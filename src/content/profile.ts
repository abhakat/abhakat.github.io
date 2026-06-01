import type { JournalEntry, PaperEntry, Project, SocialLink } from '../types'

export const contactEmail = 'anay.bhakat@gmail.com'
export const contactHref = `mailto:${contactEmail}?subject=${encodeURIComponent('Hello Anay')}`

export const profile = {
  name: 'Anay Bhakat',
  eyebrow: 'my personal website',
  intro: 'Building random projects and currently working at Meta.',
} as const

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/abhakat',
    kind: 'github',
    external: true,
  },
  {
    label: 'Email',
    href: contactHref,
    kind: 'email',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anay-bhakat/',
    kind: 'linkedin',
    external: true,
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/abhakat/',
    kind: 'leetcode',
    external: true,
  },
  {
    label: 'X',
    href: 'https://x.com/any_bucket',
    kind: 'x',
    external: true,
  },
  {
    label: 'npm',
    href: 'https://www.npmjs.com/~abhakat',
    kind: 'npm',
    external: true,
  },
] satisfies SocialLink[]

export const projects = [
  {
    title: 'personal website',
    description:
      'A Bun and TypeScript rebuild of this site, with a cleaner home for projects, papers, hobbies, and travel.',
    status: 'active',
    tags: ['bun', 'typescript', 'react'],
    accent: 'blue',
    repoHref: 'https://github.com/abhakat/abhakat.github.io',
    liveHref: 'https://abhakat.dev/',
  },
] satisfies Project[]

export const travelGuides = [
  {
    title: 'travel guide',
    description:
      'A place for city notes, food finds, trip ideas, and personal recommendations from places I visit.',
    meta: 'places',
    accent: 'coral',
  },
  {
    title: 'saved spots',
    description: 'Restaurants, cafes, walks, museums, and small details worth remembering for the next trip.',
    meta: 'guide notes',
    accent: 'teal',
  },
] satisfies JournalEntry[]

export const hobbies = [
  {
    title: 'outside code',
    description:
      'A running shelf for personal hobbies, small obsessions, favorite finds, and life notes that should live somewhere more durable.',
    meta: 'personal',
    accent: 'violet',
  },
] satisfies JournalEntry[]

export const wantToReadPapers = [
  {
    title: 'reading queue',
    authors: 'papers to add',
    note: 'Papers I want to read next, with links and quick context for why they seem worth my time.',
  },
] satisfies PaperEntry[]

export const readPapers = [
  {
    title: 'finished papers',
    authors: 'notes to add',
    note: 'Short summaries, useful references, and the one idea from each paper that I want to keep.',
  },
] satisfies PaperEntry[]
