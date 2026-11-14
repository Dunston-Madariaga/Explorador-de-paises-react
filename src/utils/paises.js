export const LIMITE_INICIAL_PAISES = 2

export function obtenerPaisesVisibles(paises, mostrarTodos) {
  return mostrarTodos ? paises : paises.slice(0, LIMITE_INICIAL_PAISES)
}
