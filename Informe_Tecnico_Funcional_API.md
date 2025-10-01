# Informe Técnico y Funcional: API de Práctica de Arreglos

##Instrucciones de como arancar el back-end##
**Abrir terminal**
** npm run dev **

## 1. Resumen General y Arquitectura

**Propósito del Proyecto:** Esta API está diseñada para resolver ejercicios prácticos de manipulación de arreglos y matrices, proporcionando operaciones matemáticas avanzadas, análisis estadísticos y algoritmos de procesamiento de datos estructurados.

**Pila Tecnológica:** 
- Node.js (CommonJS)
- Express.js 5.1.0
- express-validator 7.2.1
- swagger-jsdoc 6.2.8
- swagger-ui-express 5.0.1
- dotenv 17.2.3

**Arquitectura del Código:**

* **`src/app.js`**: El punto de entrada y orquestador principal que configura el servidor Express, define el middleware de parsing JSON, establece el prefijo base `/api/v1` para todas las rutas, configura la documentación Swagger en `/api-docs`, y registra el middleware de manejo de errores.

* **`src/api/routes`**: Sistema de enrutamiento modular que organiza los endpoints por dominio funcional:
  - `index.js`: Router principal que agrupa las rutas bajo prefijos específicos (`/matrices`, `/sales`, `/grades`)
  - `matrix.routes.js`: Define 7 endpoints para operaciones con matrices
  - `sales.routes.js`: Define 1 endpoint para análisis de ventas
  - `grades.routes.js`: Define 1 endpoint para análisis de calificaciones

* **`src/api/controllers`**: Capa de controladores que actúan como intermediarios entre las rutas y los servicios, manejando la validación de entrada, el procesamiento de errores y la estructuración de respuestas HTTP.

* **`src/core/services`**: Contiene la lógica de negocio principal y los algoritmos implementados:
  - `matrix.service.js`: Algoritmos para rotación, espiral, cuadrado mágico, operaciones básicas, etc.
  - `sales.service.js`: Análisis estadístico de matriz de ventas predefinida
  - `grades.service.js`: Análisis estadístico de matriz de calificaciones predefinida

* **`src/middleware`**: 
  - `errorHandler.js`: Middleware centralizado para manejo de errores que procesa errores de validación de express-validator y errores personalizados de la aplicación

* **`src/config`**: 
  - `swagger.js`: Configuración de la documentación interactiva de la API usando OpenAPI 3.0.0

* **`src/utils`**: 
  - `ApiError.js`: Clase personalizada para errores de API con códigos de estado HTTP específicos

## 2. Flujo de una Petición Típica

1. **Recepción**: La petición HTTP llega al servidor Express en `app.js`
2. **Middleware de Parsing**: `express.json()` parsea el cuerpo de la petición JSON
3. **Enrutamiento**: El router principal (`/api/v1`) redirige a los routers específicos según la ruta
4. **Validación**: Los middlewares de `express-validator` validan los datos de entrada según las reglas definidas
5. **Controlador**: El controlador correspondiente recibe la petición validada y extrae los parámetros necesarios
6. **Servicio**: El controlador delega la lógica de negocio al servicio correspondiente
7. **Procesamiento**: El servicio ejecuta los algoritmos y operaciones matemáticas
8. **Respuesta**: El controlador estructura la respuesta JSON y la envía con el código de estado apropiado
9. **Manejo de Errores**: Si ocurre un error, el `errorHandler` middleware captura la excepción y devuelve una respuesta de error estructurada

## 3. Catálogo de Endpoints y Funcionalidades

### Endpoint 1: Rotación de Matriz
- **Endpoint:** `POST /api/v1/matrices/rotate`
- **Descripción:** Rota una matriz cuadrada N x N 90 grados en sentido horario usando el algoritmo de transposición e inversión de filas.
- **Parámetros de Entrada:**
  ```json
  {
    "matrix": [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]
  }
  ```
