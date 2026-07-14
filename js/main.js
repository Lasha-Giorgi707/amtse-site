/* ამწე — nav, scroll-scrub video, reveals, gallery playback, contact form */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Header state + mobile nav ---------- */
  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 24 || header.classList.contains("is-static")
    );
  }
  // contact page keeps the solid header permanently
  if (header && header.classList.contains("is-scrolled")) {
    header.classList.add("is-static");
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "მენიუს დახურვა" : "მენიუს გახსნა");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll reveals (enhancement; content visible without JS) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ---------- Gallery videos: play only while visible ---------- */
  var galleryVideos = document.querySelectorAll("[data-gallery] video");
  if ("IntersectionObserver" in window && galleryVideos.length) {
    var videoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          if (entry.isIntersecting) {
            v.play().catch(function () {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.35 }
    );
    galleryVideos.forEach(function (v) {
      videoObserver.observe(v);
    });
  }

  /* ---------- Scroll-scrub video (Apple-style pinned section) ---------- */
  var scrubSection = document.querySelector("[data-scrub]");
  if (scrubSection) {
    var scrubVideo = scrubSection.querySelector("video");
    var steps = scrubSection.querySelectorAll("[data-scrub-steps] li");
    var canScrub = window.matchMedia(
      "(min-width: 801px) and (prefers-reduced-motion: no-preference)"
    ).matches;

    if (!canScrub) {
      // small screens / reduced motion: plain looping video, no pinned runway
      scrubSection.classList.add("is-static");
      scrubVideo.loop = true;
      scrubVideo.autoplay = true;
      scrubVideo.play().catch(function () {});
      steps.forEach(function (li) {
        li.classList.add("is-active");
      });
    } else {
      var current = 0; // smoothed playhead, 0..1
      var target = 0; // raw scroll progress, 0..1
      var rafId = null;

      var updateTarget = function () {
        var rect = scrubSection.getBoundingClientRect();
        var runway = scrubSection.offsetHeight - window.innerHeight;
        if (runway <= 0) return;
        target = Math.min(1, Math.max(0, -rect.top / runway));
      };

      var setStep = function (progress) {
        var active = progress < 0.34 ? 0 : progress < 0.72 ? 1 : 2;
        steps.forEach(function (li, i) {
          li.classList.toggle("is-active", i === active);
        });
      };

      var tick = function () {
        // lerp toward the scroll target so sparse-keyframe video still reads smooth
        current += (target - current) * 0.14;
        if (Math.abs(target - current) < 0.0005) current = target;
        var duration = scrubVideo.duration || 0;
        if (duration > 0 && scrubVideo.readyState >= 2) {
          var t = current * Math.max(0, duration - 0.05);
          if (Math.abs(scrubVideo.currentTime - t) > 0.01) {
            scrubVideo.currentTime = t;
          }
        }
        setStep(current);
        rafId = requestAnimationFrame(tick);
      };

      // only run the rAF loop while the section is on screen
      var scrubObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              updateTarget();
              current = target; // jump, don't animate, on (re)entry
              if (rafId === null) rafId = requestAnimationFrame(tick);
            } else if (rafId !== null) {
              cancelAnimationFrame(rafId);
              rafId = null;
            }
          });
        },
        { rootMargin: "10% 0px" }
      );
      scrubObserver.observe(scrubSection);

      window.addEventListener("scroll", updateTarget, { passive: true });
      window.addEventListener("resize", updateTarget);
      updateTarget();
    }
  }

  /* ---------- Contact form (static site: endpoint not wired yet) ---------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var notice = form.querySelector("[data-form-notice]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      // TODO: wire to a real endpoint (Formspree/Basin/own backend) and remove the notice
      if (notice) {
        notice.classList.add("is-visible");
        notice.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
