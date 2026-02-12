// ============================================
// CONFIGURACIÓN - Actualiza estos valores
// ============================================

const CONFIG = {
    mode: 'github-api', // 'github-api' o 'manual'
    githubUser: 'JonathanMerchan',  // ⬅️ CAMBIA ESTO por tu usuario de GitHub
    githubRepo: 'JonathanMerchan.github.io',  // ⬅️ CAMBIA ESTO por el nombre de tu repositorio
    publicFolder: 'public'
};

// Lista manual de archivos (solo se usa si mode = 'manual')
const MANUAL_FILES = [
    {
        name: 'documento.pdf',
        type: 'pdf',
        size: 1250000,
        date: '2025-02-10',
        icon: '📄'
    }    
];

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Convierte bytes a formato legible (KB, MB, GB)
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Formatea la fecha a texto legible en español
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

/**
 * Obtiene el emoji del icono según el tipo de archivo
 */
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        // Documentos
        'pdf': '📄',
        'doc': '📝',
        'docx': '📝',
        
        // Hojas de cálculo
        'xls': '📊',
        'xlsx': '📈',
        'csv': '📊',
        
        // Presentaciones
        'ppt': '📊',
        'pptx': '📊',
        
        // Archivos comprimidos
        'zip': '📦',
        'rar': '📦',
        '7z': '📦',
        'tar': '📦',
        'gz': '📦',
        
        // Imágenes
        'jpg': '🖼️',
        'jpeg': '🖼️',
        'png': '🖼️',
        'gif': '🖼️',
        'webp': '🖼️',
        'svg': '🎨',
        
        // Video
        'mp4': '🎬',
        'avi': '🎬',
        'mov': '🎬',
        'wmv': '🎬',
        'mkv': '🎬',
        
        // Audio
        'mp3': '🎵',
        'wav': '🎵',
        'flac': '🎵',
        'ogg': '🎵',
        
        // Texto
        'txt': '📃',
        'md': '📃',
        'rtf': '📃',
        
        // Código
        'html': '🌐',
        'css': '🎨',
        'js': '⚡',
        'py': '🐍',
        'java': '☕',
        'cpp': '⚙️',
        'c': '⚙️',
        'php': '🐘',
        'rb': '💎',
        'go': '🔵',
        'rs': '🦀',
        
        // Otros
        'json': '📋',
        'xml': '📋',
        'sql': '🗄️',
    };
    
    return icons[ext] || '📄';
}

/**
 * Obtiene el tipo de archivo como string
 */
function getFileType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const types = {
        'pdf': 'PDF',
        'doc': 'DOC',
        'docx': 'DOCX',
        'xls': 'XLS',
        'xlsx': 'XLSX',
        'ppt': 'PPT',
        'pptx': 'PPTX',
        'zip': 'ZIP',
        'rar': 'RAR',
        'jpg': 'JPG',
        'jpeg': 'JPEG',
        'png': 'PNG',
        'gif': 'GIF',
        'mp4': 'MP4',
        'mp3': 'MP3',
        'txt': 'TXT',
        'md': 'Markdown',
    };
    
    return types[ext] || ext.toUpperCase();
}

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Carga archivos desde la API de GitHub
 */
async function loadFilesFromGitHub() {
    try {
        const url = `https://api.github.com/repos/${CONFIG.githubUser}/${CONFIG.githubRepo}/contents/${CONFIG.publicFolder}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            console.error('Error al cargar archivos de GitHub:', response.status);
            throw new Error('No se pudo cargar la lista de archivos desde GitHub');
        }
        
        const data = await response.json();
        
        // Filtrar solo archivos (no directorios ni archivos ocultos)
        const files = data
            .filter(item => item.type === 'file')
            .filter(item => !item.name.startsWith('.'))
            .map(file => ({
                name: file.name,
                type: getFileType(file.name),
                size: file.size,
                date: new Date().toISOString().split('T')[0], // GitHub API no proporciona fecha de modificación
                icon: getFileIcon(file.name),
                downloadUrl: file.download_url
            }));
        
        return files;
    } catch (error) {
        console.error('Error al cargar archivos:', error);
        return [];
    }
}

/**
 * Renderiza la lista de archivos en el HTML
 */
function renderFiles(files) {
    const container = document.getElementById('files-container');
    
    if (files.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>No hay archivos disponibles en este momento</p>
                <small style="color: var(--text-secondary); margin-top: 1rem; display: block;">
                    Sube archivos a la carpeta <strong>${CONFIG.publicFolder}/</strong> para verlos aquí
                </small>
            </div>
        `;
        return;
    }

    container.innerHTML = files.map(file => {
        const downloadUrl = file.downloadUrl || `${CONFIG.publicFolder}/${file.name}`;
        return `
            <div class="file-item">
                <div class="file-name">
                    <div class="file-icon">${file.icon}</div>
                    <div class="file-info">
                        <strong>${file.name}</strong>
                        <small>${file.type}</small>
                    </div>
                </div>
                <div class="file-size">${formatBytes(file.size)}</div>
                <div class="file-date">${formatDate(file.date)}</div>
                <a href="${downloadUrl}" 
                   download 
                   class="download-btn"
                   title="Descargar ${file.name}">
                    ⬇ Descargar
                </a>
            </div>
        `;
    }).join('');

    updateStats(files);
}

/**
 * Actualiza las estadísticas (total archivos, tamaño, última actualización)
 */
function updateStats(files) {
    const totalFiles = files.length;
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const latestDate = files.reduce((latest, file) => {
        const fileDate = new Date(file.date);
        return fileDate > latest ? fileDate : latest;
    }, new Date(0));

    document.getElementById('total-files').textContent = totalFiles;
    document.getElementById('total-size').textContent = formatBytes(totalSize);
    document.getElementById('last-update').textContent = formatDate(latestDate.toISOString().split('T')[0]);
}

/**
 * Inicializa la aplicación
 */
async function init() {
    console.log('🚀 Inicializando explorador de archivos...');
    console.log('Modo:', CONFIG.mode);
    console.log('Carpeta:', CONFIG.publicFolder);
    
    let files;
    
    if (CONFIG.mode === 'github-api') {
        console.log('Cargando archivos desde GitHub API...');
        files = await loadFilesFromGitHub();
        
        if (files.length === 0) {
            console.warn('⚠️ No se encontraron archivos o hubo un error al cargar');
            console.log('Verifica que la configuración sea correcta:');
            console.log('- githubUser:', CONFIG.githubUser);
            console.log('- githubRepo:', CONFIG.githubRepo);
            console.log('- publicFolder:', CONFIG.publicFolder);
        } else {
            console.log(`✅ ${files.length} archivo(s) cargado(s) exitosamente`);
        }
    } else {
        console.log('Usando lista manual de archivos...');
        files = MANUAL_FILES;
    }
    
    renderFiles(files);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Recargar archivos cada 5 minutos (opcional)
// setInterval(init, 5 * 60 * 1000);
