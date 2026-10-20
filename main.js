/* =========================================
   PRIVATE INVITATION ACCESS SCREEN
========================================= */

(() => {
    const ACCESS_CODE = "131226"; 
    const SESSION_KEY = "aaWeddingAccessGranted";

    document.body.classList.add("access-locked");

    document.addEventListener("DOMContentLoaded", () => {
        const gate = document.getElementById("accessGate");
        const form = document.getElementById("accessForm");
        const input = document.getElementById("accessCode");
        const error = document.getElementById("accessError");

        if (!gate || !form || !input || !error) return;

        function unlockInvitation() {
            gate.hidden = true;
            document.body.classList.remove("access-locked");
            document.body.style.overflow = "";
        }

        if (sessionStorage.getItem(SESSION_KEY) === "yes") {
            unlockInvitation();
        } else {
            document.body.style.overflow = "hidden";
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (input.value.trim() === ACCESS_CODE) {
                sessionStorage.setItem(SESSION_KEY, "yes");
                error.textContent = "";
                unlockInvitation();
            } else {
                error.textContent =
                    "Incorrect code. Please check your invitation.";
                input.value = "";
                input.focus();
            }
        });
    });
})();

/* =========================================
   PERSONALIZED WEDDING INVITATION
========================================= */

(() => {
    // Mapping
    const INVITATIONS = {
        "431e3edf": "Hardi & Family",
        "2192e615": "Serren & Molly Serren",
        "a6b18aab": "Milena Angelica", 
        "bd813934": "Kasya Ray", 
        "d4c4a6a6": "Janetta Huang", 
        "45cd9064": "AM & Husband", 
        "1fa0fbb0": "Vannizia", 
        "275ae65f": "Kria Alyana", 
        "38559abc": "Claudia", 
        "ede0780a": "Kaile & Louis", 
        "21d2e813": "Samrith & Family", 
        "de16feea": "Vevid", 
        "af47372a": "Pidor & Husband", 
        "f7206f24": "Theary & Dika", 
        "547d8702": "Sotheara Tun", 
        "0e165eee": "Lily & Nik", 
        "50055261": "Zay & Partner", 
        "2893d023": "Yuki", 
        "2cd0cecb": "May & Partner", 
        "8d9cb4d6": "Mony", 
        "e444430f": "Sear", 
        "b4f55684": "Sisca's Family", 
        "735bbd7a": "Roger", 
        "fb81fb7a": "Yuri & Husband", 
        "8e9cd76d": "Autdam", 
        "dc922f8a": "Zhi Yue & Partner", 
        "e3afe900": "Alice", 
        "635e038d": "Kathy", 
        "7446af6c": "April & Partner", 
        "bced5766": "Vinny & Myra", 
        "c6f16b27": "Jiwon & Partner", 
        "24e2f91b": "Ameen & Partner", 
        "b30fda19": "Megumi & Partner", 
        "c5215113": "Pearl & Partner", 
        "b9639079": "Kriti & Husband", 
        "22d0bce9": "Tomo", 
        "ec26a958": "Nevon", 
        "36974f7a": "Yuya & Wife", 
        "c39d180a": "Herra & Partner", 
        "43537419": "Rex & Partner", 
        "58215c28": "Gahn", 
        "49896f46": "Ryan", 
        "579fcf4b": "Jean & Jack", 
        "03a99979": "Chef Kim", 
        "ad6aa288": "Winny Leywantono", 
        "46694bbf": "Ali", 
        "aacdc9a9": "Caroline", 
        "efd125fe": "Carissa Gonata", 
        "74cafb4f": "Polly", 
        "2facf497": "Srey Tey & Pisey", 
        "68395f30": "Srey Noch", 
        "72b10b0d": "Ponleur", 
        "22956297": "Evelyn", 
        "13578168": "Guest", 
        "a16aafbe": "Guest", 
        "d9eab858": "Guest", 
        "0a0bf514": "Guest", 
        "b42e8d23": "Guest", 
        "f6c4cf83": "Guest", 
    };

    document.addEventListener("DOMContentLoaded", () => {
        const params = new URLSearchParams(window.location.search);
        const inviteId = params.get("invite");
        const guestGreeting = document.getElementById("guestGreeting");

        if (!guestGreeting || !inviteId) return;

        const guestName = INVITATIONS[inviteId];

        if (guestName) {
            guestGreeting.textContent = `Dear ${guestName}`;
            guestGreeting.hidden = false;
        }
    });
})();

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

    /* ================= BG & OPENING ================= */
    const bg = document.getElementById("siteBg");

    if (window.innerWidth >= 769){
        bg.src = "assets/images/bgimg-desktop.webp";
    } else{
        bg.src = "assets/images/bgimg.webp";
    }

    const openingBg = document.getElementById("openingBg");

    if(window.innerWidth >=769) {
        openingBg.src = "assets/images/welcome-desktop.webp";
    } else{
        openingBg.src = "assets/images/welcome2.webp"; 
    }

    const loaderornament = document.getElementById("loaderornament");

    if(window.innerWidth >=769) {
        loaderornament.src = "assets/images/ornament-desktop.webp";
    } else{
        loaderornament.src = "assets/images/ornament.webp"; 
    }

    const mainornament = document.getElementById("mainornament");

    if (mainornament) {
    if (window.innerWidth >= 769) {
        mainornament.removeAttribute("src");
    } else {
        mainornament.src = "assets/images/ornament.webp";
    }
    }

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

const weddingDate = new Date("2026-12-13T18:00:00");

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
