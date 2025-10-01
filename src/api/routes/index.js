// src/api/routes/index.js
// Enrutador principal para la API
const express = require('express');
const matrixRoutes = require('./matrix.routes');
const salesRoutes = require('./sales.routes');
const gradesRoutes = require('./grades.routes');

const router = express.Router();

// Prefijos para cada grupo de rutas
router.use('/matrices', matrixRoutes);
router.use('/sales', salesRoutes);
router.use('/grades', gradesRoutes);

module.exports = router;
