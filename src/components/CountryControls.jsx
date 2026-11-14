import { usePaises } from '../context/PaisesContext'
import { LIMITE_INICIAL_PAISES } from '../utils/paises'

function CountryControls() {
  const { paises, mostrarTodos, alternarMostrarTodos } = usePaises()

  if (paises.length <= LIMITE_INICIAL_PAISES) return null

  return (
    <button type="button" onClick={alternarMostrarTodos}>
      {mostrarTodos ? 'Mostrar menos' : 'Mostrar todos'}
    </button>
  )
}

export default CountryControls
