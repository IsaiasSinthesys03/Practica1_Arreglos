// En src/config/swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Práctica de Arreglos',
    version: '1.0.0',
    description: 'Documentación interactiva para la API que resuelve ejercicios de arreglos y matrices.',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Servidor de Desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Rutas a los archivos que contienen las anotaciones OpenAPI
  apis: ['./src/api/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
