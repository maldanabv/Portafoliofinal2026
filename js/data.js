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
  // Texto corto que aparece debajo de los proyectos destacados
  intro: {
    es: "Soy una creadora digital entre el arte y la ingeniería. Uno edición de video, 3D, programación y estrategia para crear proyectos con sensibilidad estética y propósito.",
    en: "I'm a digital creator between art and engineering. I bring together video editing, 3D, programming and strategy to build projects with aesthetic sensitivity and purpose.",
  },
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

/* ---------- SECCIONES DE PROYECTOS ----------
   Cada proyecto pertenece a una sección (campo "seccion").
   El orden aquí es el orden en que aparecen en la página. */
const SECCIONES = [
  {
    id: "ux",
    titulo: { es: "UX/UI y prototipos", en: "UX/UI & prototypes" },
    texto: {
      es: "Investigación de usuarios, estrategia y prototipos navegables en Figma.",
      en: "User research, strategy and clickable prototypes in Figma.",
    },
  },
  {
    id: "branding",
    titulo: { es: "Branding y publicidad", en: "Branding & advertising" },
    texto: {
      es: "Key visuals, posts para redes y piezas de mailing para Gmail.",
      en: "Key visuals, social posts and Gmail mailing pieces.",
    },
  },
];

/* ---------- PROYECTOS ----------
   id:          identificador único sin espacios (se usa en la URL)
   seccion:     id de la sección (ver SECCIONES)
   destacado:   true = aparece en el slider de la primera pantalla (máx. 4)
   imagen:      portada del proyecto
   galeria:     imágenes que se ven en la página del proyecto
   enlaces:     botones a Figma, sitios, etc.
   datos:       cifras destacadas (opcional)
*/
// Ayuda para no escribir cada ruta: img/proyectos/<carpeta>/01.jpg, 02.jpg...
const fotos = (carpeta, numeros) => numeros.map((n) => `img/proyectos/${carpeta}/${String(n).padStart(2, "0")}.jpg`);

