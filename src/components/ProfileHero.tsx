import { ArrowUpRight } from 'lucide-react'
import { contactHref, profile, socialLinks } from '../content/profile'
import { SocialDock } from './SocialDock'

export function ProfileHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="portrait-frame" aria-label="Portrait of Anay Bhakat">
        <img src="/images/profile_pic.jpg" alt="" className="portrait-image" />
      </div>

      <div className="hero-copy">
        <p className="eyebrow">{profile.eyebrow}</p>
        <h1 id="hero-title">{profile.name}</h1>
        <p className="hero-intro">{profile.intro}</p>

        <div className="hero-actions">
          <a className="primary-link" href={contactHref} aria-label="Say hello by email" title="email">
            <span>Say hello</span>
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} />
          </a>
          <SocialDock links={socialLinks} />
        </div>
      </div>
    </section>
  )
}
