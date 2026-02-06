// HangTracker - Training Logger
let trainings = JSON.parse(localStorage.getItem('hangtracker_trainings') || '[]');
let pullupsSetCounter = 0;
let hangsSetCounter = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    addPullupsSet(); // Add initial set block
    addHangsSet(); // Add initial set block
});

// Setup event listeners
function setupEventListeners() {
    // Resistance form
    document.getElementById('formResistance').addEventListener('submit', saveResistanceTraining);
    document.getElementById('res_claudication').addEventListener('change', toggleClaudicationField);
    
    // FMax Pullups form
    document.getElementById('formFmaxPullups').addEventListener('submit', saveFmaxPullupsTraining);
    
    // FMax Hangs form
    document.getElementById('formFmaxHangs').addEventListener('submit', saveFmaxHangsTraining);
    
    // Import file
    document.getElementById('importFile').addEventListener('change', importData);
}

// Navigation
function selectType(type) {
    hideAllViews();
    if (type === 'fmax') {
        showView('viewFmaxSubtype');
    } else {
        showView('viewResistance');
    }
}

function selectFmaxType(type) {
    hideAllViews();
    if (type === 'pullups') {
        showView('viewFmaxPullups');
    } else {
        showView('viewFmaxHangs');
    }
}

function goBack(viewId) {
    hideAllViews();
    showView(viewId);
}

function showHistory() {
    hideAllViews();
    showView('viewHistory');
    renderHistory();
}

function hideAllViews() {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
}

function showView(viewId) {
    document.getElementById(viewId).classList.add('active');
}

// Toggle claudication field
function toggleClaudicationField() {
    const checkbox = document.getElementById('res_claudication');
    const setGroup = document.getElementById('res_claudication_set_group');
    setGroup.style.display = checkbox.checked ? 'block' : 'none';
}

// Add Pullups Set Block
function addPullupsSet() {
    pullupsSetCounter++;
    const container = document.getElementById('pullups_sets_container');
    
    const setBlock = document.createElement('div');
    setBlock.className = 'set-block';
    setBlock.id = `pullups_set_${pullupsSetCounter}`;
    
    setBlock.innerHTML = `
        <div class="set-block-header">
            <h3>Bloque ${pullupsSetCounter}</h3>
            ${pullupsSetCounter > 1 ? `<button type="button" class="btn-remove-set" onclick="removePullupsSet(${pullupsSetCounter})">🗑️ Eliminar</button>` : ''}
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Lastre (+Kg)</label>
                <input type="number" name="pullups_weight_${pullupsSetCounter}" step="0.5" required placeholder="10">
            </div>
            <div class="form-group">
                <label>Canto</label>
                <select name="pullups_edge_${pullupsSetCounter}" required>
                    <option value="">Seleccionar...</option>
                    <option value="Cazo">Cazo</option>
                    <option value="40mm">40 mm</option>
                    <option value="30mm">30 mm</option>
                    <option value="22mm">22 mm</option>
                    <option value="15mm">15 mm</option>
                </select>
            </div>
            <div class="form-group">
                <label>Número de dominadas</label>
                <input type="number" name="pullups_reps_${pullupsSetCounter}" min="1" required placeholder="5">
            </div>
            <div class="form-group">
                <label>Descanso entre series</label>
                <input type="text" name="pullups_rest_${pullupsSetCounter}" placeholder="3:00" pattern="[0-9]{1,2}:[0-9]{2}" required>
                <small>Formato: min:seg</small>
            </div>
            <div class="form-group">
                <label>Número de sets</label>
                <input type="number" name="pullups_sets_${pullupsSetCounter}" min="1" required placeholder="3">
            </div>
        </div>
    `;
    
    container.appendChild(setBlock);
}

function removePullupsSet(id) {
    const block = document.getElementById(`pullups_set_${id}`);
    if (block) {
        block.remove();
    }
}

