import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../supabase'
import { projects as fallbackProjects } from '../content'

const Projects = () => {
  const [projects, setProjects] = useState(fallbackProjects)
  const [filtro, setFiltro] = useState(null)
  const [modal, setModal] = useState(null)
  const dialogRef = useRef(null)

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

  const tecnologias = useMemo(
    () =>
      Array.from(
        new Set(projects.flatMap((proyecto) => proyecto.tecnologias || []))
      ).sort(),
    [projects]
  )

  const visibles = filtro
    ? projects.filter((proyecto) => proyecto.tecnologias?.includes(filtro))
    : projects

  // Abre el modal y bloquea el scroll de fondo mientras está visible.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (modal && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [modal])

  const cerrarModal = () => {
    dialogRef.current?.close()
    setModal(null)
  }

  const chip = (activo) =>
    activo
      ? 'border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500'
      : 'border-gray-300 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:text-blue-400'

  return (
    <section id="proyectos" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-gray-800 dark:text-white">
          Mis proyectos
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto dark:text-gray-400">
          Una selección de los trabajos en los que he participado.
        </p>

        {tecnologias.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setFiltro(null)}
              aria-pressed={filtro === null}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${chip(
                filtro === null
              )}`}
            >
              Todas
            </button>
            {tecnologias.map((tecnologia) => {
              const activo = filtro === tecnologia
              const cantidad = projects.filter((proyecto) =>
                proyecto.tecnologias?.includes(tecnologia)
              ).length
              return (
                <button
                  key={tecnologia}
                  type="button"
                  onClick={() => setFiltro(activo ? null : tecnologia)}
                  aria-pressed={activo}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${chip(
                    activo
                  )}`}
                >
                  {tecnologia}
                  <span className="ml-1 opacity-70">{cantidad}</span>
                </button>
              )
            })}
          </div>
        )}

        {visibles.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Todavía no hay proyectos publicados.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
            {visibles.map((project) => {
              const demoInterna = Boolean(
                project.enlace_demo && project.enlace_demo.startsWith('/')
              )
              return (
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
                          {...(demoInterna
                            ? {
                                onClick: (event) => {
                                  event.preventDefault()
                                  setModal(project)
                                },
                              }
                            : { target: '_blank', rel: 'noopener noreferrer' })}
                          className="text-gray-700 font-medium hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-blue-400"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setModal(null)}
        className="backdrop:bg-gray-900/70 p-0 rounded-2xl bg-transparent w-[min(1120px,94vw)] h-[min(780px,88vh)] max-w-none"
      >
        {modal && (
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              <div className="min-w-0">
                <h3 className="truncate font-bold text-gray-800 dark:text-white">
                  {modal.nombre}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Demo interactiva
                </p>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <a
                  href={modal.enlace_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Abrir en pestaña nueva ↗
                </a>
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Cerrar
                </button>
              </div>
            </div>
            <iframe
              src={modal.enlace_demo}
              title={`Demo de ${modal.nombre}`}
              loading="lazy"
              className="w-full flex-1 border-0 bg-white"
            />
          </div>
        )}
      </dialog>
    </section>
  )
}

export default Projects
