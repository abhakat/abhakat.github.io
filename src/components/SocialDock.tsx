import { AtSign, BriefcaseBusiness, Code, GitFork, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SocialKind, SocialLink } from '../types'

const iconsByKind: Record<SocialKind, LucideIcon> = {
  github: GitFork,
  email: Mail,
  linkedin: BriefcaseBusiness,
  leetcode: Code,
  x: AtSign,
}

type SocialDockProps = {
  links: SocialLink[]
}

export function SocialDock({ links }: SocialDockProps) {
  return (
    <nav className="social-dock" aria-label="Social links">
      {links.map((link) => {
        const Icon = iconsByKind[link.kind]

        return (
          <a
            key={link.label}
            className="social-link"
            href={link.href}
            aria-label={link.label}
            data-label={link.label}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
          >
            <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
          </a>
        )
      })}
    </nav>
  )
}
