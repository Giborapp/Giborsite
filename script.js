const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const revealItems = document.querySelectorAll(".reveal");
const faqItems = document.querySelectorAll(".faq-list details");
const waitlistForm = document.querySelector("#waitlist-form");
const formFeedback = document.querySelector("#form-feedback");
const toast = document.querySelector("#toast");

const logoImg = document.querySelector("#logo-img");
const logoText = document.querySelector("#logo-text");
const heroLogo = document.querySelector("#hero-logo");

function setupLogoFallback(imageEl, textEl) {
  if (!imageEl) return;

  const fallbackSource = imageEl.src.includes("logo.png")
    ? "assets/logo-gibor.png"
    : "assets/logo.png";
  let triedFallbackSource = false;

  imageEl.addEventListener("error", () => {
    if (!triedFallbackSource) {
      triedFallbackSource = true;
      imageEl.src = fallbackSource;
      return;
    }

    imageEl.hidden = true;
    if (textEl) textEl.hidden = false;
  });
}

function closeMenu() {
  if (!menu || !menuBtn) return;
  menu.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!menu.contains(target) && !menuBtn.contains(target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;

        window.setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, index * 80);

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (waitlistForm && formFeedback) {
  waitlistForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!waitlistForm.checkValidity()) {
      formFeedback.textContent = "Revise os campos obrigatórios antes de enviar.";
      return;
    }

    formFeedback.textContent = "Recebido! Vamos te avisar em breve.";
    showToast("Recebido! Vamos te avisar em breve.");
    waitlistForm.reset();
  });
}

setupLogoFallback(logoImg, logoText);
setupLogoFallback(heroLogo);
