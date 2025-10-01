// src/core/services/grades.service.js
// Lógica de negocio para análisis de calificaciones

class GradesService {
  // Matriz de calificaciones: filas = estudiantes, columnas = parciales
  #gradesMatrix = [
    [7.5, 8.0, 6.0],
    [5.0, 4.5, 6.5],
    [9.0, 8.5, 9.5],
    [6.0, 7.0, 5.5],
    [4.0, 5.5, 6.0],
    [8.0, 7.5, 8.5],
    [5.5, 6.0, 5.0],
    [7.0, 8.0, 7.5],
    [6.5, 7.5, 8.0],
    [5.0, 4.0, 5.5],
  ];

  // Analiza la matriz de calificaciones y devuelve estadísticas
  analyzeGrades() {
    const studentAverages = this.#gradesMatrix.map(row => {
      const sum = row.reduce((a, b) => a + b, 0);
      return +(sum / row.length).toFixed(2);
    });
    const highestAverage = Math.max(...studentAverages);
    const lowestAverage = Math.min(...studentAverages);
    let failedPartialsCount = 0;
    const gradeDistribution = {
      '0-4.9': 0,
      '5.0-5.9': 0,
      '6.0-6.9': 0,
      '7.0-7.9': 0,
      '8.0-8.9': 0,
      '9.0-10.0': 0,
    };
    for (const row of this.#gradesMatrix) {
      for (const grade of row) {
        if (grade < 6) failedPartialsCount++;
        if (grade < 5) gradeDistribution['0-4.9']++;
        else if (grade < 6) gradeDistribution['5.0-5.9']++;
        else if (grade < 7) gradeDistribution['6.0-6.9']++;
        else if (grade < 8) gradeDistribution['7.0-7.9']++;
        else if (grade < 9) gradeDistribution['8.0-8.9']++;
        else gradeDistribution['9.0-10.0']++;
      }
    }
    return { studentAverages, highestAverage, lowestAverage, failedPartialsCount, gradeDistribution };
  }
}

module.exports = GradesService;
