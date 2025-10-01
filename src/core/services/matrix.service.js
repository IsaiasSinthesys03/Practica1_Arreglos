// src/core/services/matrix.service.js
// Lógica de negocio para operaciones con matrices

class MatrixService {
  // Rota una matriz N x N 90 grados en sentido horario
  rotateMatrix(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0 || matrix.length !== matrix[0].length) {
      throw new Error('La matriz debe ser cuadrada N x N');
    }
    const n = matrix.length;
    // Transponer la matriz (solo la mitad superior)
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }
    // Invertir cada fila
    for (let i = 0; i < n; i++) {
      matrix[i].reverse();
    }
    return matrix;
  }

  // Recorrido en espiral de una matriz
  spiralTraversal(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0) {
      throw new Error('La matriz debe ser un arreglo 2D');
    }
    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    while (left <= right && top <= bottom) {
      // De izquierda a derecha
      for (let j = left; j <= right; j++) result.push(matrix[top][j]);
      top++;
      // De arriba a abajo
      for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
      right--;
      if (top <= bottom) {
        // De derecha a izquierda
        for (let j = right; j >= left; j--) result.push(matrix[bottom][j]);
        bottom--;
      }
      if (left <= right) {
        // De abajo a arriba
        for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
        left++;
      }
    }
    return result;
  }
  // Analiza una matriz aleatoria 5x10: suma y promedio por fila y columna
  analyzeRandomMatrix() {
    const ROWS = 5;
    const COLS = 10;
    // Generar matriz 5x10 con enteros aleatorios entre 1 y 100
    const generatedMatrix = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => Math.floor(Math.random() * 100) + 1)
    );
    // Suma y promedio por fila
    const rowSums = generatedMatrix.map(row => row.reduce((a, b) => a + b, 0));
    const rowAverages = rowSums.map(sum => +(sum / COLS).toFixed(2));
    // Suma y promedio por columna
    const columnSums = Array(COLS).fill(0);
    for (let j = 0; j < COLS; j++) {
      for (let i = 0; i < ROWS; i++) {
        columnSums[j] += generatedMatrix[i][j];
      }
    }
    const columnAverages = columnSums.map(sum => +(sum / ROWS).toFixed(2));
    return {
      generatedMatrix,
      rowSums,
      rowAverages,
      columnSums,
      columnAverages
    };
  }
  // Cuenta los ceros por fila en una matriz 2D
  countZerosInMatrix(matrix) {
    if (!Array.isArray(matrix)) throw new Error('La matriz debe ser un arreglo 2D');
    return matrix.map(row => row.filter(num => num === 0).length);
  }

  // Verifica si una matriz es un cuadrado mágico
  checkMagicSquare(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0) throw new Error('Matriz inválida');
    const n = matrix.length;
    const magicConstant = matrix[0].reduce((a, b) => a + b, 0);
    let isMagic = true;

    // Verificar filas
    for (let i = 0; i < n; i++) {
      if (matrix[i].reduce((a, b) => a + b, 0) !== magicConstant) {
        isMagic = false;
        break;
      }
    }
    // Verificar columnas
    if (isMagic) {
      for (let j = 0; j < n; j++) {
        let colSum = 0;
        for (let i = 0; i < n; i++) colSum += matrix[i][j];
        if (colSum !== magicConstant) {
          isMagic = false;
          break;
        }
      }
    }
    // Verificar diagonales
    if (isMagic) {
      let diag1 = 0, diag2 = 0;
      for (let i = 0; i < n; i++) {
        diag1 += matrix[i][i];
        diag2 += matrix[i][n - 1 - i];
      }
      if (diag1 !== magicConstant || diag2 !== magicConstant) isMagic = false;
    }
    return { isMagic, constant: magicConstant };
  }

  // Operaciones básicas entre dos matrices 2x2
  performBasicOps(matrixA, matrixB) {
    if (!Array.isArray(matrixA) || !Array.isArray(matrixB)) throw new Error('Ambas matrices deben ser 2x2');
    const sum = [], subtraction = [], product = [], division = [];
    for (let i = 0; i < 2; i++) {
      sum[i] = [];
      subtraction[i] = [];
      product[i] = [];
      division[i] = [];
      for (let j = 0; j < 2; j++) {
        sum[i][j] = matrixA[i][j] + matrixB[i][j];
        subtraction[i][j] = matrixA[i][j] - matrixB[i][j];
        product[i][j] = matrixA[i][j] * matrixB[i][j];
        division[i][j] = matrixB[i][j] !== 0 ? matrixA[i][j] / matrixB[i][j] : null;
      }
    }
    return { sum, subtraction, product, division };
  }

  // Genera una matriz identidad de tamaño dado
  generateIdentityMatrix(size) {
    if (typeof size !== 'number' || size < 1) throw new Error('El tamaño debe ser un número mayor a 0');
    const identity = [];
    for (let i = 0; i < size; i++) {
      identity[i] = [];
      for (let j = 0; j < size; j++) {
        identity[i][j] = i === j ? 1 : 0;
      }
    }
    return identity;
  }
}

module.exports = MatrixService;
