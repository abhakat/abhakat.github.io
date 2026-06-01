import type { PageId } from '../App'

const navItems = [
  { label: 'projects', href: '/projects/', page: 'projects' },
  { label: 'papers', href: '/papers/', page: 'papers' },
  { label: 'hobbies', href: '/hobbies/', page: 'hobbies' },
  { label: 'travel', href: '/travel/', page: 'travel' },
] as const

type SiteNavProps = {
  activePage: PageId
}

export function SiteNav({ activePage }: SiteNavProps) {
  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand-mark" href="/" aria-label="Anay Bhakat home">
          A
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} aria-current={activePage === item.page ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
