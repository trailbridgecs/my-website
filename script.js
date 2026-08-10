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

  // Contact form handler
  // Sends the message via FormSubmit (https://formsubmit.co) — a free
  // service that forwards form submissions to a real inbox with no backend
  // needed. IMPORTANT: the first submission after setup triggers a
  // one-time confirmation email to info@trailbridgecs.co.in — that link
  // must be clicked once before messages start arriving normally.
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "Sending...";
      status.style.color = "";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        status.textContent =
          "Thank you for reaching out to TrailBridge Consulting Services! We will get back to you shortly.";
        status.style.color = "#10B981";
        form.reset();
      } catch (err) {
        status.textContent =
          "Something went wrong sending your message. Please email us directly at info@trailbridgecs.co.in.";
        status.style.color = "#E24B4A";
      }
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
