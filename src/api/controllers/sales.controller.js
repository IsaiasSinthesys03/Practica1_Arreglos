// src/api/controllers/sales.controller.js
// Controlador para análisis de ventas
const ApiError = require('../../utils/ApiError');

class SalesController {
  constructor(salesService) {
    this.salesService = salesService;
    this.analyzeSales = this.analyzeSales.bind(this);
  }

  // GET /analyze
  analyzeSales(req, res, next) {
    try {
      const result = this.salesService.analyzeSales();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SalesController;
