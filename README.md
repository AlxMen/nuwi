# Nuwi Project

Este es el repositorio del proyecto Nuwi, una aplicación para la gestión de proyectos y documentos.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para aplicaciones web.
- **TypeScript**: Lenguaje de programación que extiende JavaScript.
- **Prisma**: ORM para bases de datos.
- **MongoDB**: Base de datos NoSQL.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Framework de CSS para diseño rápido.
- **React Toastify**: Biblioteca para notificaciones.

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- MongoDB

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/nuwi.git
   cd nuwi
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura la base de datos:

   Crea un archivo `.env` en la raíz del proyecto y añade la siguiente línea:

   ```env
   DATABASE_URL="mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre_de_tu_base_de_datos?retryWrites=true&w=majority"
   ```

4. Genera el cliente de Prisma:

   ```bash
   npx prisma generate
   ```

5. Ejecuta las migraciones de Prisma para crear las tablas en la base de datos:

   ```bash
   npx prisma migrate dev --name init
   ```

6. Inicia la aplicación en modo desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

La aplicación estará disponible en http://localhost:3000.

Estructura del Proyecto

  - /components: Componentes reutilizables de React.
  - /pages: Páginas de Next.js.
  - /prisma: Esquema de Prisma y migraciones.
  - /public: Archivos estáticos.
  - /src: Código fuente principal.
  - /styles: Archivos de estilos.

Scripts Disponibles

  - dev: Inicia la aplicación en modo desarrollo.
  - build: Compila la aplicación para producción.
  - start: Inicia la aplicación en modo producción.
  - lint: Ejecuta ESLint para encontrar y arreglar problemas en el código.

Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

  1. Haz un fork del repositorio.
  2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
  3. Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
  4. Sube tus cambios a tu fork (git push origin feature/nueva-funcionalidad).
  5. Abre un Pull Request.

Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
