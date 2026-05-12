import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import IntroBrandTransition from './components/IntroBrandTransition'
import Hero from './components/Hero'
import About from './components/About'
import Research from './components/Research'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-neutral-950 transition-colors duration-300 dark:bg-black dark:text-white">
        <Navbar introComplete={introComplete} />
        {!introComplete && (
          <IntroBrandTransition onComplete={() => setIntroComplete(true)} />
        )}
        <main>
          <Hero />
          <About />
          <Research />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
