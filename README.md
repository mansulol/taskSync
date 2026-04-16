<p align="center">
  <img src="./assets/logo.png" alt="Logo" width="200">
</p>

# ✅ TaskSync — Gestor de Tareas

TaskSync es una aplicación web intuitiva diseñada para organizar tu día de forma eficiente, permitiendo la creación, categorización y seguimiento del estado de tus tareas diarias.

## 📑 Índice de contenidos

- [🧱 Stack técnico](#-stack-técnico)
- [⚙️ Instalación](#️-instalación)
  - [Prerrequisitos](#prerrequisitos)
  - [Pasos](#pasos)
- [👥 Cuentas de prueba](#-cuentas-de-prueba)
- [🏗️ Arquitectura API](#️-arquitectura-api)
  - [Modelo de datos](#modelo-de-datos)
- [📊 Matriz de roles](#-matriz-de-roles)
- [📡 API REST](#-api-rest)
  - [Tareas (Tasks)](#tareas-tasks)
  - [Ejemplo de petición](#ejemplo-de-petición-crear-tarea)
- [🛠️ Scripts disponibles](#️-scripts-disponibles)
- [✅ Funcionalidades implementadas](#-funcionalidades-implementadas)
- [📝 Autor](#-Autor)

---

## 🧱 Stack técnico

* **Frontend:** React 19 (TypeScript) / Vite
* **Backend:** PHP 8.4 / Symfony 8.0 / Doctrine
* **Base de datos:** PostgreSQL 16
* **Gestión de estado:** Zustand
* **Estilos y UI:** Tailwind CSS v4 / HeroUI / Framer Motion
* **Infraestructura:** Docker & Docker Compose

---

## ⚙️ Instalación

### Prerrequisitos
* Docker y Docker Compose
* Git

### Pasos
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tasksync.git

# Acceder al directorio del proyecto
cd tasksync

# Levantar los contenedores con Docker Compose
# Esto construirá el frontend, el backend y configurará la base de datos automáticamente
docker compose up -d --build
```
Una vez que los contenedores estén en ejecución:
* **Frontend:** Disponible en `http://localhost:5173`
* **Backend API:** Disponible en `http://localhost:8000`

---

## 👥 Cuentas de prueba

*(Nota: Si implementas autenticación en el futuro, puedes usar estas cuentas base)*

| Rol | Email | Contraseña |
| :--- | :--- | :--- |
| Administrador | admin@tasksync.local | admin123 |
| Usuario Estándar | user@tasksync.local | user123 |

---

## 🏗️ Arquitectura API

La API está construida con Symfony 8 siguiendo una arquitectura RESTful. Las rutas principales están estructuradas alrededor de la entidad de tareas (`/api/tasks`). El ORM Doctrine se encarga de la persistencia de datos en PostgreSQL.

### Modelo de datos
El esquema de PostgreSQL define la tabla de tareas. Una tarea contiene información clave como el título (obligatorio), la descripción (opcional), la categoría (ej. Trabajo, Salud, Casa) y el estado (pendiente o completada).

---

## 📊 Matriz de roles

| Funcionalidad | Usuario | Administrador |
| :--- | :---: | :---: |
| Crear una tarea | ✅ | ✅ |
| Ver lista de tareas | ✅ | ✅ |
| Marcar tarea como completada | ✅ | ✅ |
| Eliminar tareas propias | ✅ | ✅ |
| Eliminar cualquier tarea | ❌ | ✅ |
| Gestionar categorías globales | ❌ | ✅ |

---

## 📡 API REST

### Tareas (Tasks)
| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Obtener todas las tareas |
| `POST` | `/api/tasks` | Crear una nueva tarea |
| `PATCH` | `/api/tasks/{id}/status` | Actualizar el estado o datos de una tarea |
| `DELETE`| `/api/tasks/{id}` | Eliminar una tarea permanentemente |

### Ejemplo de petición (Crear Tarea)
```json
// POST /api/tasks
{
  "title": "Pull Request",
  "description": "Make a pull request about the last commit",
  "status": "pending"
  "category": "Work",
}
```

---

## 🛠️ Scripts disponibles

Si prefieres ejecutar los entornos de desarrollo localmente sin Docker (teniendo PHP, Composer y Node instalados):

**En el directorio `/frontend`:**
* `npm run dev` : Lanza el servidor de desarrollo de Vite (puerto 5173).
* `npm run build` : Compila el proyecto con TypeScript para producción.
* `npm run lint` : Ejecuta ESLint para comprobar la sintaxis.

**En el directorio `/backend`:**
* `composer install` : Instala las dependencias de Symfony.
* `php bin/console doctrine:migrations:migrate` : Ejecuta las migraciones de la base de datos.
* `php -S localhost:8000 -t public` : Lanza el servidor de desarrollo de PHP.

---

## ✅ Funcionalidades implementadas

* [x] Contenedorización completa con Docker Compose.
* [x] Interfaz moderna, minimalista y responsive con HeroUI y Tailwind CSS.
* [x] Creación de tareas con validación de campos obligatorios (título).
* [x] Asignación de categorías visuales mediante etiquetas de colores.
* [x] Cambio de estado de tareas (pendiente / completada) en tiempo real.
* [x] Eliminación de tareas con modal de confirmación de seguridad.
* [x] Sistema de notificaciones integradas (Toasts) para feedback del usuario.

---

## 👨‍💻 Autor

Mansour Lo Lo
