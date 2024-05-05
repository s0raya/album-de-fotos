# Aplicación de Álbum de Fotos (Frontend)

Este directorio contiene el codigo del frontend para una aplicacion web de álbum de fotos, realizada con React y Vite.

## Índice

1. [Estructura de archivos](#estructura-de-archivos)
2. [Descripción de archivos](#descripción-de-archivos)
3. [Funcionalidades Principales](#funcionalidades-principales)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)

## Estructura de archivos

```
.
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
└── README.md

```

El proyecto está estructurado de la siguiente manera:

- **src/**: Contiene todos los archivos fuente de la aplicación.
  - **components/**: Componentes React reutilizables.
  - **auth/**: Contiene el contexto de autenticación y los archivos relacionados con la autenticación.
  - **hooks/**: Hooks personalizados utilizados en la aplicación.
  - **routes/**: Configuración de rutas de la aplicación.
  - **styles/**: Archivos de estilos CSS.
  - **App.jsx**: Componente principal de la aplicación.
  - **index.js**: Punto de entrada de la aplicación.
- **public/**: Contiene archivos públicos como el ícono de la aplicación y el archivo HTML base.


## Descripción de archivos

- **index.html:** Punto de entrada de la aplicación web. Contiene el contenedor `<div id="root">` donde se renderizará la aplicación React.

### src
- **App.jsx:** Componente principal de la aplicación. Envuelve toda la aplicación con el contexto de autenticación.
- **main.jsx:** Punto de entrada de la aplicación React. Renderiza el componente `App` en el contenedor `root` del archivo HTML.

### routes
- **RoutesApp.jsx:** Define las rutas de la aplicación utilizando React Router. Determina qué componente se renderizará en función de la URL actual.

### auth
- **AuthContext.jsx:** Define el contexto de autenticación utilizando React Context API. Proporciona un proveedor de autenticación y hooks personalizados para acceder al estado de autenticación en toda la aplicación.
- **useAuth.js:** Un hook personalizado que proporciona acceso al contexto de autenticación en cualquier componente de la aplicación.

### components
- **Auth.jsx:** Componente de orden superior que envuelve a otros componentes y proporciona autenticación. Verifica si el usuario está autenticado y muestra la página principal solo si está autenticado.
- **CreateAlbum.jsx:** Permite al usuario crear un nuevo álbum. Contiene un formulario donde el usuario puede ingresar el nombre del álbum y luego enviarlo al servidor.
- **Home.jsx:** Componente principal de la página de inicio. Muestra todas las fotos y álbumes del usuario y proporciona opciones para cargar nuevas fotos y crear álbumes.
- **ItemDetailAlbum.jsx:** Muestra los detalles de un álbum específico. Muestra las fotos dentro del álbum y proporciona opciones para eliminar el álbum.
- **ItemDetailPhoto.jsx:** Muestra los detalles de una foto específica. Muestra la foto, la fecha y el clima en el momento en el que se realizó la foto, y proporciona opciones para eliminar y descargar la foto.
- **Login.jsx:** Muestra un formulario de inicio de sesión. Los usuarios autorizados pueden ingresar su correo electrónico y contraseña para iniciar sesión en la aplicación.
- **Modal.jsx:** Componente reutilizable que muestra un contenido modal cuando está abierto. Proporciona una opción para cerrar el modal.
- **Navbar.jsx:** Barra de navegación principal de la aplicación. Contiene enlaces para la página de inicio, opciones para cargar fotos y crear álbumes, y un botón para cerrar sesión.
- **NavbarPhoto.jsx:** Barra de navegación para la página de detalles de la foto. Contiene un enlace para volver a la página de inicio y un botón para cerrar sesión.
- **UploadFile.jsx:** Permite al usuario cargar archivos (fotos) en la aplicación. Contiene un formulario donde el usuario puede seleccionar archivos y luego enviarlos al servidor.

### config
- **FirebaseConfig.js:** Configuración de Firebase donde se inicializa la aplicación Firebase y se obtiene el objeto de autenticación.

### hooks
- **useModal.js:** Hook personalizado que proporciona funcionalidad para controlar un estado de modal en los componentes.
### styles
- **Estilos CSS:** Archivos CSS que contienen estilos para los diferentes componentes de la aplicación.

## Funcionalidades Principales

- **Inicio de Sesión**: Los usuarios pueden iniciar sesión utilizando sus credenciales creadas en Firebase Authentication.
- **Carga de Fotos**: Los usuarios pueden cargar fotos a la aplicación.
- **Creación de Álbumes**: Los usuarios pueden crear álbumes y organizar sus fotos.
- **Navegación**: Los usuarios pueden navegar por la aplicación utilizando las diferentes rutas definidas.
- **Interfaz de Usuario Intuitiva**: La aplicación cuenta con una interfaz de usuario intuitiva y fácil de usar.

## Tecnologías Utilizadas

- **Firebase**: Proporciona servicios en la nube como almacenamiento de archivos y autenticación de usuarios.
- **i18next**: Biblioteca de internacionalización que facilita la traducción del contenido de la aplicación.
- **i18next-browser-languagedetector**: Detecta automáticamente el idioma preferido del navegador del usuario para la internacionalización.
- **Moment.js**: Librería para manipulación y visualización de fechas y horas.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **React DOM**: Biblioteca para manipular el DOM y renderizar componentes de React.
- **React i18next**: Integración de i18next con React para la internacionalización de la aplicación.
- **React Icons**: Conjunto de iconos para usar en la interfaz de usuario.
- **React Router DOM**: Enrutador para la navegación entre componentes en una aplicación React.
- **React Select**: Componente para crear selectores de opciones personalizados en React.
