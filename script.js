
/* ================= MOBILE NAVIGATION ================= */

const header = document.querySelector("header");
const nav = document.querySelector("nav");

// Create mobile menu button
const menuButton = document.createElement("button");

menuButton.className = "menu-toggle";
menuButton.innerHTML = "☰";
menuButton.setAttribute("aria-label", "Open navigation menu");
menuButton.setAttribute("aria-expanded", "false");

header.insertBefore(menuButton, nav);

// Toggle mobile menu
menuButton.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("active");

    menuButton.innerHTML = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close menu when a navigation link is clicked
nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("active");
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    });
});


/* ================= SCROLL ANIMATIONS ================= */

const animatedElements = document.querySelectorAll(
    ".feature-card, .about-image, .about-content, .hero-card, .cta"
);

// Add animation class to elements
animatedElements.forEach(function (element) {
    element.classList.add("reveal");
});

// Animate elements when they enter the screen
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach(function (element) {
        observer.observe(element);
    });
} else {
    animatedElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


/* ================= BUTTON INTERACTIONS ================= */

// Add a click effect to buttons
document.querySelectorAll(".primary-btn, .secondary-btn").forEach(
    function (button) {
        button.addEventListener("click", function () {
            button.classList.add("clicked");

            setTimeout(function () {
                button.classList.remove("clicked");
            }, 180);
        });
    }
);


/* ================= ACTIVE NAVIGATION ================= */

// Highlight the navigation link for the current section
const sections = document.querySelectorAll(
    "#home, #features, #about, #contact"
);

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 130;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    nav.querySelectorAll("a").forEach(function (link) {
        link.classList.toggle(
            "active-link",
            link.getAttribute("href") === "#" + currentSection
        );
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


/* ================= BACK TO TOP BUTTON ================= */

// Create a back-to-top button
const topButton = document.createElement("button");

topButton.className = "back-to-top";
topButton.innerHTML = "↑";
topButton.setAttribute("aria-label", "Back to top");

document.body.appendChild(topButton);

// Show button after scrolling
window.addEventListener("scroll", function () {
    topButton.classList.toggle("show", window.scrollY > 300);
});

// Return to the top
topButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* ================= FOOTER YEAR ================= */

// Automatically update copyright year
const copyright = document.querySelector(".copyright");

if (copyright) {
    copyright.textContent =
        "© " + new Date().getFullYear() +
        " Learnify. All Rights Reserved.";
}


/* ================= CONSOLE MESSAGE ================= */

console.log("Learnify website loaded successfully!");
