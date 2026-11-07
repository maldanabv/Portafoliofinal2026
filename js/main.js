/* =========================================================
   LÓGICA DEL PORTAFOLIO
   Genera el contenido a partir de js/data.js
   ========================================================= */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Imagen o degradado de respaldo */
  function media(p, cls = "") {
    if (p.imagen) return `<img class="${cls}" src="${esc(p.imagen)}" alt="${esc(p.titulo)}" loading="lazy">`;
    const [a, b] = p.color || ["#333", "#111"];
    return `<div class="ph ${cls}" style="background:linear-gradient(135deg,${a},${b})">${esc(p.titulo)}</div>`;
  }

  /* ---------- Partes compartidas ---------- */
  function renderShell() {
    const isHome = document.body.dataset.page === "home";
    const base = isHome ? "" : "index.html";
    const logo = PERFIL.logoImg ? `<img src="${esc(PERFIL.logoImg)}" alt="${esc(PERFIL.nombre)}">` : esc(PERFIL.logo);
    const links = [
      ["Inicio", `${base}#inicio`],
      ["Proyectos", `${base}#proyectos`],
      ["Servicios", `${base}#servicios`],
      ["Sobre mí", `${base}#sobre-mi`],
      ["Contacto", "#contacto"],
    ];

    $("#header").innerHTML = `
      <a href="index.html" class="logo" data-hover>${logo}</a>
      <nav class="header__nav">${links
        .map(([t, h], i) => `<a href="${h}" data-sec="${h.split("#")[1]}"${isHome && i === 0 ? ' class="active"' : ""} data-hover>${t}</a>`)
        .join("")}</nav>
      <div class="header__right">
        <button class="theme-btn" id="themeBtn" aria-label="Cambiar tema" data-hover></button>
        <a class="pill-btn" href="#contacto" data-hover>Contáctame</a>
        <button class="menu-btn" id="menuBtn" data-hover><span>Menú</span><i></i></button>
      </div>`;

    // Ocultar el header al bajar y mostrarlo al subir
    let lastY = scrollY;
    window.addEventListener("scroll", () => {
      const y = scrollY, h = $("#header");
      h.classList.toggle("scrolled", y > 40);
      h.classList.toggle("hide", y > lastY && y > 200 && !document.body.classList.contains("menu-open"));
      lastY = y;
    }, { passive: true });

    // Resaltar la sección visible en el menú
    if (isHome) {
      const navLinks = [...document.querySelectorAll(".header__nav a")];
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          navLinks.forEach((a) => a.classList.toggle("active", a.dataset.sec === en.target.id));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      ["inicio", "proyectos", "servicios", "sobre-mi", "contacto"].forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    }

    $("#menu").innerHTML = `
      <ul class="menu__links">${links.map(([t, h], i) => `<li><a href="${h}">${t}<sup>${pad(i + 1)}</sup></a></li>`).join("")}</ul>
      <div class="menu__info">
        <span class="label">Contacto</span>
        <a href="mailto:${esc(PERFIL.email)}">${esc(PERFIL.email)}</a>
        <span>${esc(PERFIL.ciudad)}</span>
        <div style="margin-top:16px;display:flex;gap:16px;justify-content:inherit">
          ${PERFIL.redes.map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nombre)}</a>`).join("")}
        </div>
      </div>`;

    $("#contacto").innerHTML = `
      <span class="label">✦ ¿Tienes un proyecto en mente?</span>
      <a class="footer__cta" href="mailto:${esc(PERFIL.email)}" data-cursor="Escribir">Hablemos</a>
      <div class="footer__grid">
        <div><span class="label">Correo</span><a href="mailto:${esc(PERFIL.email)}">${esc(PERFIL.email)}</a><span>${esc(PERFIL.telefono)}</span></div>
        <div><span class="label">Ubicación</span><span>${esc(PERFIL.ciudad)}</span><span id="clock">--:--</span></div>
        <div><span class="label">Redes</span>${PERFIL.redes.map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nombre)}</a>`).join("")}</div>
        <div><span class="label">Navegación</span>${links.slice(0, 4).map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}</div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} ${esc(PERFIL.nombre)} ${esc(PERFIL.apellido)}. Todos los derechos reservados.</span>
        <a href="#top">Volver arriba ↑</a>
      </div>`;

    $("#menuBtn").addEventListener("click", () => document.body.classList.toggle("menu-open"));
    $("#menu").addEventListener("click", (e) => { if (e.target.closest("a")) document.body.classList.remove("menu-open"); });

    // Tema claro / oscuro
    try { const t = localStorage.getItem("tema"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}
    $("#themeBtn").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("tema", next); } catch (e) {}
    });

    // Reloj local
    const tick = () => {
      const t = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", timeZone: PERFIL.zonaHoraria });
      $("#clock").textContent = `${t} · hora local`;
    };
    tick(); setInterval(tick, 30000);
  }

  /* ---------- Página de inicio ---------- */
  function renderHome() {
    document.title = `${PERFIL.nombre} ${PERFIL.apellido} — Portafolio`;
    initHero();

    $("#slider").innerHTML = PROYECTOS.map((p) => `
      <a class="card" href="proyecto.html?id=${encodeURIComponent(p.id)}" data-cursor="Ver">
        <div class="card__media">${media(p)}</div>
        <div class="card__meta"><h3 class="card__title">${esc(p.titulo)}</h3><span class="card__info">${esc(p.categoria)} · ${esc(p.anio)}</span></div>
      </a>`).join("");
    $("#countProjects").textContent = pad(PROYECTOS.length);

    $("#statement").innerHTML = PERFIL.declaracion.map((l) => `<span>${esc(l)}</span>`).join("");

    $("#list").innerHTML = PROYECTOS.map((p, i) => `
      <a class="list__item" href="proyecto.html?id=${encodeURIComponent(p.id)}" data-i="${i}" data-hover>
        <span class="list__num">${pad(i + 1)}</span>
        <span class="list__title">${esc(p.titulo)}</span>
        <span class="list__cat">${esc(p.categoria)}</span>
        <span class="list__year">${esc(p.anio)}</span>
      </a>`).join("");

    const tools = HERRAMIENTAS.map((h) => `<span>${esc(h)}</span>`).join("");
    document.querySelectorAll(".marquee__inner").forEach((m) => (m.innerHTML = tools + tools));

    $("#services").innerHTML = SERVICIOS.map((s, i) => `
      <li class="reveal"><span class="label">${pad(i + 1)}</span><h3>${esc(s.titulo)}</h3><p>${esc(s.texto)}</p></li>`).join("");

    $("#aboutPhoto").innerHTML = PERFIL.foto
      ? `<img src="${esc(PERFIL.foto)}" alt="${esc(PERFIL.nombre)}">`
      : media({ titulo: `${PERFIL.nombre}`, color: ["#2b2b2b", "#555"] });
    $("#aboutText").innerHTML = PERFIL.bio.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#aboutActions").innerHTML =
      `<a class="btn" href="mailto:${esc(PERFIL.email)}" data-hover>Escríbeme ↗</a>` +
      (PERFIL.cv ? `<a class="btn" href="${esc(PERFIL.cv)}" target="_blank" data-hover>Descargar CV ↓</a>` : "");

    $("#timeline").innerHTML = TRAYECTORIA.map((t) => `
      <li class="reveal"><span>${esc(t.periodo)}</span><strong>${esc(t.titulo)}</strong><span>${esc(t.lugar)}</span></li>`).join("");

    initDrag($("#slider"));
    initListPreview();
  }

  /* ---------- Hero: slider de proyectos destacados ---------- */
  function initHero() {
    const DURACION = 6; // segundos por proyecto
    const dest = PROYECTOS.filter((p) => p.destacado);
    const items = (dest.length ? dest : PROYECTOS).slice(0, 4);
    const hero = $("#inicio");
    hero.style.setProperty("--n", items.length);
    hero.style.setProperty("--dur", DURACION + "s");

    $("#fhMedia").innerHTML = items.map((p) => {
      let m;
      if (p.imagenHero) m = `<img class="cut" src="${esc(p.imagenHero)}" alt="${esc(p.titulo)}">`;
      else m = media(p);
      return `<div class="fh__img">${m}</div>`;
    }).join("");
    $("#fhTabs").innerHTML = items.map((p, i) => `
      <button class="fh__tab" data-i="${i}" aria-label="${esc(p.titulo)}" data-hover>
        <span class="fh__num">${pad(i + 1)}.</span><span class="fh__line"><i></i></span>
      </button>`).join("");

    const imgs = [...document.querySelectorAll(".fh__img")];
    const tabs = [...document.querySelectorAll(".fh__tab")];
    let cur = -1;

    function swap(el, text, first) {
      if (first) { el.textContent = text; return; }
      el.classList.add("out");
      setTimeout(() => {
        el.textContent = text;
        el.classList.remove("out");
        el.classList.add("in-start");
        void el.offsetWidth;
        el.classList.remove("in-start");
      }, 380);
    }

    function go(i) {
      i = (i + items.length) % items.length;
      if (i === cur) return;
      const first = cur === -1;
      cur = i;
      const p = items[i];
      imgs.forEach((el, k) => el.classList.toggle("active", k === i));
      tabs.forEach((el, k) => {
        el.classList.remove("active");
        const bar = $("i", el);
        bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = "";
        if (k === i) el.classList.add("active");
      });
      swap($("#fhTitle"), p.titulo, first);
      swap($("#fhYear"), p.anio, first);
      swap($("#fhCat"), p.categoria, first);
      $("#fhLink").href = `proyecto.html?id=${encodeURIComponent(p.id)}`;
    }

    tabs.forEach((t) => {
      t.addEventListener("click", () => go(+t.dataset.i));
      $("i", t).addEventListener("animationend", () => { if (t.classList.contains("active")) go(cur + 1); });
    });
    $("#fhPrev").addEventListener("click", () => go(cur - 1));
    $("#fhNext").addEventListener("click", () => go(cur + 1));

    // Arrastrar (mouse o dedo) para cambiar de proyecto
    let sx = null, dragged = false;
    hero.addEventListener("pointerdown", (e) => { if (!e.target.closest("button")) { sx = e.clientX; dragged = false; } });
    window.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 50) { dragged = true; go(dx < 0 ? cur + 1 : cur - 1); }
    });
    $("#fhLink").addEventListener("click", (e) => { if (dragged) e.preventDefault(); });
    $("#fhLink").addEventListener("dragstart", (e) => e.preventDefault());

    // Teclado
    window.addEventListener("keydown", (e) => {
      if (scrollY > innerHeight) return;
      if (e.key === "ArrowRight") go(cur + 1);
      if (e.key === "ArrowLeft") go(cur - 1);
    });

    // Pausar el avance automático cuando el hero no está visible
    new IntersectionObserver(([en]) => hero.classList.toggle("paused", !en.isIntersecting)).observe(hero);

    go(0);
  }

  /* ---------- Página de proyecto ---------- */
  function renderProject() {
    const id = new URLSearchParams(location.search).get("id");
    let i = PROYECTOS.findIndex((p) => p.id === id);
    if (i < 0) i = 0;
    const p = PROYECTOS[i];
    const next = PROYECTOS[(i + 1) % PROYECTOS.length];
    document.title = `${p.titulo} — ${PERFIL.nombre} ${PERFIL.apellido}`;

    const gal = (p.galeria && p.galeria.length
      ? p.galeria.map((src) => `<img class="reveal" src="${esc(src)}" alt="${esc(p.titulo)}" loading="lazy">`)
      : [0, 1, 2].map((k) => `<div class="ph reveal" style="background:linear-gradient(${135 + k * 60}deg,${p.color[0]},${p.color[1]})">Imagen ${k + 1}</div>`)
    ).join("");

    $("#project").innerHTML = `
      <section class="p-hero">
        <span class="label">${esc(p.categoria)} · ${esc(p.anio)}</span>
        <h1>${esc(p.titulo)}</h1>
        <p class="p-hero__intro">${esc(p.resumen)}</p>
      </section>
      <div class="p-cover reveal">${media(p)}</div>
      <section class="p-info">
        <div class="p-meta">
          <div><span class="label">Cliente</span><strong>${esc(p.cliente)}</strong></div>
          <div><span class="label">Rol</span><strong>${esc(p.rol)}</strong></div>
          <div><span class="label">Categoría</span><strong>${esc(p.categoria)}</strong></div>
          <div><span class="label">Año</span><strong>${esc(p.anio)}</strong></div>
        </div>
        <div class="p-desc reveal">
          <span class="label">✦ Descripción</span>
          <p style="margin-top:16px">${esc(p.descripcion)}</p>
          ${p.enlace ? `<a class="btn" href="${esc(p.enlace)}" target="_blank" rel="noopener" data-hover>Ver proyecto en vivo ↗</a>` : ""}
        </div>
      </section>
      ${p.cita ? `<blockquote class="p-quote reveal">“${esc(p.cita)}”</blockquote>` : ""}
      <section class="p-gallery">${gal}</section>
      <a class="p-next" href="proyecto.html?id=${encodeURIComponent(next.id)}" data-cursor="Siguiente">
        <span class="label">Siguiente proyecto</span>
        <h2>${esc(next.titulo)}</h2>
      </a>`;
  }

  /* ---------- Arrastrar el slider ---------- */
  function initDrag(track) {
    let down = false, startX = 0, scroll = 0, moved = false;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      down = true; moved = false; startX = e.clientX; scroll = track.scrollLeft;
    });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) { moved = true; track.classList.add("is-dragging"); }
      track.scrollLeft = scroll - dx;
    });
    window.addEventListener("pointerup", () => { down = false; setTimeout(() => track.classList.remove("is-dragging"), 0); });
    track.addEventListener("click", (e) => { if (moved) e.preventDefault(); }, true);
    track.addEventListener("dragstart", (e) => e.preventDefault());
  }

  /* ---------- Vista previa al pasar sobre la lista ---------- */
  function initListPreview() {
    const prev = $("#listPreview");
    const list = $("#list");
    list.addEventListener("mouseover", (e) => {
      const it = e.target.closest(".list__item");
      if (!it) return;
      prev.innerHTML = media(PROYECTOS[it.dataset.i]);
      prev.classList.add("on");
    });
    list.addEventListener("mouseleave", () => prev.classList.remove("on"));
    window.addEventListener("mousemove", (e) => { prev.style.left = e.clientX + "px"; prev.style.top = e.clientY + "px"; });
  }

  /* ---------- Cursor personalizado ---------- */
  function initCursor() {
    const c = $("#cursor");
    if (!c || matchMedia("(hover: none)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
    (function loop() {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      c.style.left = cx + "px"; c.style.top = cy + "px";
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", (e) => {
      const big = e.target.closest("[data-cursor]");
      const hov = e.target.closest("a, button, [data-hover]");
      c.classList.toggle("is-big", !!big);
      c.classList.toggle("is-hover", !big && !!hov);
      $("span", c).textContent = big ? big.dataset.cursor : "";
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- Preloader ---------- */
  function initLoader() {
    const l = $("#loader");
    const finish = () => { document.body.classList.remove("is-loading"); document.body.classList.add("ready"); };
    if (!l) return finish();
    const n = $(".loader__count", l);
    let v = 0;
    const t = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 12));
      n.textContent = v;
      if (v >= 100) { clearInterval(t); setTimeout(() => { l.classList.add("done"); finish(); }, 250); }
    }, 60);
  }

  /* ---------- Arranque ---------- */
  renderShell();
  if (document.body.dataset.page === "home") renderHome();
  if (document.body.dataset.page === "project") renderProject();
  initCursor();
  initReveal();
  initLoader();
})();
