# Portafolio 2026

Portafolio personal hecho con HTML, CSS y JavaScript (sin dependencias).

## Cómo editar el contenido

Todo el texto y los proyectos están en **`js/data.js`**:

- `PERFIL`: nombre, rol, correo, ciudad, biografía, redes, foto y textos del inicio.
- `PROYECTOS`: cada proyecto (título, categoría, año, cliente, descripción, imágenes).
- `SERVICIOS`, `HERRAMIENTAS`, `TRAYECTORIA`: secciones de habilidades, cinta animada y experiencia.

Las imágenes se guardan en la carpeta `img/` y se referencian así: `"img/mi-proyecto.jpg"`.
Si un proyecto no tiene imagen, se muestra un degradado con los colores de `color`.

Colores y fuentes se cambian en `css/styles.css` (bloque `:root`).

## Estructura

```
index.html      Página principal
proyecto.html   Detalle de cada proyecto (proyecto.html?id=...)
css/styles.css  Estilos
js/data.js      Contenido editable
js/main.js      Lógica y animaciones
img/            Imágenes
```

## Publicar con GitHub Pages

En el repositorio: **Settings → Pages → Branch: `main` / root → Save**.
El sitio quedará en `https://maldanabv.github.io/Portafoliofinal2026/`.
