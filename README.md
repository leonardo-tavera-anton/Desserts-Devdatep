# Desserts

SPA de una tienda de postres creada con React, Vite y TypeScript. Consume una API local de `json-server` y organiza el trabajo en tres niveles: interfaz de tienda, navegación y datos, y finalmente carrito persistente y CRUD de productos.

## Funcionalidades

- Catálogo responsive con búsqueda por nombre, filtro por categoría y paginación de 8 productos.
- Vista de detalle por producto y página 404 para productos inexistentes.
- Carrito con Zustand, persistencia en `localStorage`, cantidades y total.
- Drawer móvil del carrito y columna visible en escritorio.
- Confirmación de orden y limpieza del carrito al iniciar una nueva orden.
- CRUD de productos con Axios, TanStack Query, React Hook Form y Zod.
- Toasts de éxito y error para crear, actualizar y eliminar productos.

## Requisitos

- Node.js y npm instalados.

## Instalación y ejecución

Instala las dependencias desde la raíz del proyecto:

```bash
npm install
```

Inicia la API y el frontend en terminales separadas:

```bash
npm run api
```

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API local: http://localhost:3000

En Windows PowerShell también se pueden ejecutar los comandos con `npm.cmd`.

La URL del API puede cambiarse con la variable `VITE_API_URL`. Para desarrollo local no es obligatorio definirla: por defecto se usa `http://localhost:3000`.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Vite en modo desarrollo. |
| `npm run api` | Inicia json-server con `src/data/data.json` en el puerto 3000. |
| `npm run build` | Ejecuta TypeScript y genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la versión generada en `dist/`. |
| `npm run lint` | Ejecuta ESLint. |

## API local

La base de datos de desarrollo está en `src/data/data.json`. El proyecto no consume APIs de terceros.

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/products` | Lista los productos. |
| GET | `/products/:id` | Obtiene el detalle de un producto. |
| POST | `/products` | Crea un producto. |
| PUT | `/products/:id` | Actualiza un producto. |
| DELETE | `/products/:id` | Elimina un producto. |
| GET | `/categories` | Obtiene las categorías para el filtro. |

La lista del catálogo solicita páginas con `_page` y `_per_page=8`. La búsqueda se envía al servidor con `name:contains`; el filtro de categoría se envía como `category`. Por ejemplo:

```text
GET /products?name:contains=waffle&category=Waffle&_page=1&_per_page=8
```

json-server devuelve los productos de la página junto con metadatos de paginación. Las operaciones de escritura son locales al archivo de datos; no se requiere una API externa.

## Arquitectura

```text
src/
├── components/   Componentes visuales: catálogo, formulario, carrito, modal y Toast
├── data/         Datos iniciales de json-server
├── hooks/        Hooks de consulta, categorías y mutaciones
├── pages/        Inicio, detalle, administración y 404
├── queries/      Query options y claves de caché de TanStack Query
├── schemas/      Validación de formularios con Zod
├── services/     Cliente Axios y peticiones a la API
├── store/        Estado persistente del carrito con Zustand
├── types/        Tipos de productos y respuestas
└── utils/        Funciones compartidas
```

Rutas de la aplicación:

- `/` — catálogo y carrito.
- `/producto/:id` — detalle del producto.
- `/admin/productos` — gestión CRUD.

## Decisiones técnicas

- Las consultas y las mutaciones de TanStack Query están separadas en `useProductsQueries` y `useProductsMutations`; las peticiones HTTP viven en los servicios.
- Las claves de consulta incluyen los filtros y la página para mantener cada resultado identificado en la caché. Las mutaciones invalidan las consultas de productos al terminar correctamente.
- El carrito se persiste en `localStorage` mediante Zustand.
- React Hook Form administra el formulario reutilizado para crear y editar; Zod valida sus datos.
- El filtro de nombre y categoría se ejecuta en json-server antes de aplicar la paginación.

## Deploy

El archivo `netlify.toml` configura el build de Vite, publica `dist/` y redirige las rutas de React Router a `index.html`. Antes de desplegar, configura `VITE_API_URL` en Netlify con la URL pública del API. El frontend publicado puede acceder al `localhost:3000` la api local de de la computadora del visitante.
