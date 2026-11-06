import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Brands from './components/Brands'
import Work from './components/Work'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    // reducedMotion="user": springs become instant for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main id="main">
        <Hero />
        <Intro />
        <Brands />
        <Work />
        <Services />
        <About />
      </main>
      <Contact />
    </MotionConfig>
  )
}
