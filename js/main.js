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
        <a class="pill-btn" href="#contacto" data-hover>${esc(ui("contactBtn"))}</a>
        <button class="menu-btn" id="menuBtn" data-hover><span>${esc(ui("menu"))}</span><i></i></button>
      </div>`;
  }

  const redesHTML = () =>
    PERFIL.redes.map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nombre)}</a>`).join("");

  function renderMenu() {
    $("#menu").innerHTML = `
      <ul class="menu__links">${links().map(([txt, h], i) => `<li><a href="${h}">${esc(txt)}<sup>${pad(i + 1)}</sup></a></li>`).join("")}</ul>
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
      <a class="footer__cta" href="mailto:${esc(PERFIL.email)}" data-cursor="write" data-split>${esc(ui("letsTalk"))}</a>
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
  }

  /* ---------- Página de inicio ---------- */
  function renderHome() {
    document.title = `${PERFIL.marca} — ${PERFIL.nombre} ${PERFIL.apellido}`;
    setSplitText($("#aboutTitle"), t(PERFIL.saludo));

    $("#slider").innerHTML = PROYECTOS.map((p) => `
      <a class="card" href="proyecto.html?id=${encodeURIComponent(p.id)}" data-cursor="view">
        <div class="card__media">${media(p)}</div>
        <div class="card__meta"><h3 class="card__title">${esc(t(p.titulo))}</h3><span class="card__info">${esc(t(p.categoria))} · ${esc(p.anio)}</span></div>
      </a>`).join("");
    $("#countProjects").textContent = pad(PROYECTOS.length);

    $("#statement").innerHTML = t(PERFIL.declaracion).map((l) => `<span data-split>${esc(l)}</span>`).join("");

    $("#list").innerHTML = PROYECTOS.map((p, i) => `
      <a class="list__item" href="proyecto.html?id=${encodeURIComponent(p.id)}" data-i="${i}" data-hover>
        <span class="list__num">${pad(i + 1)}</span>
        <span class="list__title">${esc(t(p.titulo))}</span>
        <span class="list__cat">${esc(t(p.categoria))}</span>
        <span class="list__year">${esc(p.anio)}</span>
      </a>`).join("");

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

  /* ---------- Hero: slider de proyectos destacados ---------- */
  function initHero() {
    const DURACION = 6; // segundos por proyecto
    const dest = PROYECTOS.filter((p) => p.destacado);
    const items = (dest.length ? dest : PROYECTOS).slice(0, 4);
    const hero = $("#inicio");
    hero.style.setProperty("--n", items.length);
    hero.style.setProperty("--dur", DURACION + "s");

    $("#fhMedia").innerHTML = items.map((p) => {
      const m = p.imagenHero ? `<img class="cut" src="${esc(p.imagenHero)}" alt="${esc(t(p.titulo))}">` : media(p);
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
      imgs.forEach((el, k) => el.classList.toggle("active", k === i));
      tabs.forEach((el, k) => {
        el.classList.remove("active");
        const bar = $("i", el);
        bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = "";
        if (k === i) el.classList.add("active");
      });
      swapLetters($("#fhTitle"), t(p.titulo), first);
      swap($("#fhYear"), p.anio, first);
      swap($("#fhCat"), t(p.categoria), first);
      $("#fhLink").href = `proyecto.html?id=${encodeURIComponent(p.id)}`;
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
      if (scrollY > innerHeight) return;
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

    const gal = (p.galeria && p.galeria.length
      ? p.galeria.map((src) => `<img class="reveal" src="${esc(src)}" alt="${esc(title)}" loading="lazy">`)
      : [0, 1, 2].map((k) => `<div class="ph reveal" style="background:linear-gradient(${135 + k * 60}deg,${p.color[0]},${p.color[1]})">${esc(ui("image"))} ${k + 1}</div>`)
    ).join("");
    const cita = t(p.cita);

    $("#project").innerHTML = `
      <section class="p-hero">
        <span class="label">${esc(t(p.categoria))} · ${esc(p.anio)}</span>
        <h1 data-split>${esc(title)}</h1>
        <p class="p-hero__intro">${esc(t(p.resumen))}</p>
      </section>
      <div class="p-cover reveal">${media(p)}</div>
      <section class="p-info">
        <div class="p-meta">
          <div><span class="label">${esc(ui("client"))}</span><strong>${esc(t(p.cliente))}</strong></div>
          <div><span class="label">${esc(ui("role"))}</span><strong>${esc(t(p.rol))}</strong></div>
          <div><span class="label">${esc(ui("category"))}</span><strong>${esc(t(p.categoria))}</strong></div>
          <div><span class="label">${esc(ui("year"))}</span><strong>${esc(p.anio)}</strong></div>
        </div>
        <div class="p-desc reveal">
          <span class="label">${esc(ui("description"))}</span>
          <p style="margin-top:16px">${esc(t(p.descripcion))}</p>
          ${p.enlace ? `<a class="btn" href="${esc(p.enlace)}" target="_blank" rel="noopener" data-hover>${esc(ui("live"))}</a>` : ""}
        </div>
      </section>
      ${cita ? `<blockquote class="p-quote reveal">“${esc(cita)}”</blockquote>` : ""}
      <section class="p-gallery">${gal}</section>
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
      $("span", c).textContent = big ? ui("cur_" + big.dataset.cursor) : "";
    });
  }

  /* ---------- Letras que entran y salen ----------
     Divide un texto en letras, cada una dentro de su propia máscara.
     Las letras alternan dirección (arriba / abajo) y entran escalonadas. */
  function splitLetters(el, text) {
    text = text != null ? text : el.textContent;
    el.setAttribute("aria-label", text);
    let i = 0;
    el.innerHTML = text.split(" ").map((word) => {
      const letters = [...word].map((ch) => {
        const d = i % 2 === 0 ? 1 : -1;
        return `<span class="ch" aria-hidden="true"><span class="ch__in" style="--i:${i++};--d:${d}" data-ch="${esc(ch)}">${esc(ch)}</span></span>`;
      }).join("");
      i++;
      return `<span class="word">${letters}</span>`;
    }).join(" ");
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
      entries.forEach((en) => en.target.classList.toggle("in", en.isIntersecting));
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
    initListPreview();
  }
  initEvents();
  initCursor();
  initLoader();
})();
