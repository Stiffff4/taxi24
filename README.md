# Proyecto de evaluación "Taxi24"

Taxi24 es una compañía de taxis que necesita la construcción y diseño de APIs que otras compañías puedan utilizar para gestionar su flota de pasajeros.

## Índice

- [Proyecto de evaluación "Taxi24"](#proyecto-de-evaluaci-n--taxi24-)
  * [Tecnologías utilizadas](#tecnolog-as-utilizadas)
  * [Instrucciones de instalación](#instrucciones-de-instalaci-n)
    + [Software imprescindible](#software-imprescindible-)
    + [Dependencias](#dependencias)
    + [Crear la base de datos y ejecutar las migraciones](#crear-la-base-de-datos-y-ejecutar-las-migraciones)
  * [Ejecucion](#ejecucion)
  * [Instrucciones de utilización](#instrucciones-de-utilizaci-n)
    + [Modelos y sus campos](#modelos-y-sus-campos)
    + [Controladores](#controladores)
  * [Endpoints funcionalidades principales](#endpoints-funcionalidades-principales)
    + [Conductores](#conductores)
    + [Viajes](#viajes)
    + [Pasajeros](#pasajeros)
  * [Endpoints CRUD](#endpoints-crud)
      - [GET](#get)
      - [POST](#post)
      - [PUT](#put)
      - [DELETE](#delete)

## Tecnologías utilizadas
- Framework: [NestJS](https://nestjs.com)
- Base de datos: [PostgreSQL](https://www.postgresql.org) con [Docker](https://www.docker.com/)
- ORM: [Prisma](https://www.prisma.io)

## Instrucciones de instalación

### Software imprescindible
- Descargar e instalar [Docker](https://www.docker.com/get-started), este será nuestro motor de base de datos.

### Dependencias

Una vez clonado el proyecto, instalar todas las dependencias con ```npm install```.

Instalar prisma con ```npm install prisma --save-dev``` y ```npm install @prisma/client```

Instalar docker con ```npm install docker```
### Crear la base de datos y ejecutar las migraciones

Dentro del archivo ```docker-compose.yml``` se encontrará la configuración para la base de datos. 

Y dentro de la carpeta ```prisma/migrations``` se encontrará tanto el schema como las migraciones (los scripts).

Para crear la base de datos, podemos utilizar el comando personaliazdo ```npm run create:db```.

Asimismo, podemos ejecutar las migraciones con ```npm run create:migrations``` una vez creada la base de datos.

**Nota:** En la ruta del proyecto, hay un archivo llamado "Taxi24.postman_collection.json" que puede ser importado en postman para tener las solicitudes hechas y solamente tener que modificarlas.

## Ejecucion

Podemos ejecutar el proyecto con el comando ```npm run start:dev```

## Instrucciones de utilización

### Modelos y sus campos
* Conductor
  ```typescript
  ID number
  Nombre string
  Apellido string
  Edad number
  ViajesCompletados number
  Ubicacion string
  Disponible boolean
  IDVehiculo number
  ```
- Pasajero
  ```typescript
  ID number
  Nombre string
  Apellido string
  Edad number
  ViajesCompletados number
  Ubicacion string
  ```
- Viaje
  ```typescript
  ID number
  UbicacionDestino string
  FechaInicio Date
  FechaFin Date
  Duracion number
  DistanciaRecorridaKM number
  Activo boolean
  Completado boolean
  MetodoPago string
  Valoracion number?
  ```
- Factura
  ```typescript
  ID number
  Precio number
  ```
- Vehiculo
  ```typescript
  ID number
  Marca string
  Modelo string
  Ano number
  Color string
  ```
### Controladores

- ```conductores```
- ```viajes```
- ```pasajeros```
- ```facturas```
- ```vehiculos```

## Endpoints funcionalidades principales

### Conductores
- **Obtener una lista de todos los conductores**

Endpoint: ```api/conductores``` - ```GET```



- **Obtener una lista de todos los conductores disponibles**


Endpoint: ```api/conductores/disponibles``` - ```GET```

- **Obtener una lista de todos los conductores disponibles en un radio de 3 km para una ubicación específica.**


Endpoint: ```api/conductores/disponibles-cercanos``` - ```GET```

```json
{
    "ubicacion": "18.477623,-69.931877"
}
```

**Nota:** La ubicación debe ser un ```string``` conteniendo la latitud y longitud separadas por una coma ```,``` 

*Debe ser "ubicacion" en minúsculas.*

- **Obtener un conductor específico por ID.**


Endpoint: ```api/conductores/{id}``` - ```GET```

### Viajes
- **Crear una nueva solicitud de "Viaje" asignando un conductor a un piloto.**


Endpoint: ```api/viajes/solicitar``` - ```POST```

```json
{
    "pasajero": 7,
    "ubicacionDestino": "18.4679683,-69.959637",
    "metodoPago": "efectivo"
}
```

```pasajero``` es el ID del mismo.

```metodoPago``` debe ser ```"efectivo"``` o ```"tarjeta"```.

- **Completar un viaje.**


Endpoint: ```api/viajes/completar/{idViaje}``` - ```POST```

```json
{
    "Valoracion": 3
}
```

Si no se quiere dar una ```Valoracion```, se envia ```null``` o ```0```.

- **Obtenga una lista de todos los viajes activos.**


Endpoint: ```api/viajes/activos``` - ```GET```

### Pasajeros
- Obtenga una lista de todos los pasajeros.

Endpoint: ```api/pasajeros``` - ```GET```

- Obtener un pasajero específico por su ID.

Endpoint: ```api/pasajeros/{id}``` - ```GET```


- Para un pasajero solicitando un viaje, obtenga una lista de los 3 conductores más cercanos al punto de partida.

Endpoint: ```api/pasajeros/conductores-cercanos``` - ```GET```

```json 
{
    "ubicacion": "18.4679683,-69.959637"
}
```


## Endpoints CRUD

#### GET 

- ```Obtener todos``` 
- ```Obtener por ID```

Enviando una solicitud a los siguientes endpoints, podemos obtener uno (por id) o muchos registros.

```api/{controlador}``` - ```GET```

```api/{controlador}/{id}``` - ```GET```

#### POST

- ```Agregar```

Enviando una solicitud al siguiente endpoint, podemos agregar un registro.

```api/{controlador}``` - ```POST```

Todas las propiedades deben estar presentes en el objeto, dentro del cuerpo de la solicitud.

Ejemplo: Si agregaremos un nuevo **pasajero**:

Endpoint: ```api/pasajeros``` - ```POST```

```json
{
    "Nombre": "Stephen",
    "Apellido": "Reyes",
    "Edad": 21,
    "ViajesCompletados": 5,
    "Ubicacion": "18.4710722,-69.9150165"
}
```

**No debe faltar ninguna.**

#### PUT

- ```Actualizar```

Enviando una solicitud al siguiente endpoint, podemos actualizar un registro.

```api/{controlador}/{id}``` - ```PUT```

Ejemplo: Si queremos actualizar un **vehiculo** existente:

Endpoint: ```api/vehiculos/{id}``` - ```PUT```


```json
{
    "Color": "Verde"
}
```


#### DELETE

- ```Eliminar```

Enviando una solicitud al siguiente endpoint, podemos eliminar un registro.

```api/{controlador}/{id}``` - ```DELETE```
