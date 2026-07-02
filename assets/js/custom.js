(function () {
  "use strict";

  var SITE_NAME = "sjq's page";
  var GITHUB_URL = "https://github.com/sunqqw/sunqqw.github.io";

  function initHomepage() {
    var heroSubtitle = document.querySelector(".hero__subtitle");
    if (heroSubtitle && /Dinosaurs|cool/i.test(heroSubtitle.textContent)) {
      heroSubtitle.textContent = "记录技术思考与生活点滴";
    }

    var heroBtn = document.querySelector(".hero .button");
    if (heroBtn && /Docusaurus Tutorial/i.test(heroBtn.textContent)) {
      heroBtn.textContent = "阅读博客 →";
      heroBtn.setAttribute("href", "/blog");
    }

    var banner = document.getElementById("docusaurus-base-url-issue-banner-container");
    if (banner) banner.innerHTML = "";

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && /Description will go into/i.test(metaDesc.content)) {
      metaDesc.content = "sjq's page — 个人博客与技术笔记";
    }
  }

  function initBranding() {
    var title = document.querySelector(".navbar__title");
    if (title) title.textContent = SITE_NAME;

    document.querySelectorAll('.navbar__logo img[alt="My Site Logo"]').forEach(
      function (img) {
        img.alt = SITE_NAME + " Logo";
      }
    );

    document.querySelectorAll('a[href="https://github.com/facebook/docusaurus"]').forEach(
      function (link) {
        link.href = GITHUB_URL;
      }
    );

    var sidebarTitle = document.querySelector(".sidebarItemTitle_pO2u");
    if (sidebarTitle && sidebarTitle.textContent.trim() === "Recent posts") {
      sidebarTitle.textContent = "最近文章";
    }

    var copyright = document.querySelector(".footer__copyright");
    if (copyright) {
      copyright.textContent =
        "Copyright © " + new Date().getFullYear() + " sunqqw.github.io";
    }
  }

  function initThemeToggle() {
    var btn = document.querySelector(".colorModeToggle_DEke button");
    if (!btn) return;

    btn.removeAttribute("disabled");
    btn.classList.remove("toggleButtonDisabled_aARS");

    function getTheme() {
      return document.documentElement.getAttribute("data-theme") || "light";
    }

    function setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("theme", theme);
      } catch (e) {}
      var label =
        theme === "dark"
          ? "切换浅色/暗黑模式（当前为暗黑模式）"
          : "切换浅色/暗黑模式（当前为浅色模式）";
      btn.title = label;
      btn.setAttribute("aria-label", label);
    }

    btn.addEventListener("click", function () {
      setTheme(getTheme() === "dark" ? "light" : "dark");
    });
  }

  function initReadingProgress() {
    if (!document.querySelector(".blog-post-page")) return;

    var bar = document.createElement("div");
    bar.id = "reading-progress";
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", "100");
    document.body.appendChild(bar);

    function update() {
      var scrollTop = window.scrollY;
      var docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      bar.style.width = pct + "%";
      bar.setAttribute("aria-valuenow", Math.round(pct));
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initTableOfContents() {
    var content = document.getElementById("post-content");
    var sidebar = document.querySelector(".blog-post-page aside nav.sidebar_re4s");
    if (!content || !sidebar) return;

    var headings = content.querySelectorAll("h2, h3");
    if (headings.length < 2) return;

    var toc = document.createElement("nav");
    toc.id = "post-toc";
    toc.setAttribute("aria-label", "文章目录");

    var title = document.createElement("div");
    title.className = "toc-title";
    title.textContent = "目录";
    toc.appendChild(title);

    var list = document.createElement("ul");
    var links = [];

    headings.forEach(function (heading, i) {
      if (!heading.id) heading.id = "section-" + i;
      var li = document.createElement("li");
      if (heading.tagName === "H3") li.className = "toc-h3";
      var a = document.createElement("a");
      a.href = "#" + heading.id;
      a.textContent = heading.textContent;
      li.appendChild(a);
      list.appendChild(li);
      links.push({ el: a, target: heading });
    });

    toc.appendChild(list);
    sidebar.appendChild(toc);

    function updateActive() {
      var scrollY = window.scrollY + 120;
      var current = links[0];
      links.forEach(function (item) {
        if (item.target.offsetTop <= scrollY) current = item;
      });
      links.forEach(function (item) {
        item.el.classList.toggle("active", item === current);
      });
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  }

  function initBackToTop() {
    var btn = document.createElement("button");
    btn.id = "back-to-top";
    btn.setAttribute("aria-label", "回到顶部");
    btn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(btn);

    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true }
    );

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function init() {
    initBranding();
    initHomepage();
    initThemeToggle();
    initReadingProgress();
    initTableOfContents();
    initBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
