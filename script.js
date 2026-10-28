
"use strict";

// =========================
// 1. Mobile Navigation
// =========================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

function closeMenu() {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
    if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMenu();
    }
});

// =========================
// 2. Day / Night Theme
// =========================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

function updateThemeIcon() {
    const isDark = document.body.classList.contains("dark-theme");

    themeIcon.className = isDark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );
}

// Restore the user's theme preference.
try {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
} catch (error) {
    // The website still works if browser storage is unavailable.
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const theme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";

    try {
        localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
        // Theme switching still works for the current page.
    }

    updateThemeIcon();
});

// =========================
// 3. Scroll Reveal
// =========================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// =========================
// 4. Animated Skill Bars
// =========================
const skillsSection = document.getElementById("skills");
const skillBars = document.querySelectorAll(".progress span");

if ("IntersectionObserver" in window) {
    const skillsObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    skillBars.forEach((bar) => {
                        bar.style.width = bar.dataset.width;
                    });

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    skillsObserver.observe(skillsSection);
} else {
    skillBars.forEach((bar) => {
        bar.style.width = bar.dataset.width;
    });
}

// =========================
// 5. Active Navigation Link
// =========================
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.id;

                    navLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

// =========================
// 6. Contact Form
// =========================
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
        formStatus.textContent = "Please fill in all the fields.";
        return;
    }

    // This demo validates the form but does not send messages
    // to a server or email account.
    formStatus.textContent =
        "Form validated successfully! Connect a backend or email service to send your message.";

    contactForm.reset();
});

// =========================
// 7. Dynamic Footer Year
// =========================
document.getElementById("currentYear").textContent =
    new Date().getFullYear();