// Add Hangs Set Block
function addHangsSet() {
    hangsSetCounter++;
    const container = document.getElementById('hangs_sets_container');
    
    const setBlock = document.createElement('div');
    setBlock.className = 'set-block';
    setBlock.id = `hangs_set_${hangsSetCounter}`;
    
    setBlock.innerHTML = `
        <div class="set-block-header">
            <h3>Bloque ${hangsSetCounter}</h3>
            ${hangsSetCounter > 1 ? `<button type="button" class="btn-remove-set" onclick="removeHangsSet(${hangsSetCounter})">🗑️ Eliminar</button>` : ''}
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Lastre (+Kg)</label>
                <input type="number" name="hangs_weight_${hangsSetCounter}" step="0.5" required placeholder="10">
            </div>
            <div class="form-group">
                <label>Canto</label>
                <select name="hangs_edge_${hangsSetCounter}" required>
                    <option value="">Seleccionar...</option>
                    <option value="Cazo">Cazo</option>
                    <option value="40mm">40 mm</option>
                    <option value="30mm">30 mm</option>
                    <option value="22mm">22 mm</option>
                    <option value="15mm">15 mm</option>
                </select>
            </div>
            <div class="form-group">
                <label>Tiempo suspensión (seg)</label>
                <input type="number" name="hangs_time_${hangsSetCounter}" step="1" required placeholder="10">
            </div>
            <div class="form-group">
                <label>Descanso entre series</label>
                <input type="text" name="hangs_rest_${hangsSetCounter}" placeholder="3:00" pattern="[0-9]{1,2}:[0-9]{2}" required>
                <small>Formato: min:seg</small>
            </div>
            <div class="form-group">
                <label>Número de sets</label>
                <input type="number" name="hangs_sets_${hangsSetCounter}" min="1" required placeholder="3">
            </div>
        </div>
    `;
    
    container.appendChild(setBlock);
}

function removeHangsSet(id) {
    const block = document.getElementById(`hangs_set_${id}`);
    if (block) {
        block.remove();
    }
}

// Save Resistance Training
function saveResistanceTraining(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const now = new Date();
    
    const training = {
        type: 'resistance',
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0].substring(0, 5),
        datetime: now.toISOString(),
        edge: formData.get('edge'),
        hang_time: parseInt(formData.get('hang_time')),
        rest_time: parseInt(formData.get('rest_time')),
        repetitions: 30,
        rest_between: formData.get('rest_between'),
        sets: parseInt(formData.get('sets')),
        claudication: formData.get('claudication') === 'on',
        claudication_set: formData.get('claudication') === 'on' ? (parseInt(formData.get('claudication_set')) || null) : null,
        notes: formData.get('notes') || null
    };
    
    trainings.unshift(training);
    localStorage.setItem('hangtracker_trainings', JSON.stringify(trainings));
    
    alert('✅ Entrenamiento guardado correctamente');
    e.target.reset();
    goBack('viewTypeSelector');
}

// Save FMax Pullups Training
function saveFmaxPullupsTraining(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const now = new Date();
    
    // Collect all set blocks
    const setBlocks = [];
    const container = document.getElementById('pullups_sets_container');
    const blocks = container.querySelectorAll('.set-block');
    
    blocks.forEach((block, index) => {
        const blockNum = block.id.split('_')[2];
        setBlocks.push({
            weight: parseFloat(formData.get(`pullups_weight_${blockNum}`)),
            edge: formData.get(`pullups_edge_${blockNum}`),
            reps: parseInt(formData.get(`pullups_reps_${blockNum}`)),
            rest_between: formData.get(`pullups_rest_${blockNum}`),
            sets: parseInt(formData.get(`pullups_sets_${blockNum}`))
        });
    });
    
    const training = {
        type: 'fmax_pullups',
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0].substring(0, 5),
        datetime: now.toISOString(),
        set_blocks: setBlocks,
        notes: formData.get('notes') || null
    };
    
    trainings.unshift(training);
    localStorage.setItem('hangtracker_trainings', JSON.stringify(trainings));
    
    alert('✅ Entrenamiento guardado correctamente');
    
    // Reset form and recreate initial set
    e.target.reset();
    document.getElementById('pullups_sets_container').innerHTML = '';
    pullupsSetCounter = 0;
    addPullupsSet();
    
    goBack('viewTypeSelector');
}

