import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import Home from './pages/Home'
import WorkPage from './pages/WorkPage'
import ScrollManager from './lib/ScrollManager'

export default function App() {
  return (
    // reducedMotion="user": springs become instant for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollManager />
        <Navbar />
        <main id="main">
          <Routes>
            <Route path="/work" element={<WorkPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Contact />
      </BrowserRouter>
    </MotionConfig>
  )
}
