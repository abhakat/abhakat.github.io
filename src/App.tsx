import { AmbientCanvas } from './components/AmbientCanvas'
import { ProfileHero } from './components/ProfileHero'

function App() {
  return (
    <>
      <AmbientCanvas />
      <main className="site-shell">
        <ProfileHero />
      </main>
    </>
  )
}

export default App
