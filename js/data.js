/* =========================================================
   CONTENIDO DEL PORTAFOLIO — MJ DIGITAL STUDIO
   ---------------------------------------------------------
   Edita SOLO este archivo para cambiar tus textos, datos
   y proyectos. Todo lo demás se genera automáticamente.
   - Las imágenes van en la carpeta /img (ej: "img/proyecto1.jpg").
   - Si dejas "imagen" vacío se muestra un degradado de color.
   ========================================================= */

const PERFIL = {
  marca: "MJ Digital Studio",
  nombre: "María José",
  apellido: "Aldana Bravo",
  rol: "Estudiante de Creación Digital",
  ciudad: "Bogotá, Colombia", // ← confirmar
  zonaHoraria: "America/Bogota",
  email: "tucorreo@ejemplo.com", // ← PENDIENTE: correo de contacto público
  telefono: "", // opcional, déjalo vacío si no quieres mostrarlo
  logo: "MJ Digital Studio", // texto del logo (o usa logoImg con una imagen)
  logoImg: "",
  cv: "", // ej: "docs/cv-maria-jose-aldana.pdf"
  declaracion: [
    "Entre el arte",
    "y la ingeniería:",
    "sensibilidad estética",
    "con estrategia",
  ],
  saludo: "Hola, soy María José.",
  bio: [
    "Soy María José Aldana Bravo, estudiante de Creación Digital. Hago edición de video, 3D, programación, marketing y briefs creativos.",
    "Vengo de una formación entre el arte y la ingeniería, y por eso pienso cada proyecto con sensibilidad estética y con estrategia.",
  ],
  foto: "", // ej: "img/maria-jose.jpg"
  redes: [
    // ← PENDIENTE: pon tus enlaces reales (borra las que no uses)
    { nombre: "Instagram", url: "#" },
    { nombre: "LinkedIn", url: "#" },
    { nombre: "Behance", url: "#" },
    { nombre: "GitHub", url: "https://github.com/maldanabv" },
  ],
};

/* ---------- PROYECTOS ----------
   id:          identificador único sin espacios (se usa en la URL)
   destacado:   true = aparece en el slider de la primera pantalla (máx. 4)
   imagenHero:  (opcional) PNG sin fondo para el slider, ej: "img/reloj.png".
                Si no hay, se usa "imagen"; si tampoco, un degradado.
   color:       dos colores para el degradado si no hay imagen
   galeria:     lista de imágenes para la página del proyecto
   ← PENDIENTE: reemplazar con tus proyectos reales
*/
const PROYECTOS = [
  {
    id: "proyecto-video",
    destacado: true,
    imagenHero: "",
    titulo: "Proyecto Video",
    categoria: "Edición de video",
    anio: "2026",
    cliente: "Nombre del cliente",
    rol: "Edición, Color, Montaje",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#BF6079", "#731641"],
    galeria: [],
  },
  {
    id: "proyecto-3d",
    destacado: true,
    imagenHero: "",
    titulo: "Proyecto 3D",
    categoria: "Modelado 3D",
    anio: "2026",
    cliente: "Proyecto académico",
    rol: "Modelado, Texturizado, Render",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#585936", "#282A0B"],
    galeria: [],
  },
  {
    id: "proyecto-codigo",
    destacado: true,
    imagenHero: "",
    titulo: "Proyecto Código",
    categoria: "Programación",
    anio: "2025",
    cliente: "Proyecto personal",
    rol: "Desarrollo, Diseño de interacción",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#731641", "#141804"],
    galeria: [],
  },
  {
    id: "proyecto-marketing",
    titulo: "Proyecto Marketing",
    categoria: "Marketing digital",
    anio: "2025",
    cliente: "Nombre del cliente",
    rol: "Estrategia, Contenido",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#BF6079", "#585936"],
    galeria: [],
  },
  {
    id: "proyecto-brief",
    titulo: "Proyecto Brief",
    categoria: "Brief creativo",
    anio: "2025",
    cliente: "Nombre del cliente",
    rol: "Concepto, Dirección creativa",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#585936", "#141804"],
    galeria: [],
  },
];

/* ---------- SERVICIOS / HABILIDADES ---------- */
const SERVICIOS = [
  { titulo: "Edición de video", texto: "Montaje, ritmo y color para contar historias que se sienten y se recuerdan." },
  { titulo: "3D", texto: "Modelado, texturizado y render para dar volumen y presencia a las ideas." },
  { titulo: "Programación", texto: "Experiencias web e interactivas donde el código también es una herramienta creativa." },
  { titulo: "Marketing", texto: "Estrategia y contenido pensados para conectar con la audiencia correcta." },
  { titulo: "Briefs creativos", texto: "Ideas claras desde el inicio: objetivos, concepto y dirección para cada proyecto." },
];

/* ---------- HERRAMIENTAS (cinta animada) ----------
   ← PENDIENTE: confirma cuáles usas */
const HERRAMIENTAS = [
  "Premiere Pro", "After Effects", "DaVinci Resolve", "Blender",
  "Figma", "Photoshop", "Illustrator", "HTML", "CSS", "JavaScript",
];

/* ---------- EXPERIENCIA / EDUCACIÓN ----------
   ← PENDIENTE: confirma años y agrega experiencia, cursos o premios */
const TRAYECTORIA = [
  { periodo: "Actualidad", titulo: "Creación Digital", lugar: "Universidad El Bosque" },
  { periodo: "Año", titulo: "Formación en arte e ingeniería", lugar: "Institución" },
  { periodo: "Año", titulo: "Experiencia, práctica o proyecto", lugar: "Empresa / Organización" },
];
