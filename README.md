# Explorador de países

Prácticas universitarias con Vite, React y JavaScript.

La primera práctica muestra un encabezado con el título «¿En qué parte del mundo?»
y una breve descripción del proyecto mediante el componente `Header`.

La segunda práctica agrega tarjetas con datos de ejemplo de Argentina, Bolivia,
Egipto y Alemania. Se conserva ese comportamiento con los datos de la API.
Inicialmente se muestran dos países. El botón «Mostrar todos» permite ver la lista
completa y cambia a «Mostrar menos» para volver a mostrar dos.

## Conceptos de la segunda práctica

- **Props:** `CountryCard.jsx` recibe `nombre`, `poblacion`, `region`, `capital` y `bandera`.
- **Lista:** `App.jsx` utiliza `map()` para crear las tarjetas con `key={pais.alpha2Code}`.
- **Estado:** `App.jsx` utiliza `useState(false)` para controlar cuántos países se muestran.
- **Eventos:** el `onClick` del botón llama a `setMostrarTodos` y actualiza la lista.

## Primer consumo de una API pública

El proyecto obtiene los países de la API pública [countries.dev](https://countries.dev).
La URL base es `https://countries.dev` y el endpoint utilizado es
[`GET https://countries.dev/countries`](https://countries.dev/countries).

Al montar `App.jsx`, `useEffect` ejecuta una petición GET con `fetch`. La respuesta
se convierte en un arreglo con `response.json()`, se muestra en la consola con
`console.log` y se guarda en un estado creado con `useState`. El componente
también usa `useState` para indicar si la petición está en curso o si hubo un error.

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
- `src/App.jsx`: carga los países de la API y controla la lista visible.
- `src/components/Header.jsx`: muestra el título y la descripción.
- `src/components/CountryCard.jsx`: recibe y muestra los datos de cada país.
- `src/index.css`: contiene los estilos básicos.

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
