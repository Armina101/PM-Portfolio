/* ------------------------------------------------------------------
   FILL THESE IN. Anything left empty stays hidden on every page,
   so the site never shows a dead button.
   ------------------------------------------------------------------ */
var PROFILE = {
  email: "afolabijolayemi@gmail.com",
  cv: "https://drive.google.com/file/d/1g6-Pn6zZ0lxrW4TElqSyKvIpuIipkX7X/view?usp=sharing",  // your CV on Google Drive; replace the file there to update it
  x: "https://x.com/mysterios_amina"
};

(function () {
  var root = document.documentElement;
  var base = root.getAttribute("data-base") || "";

  // profile links
  document.querySelectorAll("[data-profile]").forEach(function (el) {
    var key = el.getAttribute("data-profile"), val = PROFILE[key];
    if (!val) return;
    if (key === "email") {
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + val);
      if (el.hasAttribute("data-fill")) el.textContent = val;
    } else {
      var url = /^https?:|^mailto:/.test(val) ? val : base + val;
      el.setAttribute("href", url);
    }
    el.hidden = false;
  });

  // copy email
  var toast = document.getElementById("toast");
  function say(m) { if (!toast) return; toast.textContent = m; toast.hidden = false; clearTimeout(say.t); say.t = setTimeout(function () { toast.hidden = true; }, 1800); }
  document.querySelectorAll("[data-copy-email]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(PROFILE.email).then(function () { say("Email copied"); }, function () { say(PROFILE.email); });
      } else { say(PROFILE.email); }
    });
  });

  // skim / show workings
  var sw = document.querySelector("[data-reading]");
  if (sw) {
    sw.hidden = false;
    var btns = sw.querySelectorAll("button");
    function set(mode) {
      document.body.classList.toggle("skim", mode === "skim");
      btns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.value === mode)); });
      try { localStorage.setItem("reading", mode); } catch (e) {}
    }
    var saved = "full";
    try { saved = localStorage.getItem("reading") || "full"; } catch (e) {}
    set(saved);
    btns.forEach(function (b) { b.addEventListener("click", function () { set(b.value); }); });
  }

  // explorers: progressive tabs (without JS every panel shows, stacked)
  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    var list = box.querySelector(".tablist"), panels = box.querySelectorAll(".panel");
    if (!list || !panels.length) return;
    list.hidden = false;
    var tabs = list.querySelectorAll("button");
    function show(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { show(i); });
      t.addEventListener("keydown", function (e) {
        var n = tabs.length, k = e.key;
        if (k === "ArrowRight" || k === "ArrowDown") { e.preventDefault(); show((i + 1) % n, true); }
        if (k === "ArrowLeft" || k === "ArrowUp") { e.preventDefault(); show((i - 1 + n) % n, true); }
        if (k === "Home") { e.preventDefault(); show(0, true); }
        if (k === "End") { e.preventDefault(); show(n - 1, true); }
      });
    });
    show(0);
  });

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // hero: portrait, then proof. Starts 3.5s after load, pausable, never automatic with reduced motion
  var box = document.querySelector("[data-proofs]");
  if (box) {
    var slides = box.querySelectorAll(".slide"), controls = box.querySelector(".proof-controls");
    var dots = controls.querySelectorAll(".dots button"), pause = controls.querySelector(".pause");
    var cur = 0, timer = null, paused = reduce, hover = false;
    controls.hidden = false;
    function go(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) { s.classList.toggle("is-on", j === cur); s.setAttribute("aria-hidden", String(j !== cur)); });
      dots.forEach(function (d, j) { d.setAttribute("aria-pressed", String(j === cur)); });
    }
    function tick() { if (!paused && !hover && !document.hidden) go(cur + 1); }
    function start(delay) { clearInterval(timer); timer = setInterval(tick, 4200); }
    dots.forEach(function (d, j) { d.addEventListener("click", function () { go(j); }); });
    pause.textContent = paused ? "Play" : "Pause";
    pause.setAttribute("aria-pressed", String(paused));
    pause.addEventListener("click", function () {
      paused = !paused; pause.textContent = paused ? "Play" : "Pause"; pause.setAttribute("aria-pressed", String(paused));
      if (!paused) tick();
    });
    box.addEventListener("mouseenter", function () { hover = true; });
    box.addEventListener("mouseleave", function () { hover = false; });
    box.addEventListener("focusin", function () { hover = true; });
    box.addEventListener("focusout", function () { hover = false; });
    if (!reduce) setTimeout(function () { tick(); start(); }, 3500);
  }

  // count-up numbers when they scroll into view
  var nums = document.querySelectorAll(".stats b, .figures b, .proofline b");
  function parse(t) { var m = t.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/); if (!m) return null; return { pre: m[1], n: parseFloat(m[2].replace(/,/g, "")), comma: m[2].indexOf(",") > -1, dec: (m[2].split(".")[1] || "").length, post: m[3] }; }
  function fmt(p, v) { var s = v.toFixed(p.dec); if (p.comma) s = Number(s).toLocaleString("en-GB", { minimumFractionDigits: p.dec, maximumFractionDigits: p.dec }); return p.pre + s + p.post; }
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, p = el._p, t0 = null, dur = 1100;
        function step(ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / dur); var eased = 1 - Math.pow(1 - k, 3); el.textContent = fmt(p, p.n * eased); if (k < 1) requestAnimationFrame(step); else el.textContent = el._final; }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) {
      var p = parse(el.textContent.trim());
      if (!p || p.n < 10 || /\d(st|nd|rd|th)$/.test(el.textContent.trim())) return; // skip ordinals and tiny numbers
      el._p = p; el._final = el.textContent;
      el.style.fontVariantNumeric = "tabular-nums";
      var r = el.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) el.textContent = fmt(p, 0); // off-screen: start from zero, unseen
      io.observe(el);
    });
  }

  // zoomable images: click or press Enter on any content image
  var dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.innerHTML = '<button type="button" class="lb-close" aria-label="Close enlarged image">Close ×</button><p class="lb-cap"></p>';
  document.body.appendChild(dlg);
  var lbImg = null, lbCap = dlg.querySelector(".lb-cap");
  dlg.querySelector(".lb-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  document.querySelectorAll("main img").forEach(function (im) {
    if (im.closest("a") || im.closest("[data-proofs]")) return;
    im.classList.add("zoomable");
    im.tabIndex = 0;
    im.setAttribute("role", "button");
    im.setAttribute("aria-label", "Enlarge image: " + (im.alt || "image"));
    function open() {
      if (!lbImg) { lbImg = document.createElement("img"); dlg.insertBefore(lbImg, lbCap); }
      lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt;
      var fc = im.closest("figure") && im.closest("figure").querySelector("figcaption");
      lbCap.textContent = fc ? fc.textContent : im.alt;
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    }
    im.addEventListener("click", open);
    im.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
})();
