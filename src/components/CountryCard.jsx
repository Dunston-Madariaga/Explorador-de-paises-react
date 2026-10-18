function CountryCard({ nombre, poblacion, region, capital }) {
  return (
    <article className="country-card">
      <h3>{nombre}</h3>
      <p><strong>Población:</strong> {poblacion}</p>
      <p><strong>Región:</strong> {region}</p>
      <p><strong>Capital:</strong> {capital}</p>
    </article>
  )
}

export default CountryCard
