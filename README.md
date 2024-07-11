# CRUD de Productos con Node.js y MongoDB

Este proyecto es una aplicación basada en Node.js y MongoDB que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos de productos. La base de datos MongoDB está alojada en un clúster de MongoDB Atlas y la aplicación Node.js se conecta a ella.

## Descripción del Proyecto

El objetivo de este proyecto es crear una API RESTful que maneje un conjunto de productos. Cada producto tiene un código único, un nombre, un precio y una categoría. La API permite a los usuarios realizar operaciones básicas de CRUD en estos productos.

### Funcionalidades

1. **Obtener todos los productos**
   - Endpoint para leer todos los productos de la colección.
   - Control de errores para manejar la indisponibilidad de la base de datos.

2. **Obtener un producto por ID**
   - Endpoint para obtener un producto por su ID.
   - Control de errores para manejar casos en que el producto no se encuentre o la base de datos no esté disponible.

3. **Filtrar productos por nombre**
   - Endpoint para filtrar productos por nombre (búsqueda parcial).
   - Control de errores para manejar coincidencias no encontradas o problemas de conexión.

4. **Agregar un nuevo producto**
   - Endpoint para agregar un nuevo producto.
   - Validación y control de errores.
   - Generación de un código numérico para el nuevo producto.

5. **Modificar el precio de un producto por código**
   - Endpoint para cambiar el precio de un producto usando PATCH.
   - Control de errores para manejar problemas durante la actualización.

6. **Borrar un producto por código**
   - Endpoint para borrar un producto usando DELETE.
   - Control de errores para manejar problemas durante el borrado.

7. **Control de errores**
   - Manejo de errores en la estructura de las solicitudes y respuestas.
   - Respuesta adecuada con mensajes y códigos de error específicos.
   - Control de acceso a rutas no existentes con respuestas apropiadas.

## Estructura del Proyecto

```bash
/json 
  - mobiliario.json
/README.md
/app.js
/database.js
/product.js
/public
  - index.html
```

## Descripción de los Archivos
/json: Carpeta que contiene el dataset JSON de productos.

/README.md: Archivo con la descripción del proyecto.

/app.js: Archivo principal de la aplicación Node.js donde se define toda la lógica de rutas y la conexión a la base de datos.

/database.js: Archivo para configurar la conexión a la base de datos MongoDB.

/product.js: Archivo que contiene el esquema (schema) del producto utilizando Mongoose.

/public: Carpeta que contiene los archivos HTML.

## Instalación y Configuración
#### Clona el repositorio:

~~~
git clone https://github.com/tu-usuario/tu-repositorio.git
~~~

#### Navega al directorio del proyecto:

~~~
cd tu-repositorio
~~~

#### Instala las dependencias:

~~~
npm install
~~~

#### Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto y agrega tu cadena de conexión a MongoDB Atlas:

~~~
MONGODB_URI=your_mongodb_connection_string
~~~
## Uso
#### Inicia la aplicación:

~~~
npm start
~~~

  
## Endpoints
- `GET /products`: Obtener todos los productos
- `GET /products/:id`: Obtener un producto por su ID
- `GET /products/search/:name`: Filtrar productos por nombre
- `POST /products`: Agregar un nuevo producto
- `PATCH /products/:id`: Modificar el precio de un producto
- `DELETE /products/:id`: Borrar un producto

## Control de Errores
El manejo de errores está implementado en todos los endpoints para manejar situaciones como la indisponibilidad de la base de datos, productos no encontrados, y validaciones de datos incorrectos. Las respuestas incluyen mensajes y códigos de error específicos para facilitar el debugging y mejorar la experiencia del usuario.