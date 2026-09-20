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
