# Aplicación de Álbum de Fotos (Backend)

Este directorio contiene el código del backend para una aplicación web de álbum de fotos, desarrollada con Node.js y Express, utilizando MongoDB como base de datos, y Firebase Storage para el almacenamiento de fotos.

## Índice

1. [Estructura de archivos](#estructura-de-archivos)
2. [Descripción de archivos](#descripción-de-archivos)
3. [Métodos del controlador](#métodos-del-controlador)
4. [Librerías utilizadas](#librerías-utilizadas)
5. [Dependencias](#dependencias)

## Estructura de archivos
```
.
├── src
│   ├── config
│   │   ├── db.js
│   │   └── firebase.js
│   ├── controllers
│   │   └── photoController.js
│   ├── middlewares
│   │   ├── multer.js
│   │   └── uploadFile.js
│   ├── models
│   │   └── Photo.js
│   ├── routes
│   │   └── photos.js
├── .env
├── index.js
├── node_modules
├── package.json
├── package-lock.json
├── public
│   └── photos/
└── README.md
```

## Descripción de archivos

- **index.js**: El punto de entrada del servidor Express. Este archivo configura las rutas y los middleware, y luego inicia el servidor en un puerto específico.

- **config**: Contiene archivos de configuración para la base de datos y Firebase.
    - **db.js**: Este archivo configura la conexión a la base de datos MongoDB utilizando Mongoose. Define una función `dbConnection` que se utiliza para conectar la aplicación a la base de datos.
    - **firebase.js**: Configura la conexión a Firebase Storage utilizando el SDK de Firebase. Exporta el objeto `firebaseApp` que representa la aplicación Firebase y el objeto `storage` para interactuar con Firebase Storage.

- **middleware/**: Contiene middlewares utilizados en la aplicación.
    - **multer.js**: Este archivo define un middleware de Multer para manejar la carga de archivos. Configura la ubicación de destino de los archivos subidos, así como el tipo de archivo permitido y el tamaño máximo del archivo.
    - **uploadFile.js**: Este archivo contiene una función para cargar archivos en Firebase Storage. Utiliza la biblioteca Firebase SDK para realizar la carga de archivos.

- **models**: Contiene los esquemas de datos de la base de datos.
    - **Photo.js**: Se definen tres modelos de datos utilizando los esquemas:
        - ***Photo***: Modelo para interactuar con los documentos de fotos en la base de datos. El esquema incluye campos como el nombre de la foto, la ruta de la imagen, la ruta de la miniatura, las etiquetas, las coordenadas geográficas, la información meteorológica y la fecha de la foto.
        - ***Album***: Modelo para interactuar con los documentos de álbumes en la base de datos. El esquema incluye campos como el nombre del album, la ruta de la portada y si tienes albumes padres.
        - ***Weather***: Modelo para interactuar con los documentos de información meteorológica en la base de datos.
Estos modelos permiten realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en la base de datos MongoDB utilizando Mongoose.

- **routes/**: Contiene los archivos de enrutamiento de la aplicación.
    - **photos.js**: Este archivo define las rutas y controladores para la gestión de fotos y álbumes. Define rutas para listar todas las fotos, agregar una nueva foto, eliminar una foto y crear un nuevo álbum.

- **controllers/**: Contiene los controladores de la aplicación.
    - **photoController.js**: El archivo `photoController.js` contiene la lógica del controlador para gestionar las solicitudes relacionadas con las fotos y los álbumes en la aplicación. 

## Métodos del controlador:

1. **getAllPhotos**: Maneja la solicitud para obtener todas las fotos y álbumes. Filtra las fotos y los álbumes por el ID del álbum si se proporciona.

2. **createAlbum**: Crea un nuevo álbum con el nombre proporcionado y opcionalmente el ID del álbum padre.

3. **addPhoto**: Maneja la solicitud para agregar una o varias fotos a un álbum. Procesa las fotos para obtener metadatos como la ubicación y el clima, las sube a Firebase Storage y guarda los detalles en la base de datos.

4. **updatePhoto**: Método para actualizar la información de una foto (a implementar).

5. **deletePhoto**: Elimina una foto de la base de datos según su ID.

6. **deleteAlbum**: Elimina un álbum de la base de datos según su ID.

Estos métodos son utilizados por las rutas definidas en el archivo `photos.js` para manejar las solicitudes HTTP entrantes y realizar operaciones en la base de datos y el almacenamiento en la nube.

## Librerías utilizadas:

- **path**: Sirve para manejar y transformar las rutas de archivos.
- **uploadFile**: Un middleware personalizado para subir archivos a Firebase Storage.
- **sharp**: Una librería para procesamiento de imágenes.
- **moment**: Utilizada para manejar fechas y horas en JavaScript.
- **fs**: Proporciona métodos para interactuar con el sistema de archivos del servidor.
- **exifr**: Una librería para leer los metadatos de las imágenes.
- **dotenv**: Se usa para cargar variables de entorno desde un archivo `.env`.


## Dependencias

- **Express**: Framework de aplicaciones web para Node.js.
- **Mongoose**: Biblioteca de modelado de objetos MongoDB para Node.js.
- **Multer**: Middleware para manejar la carga de archivos.
- **Firebase**: SDK para interactuar con Firebase.
- **Cors**: Middleware para permitir solicitudes de recursos desde un dominio diferente al del servidor.
- **Dotenv**: Módulo para cargar variables de entorno desde un archivo `.env` en el entorno de Node.js.
- **Exifr**: Biblioteca para extraer metadatos de archivos de imagen.
- **Moment**: Biblioteca para manejar fechas y horas en JavaScript.
- **Sharp**: Biblioteca para procesar imágenes en Node.js.
