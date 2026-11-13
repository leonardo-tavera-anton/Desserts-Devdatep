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
