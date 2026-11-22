import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../supabase'
import { projects as fallbackProjects } from '../content'

const Projects = () => {
  const [projects, setProjects] = useState(fallbackProjects)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false

    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (!cancelled && !error && data?.length) setProjects(data)
    }

    fetchProjects()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="proyectos" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-gray-800 dark:text-white">
          Mis proyectos
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto dark:text-gray-400">
          Una selección de los trabajos en los que he participado.
        </p>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Todavía no hay proyectos publicados.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
              >
                {project.imagen_url && (
                  <div className="relative overflow-hidden">
                    <img
                      src={project.imagen_url}
                      alt={project.nombre}
                      loading="lazy"
                      className="w-full h-48 object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                      <span className="text-white text-sm font-semibold">
                        Ver proyecto →
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                    {project.nombre}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                    {project.descripcion}
                  </p>

                  {project.tecnologias?.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mb-4">
                      {project.tecnologias.map((tech) => (
                        <li
                          key={tech}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded dark:bg-blue-500/15 dark:text-blue-300"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex gap-4">
                    {project.enlace_github && (
                      <a
                        href={project.enlace_github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 font-medium hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-blue-400"
                      >
                        GitHub
                      </a>
                    )}
                    {project.enlace_demo && (
                      <a
                        href={project.enlace_demo}
                        {...(project.enlace_demo.startsWith('/')
                          ? {}
                          : { target: '_blank', rel: 'noopener noreferrer' })}
                        className="text-gray-700 font-medium hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-blue-400"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
