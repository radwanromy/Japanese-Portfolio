/*=============== THROTTLE FUNCTION FOR PERFORMANCE ===============*/
const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/*=============== SCROLL HEADER OPTIMIZED ===============*/
const header = document.getElementById("header");
window.addEventListener(
    "scroll",
    throttle(() => {
        header.classList.toggle("scroll-header", window.scrollY >= 50);
    }, 200)
);

/*=============== SERVICES MODAL USING EVENT DELEGATION ===============*/
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("services__button")) {
        const modalIndex = [...document.querySelectorAll(".services__button")].indexOf(event.target);
        document.querySelectorAll(".services__model")[modalIndex]?.classList.add("active-modal");
    } else if (event.target.classList.contains("services__model-close")) {
        document.querySelectorAll(".services__model").forEach((modal) => modal.classList.remove("active-modal"));
    }
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
mixitup(".work__container", {
    selectors: { target: ".work__card" },
    animation: { duration: 300 },
});

/*=============== ACTIVE LINK IN WORK SECTION ===============*/
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("work__item")) {
        document.querySelectorAll(".work__item").forEach((l) => l.classList.remove("active-work"));
        event.target.classList.add("active-work");
    }
});

/*=============== SWIPER TESTIMONIAL IMPROVED ===============*/
new Swiper(".testimonial__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    breakpoints: { 576: { slidesPerView: 2 }, 768: { slidesPerView: 2, spaceBetween: 48 } },
});

/*=============== SCROLL SECTIONS ACTIVE LINK OPTIMIZED ===============*/
window.addEventListener(
    "scroll",
    throttle(() => {
        const scrollY = window.pageYOffset;
        document.querySelectorAll("section[id]").forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute("id");
            const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
            if (link) link.classList.toggle("active-link", scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
        });
    }, 200)
);

/*=============== LIGHT/DARK THEME IMPROVEMENTS ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// Apply saved theme settings
if (localStorage.getItem("selected-theme")) {
    document.body.classList.toggle(lightTheme, localStorage.getItem("selected-theme") === "dark");
    themeButton.classList.toggle(iconTheme, localStorage.getItem("selected-icon") === "bx bx-moon");
}

// Theme toggle functionality
themeButton.addEventListener("click", () => {
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL OPTIMIZED ANIMATION ===============*/
ScrollReveal().reveal(".home__data, .home__handle, .home__social, .home__scroll", {
    distance: "60px",
    duration: 2500,
    delay: 400,
    origin: "top",
    easing: "ease-in-out",
});
