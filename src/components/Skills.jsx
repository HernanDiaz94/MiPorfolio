import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../supabase'
import { skills as fallbackSkills } from '../content'
import { sortByLevel } from '../utils/skillLevel'

const levels = {
  Experto: {
    chip: 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300',
    bar: 'bg-green-500',
    width: '90%',
  },
  Intermedio: {
    chip: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300',
    bar: 'bg-yellow-500',
    width: '60%',
  },
  Principiante: {
    chip: 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300',
    bar: 'bg-red-500',
    width: '30%',
  },
}

const defaultLevel = {
  chip: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
  bar: 'bg-gray-500',
  width: '50%',
}

const SkillCard = ({ skill }) => {
  const level = levels[skill.nivel] || defaultLevel

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col border border-gray-100 dark:bg-gray-800 dark:border-gray-800">
      <div className="flex justify-between items-start gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 leading-snug dark:text-white">
          {skill.habilidad}
        </h3>
        <span
          className={`shrink-0 px-2 py-1 rounded text-xs font-medium ${level.chip}`}
        >
          {skill.nivel || 'Sin nivel'}
        </span>
      </div>

      {skill.detalle?.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 mb-5">
          {skill.detalle.map((item) => (
            <li
              key={item}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <div
        className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-auto"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={parseInt(level.width, 10)}
        aria-label={`Nivel de ${skill.habilidad}`}
      >
        <div
          className={`h-2 rounded-full barra ${level.bar}`}
          style={{ '--w': level.width }}
        ></div>
      </div>
    </div>
  )
}

const Skills = () => {
  const [skills, setSkills] = useState(() => sortByLevel(fallbackSkills))

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false

    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('orden', { ascending: true })

      if (!cancelled && !error && data?.length) setSkills(sortByLevel(data))
    }

    fetchSkills()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="habilidades" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-gray-800 dark:text-white">
          Habilidades técnicas
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto dark:text-gray-400">
          Desarrollo web, aplicaciones, automatización RPA, herramientas de IA y
          ofimática.
        </p>

        {skills.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Todavía no hay habilidades cargadas.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch stagger">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills
