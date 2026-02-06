# 💪 HangTracker

Progressive Web App para seguimiento de entrenamientos en multipresa (hangboard).

## 🎯 Características

### Tipos de Entrenamiento

**⏱️ Resistencia:**
- Selección de canto (Cazo, 40mm, 30mm, 22mm, 15mm)
- Configuración de tiempos: colgado y descanso
- Repeticiones fijas: 30
- Control de series y descansos entre series
- Marcador de claudicación con identificación del set

**🏋️ FMax - Fuerza Máxima:**

*Dominadas:*
- Control de lastre (+Kg)
- Múltiples bloques con diferentes cantos y lastres
- Seguimiento de repeticiones y series
- Descansos configurables

*Suspensiones:*
- Control de lastre (+Kg)
- Múltiples bloques con diferentes cantos y lastres
- Tiempo de suspensión por bloque
- Descansos configurables

### Funcionalidades Generales

✅ **Almacenamiento local** - Datos privados en tu dispositivo
✅ **Múltiples bloques** - Añade sets con diferentes cantos/lastres en FMax
✅ **Exportación CSV** - Compatible con Excel
✅ **Histórico completo** - Visualiza todos tus entrenamientos
✅ **Instalable** - Funciona como app nativa en móvil
✅ **Offline** - No requiere conexión a internet
✅ **Visual claro** - Identifica entrenamientos por colores

## 🚀 Instalación

### GitHub Pages

1. Crea un repositorio en GitHub
2. Sube todos los archivos de esta carpeta
3. Ve a Settings → Pages
4. Selecciona rama `main` como source
5. Tu app estará en: `https://tu-usuario.github.io/nombre-repo`

### Instalar en Android

1. Abre la URL en Chrome
2. Menú (⋮) → "Añadir a pantalla de inicio"
3. Confirma la instalación
4. ¡Listo!

## 📖 Cómo usar

### 1. Selecciona tipo de entrenamiento

Al abrir la app, elige entre:
- **FMax** (Fuerza Máxima)
- **Resistencia**

### 2. Registra tu entrenamiento

**Para Resistencia:**
1. Selecciona el canto
2. Configura tiempos de colgado y descanso
3. Indica descanso entre series (formato min:seg)
4. Número de sets realizados
5. Marca claudicación si aplica

**Para FMax - Dominadas:**
1. Configura primer bloque: lastre, canto, reps, descanso, sets
2. Añade más bloques si cambiaste canto/lastre
3. Añade notas si deseas
4. Guarda

**Para FMax - Suspensiones:**
1. Configura primer bloque: lastre, canto, tiempo, descanso, sets
2. Añade más bloques si cambiaste canto/lastre
3. Añade notas si deseas
4. Guarda

### 3. Consulta tu histórico

- Botón flotante 📊 en la esquina inferior derecha
- Visualiza todos los entrenamientos
- Exporta datos a CSV
- Borra histórico si necesitas

## 📊 Estructura de Datos

### Resistencia
- Fecha y hora (automático)
- Canto
- Tiempo colgado (segundos)
- Tiempo descanso (segundos)
- Repeticiones (30 fijo)
- Descanso entre series (min:seg)
- Número de sets
- Claudicación (Sí/No)
- Set de claudicación (si aplica)
- Notas

### FMax - Dominadas
- Fecha y hora (automático)
- Bloques de sets (ilimitados):
  - Lastre (+Kg)
  - Canto
  - Número de dominadas
  - Descanso entre series
  - Número de sets
- Notas

### FMax - Suspensiones
- Fecha y hora (automático)
- Bloques de sets (ilimitados):
  - Lastre (+Kg)
  - Canto
  - Tiempo de suspensión (segundos)
  - Descanso entre series
  - Número de sets
- Notas

## 🎨 Identificación Visual

- **Resistencia**: Borde azul
- **FMax**: Borde naranja/amarillo
- **Dominadas**: Badge verde 💪
- **Suspensiones**: Badge morado 🤲
- **Claudicación**: Badge rojo ⚠️

## 💾 Exportación CSV

El CSV exportado contiene tres secciones:

1. **RESISTENCIA**
   - Una fila por entrenamiento
   - Todas las variables del entrenamiento

2. **FMAX - DOMINADAS**
   - Una fila por bloque de sets
   - Agrupadas por fecha/hora

3. **FMAX - SUSPENSIONES**
   - Una fila por bloque de sets
   - Agrupadas por fecha/hora

## 🗂️ Archivos del Proyecto

```
hangtracker/
├── index.html          # Página principal
├── app.js             # Lógica de la aplicación
├── manifest.json      # Configuración PWA
├── sw.js             # Service Worker (offline)
├── icon-192.png      # Icono pequeño
├── icon-512.png      # Icono grande
└── README.md         # Esta documentación
```

## 🔧 Personalización

### Cambiar colores

Edita las variables CSS en `index.html`:

```css
:root {
    --primary: #1e3a8a;      /* Color principal */
    --secondary: #3b82f6;    /* Color secundario */
    --danger: #dc2626;       /* Color peligro */
}
```

### Modificar cantos

Edita los selectores en `index.html` donde aparece:
```html
<option value="Cazo">Cazo</option>
<option value="40mm">40 mm</option>
<!-- Añade más opciones aquí -->
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (Android/Desktop)
- ✅ Safari (iOS/macOS)
- ✅ Firefox (Android/Desktop)
- ✅ Samsung Internet

## ⚠️ Importante

- Los datos se guardan en tu dispositivo (localStorage)
- No se envían a ningún servidor
- Exporta regularmente para hacer backup
- Si borras datos del navegador, perderás el histórico

## 🐛 Solución de Problemas

**La app no se instala:**
- Usa HTTPS (GitHub Pages lo proporciona)
- Verifica que manifest.json sea accesible

**Los datos no se guardan:**
- No uses modo incógnito
- Permite localStorage en el navegador

**No veo el botón flotante:**
- Verifica que JavaScript esté habilitado
- Recarga la página

## 📄 Licencia

Proyecto de código abierto. Libre para usar y modificar.

---

¡Buenos entrenamientos! 💪🧗
