// src/api/controllers/grades.controller.js
// Controlador para análisis de calificaciones
const ApiError = require('../../utils/ApiError');

class GradesController {
  constructor(gradesService) {
    this.gradesService = gradesService;
    this.analyzeGrades = this.analyzeGrades.bind(this);
  }

  // GET /analyze
  analyzeGrades(req, res, next) {
    try {
      const result = this.gradesService.analyzeGrades();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GradesController;
