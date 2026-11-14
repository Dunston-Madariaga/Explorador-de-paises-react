import { describe, expect, it } from 'vitest'
import { obtenerPaisesVisibles } from './paises'

describe('obtenerPaisesVisibles', () => {
  const paises = [
    { nombre: 'Argentina' },
    { nombre: 'Bolivia' },
    { nombre: 'Egipto' },
    { nombre: 'Alemania' },
  ]

  it('devuelve los primeros dos países si mostrarTodos es false', () => {
    expect(obtenerPaisesVisibles(paises, false)).toEqual([
      { nombre: 'Argentina' },
      { nombre: 'Bolivia' },
    ])
  })

  it('devuelve todos los países si mostrarTodos es true', () => {
    expect(obtenerPaisesVisibles(paises, true)).toEqual(paises)
  })
})
