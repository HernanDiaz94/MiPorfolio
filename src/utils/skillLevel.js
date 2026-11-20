// El nivel se guarda como texto en la tabla skills, así que no sirve ordenar
// con ORDER BY en la base: el orden alfabético deja "Principiante" antes que
// "Experto". Acá se define el orden real de los niveles.
export const levelPriority = {
  Experto: 3,
  Intermedio: 2,
  Principiante: 1,
}

export const sortByLevel = (skills) =>
  [...skills].sort(
    (a, b) => (levelPriority[b.nivel] ?? 0) - (levelPriority[a.nivel] ?? 0)
  )