// Save FMax Hangs Training
function saveFmaxHangsTraining(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const now = new Date();
    
    // Collect all set blocks
    const setBlocks = [];
    const container = document.getElementById('hangs_sets_container');
    const blocks = container.querySelectorAll('.set-block');
    
    blocks.forEach((block, index) => {
        const blockNum = block.id.split('_')[2];
        setBlocks.push({
            weight: parseFloat(formData.get(`hangs_weight_${blockNum}`)),
            edge: formData.get(`hangs_edge_${blockNum}`),
            hang_time: parseInt(formData.get(`hangs_time_${blockNum}`)),
            rest_between: formData.get(`hangs_rest_${blockNum}`),
            sets: parseInt(formData.get(`hangs_sets_${blockNum}`))
        });
    });
    
    const training = {
        type: 'fmax_hangs',
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0].substring(0, 5),
        datetime: now.toISOString(),
        set_blocks: setBlocks,
        notes: formData.get('notes') || null
    };
    
    trainings.unshift(training);
    localStorage.setItem('hangtracker_trainings', JSON.stringify(trainings));
    
    alert('✅ Entrenamiento guardado correctamente');
    
    // Reset form and recreate initial set
    e.target.reset();
    document.getElementById('hangs_sets_container').innerHTML = '';
    hangsSetCounter = 0;
    addHangsSet();
    
    goBack('viewTypeSelector');
}

// Render History
function renderHistory() {
    const container = document.getElementById('historyList');
    
    if (trainings.length === 0) {
        container.innerHTML = '<div class="empty-state">No hay entrenamientos registrados</div>';
        return;
    }
    
    container.innerHTML = trainings.map((training, index) => {
        const datetime = new Date(training.datetime);
        const dateStr = datetime.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        const timeStr = datetime.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        if (training.type === 'resistance') {
            return renderResistanceItem(training, dateStr, timeStr);
        } else if (training.type === 'fmax_pullups') {
            return renderFmaxPullupsItem(training, dateStr, timeStr);
        } else if (training.type === 'fmax_hangs') {
            return renderFmaxHangsItem(training, dateStr, timeStr);
        }
    }).join('');
}

function renderResistanceItem(training, dateStr, timeStr) {
    const claudicationBadge = training.claudication ? 
        `<span class="badge claudication">⚠️ Claudicación en set ${training.claudication_set}</span>` : '';
    
    return `
        <div class="history-item resistance">
            <div class="history-header">
                <span class="history-type">⏱️ Resistencia ${claudicationBadge}</span>
                <span class="history-date">${dateStr} ${timeStr}</span>
            </div>
            <div class="history-details">
                <div class="history-detail"><strong>Canto:</strong> <span>${training.edge}</span></div>
                <div class="history-detail"><strong>Colgado:</strong> <span>${training.hang_time}s</span></div>
                <div class="history-detail"><strong>Descanso:</strong> <span>${training.rest_time}s</span></div>
                <div class="history-detail"><strong>Repeticiones:</strong> <span>${training.repetitions}</span></div>
                <div class="history-detail"><strong>Descanso series:</strong> <span>${training.rest_between}</span></div>
                <div class="history-detail"><strong>Sets:</strong> <span>${training.sets}</span></div>
                ${training.notes ? `<div class="history-detail" style="grid-column: 1/-1;"><strong>Notas:</strong> <span>${training.notes}</span></div>` : ''}
            </div>
        </div>
    `;
}

function renderFmaxPullupsItem(training, dateStr, timeStr) {
    const blocksHtml = training.set_blocks.map((block, idx) => `
        <div style="margin-top: 0.5rem; padding-left: 1rem; border-left: 3px solid #10b981;">
            <strong>Bloque ${idx + 1}:</strong> ${block.weight}kg, ${block.edge}, ${block.reps} reps × ${block.sets} sets (Descanso: ${block.rest_between})
        </div>
    `).join('');
    
    return `
        <div class="history-item fmax">
            <div class="history-header">
                <span class="history-type">🏋️ FMax - Dominadas <span class="badge pullups">💪 Pullups</span></span>
                <span class="history-date">${dateStr} ${timeStr}</span>
            </div>
            <div class="history-details">
                <div style="grid-column: 1/-1;">
                    ${blocksHtml}
                </div>
                ${training.notes ? `<div class="history-detail" style="grid-column: 1/-1;"><strong>Notas:</strong> <span>${training.notes}</span></div>` : ''}
            </div>
        </div>
    `;
}

