# 🚀 Portafolio Personal con Explorador de Archivos

Un portafolio moderno y elegante con un sistema integrado de explorador de archivos **AUTOMÁTICO**, perfecto para GitHub Pages.

## 📁 Estructura Modular del Proyecto

```
tu-usuario.github.io/
│
├── index.html                      # Página principal del portafolio
├── ftp.html                        # Explorador de archivos (HTML limpio)
│
├── assets/                         # Recursos del proyecto
│   ├── css/
│   │   └── ftp-styles.css         # 🎨 Estilos del explorador
│   └── js/
│       └── ftp-script.js          # ⚡ Lógica del explorador
│
├── public/                         # 📦 Tus archivos descargables
│   ├── documento.pdf
│   ├── imagen.jpg
│   └── ...
│
├── .github/                        # GitHub Actions (opcional)
│   └── workflows/
│       └── generate-files.yml
│
└── README.md                       # Este archivo
```

## ✨ Ventajas de la Estructura Modular

### 🎯 Fácil Mantenimiento
- **HTML limpio**: Solo la estructura, sin código CSS/JS mezclado
- **CSS separado**: Cambia colores y estilos en un solo archivo
- **JS separado**: Toda la lógica en un lugar

### 🔧 Configuración Simple
Todo se configura en **UN SOLO LUGAR**: `assets/js/ftp-script.js`

```javascript
const CONFIG = {
    mode: 'github-api',
    githubUser: 'TU-USUARIO',        // ⬅️ Cambia esto
    githubRepo: 'TU-USUARIO.github.io',  // ⬅️ Cambia esto
    publicFolder: 'public'
};
```

### 🎨 Personalización Rápida
Cambia colores editando solo `assets/css/ftp-styles.css`:

```css
:root {
    --accent-primary: #00d9ff;     /* Color principal */
    --accent-secondary: #ff006e;   /* Color secundario */
}
```

## 🚀 Instalación Rápida

### 1. Crear repositorio en GitHub
Debe llamarse exactamente: `tu-usuario.github.io`

### 2. Subir archivos

**Con Git (recomendado):**
```bash
git clone https://github.com/tu-usuario/tu-usuario.github.io.git
cd tu-usuario.github.io

# Copia todos los archivos descargados aquí
# Asegúrate de mantener la estructura de carpetas

git add .
git commit -m "Initial commit: Portfolio + File Explorer"
git push origin main
```

### 3. Configurar el explorador de archivos

Edita `assets/js/ftp-script.js` líneas 6-11:

```javascript
const CONFIG = {
    mode: 'github-api',  // Deja esto así para carga automática
    githubUser: 'juanperez',  // ⬅️ TU usuario de GitHub
    githubRepo: 'juanperez.github.io',  // ⬅️ TU repositorio
    publicFolder: 'public'
};
```

### 4. Activar GitHub Pages

1. Settings → Pages
2. Source: rama `main`
3. Save
4. ¡Listo! → `https://tu-usuario.github.io`

## 📝 Workflow Diario

### Agregar un nuevo archivo:

```bash
# 1. Copia el archivo a public/
cp mi-documento.pdf public/

# 2. Sube a GitHub
git add public/mi-documento.pdf
git commit -m "Add: mi-documento.pdf"
git push

# 3. ¡Aparece automáticamente en tu web!
# No necesitas editar ningún código
```

## 🎨 Personalización

### Cambiar Colores

Edita `assets/css/ftp-styles.css`:

```css
:root {
    /* Colores principales */
    --bg-dark: #0a0e27;           /* Fondo oscuro */
    --accent-primary: #00d9ff;     /* Cyan (cambiar por tu color) */
    --accent-secondary: #ff006e;   /* Rosa (cambiar por tu color) */
    --text-primary: #e0e6ff;       /* Texto principal */
}
```

