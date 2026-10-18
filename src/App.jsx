import { useState } from 'react'
import Header from './components/Header'
import CountryCard from './components/CountryCard'

const paises = [
  {
    id: 1,
    nombre: 'Argentina',
    poblacion: 46000000,
    region: 'América',
    capital: 'Buenos Aires',
  },
  {
    id: 2,
    nombre: 'Bolivia',
    poblacion: 12000000,
    region: 'América',
    capital: 'Sucre',
  },
  {
    id: 3,
    nombre: 'Egipto',
    poblacion: 112000000,
    region: 'África',
    capital: 'El Cairo',
  },
  {
    id: 4,
    nombre: 'Alemania',
    poblacion: 84000000,
    region: 'Europa',
    capital: 'Berlín',
  },
]

function App() {
  const [mostrarTodos, setMostrarTodos] = useState(false)
  const paisesVisibles = mostrarTodos ? paises : paises.slice(0, 2)

  return (
    <>
      <Header />
      <main>
        <h2>Países</h2>
        <p>Datos de ejemplo para practicar React.</p>

        <div className="country-list">
          {paisesVisibles.map((pais) => (
            <CountryCard
              key={pais.id}
              nombre={pais.nombre}
              poblacion={pais.poblacion}
              region={pais.region}
              capital={pais.capital}
            />
          ))}
        </div>

        <button type="button" onClick={() => setMostrarTodos(!mostrarTodos)}>
          {mostrarTodos ? 'Mostrar menos' : 'Mostrar todos'}
        </button>
      </main>
    </>
  )
}

export default App
