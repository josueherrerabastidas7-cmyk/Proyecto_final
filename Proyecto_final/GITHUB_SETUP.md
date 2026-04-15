# 🚀 Configuración de GitHub - Guía Paso a Paso

## Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `proyecto-16-semanas`
3. Descripción: "Proyecto web de 16 semanas con portafolio de aprendizaje"
4. Selecciona: "Public" (para poder compartir)
5. **NO** inicialices con README (ya lo tenemos)
6. Haz clic en "Create repository"

## Paso 2: Conectar tu Repositorio Local con GitHub

Después de crear el repositorio, GitHub te mostrará comandos. Usa tu usuario de GitHub y copia estos comandos en PowerShell:

```bash
git remote add origin https://github.com/josue12335/proyecto-16-semanas.git
git branch -M main
git push -u origin main
```

### Ejemplo Completo:
```bash
cd c:\Proyecto_16_Semanas\Proyecto_final
git remote add origin https://github.com/josue12335/proyecto-16-semanas.git
git branch -M main
git push -u origin main
```

## Paso 3: Configurar GitHub Pages (Opcional pero Recomendado)

Esto te permitirá ver tu sitio web en línea.

1. Ve a tu repositorio en GitHub
2. Haz clic en ⚙️ **Settings** (Configuración)
3. En el menú izquierdo, busca **Pages**
4. Bajo "Build and deployment":
   - Selecciona **Deploy from a branch**
   - Rama: **main**
   - Carpeta: **/ (root)**
5. Haz clic en **Save**
6. Espera 1-2 minutos

Tu sitio estará en: `https://josue12335.github.io/proyecto-16-semanas/`

## Paso 4: Actualizar cambios en GitHub

Cada vez que hagas cambios:

```bash
cd c:\Proyecto_16_Semanas\Proyecto_final

# Ver archivos modificados
git status

# Agregar cambios
git add .

# Hacer commit con mensaje
git commit -m "Descripción de tus cambios"

# Subir a GitHub
git push
```

## Paso 5: Abrir tu Proyecto Localmente

### Opción 1: Desde VS Code
```bash
code c:\Proyecto_16_Semanas\Proyecto_final
```

### Opción 2: Desde el Navegador
En Windows, haz clic derecho en `index.html` y selecciona "Open with" → Navegador

### Opción 3: Live Server (Recomendado)
1. En VS Code, instala la extensión "Live Server"
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"
4. Se abrirá en http://localhost:5500

## Comandos Útiles

```bash
# Ver historial de commits
git log

# Ver cambios no guardados
git diff

# Deshacer cambios locales
git checkout -- nombrearchivo

# Ver configuración de remoto
git remote -v

# Cambiar URL de remoto
git remote set-url origin https://github.com/josue12335/proyecto-16-semanas.git
```

## Troubleshooting

### Error: "Permission denied (publickey)"
Necesitas configurar una clave SSH o usar Personal Access Token.

Opción rápida: usar HTTPS con token
```bash
git remote set-url origin https://tu_token@github.com/josue12335/proyecto-16-semanas.git
```

### Error: "fatal: 'origin' already exists"
Ya tienes un remoto configurado. Usa:
```bash
git remote remove origin
git remote add origin https://github.com/josue12335/proyecto-16-semanas.git
```

## 💡 Consejos

✅ Haz commits frecuentes (al menos semanal)  
✅ Usa mensajes descriptivos en los commits  
✅ Actualiza el contenido de cada semana conforme aprendas  
✅ Usa GitHub Pages para compartir tu portafolio  

## 📚 Recursos Útiles

- [Documentación de Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [GitHub Pages Documentation](https://pages.github.com/)

---

¡Tu proyecto está listo para ser compartido con el mundo! 🌍
