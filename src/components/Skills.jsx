import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../supabase'
import { skills as fallbackSkills } from '../content'

const levels = {
  Experto: { chip: 'bg-green-100 text-green-800', bar: 'bg-green-500', width: '90%' },
  Intermedio: {
    chip: 'bg-yellow-100 text-yellow-800',
    bar: 'bg-yellow-500',
    width: '60%',
  },
  Principiante: {
    chip: 'bg-red-100 text-red-800',
    bar: 'bg-red-500',
    width: '30%',
  },
}

const defaultLevel = {
  chip: 'bg-gray-100 text-gray-700',
  bar: 'bg-gray-500',
  width: '50%',
}

const Skills = () => {
  const [skills, setSkills] = useState(fallbackSkills)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false

    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('nivel', { ascending: false })

      if (!cancelled && !error && data?.length) setSkills(data)
    }

    fetchSkills()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="habilidades" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-gray-800">
          Habilidades técnicas
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Tecnologías con las que trabajo día a día.
        </p>

        {skills.length === 0 ? (
          <p className="text-center text-gray-500">
            Todavía no hay habilidades cargadas.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => {
              const level = levels[skill.nivel] || defaultLevel

              return (
                <div
                  key={skill.id}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {skill.habilidad}
                    </h3>
                    <span
                      className={`shrink-0 px-2 py-1 rounded text-xs font-medium ${level.chip}`}
                    >
                      {skill.nivel || 'Sin nivel'}
                    </span>
                  </div>

                  <div
                    className="w-full bg-gray-200 rounded-full h-2"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={parseInt(level.width, 10)}
                    aria-label={`Nivel de ${skill.habilidad}`}
                  >
                    <div
                      className={`h-2 rounded-full ${level.bar}`}
                      style={{ width: level.width }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills
