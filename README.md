# REQUERIMIENTOS PARA EL PROYECTO

Base de descarga https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d
_mi instalacion actual al momento de crear el proyecto_
npm 11.20.0
node v26.13.0
python 3.13.17

_instalar carpeta fuente del proyecto_
npm create vite@latest . -- --template react-ts

* un linter es el "corrector ortográfico" automático de código para evitar
errores y malas prácticas, y ESLint es el programa q cumple esa función en
React y TypeScript por eso me ayudara a futuro

VITE v8.3.8  ready in 631 ms
http://localhost:5173/


_instalar tailwindcss dentro del proyecto_
npm install tailwindcss @tailwindcss/vite

* tailwind es un framework de CSS que usa clases utilitarias que facilita
construir interfaces optimas sin CSS tradicional


PARA INICIAR LOCALMENTE FRONTEND Y BACKEND

_primera terminal para correr front_
:5173 (vite usa pr defecto)
npm run dev

_segundo terminal para correr base de datos local_
cd src, cd data
npm install -D json-server
:3000 (si da error pueden cambiar de puerto)
npx json-server data.json --port 3000

* use useState para hacer el carrito funcional esto es algo
extra que no pedian pero solo agregue para ver funcionalidad




# Desserts

Frontend Mentor inspired dessert storefront built with React, Vite, TypeScript, and Tailwind CSS.

## Requirements

- Node.js and npm
- Install dependencies with `npm install`

## Run locally

Open two terminals in the project folder:

1. Start the frontend with `npm run dev` (Vite serves `http://localhost:5173`).
2. Start the local JSON Server with `npm run api` (API serves `http://localhost:3000/products`).

The Level 1 interface imports its product list from `src/data/data.json`. It intentionally does not make API requests; the local API is available for the later challenge levels.

## Level 1 features

- Responsive product list with local product data.
- Add and remove products, adjust quantities, and calculate the order total.
- Empty cart panel beside the products on desktop and below them on mobile.
- Order confirmation modal with the selected products and total.
- Tailwind CSS styling and Red Hat Text typography.
- No Axios, TanStack Query, or React Router in this level.

## Project structure

- `src/components`: Header, product card, quantity stepper, cart drawer, and confirmation modal.
- `src/data/data.json`: local product data and the JSON Server resource.
- `public/assets`: images and font files served by Vite and copied into production builds.

## Scripts

- `npm run dev`: start Vite.
- `npm run api`: start JSON Server on port 3000.
- `npm run build`: type-check and build the production app.
- `npm run preview`: preview the production build.
- `npm run lint`: run ESLint.
