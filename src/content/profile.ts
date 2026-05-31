import type { SocialLink } from '../types'

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
] satisfies SocialLink[]
