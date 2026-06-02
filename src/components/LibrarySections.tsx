import { useState } from 'react'
import { ArrowUpRight, Cog } from 'lucide-react'
import {
  TravelAtlas,
  type TravelCitySelection,
  type TravelCountry,
  type TravelRenderer,
} from '@anaybucket/travel-atlas'
import { hobbies, projects, readPapers, wantToReadPapers } from '../content/profile'
import { travelCountries, travelTrips } from '../content/travel'
import type { JournalEntry, PaperEntry, Project } from '../types'
import type { CollectionPageId } from '../App'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}

function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section className="library-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" data-accent={project.accent}>
      <div className="card-topline">
        <span>{project.status}</span>
        <span>{project.tags.join(' / ')}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="card-actions">
        {project.repoHref ? (
          <a href={project.repoHref} target="_blank" rel="noreferrer">
            repo
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} />
          </a>
        ) : null}
        {project.liveHref ? (
          <a href={project.liveHref} target="_blank" rel="noreferrer">
            live
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} />
          </a>
        ) : null}
      </div>
    </article>
  )
}

function JournalCard({ entry }: { entry: JournalEntry }) {
  const content = (
    <>
      <div className="note-pin" aria-hidden="true" />
      <div className="note-visual" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="gear-widget" aria-hidden="true">
        <Cog size={18} strokeWidth={1.8} />
      </div>
      <span>{entry.meta}</span>
      <h3>{entry.title}</h3>
      <p>{entry.description}</p>
    </>
  )

  if (entry.href) {
    return (
      <a className="journal-card" data-accent={entry.accent} href={entry.href}>
        {content}
      </a>
    )
  }

  return (
    <article className="journal-card" data-accent={entry.accent}>
      {content}
    </article>
  )
}

function PaperCard({ paper }: { paper: PaperEntry }) {
  return (
    <article className="paper-entry">
      <div>
        <h3>{paper.title}</h3>
        <p className="paper-authors">{paper.authors}</p>
      </div>
      <p>{paper.note}</p>
      {paper.href ? (
        <a href={paper.href} target="_blank" rel="noreferrer">
          source
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} />
        </a>
      ) : null}
    </article>
  )
}

type PaperShelfProps = {
  title: string
  description: string
  papers: PaperEntry[]
}

function PaperShelf({ title, description, papers }: PaperShelfProps) {
  return (
    <div className="paper-shelf">
      <div className="paper-shelf-heading">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="paper-list">
        {papers.map((paper) => (
          <PaperCard key={paper.title} paper={paper} />
        ))}
      </div>
    </div>
  )
}

const pageCopy = {
  projects: {
    eyebrow: 'build',
    title: 'personal projects',
    description: 'Things I am making, with repo links, live links, and details on the work behind them.',
  },
  papers: {
    eyebrow: 'read',
    title: 'papers I am tracking',
    description: 'A reading shelf for papers, summaries, links, and the one idea from each that I want to remember.',
  },
  hobbies: {
    eyebrow: 'live',
    title: 'hobbies and personal shelves',
    description: 'A durable place for interests outside code, small obsessions, and life notes I want to keep.',
  },
  travel: {
    eyebrow: 'travel',
    title: 'travel atlas',
    description: 'A map of places I have been, routes I have taken, and countries I want to visit next.',
  },
} as const

const hiddenUnitedStatesLivedCityIds = new Set(['denver', 'nyc', 'la'])

function TravelCountryPanel({
  country,
  selectedCity,
  onCitySelect,
}: {
  country: TravelCountry
  selectedCity: TravelCitySelection | undefined
  onCitySelect: (selection: TravelCitySelection) => void
}) {
  const visibleCities =
    country.code === 'USA'
      ? country.cities?.filter((city) => !hiddenUnitedStatesLivedCityIds.has(city.id))
      : country.cities

  return (
    <>
      <h3>{country.name}</h3>
      <p>{country.summary ?? country.status}</p>
      {visibleCities && visibleCities.length > 0 ? (
        <div className="ta-chipList" aria-label={`${country.name} cities`}>
          {visibleCities.map((city) => (
            <button
              key={city.id}
              type="button"
              className="ta-chip ta-chipButton"
              aria-pressed={selectedCity?.countryCode === country.code && selectedCity.cityId === city.id}
              onClick={() => onCitySelect({ countryCode: country.code, cityId: city.id })}
            >
              {city.name}
            </button>
          ))}
        </div>
      ) : null}
    </>
  )
}

const visitedTravelCountries = travelCountries.filter((country) => country.status === 'visited' || country.status === 'lived')
const wantToVisitTravelCountries = travelCountries.filter((country) => country.status === 'want-to-visit')

