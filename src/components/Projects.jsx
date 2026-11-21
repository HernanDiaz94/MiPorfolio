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
    <section id="proyectos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-gray-800">
          Mis proyectos
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Una selección de los trabajos en los que he participado.
        </p>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">
            Todavía no hay proyectos publicados.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article
                key={project.id}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
              >
                {project.imagen_url && (
                  <img
                    src={project.imagen_url}
                    alt={project.nombre}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {project.nombre}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1">
                    {project.descripcion}
                  </p>

                  {project.tecnologias?.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mb-4">
                      {project.tecnologias.map((tech) => (
                        <li
                          key={tech}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
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
                        className="text-gray-700 font-medium hover:text-blue-600 transition"
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
                        className="text-gray-700 font-medium hover:text-blue-600 transition"
                      >
                        Demo
                      </a>
                    )}
                    {project.enlace_web && (
                      <a
                        href={project.enlace_web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 font-medium hover:text-blue-600 transition"
                      >
                        Web
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
