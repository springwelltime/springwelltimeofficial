/* =========================================================
   SPRINGWELL TIME — SITE SCRIPT
   Shared header/footer, language switching, WhatsApp links,
   placeholders, hero slider, brand + collection rendering.
   ========================================================= */
(function () {
  "use strict";

  var S = window.SITE;
  var DICT = window.I18N;
  var DATA = window.CATALOG;
  var LANGS = [
    { code: "en", label: "EN" },
    { code: "ms", label: "BM" },
    { code: "zh", label: "中文" }
  ];
  var lang = "en";
  var renderers = [];

  /* ---------- i18n ---------- */
  function t(key, vars) {
    var s = (DICT[lang] && DICT[lang][key]) || DICT.en[key];
    if (s == null) return key;
    if (vars) s = s.replace(/\{(\w+)\}/g, function (_, k) { return vars[k] != null ? vars[k] : ""; });
    return s;
  }
  function pick(obj) { return obj ? (obj[lang] || obj.en) : ""; }

  function detectLang() {
    var q = new URLSearchParams(location.search).get("lang");
    var stored = null;
    try { stored = localStorage.getItem("sw-lang"); } catch (e) {}
    var c = q || stored || "en";
    return DICT[c] ? c : "en";
  }

  function applyI18n(root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    root.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":");
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    root.querySelectorAll("[data-site]").forEach(function (el) {
      el.textContent = S[el.getAttribute("data-site")] || "";
    });
  }

  function setLang(code) {
    if (!DICT[code]) return;
    lang = code;
    try { localStorage.setItem("sw-lang", code); } catch (e) {}
    document.documentElement.lang = code === "zh" ? "zh" : code;
    var titleKey = document.body.getAttribute("data-title");
    if (titleKey) document.title = t(titleKey) + " | " + S.name;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === code));
    });
    applyI18n();
    renderers.forEach(function (fn) { fn(); });
    wireWhatsApp();
  }

  /* ---------- WhatsApp ---------- */
  function waUrl(text) {
    return "https://wa.me/" + S.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  function wireWhatsApp(root) {
    (root || document).querySelectorAll("[data-wa]").forEach(function (a) {
      var key = a.getAttribute("data-wa") || "wa.general";
      var vars = { brand: a.dataset.brand || "", name: a.dataset.name || "" };
      a.href = waUrl(t(key, vars));
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---------- Icons ---------- */
  var ICON = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4A20 20 0 0 0 14.3 4c-2.2 0-3.7 1.3-3.7 3.8v2.7H8v3h2.6V21z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/></svg>',
    battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><path d="M12 10v4M10 12h4"/></svg>',
    strap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 2h8v6H8zM8 16h8v6H8z"/><circle cx="12" cy="12" r="4.5"/><path d="M12 22v-3M12 5V2"/></svg>',
    bracelet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 2h8M8 5h8M8 19h8M8 22h8"/><circle cx="12" cy="12" r="4.5"/><path d="M19 9l2 3-2 3M5 9l-2 3 2 3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M8.5 12.5l2.3 2.3 4.7-5"/></svg>'
  };
  window.SW_ICON = ICON;

  /* ---------- Placeholder watch drawing ---------- */
  function watchSVG(variant) {
    var ticks = "";
    for (var i = 0; i < 12; i++) {
      var major = i % 3 === 0;
      ticks += '<line x1="100" y1="' + (major ? 76 : 78) + '" x2="100" y2="' + (major ? 88 : 84) + '" stroke-width="' + (major ? 2.4 : 1.2) + '" transform="rotate(' + i * 30 + ' 100 120)"/>';
    }
    var bezel = "";
    if (variant === 1) {
      for (var j = 0; j < 60; j++) {
        bezel += '<line x1="100" y1="64" x2="100" y2="' + (j % 5 === 0 ? 70 : 67) + '" stroke-width=".8" transform="rotate(' + j * 6 + ' 100 120)"/>';
      }
    }
    var sub = variant === 2
      ? '<circle cx="100" cy="100" r="9" stroke-width=".8"/><circle cx="84" cy="128" r="9" stroke-width=".8"/><circle cx="116" cy="128" r="9" stroke-width=".8"/>'
      : "";
    return '<svg class="ph__watch" viewBox="0 0 200 240" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
      '<path d="M74 6h52l5 58H69z" fill="currentColor" fill-opacity=".10"/>' +
      '<path d="M69 176h62l-5 58H74z" fill="currentColor" fill-opacity=".10"/>' +
      '<rect x="157" y="112" width="9" height="16" rx="2" fill="currentColor" fill-opacity=".2"/>' +
      '<circle cx="100" cy="120" r="60" fill="currentColor" fill-opacity=".08"/>' +
      '<circle cx="100" cy="120" r="52"/>' + bezel + ticks + sub +
      '<line x1="100" y1="120" x2="100" y2="94" stroke-width="3" stroke-linecap="round" transform="rotate(305 100 120)"/>' +
      '<line x1="100" y1="120" x2="100" y2="80" stroke-width="2" stroke-linecap="round" transform="rotate(58 100 120)"/>' +
      '<line x1="100" y1="130" x2="100" y2="76" stroke="#b8955a" stroke-width="1" transform="rotate(200 100 120)"/>' +
      '<circle cx="100" cy="120" r="3" fill="#b8955a" stroke="none"/>' +
      "</svg>";
  }

  function fillPlaceholders(root) {
    (root || document).querySelectorAll(".ph:not([data-done])").forEach(function (el) {
      el.setAttribute("data-done", "");
      var img = el.getAttribute("data-img");
      if (img) {
        var i = new Image();
        i.src = img;
        i.alt = el.getAttribute("data-alt") || "";
        i.loading = "lazy";
        el.appendChild(i);
        return;
      }
      el.insertAdjacentHTML("afterbegin", watchSVG(Number(el.getAttribute("data-variant") || 0)));
      var label = el.getAttribute("data-ph");
      if (label) el.insertAdjacentHTML("beforeend", '<span class="ph__tag">' + label + "</span>");
    });
  }

  /* ---------- Shell: header, drawer, footer ---------- */
  // Main menu: 3 tabs. The 4th item of an entry lists its drop-down pages.
  var NAV = [
    ["index.html", "nav.home", "home"],
    ["brands.html", "nav.brands", "brands", [
      ["services.html", "nav.services", "services"]
    ]],
    ["about.html", "nav.about", "about", [
      ["visit.html", "nav.visit", "visit"],
      ["contact.html", "nav.contact", "contact"]
    ]]
  ];

  function langButtons() {
    return LANGS.map(function (l) {
      return '<button type="button" data-lang="' + l.code + '" aria-pressed="false">' + l.label + "</button>";
    }).join("");
  }

  function navLink(n, page, cls) {
    return '<a href="' + n[0] + '"' + (cls ? ' class="' + cls + '"' : "") +
      (n[2] === page ? ' aria-current="page"' : "") + ' data-i18n="' + n[1] + '"></a>';
  }

  // Menu with drop-downs (header + mobile drawer)
  function navLinks(page) {
    return NAV.map(function (n) {
      var kids = n[3];
      if (!kids) return "<li>" + navLink(n, page) + "</li>";
      var inSection = n[2] === page || kids.some(function (k) { return k[2] === page; });
      return '<li class="has-sub' + (inSection ? " is-section" : "") + '">' + navLink(n, page, "has-sub__link") +
        '<ul class="sub">' + kids.map(function (k) { return "<li>" + navLink(k, page) + "</li>"; }).join("") + "</ul></li>";
    }).join("");
  }

  // Flat list of every page except Home (footer)
  function flatLinks() {
    var out = [];
    NAV.forEach(function (n) {
      if (n[2] !== "home") out.push(n);
      (n[3] || []).forEach(function (k) { out.push(k); });
    });
    return out.map(function (n) { return "<li>" + navLink(n, "") + "</li>"; }).join("");
  }

  function logo() {
    return '<a class="logo" href="index.html" aria-label="Springwell Time — home">' +
      '<span class="logo__mark">SPRINGWELL</span></a>';
  }

  function buildShell() {
    var page = document.body.getAttribute("data-page");

    var header =
      '<a class="sr-only" href="#main" data-i18n="a11y.skip"></a>' +
      '<div class="topbar"><div class="wrap">' +
        '<div class="topbar__info"><b data-i18n="top.open"></b> ' + S.hours + '<span class="hide-sm"> &nbsp;·&nbsp; ' + S.mall + " " + S.units.join(" &amp; ") + "</span></div>" +
        '<div class="lang" role="group" aria-label="Language">' + langButtons() + "</div>" +
      "</div></div>" +
      '<header class="header"><div class="wrap header__row">' +
        '<div class="header__left"><button class="menu-btn" type="button" aria-label="Menu" aria-controls="drawer" aria-expanded="false"><span></span></button></div>' +
        logo() +
        '<div class="header__right"><a class="header-wa" data-wa="wa.general" href="#">' + ICON.wa + '<span data-i18n="cta.contactUs"></span></a></div>' +
      "</div>" +
      '<nav class="nav" aria-label="Main"><ul>' + navLinks(page) + "</ul></nav>" +
      "</header>" +
      '<div class="drawer" id="drawer" aria-hidden="true"><div class="drawer__scrim"></div>' +
        '<div class="drawer__panel" role="dialog" aria-label="Menu">' +
          '<button class="drawer__close" type="button" aria-label="Close">×</button>' +
          '<ul>' + navLinks(page) + "</ul>" +
          '<a class="btn btn--gold" data-wa="wa.general" href="#">' + ICON.wa + '<span data-i18n="cta.whatsapp"></span></a>' +
          '<div class="lang" role="group" aria-label="Language" style="margin-top:28px">' + langButtons() + "</div>" +
        "</div></div>";

    var year = new Date().getFullYear();
    var footer =
      '<footer class="footer"><div class="wrap">' +
        '<div class="footer__grid">' +
          "<div>" + logo() +
            '<p class="footer__about" data-i18n="footer.about"></p>' +
            '<div class="socials">' +
              '<a href="' + S.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICON.ig + "</a>" +
              '<a href="' + S.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICON.fb + "</a>" +
              '<a data-wa="wa.general" href="#" aria-label="WhatsApp">' + ICON.wa + "</a>" +
            "</div></div>" +
          '<div><h4 data-i18n="footer.explore"></h4><ul>' + flatLinks() + "</ul></div>" +
          '<div><h4 data-i18n="footer.visit"></h4><ul>' +
            "<li>" + S.mall + '</li><li><span data-i18n="visit.units"></span> ' + S.units.join(" &amp; ") + "</li><li>Bandar Hilir, Melaka</li>" +
            '<li><a class="link-arrow" style="color:inherit;margin-top:6px" href="visit.html" data-i18n="cta.directions"></a></li></ul></div>' +
          '<div><h4 data-i18n="footer.hours"></h4><ul><li data-i18n="footer.everyday"></li><li>' + S.hours + "</li>" +
            '<li style="margin-top:10px"><a data-wa="wa.general" href="#">WhatsApp ' + S.phoneDisplay + "</a></li>" +
            (S.phone ? '<li><a href="tel:' + S.phoneTel + '">Tel ' + S.phone + "</a></li>" : "") +
            (S.email ? '<li><a href="mailto:' + S.email + '">' + S.email + "</a></li>" : "") +
          "</ul></div>" +
        "</div>" +
        '<div class="footer__bottom"><span>© ' + year + " " + S.name + '. <span data-i18n="footer.rights"></span></span><span data-i18n="footer.tm"></span></div>' +
      "</div></footer>" +
      '<a class="wa-float" data-wa="wa.general" href="#" aria-label="WhatsApp">' + ICON.wa + '<span data-i18n="cta.chat"></span></a>';

    document.body.insertAdjacentHTML("afterbegin", header);
    document.body.insertAdjacentHTML("beforeend", footer);

    // language buttons
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.dataset.lang); });
    });

    // drawer
    var drawer = document.getElementById("drawer");
    var menuBtn = document.querySelector(".menu-btn");
    function toggle(open) {
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      menuBtn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }
    menuBtn.addEventListener("click", function () { toggle(true); });
    drawer.querySelector(".drawer__close").addEventListener("click", function () { toggle(false); });
    drawer.querySelector(".drawer__scrim").addEventListener("click", function () { toggle(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  }

  /* ---------- Hero slider ---------- */
  function initSlider() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var slides = hero.querySelectorAll(".hero__slide");
    var bar = hero.querySelector(".hero__progress");
    var MS = 6500;
    var idx = 0, timer = null;
    hero.style.setProperty("--slide-ms", MS + "ms");
    bar.innerHTML = Array.prototype.map.call(slides, function (_, i) {
      return '<button type="button" aria-label="Slide ' + (i + 1) + '"><i></i></button>';
    }).join("");
    var dots = bar.querySelectorAll("button");

    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle("is-active", i === idx);
        s.setAttribute("aria-hidden", String(i !== idx));
      });
      dots.forEach(function (d, i) {
        d.classList.remove("is-active");
        d.classList.toggle("is-done", i < idx);
        void d.offsetWidth; // restart animation
        if (i === idx) d.classList.add("is-active");
      });
      clearTimeout(timer);
      timer = setTimeout(function () { go(idx + 1); }, MS);
    }
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });
    hero.querySelector(".hero__ctrl--prev").addEventListener("click", function () { go(idx - 1); });
    hero.querySelector(".hero__ctrl--next").addEventListener("click", function () { go(idx + 1); });

    var x0 = null;
    hero.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (x0 == null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    go(0);
  }

  /* ---------- Catalog rendering ---------- */
  function brandByKey(k) {
    for (var i = 0; i < DATA.brands.length; i++) if (DATA.brands[i].key === k) return DATA.brands[i];
    return null;
  }

  function productCard(p) {
    var b = brandByKey(p.brand);
    var media = '<div class="ph ratio-4-5" data-variant="' + (p.variant || 0) + '"' +
      (p.image ? ' data-img="' + p.image + '" data-alt="' + b.name + " " + p.name + '"' : "") + ">" +
      (p.isNew ? '<span class="badge">' + t("badge.new") + "</span>" : "") + "</div>";
    return '<article class="product reveal">' + media +
      '<p class="product__brand">' + b.name + "</p>" +
      '<h3 class="product__name">' + p.name + "</h3>" +
      '<p class="product__meta">' + t("style." + p.style) + " · " + t("mv." + p.movement) + "</p>" +
      '<a class="link-arrow product__cta" data-wa="wa.product" data-brand="' + b.name + '" data-name="' + p.name + '" href="#">' + t("cta.enquire") + "</a>" +
      "</article>";
  }

  function renderMarquee() {
    var el = document.querySelector("[data-render=marquee]");
    if (!el) return;
    var items = DATA.brands.map(function (b) {
      return '<a href="brands.html#' + b.key + '">' + b.name + "</a>";
    }).join("");
    el.innerHTML = '<div class="marquee__track">' + items + items + "</div>";
  }

  function renderFeatured() {
    var el = document.querySelector("[data-render=featured]");
    if (!el) return;
    el.innerHTML = DATA.products.filter(function (p) { return p.featured; }).slice(0, 4).map(productCard).join("");
    afterRender(el);
  }

  function renderBrands() {
    var el = document.querySelector("[data-render=brands]");
    if (!el) return;
    el.innerHTML = DATA.brands.map(function (b) {
      return '<article class="brand-tile reveal" id="' + b.key + '">' +
        '<h2 class="brand-tile__name">' + b.name + "</h2>" +
        '<p class="brand-tile__meta">' + pick(b.origin) + " · " + t("brands.since") + " " + b.since + "</p>" +
        "<p>" + pick(b.blurb) + "</p>" +
        "</article>";
    }).join("");
    afterRender(el);
  }

  var filterState = { brand: "all", style: "all" };
  function initCollection() {
    var grid = document.querySelector("[data-render=collection]");
    if (!grid) return;
    var q = new URLSearchParams(location.search).get("brand");
    if (q && brandByKey(q)) filterState.brand = q;

    var chips = document.querySelector("[data-render=brand-chips]");
    var select = document.querySelector("#style-filter");
    var count = document.querySelector("[data-render=count]");

    function drawChips() {
      chips.innerHTML = '<button class="chip" type="button" data-b="all">' + t("filter.all") + "</button>" +
        DATA.brands.map(function (b) {
          return '<button class="chip" type="button" data-b="' + b.key + '">' + b.name + "</button>";
        }).join("");
      chips.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.dataset.b === filterState.brand));
        c.addEventListener("click", function () {
          filterState.brand = c.dataset.b;
          var url = new URL(location.href);
          if (filterState.brand === "all") url.searchParams.delete("brand");
          else url.searchParams.set("brand", filterState.brand);
          history.replaceState(null, "", url);
          drawChips(); drawGrid();
        });
      });
      select.innerHTML = ["all", "dress", "sport", "diver", "chrono"].map(function (s) {
        return '<option value="' + s + '"' + (s === filterState.style ? " selected" : "") + ">" +
          (s === "all" ? t("filter.allStyles") : t("style." + s)) + "</option>";
      }).join("");
    }
    function drawGrid() {
      var list = DATA.products.filter(function (p) {
        return (filterState.brand === "all" || p.brand === filterState.brand) &&
          (filterState.style === "all" || p.style === filterState.style);
      });
      grid.innerHTML = list.length ? list.map(productCard).join("") :
        '<p class="empty">' + t("filter.empty") + "</p>";
      count.textContent = t("filter.count", { n: list.length });
      afterRender(grid);
    }
    select.addEventListener("change", function () { filterState.style = select.value; drawGrid(); });
    renderers.push(function () { drawChips(); drawGrid(); });
  }

  /* ---------- Contact form → WhatsApp ---------- */
  function initForm() {
    var form = document.querySelector("#enquiry");
    if (!form) return;
    var topic = form.querySelector("#f-topic");
    function drawTopics() {
      var cur = topic.value;
      topic.innerHTML = ["buy", "service", "battery", "strap", "other"].map(function (k) {
        return '<option value="' + k + '">' + t("form.topic." + k) + "</option>";
      }).join("");
      if (cur) topic.value = cur;
    }
    renderers.push(drawTopics);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#f-name").value.trim();
      var msg = form.querySelector("#f-msg").value.trim();
      var text = t("wa.form", {
        name: name || "-",
        topic: topic.options[topic.selectedIndex].text,
        msg: msg || "-"
      });
      window.open(waUrl(text), "_blank", "noopener");
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;

  function observe(root) {
    (root || document).querySelectorAll(".reveal:not(.is-in)").forEach(function (el) {
      if (io) io.observe(el); else el.classList.add("is-in");
    });
  }
  function afterRender(root) {
    fillPlaceholders(root);
    wireWhatsApp(root);
    observe(root);
  }

  /* ---------- Map ---------- */
  function initMap() {
    document.querySelectorAll("[data-map]").forEach(function (f) {
      f.src = "https://www.google.com/maps?q=" + encodeURIComponent(S.mapQuery) + "&output=embed";
    });
    document.querySelectorAll("[data-directions]").forEach(function (a) {
      a.href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(S.mapQuery);
      a.target = "_blank"; a.rel = "noopener";
    });
    document.querySelectorAll("[data-tel]").forEach(function (a) {
      a.href = "tel:" + S.phoneTel;
      a.textContent = S.phone;
    });
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      el.innerHTML = ICON[el.getAttribute("data-icon")] || "";
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    lang = detectLang();
    buildShell();
    renderers.push(renderMarquee, renderFeatured, renderBrands);
    initCollection();
    initForm();
    initMap();
    setLang(lang);
    fillPlaceholders();
    initSlider();
    observe();
  });
})();
