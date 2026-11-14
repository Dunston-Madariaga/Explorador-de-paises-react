# Explorador de países

Prácticas universitarias con Vite, React y JavaScript.

El explorador muestra inicialmente nueve países. «Mostrar todos» expande los
resultados y «Mostrar menos» vuelve a limitar la lista. La búsqueda por nombre
y el filtro por región se pueden combinar sobre los países cargados.

## Conceptos de la segunda práctica

- **Props:** `CountryCard.jsx` recibe `nombre`, `poblacion`, `region`, `capital` y `bandera`.
- `CountryList.jsx` utiliza `map()` para crear las tarjetas con `key={pais.alpha2Code}`.
- `PaisesProvider` utiliza `useState(false)` para controlar cuántos países se muestran.
- El `onClick` del botón llama a `alternarMostrarTodos` y actualiza la lista.

## Primer consumo de una API pública

El proyecto obtiene los países de la API pública [countries.dev](https://countries.dev).
La URL base es `https://countries.dev` y el endpoint utilizado es
[`GET https://countries.dev/countries`](https://countries.dev/countries).

Al montar `PaisesProvider`, `useEffect` ejecuta una petición GET con `fetch`. La
respuesta se convierte en un arreglo con `response.json()`, se muestra en la
consola con `console.log` y se guarda en `paises`. `AbortController` cancela la
petición si el Provider se desmonta.

## Instalar las dependencias

```bash
npm install
```

## Probar la aplicación

Desde la carpeta del proyecto, ejecuta:

```bash
npm run dev
```

Abre en el navegador la dirección que indique Vite en la terminal.

## Comprobar la compilación y revisar el código

```bash
npm run build
npm run lint
```

## Archivos principales

- `src/main.jsx`: inicia React y carga los estilos.
- `src/App.jsx` compone la pantalla dentro de `PaisesProvider`.
- `src/context/PaisesContext.jsx` define el contexto, el Provider y el hook `usePaises`.
- `src/components/Header.jsx` muestra el título, la navegación y el botón de tema.
- `src/components/CountryFilters.jsx` permite buscar por nombre y filtrar por región.
- `src/components/CountryList.jsx` muestra el estado de la carga y las tarjetas visibles.
- `src/components/CountryControls.jsx` muestra el botón para expandir o contraer la lista.
- `src/components/CountryCard.jsx`: recibe y muestra los datos de cada país.
- `src/components/CountryDetail.jsx` muestra los datos del país seleccionado.
- `src/index.css` define los temas y la distribución adaptable.

## Estado compartido con Context API

`PaisesContext` comparte el estado de la carga y del listado.

- `paises` almacena los datos recibidos.
- `cargando` indica que la petición está en curso.
- `error` indica que hubo un problema al cargar los países.
- `mostrarTodos` determina si se muestran nueve países o todos los resultados.
- `busqueda` y `region` determinan los países que integran `paisesFiltrados`.
- `paisSeleccionado` guarda el país que se muestra en el panel de detalle.

`PaisesProvider` centraliza el estado, la carga de datos y la acción
`alternarMostrarTodos`. `App` monta el Provider alrededor de la pantalla.
`CountryList` y `CountryControls` consumen el contexto directamente mediante
`usePaises`. Así, `App` no tiene que pasar esos datos ni la acción por props a
componentes intermedios.

Al pulsar el botón, el cambio de `mostrarTodos` actualiza las tarjetas de
`CountryList` y el texto del botón de `CountryControls`. Se eligió Context API
porque el estado compartido del proyecto es pequeño y no requiere Redux Toolkit.

## Pruebas y calidad de código

El proyecto incorpora pruebas automatizadas utilizando **Vitest** y **React Testing Library**.

Actualmente se verifican:

- funciones puras mediante pruebas unitarias;
- renderizado de componentes;
- contenido visible mediante `screen`;
- interacción del usuario mediante `userEvent`;
- cambios de estado después de eventos.

### Ejecutar las pruebas

```bash
npm run test:run
```
