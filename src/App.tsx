import { AmbientCanvas } from './components/AmbientCanvas'
import { LibraryPage } from './components/LibrarySections'
import { ProfileHero } from './components/ProfileHero'
import { SiteNav } from './components/SiteNav'

export type CollectionPageId = 'projects' | 'papers' | 'hobbies' | 'travel'
export type PageId = 'home' | CollectionPageId

const routeByPath: Record<string, PageId> = {
  '/': 'home',
  '/projects': 'projects',
  '/projects/': 'projects',
  '/projects/index.html': 'projects',
  '/papers': 'papers',
  '/papers/': 'papers',
  '/papers/index.html': 'papers',
  '/hobbies': 'hobbies',
  '/hobbies/': 'hobbies',
  '/hobbies/index.html': 'hobbies',
  '/travel': 'travel',
  '/travel/': 'travel',
  '/travel/index.html': 'travel',
  '/notes': 'travel',
  '/notes/': 'travel',
  '/notes/index.html': 'travel',
}

function getPage(pathname: string): PageId {
  return routeByPath[pathname] ?? 'home'
}

function App() {
  const activePage = getPage(window.location.pathname)

  return (
    <>
      <AmbientCanvas />
      <div className="site-shell" id="top">
        <SiteNav activePage={activePage} />
      </div>
      <main className={`site-shell ${activePage === 'home' ? 'home-shell' : 'page-shell'}`}>
        {activePage === 'home' ? <ProfileHero /> : <LibraryPage page={activePage} />}
      </main>
    </>
  )
}

export default App
