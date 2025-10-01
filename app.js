// ===== CONFIGURACIÓN GLOBAL =====
const API_BASE_URL = '/api/v1';
const API_ENDPOINTS = {
    rotate: '/matrices/rotate',
    spiral: '/matrices/spiral-traversal',
    magic: '/matrices/magic-square',
    zeros: '/matrices/count-zeros',
    operations: '/matrices/operations',
    identity: '/matrices/identity',
    random: '/matrices/random-analysis',
    sales: '/sales/analysis',
    grades: '/grades/analysis'
};

// ===== DATOS DE EJERCICIOS =====
const exercises = [
    { 
        id: 'rotate', 
        title: 'Rotación 90°', 
        description: 'Rota una matriz cuadrada 90 grados en sentido horario',
        icon: '🔄'
    },
    { 
        id: 'spiral', 
        title: 'Recorrido Espiral', 
        description: 'Recorre una matriz en orden espiral desde el exterior',
        icon: '🌀'
    },
    { 
        id: 'magic', 
        title: 'Cuadrado Mágico', 
        description: 'Verifica si una matriz es un cuadrado mágico',
        icon: '✨'
    },
    { 
        id: 'zeros', 
        title: 'Conteo de Ceros', 
        description: 'Cuenta los ceros en cada fila de una matriz',
        icon: '🔢'
    },
    { 
        id: 'operations', 
        title: 'Operaciones Básicas', 
        description: 'Realiza suma, resta, multiplicación y división entre matrices',
        icon: '⚡'
    },
    { 
        id: 'identity', 
        title: 'Matriz Identidad', 
        description: 'Genera una matriz identidad de tamaño especificado',
        icon: '🎯'
    },
    { 
        id: 'random', 
        title: 'Análisis Aleatorio', 
        description: 'Genera una matriz aleatoria y calcula estadísticas',
        icon: '🎲'
    },
    { 
        id: 'sales', 
        title: 'Análisis de Ventas', 
        description: 'Analiza estadísticas de ventas mensuales',
        icon: '💰'
    },
    { 
        id: 'grades', 
        title: 'Análisis de Calificaciones', 
        description: 'Analiza estadísticas de calificaciones estudiantiles',
        icon: '📊'
    }
];

// ===== ESTADO GLOBAL DE LA APLICACIÓN =====
class SpiderVerseApp {
    constructor() {
        this.currentView = 'welcome';
        this.currentExercise = null;
        this.isLoading = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderExerciseGrid();
        this.addBackButtonsToAllExercises();
        this.showView('welcome');
        this.setupMatrixGenerators();
    }

