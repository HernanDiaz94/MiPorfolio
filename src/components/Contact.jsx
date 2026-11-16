import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../supabase'
import { profile as fallbackProfile } from '../content'

const emptyForm = { name: '', email: '', message: '' }

const contactItems = (profile) => [
  {
    key: 'email',
    value: profile.email,
    href: profile.email ? `mailto:${profile.email}` : null,
    label: 'Email',
    icon: (
      <path d="M3 6h18v12H3z M3 7l9 6 9-6" />
    ),
  },
  {
    key: 'phone',
    value: profile.phone,
    href: profile.phone ? `tel:${profile.phone.replace(/\s+/g, '')}` : null,
    label: 'Teléfono',
    icon: <path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1z" />,
  },
  {
    key: 'location',
    value: profile.location,
    href: null,
    label: 'Ubicación',
    icon: <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  },
]

const Contact = () => {
  const [profile, setProfile] = useState(fallbackProfile)
  const [formData, setFormData] = useState(emptyForm)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false

    const fetchProfile = async () => {
      const { data } = await supabase.from('profiles').select('*').single()
      if (!cancelled && data) setProfile({ ...fallbackProfile, ...data })
    }

    fetchProfile()

    return () => {
      cancelled = true
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')

    try {
      const body = new URLSearchParams({
        'form-name': 'contacto',
        ...formData,
      }).toString()

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })

      if (!response.ok) throw new Error('Error al enviar el mensaje')

      setFormData(emptyForm)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const items = contactItems(profile)

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-gray-800">
          Contacto
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          ¿Tenés un proyecto en mente? Escribime y te respondo a la brevedad.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Hablemos
            </h3>
            <p className="text-gray-600 mb-6">
              Estoy disponible para trabajar en proyectos freelance o en
              relación de dependencia.
            </p>

            <ul className="space-y-4">
              {items
                .filter((item) => item.value)
                .map((item) => (
                  <li key={item.key} className="flex items-center gap-3">
                    <span className="text-blue-600" aria-hidden="true">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {item.icon}
                      </svg>
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-gray-700">{item.value}</span>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <form
              name="contacto"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contacto" />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
              </button>

              <p aria-live="polite" className="text-sm min-h-5">
                {status === 'success' && (
                  <span className="text-green-700">
                    ¡Gracias por tu mensaje! Te respondo pronto.
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-red-700">
                    No se pudo enviar. Probá de nuevo o escribime por email.
                  </span>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
