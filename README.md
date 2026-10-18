# Explorador de países

Prácticas universitarias con Vite, React y JavaScript.

La primera práctica muestra un encabezado con el título «¿En qué parte del mundo?»
y una breve descripción del proyecto mediante el componente `Header`.

La segunda práctica agrega tarjetas con datos de ejemplo de Argentina, Bolivia,
Egipto y Alemania. Inicialmente se muestran dos países. El botón «Mostrar todos»
permite ver los cuatro y cambia a «Mostrar menos» para volver a mostrar dos.

## Conceptos de la segunda práctica

- **Props:** `CountryCard.jsx` recibe `nombre`, `poblacion`, `region` y `capital`.
- **Lista:** `App.jsx` utiliza `map()` para crear las tarjetas con `key={pais.id}`.
- **Estado:** `App.jsx` utiliza `useState(false)` para controlar cuántos países se muestran.
- **Eventos:** el `onClick` del botón llama a `setMostrarTodos` y actualiza la lista.

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
- `src/App.jsx`: conserva `Header`, define los países y controla la lista visible.
- `src/components/Header.jsx`: muestra el título y la descripción.
- `src/components/CountryCard.jsx`: recibe y muestra los datos de cada país.
- `src/index.css`: contiene los estilos básicos.
