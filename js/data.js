/* =========================================================
   CONTENIDO DEL PORTAFOLIO — MJ DIGITAL STUDIO
   ---------------------------------------------------------
   Edita SOLO este archivo para cambiar tus textos, datos
   y proyectos. Todo lo demás se genera automáticamente.

   IDIOMAS: los textos que cambian con el botón ENG/ESP se
   escriben así:  { es: "Texto en español", en: "English text" }
   Si un texto es igual en ambos idiomas, escríbelo normal: "Texto".

   - Las imágenes van en la carpeta /img (ej: "img/proyecto1.jpg").
   - Si dejas "imagen" vacío se muestra un degradado de color.
   ========================================================= */

const PERFIL = {
  marca: "MJ Digital Studio",
  nombre: "María José",
  apellido: "Aldana Bravo",
  rol: { es: "Estudiante de Creación Digital", en: "Digital Creation student" },
  ciudad: "Bogotá, Colombia",
  zonaHoraria: "America/Bogota",
  email: "mjdigitalstudioco@gmail.com",
  telefono: "", // opcional, déjalo vacío si no quieres mostrarlo
  logoImg: "", // vacío = usa el logo MJ hecho en código (se adapta al modo oscuro)
  cv: "", // ej: "docs/cv-maria-jose-aldana.pdf"
  declaracion: {
    es: ["Entre el arte", "y la ingeniería:", "sensibilidad estética", "con estrategia"],
    en: ["Between art", "and engineering:", "aesthetic sensitivity", "with strategy"],
  },
  saludo: { es: "Hola, soy María José.", en: "Hi, I'm María José." },
  bio: {
    es: [
      "Soy María José Aldana Bravo, estudiante de Creación Digital. Hago edición de video, 3D, programación, marketing y briefs creativos.",
      "Vengo de una formación entre el arte y la ingeniería, y por eso pienso cada proyecto con sensibilidad estética y con estrategia.",
    ],
    en: [
      "I'm María José Aldana Bravo, a Digital Creation student. I work in video editing, 3D, programming, marketing and creative briefs.",
      "My background bridges art and engineering, so I approach every project with both aesthetic sensitivity and strategy.",
    ],
  },
  foto: "img/maria-jose.jpg",
  redes: [
    { nombre: "Instagram", url: "https://www.instagram.com/mjdigitalstudio0/" },
    { nombre: "LinkedIn", url: "https://www.linkedin.com/in/maria-jose-aldana-bravo-02a86033b/" },
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
const EJEMPLO = {
  resumen: { es: "Descripción corta del proyecto en una línea.", en: "Short one-line project description." },
  descripcion: {
    es: "Describe el reto, el proceso y el resultado del proyecto. Explica qué problema resolviste y cómo lo hiciste.",
    en: "Describe the challenge, the process and the outcome. Explain what problem you solved and how.",
  },
  cita: {
    es: "Una frase destacada sobre el proyecto o el aprendizaje principal.",
    en: "A highlight quote about the project or the key takeaway.",
  },
  enlace: "",
  imagen: "",
  galeria: [],
};

const PROYECTOS = [
  {
    ...EJEMPLO,
    id: "proyecto-video",
    destacado: true,
    imagenHero: "",
    titulo: { es: "Proyecto Video", en: "Video Project" },
    categoria: { es: "Edición de video", en: "Video editing" },
    anio: "2026",
    cliente: { es: "Nombre del cliente", en: "Client name" },
    rol: { es: "Edición, Color, Montaje", en: "Editing, Color, Assembly" },
    color: ["#BF6079", "#731641"],
  },
  {
    ...EJEMPLO,
    id: "proyecto-3d",
    destacado: true,
    imagenHero: "",
    titulo: { es: "Proyecto 3D", en: "3D Project" },
    categoria: { es: "Modelado 3D", en: "3D modeling" },
    anio: "2026",
    cliente: { es: "Proyecto académico", en: "Academic project" },
    rol: { es: "Modelado, Texturizado, Render", en: "Modeling, Texturing, Rendering" },
    color: ["#585936", "#282A0B"],
  },
  {
    ...EJEMPLO,
    id: "proyecto-codigo",
    destacado: true,
    imagenHero: "",
    titulo: { es: "Proyecto Código", en: "Code Project" },
    categoria: { es: "Programación", en: "Programming" },
    anio: "2025",
    cliente: { es: "Proyecto personal", en: "Personal project" },
    rol: { es: "Desarrollo, Diseño de interacción", en: "Development, Interaction design" },
    color: ["#731641", "#141804"],
  },
  {
    ...EJEMPLO,
    id: "proyecto-marketing",
    titulo: { es: "Proyecto Marketing", en: "Marketing Project" },
    categoria: { es: "Marketing digital", en: "Digital marketing" },
    anio: "2025",
    cliente: { es: "Nombre del cliente", en: "Client name" },
    rol: { es: "Estrategia, Contenido", en: "Strategy, Content" },
    color: ["#BF6079", "#585936"],
  },
  {
    ...EJEMPLO,
    id: "proyecto-brief",
    titulo: { es: "Proyecto Brief", en: "Brief Project" },
    categoria: { es: "Brief creativo", en: "Creative brief" },
    anio: "2025",
    cliente: { es: "Nombre del cliente", en: "Client name" },
    rol: { es: "Concepto, Dirección creativa", en: "Concept, Creative direction" },
    color: ["#585936", "#141804"],
  },
];

/* ---------- SERVICIOS / HABILIDADES ---------- */
const SERVICIOS = [
  {
    titulo: { es: "Edición de video", en: "Video editing" },
    texto: {
      es: "Montaje, ritmo y color para contar historias que se sienten y se recuerdan.",
      en: "Editing, pacing and color to tell stories people feel and remember.",
    },
  },
  {
    titulo: "3D",
    texto: {
      es: "Modelado, texturizado y render para dar volumen y presencia a las ideas.",
      en: "Modeling, texturing and rendering to give ideas volume and presence.",
    },
  },
  {
    titulo: { es: "Programación", en: "Programming" },
    texto: {
      es: "Experiencias web e interactivas donde el código también es una herramienta creativa.",
      en: "Web and interactive experiences where code is also a creative tool.",
    },
  },
  {
    titulo: "Marketing",
    texto: {
      es: "Estrategia y contenido pensados para conectar con la audiencia correcta.",
      en: "Strategy and content designed to connect with the right audience.",
    },
  },
  {
    titulo: { es: "Briefs creativos", en: "Creative briefs" },
    texto: {
      es: "Ideas claras desde el inicio: objetivos, concepto y dirección para cada proyecto.",
      en: "Clear ideas from the start: goals, concept and direction for every project.",
    },
  },
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
  {
    periodo: { es: "Actualidad", en: "Present" },
    titulo: { es: "Creación Digital", en: "Digital Creation" },
    lugar: "Universidad El Bosque",
  },
  {
    periodo: { es: "Año", en: "Year" },
    titulo: { es: "Formación en arte e ingeniería", en: "Training in art and engineering" },
    lugar: { es: "Institución", en: "Institution" },
  },
  {
    periodo: { es: "Año", en: "Year" },
    titulo: { es: "Experiencia, práctica o proyecto", en: "Experience, internship or project" },
    lugar: { es: "Empresa / Organización", en: "Company / Organization" },
  },
];
