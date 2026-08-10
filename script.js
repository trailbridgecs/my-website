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
  // Sends the message via our own /api/contact serverless function, which
  // emails info@trailbridgecs.co.in directly through GoDaddy SMTP.
  // Requires SMTP_USER / SMTP_PASS to be set as Environment Variables in
  // the Vercel project (Project Settings -> Environment Variables).
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "Sending...";
      status.style.color = "";

      const payload = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
      };

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
