import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../supabase'
import { profile as fallbackProfile } from '../content'

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

const Hero = () => {
  const [profile, setProfile] = useState(fallbackProfile)

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

  const socials = [
    { href: profile.github, label: 'GitHub' },
    { href: profile.linkedin, label: 'LinkedIn' },
  ].filter((social) => Boolean(social.href))

  return (
    <section
      id="inicio"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={`Foto de ${profile.full_name}`}
              width="400"
              height="400"
              className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-32 h-32 rounded-full mx-auto bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg"
            >
              {initials(profile.full_name)}
            </div>
          )}
        </div>

        <p className="text-blue-700 font-semibold uppercase tracking-wide text-sm mb-3">
          {profile.role}
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Hola, soy {profile.full_name || 'Desarrollador Web'}
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {profile.bio}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#proyectos"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="border border-gray-300 bg-white/70 text-gray-700 px-6 py-3 rounded-lg hover:bg-white transition font-semibold"
          >
            Contactarme
          </a>
        </div>

        {socials.length > 0 && (
          <div className="mt-8 flex justify-center gap-6 text-sm">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition underline underline-offset-4"
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
