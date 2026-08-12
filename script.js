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
  // Sends the message via Web3Forms (https://web3forms.com) — a free
  // third-party form service that emails info@trailbridgecs.co.in directly.
  // The access_key is a hidden field in contact.html's form.
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  // Requires a proper domain with a TLD (e.g. .com, .co.in, .org) —
  // rejects things like "name@gmail" that the browser's native
  // type="email" check alone would otherwise accept.
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  const validateEmail = () => {
    if (!emailInput || !emailError) return true;
    const value = emailInput.value.trim();
    if (!EMAIL_PATTERN.test(value)) {
      emailError.textContent =
        "Please enter a valid email address, e.g. name@example.com";
      emailInput.classList.add("invalid");
      return false;
    }
    emailError.textContent = "";
    emailInput.classList.remove("invalid");
    return true;
  };

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      if (emailError) emailError.textContent = "";
      emailInput.classList.remove("invalid");
    });
    emailInput.addEventListener("blur", validateEmail);
  }

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!validateEmail()) {
        emailInput.focus();
        return;
      }

      status.textContent = "Sending...";
      status.style.color = "";

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Request failed");
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
