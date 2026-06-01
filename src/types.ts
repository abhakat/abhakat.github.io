export type SocialKind = 'github' | 'email' | 'linkedin' | 'leetcode' | 'x' | 'npm'

export type SocialLink = {
  label: string
  href: string
  kind: SocialKind
  external?: boolean
}

export type Accent = 'blue' | 'coral' | 'teal' | 'violet'

export type Project = {
  title: string
  description: string
  status: string
  tags: string[]
  accent: Accent
  repoHref?: string
  liveHref?: string
}

export type JournalEntry = {
  title: string
  description: string
  meta: string
  accent: Accent
  href?: string
}

export type PaperEntry = {
  title: string
  authors: string
  note: string
  href?: string
}
