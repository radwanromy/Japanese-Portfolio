/*=============== CHANGE BACKGROUND HEADER ===============*/

function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__model'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalClose = document.querySelectorAll('.services__model-close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}



modalBtns.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        modal(i)
    })
})

modalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove('active-modal')
        })
    })
})
/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l => l.addEventListener('click', activeWork))
/*=============== SWIPER TESTIMONIAL ===============*/


let swiperTestimonial = new Swiper(".testimonial__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    },
});
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== 4-STATE THEME SWITCHER (night / day / mid / compact) ===============*/

document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('theme-button')

    if (!themeButton) {
        console.error('Theme button element not found. Please check your HTML.');
        return;
    }

    // Ordered theme cycle. 'night' is the default (no body class).
    const THEMES = ['night', 'light', 'mid', 'compact']
    const THEME_CLASS = {
        night: null,
        light: 'light-theme',
        mid: 'mid-theme',
        compact: 'compact-theme',
    }
    const THEME_ICON = {
        night: 'bx-moon',
        light: 'bx-sun',
        mid: 'bx-adjust',
        compact: 'bx-collapse',
    }
    const THEME_LABEL = {
        en: { night: 'Switch to day theme', light: 'Switch to mid theme', mid: 'Switch to compact theme', compact: 'Switch to night theme' },
        ja: { night: 'ライトテーマに切り替え', light: 'ミッドテーマに切り替え', mid: 'コンパクトテーマに切り替え', compact: 'ナイトテーマに切り替え' },
    }

    const applyTheme = (theme) => {
        Object.values(THEME_CLASS).forEach((cls) => cls && document.body.classList.remove(cls))
        const cls = THEME_CLASS[theme]
        if (cls) document.body.classList.add(cls)

        themeButton.className = 'bx ' + THEME_ICON[theme] + ' change-theme'
        const lang = (document.documentElement.getAttribute('lang') === 'en') ? 'en' : 'ja'
        themeButton.setAttribute('aria-label', THEME_LABEL[lang][theme])

        document.body.dataset.theme = theme
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }))
    }

    let currentTheme = localStorage.getItem('selected-theme')
    if (!THEMES.includes(currentTheme)) currentTheme = 'night'
    applyTheme(currentTheme)

    themeButton.addEventListener('click', () => {
        const idx = THEMES.indexOf(currentTheme)
        currentTheme = THEMES[(idx + 1) % THEMES.length]
        applyTheme(currentTheme)
        localStorage.setItem('selected-theme', currentTheme)
    })

    // Re-apply aria-label wording if the language changes after theme is set
    window.addEventListener('langchange', () => applyTheme(currentTheme))
})
/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay:400,
})
sr.reveal(`.home__data`)
sr.reveal(`.home__handle`,{delay:700})
sr.reveal(`.home__social, .home__scroll`, {delay: 900, origin: 'bottom'})

/*=============== KEYBOARD SUPPORT FOR ICON "BUTTONS" ===============*/
// Elements like the theme toggle and modal close icon use role="button"
// instead of a native <button>, so Enter/Space need to be wired up manually
// for keyboard and screen-reader users.
document.querySelectorAll('[role="button"]').forEach((el) => {
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            el.click()
        }
    })
})