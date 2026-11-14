import { formatearPoblacion, nombreRegion } from '../utils/paises'
import Icon from './Icon'

function CountryCard({ nombre, poblacion, region, capital, bandera, seleccionado = false, onSeleccionar }) {
  return (
    <article className="country-card">
      <div className="country-card__flag">
        {bandera ? <img src={bandera} alt={`Bandera de ${nombre}`} loading="lazy" /> : <Icon name="globe" />}
      </div>
      <div className="country-card__body">
        <h3>
          <button type="button" className="country-card__button" aria-pressed={seleccionado} onClick={onSeleccionar}>
            {nombre}
          </button>
        </h3>
        <p><strong>Población:</strong> {formatearPoblacion(poblacion)}</p>
        <p><strong>Región:</strong> {nombreRegion(region)}</p>
        <p><strong>Capital:</strong> {capital || 'Sin datos'}</p>
      </div>
      {seleccionado && <span className="country-card__check"><Icon name="check" /></span>}
    </article>
  )
}

export default CountryCard
