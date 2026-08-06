document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle
  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // Contact form handler (safely handled if a form is present on the page)
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.textContent =
        "Thank you for reaching out to TrailBridge Consulting Services! We will get back to you shortly.";
      status.style.color = "#10B981";
      form.reset();
    });
  }

  // Scroll-reveal for sections and cards
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // Active nav link highlighting based on scroll position
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length) {
    const setActive = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    };

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  // Back-to-top button
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 600);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
