const taskbar = document.querySelector(".taskbar");

let lastScrollY = window.scrollY;
let isScrolling = false;

window.addEventListener(
  "scroll",
  () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Always show at the very top
        if (currentScrollY <= 10) {
          taskbar.classList.remove("hide");
        }

        // Scrolling DOWN
        else if (currentScrollY > lastScrollY + 5) {
          taskbar.classList.add("hide");
        }

        // Scrolling UP
        else if (currentScrollY < lastScrollY - 5) {
          taskbar.classList.remove("hide");
        }

        lastScrollY = currentScrollY;

        isScrolling = false;
      });

      isScrolling = true;
    }
  },
  { passive: true },
);

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]"); // Ensure your sections have IDs matching the hrefs
  const navLinks = document.querySelectorAll(".taskbar-link");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Triggers when 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});
