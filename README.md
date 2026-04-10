# React SSR Challenge

Resolución del challenge técnico usando **Next.js (App Router)**, **React**, **TypeScript** y **CSS puro**, sin librerías de componentes.

## Qué incluye

- Listado de productos usando datos mockeados simulando una llamada a API.
- Filtro por título.
- Marcado y desmarcado de favoritos.
- Vista de detalle por producto.
- Carrito con:
  - contador de productos **distintos** en header
  - popup desplegable
  - suma y resta de unidades
  - eliminación individual
  - total calculado
- Persistencia de favoritos y carrito con `localStorage`.
- Estado vacío para búsquedas sin resultados.
- Página `not-found` para ids inválidos.

## Decisiones técnicas

### 1. Next.js App Router
Se eligió App Router porque resuelve bien el concepto de "React SSR" que pedía el challenge, manteniendo una arquitectura clara entre componentes de servidor y cliente.

- `app/page.tsx` obtiene el listado inicial.
- `app/article/[id]/page.tsx` resuelve el detalle del producto.
- Los componentes interactivos viven como client components.

### 2. Simulación de API mockeada
Los datos vienen del archivo `articles.json`, pero no se consumen directamente en la UI. Se encapsularon en `src/lib/articles.ts` con funciones async y un delay artificial para representar una llamada real.

### 3. Estado global liviano
Para carrito y favoritos se utilizó **Context API**, que alcanza para este alcance sin agregar complejidad innecesaria.

- `CartContext`: altas, bajas, cantidad, total y conteo distinto.
- `FavoritesContext`: toggle y consulta de favoritos.

### 4. Persistencia
Se agregó persistencia en `localStorage` como mejora de UX, manteniendo el estado incluso al recargar.

### 5. CSS puro
Se usó CSS Modules por componente y `globals.css` para variables, reset básico y consistencia visual.

## Estructura principal

```bash
src/
  app/
  components/
  context/
  data/
  lib/
  types/
```

## Cómo levantar el proyecto

### Requisitos
- Node.js 20+
- npm 10+

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abrir en:

```bash
http://localhost:3000
```

### Build producción

```bash
npm run build
npm run start
```

## Mejoras posibles si hubiese más tiempo

- tests unitarios para contexts y helpers
- cierre del popup al hacer click afuera
- animaciones sutiles
- skeleton loaders
- página dedicada de checkout / carrito completo
- uso de `next/image` con una estrategia de dominios remotos controlada

## Nota

Se decidió usar `<img>` en vez de `next/image` para no forzar configuración adicional de múltiples dominios remotos presentes en el mock de imágenes, manteniendo el challenge simple, estable y fácil de revisar.
