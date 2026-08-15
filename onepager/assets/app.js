document.documentElement.classList.add("motion-ready");

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const open = !navigation.classList.contains("open");
  navigation.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Menü öffnen");
}));

const carousel = document.querySelector(".object-carousel");
document.querySelector(".carousel-prev")?.addEventListener("click", () => carousel?.scrollBy({ left: -carousel.clientWidth * 0.82, behavior: "smooth" }));
document.querySelector(".carousel-next")?.addEventListener("click", () => carousel?.scrollBy({ left: carousel.clientWidth * 0.82, behavior: "smooth" }));

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -7%", threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const contact = document.querySelector("#kontakt");
const contactBar = document.querySelector(".mobile-contact-bar");
if (contact && contactBar) {
  new IntersectionObserver(([entry]) => contactBar.classList.toggle("is-hidden", entry.isIntersecting), { threshold: 0.16 }).observe(contact);
}

if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--ry", `${(x * 4).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}
