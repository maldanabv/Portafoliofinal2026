/* =========================================================
   LÓGICA DEL PORTAFOLIO
   Genera el contenido a partir de js/data.js (contenido)
   y js/i18n.js (textos de la interfaz en ES / EN).
   ========================================================= */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Idioma ---------- */
  let lang = "es";
  try { const s = localStorage.getItem("idioma"); if (s === "es" || s === "en") lang = s; } catch (e) {}
  document.documentElement.lang = lang;
  // t(): devuelve el texto en el idioma actual ({es, en} o texto simple)
  const t = (v) => (v && typeof v === "object" && !Array.isArray(v) ? (v[lang] ?? v.es) : v);
  // ui(): textos de la interfaz definidos en i18n.js
  const ui = (k) => (UI[lang] && UI[lang][k]) || UI.es[k] || k;

  /* ---------- Tema ---------- */
  try { const s = localStorage.getItem("tema"); if (s) document.documentElement.dataset.theme = s; } catch (e) {}

  const page = document.body.dataset.page;
  const isHome = page === "home";
  const base = isHome ? "" : "index.html";
  let activeSec = isHome ? "inicio" : "";

  /* Imagen o degradado de respaldo */
  function media(p, cls = "") {
    const title = t(p.titulo);
    if (p.imagen) return `<img class="${cls}" src="${esc(p.imagen)}" alt="${esc(title)}" loading="lazy">`;
    const [a, b] = p.color || ["#333", "#111"];
    return `<div class="ph ${cls}" style="background:linear-gradient(135deg,${a},${b})">${esc(title)}</div>`;
  }

  const links = () => [
    [ui("nav_inicio"), `${base}#inicio`, "inicio"],
    [ui("nav_proyectos"), `${base}#proyectos`, "proyectos"],
    [ui("nav_servicios"), `${base}#servicios`, "servicios"],
    [ui("nav_sobre"), `${base}#sobre-mi`, "sobre-mi"],
    [ui("nav_contacto"), "#contacto", "contacto"],
  ];

  function logoHTML() {
    if (PERFIL.logoImg) return `<img src="${esc(PERFIL.logoImg)}" alt="${esc(PERFIL.marca)}">`;
    return `<span class="logo__mark" aria-hidden="true"><span class="logo__m">M</span><span class="logo__j">J</span></span>` +
      `<span class="logo__txt" aria-hidden="true">Digital Studio</span>`;
  }

  /* ---------- Header, menú y footer ---------- */
  function renderHeader() {
    $("#header").innerHTML = `
      <a href="index.html" class="logo" aria-label="${esc(PERFIL.marca)}" data-hover>${logoHTML()}</a>
      <nav class="header__nav">${links()
        .map(([txt, h, sec]) => `<a href="${h}" data-sec="${sec}"${sec === activeSec ? ' class="active"' : ""} data-hover>${esc(txt)}</a>`)
        .join("")}</nav>
      <div class="header__right">
        <button class="theme-btn" id="themeBtn" aria-label="${esc(ui("themeTitle"))}" title="${esc(ui("themeTitle"))}" data-hover></button>
        <button class="lang-btn" id="langBtn" aria-label="${esc(ui("langTitle"))}" title="${esc(ui("langTitle"))}" data-hover>${esc(ui("langBtn"))}</button>
        <a class="pill-btn" href="#contacto" data-contact data-hover>${esc(ui("contactBtn"))}</a>
        <button class="menu-btn" id="menuBtn" data-hover><span>${esc(ui("menu"))}</span><i></i></button>
      </div>`;
  }

  const redesHTML = () =>
    PERFIL.redes.map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nombre)}</a>`).join("");

  // El menú completo incluye también Videos y Reconocimientos
  const menuLinks = () => {
    const l = links();
    return [...l.slice(0, 4), [ui("nav_videos"), `${base}#videos`], [ui("nav_certs"), `${base}#reconocimientos`], l[4]];
  };

  function renderMenu() {
    $("#menu").innerHTML = `
      <ul class="menu__links">${menuLinks().map(([txt, h], i) => `<li><a href="${h}">${esc(txt)}<sup>${pad(i + 1)}</sup></a></li>`).join("")}</ul>
      <div class="menu__info">
        <span class="label">${esc(ui("contact"))}</span>
        <a href="mailto:${esc(PERFIL.email)}">${esc(PERFIL.email)}</a>
        <span>${esc(t(PERFIL.ciudad))}</span>
        <div style="margin-top:16px;display:flex;gap:16px;justify-content:inherit">${redesHTML()}</div>
      </div>`;
  }

  function renderFooter() {
    $("#contacto").innerHTML = `
      <span class="label">${esc(ui("haveProject"))}</span>
      <a class="footer__cta" href="mailto:${esc(PERFIL.email)}" data-contact data-cursor="write" data-split>${esc(ui("letsTalk"))}</a>
      <div class="footer__grid">
        <div><span class="label">${esc(ui("email"))}</span><a href="mailto:${esc(PERFIL.email)}">${esc(PERFIL.email)}</a>${PERFIL.telefono ? `<span>${esc(PERFIL.telefono)}</span>` : ""}</div>
        <div><span class="label">${esc(ui("location"))}</span><span>${esc(t(PERFIL.ciudad))}</span><span id="clock">--:--</span></div>
        <div><span class="label">${esc(ui("social"))}</span>${redesHTML()}</div>
        <div><span class="label">${esc(ui("navigation"))}</span>${links().slice(0, 4).map(([txt, h]) => `<a href="${h}">${esc(txt)}</a>`).join("")}</div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} ${esc(PERFIL.marca)} · ${esc(PERFIL.nombre)} ${esc(PERFIL.apellido)}</span>
        <a href="#top">${esc(ui("backTop"))}</a>
      </div>`;
    tick();
  }

  // Reloj local
  function tick() {
    const el = $("#clock");
    if (!el) return;
    const time = new Date().toLocaleTimeString(lang === "en" ? "en-US" : "es-CO", { hour: "2-digit", minute: "2-digit", timeZone: PERFIL.zonaHoraria });
    el.textContent = `${time} · ${ui("localTime")}`;
  }
  setInterval(tick, 30000);

  // Textos fijos del HTML marcados con data-i18n / data-i18n-aria
  function applyStatic() {
    $$("[data-i18n]").forEach((el) => {
      const txt = ui(el.dataset.i18n);
      if (el.hasAttribute("data-split")) setSplitText(el, txt);
      else el.textContent = txt;
    });
    $$("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", ui(el.dataset.i18nAria)));
    $$("[data-i18n-ph]").forEach((el) => el.setAttribute("placeholder", ui(el.dataset.i18nPh)));
  }

  /* ---------- Proyectos destacados: panel de información ---------- */
  let scIndex = 0;
  function setShowcase(i, force) {
    if (i === scIndex && !force) return;
    scIndex = i;
    const p = PROYECTOS[i];
    $("#scClient").textContent = t(p.cliente);
    $("#scRole").textContent = t(p.rol);
    $("#scCat").textContent = `${t(p.categoria)} · ${p.anio}`;
    $("#scCount").textContent = `${pad(i + 1)}/${pad(PROYECTOS.length)}`;
    $("#scLink").href = `proyecto.html?id=${encodeURIComponent(p.id)}`;
    const title = $("#scTitle");
    if (!title.classList.contains("split")) { splitLetters(title, t(p.titulo)); whenReady(() => title.classList.add("in")); }
    else setSplitText(title, t(p.titulo), 380);
    $$(".sc-card").forEach((c) => c.classList.toggle("is-active", +c.dataset.i === i));
  }

  function initShowcase() {
    const track = $("#slider");
    // Al pasar el mouse por una imagen
    track.addEventListener("mouseover", (e) => {
      const c = e.target.closest(".sc-card");
      if (c) setShowcase(+c.dataset.i);
    });
    // Al desplazar la tira (arrastre, rueda o dedo): la imagen más cercana al borde izquierdo
    let raf = 0;
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const left = track.getBoundingClientRect().left;
        let best = 0, dist = Infinity;
        $$(".sc-card", track).forEach((c) => {
          const d = Math.abs(c.getBoundingClientRect().left - left - 16);
          if (d < dist) { dist = d; best = +c.dataset.i; }
        });
        setShowcase(best);
      });
    }, { passive: true });
  }

  /* ---------- Marquesina grande arrastrable ---------- */
  function initDragMarquee() {
    const wrap = $("#dmarquee"), track = $("#dmarqueeTrack");
    if (!wrap) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0, vel = 0, dragging = false, lastX = 0, visible = false;
    const speed = still ? 0 : -0.7;
    new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(wrap);
    (function loop() {
      if (visible) {
        if (!dragging) { x += speed + vel; vel *= 0.94; }
        const w = track.scrollWidth / 2;
        if (w > 0) { if (x <= -w) x += w; if (x > 0) x -= w; }
        track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      }
      requestAnimationFrame(loop);
    })();
    wrap.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; wrap.classList.add("is-dragging"); wrap.setPointerCapture(e.pointerId); });
    wrap.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX;
      x += dx; vel = dx * 0.6;
    });
    const end = () => { dragging = false; wrap.classList.remove("is-dragging"); };
    wrap.addEventListener("pointerup", end);
    wrap.addEventListener("pointercancel", end);
  }

  /* ---------- Página de inicio ---------- */
  function renderHome() {
    document.title = `${PERFIL.marca} — ${PERFIL.nombre} ${PERFIL.apellido}`;
    setSplitText($("#aboutTitle"), t(PERFIL.saludo));
    $("#introText").textContent = t(PERFIL.intro);

    // Proyectos destacados: tira de imágenes de distintos tamaños + panel de información
    $("#slider").innerHTML = PROYECTOS.map((p, i) => `
      <a class="sc-card${i === scIndex ? " is-active" : ""}" href="proyecto.html?id=${encodeURIComponent(p.id)}" data-i="${i}" data-cursor="view">
        <div class="sc-card__media">${media(p)}</div>
        <span class="sc-card__tag">${esc(t(p.titulo))}</span>
      </a>`).join("");
    setShowcase(scIndex, true);

    // Ver todos + marquesina con los servicios
    $("#seeAllCount").textContent = `(${pad(PROYECTOS.length)})`;
    const words = SERVICIOS.map((s) => `<span class="dmarquee__item">${esc(t(s.titulo))}<span class="dmarquee__star" aria-hidden="true">✦</span></span>`).join("");
    $("#dmarqueeTrack").innerHTML = words + words + words + words;
    $("#statement").innerHTML = t(PERFIL.declaracion).map((l) => `<span data-split>${esc(l)}</span>`).join("");

    // Proyectos agrupados por sección
    $("#workSections").innerHTML = SECCIONES.map((sec) => {
      const items = PROYECTOS.map((p, i) => ({ p, i })).filter((x) => x.p.seccion === sec.id);
      if (!items.length) return "";
      return `
        <div class="sec-head" id="sec-${esc(sec.id)}">
          <span class="label"><span class="star">✦</span> ${esc(t(sec.titulo))}</span>
          <span class="label">${pad(items.length)}</span>
        </div>
        <p class="work__intro">${esc(t(sec.texto))}</p>
        <section class="list">${items.map(({ p, i }, k) => `
          <a class="list__item" href="proyecto.html?id=${encodeURIComponent(p.id)}" data-i="${i}" data-hover>
            <span class="list__num">${pad(k + 1)}</span>
            <span class="list__title">${esc(t(p.titulo))}</span>
            <span class="list__cat">${esc(t(p.categoria))}</span>
            <span class="list__year">${esc(p.anio)}</span>
          </a>`).join("")}
        </section>`;
    }).join("");

    // Videos (solo se crean una vez para no reiniciar la reproducción al cambiar idioma)
    const grid = $("#videoGrid");
    if (!grid.children.length) {
      grid.innerHTML = VIDEOS.map((v, i) => `
        <figure class="vcard vcard--${esc(v.formato || "vertical")} reveal" data-v="${i}">
          <div class="vcard__media">
            <video src="${esc(v.src)}#t=0.1" preload="metadata" playsinline muted loop></video>
            <button class="vcard__play" type="button" data-hover><span aria-hidden="true">▶</span></button>
          </div>
          <figcaption><h3></h3><p></p></figcaption>
        </figure>`).join("");
    }
    $$(".vcard", grid).forEach((card) => {
      const v = VIDEOS[card.dataset.v];
      $("h3", card).textContent = t(v.titulo);
      $("p", card).textContent = t(v.texto);
      $(".vcard__play", card).setAttribute("aria-label", `${ui("play")}: ${t(v.titulo)}`);
    });

    // Certificados
    $("#certList").innerHTML = CERTIFICADOS.map((c) => certHTML(c, true)).join("");

    const tools = HERRAMIENTAS.map((h) => `<span>${esc(t(h))}</span>`).join("");
    $$(".marquee__inner").forEach((m) => (m.innerHTML = tools + tools));

    $("#services").innerHTML = SERVICIOS.map((s, i) => `
      <li class="reveal"><span class="label">${pad(i + 1)}</span><h3>${esc(t(s.titulo))}</h3><p>${esc(t(s.texto))}</p></li>`).join("");

    const photo = $("#aboutPhoto");
    if (!photo.firstElementChild) {
      photo.innerHTML = PERFIL.foto
        ? `<img src="${esc(PERFIL.foto)}" alt="${esc(PERFIL.nombre)} ${esc(PERFIL.apellido)}" loading="lazy">`
        : media({ titulo: PERFIL.nombre, color: ["#585936", "#282A0B"] });
    }
    $("#aboutText").innerHTML = t(PERFIL.bio).map((p) => `<p>${esc(p)}</p>`).join("");
    $("#aboutActions").innerHTML =
      `<a class="btn" href="mailto:${esc(PERFIL.email)}" data-hover>${esc(ui("writeMe"))}</a>` +
      (PERFIL.cv ? `<a class="btn" href="${esc(PERFIL.cv)}" target="_blank" data-hover>${esc(ui("cv"))}</a>` : "");

    $("#timeline").innerHTML = TRAYECTORIA.map((x) => `
      <li class="reveal"><span>${esc(t(x.periodo))}</span><strong>${esc(t(x.titulo))}</strong><span>${esc(t(x.lugar))}</span></li>`).join("");
  }

  /* ---------- Tarjeta de certificado (inicio y página de proyecto) ---------- */
  function certHTML(c, withProject) {
    const title = t(c.titulo);
    return `
      <article class="cert reveal">
        <button class="cert__img" type="button" data-lightbox="${esc(c.imagen)}" aria-label="${esc(title)}" data-hover>
          <img src="${esc(c.imagen)}" alt="${esc(title)}" loading="lazy">
        </button>
        <div class="cert__body">
          <span class="label">${esc(t(c.entidad))} · ${esc(c.anio)}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(t(c.texto))}</p>
          <div class="cert__actions">
            ${c.pdf ? `<a class="btn" href="${esc(c.pdf)}" target="_blank" rel="noopener" data-hover>${esc(ui("viewCert"))}</a>` : ""}
            ${withProject && c.proyecto ? `<a class="btn" href="proyecto.html?id=${encodeURIComponent(c.proyecto)}" data-hover>${esc(ui("viewProject"))}</a>` : ""}
          </div>
        </div>
      </article>`;
  }

  /* ---------- Hero: slider de proyectos destacados ---------- */
  function initHero() {
    const DURACION = 6; // segundos por proyecto
    const dest = PROYECTOS.filter((p) => p.destacado);
    // Primera diapositiva: video en movimiento (HERO_VIDEO en data.js)
    const extra = typeof HERO_VIDEO !== "undefined" && HERO_VIDEO ? [HERO_VIDEO] : [];
    const items = [...extra, ...(dest.length ? dest : PROYECTOS)].slice(0, 4);
    const hero = $("#inicio");
    hero.style.setProperty("--n", items.length);
    hero.style.setProperty("--dur", DURACION + "s");

    $("#fhMedia").innerHTML = items.map((p) => {
      const m = p.videoHero
        ? `<video src="${esc(p.videoHero)}" muted loop playsinline preload="auto"${p.poster ? ` poster="${esc(p.poster)}"` : ""}></video>`
        : p.imagenHero ? `<img class="cut" src="${esc(p.imagenHero)}" alt="${esc(t(p.titulo))}">` : media(p);
      return `<div class="fh__img">${m}</div>`;
    }).join("");
    $("#fhTabs").innerHTML = items.map((p, i) => `
      <button class="fh__tab" data-i="${i}" aria-label="${esc(t(p.titulo))}" data-hover>
        <span class="fh__num">${pad(i + 1)}.</span><span class="fh__line"><i></i></span>
      </button>`).join("");

    const imgs = $$(".fh__img");
    const tabs = $$(".fh__tab");
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
      imgs.forEach((el, k) => {
        el.classList.toggle("active", k === i);
        const v = $("video", el);
        if (v) { if (k === i) { v.currentTime = 0; v.play().catch(() => {}); } else v.pause(); }
      });
      tabs.forEach((el, k) => {
        el.classList.remove("active");
        const bar = $("i", el);
        bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = "";
        if (k === i) el.classList.add("active");
      });
      swapLetters($("#fhTitle"), t(p.titulo), first);
      swap($("#fhYear"), p.anio, first);
      swap($("#fhCat"), t(p.categoria), first);
      $("#fhLink").href = p.link || `proyecto.html?id=${encodeURIComponent(p.id)}`;
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => go(+tab.dataset.i));
      $("i", tab).addEventListener("animationend", () => { if (tab.classList.contains("active")) go(cur + 1); });
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
      if (scrollY > innerHeight || document.body.classList.contains("lb-open")) return;
      if (e.key === "ArrowRight") go(cur + 1);
      if (e.key === "ArrowLeft") go(cur - 1);
    });

    // Pausar el avance automático cuando el hero no está visible
    new IntersectionObserver(([en]) => hero.classList.toggle("paused", !en.isIntersecting)).observe(hero);

    go(0);

    // Al cambiar de idioma: traducir el proyecto visible
    return {
      refresh() {
        const p = items[cur];
        swapLetters($("#fhTitle"), t(p.titulo), false);
        swap($("#fhCat"), t(p.categoria), false);
        tabs.forEach((tab, k) => tab.setAttribute("aria-label", t(items[k].titulo)));
      },
    };
  }

  /* ---------- Página de proyecto ---------- */
  function renderProject() {
    const id = new URLSearchParams(location.search).get("id");
    let i = PROYECTOS.findIndex((p) => p.id === id);
    if (i < 0) i = 0;
    const p = PROYECTOS[i];
    const next = PROYECTOS[(i + 1) % PROYECTOS.length];
    const title = t(p.titulo);
    document.title = `${title} — ${PERFIL.marca}`;

    const g = `g-${p.id}`;
    const gal = (p.galeria && p.galeria.length
      ? p.galeria.map((src, k) => `<img class="reveal" src="${esc(src)}" alt="${esc(title)} · ${k + 2}" loading="lazy" data-lightbox="${esc(src)}" data-group="${g}" data-hover>`)
      : [0, 1, 2].map((k) => `<div class="ph reveal" style="background:linear-gradient(${135 + k * 60}deg,${p.color[0]},${p.color[1]})">${esc(ui("image"))} ${k + 1}</div>`)
    ).join("");
    const cita = t(p.cita);
    const cert = p.certificado && CERTIFICADOS.find((c) => c.id === p.certificado);
    const enlaces = (p.enlaces || []).slice();
    if (p.enlace) enlaces.push({ texto: ui("live"), url: p.enlace });

    $("#project").innerHTML = `
      <section class="p-hero">
        <span class="label">${esc(t(p.categoria))} · ${esc(p.anio)}</span>
        <h1 data-split>${esc(title)}</h1>
        ${p.reconocimiento ? `<a class="badge" href="#reconocimiento">✦ ${esc(t(p.reconocimiento))}</a>` : ""}
        <p class="p-hero__intro">${esc(t(p.resumen))}</p>
      </section>
      <div class="p-cover reveal"${p.imagen ? ` data-lightbox="${esc(p.imagen)}" data-group="${g}" data-hover` : ""}>${media(p)}</div>
      <section class="p-info">
        <div class="p-meta">
          <div><span class="label">${esc(ui("client"))}</span><strong>${esc(t(p.cliente))}</strong></div>
          <div><span class="label">${esc(ui("role"))}</span><strong>${esc(t(p.rol))}</strong></div>
          ${p.equipo ? `<div><span class="label">${esc(ui("team"))}</span><strong>${esc(t(p.equipo))}</strong></div>` : ""}
          <div><span class="label">${esc(ui("category"))}</span><strong>${esc(t(p.categoria))}</strong></div>
          <div><span class="label">${esc(ui("year"))}</span><strong>${esc(p.anio)}</strong></div>
        </div>
        <div class="p-desc reveal">
          <span class="label">${esc(ui("description"))}</span>
          <p style="margin-top:16px">${esc(t(p.descripcion))}</p>
          ${enlaces.length ? `
            <span class="label p-links__label">${esc(ui("resources"))}</span>
            <div class="p-links">${enlaces.map((l, k) => `<a class="btn${k === 0 ? " btn--solid" : ""}" href="${esc(l.url)}" target="_blank" rel="noopener" data-hover>${esc(t(l.texto))}</a>`).join("")}</div>` : ""}
        </div>
      </section>
      ${p.datos && p.datos.length ? `
        <section class="p-stats">
          <span class="label">${esc(ui("keyData"))}</span>
          <div class="p-stats__grid">${p.datos.map((d) => `<div class="reveal"><strong>${esc(d.valor)}</strong><span>${esc(t(d.texto))}</span></div>`).join("")}</div>
        </section>` : ""}
      ${cita ? `<blockquote class="p-quote reveal">“${esc(cita)}”</blockquote>` : ""}
      <div class="p-gallery__head"><span class="label">${esc(ui("gallery"))}</span></div>
      <section class="p-gallery">${gal}</section>
      ${cert ? `<section class="certs certs--project" id="reconocimiento"><div><span class="label"><span class="star">✦</span> ${esc(ui("recognition"))}</span></div><div class="certs__list">${certHTML(cert, false)}</div></section>` : ""}
      <a class="p-next" href="proyecto.html?id=${encodeURIComponent(next.id)}" data-cursor="next">
        <span class="label">${esc(ui("nextProject"))}</span>
        <h2 data-split>${esc(t(next.titulo))}</h2>
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
    const list = $("#workSections");
    list.addEventListener("mouseover", (e) => {
      const it = e.target.closest(".list__item");
      if (!it) return;
      prev.innerHTML = media(PROYECTOS[it.dataset.i]);
      prev.classList.add("on");
    });
    list.addEventListener("mouseleave", () => prev.classList.remove("on"));
    window.addEventListener("mousemove", (e) => { prev.style.left = e.clientX + "px"; prev.style.top = e.clientY + "px"; });
  }

  /* ---------- Visor de imágenes (galerías y certificados) ---------- */
  function initLightbox() {
    const lb = document.createElement("div");
    lb.className = "lb";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML = `
      <button class="lb__close" type="button" data-hover>×</button>
      <button class="lb__nav lb__prev" type="button" data-hover>←</button>
      <img alt="">
      <button class="lb__nav lb__next" type="button" data-hover>→</button>
      <span class="lb__count label"></span>`;
    document.body.appendChild(lb);
    let list = [], idx = 0;
    const img = $("img", lb);
    const show = () => {
      img.src = list[idx];
      $(".lb__count", lb).textContent = `${idx + 1} / ${list.length}`;
      lb.classList.toggle("single", list.length < 2);
      $(".lb__close", lb).setAttribute("aria-label", ui("close"));
    };
    const open = (src, group) => {
      list = group ? [...new Set($$(`[data-lightbox][data-group="${group}"]`).map((x) => x.dataset.lightbox))] : [src];
      idx = Math.max(0, list.indexOf(src));
      show();
      lb.classList.add("on");
      document.body.classList.add("lb-open");
      $(".lb__close", lb).focus();
    };
    const close = () => { lb.classList.remove("on"); document.body.classList.remove("lb-open"); };
    const step = (d) => { idx = (idx + d + list.length) % list.length; show(); };

    document.addEventListener("click", (e) => {
      const trg = e.target.closest("[data-lightbox]");
      if (trg && !lb.contains(trg)) { e.preventDefault(); open(trg.dataset.lightbox, trg.dataset.group); }
    });
    lb.addEventListener("click", (e) => {
      if (e.target.closest(".lb__close") || e.target === lb) close();
      else if (e.target.closest(".lb__prev")) step(-1);
      else if (e.target.closest(".lb__next")) step(1);
    });
    window.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("on")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
  }

  /* ---------- Formulario de contacto ("Hablemos") ----------
     Se abre con cualquier elemento que tenga data-contact.
     Envía el mensaje a PERFIL.email con FormSubmit (formsubmit.co).
     Si el envío falla, abre el correo del visitante con todo ya escrito. */
  function initContact() {
    const chips = (name, keys) =>
      keys.map((k) => `<label class="chip-opt"><input type="${name === "servicio" ? "checkbox" : "radio"}" name="${name}" value="${k}"><span data-i18n="${k}">${esc(ui(k))}</span></label>`).join("");
    const box = document.createElement("div");
    box.className = "cf";
    box.id = "contactForm";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-labelledby", "cfTitle");
    box.innerHTML = `
      <div class="cf__panel">
        <button class="cf__close" type="button" data-i18n-aria="close" aria-label="${esc(ui("close"))}" data-hover>×</button>
        <div class="cf__view cf__view--form">
          <span class="label"><span class="star">✦</span> <span data-i18n="cfKicker">${esc(ui("cfKicker"))}</span></span>
          <h2 class="cf__title" id="cfTitle" data-i18n="letsTalk">${esc(ui("letsTalk"))}</h2>
          <p class="cf__lead" data-i18n="cfLead">${esc(ui("cfLead"))}</p>
          <form novalidate>
            <div class="cf__grid">
              <label class="cf__field"><span data-i18n="cfName">${esc(ui("cfName"))}</span>
                <input name="nombre" type="text" autocomplete="name" required data-i18n-ph="cfNamePh" placeholder="${esc(ui("cfNamePh"))}"></label>
              <label class="cf__field"><span data-i18n="cfEmail">${esc(ui("cfEmail"))}</span>
                <input name="email" type="email" autocomplete="email" required data-i18n-ph="cfEmailPh" placeholder="${esc(ui("cfEmailPh"))}"></label>
            </div>
            <fieldset class="cf__set"><legend data-i18n="cfService">${esc(ui("cfService"))}</legend>
              <div class="chip-row">${chips("servicio", ["sv_video", "sv_3d", "sv_web", "sv_marketing", "sv_brief", "sv_brand", "sv_ux"])}</div></fieldset>
            <fieldset class="cf__set"><legend data-i18n="cfTime">${esc(ui("cfTime"))}</legend>
              <div class="chip-row">${chips("plazo", ["tm_urgent", "tm_month", "tm_quarter", "tm_open"])}</div></fieldset>
            <label class="cf__field"><span data-i18n="cfMsg">${esc(ui("cfMsg"))}</span>
              <textarea name="mensaje" rows="4" required data-i18n-ph="cfMsgPh" placeholder="${esc(ui("cfMsgPh"))}"></textarea></label>
            <input class="cf__honey" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
            <p class="cf__error" role="alert"></p>
            <div class="cf__foot">
              <button class="cf__send" type="submit" data-hover><span data-i18n="cfSend">${esc(ui("cfSend"))}</span> <span aria-hidden="true">→</span></button>
              <span class="cf__alt"><span data-i18n="cfOr">${esc(ui("cfOr"))}</span> <a href="mailto:${esc(PERFIL.email)}">${esc(PERFIL.email)}</a></span>
            </div>
          </form>
        </div>
        <div class="cf__view cf__view--done" aria-live="polite">
          <span class="cf__check" aria-hidden="true">✦</span>
          <h2 class="cf__title" data-i18n="cfThanks">${esc(ui("cfThanks"))}</h2>
          <p class="cf__lead" data-i18n="cfThanksTxt">${esc(ui("cfThanksTxt"))}</p>
          <button class="btn cf__again" type="button" data-hover data-i18n="cfAgain">${esc(ui("cfAgain"))}</button>
        </div>
      </div>`;
    document.body.appendChild(box);
    const form = $("form", box);
    const err = $(".cf__error", box);
    const send = $(".cf__send", box);
    let lastFocus = null;

    const open = () => {
      lastFocus = document.activeElement;
      box.classList.add("on");
      document.body.classList.add("lb-open");
      setTimeout(() => (box.classList.contains("done") ? $(".cf__again", box) : form.nombre).focus({ preventScroll: true }), 350);
    };
    const close = () => {
      box.classList.remove("on");
      document.body.classList.remove("lb-open");
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    };
    const reset = () => { form.reset(); err.textContent = ""; box.classList.remove("done"); form.nombre.focus(); };

    document.addEventListener("click", (e) => {
      const trg = e.target.closest("[data-contact]");
      if (trg && !box.contains(trg)) { e.preventDefault(); open(); }
    });
    box.addEventListener("click", (e) => {
      if (e.target === box || e.target.closest(".cf__close")) close();
      if (e.target.closest(".cf__again")) reset();
    });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape" && box.classList.contains("on")) close(); });

    // Datos del formulario en texto (para el correo de respaldo)
    const collect = () => {
      const pick = (n) => $$(`input[name="${n}"]:checked`, form).map((i) => ui(i.value)).join(", ");
      return {
        nombre: form.nombre.value.trim(),
        email: form.email.value.trim(),
        servicio: pick("servicio") || "—",
        plazo: pick("plazo") || "—",
        mensaje: form.mensaje.value.trim(),
      };
    };
    const mailtoFallback = (d) => {
      const body = `${ui("cfName")}: ${d.nombre}\n${ui("cfEmail")}: ${d.email}\n${ui("cfService")}: ${d.servicio}\n${ui("cfTime")}: ${d.plazo}\n\n${d.mensaje}`;
      location.href = `mailto:${PERFIL.email}?subject=${encodeURIComponent(`${ui("cfSubject")} · ${d.nombre}`)}&body=${encodeURIComponent(body)}`;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      err.textContent = "";
      if (form._honey.value) return; // bots
      const d = collect();
      const bad = !d.nombre ? form.nombre : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) ? form.email : d.mensaje.length < 10 ? form.mensaje : null;
      $$(".cf__field", form).forEach((f) => f.classList.remove("invalid"));
      if (bad) {
        bad.closest(".cf__field").classList.add("invalid");
        err.textContent = ui(bad === form.nombre ? "cfErrName" : bad === form.email ? "cfErrEmail" : "cfErrMsg");
        bad.focus();
        return;
      }
      send.disabled = true;
      send.classList.add("is-sending");
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${PERFIL.email}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `${ui("cfSubject")} · ${d.nombre}`,
            _replyto: d.email,
            _template: "table",
            _captcha: "false",
            Nombre: d.nombre, Correo: d.email, Servicio: d.servicio, Plazo: d.plazo, Mensaje: d.mensaje,
          }),
        });
        const out = await res.json().catch(() => ({}));
        if (!res.ok || String(out.success) !== "true") throw new Error(out.message || res.status);
        box.classList.add("done");
        $(".cf__again", box).focus({ preventScroll: true });
      } catch (ex) {
        err.textContent = ui("cfErrSend");
        mailtoFallback(d);
      } finally {
        send.disabled = false;
        send.classList.remove("is-sending");
      }
    });
  }

  /* ---------- Videos: vista previa al pasar el mouse, sonido al hacer clic ---------- */
  function initVideos() {
    const grid = $("#videoGrid");
    if (!grid) return;
    const canHover = matchMedia("(hover: hover)").matches;
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".vcard__play");
      if (!btn) return;
      const card = btn.closest(".vcard");
      const v = $("video", card);
      $$(".vcard.is-playing video", grid).forEach((o) => { if (o !== v) { o.pause(); o.muted = true; o.controls = false; o.closest(".vcard").classList.remove("is-playing"); } });
      card.classList.add("is-playing");
      v.muted = false;
      v.controls = true;
      v.currentTime = 0;
      v.play();
    });
    if (canHover) {
      grid.addEventListener("mouseover", (e) => {
        const card = e.target.closest(".vcard");
        if (card && !card.classList.contains("is-playing")) $("video", card).play().catch(() => {});
      });
      grid.addEventListener("mouseout", (e) => {
        const card = e.target.closest(".vcard");
        if (card && !card.contains(e.relatedTarget) && !card.classList.contains("is-playing")) $("video", card).pause();
      });
    }
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
      $("span", c).textContent = big ? ui("cur_" + big.dataset.cursor) : "";
    });
  }

  /* ---------- Palabras que suben y salen ----------
     Divide un texto en palabras, cada una dentro de su propia máscara.
     Entran subiendo desde abajo, una tras otra, y salen hacia arriba. */
  function splitLetters(el, text) {
    text = text != null ? text : el.textContent;
    el.setAttribute("aria-label", text);
    el.innerHTML = text.split(/\s+/).filter(Boolean).map((word, i) =>
      `<span class="ch" aria-hidden="true"><span class="ch__in" style="--i:${i}" data-ch="${esc(word)}">${esc(word)}</span></span>`
    ).join(" ");
    el.classList.remove("out");
    el.classList.add("split");
  }

  const whenReady = (fn) => {
    if (document.body.classList.contains("ready")) fn();
    else document.addEventListener("site:ready", fn, { once: true });
  };

  // Cambia el texto de un título dividido: salen las letras viejas y entran las nuevas
  function setSplitText(el, text, delay = 450) {
    if (!el.classList.contains("split")) { splitLetters(el, text); return; }
    if (el.getAttribute("aria-label") === text) return;
    if (!el.classList.contains("in")) { splitLetters(el, text); return; }
    el.classList.remove("in");
    el.classList.add("out");
    clearTimeout(el._t);
    el._t = setTimeout(() => {
      splitLetters(el, text);
      void el.offsetWidth;
      el.classList.add("in");
    }, delay);
  }

  // Título del hero
  function swapLetters(el, text, first) {
    if (first) {
      splitLetters(el, text);
      whenReady(() => requestAnimationFrame(() => el.classList.add("in")));
      return;
    }
    setSplitText(el, text, 520);
  }

  // Títulos con data-split: entran al aparecer en pantalla y salen al irse
  let splitIO = null;
  const pendingSplit = new Set();
  function applySplit() {
    $$("[data-split]").forEach((el) => {
      if (!el.classList.contains("split")) splitLetters(el);
      if (splitIO) splitIO.observe(el); else pendingSplit.add(el);
    });
  }
  whenReady(() => {
    splitIO = new IntersectionObserver((entries) => {
      // Al entrar suben a su lugar; al salir por arriba se van hacia arriba, por abajo vuelven abajo
      entries.forEach((en) => {
        const el = en.target;
        if (el._t && el.classList.contains("out")) return; // está cambiando de texto
        el.classList.toggle("in", en.isIntersecting);
        el.classList.toggle("out", !en.isIntersecting && en.boundingClientRect.top < 0);
      });
    }, { rootMargin: "-12% 0px -12% 0px" });
    pendingSplit.forEach((el) => splitIO.observe(el));
    pendingSplit.clear();
  });

  /* ---------- Aparición al hacer scroll ---------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); } });
  }, { threshold: 0.12 });
  const observeReveal = () => $$(".reveal:not(.in)").forEach((el) => revealIO.observe(el));

  /* ---------- Eventos globales (una sola vez) ---------- */
  function initEvents() {
    document.addEventListener("click", (e) => {
      if (e.target.closest("#menuBtn")) { document.body.classList.toggle("menu-open"); return; }
      if (e.target.closest("#themeBtn")) {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem("tema", next); } catch (err) {}
        return;
      }
      if (e.target.closest("#langBtn")) { setLang(lang === "es" ? "en" : "es"); return; }
      if (e.target.closest("#menu a")) document.body.classList.remove("menu-open");
    });

    // Ocultar el header al bajar y mostrarlo al subir
    let lastY = scrollY;
    window.addEventListener("scroll", () => {
      const y = scrollY, h = $("#header");
      h.classList.toggle("scrolled", y > 40);
      h.classList.toggle("hide", y > lastY && y > 200 && !document.body.classList.contains("menu-open"));
      lastY = y;
    }, { passive: true });

    // Resaltar en el menú la sección visible
    if (isHome) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          activeSec = en.target.id;
          $$(".header__nav a").forEach((a) => a.classList.toggle("active", a.dataset.sec === activeSec));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      ["inicio", "proyectos", "servicios", "sobre-mi", "contacto"].forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    }
  }

  /* ---------- Renderizar todo (al cargar y al cambiar idioma) ---------- */
  let heroCtl = null;
  function renderAll() {
    renderHeader();
    renderMenu();
    renderFooter();
    applyStatic();
    if (isHome) renderHome();
    if (page === "project") renderProject();
    applySplit();
    observeReveal();
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem("idioma", l); } catch (e) {}
    document.documentElement.lang = l;
    renderAll();
    if (heroCtl) heroCtl.refresh();
  }

  /* ---------- Preloader ---------- */
  function initLoader() {
    const l = $("#loader");
    const finish = () => {
      document.body.classList.remove("is-loading");
      document.body.classList.add("ready");
      document.dispatchEvent(new Event("site:ready"));
    };
    if (!l) return finish();
    const n = $(".loader__count", l);
    let v = 0;
    const timer = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 12));
      n.textContent = v;
      if (v >= 100) { clearInterval(timer); setTimeout(() => { l.classList.add("done"); finish(); }, 250); }
    }, 60);
  }

  /* ---------- Arranque ---------- */
  renderAll();
  if (isHome) {
    heroCtl = initHero();
    initDrag($("#slider"));
    initShowcase();
    initDragMarquee();
    initListPreview();
    initVideos();
  }
  initLightbox();
  initContact();
  initEvents();
  initCursor();
  initLoader();
})();
