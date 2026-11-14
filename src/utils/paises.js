export function obtenerPaisesVisibles(paises, mostrarTodos) {
  return mostrarTodos ? paises : paises.slice(0, 2)
}
