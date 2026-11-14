import { createContext, useContext, useEffect, useState } from 'react'

const URL_PAISES = 'https://countries.dev/countries'
const PaisesContext = createContext(null)

export function PaisesProvider({ children }) {
  const [paises, setPaises] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [mostrarTodos, setMostrarTodos] = useState(false)

  useEffect(() => {
    const controlador = new AbortController()
    const { signal } = controlador

    async function cargarPaises() {
      try {
        const response = await fetch(URL_PAISES, { signal })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const datos = await response.json()
        if (signal.aborted) return
        if (!Array.isArray(datos)) throw new Error('Se esperaba una lista de países')

        console.log(datos)
        setPaises(datos)
      } catch {
        if (!signal.aborted) setError(true)
      } finally {
        if (!signal.aborted) setCargando(false)
      }
    }

    // StrictMode cancela el primer efecto de prueba antes de iniciar la petición.
    queueMicrotask(() => {
      if (!signal.aborted) cargarPaises()
    })

    return () => controlador.abort()
  }, [])

  function alternarMostrarTodos() {
    setMostrarTodos((valorActual) => !valorActual)
  }

  return (
    <PaisesContext.Provider value={{ paises, cargando, error, mostrarTodos, alternarMostrarTodos }}>
      {children}
    </PaisesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- El hook se exporta junto a su Provider.
export function usePaises() {
  const contexto = useContext(PaisesContext)

  if (contexto === null) {
    throw new Error('usePaises debe usarse dentro de PaisesProvider.')
  }

  return contexto
}
