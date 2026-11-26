(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  function toggleDrawer(open) {
    var d = document.getElementById("mob-drawer");
    var o = document.getElementById("mob-overlay");
    var t = document.getElementById("mob-toggle");
    if (!d || !o || !t) { return; }
    if (open) {
      d.classList.add("open");
      d.removeAttribute("aria-hidden");
      o.classList.add("visible");
      t.setAttribute("aria-expanded", "true");
      t.setAttribute("aria-label", "Close navigation menu");
      root.style.overflow = "hidden";
    } else {
      d.classList.remove("open");
      d.setAttribute("aria-hidden", "true");
      o.classList.remove("visible");
      t.setAttribute("aria-expanded", "false");
      t.setAttribute("aria-label", "Open navigation menu");
      root.style.overflow = "";
    }
  }

  var toggle = document.getElementById("mob-toggle");
  var closeBtn = document.getElementById("drawer-close");
  var overlay = document.getElementById("mob-overlay");
  var drawer = document.getElementById("mob-drawer");
  if (toggle) {
    toggle.addEventListener("click", function () {
      toggleDrawer(toggle.getAttribute("aria-expanded") !== "true");
    });
  }
  if (closeBtn) { closeBtn.addEventListener("click", function () { toggleDrawer(false); }); }
  if (overlay) { overlay.addEventListener("click", function () { toggleDrawer(false); }); }
  if (drawer) {
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { toggleDrawer(false); });
    });
    drawer.querySelectorAll(".drawer-toggle").forEach(function (b) {
      b.addEventListener("click", function () {
        var sub = document.getElementById(b.getAttribute("aria-controls"));
        var open = b.getAttribute("aria-expanded") === "true";
        b.setAttribute("aria-expanded", open ? "false" : "true");
        if (sub) { sub.classList.toggle("open", !open); }
      });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { toggleDrawer(false); }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) { toggleDrawer(false); }
  });

  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentNode.parentNode;
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  var fab = document.getElementById("call-fab");
  var footer = document.querySelector(".site-footer");
  if (fab) {
    var footerVisible = false;
    if ("IntersectionObserver" in window && footer) {
      new IntersectionObserver(function (entries) {
        footerVisible = entries[0].isIntersecting;
        update();
      }).observe(footer);
    }
    var update = function () {
      fab.classList.toggle("show", window.scrollY > 500 && !footerVisible);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }
})();
