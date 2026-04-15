# ⚡ Inicio Rápido

## Tu Proyecto está listo! 🎉

Aquí tienes un resumen de lo que hemos creado:

### 📊 Estadísticas del Proyecto
- ✅ **18 Páginas HTML** (1 inicio + 1 acerca de mí + 16 semanas)
- ✅ **1 Hoja de estilos CSS** (personalizable)
- ✅ **Logo SVG** (editable)
- ✅ **Navegación fluida** entre todas las páginas
- ✅ **Diseño responsivo** (funciona en móviles)
- ✅ **Git inicializado** con 2 commits

## 🎯 Próximos Pasos

### 1. Editar tu Información Personal
Abre estos archivos y reemplaza `[Tu Nombre]` y agrega tus detalles:
- **about.html** - Información sobre ti
- **index.html** - Texto de bienvenida (opcional)

### 2. Cambiar el Logo
- Opción A: Reemplaza `assets/logo.svg` con tu logo
- Opción B: Si tienes una imagen PNG:
  1. Guárdala como `assets/logo.png`
  2. En los HTML, cambia `logo.svg` por `logo.png`

### 3. Llenar Contenido de Semanas
Para cada semana:
1. Abre `semanas/semanaN.html`
2. Completa:
   - Objetivos específicos
   - Lo que aprendiste
   - Proyectos realizados
   - Desafíos superados
   - Recursos utilizados
   - Reflexiones personales

Ejemplo para Semana 1:
```html
<li>Objetivo 1: Entender HTML básico</li>
<li>Objetivo 2: Crear mi primera página web</li>
```

### 4. Conectar con GitHub

Lee el archivo `GITHUB_SETUP.md` para instrucciones detalladas.

**Resumen rápido:**
1. Crea un repositorio en https://github.com/new
2. Llámalo: `proyecto-16-semanas`
3. Ejecuta en PowerShell:
```bash
cd c:\Proyecto_16_Semanas\Proyecto_final
git remote add origin https://github.com/josue12335/proyecto-16-semanas.git
git branch -M main
git push -u origin main
```

### 5. Ver tu Sitio Localmente

**Opción Fácil:** Haz doble clic en `index.html`

**Opción Mejor (Live Server):**
1. En VS Code, instala "Live Server"
2. Haz clic derecho en `index.html`  
3. Selecciona "Open with Live Server"

## 📝 Estructura de Carpetas Explicada

```
proyecto_final/
│
├── 📄 index.html            ← Página de inicio
├── 📄 about.html            ← Acerca de mí
├── 📄 semanas.html          ← Índice de todas las semanas
├── 📄 README.md             ← Documentación del proyecto
├── 📄 GITHUB_SETUP.md       ← Guía para GitHub
├── 📄 START_HERE.md         ← Este archivo
│
├── 📁 css/
│   └── style.css            ← Todos los estilos
│
├── 📁 semanas/
│   ├── semana1.html
│   ├── semana2.html
│   ├── ... (3-15)
│   └── semana16.html        ← 16 semanas totales
│
└── 📁 assets/
    └── logo.svg             ← Tu logo personalizable
```

## 🎨 Personalización Rápida

### Cambiar Colores
En `css/style.css`, busca:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
- `#667eea` = Azul púrpura (cambiar este)
- `#764ba2` = Púrpura oscuro (cambiar este)

Colores sugeridos:
- 🔵 Azul y Azul Oscuro: `#3498db` y `#2c3e50`
- 🟢 Verde y Verde Oscuro: `#27ae60` y `#1e8449`
- 🟠 Naranja y Rojo: `#e74c3c` y `#c0392b`
- 🟣 Rosa y Púrpura: `#e84393` y `#8e44ad`

### Cambiar Tipografía
```css
font-family: 'Arial', sans-serif;  /* Cambiar por otra fuente */
```

Opciones populares:
- 'Comic Sans MS', cursive
- 'Georgia', serif
- 'Courier New', monospace
- 'Trebuchet MS', sans-serif

## 📱 Responsive Design

El sitio se ve bien en:
- 📱 Móviles (320px - 480px)
- 📱 Tablets (481px - 768px)  
- 💻 Laptops (769px+)

¡Pruébalo redimensionando tu navegador!

## ✏️ Editar y Hacer Push

Flujo típico cada semana:
```bash
# 1. Haz cambios en los archivos HTML

# 2. Abre PowerShell en la carpeta del proyecto
cd c:\Proyecto_16_Semanas\Proyecto_final

# 3. Verifica cambios
git status

# 4. Agrega cambios
git add .

# 5. Haz commit
git commit -m "Completar semana X con contenido actualizado"

# 6. Sube a GitHub
git push
```

## 🐛 Errores Comunes y Soluciones

### "La página no carga"
✅ Verifica que los archivos HTML existan en la ruta correcta
✅ Prueba con Live Server en VS Code
✅ Abre la consola del navegador (F12) para ver errores

### "Los estilos no se aplican"
✅ Limpia el caché del navegador (Ctrl+Shift+R)
✅ Verifica que `css/style.css` exista
✅ Verifica las rutas en los `<link rel="stylesheet">`

### "Los enlaces no funcionan"
✅ Verifica que los archivos HTML existan
✅ Comprueba que las rutas relativamente sean correctas
✅ Usa `/semanas/semana2.html` no `semanas\semana2.html`

## 🚀 Lanzar a Producción

### Opción 1: GitHub Pages (GRATIS)
1. Crea repositorio público
2. En Settings → Pages → Selecciona rama main
3. Tu sitio estará en: `https://josue12335.github.io/proyecto-16-semanas`

### Opción 2: Netlify (GRATIS)
1. Ve a https://netlify.com
2. Arrastra tu carpeta al área de drop
3. ¡Listo! Tu sitio está en línea

### Opción 3: Vercel (GRATIS)
1. Ve a https://vercel.com
2. Importa tu repositorio de GitHub
3. Se despliega automáticamente

## 📚 Recursos Útiles

- [HTML Referencia MDN](https://developer.mozilla.org/es/docs/Web/HTML)
- [CSS Referencia MDN](https://developer.mozilla.org/es/docs/Web/CSS)
- [GitHub Guides](https://guides.github.com/es)
- [W3Schools Tutorials](https://w3schools.com)

## 💪 ¡Estás Listo!

Tu proyecto de 16 semanas está completamente estructurado y listo para ser llenado con tu contenido.

**Ahora:**
1. ✏️ Edita `about.html` con tu información
2. 📸 Reemplaza el logo
3. 📝 Comienza a llenar las semanas
4. 🚀 Sube a GitHub
5. 🌍 Comparte con el mundo

---

**¡Mucho éxito con tu proyecto! 🎓**