**Ejemplos de paletas:**
- **Morado/Oro**: `#8b5cf6` y `#f59e0b`
- **Verde/Azul**: `#10b981` y `#3b82f6`
- **Rojo/Naranja**: `#ef4444` y `#f97316`

### Agregar Nuevos Tipos de Archivo

Edita `assets/js/ftp-script.js`, función `getFileIcon()`:

```javascript
const icons = {
    'pdf': '📄',
    'zip': '📦',
    'py': '🐍',    // ⬅️ Agrega nuevos aquí
    'sketch': '🎨',
    // ...
};
```

### Cambiar Modo (Manual vs Automático)

En `assets/js/ftp-script.js`:

```javascript
const CONFIG = {
    mode: 'manual',  // Cambiar a 'manual' si quieres control total
    // ...
};

// Si usas modo manual, edita esta lista:
const MANUAL_FILES = [
    {
        name: 'mi-archivo.pdf',
        type: 'pdf',
        size: 1500000,
        date: '2025-02-12',
        icon: '📄'
    }
];
```

## 🔍 Archivos Explicados

### `ftp.html`
- HTML puro y limpio
- Solo estructura, sin estilos ni scripts inline
- Fácil de leer y modificar

### `assets/css/ftp-styles.css`
- Todos los estilos del explorador
- Variables CSS para personalización rápida
- Responsive design incluido

### `assets/js/ftp-script.js`
- Lógica de carga de archivos
- Integración con GitHub API
- Formateo de fechas y tamaños
- Totalmente comentado en español

## 🎯 Dos Modos de Operación

### Modo GitHub API (Recomendado)
```javascript
mode: 'github-api'
```
- ✅ Carga archivos automáticamente
- ✅ Cero mantenimiento
- ✅ Solo sube archivos a `public/`

### Modo Manual
```javascript
mode: 'manual'
```
- ✅ Control total
- ✅ Puedes personalizar cada campo
- ⚠️ Debes actualizar `MANUAL_FILES` manualmente

## 💡 Tips y Trucos

### Ver logs en consola
Abre las herramientas de desarrollo (F12) y verás:
- Qué modo está usando
- Cuántos archivos cargó
- Errores si algo falla

### Recargar archivos automáticamente
Descomenta en `ftp-script.js` línea 281:
```javascript
// Recargar cada 5 minutos
setInterval(init, 5 * 60 * 1000);
```

### Ocultar archivos específicos
En `ftp-script.js`, función `loadFilesFromGitHub()`:
```javascript
.filter(item => !item.name.startsWith('.'))  // Oculta archivos ocultos
.filter(file => file.name !== 'ejemplo.txt') // Oculta archivo específico
```

## 🐛 Solución de Problemas

### Los archivos no cargan
1. Abre consola (F12) y busca errores
2. Verifica la configuración en `ftp-script.js`:
   - ¿`githubUser` es correcto?
   - ¿`githubRepo` es correcto?
   - ¿La carpeta `public/` existe?

### Los estilos no se aplican
1. Verifica que `assets/css/ftp-styles.css` existe
2. Revisa la ruta en `ftp.html` línea 11
3. Limpia caché (Ctrl+Shift+R)

### El script no funciona
1. Verifica que `assets/js/ftp-script.js` existe
2. Revisa la ruta en `ftp.html` línea 68
3. Abre consola para ver errores

## 📚 Recursos

- [GitHub Pages](https://docs.github.com/es/pages)
- [GitHub API](https://docs.github.com/es/rest)
- [CSS Variables](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)

## 🎉 Ventajas de Esta Estructura

✅ **Código organizado** - HTML, CSS y JS separados  
✅ **Fácil de mantener** - Cada archivo tiene un propósito claro  
✅ **Rápido de personalizar** - Cambia colores en un solo lugar  
✅ **Profesional** - Sigue mejores prácticas de desarrollo web  
✅ **Escalable** - Fácil agregar nuevas funcionalidades  

---

**¡Disfruta tu portafolio modular! 🚀**

Hecho con ❤️ y código limpio
