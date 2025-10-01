
// src/api/routes/sales.routes.js
// Rutas para análisis de ventas
const express = require('express');
const SalesController = require('../controllers/sales.controller');
const SalesService = require('../../core/services/sales.service');

const router = express.Router();
const salesService = new SalesService();
const salesController = new SalesController(salesService);

/**
 * @swagger
 * /sales/analysis:
 *   get:
 *     summary: Analiza la matriz de ventas y devuelve estadísticas.
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Estadísticas de ventas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 minSale:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: number
 *                     month:
 *                       type: integer
 *                     day:
 *                       type: integer
 *                 maxSale:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: number
 *                     month:
 *                       type: integer
 *                     day:
 *                       type: integer
 *                 totalSale:
 *                   type: number
 *                 salesPerDay:
 *                   type: array
 *                   items:
 *                     type: number
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/analysis', salesController.analyzeSales);

module.exports = router;
