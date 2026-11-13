# NIVEL 1
git switch -c nivel-1

## REQUERIMIENTOS 
* Base de descarga https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d

## Dependencias al momento de crear el proyecto
* npm 11.20.0
* node v26.13.0
* python 3.13.17
* vite v8.3.8
* tailwindcss 4.3.5

## instalar dentro de la raiz del proyecto
* npm create vite@latest . -- --template react-ts
* npm install tailwindcss @tailwindcss/vite

- tailwind es un framework de CSS que usa clases utilitarias que facilita construir interfaces optimas sin CSS tradicional
- linter es el "corrector ortográfico" automático de código para evitar errores y malas prácticas, y ESLint es el programa q cumple esa función en React y TypeScript por eso me ayudara a futuro

# PARA INICIAR LOCALMENTE

## primera terminal para correr front
:5173 vite usa defecto (no cambiar o utilizar puerto)
* npm run dev

## segunda terminal para correr back
 1. cd src
 2. cd data
 3. npm install -D json-server
 4. npx json-server data.json --port 3000
- si da error cambiar de puerto 

# NIVEL 2
git switch -c nivel-2

## Dependencias para este parte
* axios@1.21.1

## Instalar dentro del proyecto
npm.cmd install axios @tanstack/react-query react-router-dom
npm.cmd run api




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
