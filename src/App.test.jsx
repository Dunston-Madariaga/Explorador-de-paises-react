import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StrictMode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const datos = [
  { alpha2Code: 'AR', name: 'Argentina', region: 'Americas' },
  {
    alpha2Code: 'BO',
    name: 'Bolivia',
    population: 12000000,
    region: 'Americas',
    capital: 'Sucre',
    flags: { svg: 'https://flagcdn.com/bo.svg' },
  },
  { alpha2Code: 'BR', name: 'Brasil', region: 'Americas' },
  { alpha2Code: 'CA', name: 'Canadá', region: 'Americas' },
  { alpha2Code: 'CL', name: 'Chile', region: 'Americas' },
  { alpha2Code: 'CO', name: 'Colombia', region: 'Americas' },
  { alpha2Code: 'EC', name: 'Ecuador', region: 'Americas' },
  { alpha2Code: 'MX', name: 'México', region: 'Americas' },
  { alpha2Code: 'EG', name: 'Egipto', region: 'Africa' },
  { alpha2Code: 'DE', name: 'Alemania', region: 'Europe' },
  { alpha2Code: 'PE', name: 'Perú', region: 'Americas' },
  { alpha2Code: 'UY', name: 'Uruguay', region: 'Americas' },
]

function simularCarga() {
  const json = vi.fn().mockResolvedValue(datos)
  const fetchSimulado = vi.fn().mockResolvedValue({ ok: true, json })
  vi.stubGlobal('fetch', fetchSimulado)
  const log = vi.spyOn(console, 'log').mockImplementation(() => {})
  return { fetchSimulado, json, log }
}

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('muestra nueve países al cargar y la lista completa al pulsar «Mostrar todos»', async () => {
    const { fetchSimulado, json, log } = simularCarga()
    const user = userEvent.setup()
    render(<StrictMode><App /></StrictMode>)

    expect(screen.getByRole('status')).toHaveTextContent('Cargando...')
    const botonMostrarTodos = await screen.findByRole('button', { name: 'Mostrar todos' })

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(fetchSimulado).toHaveBeenCalledWith('https://countries.dev/countries', expect.any(Object))
    expect(json).toHaveBeenCalledOnce()
    expect(log).toHaveBeenCalledWith(datos)
    expect(screen.getAllByRole('article')).toHaveLength(9)
    expect(screen.getByRole('heading', { name: 'Argentina' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Bolivia' })).toBeVisible()
    expect(screen.getByRole('img', { name: 'Bandera de Bolivia' })).toHaveAttribute('src', datos[1].flags.svg)
    expect(screen.queryByRole('heading', { name: 'Alemania' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Uruguay' })).not.toBeInTheDocument()

    await user.click(botonMostrarTodos)

    expect(screen.getAllByRole('article')).toHaveLength(datos.length)
    expect(screen.getByRole('heading', { name: 'Argentina' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Bolivia' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Egipto' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Alemania' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Mostrar menos' })).toBeVisible()
    expect(fetchSimulado).toHaveBeenCalledOnce()
  })

  it('muestra el detalle al seleccionar una tarjeta y permite cambiar el país por teclado', async () => {
    simularCarga()
    const user = userEvent.setup()
    render(<App />)

    const detalle = within(screen.getByRole('complementary', { name: 'Detalle del país' }))
    expect(detalle.getByText('Selecciona un país para ver sus detalles.')).toBeVisible()

    const bolivia = await screen.findByRole('button', { name: 'Bolivia' })
    await user.click(bolivia)

    expect(bolivia).toHaveAttribute('aria-pressed', 'true')
    expect(detalle.getByRole('heading', { name: 'Bolivia' })).toBeVisible()
    expect(detalle.getByRole('img', { name: 'Bandera de Bolivia' })).toHaveAttribute('src', datos[1].flags.svg)
    expect(detalle.getByText('12.000.000')).toBeVisible()
    expect(detalle.getByText('América')).toBeVisible()
    expect(detalle.getByText('Sucre')).toBeVisible()

    await user.tab()
    const brasil = screen.getByRole('button', { name: 'Brasil' })
    expect(brasil).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(bolivia).toHaveAttribute('aria-pressed', 'false')
    expect(brasil).toHaveAttribute('aria-pressed', 'true')
    expect(detalle.getByRole('heading', { name: 'Brasil' })).toBeVisible()
  })

  it('combina la región y el nombre y aplica el límite al resultado filtrado sin volver a consultar la API', async () => {
    const { fetchSimulado } = simularCarga()
    const user = userEvent.setup()
    render(<App />)

    await screen.findByRole('button', { name: 'Bolivia' })
    const region = screen.getByRole('combobox', { name: 'Filtrar por región' })
    await user.selectOptions(region, 'Americas')

    expect(screen.getAllByRole('article')).toHaveLength(9)
    expect(screen.queryByRole('button', { name: 'Egipto' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Uruguay' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Mostrar todos' }))
    expect(screen.getAllByRole('article')).toHaveLength(10)
    expect(screen.getByRole('button', { name: 'Uruguay' })).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Mostrar menos' }))
    expect(screen.getAllByRole('article')).toHaveLength(9)

    const busqueda = screen.getByRole('searchbox', { name: 'Buscar país' })
    await user.type(busqueda, 'CANADA')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('button', { name: 'Canadá' })).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Mostrar todos' })).not.toBeInTheDocument()

    await user.selectOptions(region, 'Europe')
    expect(screen.getByRole('status')).toHaveTextContent('No se encontraron países.')
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
