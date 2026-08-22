/* Fahrschule Ingo Schröder – Interaktionen (vanilla JS, keine Abhängigkeiten) */
(function () {
  'use strict';

  /* ---------- Mobiles Menü ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    };

    burger.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setNav(false);
        burger.focus();
      }
    });

    // Menü schließen, sobald das Layout wieder Desktop-Breite hat
    var mq = window.matchMedia('(min-width: 941px)');
    var onMq = function (e) { if (e.matches) setNav(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else if (mq.addListener) mq.addListener(onMq);
  }

  /* ---------- Einblenden beim Scrollen ---------- */
  var root = document.documentElement;
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));

  var revealAll = function () {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
    root.classList.remove('js-anim');
  };

  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });

    // Sicherheitsnetz: Sollte der Observer in einer Umgebung gar nicht ausloesen,
    // wird nach kurzer Zeit alles sichtbar geschaltet. Niemals unsichtbare Inhalte.
    window.setTimeout(function () {
      if (!document.querySelector('.reveal.is-in')) revealAll();
    }, 1500);
  } else {
    revealAll();
  }

  /* ---------- Aktiver Navigationspunkt ---------- */
  var sections = [].slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = [].slice.call(document.querySelectorAll('.nav a[href^="#"]'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      // Ganz oben auf der Seite soll kein Menüpunkt markiert sein.
      if (window.scrollY < 120) {
        navLinks.forEach(function (a) { a.classList.remove('is-active'); });
        return;
      }
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Button "nach oben" ---------- */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    var onScroll = function () {
      toTop.classList.toggle('is-on', window.scrollY > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Kontaktformular -> E-Mail-Programm ---------- */
  var form = document.getElementById('kontaktformular');
  var status = document.getElementById('formStatus');
  var EMPFAENGER = 'ingo.schroeder.baunatal@gmail.com';

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var val = function (name) {
        var el = form.elements[name];
        return el && el.value ? el.value.trim() : '';
      };

      var name = val('name');
      var zeilen = [
        'Name: ' + (name || '-'),
        'Firma: ' + (val('firma') || '-'),
        'Straße / Nr.: ' + (val('strasse') || '-'),
        'PLZ / Ort: ' + (val('ort') || '-'),
        'Telefon: ' + (val('telefon') || '-'),
        'Telefax: ' + (val('telefax') || '-'),
        'E-Mail: ' + (val('email') || '-'),
        '',
        'Nachricht:',
        val('nachricht'),
        '',
        '--',
        'Gesendet über das Kontaktformular auf fahrschule-ingo-schroeder.de'
      ];

      var betreff = 'Anfrage über die Website' + (name ? ' – ' + name : '');
      var href = 'mailto:' + EMPFAENGER +
        '?subject=' + encodeURIComponent(betreff) +
        '&body=' + encodeURIComponent(zeilen.join('\n'));

      if (status) {
        status.textContent = 'Euer E-Mail-Programm öffnet sich mit der fertig ausgefüllten Nachricht. Bitte dort noch auf „Senden“ klicken.';
        status.setAttribute('data-state', 'ok');
      }

      window.location.href = href;
    });
  }

  /* ---------- Lesefortschritt oben ---------- */
  var bar = document.querySelector("#progress span");
  if (bar) {
    var updateBar = function () {
      var el = document.documentElement;
      var max = el.scrollHeight - el.clientHeight;
      bar.style.width = (max > 0 ? (el.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", updateBar, { passive: true });
    window.addEventListener("resize", updateBar);
    updateBar();
  }

  /* ---------- Verkehrszeichen im Hero: leichtes Parallax ---------- */
  var signs = [].slice.call(document.querySelectorAll(".hsign"));
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (signs.length && !reduced && window.matchMedia("(min-width: 941px)").matches) {
    var hero = document.querySelector(".hero");
    var mx = 0, my = 0, sy = 0, ticking = false;

    var render = function () {
      signs.forEach(function (el) {
        var d = parseFloat(el.getAttribute("data-depth")) || 12;
        var x = mx * d;
        var y = my * d + sy * (d / 22);
        el.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
      });
      ticking = false;
    };

    var request = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(render); }
    };

    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      request();
    });

    hero.addEventListener("mouseleave", function () { mx = 0; my = 0; request(); });

    window.addEventListener("scroll", function () {
      sy = Math.min(window.scrollY, 900);
      request();
    }, { passive: true });

    request();
  }

  /* ---------- Jahreszahl im Footer ---------- */
  var year = document.getElementById('jahr');
  if (year) year.textContent = new Date().getFullYear();
})();
