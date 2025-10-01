// src/middleware/errorHandler.js
// Middleware para manejo centralizado de errores


const { validationResult } = require('express-validator');

function errorHandler(err, req, res, next) {
  // Manejo de errores de validación de express-validator
  if (Array.isArray(err?.errors) && err.errors[0]?.msg) {
    return res.status(400).json({
      error: true,
      message: 'Error de validación',
      details: err.errors.map(e => e.msg)
    });
  }
  const status = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(status).json({
    error: true,
    message,
    // Solo en desarrollo:
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}

module.exports = errorHandler;
