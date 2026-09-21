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
            scrollToActiveLink();
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // 2. Click Handler for instant feedback when tapping a nav item
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      scrollToActiveLink(); // <--- Added here for instant tap response
    });
  });
});

// Function to center the active link inside the scrollable taskbar
function scrollToActiveLink() {
  const activeLink = document.querySelector(".taskbar-link.active");
  const taskbarList = document.querySelector(".taskbar-list");

  if (activeLink && taskbarList) {
    activeLink.scrollIntoView({
      behavior: "smooth",
      inline: "center", // Centers the active link horizontally in the bar
      block: "nearest",
    });
  }
}

document.querySelectorAll(".project-card").forEach((card) => {
  const video = card.querySelector(".preview-video");

  if (!video) return;

  card.addEventListener("mouseenter", () => {
    video.currentTime = 0; // Restart from beginning on entry
    video.play().catch(() => {
      // Handles browser autoplay blocks gracefully if any occur
    });
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0; // Reset back to start frame
  });
});
