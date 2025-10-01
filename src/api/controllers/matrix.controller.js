// src/api/controllers/matrix.controller.js
// Controlador para operaciones con matrices
const ApiError = require('../../utils/ApiError');

class MatrixController {
  // POST /rotate
  rotateMatrix(req, res, next) {
    try {
      const { matrix } = req.body;
      const rotated = this.matrixService.rotateMatrix(matrix);
      res.status(200).json({ rotatedMatrix: rotated });
    } catch (error) {
      next(error);
    }
  }

  // POST /spiral-traversal
  spiralTraversal(req, res, next) {
    try {
      const { matrix } = req.body;
      const spiral = this.matrixService.spiralTraversal(matrix);
      res.status(200).json({ spiralOrder: spiral });
    } catch (error) {
      next(error);
    }
  }
  // GET /random-analysis
  analyzeRandomMatrix(req, res, next) {
    try {
      const result = this.matrixService.analyzeRandomMatrix();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  constructor(matrixService) {
    this.matrixService = matrixService;
    // Enlazar métodos para asegurar el contexto de 'this'
    this.countZerosInMatrix = this.countZerosInMatrix.bind(this);
    this.checkMagicSquare = this.checkMagicSquare.bind(this);
    this.performBasicOps = this.performBasicOps.bind(this);
    this.generateIdentityMatrix = this.generateIdentityMatrix.bind(this);
  }

  // POST /magic-square
  checkMagicSquare(req, res, next) {
    try {
      const { matrix } = req.body;
      const result = this.matrixService.checkMagicSquare(matrix);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // POST /count-zeros
  countZerosInMatrix(req, res, next) {
    try {
      const { matrix } = req.body;
      const result = this.matrixService.countZerosInMatrix(matrix);
      res.status(200).json({ zerosPerRow: result });
    } catch (error) {
      next(error);
    }
  }

  // POST /basic-ops
  performBasicOps(req, res, next) {
    try {
      const { matrixA, matrixB } = req.body;
      const result = this.matrixService.performBasicOps(matrixA, matrixB);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // POST /identity/:size
  generateIdentityMatrix(req, res, next) {
    try {
      const size = parseInt(req.params.size, 10);
      const result = this.matrixService.generateIdentityMatrix(size);
      res.status(200).json({ identity: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MatrixController;
