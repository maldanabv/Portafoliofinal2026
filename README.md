# MJ Digital Studio

Portafolio de María José Aldana Bravo, hecho con HTML, CSS y JavaScript (sin dependencias).

## Cómo editar el contenido

Todo el texto y los proyectos están en **`js/data.js`**:

- `PERFIL`: nombre, correo, ciudad, biografía, redes, foto y frase principal.
- `PROYECTOS`: cada proyecto (título, categoría, año, cliente, descripción, imágenes).
- `SERVICIOS`, `HERRAMIENTAS`, `TRAYECTORIA`: habilidades, cinta animada y experiencia.

### Español / inglés

El botón **ENG / ESP** junto al modo oscuro traduce toda la página. En `data.js`
los textos traducibles se escriben así:

```js
titulo: { es: "Proyecto Video", en: "Video Project" }
```

Si un texto es igual en los dos idiomas, se escribe normal: `anio: "2026"`.
Los textos de la interfaz (menú, botones, etiquetas) están en **`js/i18n.js`**.

### Imágenes

Se guardan en `img/` y se referencian así: `"img/mi-proyecto.jpg"`.
Si un proyecto no tiene imagen, se muestra un degradado con los colores de `color`.

Colores y fuentes se cambian en `css/styles.css` (bloque `:root`).

## Estructura

```
index.html      Página principal
proyecto.html   Detalle de cada proyecto (proyecto.html?id=...)
css/styles.css  Estilos
js/data.js      Contenido editable (ES / EN)
js/i18n.js      Textos de la interfaz (ES / EN)
js/main.js      Lógica y animaciones
img/            Imágenes
```

## Publicar con GitHub Pages

En el repositorio: **Settings → Pages → Branch: `main` / root → Save**.
El sitio quedará en `https://maldanabv.github.io/Portafoliofinal2026/`.
