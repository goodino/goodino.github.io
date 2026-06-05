/* =====================================================
LUXURY WEDDING INVITATION - MAIN.JS (CLEAN FIXED VERSION)
===================================================== */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 600);
        }, 1200);
    }
});

/* =========================
OPENING SCREEN CONTROL
========================= */

const openingScreen = document.getElementById("openingScreen");
const openBtn = document.getElementById("openInvitation");
const mainContent = document.getElementById("mainContent");

if (openBtn && openingScreen && mainContent) {

    openBtn.addEventListener("click", () => {

        openingScreen.style.opacity = "0";

        setTimeout(() => {
            openingScreen.style.display = "none";
            mainContent.style.display = "block";
        }, 800);

    });

}

/* =========================
SPOTIFY MUSIC BUTTON
========================= */

const spotifyBtn = document.getElementById("spotifyBtn");
const spotifyPlayer = document.querySelector(".spotify-player");

let musicVisible = true;

if (spotifyBtn && spotifyPlayer) {

    spotifyBtn.addEventListener("click", () => {

        spotifyPlayer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        spotifyPlayer.classList.add("highlight");

        setTimeout(() => {
            spotifyPlayer.classList.remove("highlight");
        }, 1500);

        musicVisible = !musicVisible;

        spotifyPlayer.style.opacity = musicVisible ? "1" : "0.4";

    });

}

/* =========================
COUNTDOWN TIMER
========================= */

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const weddingDate = new Date("2026-12-13T19:00:00");

function updateCountdown() {

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) return;

    daysEl.innerHTML = Math.floor(diff / (1000 * 60 * 60 * 24));
    hoursEl.innerHTML = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutesEl.innerHTML = Math.floor((diff / (1000 * 60)) % 60);
    secondsEl.innerHTML = Math.floor((diff / 1000) % 60);

}

setInterval(updateCountdown, 1000);
updateCountdown();

/* =========================
SCROLL REVEAL ANIMATION
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    reveals.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < windowHeight - 100) {
            el.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================
BACK TO TOP BUTTON
========================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* =========================
LIGHTBOX GALLERY
========================= */

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

if (galleryImages && lightbox && lightboxImage) {

    galleryImages.forEach(img => {

        img.addEventListener("click", () => {

            lightbox.style.display = "flex";
            lightboxImage.src = img.src;

        });

    });

}

if (closeLightbox && lightbox) {

    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

}

/* =========================
FALLING PETALS
========================= 

function createPetals() {

    const container = document.getElementById("petalContainer");

    if (!container) return;

    const petal = document.createElement("div");

    petal.className = "petal";
    petal.innerHTML = "🌸";

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (5 + Math.random() * 5) + "s";

    container.appendChild(petal);

    setTimeout(() => petal.remove(), 10000);

}

setInterval(createPetals, 900); */

/* =========================
BUTTERFLY ANIMATION
========================= */

const butterflies = document.querySelectorAll(".butterfly");

if (butterflies.length > 0) {

    function animateButterflies() {

        const time = Date.now() / 1000;

        butterflies.forEach((b, i) => {

            const x = Math.sin(time + i) * 80 + i * 40;
            const y = Math.cos(time + i) * 40 + i * 60;

            b.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(animateButterflies);
    }

    animateButterflies();
}

/* =========================
GLITTER CANVAS
========================= */

const canvas = document.getElementById("glitterCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let scrollY = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
    });

    const particles = [];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * (document.body.scrollHeight),
            r: Math.random() * 2,
            speed: Math.random() * 0.3
        });
    }

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(212,175,55,0.6)";

        particles.forEach(p => {

            const screenY = p.y - scrollY;

            if (screenY < -50 || screenY > canvas.height + 50) return;

            ctx.beginPath();
            ctx.arc(p.x, screenY, p.r, 0, Math.PI * 2);
            ctx.fill();

        });

        requestAnimationFrame(animate);
    }

    animate();
}
