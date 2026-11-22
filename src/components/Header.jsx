import { useEffect, useState } from 'react'
import { useProfile } from '../hooks/useProfile'

const links = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#contacto', label: 'Contacto' },
]

const Header = () => {
  const profile = useProfile()
  const [open, setOpen] = useState(false)
  const [activo, setActivo] = useState('')
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  // Marca en la barra el enlace de la sección visible.
  useEffect(() => {
    const secciones = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActivo('#' + entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    secciones.forEach((seccion) => observer.observe(seccion))
    return () => observer.disconnect()
  }, [])

  const toggleTema = () => {
    const siguiente = !dark
    setDark(siguiente)
    document.documentElement.classList.toggle('dark', siguiente)
    try {
      localStorage.setItem('theme', siguiente ? 'dark' : 'light')
    } catch {}
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/70">
      <nav
        aria-label="Navegación principal"
        className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4"
      >
        <a
          href="#inicio"
          className="text-lg sm:text-xl font-bold text-gray-800 truncate dark:text-white"
        >
          {profile.full_name || 'Tu Nombre'}
        </a>

        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={
                activo === link.href
                  ? 'text-blue-600 transition dark:text-blue-400'
                  : 'text-gray-600 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-blue-400'
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTema}
            aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {dark ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              ) : (
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              )}
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="menu-movil"
          className="sm:hidden border-t border-gray-200 dark:border-gray-800"
        >
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={
                  activo === link.href
                    ? 'py-3 text-blue-600 transition dark:text-blue-400'
                    : 'py-3 text-gray-700 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-blue-400'
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
