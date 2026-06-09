/* =====================================================
 WEDDING INVITATION - MAIN.JS 
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

    /* ================= LOADER ================= */
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

    /* ================= ELEMENTS ================= */
    const openBtn = document.getElementById("openInvitation");
    const openingScreen = document.getElementById("openingScreen");
    const mainContent = document.getElementById("mainContent");

    const audio = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    let isPlaying = false;

    /* ================= OPEN INVITATION ================= */
    if (openBtn && openingScreen && mainContent) {

        openBtn.addEventListener("click", () => {

            openingScreen.style.opacity = "0";

            setTimeout(() => {
                openingScreen.style.display = "none";
                mainContent.style.display = "block";
            }, 800);

            /* start music after click */
            if (audio) {
                audio.play().then(() => {
                    isPlaying = true;
                    if (musicBtn) {
                        musicBtn.classList.add("active");
                        musicBtn.textContent = "⏸️";
                    }
                });
            }

        });

    }

    /* ================= MUSIC BUTTON ================= */
if (musicBtn && audio) {

    musicBtn.addEventListener("click", () => {

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", () => {
        musicBtn.textContent = "⏸️";
    });

    audio.addEventListener("pause", () => {
        musicBtn.textContent = "🎵";
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

/* =============================
FLOATING LOTTIE BUTTERFLIES
============================= */

const butterflyContainer = document.getElementById("butterflyContainer");

const butterflies = [];

const COUNT = window.innerWidth < 768 ? 6 : 8;

for(let i = 0; i < COUNT; i++){

    const el = document.createElement("div");
    el.className = "lottie-butterfly";

    butterflyContainer.appendChild(el);

    const animation = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "assets/animations/butterfly.json"
    });

    animation.setSpeed(0.7);

    butterflies.push({
        el,

        startX: Math.random() * window.innerWidth,
        startY: Math.random() * window.innerHeight,

        amplitudeX: 40 + Math.random() * 80,
        amplitudeY: 20 + Math.random() * 50,

        speed: 0.00015 + Math.random() * 0.00015,

        offset: Math.random() * Math.PI * 2
    });
}

function animateButterflies(time){

    butterflies.forEach(b => {

        const x =
            b.startX +
            Math.sin(time * b.speed + b.offset)
            * b.amplitudeX;

        const y =
            b.startY +
            Math.cos(time * b.speed * 0.8 + b.offset)
            * b.amplitudeY;

        b.el.style.transform =
            `translate3d(${x}px, ${y}px, 0)`;

    });

    requestAnimationFrame(animateButterflies);
}

requestAnimationFrame(animateButterflies);

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
});

/* ====
GIFT
======= */
document.querySelectorAll('.gift-toggle').forEach(button=>{

    button.addEventListener('click',()=>{

        const item =
            button.parentElement;

        item.classList.toggle('active');

    });

});

function copyText(text){

    navigator.clipboard.writeText(text);

    const toast =
        document.getElementById('toast');

    toast.textContent =
        'Account number copied';

    toast.classList.add('show');

    setTimeout(()=>{
        toast.classList.remove('show');
    },2000);
}

document.querySelectorAll('.qr-clickable').forEach(img => {

    img.addEventListener('click', () => {

        document.getElementById('lightboxImage').src = img.src;

        document.getElementById('lightbox').style.display = 'flex';

    });

});
