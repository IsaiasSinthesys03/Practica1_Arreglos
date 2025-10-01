// src/core/services/sales.service.js
// Lógica de negocio para análisis de ventas

class SalesService {
  // Matriz de ventas: filas = meses (0-11), columnas = días (0-6)
  #salesMatrix = [
    [200, 150, 180, 220, 170, 210, 190], // Enero
    [210, 160, 190, 230, 180, 220, 200], // Febrero
    [220, 170, 200, 240, 190, 230, 210], // Marzo
    [230, 180, 210, 250, 200, 240, 220], // Abril
    [240, 190, 220, 260, 210, 250, 230], // Mayo
    [250, 200, 230, 270, 220, 260, 240], // Junio
    [260, 210, 240, 280, 230, 270, 250], // Julio
    [270, 220, 250, 290, 240, 280, 260], // Agosto
    [280, 230, 260, 300, 250, 290, 270], // Septiembre
    [290, 240, 270, 310, 260, 300, 280], // Octubre
    [300, 250, 280, 320, 270, 310, 290], // Noviembre
    [310, 260, 290, 330, 280, 320, 300], // Diciembre
  ];

  // Analiza la matriz de ventas y devuelve estadísticas
  analyzeSales() {
    let minSale = { value: Infinity, month: -1, day: -1 };
    let maxSale = { value: -Infinity, month: -1, day: -1 };
    let totalSale = 0;
    const salesPerDay = Array(7).fill(0);

    for (let month = 0; month < this.#salesMatrix.length; month++) {
      for (let day = 0; day < this.#salesMatrix[month].length; day++) {
        const sale = this.#salesMatrix[month][day];
        totalSale += sale;
        salesPerDay[day] += sale;
        if (sale < minSale.value) minSale = { value: sale, month, day };
        if (sale > maxSale.value) maxSale = { value: sale, month, day };
      }
    }
    return { minSale, maxSale, totalSale, salesPerDay };
  }
}

module.exports = SalesService;
