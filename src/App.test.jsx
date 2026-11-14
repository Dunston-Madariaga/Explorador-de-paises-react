import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StrictMode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('muestra los cuatro países al pulsar «Mostrar todos» y actualiza el botón', async () => {
    // Arrange
    const datos = [
      { alpha2Code: 'AR', name: 'Argentina' },
      {
        alpha2Code: 'BO',
        name: 'Bolivia',
        population: 12000000,
        region: 'Americas',
        capital: 'Sucre',
        flags: { svg: 'https://flagcdn.com/bo.svg' },
      },
      { alpha2Code: 'EG', name: 'Egipto' },
      { alpha2Code: 'DE', name: 'Alemania' },
    ]
    const json = vi.fn().mockResolvedValue(datos)
    const fetchSimulado = vi.fn().mockResolvedValue({ ok: true, json })
    vi.stubGlobal('fetch', fetchSimulado)
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const user = userEvent.setup()
    render(<StrictMode><App /></StrictMode>)

    expect(screen.getByRole('status')).toHaveTextContent('Cargando...')
    const botonMostrarTodos = await screen.findByRole('button', { name: 'Mostrar todos' })

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(fetchSimulado).toHaveBeenCalledWith('https://countries.dev/countries', expect.any(Object))
    expect(json).toHaveBeenCalledOnce()
    expect(log).toHaveBeenCalledWith(datos)
    expect(screen.getByRole('heading', { name: 'Argentina' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Bolivia' })).toBeVisible()
    expect(screen.getByRole('img', { name: 'Bandera de Bolivia' })).toHaveAttribute('src', datos[1].flags.svg)
    expect(screen.queryByRole('heading', { name: 'Egipto' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Alemania' })).not.toBeInTheDocument()

    // Act
    await user.click(botonMostrarTodos)

    // Assert
    expect(screen.getByRole('heading', { name: 'Argentina' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Bolivia' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Egipto' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Alemania' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Mostrar menos' })).toBeVisible()
    expect(fetchSimulado).toHaveBeenCalledOnce()
  })

  it('muestra un mensaje de error cuando la respuesta HTTP falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }))
    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudieron cargar los países.')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })
})
