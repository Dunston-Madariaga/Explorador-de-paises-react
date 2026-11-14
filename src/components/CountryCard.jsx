function CountryCard({ nombre, poblacion, region, capital, bandera }) {
  return (
    <article className="country-card">
      <h3>{nombre}</h3>
      {bandera && <img src={bandera} alt={`Bandera de ${nombre}`} width="64" loading="lazy" />}
      <p><strong>Población:</strong> {poblacion ?? 'Sin datos'}</p>
      <p><strong>Región:</strong> {region || 'Sin datos'}</p>
      <p><strong>Capital:</strong> {capital || 'Sin datos'}</p>
    </article>
  )
}

export default CountryCard