function TravelAtlasPanel() {
  const [renderer, setRenderer] = useState<TravelRenderer>('globe')
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>()
  const [selectedCity, setSelectedCity] = useState<TravelCitySelection>()

  function handleCountrySelect(countryCode: string) {
    setSelectedCountryCode(countryCode)
    setSelectedCity(undefined)
  }

  function handleCitySelect(selection: TravelCitySelection) {
    setSelectedCountryCode(selection.countryCode)
    setSelectedCity(selection)
  }

  return (
    <div className="travel-atlas-panel">
      <div className="travel-atlas-toolbar" aria-label="Travel atlas view">
        <span>view</span>
        <div className="travel-atlas-view-switch">
          <button type="button" aria-pressed={renderer === 'globe'} onClick={() => setRenderer('globe')}>
            globe
          </button>
          <button type="button" aria-pressed={renderer === 'map'} onClick={() => setRenderer('map')}>
            2D map
          </button>
        </div>
      </div>
      <TravelAtlas
        countries={travelCountries}
        trips={travelTrips}
        defaultMode="trips"
        defaultTripDisplayMode="all"
        renderer={renderer}
        enableZoom
        showCountryLabels
        selectedCountryCode={selectedCountryCode}
        selectedCity={selectedCity}
        onCountrySelect={handleCountrySelect}
        onCitySelect={handleCitySelect}
        renderCountryPanel={(country) => (
          <TravelCountryPanel country={country} selectedCity={selectedCity} onCitySelect={handleCitySelect} />
        )}
      />
      <div className="travel-atlas-ledger" aria-label="Travel atlas ledger">
        <div>
          <p className="ta-eyebrow">visited</p>
          <p>{visitedTravelCountries.length} countries</p>
          <div className="travel-atlas-ledger-list">
            {visitedTravelCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                aria-pressed={selectedCountryCode === country.code}
                onClick={() => handleCountrySelect(country.code)}
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="ta-eyebrow">want to visit</p>
          <p>{wantToVisitTravelCountries.length} countries</p>
          <div className="travel-atlas-ledger-list">
            {wantToVisitTravelCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                aria-pressed={selectedCountryCode === country.code}
                onClick={() => handleCountrySelect(country.code)}
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LibraryPage({ page }: { page: CollectionPageId }) {
  if (page === 'projects') {
    return (
      <div className="library-page">
        <Section {...pageCopy.projects} id="projects">
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Section>
      </div>
    )
  }

  if (page === 'papers') {
    return (
      <div className="library-page">
        <Section {...pageCopy.papers} id="papers">
          <div className="paper-shelves">
            <PaperShelf
              title="want to read"
              description="A queue for papers I want to get to, with the reason they caught my eye."
              papers={wantToReadPapers}
            />
            <PaperShelf
              title="already read"
              description="Finished reads, summaries, links, and ideas worth keeping around."
              papers={readPapers}
            />
          </div>
        </Section>
      </div>
    )
  }

  if (page === 'hobbies') {
    return (
      <div className="library-page">
        <Section {...pageCopy.hobbies} id="hobbies">
          <div className="journal-grid">
            {hobbies.map((entry) => (
              <JournalCard key={entry.title} entry={entry} />
            ))}
          </div>
        </Section>
      </div>
    )
  }

  return (
    <div className="library-page">
      <Section {...pageCopy.travel} id="travel">
        <TravelAtlasPanel />
      </Section>
    </div>
  )
}

export function LibrarySections() {
  return (
    <div className="library">
      <Section
        id="projects"
        eyebrow={pageCopy.projects.eyebrow}
        title={pageCopy.projects.title}
        description={pageCopy.projects.description}
      >
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Section>

      <Section id="papers" eyebrow={pageCopy.papers.eyebrow} title={pageCopy.papers.title} description={pageCopy.papers.description}>
        <div className="paper-shelves">
          <PaperShelf
            title="want to read"
            description="A queue for papers I want to get to, with the reason they caught my eye."
            papers={wantToReadPapers}
          />
          <PaperShelf
            title="already read"
            description="Finished reads, summaries, links, and ideas worth keeping around."
            papers={readPapers}
          />
        </div>
      </Section>

      <Section
        id="hobbies"
        eyebrow={pageCopy.hobbies.eyebrow}
        title={pageCopy.hobbies.title}
        description={pageCopy.hobbies.description}
      >
        <div className="journal-grid single">
          {hobbies.map((entry) => (
            <JournalCard key={entry.title} entry={entry} />
          ))}
        </div>
      </Section>

      <Section id="travel" eyebrow={pageCopy.travel.eyebrow} title={pageCopy.travel.title} description={pageCopy.travel.description}>
        <TravelAtlasPanel />
      </Section>
    </div>
  )
}
