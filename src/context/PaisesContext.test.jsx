import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import CountryControls from '../components/CountryControls'
import CountryList from '../components/CountryList'
import { PaisesProvider } from './PaisesContext'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

it('sincroniza la lista y el botón al mostrar todos y volver a mostrar nueve países', async () => {
  const paises = [
    { alpha2Code: 'AR', name: 'Argentina' },
    { alpha2Code: 'BO', name: 'Bolivia' },
    { alpha2Code: 'BR', name: 'Brasil' },
    { alpha2Code: 'CA', name: 'Canadá' },
    { alpha2Code: 'CL', name: 'Chile' },
    { alpha2Code: 'CO', name: 'Colombia' },
    { alpha2Code: 'EC', name: 'Ecuador' },
    { alpha2Code: 'MX', name: 'México' },
    { alpha2Code: 'PE', name: 'Perú' },
    { alpha2Code: 'EG', name: 'Egipto' },
  ]
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => paises,
  }))
  vi.spyOn(console, 'log').mockImplementation(() => {})
  const user = userEvent.setup()

  render(
    <PaisesProvider>
      <CountryList />
      <CountryControls />
    </PaisesProvider>,
  )

  const mostrarTodos = await screen.findByRole('button', { name: 'Mostrar todos' })
  expect(screen.getAllByRole('article')).toHaveLength(9)

  await user.click(mostrarTodos)
  const mostrarMenos = screen.getByRole('button', { name: 'Mostrar menos' })
  expect(screen.getAllByRole('article')).toHaveLength(10)
  expect(screen.getByRole('heading', { name: 'Egipto' })).toBeVisible()

  await user.click(mostrarMenos)
  expect(screen.getByRole('button', { name: 'Mostrar todos' })).toBeVisible()
  expect(screen.getAllByRole('article')).toHaveLength(9)
  expect(screen.queryByRole('heading', { name: 'Egipto' })).not.toBeInTheDocument()
})
