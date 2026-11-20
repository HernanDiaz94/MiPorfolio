import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sortByLevel } from './skillLevel.js'

test('ordena las habilidades de mayor a menor nivel', () => {
  const input = [
    { habilidad: 'A', nivel: 'Principiante' },
    { habilidad: 'B', nivel: 'Intermedio' },
    { habilidad: 'C', nivel: 'Experto' },
  ]

  const result = sortByLevel(input).map((skill) => skill.nivel)

  assert.deepEqual(result, ['Experto', 'Intermedio', 'Principiante'])
})

test('mantiene el orden original entre habilidades del mismo nivel', () => {
  const input = [
    { habilidad: 'B', nivel: 'Intermedio' },
    { habilidad: 'A', nivel: 'Intermedio' },
  ]

  assert.deepEqual(
    sortByLevel(input).map((skill) => skill.habilidad),
    ['B', 'A']
  )
})

test('deja los niveles desconocidos al final', () => {
  const input = [{ habilidad: 'A' }, { habilidad: 'B', nivel: 'Experto' }]

  assert.deepEqual(
    sortByLevel(input).map((skill) => skill.habilidad),
    ['B', 'A']
  )
})

test('no modifica el array original', () => {
  const input = [
    { habilidad: 'A', nivel: 'Principiante' },
    { habilidad: 'B', nivel: 'Experto' },
  ]

  sortByLevel(input)

  assert.deepEqual(
    input.map((skill) => skill.habilidad),
    ['A', 'B']
  )
})

test('soporta un array vacío', () => {
  assert.deepEqual(sortByLevel([]), [])
})