- **Validaciones Aplicadas:** 
  - La matriz debe ser un arreglo no vacío
  - Cada fila debe ser un arreglo
  - Todos los elementos deben ser números
  - La matriz debe ser cuadrada (N x N)
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "rotatedMatrix": [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ]
  }
  ```
- **Respuestas de Error:** 400 para validación fallida, 500 para errores internos

### Endpoint 2: Recorrido en Espiral
- **Endpoint:** `POST /api/v1/matrices/spiral-traversal`
- **Descripción:** Devuelve los elementos de una matriz en orden espiral (desde el exterior hacia el interior).
- **Parámetros de Entrada:**
  ```json
  {
    "matrix": [
      [1, 2, 3, 4],
      [12, 13, 14, 5],
      [11, 16, 15, 6],
      [10, 9, 8, 7]
    ]
  }
  ```
- **Validaciones Aplicadas:**
  - La matriz debe ser un arreglo no vacío
  - Cada fila debe ser un arreglo
  - Todos los elementos deben ser números
  - La matriz debe ser rectangular (todas las filas del mismo tamaño)
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "spiralOrder": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  }
  ```
- **Respuestas de Error:** 400 para validación fallida, 500 para errores internos

### Endpoint 3: Cuadrado Mágico
- **Endpoint:** `POST /api/v1/matrices/magic-square`
- **Descripción:** Verifica si una matriz cuadrada es un cuadrado mágico (suma constante en filas, columnas y diagonales).
- **Parámetros de Entrada:**
  ```json
  {
    "matrix": [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ]
  }
  ```
- **Validaciones Aplicadas:**
  - La matriz debe ser un arreglo no vacío
  - Cada fila debe ser un arreglo
  - Todos los elementos deben ser números
  - La matriz debe ser cuadrada (N x N)
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "isMagic": true,
    "constant": 15
  }
  ```
- **Respuestas de Error:** 400 para validación fallida, 500 para errores internos

### Endpoint 4: Conteo de Ceros
- **Endpoint:** `POST /api/v1/matrices/count-zeros`
- **Descripción:** Cuenta la cantidad de ceros en cada fila de una matriz 2D.
- **Parámetros de Entrada:**
  ```json
  {
    "matrix": [
      [0, 1, 0],
      [2, 0, 3],
      [4, 5, 6]
    ]
  }
  ```
- **Validaciones Aplicadas:**
  - La matriz debe ser un arreglo no vacío
  - Cada fila debe ser un arreglo
  - Todos los elementos deben ser números
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "zerosPerRow": [2, 1, 0]
  }
  ```
- **Respuestas de Error:** 400 para validación fallida, 500 para errores internos

### Endpoint 5: Operaciones Básicas de Matrices
- **Endpoint:** `POST /api/v1/matrices/operations`
- **Descripción:** Realiza suma, resta, multiplicación y división elemento por elemento entre dos matrices 2x2.
- **Parámetros de Entrada:**
  ```json
  {
    "matrixA": [[1, 2], [3, 4]],
    "matrixB": [[5, 6], [7, 8]]
  }
  ```
- **Validaciones Aplicadas:**
  - Ambas matrices deben ser arreglos 2x2
  - Todos los elementos deben ser números
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "sum": [[6, 8], [10, 12]],
    "subtraction": [[-4, -4], [-4, -4]],
    "product": [[5, 12], [21, 32]],
    "division": [[0.2, 0.333], [0.429, 0.5]]
  }
  ```
- **Respuestas de Error:** 400 para validación fallida, 500 para errores internos

### Endpoint 6: Matriz Identidad
- **Endpoint:** `POST /api/v1/matrices/identity/:size`
- **Descripción:** Genera una matriz identidad de tamaño especificado (1s en la diagonal, 0s en el resto).
- **Parámetros de Entrada:**
  - Parámetro de URL: `size` (entero positivo)
- **Validaciones Aplicadas:**
  - El tamaño debe ser un entero positivo
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "identity": [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
  }
  ```
- **Respuestas de Error:** 400 para parámetro inválido, 500 para errores internos

