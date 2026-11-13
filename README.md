# REQUERIMIENTOS PARA EL PROYECTO
* Base de descarga https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d

## Dependencias al momento de crear el proyecto
* npm 11.20.0
* node v26.13.0
* python 3.13.17
* vite v8.3.8
* tailwindcss 4.3.5

## Instalar dentro de la raiz del proyecto
* npm create vite@latest . -- --template react-ts
* npm install tailwindcss @tailwindcss/vite

- tailwind es un framework de CSS que usa clases utilitarias que facilita construir interfaces optimas sin CSS tradicional
- linter es el "corrector ortográfico" automático de código para evitar errores y malas prácticas, y ESLint es el programa q cumple esa función en React y TypeScript por eso me ayudara a futuro

# PARA INICIAR LOCALMENTE FRONTEND Y BACKEND

## Primera terminal para correr frontend
:5173 vite usa defecto (procurar no utilizar este puerto)
* npm run dev

## Segundo terminal para correr backend
 1. cd src
 2. cd data
 3. npm install -D json-server
 4. npx json-server data.json --port 3000
 5. npm run api (en caso no funcione npx)

## Informacion 

-Tienda virtual de postres inspirada en Frontend Mentor, desarrollada con React, Vite, TypeScript y Tailwind CSS.
-La interfaz del Nivel 1 importa su lista de productos desde src/data/data.json. Intencionalmente no realiza peticiones a la API; la API local está disponible para los niveles posteriores del desafio.

## Funcionalidades del nivel 1

- Lista de productos responsiva con datos de productos locales.
- Agregar y eliminar productos, ajustar cantidades y calcular el total del pedido.
- Panel de carrito vacio al lado de los productos en computadoras de escritorio y debajo de ellos en dispositivos moviles.
- Modal de confirmacion de pedido con los productos seleccionados y el total.
- Estilos con Tailwind CSS y tipografía Red Hat Text.
- Sin Axios, TanStack Query ni React Router en este nivel.

## Estructura de proyecto

- *src/components:* Encabezado (Header), tarjeta de producto, selector de cantidad, panel lateral del carrito y modal de confirmacion.
- *src/data/data.json:* Datos locales de productos y el recurso para JSON Server.
- *public/assets:* Imagenes y archivos de fuentes servidos por Vite y copiados a las compilaciones de producción.

## Comandos

- *npm run dev:* inicia Vite.
- *npm run api:* inicia JSON Server en el puerto 3000.
- *npm run build:* verifica los tipos y compila la aplicación para producción.
- *npm run preview:* previsualiza la compilación de producción.
- *npm run lint:* ejecuta ESLint.
