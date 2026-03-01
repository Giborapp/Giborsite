const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const revealItems = document.querySelectorAll(".reveal");

function closeMenu() {
  if (!menu || !menuBtn) return;
  menu.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");
}

if (menuBtn && menu) {
  menu.id = "menu-mobile";

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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, index * 90);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));
