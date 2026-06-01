import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import type { CollectionPageId, PageId } from '../App'

const pageSlides = [
  {
    label: 'projects',
    href: '/projects/',
    description: 'things I am building',
    className: 'node-projects',
  },
  {
    label: 'papers',
    href: '/papers/',
    description: 'reading and research notes',
    className: 'node-papers',
  },
  {
    label: 'hobbies',
    href: '/hobbies/',
    description: 'life outside the editor',
    className: 'node-hobbies',
  },
  {
    label: 'travel',
    href: '/travel/',
    description: 'places, food, and city notes',
    className: 'node-travel',
  },
] satisfies Array<{
  label: CollectionPageId
  href: string
  description: string
  className: string
}>

type SiteSliderProps = {
  activePage: PageId
  className?: string
  style?: CSSProperties
}

export function SiteSlider({ activePage, className = '', style }: SiteSliderProps) {
  const initialIndex = Math.max(
    0,
    pageSlides.findIndex((slide) => slide.label === activePage),
  )
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const activeSlide = pageSlides[activeIndex]

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % pageSlides.length)
    }, 3200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className={`site-slider ${className}`.trim()} style={style} aria-label="Site pages">
      <div className="slider-header">
        <span>abhakat.dev</span>
        <span>{activePage === 'home' ? 'shelves' : activePage}</span>
      </div>

      <div className="slider-map" aria-label="Page shortcuts">
        <svg className="slider-lines" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 11 18 L 35 40 L 60 18" vectorEffect="non-scaling-stroke" />
          <path d="M 60 18 L 89 40" vectorEffect="non-scaling-stroke" />
        </svg>
        {pageSlides.map((slide, index) => (
          <a
            key={slide.href}
            className={`slider-node ${slide.className}`}
            href={slide.href}
            aria-current={activePage === slide.label ? 'page' : undefined}
            data-active={activeIndex === index}
            title={slide.description}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {slide.label}
          </a>
        ))}
      </div>

      <div className="slider-footer">
        <span>{activeSlide.description}</span>
        <a href={activeSlide.href}>open page</a>
      </div>
    </div>
  )
}