    // ===== CONFIGURACIÓN DE EVENT LISTENERS =====
    setupEventListeners() {
        // Navegación lateral
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const exercise = e.currentTarget.dataset.exercise;
                if (exercise) {
                    this.showView(exercise);
                }
            });
        });

        // Navegación desde la cuadrícula de ejercicios
        document.addEventListener('click', (e) => {
            if (e.target.closest('.exercise-card')) {
                const card = e.target.closest('.exercise-card');
                const exercise = card.dataset.exercise;
                if (exercise) {
                    this.showView(exercise);
                }
            }
        });

        // Botones de ejecución
        this.setupExecutionButtons();
        
        // Modales
        this.setupModals();
        
        // Generadores de matriz
        this.setupMatrixGenerators();
    }

    setupExecutionButtons() {
        // Rotación
        document.getElementById('execute-rotate')?.addEventListener('click', () => {
            this.executeRotate();
        });

        // Espiral
        document.getElementById('execute-spiral')?.addEventListener('click', () => {
            this.executeSpiral();
        });

        // Cuadrado mágico
        document.getElementById('execute-magic')?.addEventListener('click', () => {
            this.executeMagic();
        });

        // Conteo de ceros
        document.getElementById('execute-zeros')?.addEventListener('click', () => {
            this.executeZeros();
        });

        // Operaciones básicas
        document.getElementById('execute-operations')?.addEventListener('click', () => {
            this.executeOperations();
        });

        // Matriz identidad
        document.getElementById('execute-identity')?.addEventListener('click', () => {
            this.executeIdentity();
        });

        // Análisis aleatorio
        document.getElementById('execute-random')?.addEventListener('click', () => {
            this.executeRandom();
        });

        // Análisis de ventas
        document.getElementById('execute-sales')?.addEventListener('click', () => {
            this.executeSales();
        });

        // Análisis de calificaciones
        document.getElementById('execute-grades')?.addEventListener('click', () => {
            this.executeGrades();
        });
    }

    setupModals() {
        // Cerrar modales
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Cerrar al hacer clic fuera del modal
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });
    }

    setupMatrixGenerators() {
        // Generador de matriz de rotación
        document.getElementById('generate-rotate-matrix')?.addEventListener('click', () => {
            const size = parseInt(document.getElementById('rotate-size').value);
            this.generateMatrixGrid('rotate-input-grid', size, size);
        });

        // Generador de matriz espiral
        document.getElementById('generate-spiral-matrix')?.addEventListener('click', () => {
            const rows = parseInt(document.getElementById('spiral-rows').value);
            const cols = parseInt(document.getElementById('spiral-cols').value);
            this.generateMatrixGrid('spiral-input-grid', rows, cols);
        });

        // Generador de matriz mágica
        document.getElementById('generate-magic-matrix')?.addEventListener('click', () => {
            const size = parseInt(document.getElementById('magic-size').value);
            this.generateMatrixGrid('magic-input-grid', size, size);
        });

        // Generador de matriz de ceros
        document.getElementById('generate-zeros-matrix')?.addEventListener('click', () => {
            const rows = parseInt(document.getElementById('zeros-rows').value);
            const cols = parseInt(document.getElementById('zeros-cols').value);
            this.generateMatrixGrid('zeros-input-grid', rows, cols);
        });

        // Generadores de matrices de operaciones
        this.generateMatrixGrid('matrix-a-grid', 2, 2);
        this.generateMatrixGrid('matrix-b-grid', 2, 2);
    }

    // ===== RENDERIZAR CUADRÍCULA DE EJERCICIOS =====
    renderExerciseGrid() {
        const gridContainer = document.getElementById('exercise-grid');
        if (!gridContainer) return;

        gridContainer.innerHTML = '';

        exercises.forEach((exercise, index) => {
            const card = document.createElement('div');
            card.className = 'exercise-card';
            card.dataset.exercise = exercise.id;
            
            // Animación de aparición escalonada
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = 'fadeInUp 0.6s ease forwards';
            
            card.innerHTML = `
                <span class="exercise-card-icon">${exercise.icon}</span>
                <h3>${exercise.title}</h3>
                <p>${exercise.description}</p>
            `;

            // Event listener para navegación
            card.addEventListener('click', () => {
                this.showView(exercise.id);
            });

            gridContainer.appendChild(card);
        });
    }

    // ===== NAVEGACIÓN ENTRE VISTAS =====
    showView(viewName) {
        // Ocultar todas las vistas
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Mostrar vista seleccionada
        const targetView = document.getElementById(viewName);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;
        }

        // Actualizar navegación
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        if (viewName !== 'welcome') {
            const navItem = document.querySelector(`[data-exercise="${viewName}"]`);
            if (navItem) {
                navItem.classList.add('active');
            }
        }

        // Ocultar resultados previos
        this.hideAllResults();
    }

    // ===== AGREGAR BOTÓN DE REGRESO =====
    addBackButton(exerciseId) {
        const exerciseContainer = document.querySelector(`#${exerciseId} .exercise-container`);
        if (!exerciseContainer) return;

        const existingHeader = exerciseContainer.querySelector('.exercise-header');
        if (existingHeader) return; // Ya existe

        const header = document.createElement('div');
        header.className = 'exercise-header';
        header.innerHTML = `
            <button class="back-btn" onclick="app.showView('welcome')">
                <span>←</span> Volver al Inicio
            </button>
        `;

        const title = exerciseContainer.querySelector('.exercise-title');
        if (title) {
            title.parentNode.insertBefore(header, title);
            header.appendChild(title);
        }
    }

    // ===== AGREGAR BOTONES DE REGRESO A TODOS LOS EJERCICIOS =====
    addBackButtonsToAllExercises() {
        exercises.forEach(exercise => {
            this.addBackButton(exercise.id);
        });
    }

    hideAllResults() {
        document.querySelectorAll('.result-section').forEach(section => {
            section.style.display = 'none';
        });
    }

    // ===== GENERADOR DE GRIDS DE MATRIZ =====
    generateMatrixGrid(containerId, rows, cols) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.className = 'matrix-cell';
                cell.placeholder = '0';
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                // Animación de aparición escalonada
                setTimeout(() => {
                    cell.style.animation = 'cellAppear 0.5s ease forwards';
                }, (i * cols + j) * 100);

                container.appendChild(cell);
            }
        }
    }

    // ===== OBTENER DATOS DE MATRIZ =====
    getMatrixFromGrid(gridId) {
        const grid = document.getElementById(gridId);
        if (!grid) return null;

        const cells = grid.querySelectorAll('.matrix-cell');
        const matrix = [];
        let currentRow = [];

        cells.forEach((cell, index) => {
            const value = parseFloat(cell.value) || 0;
            currentRow.push(value);

            // Si es el último elemento de la fila
            if ((index + 1) % Math.sqrt(cells.length) === 0) {
                matrix.push([...currentRow]);
                currentRow = [];
            }
        });

        return matrix;
    }

    getMatrixFromGridByRows(gridId) {
        const grid = document.getElementById(gridId);
        if (!grid) return null;

        const cells = Array.from(grid.querySelectorAll('.matrix-cell'));
        const rows = parseInt(grid.dataset.rows) || Math.sqrt(cells.length);
        const cols = parseInt(grid.dataset.cols) || Math.sqrt(cells.length);
        
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                const cellIndex = i * cols + j;
                const value = parseFloat(cells[cellIndex]?.value) || 0;
                row.push(value);
            }
            matrix.push(row);
        }

        return matrix;
    }

    // ===== MOSTRAR RESULTADOS =====
    showResult(containerId, content) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = content;
            container.style.display = 'block';
            container.classList.add('fade-in');
        }
    }

    // ===== MOSTRAR MATRIZ EN GRID =====
    showMatrixInGrid(gridId, matrix) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${matrix[0].length}, 1fr)`;

        matrix.forEach((row, i) => {
            row.forEach((value, j) => {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';
                cell.textContent = value;
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.dataset.value = value;

                // Animación de aparición escalonada
                setTimeout(() => {
                    cell.style.animation = 'resultCellAppear 0.8s ease forwards';
                }, (i * matrix[0].length + j) * 50);
            });
        });
    }

    // ===== LOADING STATES =====
    setLoading(buttonId, isLoading) {
        const button = document.getElementById(buttonId);
        if (!button) return;

        const btnText = button.querySelector('.btn-text');
        const spinner = button.querySelector('.spinner-loader');

        if (isLoading) {
            button.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (spinner) spinner.style.display = 'inline-block';
        } else {
            button.disabled = false;
            if (btnText) btnText.style.display = 'inline';
            if (spinner) spinner.style.display = 'none';
        }
    }

    // ===== MODALES =====
    showModal(modalId, title, content, isError = false) {
        const modal = document.getElementById(modalId);
        const titleElement = document.getElementById(modalId === 'result-modal' ? 'modal-title' : 'error-title');
        const contentElement = document.getElementById(modalId === 'result-modal' ? 'modal-result' : 'error-result');

        if (titleElement) titleElement.textContent = title;
        if (contentElement) contentElement.innerHTML = content;

        modal.classList.add('active');
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // ===== LLAMADAS A LA API =====
    async makeApiCall(endpoint, method = 'GET', data = null) {
        const url = `${API_BASE_URL}${endpoint}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error en la petición');
            }

            return result;
        } catch (error) {
            console.error('Error en la API:', error);
            throw error;
        }
    }

    // ===== EJECUCIÓN DE EJERCICIOS =====
    async executeRotate() {
        const matrix = this.getMatrixFromGrid('rotate-input-grid');
        if (!matrix) {
            this.showModal('error-modal', 'Error', 'Por favor, completa la matriz de entrada');
            return;
        }

        this.setLoading('execute-rotate', true);

        try {
            const result = await this.makeApiCall(API_ENDPOINTS.rotate, 'POST', { matrix });
            this.showMatrixInGrid('rotate-output-grid', result.rotatedMatrix);
            this.showResult('rotate-result', '');
        } catch (error) {
            this.showModal('error-modal', 'Error', error.message);
        } finally {
            this.setLoading('execute-rotate', false);
        }
    }

    async executeSpiral() {
        const matrix = this.getMatrixFromGrid('spiral-input-grid');
        if (!matrix) {
            this.showModal('error-modal', 'Error', 'Por favor, completa la matriz de entrada');
            return;
        }

        this.setLoading('execute-spiral', true);

        try {
            const result = await this.makeApiCall(API_ENDPOINTS.spiral, 'POST', { matrix });
            
            // Mostrar animación de espiral
            this.showSpiralAnimation('spiral-input-grid', result.spiralOrder);
            
            // Mostrar resultado
            const outputHtml = `
                <div class="spiral-output">
                    <h4>Orden Espiral:</h4>
                    <div class="spiral-sequence">
                        ${result.spiralOrder.map((item, index) => 
                            `<span class="spiral-item" style="animation-delay: ${index * 0.1}s">${item}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
            this.showResult('spiral-result', outputHtml);
        } catch (error) {
            this.showModal('error-modal', 'Error', error.message);
        } finally {
            this.setLoading('execute-spiral', false);
        }
    }

    async executeMagic() {
        const matrix = this.getMatrixFromGrid('magic-input-grid');
        if (!matrix) {
            this.showModal('error-modal', 'Error', 'Por favor, completa la matriz de entrada');
            return;
        }

        this.setLoading('execute-magic', true);

        try {
            const result = await this.makeApiCall(API_ENDPOINTS.magic, 'POST', { matrix });
            
            const outputHtml = `
                <div class="magic-output">
                    <div class="magic-result ${result.isMagic ? 'true' : 'false'}">
                        ${result.isMagic ? '✨ ES CUADRADO MÁGICO ✨' : '❌ NO ES CUADRADO MÁGICO ❌'}
                    </div>
                    <p style="text-align: center; margin-top: 1rem; color: var(--accent-gray);">
                        Constante mágica: <strong>${result.constant}</strong>
                    </p>
                </div>
            `;
            this.showResult('magic-result', outputHtml);
        } catch (error) {
            this.showModal('error-modal', 'Error', error.message);
        } finally {
            this.setLoading('execute-magic', false);
        }
    }

    async executeZeros() {
        const matrix = this.getMatrixFromGrid('zeros-input-grid');
        if (!matrix) {
            this.showModal('error-modal', 'Error', 'Por favor, completa la matriz de entrada');
            return;
        }

        this.setLoading('execute-zeros', true);

        try {
            const result = await this.makeApiCall(API_ENDPOINTS.zeros, 'POST', { matrix });
            
            const outputHtml = `
                <div class="zeros-output">
                    ${result.zerosPerRow.map((count, index) => `
                        <div class="zeros-row">
                            <span class="zeros-row-label">Fila ${index + 1}:</span>
                            <span class="zeros-count">${count} ceros</span>
                        </div>
                    `).join('')}
                </div>
            `;
            this.showResult('zeros-result', outputHtml);
        } catch (error) {
            this.showModal('error-modal', 'Error', error.message);
        } finally {
            this.setLoading('execute-zeros', false);
        }
    }

    async executeOperations() {
        const matrixA = this.getMatrixFromGrid('matrix-a-grid');
        const matrixB = this.getMatrixFromGrid('matrix-b-grid');
        
        if (!matrixA || !matrixB) {
            this.showModal('error-modal', 'Error', 'Por favor, completa ambas matrices');
            return;
        }

        this.setLoading('execute-operations', true);

        try {
            const result = await this.makeApiCall(API_ENDPOINTS.operations, 'POST', { matrixA, matrixB });
            
            const outputHtml = `
                <div class="operations-output">
                    <div class="operation-result">
                        <h4>Suma (A + B)</h4>
                        <div class="matrix-grid">${this.formatMatrix(result.sum)}</div>
                    </div>
                    <div class="operation-result">
                        <h4>Resta (A - B)</h4>
                        <div class="matrix-grid">${this.formatMatrix(result.subtraction)}</div>
                    </div>
                    <div class="operation-result">
                        <h4>Multiplicación (A × B)</h4>
                        <div class="matrix-grid">${this.formatMatrix(result.product)}</div>
                    </div>
                    <div class="operation-result">
                        <h4>División (A ÷ B)</h4>
                        <div class="matrix-grid">${this.formatMatrix(result.division)}</div>
                    </div>
                </div>
            `;
            this.showResult('operations-result', outputHtml);
        } catch (error) {
            this.showModal('error-modal', 'Error', error.message);
        } finally {
            this.setLoading('execute-operations', false);
        }
    }

    async executeIdentity() {
        const size = parseInt(document.getElementById('identity-size').value);
        if (!size || size < 2) {
            this.showModal('error-modal', 'Error', 'Por favor, ingresa un tamaño válido (mínimo 2)');
            return;
        }

        this.setLoading('execute-identity', true);

        try {
            const result = await this.makeApiCall(`${API_ENDPOINTS.identity}/${size}`, 'POST');
            this.showMatrixInGrid('identity-output-grid', result.identity);
            this.showResult('identity-result', '');
        } catch (error) {
            this.showModal('error-modal', 'Error', error.message);
        } finally {
            this.setLoading('execute-identity', false);
        }
    }

    async executeRandom() {
        this.setLoading('execute-random', true);

        try {
            const result = await this.makeApiCall(API_ENDPOINTS.random, 'GET');
            
            const outputHtml = `
                <div class="random-output">
                    <div class="random-matrix-section">
                        <h4>Matriz Generada (5×10)</h4>
                        <div class="matrix-grid" style="grid-template-columns: repeat(10, 1fr); max-height: 300px; overflow-y: auto;">
                            ${result.generatedMatrix.map(row => 
                                row.map(cell => `<div class="matrix-cell">${cell}</div>`).join('')
                            ).join('')}
                        </div>
                    </div>
                    <div class="random-stats">
                        <h4>Estadísticas</h4>
                        <div class="stat-item">
                            <span class="stat-label">Suma por Fila:</span>
                            <span class="stat-value">[${result.rowSums.join(', ')}]</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Promedio por Fila:</span>
                            <span class="stat-value">[${result.rowAverages.join(', ')}]</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Suma por Columna:</span>
                            <span class="stat-value">[${result.columnSums.join(', ')}]</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Promedio por Columna:</span>
                            <span class="stat-value">[${result.columnAverages.join(', ')}]</span>
                        </div>
                    </div>
                </div>
            `;
            this.showResult('random-result', outputHtml);
        } catch (error) {
            this.showModal('error-modal', 'Error', error.message);
        } finally {
            this.setLoading('execute-random', false);
        }
    }

    async executeSales() {
        this.setLoading('execute-sales', true);

        try {
            const result = await this.makeApiCall(API_ENDPOINTS.sales, 'GET');
            
            const outputHtml = `
                <div class="sales-output">
                    <div class="sales-card">
                        <h4>Venta Mínima</h4>
                        <div class="sales-value">$${result.minSale.value}</div>
                        <div class="sales-details">Mes: ${result.minSale.month + 1}, Día: ${result.minSale.day + 1}</div>
                    </div>
                    <div class="sales-card">
                        <h4>Venta Máxima</h4>
                        <div class="sales-value">$${result.maxSale.value}</div>
                        <div class="sales-details">Mes: ${result.maxSale.month + 1}, Día: ${result.maxSale.day + 1}</div>
                    </div>
                    <div class="sales-card">
                        <h4>Venta Total</h4>
                        <div class="sales-value">$${result.totalSale.toLocaleString()}</div>
                        <div class="sales-details">Suma de todas las ventas</div>
                    </div>
                    <div class="sales-chart">
                        <h4>Ventas por Día de la Semana</h4>
                        ${result.salesPerDay.map((sales, index) => `
                            <div class="chart-bar">
                                <span class="chart-label">Día ${index + 1}</span>
                                <div class="chart-bar-fill" style="width: ${(sales / Math.max(...result.salesPerDay)) * 200}px;"></div>
                                <span class="chart-value">$${sales}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            this.showResult('sales-result', outputHtml);
        } catch (error) {
            this.showModal('error-modal', 'Error', error.message);
        } finally {
            this.setLoading('execute-sales', false);
        }
    }

    async executeGrades() {
        this.setLoading('execute-grades', true);

        try {
            const result = await this.makeApiCall(API_ENDPOINTS.grades, 'GET');
            
            const outputHtml = `
                <div class="grades-output">
                    <div class="grades-card">
                        <h4>Promedios por Estudiante</h4>
                        <div class="grades-list">
                            ${result.studentAverages.map((avg, index) => `
                                <div class="grade-item">
                                    <span class="grade-label">Estudiante ${index + 1}</span>
                                    <span class="grade-value">${avg}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="grades-card">
                        <h4>Estadísticas Generales</h4>
                        <div class="grades-list">
                            <div class="grade-item">
                                <span class="grade-label">Promedio Más Alto</span>
                                <span class="grade-value">${result.highestAverage}</span>
                            </div>
                            <div class="grade-item">
                                <span class="grade-label">Promedio Más Bajo</span>
                                <span class="grade-value">${result.lowestAverage}</span>
                            </div>
                            <div class="grade-item">
                                <span class="grade-label">Parciales Reprobados</span>
                                <span class="grade-value">${result.failedPartialsCount}</span>
                            </div>
                        </div>
                    </div>
                    <div class="grades-card">
                        <h4>Distribución de Calificaciones</h4>
                        <div class="grade-distribution">
                            ${Object.entries(result.gradeDistribution).map(([range, count]) => `
                                <div class="distribution-item">
                                    <span class="distribution-label">${range}</span>
                                    <span class="distribution-count">${count}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            this.showResult('grades-result', outputHtml);
        } catch (error) {
            this.showModal('error-modal', 'Error', error.message);
        } finally {
            this.setLoading('execute-grades', false);
        }
    }

    // ===== UTILIDADES =====
    formatMatrix(matrix) {
        return matrix.map(row => 
            row.map(cell => `<div class="matrix-cell">${cell !== null ? cell.toFixed(2) : 'N/A'}</div>`).join('')
        ).join('');
    }

    showSpiralAnimation(gridId, spiralOrder) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        const cells = grid.querySelectorAll('.matrix-cell');
        const rows = Math.sqrt(cells.length);
        
        // Crear animación de recorrido espiral
        const path = document.getElementById('spiral-path');
        if (path) {
            path.style.display = 'block';
            
            // Simular el recorrido espiral
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex < spiralOrder.length) {
                    const value = spiralOrder[currentIndex];
                    // Aquí podrías agregar efectos visuales específicos
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    path.style.display = 'none';
                }
            }, 200);
        }
    }

    // ===== INICIALIZACIÓN =====
    static init() {
        // La inicialización se maneja en el evento DOMContentLoaded
    }
}

// ===== INICIALIZAR APLICACIÓN =====
let app;

// Hacer la instancia global para el botón de regreso
document.addEventListener('DOMContentLoaded', () => {
    app = new SpiderVerseApp();
});

// ===== EFECTOS ADICIONALES =====
document.addEventListener('DOMContentLoaded', () => {
    // Efecto de partículas en el fondo
    createSpiderParticles();
    
    // Efectos de hover en elementos interactivos
    setupHoverEffects();
    
    // Animaciones de entrada
    setupEntryAnimations();
});

function createSpiderParticles() {
    const background = document.querySelector('.spider-background');
    if (!background) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'spider-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--spider-red);
            border-radius: 50%;
            opacity: 0.3;
            animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        background.appendChild(particle);
    }
}

function setupHoverEffects() {
    // Efectos de hover en botones
    document.querySelectorAll('.execute-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });

    // Efectos de hover en celdas de matriz
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('matrix-cell')) {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 0 15px var(--spider-red)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('matrix-cell')) {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
        }
    });
}

function setupEntryAnimations() {
    // Animación de entrada para elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.feature-card, .exercise-container').forEach(el => {
        observer.observe(el);
    });
}

// ===== ESTILOS DINÁMICOS PARA PARTÍCULAS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
