/* ------------------------------------------------------------------
   FILL THESE IN. Anything left empty stays hidden on every page,
   so the site never shows a dead button.
   ------------------------------------------------------------------ */
var PROFILE = {
  email: "afolabijolayemi@gmail.com",
  cv: "Aminat-Afolabi-CV.pdf",  // served from the site itself; replace this file to update it
  x: "https://x.com/mysterios_amina"
};

// The Claude preview can't open PDFs, so there the button falls back to the Google Drive copy
if (/claude\.ai$|claudeusercontent\.com$/.test(location.hostname)) PROFILE.cv = "https://drive.google.com/file/d/1g6-Pn6zZ0lxrW4TElqSyKvIpuIipkX7X/view?usp=sharing";

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

  // How I think: exercise book. Without JS every page shows, stacked.
  document.querySelectorAll("[data-notebook]").forEach(function (nb) {
    var list = nb.querySelector(".nb-qs"), pages = nb.querySelectorAll(".nb-page");
    if (!list || !pages.length) return;
    var qs = list.querySelectorAll("[role=tab]");
    list.hidden = false;
    nb.classList.add("nb-ready");
    function show(i, focus, mark) {
      qs.forEach(function (q, j) {
        var on = i === j;
        q.setAttribute("aria-selected", String(on));
        q.tabIndex = on ? 0 : -1;
        pages[j].hidden = !on;
        pages[j].classList.remove("marking");
      });
      if (mark) { void pages[i].offsetWidth; pages[i].classList.add("marking"); }
      if (focus) qs[i].focus();
    }
    qs.forEach(function (q, i) {
      q.addEventListener("click", function () { show(i, false, true); });
      q.addEventListener("keydown", function (e) {
        var n = qs.length, k = e.key, t = -1;
        if (k === "ArrowRight" || k === "ArrowDown") t = (i + 1) % n;
        if (k === "ArrowLeft" || k === "ArrowUp") t = (i - 1 + n) % n;
        if (k === "Home") t = 0;
        if (k === "End") t = n - 1;
        if (t > -1) { e.preventDefault(); show(t, true, true); }
      });
    });
    show(0);
    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { var i = 0; qs.forEach(function (q, j) { if (q.getAttribute("aria-selected") === "true") i = j; }); pages[i].classList.add("marking"); io.disconnect(); } }); }, { threshold: 0.35 });
      io.observe(nb);
    }
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
  var nums = document.querySelectorAll(".stats b, .figures b, .proofline b, .ship-cards b");
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
      if (el.closest(".ship-cards") && window.innerWidth < 640) return; // swipeable row on phones: show final numbers
      el._p = p; el._final = el.textContent;
      el.style.fontVariantNumeric = "tabular-nums";
      var r = el.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) el.textContent = fmt(p, 0); // off-screen: start from zero, unseen
      io.observe(el);
    });
  }


  // reveal-on-view helper: runs once when an element is mostly visible
  function onView(el, fn, threshold) {
    if (!el) return;
    if (reduce || !("IntersectionObserver" in window)) { fn(); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { o.disconnect(); fn(); } }); }, { threshold: threshold || 0.35 });
    o.observe(el);
  }

  // How I think: each row fades up as it enters (content is visible without JS or with reduced motion)
  if (!reduce && "IntersectionObserver" in window) {
    var tkRows = document.querySelectorAll(".tk-row");
    var tkIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove("tk-wait"); tkIO.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    tkRows.forEach(function (r) { if (r.getBoundingClientRect().top > window.innerHeight) { r.classList.add("tk-wait"); tkIO.observe(r); } });
  }


  // Project bookshelf: a book leaves the shelf, grows, opens; closing reverses it
  (function () {
    var shelfEl = document.querySelector("[data-shelf]"), ov = document.querySelector("[data-bko]");
    if (!shelfEl || !ov) return;
    var dlg = ov.querySelector(".bko-dialog"), bk = ov.querySelector(".bk"), pagesEl = ov.querySelector(".bk-pages");
    var cover = ov.querySelector(".bk-cover"), closeBtn = ov.querySelector(".bko-close"), backdrop = ov.querySelector(".bko-backdrop");
    var mqMobile = window.matchMedia("(max-width: 700px)"), mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var opener = null, closing = false, turning = false, timers = [], mobile = false, page = 0;
    function k() { return mqReduce.matches ? 0.01 : 1; }
    function later(fn, ms) { timers.push(setTimeout(fn, ms * k())); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function stage(s) { ov.setAttribute("data-stage", s); }
    function pageEls() { return pagesEl.querySelectorAll(".bk-page"); }
    function setActive(i) {
      page = i;
      pageEls().forEach(function (p, j) {
        var on = !mobile || i === j;
        p.classList.toggle("is-active", on);
        if (on) p.removeAttribute("inert"); else p.setAttribute("inert", "");
      });
    }
    function naturalHeight(width) {
      var h = 0;
      pageEls().forEach(function (p) {
        var probe = p.cloneNode(true);
        probe.querySelectorAll("[id]").forEach(function (el) { el.removeAttribute("id"); });
        probe.style.cssText = "position:absolute;left:-9999px;top:0;visibility:hidden;overflow:visible;width:" + width + "px";
        bk.appendChild(probe);
        h = Math.max(h, probe.offsetHeight);
        bk.removeChild(probe);
      });
      return h;
    }
    function open(btn) {
      if (!ov.hidden) return;
      clearTimers();
      opener = btn;
      var key = btn.getAttribute("data-book");
      pagesEl.innerHTML = "";
      pagesEl.appendChild(document.getElementById("bk-tpl-" + key).content.cloneNode(true));
      bk.className = "bk bk-" + key;
      cover.querySelector(".bk-cover-num").textContent = btn.getAttribute("data-n");
      cover.querySelector(".bk-cover-title").textContent = btn.getAttribute("data-title");
      cover.querySelector(".bk-cover-role").textContent = btn.getAttribute("data-role");
      cover.querySelector(".bk-cover-icon").innerHTML = btn.querySelector(".sb-icon").innerHTML;
      mobile = mqMobile.matches;
      ov.classList.toggle("is-mobile", mobile);
      setActive(0);
      ov.hidden = false;
      stage("measure");
      // origin: the shelf book's centre, relative to where the closed book sits in the middle of the screen
      var b = bk.getBoundingClientRect(), r = btn.getBoundingClientRect();
      var lean = getComputedStyle(btn.parentNode).getPropertyValue("--lean").trim() || "0deg";
      ov.style.setProperty("--ox", (r.left + r.width / 2 - (b.left + b.width / 2)) + "px");
      ov.style.setProperty("--oy", (r.top + r.height / 2 - (b.top + b.height / 2)) + "px");
      ov.style.setProperty("--osx", (btn.offsetWidth / b.width).toFixed(3));
      ov.style.setProperty("--osy", (btn.offsetHeight / b.height).toFixed(3));
      ov.style.setProperty("--or", lean);
      if (mobile) {
        ov.style.setProperty("--ow", Math.min(window.innerWidth - 20, 520) + "px");
        ov.style.setProperty("--oh", "calc(100svh - 92px - env(safe-area-inset-top) - env(safe-area-inset-bottom))");
      } else {
        var ow = Math.min(1100, window.innerWidth - 48);
        var maxH = window.innerHeight - 110;
        var oh = Math.max(Math.min(440, maxH), Math.min(naturalHeight(ow / 2), maxH));
        ov.style.setProperty("--ow", ow + "px");
        ov.style.setProperty("--oh", oh + "px");
      }
      stage("pulling");
      void bk.offsetWidth;
      btn.classList.add("is-out");
      btn.setAttribute("aria-expanded", "true");
      document.documentElement.classList.add("bko-lock");
      ov.classList.add("is-on");
      closeBtn.focus({ preventScroll: true });
      later(function () {
        stage("facing");
        later(function () {
          stage("opening");
          later(function () { stage("open"); }, 780);
        }, 260);
      }, 90);
    }
    function close() {
      if (ov.hidden || closing) return;
      closing = true;
      clearTimers();
      stage("closing-content");
      later(function () {
        stage("closing-cover");
        later(function () {
          ov.classList.add("is-shrinking");
          later(function () {
            stage("returning");
            ov.classList.remove("is-on");
            later(finish, 340);
          }, 420);
        }, 470);
      }, 210);
    }
    function finish() {
      ov.hidden = true;
      ov.classList.remove("is-shrinking", "is-mobile");
      ov.removeAttribute("data-stage");
      pagesEl.innerHTML = "";
      document.documentElement.classList.remove("bko-lock");
      if (opener) {
        opener.classList.remove("is-out");
        opener.setAttribute("aria-expanded", "false");
        opener.focus({ preventScroll: true });
      }
      closing = false; turning = false;
    }
    function turn(dir) {
      if (!mobile || turning || closing || ov.getAttribute("data-stage") !== "open") return;
      var to = page + dir, els = pageEls();
      if (to < 0 || to >= els.length) return;
      turning = true;
      stage("turning");
      var cur = els[page], nxt = els[to], hadFocus = cur.contains(document.activeElement);
      nxt.removeAttribute("inert");
      cur.classList.add("is-turning", dir > 0 ? "turn-out-f" : "turn-out-b");
      nxt.classList.add("is-turning", dir > 0 ? "turn-in-f" : "turn-in-b");
      later(function () {
        cur.classList.remove("is-turning", "turn-out-f", "turn-out-b");
        nxt.classList.remove("is-turning", "turn-in-f", "turn-in-b");
        setActive(to);
        nxt.scrollTop = 0;
        stage("open");
        turning = false;
        if (hadFocus) { var f = nxt.querySelector("button, a[href]"); if (f) f.focus({ preventScroll: true }); }
      }, 380);
    }
    shelfEl.querySelectorAll(".sb-btn").forEach(function (btn) {
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () { open(btn); });
    });
    document.querySelectorAll("[data-open-book]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var btn = shelfEl.querySelector('.sb-btn[data-book="' + a.getAttribute("data-open-book") + '"]');
        if (!btn) return;
        e.preventDefault();
        shelfEl.scrollIntoView({ block: "center", behavior: "instant" });
        requestAnimationFrame(function () { open(btn); });
      });
    });
    closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", close);
    pagesEl.addEventListener("click", function (e) {
      if (e.target.closest("[data-next]")) turn(1);
      if (e.target.closest("[data-prev]")) turn(-1);
    });
    var sx = 0, sy = 0, tracking = false;
    pagesEl.addEventListener("touchstart", function (e) {
      if (!mobile || e.touches.length !== 1) return;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
    }, { passive: true });
    pagesEl.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy)) return;
      turn(dx < 0 ? 1 : -1);
    }, { passive: true });
    ov.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      var f = [].filter.call(dlg.querySelectorAll("a[href], button:not([disabled])"), function (el) {
        return !el.closest("[inert]") && el.offsetParent !== null && getComputedStyle(el).visibility !== "hidden";
      });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || !dlg.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || !dlg.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
    });
  })();

  // shipped crate: cards rise out of the box
  var crate = document.querySelector("[data-crate]");
  if (crate && !reduce) { crate.classList.add("packed"); onView(crate, function () { requestAnimationFrame(function () { crate.classList.remove("packed"); }); }, 0.3); }

  // toolbox: the box opens and the chips pop out
  var tbox = document.querySelector("[data-tbox]");
  if (tbox && !reduce) { tbox.classList.add("closed"); onView(tbox, function () { setTimeout(function () { tbox.classList.remove("closed"); }, 150); }, 0.3); }

  // journey map: route draws stop by stop; click a stop or a pin, or let it play
  var jr = document.querySelector("[data-journey]");
  if (jr) {
    var route = jr.querySelector("#route-draw"), pinsEl = jr.querySelectorAll(".pin"), stopsEl = jr.querySelectorAll(".stop");
    var ctr = jr.querySelector(".j-controls"), playBtn = jr.querySelector(".j-play");
    var total = route.getTotalLength(), lens = [];
    pinsEl.forEach(function (pin) {
      var t = pin.getAttribute("transform").match(/translate\(([\d.]+),([\d.]+)\)/), px = +t[1], py = +t[2], best = 0, bd = 1e9;
      for (var L = 0; L <= total; L += total / 600) { var q = route.getPointAtLength(L), d = (q.x - px) * (q.x - px) + (q.y - py) * (q.y - py); if (d < bd) { bd = d; best = L; } }
      lens.push(best);
    });
    route.style.strokeDasharray = total + " " + total;
    var at = 0, timer2 = null, playing = false;
    function setStop(i) {
      at = i;
      route.style.strokeDashoffset = String(total - lens[i]);
      pinsEl.forEach(function (p, j) { p.classList.toggle("done", j < i); p.classList.toggle("active", j === i); });
      stopsEl.forEach(function (li, j) { var on = j === i; li.classList.toggle("is-active", on); li.querySelector(".stop-head").setAttribute("aria-expanded", String(on)); });
    }
    function stop() { playing = false; clearInterval(timer2); playBtn.textContent = "Play"; }
    function play() {
      playing = true; playBtn.textContent = "Pause";
      if (at >= lens.length - 1) setStop(0);
      clearInterval(timer2);
      timer2 = setInterval(function () { if (at < lens.length - 1) setStop(at + 1); else stop(); }, 2400);
    }
    ctr.hidden = false;
    stopsEl.forEach(function (li, j) { li.querySelector(".stop-head").addEventListener("click", function () { stop(); setStop(j); }); });
    pinsEl.forEach(function (p, j) { p.addEventListener("click", function () { stop(); setStop(j); }); });
    jr.querySelector(".j-prev").addEventListener("click", function () { stop(); setStop(Math.max(0, at - 1)); });
    jr.querySelector(".j-next").addEventListener("click", function () { stop(); setStop(Math.min(lens.length - 1, at + 1)); });
    playBtn.addEventListener("click", function () { playing ? stop() : play(); });
    if (reduce) { route.style.transition = "none"; setStop(lens.length - 1); playBtn.textContent = "Play"; }
    else { route.style.strokeDashoffset = String(total); setStop(0); playBtn.textContent = "Play"; onView(jr, function () { play(); }, 0.35); }
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
