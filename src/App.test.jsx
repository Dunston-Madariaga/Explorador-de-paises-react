import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('muestra los cuatro países al pulsar «Mostrar todos» y actualiza el botón', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<App />)
    const botonMostrarTodos = screen.getByRole('button', { name: 'Mostrar todos' })

    expect(screen.getByRole('heading', { name: 'Argentina' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Bolivia' })).toBeVisible()
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
  })
})
