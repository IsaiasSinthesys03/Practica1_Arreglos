
// src/api/routes/grades.routes.js
// Rutas para análisis de calificaciones
const express = require('express');
const GradesController = require('../controllers/grades.controller');
const GradesService = require('../../core/services/grades.service');

const router = express.Router();
const gradesService = new GradesService();
const gradesController = new GradesController(gradesService);

/**
 * @swagger
 * /grades/analysis:
 *   get:
 *     summary: Analiza la matriz de calificaciones y devuelve estadísticas.
 *     tags: [Calificaciones]
 *     responses:
 *       200:
 *         description: Estadísticas de calificaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studentAverages:
 *                   type: array
 *                   items:
 *                     type: number
 *                 highestAverage:
 *                   type: number
 *                 lowestAverage:
 *                   type: number
 *                 failedPartialsCount:
 *                   type: integer
 *                 gradeDistribution:
 *                   type: object
 *                   properties:
 *                     0-4.9:
 *                       type: integer
 *                     5.0-5.9:
 *                       type: integer
 *                     6.0-6.9:
 *                       type: integer
 *                     7.0-7.9:
 *                       type: integer
 *                     8.0-8.9:
 *                       type: integer
 *                     9.0-10.0:
 *                       type: integer
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/analysis', gradesController.analyzeGrades);

module.exports = router;
