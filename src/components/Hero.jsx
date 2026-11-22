import { useProfile } from '../hooks/useProfile'
import { projects, skills } from '../content'

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

const Hero = () => {
  const profile = useProfile()

  const socials = [
    { href: profile.github, label: 'GitHub' },
    { href: profile.linkedin, label: 'LinkedIn' },
  ].filter((social) => Boolean(social.href))

  const tecnologias = new Set(
    projects.flatMap((proyecto) => proyecto.tecnologias || [])
  ).size

  const stats = [
    { valor: projects.length, label: 'Proyectos' },
    { valor: tecnologias, label: 'Tecnologías' },
    { valor: skills.length, label: 'Áreas de skills' },
  ]

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-20 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 mb-8 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          Disponible para nuevos proyectos
        </span>

        <div className="mb-8">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={`Foto de ${profile.full_name}`}
              width="400"
              height="400"
              className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-xl object-cover ring-4 ring-blue-100/60 dark:border-gray-800 dark:ring-blue-500/20"
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-32 h-32 rounded-full mx-auto bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-xl"
            >
              {initials(profile.full_name)}
            </div>
          )}
        </div>

        <p className="text-blue-700 font-semibold uppercase tracking-wide text-sm mb-3 dark:text-blue-300">
          {profile.role}
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 dark:text-white">
          Hola, soy {profile.full_name || 'Desarrollador Web'}
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto dark:text-gray-300">
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
            className="border border-gray-300 bg-white/70 text-gray-700 px-6 py-3 rounded-lg hover:bg-white transition font-semibold dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200 dark:hover:bg-gray-900"
          >
            Contactarme
          </a>
        </div>

        <div className="mt-10 flex justify-center gap-8 sm:gap-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold text-gray-800 dark:text-white">
                {stat.valor}
              </div>
              <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {socials.length > 0 && (
          <div className="mt-8 flex justify-center gap-6 text-sm">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition underline underline-offset-4 dark:text-gray-300 dark:hover:text-blue-400"
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