function renderFmaxHangsItem(training, dateStr, timeStr) {
    const blocksHtml = training.set_blocks.map((block, idx) => `
        <div style="margin-top: 0.5rem; padding-left: 1rem; border-left: 3px solid #8b5cf6;">
            <strong>Bloque ${idx + 1}:</strong> ${block.weight}kg, ${block.edge}, ${block.hang_time}s × ${block.sets} sets (Descanso: ${block.rest_between})
        </div>
    `).join('');
    
    return `
        <div class="history-item fmax">
            <div class="history-header">
                <span class="history-type">🏋️ FMax - Suspensiones <span class="badge hangs">🤲 Hangs</span></span>
                <span class="history-date">${dateStr} ${timeStr}</span>
            </div>
            <div class="history-details">
                <div style="grid-column: 1/-1;">
                    ${blocksHtml}
                </div>
                ${training.notes ? `<div class="history-detail" style="grid-column: 1/-1;"><strong>Notas:</strong> <span>${training.notes}</span></div>` : ''}
            </div>
        </div>
    `;
}

// Export Data
function exportData() {
    if (trainings.length === 0) {
        alert('No hay datos para exportar');
        return;
    }
    
    // Create CSV with all training types
    let csv = '';
    
    // Resistance trainings
    const resistanceTrainings = trainings.filter(t => t.type === 'resistance');
    if (resistanceTrainings.length > 0) {
        csv += 'RESISTENCIA\n';
        csv += 'Fecha,Hora,Canto,Colgado (s),Descanso (s),Repeticiones,Descanso series,Sets,Claudicación,Set claudicación,Notas\n';
        resistanceTrainings.forEach(t => {
            csv += `"${t.date}","${t.time}","${t.edge}","${t.hang_time}","${t.rest_time}","${t.repetitions}","${t.rest_between}","${t.sets}","${t.claudication ? 'Sí' : 'No}","${t.claudication_set || ''}","${t.notes || ''}"\n`;
        });
        csv += '\n';
    }
    
    // FMax Pullups trainings
    const pullupsTrainings = trainings.filter(t => t.type === 'fmax_pullups');
    if (pullupsTrainings.length > 0) {
        csv += 'FMAX - DOMINADAS\n';
        csv += 'Fecha,Hora,Bloque,Lastre (kg),Canto,Dominadas,Descanso series,Sets,Notas\n';
        pullupsTrainings.forEach(t => {
            t.set_blocks.forEach((block, idx) => {
                csv += `"${t.date}","${t.time}","${idx + 1}","${block.weight}","${block.edge}","${block.reps}","${block.rest_between}","${block.sets}","${idx === 0 ? (t.notes || '') : ''}"\n`;
            });
        });
        csv += '\n';
    }
    
    // FMax Hangs trainings
    const hangsTrainings = trainings.filter(t => t.type === 'fmax_hangs');
    if (hangsTrainings.length > 0) {
        csv += 'FMAX - SUSPENSIONES\n';
        csv += 'Fecha,Hora,Bloque,Lastre (kg),Canto,Tiempo (s),Descanso series,Sets,Notas\n';
        hangsTrainings.forEach(t => {
            t.set_blocks.forEach((block, idx) => {
                csv += `"${t.date}","${t.time}","${idx + 1}","${block.weight}","${block.edge}","${block.hang_time}","${block.rest_between}","${block.sets}","${idx === 0 ? (t.notes || '') : ''}"\n`;
            });
        });
    }
    
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `hangtracker_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

// Import Data - Simplified
function importData(e) {
    alert('La importación de datos está disponible pero requiere un formato específico. Por seguridad, se recomienda usar la app para registrar entrenamientos nuevos.');
}

// Clear All Data
function clearAllData() {
    if (confirm('⚠️ ¿Estás seguro de que quieres eliminar TODOS los datos? Esta acción no se puede deshacer.')) {
        if (confirm('⚠️ CONFIRMACIÓN FINAL: Se borrarán todos los entrenamientos registrados.')) {
            trainings = [];
            localStorage.removeItem('hangtracker_trainings');
            renderHistory();
            alert('✅ Todos los datos han sido eliminados');
        }
    }
}
