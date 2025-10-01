// src/api/routes/matrix.routes.js
// Rutas para operaciones con matrices

const express = require('express');
const { body, param } = require('express-validator');
const MatrixController = require('../controllers/matrix.controller');
const MatrixService = require('../../core/services/matrix.service');

const router = express.Router();
const matrixService = new MatrixService();
const matrixController = new MatrixController(matrixService);

// Validaciones
const matrixValidation = [
	body('matrix')
		.exists().withMessage('La propiedad matrix es requerida.')
		.isArray({ min: 1 }).withMessage('La matriz no puede estar vacía.')
		.custom((matrix) => {
			if (!Array.isArray(matrix)) throw new Error('matrix debe ser un arreglo.');
			if (!matrix.every(row => Array.isArray(row))) throw new Error('Cada fila debe ser un arreglo.');
			if (!matrix.every(row => row.every(item => typeof item === 'number'))) throw new Error('Todos los elementos deben ser números.');
			return true;
		})
];

const magicSquareValidation = [
	...matrixValidation,
	body('matrix').custom((matrix) => {
		if (!matrix.every(row => row.length === matrix.length)) throw new Error('La matriz debe ser cuadrada (N x N).');
		return true;
	})
];

const operationsValidation = [
	body('matrixA')
		.exists().withMessage('matrixA es requerido.')
		.isArray({ min: 2, max: 2 }).withMessage('matrixA debe ser un arreglo 2x2.')
		.custom((matrixA) => {
			if (!matrixA.every(row => Array.isArray(row) && row.length === 2)) throw new Error('matrixA debe ser 2x2.');
			if (!matrixA.every(row => row.every(item => typeof item === 'number'))) throw new Error('Todos los elementos de matrixA deben ser números.');
			return true;
		}),
	body('matrixB')
		.exists().withMessage('matrixB es requerido.')
		.isArray({ min: 2, max: 2 }).withMessage('matrixB debe ser un arreglo 2x2.')
		.custom((matrixB) => {
			if (!matrixB.every(row => Array.isArray(row) && row.length === 2)) throw new Error('matrixB debe ser 2x2.');
			if (!matrixB.every(row => row.every(item => typeof item === 'number'))) throw new Error('Todos los elementos de matrixB deben ser números.');
			return true;
		})
];

const identityValidation = [
	param('size')
		.isInt({ min: 1 }).withMessage('El tamaño (size) debe ser un número entero positivo.')
];

const rotateValidation = [
	body('matrix')
		.exists().withMessage('La propiedad matrix es requerida.')
		.isArray({ min: 1 }).withMessage('La matriz no puede estar vacía.')
		.custom((matrix) => {
			if (!Array.isArray(matrix)) throw new Error('matrix debe ser un arreglo.');
			if (!matrix.every(row => Array.isArray(row) && row.length === matrix.length)) throw new Error('La matriz debe ser cuadrada (N x N).');
			if (!matrix.every(row => row.every(item => typeof item === 'number'))) throw new Error('Todos los elementos deben ser números.');
			return true;
		})
];

const spiralValidation = [
	body('matrix')
		.exists().withMessage('La propiedad matrix es requerida.')
		.isArray({ min: 1 }).withMessage('La matriz no puede estar vacía.')
		.custom((matrix) => {
			if (!Array.isArray(matrix)) throw new Error('matrix debe ser un arreglo.');
			const rowLength = matrix[0]?.length;
			if (!matrix.every(row => Array.isArray(row) && row.length === rowLength)) throw new Error('La matriz debe ser rectangular.');
			if (!matrix.every(row => row.every(item => typeof item === 'number'))) throw new Error('Todos los elementos deben ser números.');
			return true;
		})
];

/**
 * @swagger
 * /matrices/rotate:
 *   post:
 *     summary: Rota una matriz de N x N 90 grados en sentido horario.
 *     tags: [Matrices Avanzadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matrix:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: integer
 *             example:
 *               matrix: [[1,2,3],[4,5,6],[7,8,9]]
 *     responses:
 *       200:
 *         description: La matriz rotada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rotatedMatrix:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: integer
 */
router.post('/rotate', rotateValidation, matrixController.rotateMatrix.bind(matrixController));

/**
 * @swagger
 * /matrices/spiral-traversal:
 *   post:
 *     summary: Devuelve los elementos de una matriz en orden espiral.
 *     tags: [Matrices Avanzadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matrix:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: integer
 *             example:
 *               matrix: [[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]
 *     responses:
 *       200:
 *         description: Un arreglo 1D con los elementos en orden espiral.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 spiralOrder:
 *                   type: array
 *                   items:
 *                     type: integer
 */
router.post('/spiral-traversal', spiralValidation, matrixController.spiralTraversal.bind(matrixController));
/**
 * @swagger
 * /matrices/magic-square:
 *   post:
 *     summary: Verifica si una matriz es un cuadrado mágico.
 *     tags: [Matrices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matrix:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: integer
 *             example:
 *               matrix: [[4,9,2],[3,5,7],[8,1,6]]
 *     responses:
 *       200:
 *         description: Resultado de la verificación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isMagic:
 *                   type: boolean
 *                 constant:
 *                   type: integer
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/magic-square', magicSquareValidation, matrixController.checkMagicSquare);

/**
 * @swagger
 * /matrices/count-zeros:
 *   post:
 *     summary: Cuenta los ceros por fila en una matriz 2D.
 *     tags: [Matrices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matrix:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: integer
 *             example:
 *               matrix: [[0,1,0],[2,0,3],[4,5,6]]
 *     responses:
 *       200:
 *         description: Conteo de ceros por fila.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 zerosPerRow:
 *                   type: array
 *                   items:
 *                     type: integer
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/count-zeros', matrixValidation, matrixController.countZerosInMatrix);


/**
 * @swagger
 * /matrices/operations:
 *   post:
 *     summary: Realiza suma, resta, multiplicación y división entre dos matrices 2x2.
 *     tags: [Matrices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matrixA:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *               matrixB:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *             example:
 *               matrixA: [[1,2],[3,4]]
 *               matrixB: [[5,6],[7,8]]
 *     responses:
 *       200:
 *         description: Resultados de las operaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sum:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: number
 *                 subtraction:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: number
 *                 product:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: number
 *                 division:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: number
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/operations', operationsValidation, matrixController.performBasicOps);


/**
 * @swagger
 * /matrices/identity/{size}:
 *   post:
 *     summary: Genera una matriz identidad de tamaño dado.
 *     tags: [Matrices]
 *     parameters:
 *       - in: path
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tamaño de la matriz identidad
 *     responses:
 *       200:
 *         description: Matriz identidad generada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 identity:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: integer
 *       400:
 *         description: Parámetro inválido.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/identity/:size', identityValidation, matrixController.generateIdentityMatrix);
/**
 * @swagger
 * /matrices/random-analysis:
 *   get:
 *     summary: Genera una matriz aleatoria 5x10 y calcula suma y promedio por fila y columna.
 *     tags: [Matrices]
 *     responses:
 *       200:
 *         description: Análisis de la matriz aleatoria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 generatedMatrix:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: integer
 *                 rowSums:
 *                   type: array
 *                   items:
 *                     type: integer
 *                 rowAverages:
 *                   type: array
 *                   items:
 *                     type: number
 *                 columnSums:
 *                   type: array
 *                   items:
 *                     type: integer
 *                 columnAverages:
 *                   type: array
 *                   items:
 *                     type: number
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/random-analysis', matrixController.analyzeRandomMatrix);

module.exports = router;
