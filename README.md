# Debts Frontend

Frontend de la aplicación **Debts**, construido con **React + TypeScript + Vite**, enfocado en una UI moderna, minimalista y una arquitectura limpia para consumo de APIs REST.

Este proyecto forma parte de una prueba técnica Full Stack y se conecta a un backend desarrollado en **Node.js (NestJS)** con autenticación JWT.

---

## 🚀 Stack Tecnológico

### Core

- **React 19** – UI
- **Vite** – Build tool rápido
- **TypeScript** – Tipado estático
- **React Router DOM v7** – Rutas protegidas
- **Axios** – Cliente HTTP
- **Zustand** – State management simple

### UI / UX

- **Tailwind CSS** – Estilos utilitarios
- **react-hot-toast** – Notificaciones

### Calidad de código

- ESLint
- TypeScript strict

---

## 📁 Estructura del Proyecto

```txt
src/
├── components/       # Componentes reutilizables (modales, cards, navbar)
├── pages/            # Vistas principales (Login, Register, Dashboard)
├── routes/           # Rutas públicas y protegidas
├── services/         # Comunicación con el backend (API layer)
├── stores/           # Zustand stores (auth, debts)
├── types/            # Interfaces y tipos TypeScript
├── App.tsx
├── main.tsx
```

---

## Funcionalidades Implementadas

### Autenticación

- Login y registro de usuarios
- Manejo de JWT con interceptores Axios
- Rutas protegidas

### Deudas

- Listado de deudas
- Filtros (pendientes / pagadas / todas)
- Crear deuda (modal)
- Editar deuda (solo si NO está pagada)
- Marcar como pagada
- Eliminar deuda
- Vista detalle (modal)

### Extras

- Exportación de deudas en CSV
- Dashboard con agregaciones:

  - Total amount
  - Deudas pagadas
  - Deudas pendientes

---

## ⚠️ Reglas de Negocio

- ❌ No se permiten valores negativos
- ❌ Una deuda pagada no puede editarse ni volver a pagarse
- ✅ Validación en frontend + backend

---

## 🧪 Scripts Disponibles

```bash
npm run dev       # Desarrollo local
npm run build     # Build de producción
npm run preview   # Preview del build
npm run lint      # Linter
```

---

## Despliegue Local

### Requisitos

- Node.js >= 18
- Backend corriendo localmente

Por defecto el frontend consume el backend en:

```
http://localhost:4001
```

> ⚠️ Asegúrate de que el backend esté levantado antes de iniciar el frontend.

---

### 2️⃣ Instalación

```bash
npm install
```

---

### 3️⃣ Ejecutar en desarrollo

```bash
npm run dev
```

El proyecto estará disponible en:

```
http://localhost:5173
```

---

## 🌐 Variables de Entorno (opcional)

Si deseas parametrizar la URL del backend:

```env
baseURL: 'http://localhost:4001'
```

Y en Axios:

```ts
baseURL: 'http://localhost:4001';
```

---

## 🧠 Decisiones Técnicas

- **Vite** por su velocidad y DX
- **Zustand** por simplicidad sobre Redux
- **Tailwind** para UI consistente y rápida
- **Modales** en lugar de rutas adicionales para UX fluida
- **Servicios desacoplados** (services/) para facilitar testing y escalabilidad

---

## 📌 Pendientes / Mejoras Futuras

- Tests unitarios (Vitest)
- Paginación
- Dark/Light theme
- Accesibilidad (ARIA)

---

## 👨‍💻 Autor

Juan Camilo Giraldo
