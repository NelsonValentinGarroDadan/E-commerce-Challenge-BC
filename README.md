# 🛍️ E-commerce Challenge - Blind Creator

Este proyecto es una aplicación de e-commerce construida con **Next.js (App Router)**, **Tailwind CSS** y **TanStack Query (React Query)** como evaluación técnica para la vacante de Frontend Developer en Blind Creator.

---

## 🚀 Tecnologías Usadas

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- TanStack React Query
- Axios
- ESLint

---

## 🧱 Estructura General

La app se compone de las siguientes secciones:

- **Catálogo de productos** con filtrado, paginación y estados de carga
- **Detalle de producto** con productos relacionados
- **Carrito de compras** con persistencia en localStorage
- **Tema oscuro/claro** y diseño responsive
- **Interacción con API externa (FakeStore API)** mediante React Query

---

## 📦 Instalación Local

```bash
git clone https://github.com/tu-usuario/ecommerce-app.git
cd ecommerce-app
npm install
npm run dev
```
---

## 🌐 Demo
 🔗 [ecommerce-app.vercel.app](https://e-commerce-mu-silk-58.vercel.app/)

## 🎯 Funcionalidades
- Listado de productos en grilla

- Página de detalle con variantes

- Carrito funcional con mutaciones

- Estados de carga, error y datos vacíos

-  Tema dark/light con animación

-  Favoritos (opcional)

-  Página de cuenta (opcional)

---

## 📁 Estructura del Proyecto
- app/: Rutas y páginas principales

- components/: Componentes reutilizables

- features/: Lógica de negocio separada por feature (cart, products, etc.)

- lib/: Configuración de React Query y API

- hooks/: Custom hooks

- types/: Tipado compartido

- utils/: Helpers y utilidades

---

## 🧠 Decisiones Técnicas
- App Router: por ser la recomendación actual de Next.js y aprovechar el layout system.

- TanStack Query: para un manejo robusto y eficiente del estado del servidor.

- Tailwind CSS: permite iterar rápido con un diseño coherente y responsivo.

- Persistencia en localStorage: simple pero efectiva para guardar el carrito.

---

## 🤯 Desafíos
- Hacer funcionar correctamente el sistema de carrito persistente fue clave.

- Coordinar las múltiples queries y mutaciones sin generar errores de sincronización.

- Lograr que la UI sea fluida y responsiva, cuidando los estados de carga.
 
