// Mobile menu
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  navToggle.innerHTML = nav.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  })
);

// Header shadow on scroll
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
});
const setActive = (id) =>
  links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));

// Active nav link based on section in view
const links = [...nav.querySelectorAll("a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      setActive(window.scrollY < 150 ? "home" : entry.target.id);
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => s && navObserver.observe(s));

// Reveal-on-scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Skill bars
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll(".bar b").forEach((b) => (b.style.width = b.dataset.w + "%"));
      skillObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.3 }
);
skillObserver.observe(document.querySelector(".skill-list"));

// Stat counters
document.querySelectorAll("[data-count]").forEach((el) => {
  const target = +el.dataset.count;
  const duration = 1500;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

// Testimonial slider
const track = document.getElementById("tTrack");
const cards = track.children;
let index = 0;
const perView = () => (window.innerWidth <= 600 ? 1 : 2);
const update = () => {
  const max = Math.max(cards.length - perView(), 0);
  index = Math.min(Math.max(index, 0), max);
  const step = cards[0].offsetWidth + 16;
  track.style.transform = `translateX(-${index * step}px)`;
};
document.getElementById("nextT").addEventListener("click", () => {
  index = index >= cards.length - perView() ? 0 : index + 1;
  update();
});
document.getElementById("prevT").addEventListener("click", () => {
  index = index <= 0 ? cards.length - perView() : index - 1;
  update();
});
window.addEventListener("resize", update);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Placeholder links (href="#") do nothing until a real URL is added
document.querySelectorAll('a[href="#"]').forEach((a) =>
  a.addEventListener("click", (e) => e.preventDefault())
);
