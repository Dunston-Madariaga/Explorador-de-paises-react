import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CountryCard from './CountryCard'

describe('CountryCard', () => {
  it('muestra el nombre, la población, la región y la capital de Bolivia', () => {
    render(
      <CountryCard
        nombre="Bolivia"
        poblacion={12000000}
        region="América"
        capital="Sucre"
      />,
    )

    expect(screen.getByRole('heading', { name: 'Bolivia' })).toBeVisible()

    const poblacion = screen.getByText('12.000.000')
    const region = screen.getByText('América')
    const capital = screen.getByText('Sucre')

    expect(poblacion).toBeVisible()
    expect(poblacion).toHaveTextContent('Población: 12.000.000')
    expect(region).toBeVisible()
    expect(region).toHaveTextContent('Región: América')
    expect(capital).toBeVisible()
    expect(capital).toHaveTextContent('Capital: Sucre')
  })
})