### Endpoint 7: Análisis de Matriz Aleatoria
- **Endpoint:** `GET /api/v1/matrices/random-analysis`
- **Descripción:** Genera una matriz aleatoria 5x10 con enteros entre 1-100 y calcula sumas y promedios por fila y columna.
- **Parámetros de Entrada:** Ninguno
- **Validaciones Aplicadas:** Ninguna (endpoint GET)
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "generatedMatrix": [[45, 23, 67, ...], [12, 89, 34, ...], ...],
    "rowSums": [450, 380, 420, 390, 410],
    "rowAverages": [45.0, 38.0, 42.0, 39.0, 41.0],
    "columnSums": [200, 180, 220, 190, 210, 195, 205, 185, 215, 200],
    "columnAverages": [40.0, 36.0, 44.0, 38.0, 42.0, 39.0, 41.0, 37.0, 43.0, 40.0]
  }
  ```
- **Respuestas de Error:** 500 para errores internos

### Endpoint 8: Análisis de Ventas
- **Endpoint:** `GET /api/v1/sales/analysis`
- **Descripción:** Analiza una matriz predefinida de ventas (12 meses x 7 días) y devuelve estadísticas completas.
- **Parámetros de Entrada:** Ninguno
- **Validaciones Aplicadas:** Ninguna (endpoint GET)
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "minSale": {
      "value": 150,
      "month": 0,
      "day": 1
    },
    "maxSale": {
      "value": 330,
      "month": 11,
      "day": 3
    },
    "totalSale": 20160,
    "salesPerDay": [2520, 2100, 2310, 2520, 2100, 2310, 2100]
  }
  ```
- **Respuestas de Error:** 500 para errores internos

### Endpoint 9: Análisis de Calificaciones
- **Endpoint:** `GET /api/v1/grades/analysis`
- **Descripción:** Analiza una matriz predefinida de calificaciones (10 estudiantes x 3 parciales) y devuelve estadísticas académicas.
- **Parámetros de Entrada:** Ninguno
- **Validaciones Aplicadas:** Ninguna (endpoint GET)
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "studentAverages": [7.17, 5.33, 9.0, 6.17, 5.17, 8.0, 5.5, 7.5, 7.33, 4.83],
    "highestAverage": 9.0,
    "lowestAverage": 4.83,
    "failedPartialsCount": 8,
    "gradeDistribution": {
      "0-4.9": 2,
      "5.0-5.9": 6,
      "6.0-6.9": 4,
      "7.0-7.9": 6,
      "8.0-8.9": 6,
      "9.0-10.0": 6
    }
  }
  ```
- **Respuestas de Error:** 500 para errores internos

## 4. Conclusión para el Desarrollo Frontend

Basado en el análisis exhaustivo de la API, las consideraciones clave para un desarrollador frontend son:

### Configuración Base
- **Base URL:** Todas las peticiones deben dirigirse a `/api/v1`
- **Content-Type:** Para peticiones POST, incluir `Content-Type: application/json` en las cabeceras
- **Documentación Interactiva:** Disponible en `http://localhost:3000/api-docs` para pruebas y referencia

### Manejo de Errores
- **Código 400:** Errores de validación con estructura `{ error: true, message: string, details: string[] }`
- **Código 500:** Errores internos con estructura `{ error: true, message: string }`
- **Validación de Entrada:** La API valida exhaustivamente todos los datos de entrada, por lo que el frontend debe manejar estos errores para mostrar mensajes útiles al usuario

### Estructura de Datos
- **Matrices:** Siempre representadas como arreglos 2D de números
- **Respuestas Exitosas:** Estructura consistente con propiedades descriptivas
- **Endpoints GET:** No requieren datos de entrada, devuelven análisis de matrices predefinidas
- **Endpoints POST:** Requieren estructura JSON específica según el endpoint

### Consideraciones de Rendimiento
- **Matrices Grandes:** Los algoritmos están optimizados, pero matrices muy grandes pueden requerir tiempo de procesamiento
- **Validación Estricta:** La API rechaza datos malformados, por lo que el frontend debe validar antes de enviar
- **Respuestas Inmediatas:** La mayoría de operaciones devuelven resultados instantáneos

Esta API proporciona una base sólida para aplicaciones frontend que requieran manipulación avanzada de matrices y análisis estadísticos, con validación robusta y documentación completa.
