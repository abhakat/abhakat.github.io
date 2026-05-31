export type SocialKind = 'github' | 'email' | 'linkedin' | 'leetcode' | 'x'

export type SocialLink = {
  label: string
  href: string
  kind: SocialKind
  external?: boolean
}
