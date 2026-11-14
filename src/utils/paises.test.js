import { describe, expect, it } from 'vitest'
import { obtenerPaisesVisibles } from './paises'

describe('obtenerPaisesVisibles', () => {
  const paises = [
    { nombre: 'Argentina' },
    { nombre: 'Bolivia' },
    { nombre: 'Egipto' },
    { nombre: 'Alemania' },
    { nombre: 'España' },
    { nombre: 'India' },
    { nombre: 'Rusia' },
    { nombre: 'Venezuela' },
    { nombre: 'Japón' },
    { nombre: 'Francia' },
  ]

  it('devuelve los primeros nueve países si mostrarTodos es false', () => {
    expect(obtenerPaisesVisibles(paises, false)).toEqual(paises.slice(0, 9))
  })

  it('devuelve todos los países si mostrarTodos es true', () => {
    expect(obtenerPaisesVisibles(paises, true)).toEqual(paises)
  })
})
