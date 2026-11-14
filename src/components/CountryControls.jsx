import { usePaises } from '../context/PaisesContext'
import { LIMITE_INICIAL_PAISES } from '../utils/paises'

function CountryControls() {
  const { paisesFiltrados, mostrarTodos, alternarMostrarTodos } = usePaises()

  if (paisesFiltrados.length <= LIMITE_INICIAL_PAISES) return null

  return (
    <div className="country-controls">
      <button
        type="button"
        className="country-controls__button"
        aria-controls="lista-paises"
        aria-expanded={mostrarTodos}
        onClick={alternarMostrarTodos}
      >
        {mostrarTodos ? 'Mostrar menos' : 'Mostrar todos'}
      </button>
    </div>
  )
}

export default CountryControls
