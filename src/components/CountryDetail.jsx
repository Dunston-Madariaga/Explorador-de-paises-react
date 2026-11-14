import { useEffect, useRef } from 'react'
import { usePaises } from '../context/PaisesContext'
import { formatearPoblacion, nombreRegion } from '../utils/paises'
import Icon from './Icon'

function CountryDetail() {
  const { paisSeleccionado } = usePaises()
  const panel = useRef(null)
  const bandera = paisSeleccionado?.flags?.svg || paisSeleccionado?.flags?.png

  useEffect(() => {
    if (paisSeleccionado && window.matchMedia?.('(width < 68.75rem)').matches) {
      panel.current.focus({ preventScroll: true })
      panel.current.scrollIntoView({ block: 'nearest' })
    }
  }, [paisSeleccionado])

  return (
    <aside ref={panel} tabIndex={-1} className="country-detail" aria-labelledby="titulo-detalle">
      <h2 id="titulo-detalle" className="country-detail__heading">Detalle del país</h2>
      <div aria-live="polite">
        {paisSeleccionado ? (
          <div className="country-detail__body">
            {bandera && <img className="country-detail__flag" src={bandera} alt={`Bandera de ${paisSeleccionado.name}`} />}
            <h3>{paisSeleccionado.name}</h3>
            <dl className="country-detail__facts">
              <div>
                <dt>Población</dt>
                <dd>{formatearPoblacion(paisSeleccionado.population)}</dd>
              </div>
              <div>
                <dt>Región</dt>
                <dd>{nombreRegion(paisSeleccionado.region)}</dd>
              </div>
              <div>
                <dt>Capital</dt>
                <dd>{paisSeleccionado.capital || 'Sin datos'}</dd>
              </div>
              {paisSeleccionado.alpha2Code && (
                <div>
                  <dt>Código del país</dt>
                  <dd>{paisSeleccionado.alpha2Code}</dd>
                </div>
              )}
            </dl>
          </div>
        ) : (
          <div className="country-detail__empty">
            <span><Icon name="globe" /></span>
            <p>Selecciona un país para ver sus detalles.</p>
          </div>
        )}
      </div>
    </aside>
  )
}

export default CountryDetail
