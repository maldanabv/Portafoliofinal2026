/* =========================================================
   CONTENIDO DEL PORTAFOLIO
   ---------------------------------------------------------
   Edita SOLO este archivo para cambiar tus textos, datos
   y proyectos. Todo lo demás se genera automáticamente.
   - Las imágenes van en la carpeta /img (ej: "img/proyecto1.jpg").
   - Si dejas "imagen" vacío se muestra un degradado de color.
   ========================================================= */

const PERFIL = {
  nombre: "Tu Nombre",
  apellido: "Apellido",
  rol: "Diseñadora · Desarrolladora creativa",
  ciudad: "Bogotá, Colombia",
  zonaHoraria: "America/Bogota",
  email: "hola@tucorreo.com",
  telefono: "+57 300 000 0000",
  disponibilidad: "Disponible para proyectos 2026",
  logo: "TN.", // texto del logo (o deja vacío y usa logoImg)
  logoImg: "",
  cv: "", // ej: "docs/cv.pdf"
  heroTitulo: ["Diseño", "experiencias", "que se sienten"],
  heroIntro:
    "Escribe aquí una frase corta que te presente: qué haces, para quién y qué te hace diferente.",
  declaracion: [
    "Una mirada creativa",
    "que combina estrategia,",
    "diseño y tecnología",
    "en cada proyecto",
  ],
  bio: [
    "Primer párrafo sobre ti: tu formación, dónde estudias o estudiaste y en qué te especializas.",
    "Segundo párrafo: tu forma de trabajar, tus intereses y qué buscas en tus próximos proyectos.",
  ],
  foto: "", // ej: "img/yo.jpg"
  redes: [
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
*/
const PROYECTOS = [
  {
    id: "proyecto-uno",
    destacado: true,
    imagenHero: "",
    titulo: "Proyecto Uno",
    categoria: "Branding",
    anio: "2026",
    cliente: "Nombre del cliente",
    rol: "Dirección de arte, Identidad visual",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#ff5f3c", "#7a1cff"],
    galeria: [],
  },
  {
    id: "proyecto-dos",
    destacado: true,
    imagenHero: "",
    titulo: "Proyecto Dos",
    categoria: "Diseño Web",
    anio: "2026",
    cliente: "Nombre del cliente",
    rol: "UX/UI, Desarrollo front-end",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#00c2a8", "#003b73"],
    galeria: [],
  },
  {
    id: "proyecto-tres",
    destacado: true,
    imagenHero: "",
    titulo: "Proyecto Tres",
    categoria: "Fotografía",
    anio: "2025",
    cliente: "Proyecto personal",
    rol: "Fotografía, Edición",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#f7c948", "#e4572e"],
    galeria: [],
  },
  {
    id: "proyecto-cuatro",
    titulo: "Proyecto Cuatro",
    categoria: "Motion",
    anio: "2025",
    cliente: "Nombre del cliente",
    rol: "Animación, Video",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#c3f73a", "#1b998b"],
    galeria: [],
  },
  {
    id: "proyecto-cinco",
    titulo: "Proyecto Cinco",
    categoria: "Ilustración",
    anio: "2024",
    cliente: "Nombre del cliente",
    rol: "Ilustración, Editorial",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#ff8fab", "#5e2bff"],
    galeria: [],
  },
  {
    id: "proyecto-seis",
    titulo: "Proyecto Seis",
    categoria: "UX/UI",
    anio: "2024",
    cliente: "Nombre del cliente",
    rol: "Investigación, Prototipado",
    resumen: "Descripción corta del proyecto en una línea.",
    descripcion:
      "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    cita: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    enlace: "",
    imagen: "",
    color: ["#4cc9f0", "#3a0ca3"],
    galeria: [],
  },
];

/* ---------- SERVICIOS / HABILIDADES ---------- */
const SERVICIOS = [
  { titulo: "Dirección de arte", texto: "Describe brevemente este servicio o habilidad." },
  { titulo: "Identidad visual", texto: "Describe brevemente este servicio o habilidad." },
  { titulo: "Diseño UX/UI", texto: "Describe brevemente este servicio o habilidad." },
  { titulo: "Desarrollo web", texto: "Describe brevemente este servicio o habilidad." },
  { titulo: "Motion & video", texto: "Describe brevemente este servicio o habilidad." },
];

/* ---------- HERRAMIENTAS (cinta animada) ---------- */
const HERRAMIENTAS = [
  "Figma", "Illustrator", "Photoshop", "After Effects", "Blender",
  "HTML", "CSS", "JavaScript", "Premiere", "InDesign",
];

/* ---------- EXPERIENCIA / EDUCACIÓN ---------- */
const TRAYECTORIA = [
  { periodo: "2026 —", titulo: "Cargo o rol actual", lugar: "Empresa / Universidad" },
  { periodo: "2024 — 2025", titulo: "Cargo o práctica", lugar: "Empresa" },
  { periodo: "2022 — 2026", titulo: "Carrera / Pregrado", lugar: "Universidad El Bosque" },
  { periodo: "2023", titulo: "Reconocimiento o premio", lugar: "Organización" },
];