const PROYECTOS = [
  {
    id: "dale",
    seccion: "ux",
    destacado: true,
    titulo: "dale!",
    categoria: { es: "UX Research · UX/UI", en: "UX Research · UX/UI" },
    anio: "2026",
    cliente: { es: "Proyecto académico · Universidad El Bosque", en: "Academic project · Universidad El Bosque" },
    rol: {
      es: "Investigación UX, análisis de crecimiento y prototipo en Figma",
      en: "UX research, growth analysis and Figma prototype",
    },
    equipo: {
      es: "Con Danna Valentina Bolaños Mejía y Sofía Alejandra Cubillos Zabala",
      en: "With Danna Valentina Bolaños Mejía and Sofía Alejandra Cubillos Zabala",
    },
    resumen: {
      es: "Análisis estratégico de producto digital para la billetera dale!: de la investigación al prototipo en alta fidelidad.",
      en: "Strategic digital product analysis for the dale! wallet: from research to a high-fidelity prototype.",
    },
    descripcion: {
      es: "Investigamos cómo los usuarios usan dale!, qué necesitan y dónde se les complica. Combinamos encuesta, diary study, entrevistas, funnel AARRR, heatmaps, prueba A/B, prueba de usabilidad y auditoría de accesibilidad WCAG. Con esos hallazgos diseñamos un flujo de envío más claro: Envía y Paga grandes arriba, llave verificada con el nombre del destinatario, confirmación en hoja y estados visibles (enviado, procesando, completada).",
      en: "We researched how people use dale!, what they need and where they struggle. We combined a survey, a diary study, interviews, an AARRR funnel, heatmaps, A/B testing, usability testing and a WCAG accessibility audit. From those findings we designed a clearer send flow: big Send and Pay actions up top, a verified key showing the recipient's name, a confirmation sheet and visible states (sent, processing, completed).",
    },
    cita: {
      es: "No gana quien tiene más funciones, sino el recorrido más fluido.",
      en: "It's not about having more features, but the smoothest journey.",
    },
    datos: [
      { valor: "43", texto: { es: "respuestas de encuesta", en: "survey responses" } },
      { valor: "8", texto: { es: "entrevistas", en: "interviews" } },
      { valor: "50→100%", texto: { es: "datos correctos con la versión B", en: "correct data with version B" } },
      { valor: "3.5→5", texto: { es: "facilidad de uso (1-5)", en: "ease of use (1-5)" } },
    ],
    enlaces: [
      {
        texto: { es: "Ver prototipo en Figma ↗", en: "View Figma prototype ↗" },
        url: "https://www.figma.com/design/LXc6IyB8gnhuqtpBeOMPK0/Wirefrimes-Alta-fidelidad-DALE-?node-id=0-1",
      },
    ],
    imagen: "img/proyectos/dale/01.jpg",
    galeria: fotos("dale", [2, 3, 5, 8, 12, 14, 15, 17, 19, 22, 23, 25, 28, 29, 30, 32]),
    color: ["#1b2a6b", "#0a0f2c"],
  },
  {
    id: "global-seguros",
    seccion: "ux",
    destacado: true,
    titulo: "Global Seguros",
    categoria: { es: "Estrategia digital · UX/UI · 3D", en: "Digital strategy · UX/UI · 3D" },
    anio: "2026",
    cliente: "Global Seguros de Vida S.A. · Global Hack 2026",
    rol: {
      es: "Concepto creativo, landing / prototipo en Figma y diseño 3D",
      en: "Creative concept, landing / Figma prototype and 3D design",
    },
    equipo: { es: "MSJ Digital Studio · Universidad El Bosque", en: "MSJ Digital Studio · Universidad El Bosque" },
    reconocimiento: { es: "Finalista Global Hack 2026", en: "Global Hack 2026 finalist" },
    resumen: {
      es: "Línea Segura: una experiencia digital que convierte el seguro educativo en un plan de vida claro, verificable y acompañado.",
      en: "Línea Segura: a digital experience that turns education insurance into a clear, verifiable and supported life plan.",
    },
    descripcion: {
      es: "En Colombia, un papá interesado en un seguro educativo tiene 7 de cada 10 chances de abandonar el proceso antes de pagar: formularios de 7 campos, 7 productos sin guía y silencio después del contacto. Línea Segura propone un quiz de 3 preguntas con precio visible, respuesta por WhatsApp en menos de 2 horas con un asesor con nombre, pago en máximo 3 pasos y mensajes en los hitos del hijo. Incluye key visual, landing prototipada en Figma, personajes y objetos 3D y un plan de ejecución a 90 días.",
      en: "In Colombia, a parent interested in education insurance has a 7 in 10 chance of dropping out before paying: 7-field forms, 7 products with no guidance and silence after contact. Línea Segura proposes a 3-question quiz with visible pricing, a WhatsApp reply in under 2 hours from a named advisor, payment in at most 3 steps and messages at the child's milestones. It includes a key visual, a landing prototyped in Figma, 3D characters and objects, and a 90-day execution plan.",
    },
    cita: {
      es: "Las personas no evitan los seguros por falta de necesidad, sino por exceso de fricción.",
      en: "People don't avoid insurance for lack of need, but because of too much friction.",
    },
    datos: [
      { valor: "7→3", texto: { es: "campos del formulario", en: "form fields" } },
      { valor: "< 2h", texto: { es: "tiempo de respuesta", en: "response time" } },
      { valor: "3", texto: { es: "pasos para pagar", en: "steps to pay" } },
      { valor: "90", texto: { es: "días de plan de ejecución", en: "day execution plan" } },
    ],
    enlaces: [
      {
        texto: { es: "Ver diseño en Figma ↗", en: "View Figma design ↗" },
        url: "https://www.figma.com/design/uwfcMpAWgM8FJb8OXeYQrJ/Global-Seguros_MSJ-Digital-Studio",
      },
    ],
    certificado: "global-hack-2026",
    imagen: "img/proyectos/global/01.jpg",
    galeria: fotos("global", [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    color: ["#1f4fd1", "#0b2a8a"],
  },
  {
    id: "kantara",
    seccion: "ux",
    destacado: true,
    titulo: "Kantara",
    categoria: { es: "UX/UI · App de turismo", en: "UX/UI · Travel app" },
    anio: "2025",
    cliente: { es: "Proyecto académico", en: "Academic project" },
    rol: {
      es: "Investigación, ideación, user journey map y prototipo en Figma",
      en: "Research, ideation, user journey map and Figma prototype",
    },
    resumen: {
      es: "App de asesoría turística para recorrer el Eje Cafetero de forma segura y auténtica, con guía digital y acompañamiento humano.",
      en: "A travel-advice app to explore Colombia's Coffee Region safely and authentically, with a digital guide and human support.",
    },
    descripcion: {
      es: "¿Cómo podríamos diseñar una experiencia turística que conecte a los visitantes con el Eje Cafetero? En cuatro fases (investigación, ideación, prototipado y validación) definimos personas, la propuesta de valor y el modelo de negocio. El resultado es Kantara: guías personalizadas por intereses, mapas offline, recomendaciones prácticas y un botón de contacto directo con un asesor real. Validamos el prototipo con usuarios y planteamos un plan de mejora.",
      en: "How might we design a travel experience that connects visitors with the Coffee Region? Across four phases (research, ideation, prototyping and validation) we defined personas, the value proposition and the business model. The result is Kantara: interest-based guides, offline maps, practical tips and a direct-contact button to a real advisor. We tested the prototype with users and drew up an improvement plan.",
    },
    cita: { es: "Libertad con respaldo.", en: "Freedom, with backup." },
    enlaces: [
      {
        texto: { es: "Ver prototipo de la app en Figma ↗", en: "View app prototype in Figma ↗" },
        url: "https://www.figma.com/design/hxhBW7jTwQl0lDN2zsHzv2/PROTOTIPO-APP-KANTARA?node-id=0-1",
      },
      {
        texto: { es: "User journey map ↗", en: "User journey map ↗" },
        url: "https://www.figma.com/design/M92oTtFCVFhSr4Q38MUDgc/USER-JOURNEY-MAP-KANTARA?node-id=0-1",
      },
      {
        texto: { es: "Business model canvas ↗", en: "Business model canvas ↗" },
        url: "https://www.figma.com/design/wgAU3AIJOvqi9tk8UDrGpc/The-Business-Model-Canvas--Community-?node-id=0-1",
      },
    ],
    imagen: "img/proyectos/kantara/01.jpg",
    galeria: fotos("kantara", [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]),
    color: ["#0e8f8f", "#f5e6a8"],
  },
  {
    id: "coca-cola",
    seccion: "branding",
    destacado: true,
    titulo: "Coca-Cola",
    categoria: { es: "Key visual · Post · Mailing", en: "Key visual · Post · Mailing" },
    anio: "2025",
    cliente: { es: "Actividad de clase", en: "Class exercise" },
    rol: { es: "Ilustración, copy y diseño de piezas", en: "Illustration, copywriting and asset design" },
    resumen: {
      es: "Campaña #RefrescaTuMundo: key visual ilustrado, post para Instagram y pieza de mailing para Gmail.",
      en: "#RefrescaTuMundo campaign: illustrated key visual, Instagram post and a Gmail mailing piece.",
    },
    descripcion: {
      es: "Una campaña que lleva la frescura de Coca-Cola a cualquier momento del día. Diseñé un key visual ilustrado con la paleta roja de la marca, lo adapté a un post para Instagram con copy e invitación a comentar, y lo convertí en una pieza de email marketing enviada y probada en Gmail.",
      en: "A campaign that brings Coca-Cola's freshness to any moment of the day. I designed an illustrated key visual in the brand's red palette, adapted it into an Instagram post with copy and a call to comment, and turned it into an email marketing piece sent and tested in Gmail.",
    },
    cita: { es: "Un instante, un sorbo, un mundo de frescura.", en: "One moment, one sip, a world of freshness." },
    imagen: "img/proyectos/cocacola/02.jpg",
    galeria: fotos("cocacola", [5, 3, 4]),
    color: ["#e3000f", "#3a0006"],
  },
  {
    id: "spotify",
    seccion: "branding",
    titulo: "Spotify",
    categoria: { es: "Moodboard · Key visual · Mailing", en: "Moodboard · Key visual · Mailing" },
    anio: "2025",
    cliente: { es: "Trabajo académico", en: "Academic work" },
    rol: { es: "Concepto, moodboard, key visual y piezas", en: "Concept, moodboard, key visual and assets" },
    resumen: {
      es: "Campaña #TuMundoTuRitmo: moodboard, key visual, post para Instagram y mailing para Gmail.",
      en: "#TuMundoTuRitmo campaign: moodboard, key visual, Instagram post and a Gmail mailing.",
    },
    descripcion: {
      es: "Partiendo de un moodboard inspirado en la estética de Spotify Wrapped, creé el concepto \"Tu mundo, tu ritmo\": una invitación a vivir y elegir a tu manera. El key visual ilustrado se adaptó a un post para Instagram y a una pieza de mailing para Gmail con mensaje y llamado a la acción.",
      en: "Starting from a moodboard inspired by the Spotify Wrapped aesthetic, I created the concept \"Your world, your rhythm\": an invitation to live and choose your own way. The illustrated key visual was adapted into an Instagram post and a Gmail mailing piece with message and call to action.",
    },
    cita: { es: "Vive, elige, avanza a tu manera.", en: "Live, choose, move forward your own way." },
    imagen: "img/proyectos/spotify/02.jpg",
    galeria: fotos("spotify", [5, 3, 4]),
    color: ["#e94e63", "#9fd6e1"],
  },
];

/* ---------- VIDEO DE LA PRIMERA PANTALLA ----------
   Aparece como primera diapositiva del inicio, en movimiento.
   Pon HERO_VIDEO = null; si no quieres video. */
const HERO_VIDEO = {
  id: "reel",
  titulo: { es: "Reel 2026", en: "Reel 2026" },
  categoria: { es: "Edición de video", en: "Video editing" },
  anio: "2026",
  videoHero: "videos/video-01.mp4",
  link: "#videos",
  color: ["#731641", "#141804"],
};

/* ---------- VIDEOS ----------
   src:     archivo en la carpeta /videos
   formato: "vertical" (9:16) u "horizontal" (16:9)
   ← PENDIENTE: confirma títulos y descripciones */
const VIDEOS = [
  {
    src: "videos/video-01.mp4",
    formato: "vertical",
    titulo: { es: "Reel · Retrato en movimiento", en: "Reel · Portrait in motion" },
    texto: { es: "Edición, ritmo y color para formato vertical.", en: "Editing, pacing and color for vertical format." },
  },
  {
    src: "videos/video-02.mp4",
    formato: "vertical",
    titulo: { es: "Reel · Creadora digital", en: "Reel · Digital creator" },
    texto: { es: "Contenido para redes: grabación, montaje y gráficos.", en: "Social content: shooting, editing and graphics." },
  },
];

/* ---------- RECONOCIMIENTOS / CERTIFICADOS ---------- */
const CERTIFICADOS = [
  {
    id: "global-hack-2026",
    titulo: { es: "Certificado de finalista · Global Hack 2026", en: "Finalist certificate · Global Hack 2026" },
    entidad: "Global Seguros de Vida S.A.",
    anio: "2026",
    texto: {
      es: "Por haber sido finalista del Global Hack 2026, demostrando compromiso, innovación y creatividad en el desarrollo de soluciones para los retos del sector asegurador.",
      en: "For being a finalist at Global Hack 2026, showing commitment, innovation and creativity in building solutions for the insurance sector's challenges.",
    },
    imagen: "img/proyectos/certificado/01.jpg",
    pdf: "docs/certificado-finalista-global-hack-2026.pdf",
    proyecto: "global-seguros",
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
    periodo: "2026",
    titulo: { es: "Finalista Global Hack 2026", en: "Global Hack 2026 finalist" },
    lugar: "Global Seguros de Vida S.A.",
  },
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
