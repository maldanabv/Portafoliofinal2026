/* =========================================================
   PARALLAX AL HACER SCROLL
   Elementos con data-parallax="inicio,fin" (en px) se desplazan
   en vertical mientras cruzan la pantalla. Ej: data-parallax="150,-50"
   Se desactiva en celular y con "reducir movimiento".
   ========================================================= */
(function () {
  const els = [...document.querySelectorAll("[data-parallax]")];
  if (!els.length) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = matchMedia("(max-width: 899px)");
  let ticking = false;

  function update() {
    ticking = false;
    const off = reduce.matches || mobile.matches;
    const vh = innerHeight;
    els.forEach((el) => {
      if (off) { el.style.transform = ""; return; }
      const [start, end] = el.dataset.parallax.split(",").map(Number);
      const r = el.parentElement.getBoundingClientRect();
      // 0 cuando el bloque entra por abajo, 1 cuando sale por arriba
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.transform = `translate3d(0, ${(start + (end - start) * p).toFixed(1)}px, 0)`;
    });
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
