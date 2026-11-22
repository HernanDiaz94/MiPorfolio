import { useEffect } from 'react'
import { ProfileProvider } from './context/ProfileProvider'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { profile } from './content'

const currentYear = new Date().getFullYear()

function App() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <ProfileProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-blue-600 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow dark:focus:bg-gray-900 dark:focus:text-blue-400"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="main">
          <Hero />
          <div className="animate-on-scroll">
            <Projects />
          </div>
          <div className="animate-on-scroll">
            <Skills />
          </div>
          <div className="animate-on-scroll">
            <Contact />
          </div>
        </main>

        <footer className="border-t border-gray-200 bg-gray-900 py-8 text-white dark:border-gray-800 dark:bg-black">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} {profile.full_name} · Catamarca, Argentina
            </p>
          </div>
        </footer>
      </div>
    </ProfileProvider>
  )
}

export default App
