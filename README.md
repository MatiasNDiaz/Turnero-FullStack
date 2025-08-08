# 🎟️ Turnero Full Stack

> Proyecto completo de un sistema de turnos con registro y login validados.  
> Permite sacar, cancelar y visualizar turnos/citas con feedback visual para una mejor experiencia de usuario.

---

## 🎯 Descripción

Este proyecto es un **Turnero** desarrollado con tecnologías modernas, que incluye:

- ✅ Registro y login de usuarios con validaciones.
- 📅 Gestión de turnos: crear, cancelar y visualizar.
- 🎨 Feedback visual para mejorar la interacción.
- ⚙️ Backend con Node.js, TypeORM y PostgreSQL.
- 🌐 Frontend con React, HTML, CSS y JavaScript.

---

## 🛠️ Tecnologías usadas

<table>
  <thead>
    <tr>
      <th>Frontend</th>
      <th>Backend</th>
      <th>Base de Datos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40"/><br/>
        React<br/>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" width="20"/> HTML<br/>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="20"/> CSS<br/>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JS" width="20"/> JavaScript
      </td>
      <td align="center">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40"/><br/>
        Node.js<br/>
        <img src="https://typeorm.io/images/logo.svg" alt="TypeORM" width="40"/><br/>
        TypeORM
      </td>
      <td align="center">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="40"/><br/>
        PostgreSQL
      </td>
    </tr>
  </tbody>
</table>

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/MatiasNDiaz/Turnero-FullStack.git
cd Turnero-FullStack
code .
```

---

### 2. Configuración de Variables de Entorno

Para que la aplicación funcione correctamente, debes configurar las variables de entorno que controlan tanto el puerto del servidor como la conexión a la base de datos. Esto permite mantener seguros los datos sensibles y adaptar la app a diferentes entornos.

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto en el que correrá el servidor (puede cambiarse si el 3000 está ocupado)
PORT=3000

# Configuración de la Base de Datos PostgreSQL
DB_TYPE=postgres
DB_HOST=localhost            # Dirección del servidor de base de datos
DB_PORT=5432                 # Puerto por defecto de PostgreSQL
DB_USERNAME=tu_usuario       # Usuario para conectarse a la base de datos
DB_PASSWORD=tu_contraseña    # Contraseña del usuario
DB_NAME=nombre_de_tu_bd     # Nombre de la base de datos a usar

# Configuraciones específicas de TypeORM
DB_DROPSCHEMA=false          # Indica si se debe borrar el esquema (NO usar en producción)
DB_SYNCHRONIZE=true          # Sincroniza automáticamente las entidades con la base de datos (útil en desarrollo)
DB_LOGGING=["error"]         # Niveles de logs que quieres ver (ejemplo: errores solamente)
DB_ENTITIES=src/entities/**/*.ts  # Ruta a las entidades de TypeORM
```

---

### 3. Instalar dependencias

en la carpeta del back: npm install
en la carpeta del fron (fron/vite-project): npm install

---

### 4. Ejecutar la aplicación

Para iniciar el backend: npm start 
<img src="https://github.com/user-attachments/assets/b1e5e7b8-14ec-4c58-aa16-2f1a11971eec" alt="Backend running" width="90%" style="border-radius:8px; margin-top:10px;"/>


Para iniciar el frontend (en vite-project): npm run dev 
<img src="https://github.com/user-attachments/assets/b2feb950-f117-43e2-87e7-ae9fee4178f7" alt="Frontend running" width="90%" style="border-radius:8px; margin-top:10px;"/>

---

### 5. Funcionalidades

## 📋 Funcionalidades principales

- 🔐 **Registro y Login:** con validación completa de datos.

- 🗓️ **Sacar turnos:** el usuario puede agendar nuevas citas.

- ❌ **Cancelar turnos:** opción para cancelar turnos previamente agendados.

- 📄 **Visualizar turnos:** lista clara de todos los turnos actuales del usuario.

- 🎉 **Feedback visual:** notificaciones y alertas para informar al usuario sobre sus acciones.

---

### Imagenes de cortecia de la Aplicación:

<img width="1899" height="973" alt="image" src="https://github.com/user-attachments/assets/d230755e-1128-4e62-9884-1b5cee93a822" />

<img width="1896" height="967" alt="image" src="https://github.com/user-attachments/assets/99113b51-0902-4c21-9c91-c629665e316f" />

<img width="1919" height="970" alt="image" src="https://github.com/user-attachments/assets/53ff64e8-ba6e-4c91-9df2-4de9ea1ef0c0" />

<img width="1893" height="969" alt="image" src="https://github.com/user-attachments/assets/fc1a86ea-60f4-4f99-83cd-24301f22e5e3" />

<img width="1899" height="965" alt="image" src="https://github.com/user-attachments/assets/d189d2ba-be64-44fb-8cc4-9bb85f0925b6" />

<img width="1899" height="966" alt="image" src="https://github.com/user-attachments/assets/f9ba68fc-b4e0-49af-8e57-5c8b90b24f39" />

<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/18177281-9978-4636-895e-32242dbee9d2" />

<img width="1916" height="963" alt="image" src="https://github.com/user-attachments/assets/7d8851ae-11eb-4f22-b7c8-3d1554165ece" />

<img width="1898" height="969" alt="image" src="https://github.com/user-attachments/assets/477c3ea7-c780-42f3-acfb-bc09d9c2237f" />


---

### 🧑‍💻 Autor
Matías N Díaz
[GitHub](https://github.com/MatiasNDiaz) | [LinkedIn](https://www.linkedin.com/in/matias--diaz/)

