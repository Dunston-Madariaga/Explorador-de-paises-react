export const LIMITE_INICIAL_PAISES = 9

export const REGIONES = {
  Africa: 'África',
  Americas: 'América',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
}

const formatoPoblacion = new Intl.NumberFormat('es-BO')

export function formatearPoblacion(poblacion) {
  return poblacion == null ? 'Sin datos' : formatoPoblacion.format(poblacion)
}

export function nombreRegion(region) {
  return (REGIONES[region] ?? region) || 'Sin datos'
}

function normalizarNombre(nombre) {
  return nombre.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

export function filtrarPaises(paises, busqueda, region) {
  const consulta = normalizarNombre(busqueda.trim())

  return paises.filter((pais) => (
    (!region || pais.region === region) && normalizarNombre(pais.name ?? '').includes(consulta)
  ))
}

export function obtenerPaisesVisibles(paises, mostrarTodos) {
  return mostrarTodos ? paises : paises.slice(0, LIMITE_INICIAL_PAISES)
}
