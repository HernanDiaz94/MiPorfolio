import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../supabase'
import { profile as fallbackProfile } from '../content'

const links = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#contacto', label: 'Contacto' },
]

const Header = () => {
  const [profile, setProfile] = useState(fallbackProfile)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single()

      if (!cancelled && !error && data) {
        setProfile({ ...fallbackProfile, ...data })
      }
    }

    fetchProfile()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <nav
        aria-label="Navegación principal"
        className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4"
      >
        <a
          href="#inicio"
          className="text-lg sm:text-xl font-bold text-gray-800 truncate"
        >
          {profile.full_name || 'Tu Nombre'}
        </a>

        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition"
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
      </nav>

      {open && (
        <div id="menu-movil" className="sm:hidden border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-gray-700 hover:text-blue-600 transition"
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
