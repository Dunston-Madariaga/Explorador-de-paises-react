import { usePaises } from '../context/PaisesContext'
import { obtenerPaisesVisibles } from '../utils/paises'
import CountryCard from './CountryCard'

function CountryList() {
  const { paises, cargando, error, mostrarTodos } = usePaises()
  const paisesVisibles = obtenerPaisesVisibles(paises, mostrarTodos)

  return (
    <>
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
    </>
  )
}

export default CountryList
