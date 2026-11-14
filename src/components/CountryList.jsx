import { usePaises } from '../context/PaisesContext'
import { obtenerPaisesVisibles } from '../utils/paises'
import CountryCard from './CountryCard'

function CountryList() {
  const { paisesFiltrados, cargando, error, mostrarTodos, paisSeleccionado, seleccionarPais } = usePaises()
  const paisesVisibles = obtenerPaisesVisibles(paisesFiltrados, mostrarTodos)

  if (cargando) return <p className="list-message" role="status">Cargando...</p>
  if (error) return <p className="list-message list-message--error" role="alert">No se pudieron cargar los países.</p>
  if (!paisesVisibles.length) return <p className="list-message" role="status">No se encontraron países.</p>

  return (
    <div id="lista-paises" className="country-list">
      {paisesVisibles.map((pais) => (
        <CountryCard
          key={pais.alpha2Code}
          nombre={pais.name}
          poblacion={pais.population}
          region={pais.region}
          capital={pais.capital}
          bandera={pais.flags?.svg || pais.flags?.png}
          seleccionado={pais === paisSeleccionado}
          onSeleccionar={() => seleccionarPais(pais)}
        />
      ))}
    </div>
  )
}

export default CountryList
