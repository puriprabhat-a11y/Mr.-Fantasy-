(function () {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("dawn-theme");
  if (storedTheme) root.dataset.theme = storedTheme;

  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelectorAll(".site-nav a");

  function updateThemeLabel() {
    if (!themeToggle) return;
    themeToggle.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.textContent = root.dataset.theme === "dark" ? "☀" : "◐";
  }

  updateThemeLabel();

  themeToggle?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("dawn-theme", root.dataset.theme);
    updateThemeLabel();
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll(".faq-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.querySelector("span:last-child").textContent = isOpen ? "-" : "+";
    });
  });

  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  reveals.forEach((el) => observer.observe(el));
})();
