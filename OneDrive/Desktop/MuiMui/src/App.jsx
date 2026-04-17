import { LanguageProvider } from './context/LanguageContext'
import useScrollReveal from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Tools from './components/Tools'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Inner() {
  useScrollReveal()
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Tools />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Inner />
    </LanguageProvider>
  )
}
