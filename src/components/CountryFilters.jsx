import { usePaises } from '../context/PaisesContext'
import { REGIONES } from '../utils/paises'
import Icon from './Icon'

function CountryFilters() {
  const { busqueda, cambiarBusqueda, region, cambiarRegion } = usePaises()

  return (
    <div className="country-filters">
      <div className="country-filters__search">
        <span className="country-filters__icon"><Icon name="search" /></span>
        <label htmlFor="buscar-pais">Buscar país</label>
        <input
          id="buscar-pais"
          type="search"
          placeholder="Ej. Bolivia"
          value={busqueda}
          onChange={(event) => cambiarBusqueda(event.target.value)}
        />
      </div>
      <div className="country-filters__region">
        <label htmlFor="filtrar-region">Filtrar por región</label>
        <select id="filtrar-region" value={region} onChange={(event) => cambiarRegion(event.target.value)}>
          <option value="">Todas</option>
          {Object.entries(REGIONES).map(([valor, etiqueta]) => (
            <option key={valor} value={valor}>{etiqueta}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CountryFilters
