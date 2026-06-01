import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { contactHref, profile, socialLinks } from '../content/profile'
import { SocialDock } from './SocialDock'
import { SiteSlider } from './SiteSlider'

function getHorizontalSpan(elements: Element[]) {
  const rects = elements.map((element) => element.getBoundingClientRect()).filter((rect) => rect.width > 0)

  if (rects.length === 0) {
    return 0
  }

  const left = Math.min(...rects.map((rect) => rect.left))
  const right = Math.max(...rects.map((rect) => rect.right))

  return right - left
}

export function ProfileHero() {
  const heroCopyRef = useRef<HTMLDivElement | null>(null)
  const introTextRef = useRef<HTMLSpanElement | null>(null)
  const heroActionsRef = useRef<HTMLDivElement | null>(null)
  const [sliderWidth, setSliderWidth] = useState<number | null>(null)

  useLayoutEffect(() => {
    const heroCopy = heroCopyRef.current
    const introText = introTextRef.current
    const heroActions = heroActionsRef.current

    if (!heroCopy || !introText || !heroActions) {
      return undefined
    }

    const measure = () => {
      const availableWidth = heroCopy.getBoundingClientRect().width
      const maxWidth = introText.getBoundingClientRect().width
      const minWidth = getHorizontalSpan(Array.from(heroActions.children))
      const nextWidth = Math.ceil(Math.min(availableWidth, Math.max(minWidth, maxWidth)))

      setSliderWidth((currentWidth) => (currentWidth === nextWidth ? currentWidth : nextWidth))
    }

    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(heroCopy)
    resizeObserver.observe(introText)
    resizeObserver.observe(heroActions)

    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure).catch(() => undefined)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="portrait-frame" aria-label="Portrait of Anay Bhakat">
        <img src="/images/profile_pic.jpg" alt="" className="portrait-image" />
      </div>

      <div className="hero-copy" ref={heroCopyRef}>
        <p className="eyebrow">{profile.eyebrow}</p>
        <h1 id="hero-title">{profile.name}</h1>
        <p className="hero-intro">
          <span ref={introTextRef}>{profile.intro}</span>
        </p>

        <div className="hero-actions" ref={heroActionsRef}>
          <a className="primary-link" href={contactHref} aria-label="Say hello by email" title="email">
            <span>Say hello</span>
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} />
          </a>
          <SocialDock links={socialLinks} />
        </div>

        <SiteSlider
          activePage="home"
          className="hero-slider"
          style={sliderWidth ? { width: `${sliderWidth}px` } : undefined}
        />
      </div>
    </section>
  )
}
