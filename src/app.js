// app.js
// Servidor principal Express para la API de arreglos y matrices

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const mainRouter = require('./api/routes');
const swaggerSpec = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());


// Prefijo base para las rutas de la API
app.use('/api/v1', mainRouter);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de manejo de errores (debe ir después de las rutas)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
