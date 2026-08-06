document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle functionality
  const toggleBtn = document.getElementById("themeToggle");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });

  // Contact form submission handling
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent =
      "Thank you for contacting Trailbridge Consulting Services! We will get back to you shortly.";
    status.style.color = "#10B981";
    form.reset();
  });
});
