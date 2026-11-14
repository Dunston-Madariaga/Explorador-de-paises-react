import { useEffect, useState } from 'react'
import Header from './components/Header'
import CountryCard from './components/CountryCard'
import { obtenerPaisesVisibles } from './utils/paises'

const URL_PAISES = 'https://countries.dev/countries'

function App() {
  const [paises, setPaises] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [mostrarTodos, setMostrarTodos] = useState(false)
  const paisesVisibles = obtenerPaisesVisibles(paises, mostrarTodos)

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

  return (
    <>
      <Header />
      <main>
        <h2>Países</h2>
        {cargando && <p role="status">Cargando...</p>}
        {error && <p role="alert">No se pudieron cargar los países.</p>}

        {paisesVisibles.length > 0 && (
          <div className="country-list">
            {paisesVisibles.map((pais) => (
              <CountryCard
                key={pais.alpha2Code}
                nombre={pais.name}
                poblacion={pais.population}
                region={pais.region}
                capital={pais.capital}
                bandera={pais.flags?.svg || pais.flags?.png}
              />
            ))}
          </div>
        )}

        {paises.length > 2 && (
          <button type="button" onClick={() => setMostrarTodos(!mostrarTodos)}>
            {mostrarTodos ? 'Mostrar menos' : 'Mostrar todos'}
          </button>
        )}
      </main>
    </>
  )
}

export default App
