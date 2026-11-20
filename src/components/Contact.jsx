import { useState } from 'react'
import { useProfile } from '../hooks/useProfile'

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
    key: 'whatsapp',
    value: profile.phone,
    href: profile.phone
      ? `https://wa.me/${profile.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
          profile.whatsapp_message
        )}`
      : null,
    label: 'WhatsApp',
    external: true,
    filled: true,
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    ),
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
  const profile = useProfile()
  const [formData, setFormData] = useState(emptyForm)
  const [status, setStatus] = useState('idle')

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
        'bot-field': event.target.elements['bot-field']?.value ?? '',
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
                        fill={item.filled ? '#25D366' : 'none'}
                        stroke={item.filled ? 'none' : 'currentColor'}
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
                        {...(item.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
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

              <input
                type="text"
                name="bot-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

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
