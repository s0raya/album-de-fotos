# Album de Fotos

Este proyecto es una aplicación web para gestionar un álbum de fotos. Permite a los usuarios registrarse, iniciar sesión, ver y cargar fotos, crear álbumes y ver detalles de las fotos y álbumes.

## Estructura de archivos

```
├── src
│   ├── assets
│   │   └── react.svg
│   ├── auth   
│   │   └── AuthContext.jsx
│   ├── components
│   │   ├── Auth.jsx
│   │   ├── CreateAlbum.jsx
│   │   ├── Home.jsx
│   │   ├── ItemDetailAlbum.jsx
│   │   ├── ItemDetailPhoto.jsx
│   │   ├── Login.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── NavbarPhoto.jsx
│   │   └── UploadFile.jsx
│   ├── config
│   │   └── FirebaseConfig.js
│   ├── hooks
│   │   └── useModal.js
│   ├── routes
│   │   └── RoutesApp.jsx
│   ├── styles
│   │   ├── CreateAlbum.css
│   │   ├── Home.css
│   │   ├── ItemDetailPhoto.css
│   │   ├── Modal.css
│   │   ├── Navbar.css
│   │   └── UploadFile.css
│   ├── App.css
│   ├── App.jsx
│   ├── i18n.js
│   ├── index.css
│   ├── main.jsx
├── .env
├── node_modules
├── package.json
├── package-lock.json
├── public
│   └── no-image.webp
├── README.md
└── .gitignore

```

## Características principales

- **Autenticación de usuarios:** Utiliza Firebase Authentication para permitir que los usuarios inicien sesión.
- **Gestión de álbumes:** Permite a los usuarios crear álbumes para organizar sus fotos.
- **Carga de fotos:** Los usuarios pueden cargar fotos en la aplicación para agregarlas a su álbum.
- **Visualización de detalles:** Proporciona una vista detallada de las fotos y álbumes, incluyendo información como la fecha de carga, el clima y más.

## Tecnologías utilizadas

- **React:** La aplicación está desarrollada utilizando React, una biblioteca de JavaScript para construir interfaces de usuario.
- **Firebase:** Se utiliza Firebase Authentication para la autenticación de usuarios.
- **React Router:** Para la navegación dentro de la aplicación.
- **React Icons:** Para incluir iconos en la interfaz de usuario.
- **Moment.js:** Para formatear fechas.
- **React Select:** Para crear selectores de opciones.
- **React Modal:** Para mostrar ventanas modales en la aplicación.

## Instalación y configuración

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando `npm install`.
3. Configura Firebase en tu proyecto y obtén las credenciales necesarias.
4. Crea un archivo `.env` en la raíz del proyecto y agrega las variables de entorno necesarias para la configuración de Firebase.
5. Ejecuta la aplicación utilizando `npm start`.

## Uso

1. Inicia sesión en la aplicación.
2. Explora las diferentes opciones de navegación para ver y administrar tus fotos y álbumes.
3. Utiliza las funciones de carga y creación de álbumes para organizar tus fotos.
4. Haz clic en una foto o álbum para ver detalles adicionales.
5. Cierra sesión cuando hayas terminado de usar la aplicación.

### Archivo en la raíz del proyecto

- **index.html:** Punto de entrada de la aplicación web. Contiene el contenedor `<div id="root">` donde se renderizará la aplicación React.

### Carpeta src

- **App.jsx:** Componente principal de la aplicación. Envuelve toda la aplicación con el contexto de autenticación.
- **main.jsx:** Punto de entrada de la aplicación React. Renderiza el componente `App` en el contenedor `root` del archivo HTML.

# Routes

- **routes/RoutesApp.jsx:** Define las rutas de la aplicación utilizando React Router. Determina qué componente se renderizará en función de la URL actual.

### Carpeta auth

- **AuthContext.jsx:** Define el contexto de autenticación utilizando React Context API. Proporciona un proveedor de autenticación y hooks personalizados para acceder al estado de autenticación en toda la aplicación.
- **useAuth.js:** Un hook personalizado que proporciona acceso al contexto de autenticación en cualquier componente de la aplicación.

### Carpeta components

- **Auth.jsx:** Componente de orden superior que envuelve a otros componentes y proporciona autenticación. Verifica si el usuario está autenticado y muestra la página principal solo si está autenticado.
- **CreateAlbum.jsx:** Permite al usuario crear un nuevo álbum. Contiene un formulario donde el usuario puede ingresar el nombre del álbum y luego enviarlo al servidor.
- **Home.jsx:** Componente principal de la página de inicio. Muestra todas las fotos y álbumes del usuario y proporciona opciones para cargar nuevas fotos y crear álbumes.
- **ItemDetailAlbum.jsx:** Muestra los detalles de un álbum específico. Muestra las fotos dentro del álbum y proporciona opciones para eliminar el álbum.
- **ItemDetailPhoto.jsx:** Muestra los detalles de una foto específica. Muestra la foto, la fecha de carga, el clima en el momento de la carga y proporciona opciones para eliminar y descargar la foto.
- **Login.jsx:** Muestra un formulario de inicio de sesión. Los usuarios pueden ingresar su correo electrónico y contraseña para iniciar sesión en la aplicación.
- **Modal.jsx:** Componente reutilizable que muestra un contenido modal cuando está abierto. Proporciona una opción para cerrar el modal.
- **Navbar.jsx:** Barra de navegación principal de la aplicación. Contiene enlaces para la página de inicio, opciones para cargar fotos y crear álbumes, y un botón para cerrar sesión.
- **NavbarPhoto.jsx:** Barra de navegación para la página de detalles de la foto. Contiene un enlace para volver a la página de inicio y un botón para cerrar sesión.
- **UploadFile.jsx:** Permite al usuario cargar archivos (fotos) en la aplicación. Contiene un formulario donde el usuario puede seleccionar archivos y luego enviarlos al servidor.

### Carpeta config

- **FirebaseConfig.js:** Configuración de Firebase donde se inicializa la aplicación Firebase y se obtiene el objeto de autenticación.

### Carpeta hooks

- **useModal.js:** Hook personalizado que proporciona funcionalidad para controlar un estado de modal en los componentes.

### Carpeta styles

- **Estilos CSS:** Archivos CSS que contienen estilos para los diferentes componentes de la aplicación.


