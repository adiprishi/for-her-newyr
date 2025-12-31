document.addEventListener("DOMContentLoaded", () => {

    /* ================= MUSIC ================= */
    const music = document.getElementById("bgMusic");
    let playing = false;
    let fireworkTimer = null;

    if (music) music.volume = 0;
    
    function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "heart-float";
    heart.textContent = "💖";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.fontSize = Math.random() * 18 + 18 + "px";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
}

function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";

    petal.style.left = Math.random() * window.innerWidth + "px";
    petal.style.animationDuration = Math.random() * 4 + 6 + "s";
    petal.style.opacity = Math.random() * 0.5 + 0.4;

    document.getElementById("intro").appendChild(petal);

    setTimeout(() => petal.remove(), 10000);
}

// keep petals falling
setInterval(createPetal, 450);



    function fadeInMusic() {
        if (!music) return;
        music.play().catch(() => {});
        let vol = 0;
        const fade = setInterval(() => {
            if (vol < 0.5) {
                vol += 0.02;
                music.volume = vol;
            } else clearInterval(fade);
        }, 200);
    }

    window.toggleMusic = () => {
        if (!music) return;
        playing ? music.pause() : music.play().catch(() => {});
        playing = !playing;
    };

    /* ================= INTRO TYPING ================= */
    const typing = document.getElementById("typing");
    const subtext = document.getElementById("subtext");
    const text = "Hi my love ❤️";
    const sub = "I have a surprise for you ✨";

    let i = 0;
    (function type() {
        if (!typing || !subtext) return;
        if (i < text.length) {
            typing.textContent += text[i++];
            setTimeout(type, 120);
        } else {
            subtext.textContent = sub;
        }
    })();

    /* ================= NO BUTTON ================= */
    const noBtn = document.getElementById("noBtn");
   window.noEscape = () => {
    const noBtn = document.getElementById("noBtn");

    const x = Math.random() * 220 - 110;
    const y = Math.random() * 180 - 90;

    noBtn.style.transition =
        "transform 0.45s cubic-bezier(.68,-0.55,.27,1.55)";
    noBtn.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random()*10-5}deg)`;

    // blush + shake
    noBtn.classList.add("blush");
    setTimeout(() => noBtn.classList.remove("blush"), 600);
};


    /* ================= NEW YEAR PAGE ================= */
    window.showNewYear = () => {
        for (let i = 0; i < 12; i++) {
    setTimeout(spawnHeart, i * 120);
}

        document.getElementById("intro").style.display = "none";
        document.getElementById("newYear").style.display = "flex";

        fadeInMusic();
        startCountdown();
        firework();

        if (!fireworkTimer) {
            fireworkTimer = setInterval(firework, 1000);
        }
    };

    function startCountdown() {
        const el = document.getElementById("countdown");
        if (!el) return;

        el.textContent = "3";
        setTimeout(() => el.textContent = "2", 1000);
        setTimeout(() => el.textContent = "1", 2000);
        setTimeout(() => {
            el.textContent = "🎉 Happy New Year cutuuuu ❤️";
            el.style.fontSize = "36px";
        }, 3000);
    }

    /* ================= PAGE FLOW ================= */
    window.startSurprise = () => {
        document.getElementById("newYear").style.display = "none";
        document.getElementById("gifts").style.display = "flex";
    };

    window.goToReels = () => {
        document.getElementById("gifts").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    };

    /* ================= SLIDESHOW ================= */
    const slides = document.querySelectorAll(".slideshow img");
    let s = 0;
    if (slides.length) {
        setInterval(() => {
            slides[s].classList.remove("active");
            s = (s + 1) % slides.length;
            slides[s].classList.add("active");
        }, 3000);
    }

    /* ================= SECRET MESSAGE ================= */
    window.showLove = () => {
        const secret = document.getElementById("secret");
        if (!secret) return;
        secret.style.display = "block";
        setTimeout(() => secret.style.display = "none", 3000);
    };

    /* ================= FIREWORKS ================= */
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function firework() {
        const particles = Array.from({ length: 30 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,
            a: Math.random() * Math.PI * 2,
            s: Math.random() * 4 + 2,
            l: 60
        }));

        (function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += Math.cos(p.a) * p.s;
                p.y += Math.sin(p.a) * p.s;
                p.l--;
                ctx.fillStyle = `rgba(255,215,0,${p.l / 60})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
            if (particles.some(p => p.l > 0)) requestAnimationFrame(animate);
        })();
    }

    /* ================= MODAL ================= */
    const modal = document.getElementById("giftModal");
    const content = document.getElementById("giftContent");

    function showModal(html) {
        content.innerHTML = html;
        modal.style.display = "flex";
    }

    modal.addEventListener("click", () => {
    modal.style.display = "none";

    const song = document.getElementById("foreverSong");
    if (song) {
        song.pause();
        song.currentTime = 0;
    }
});

    // click inside does NOT close
    content.addEventListener("click", e => e.stopPropagation());


    /* ================= NOTE ================= */
    window.openNote = () => {
        showModal(`
            <div class="note-layout floral-note">
                <div class="note-text">
                    <h2>For My Love 🌸</h2>
                    <p>Hey love,<br><br>
                    I’m sending you this little virtual bouquet.
                    I wish I could hand you real flowers myself,
                    but until I get to see you again,
                    let these carry a little bit of my warmth,
                    my love, and my hugs to you 🤍
                </p>
                <span class="note-sign">— Yours, always 💕....LICHI</span>
                </div>
                <div class="note-img">
                    <img src="gifts/note-cat.png">
                </div>
            </div>
        `);
    };

    /* ================= MEMORY SLIDER ================= */
    let memoryIndex = 0;
    const memories = [
        "memories/1.jpg",
        "memories/2.jpg",
        "memories/3.jpg"
    ];

    window.openMemory = () => {
        memoryIndex = 0;

        showModal(`
            <div class="note-layout memory-card">
                <button class="mem-nav left" id="prevBtn">❮</button>

                <div class="note-img">
                    <img id="memoryImg" src="${memories[0]}">
                </div>

                <div class="note-text">
                    <h2>some of our cute cute memoriessss💕</h2>
                <p>i lovee youu so so much babyyy muahhhh muahhhhhhh</p>
                <p>swipeee to see moree of usss hehehe 🤍🤍🤍</p>
                    <span class="note-sign" id="memoryCount">
                        1 / ${memories.length}
                    </span>
                </div>

                <button class="mem-nav right" id="nextBtn">❯</button>
            </div>
        `);

        bindMemoryControls();
    };

    function bindMemoryControls() {
        const img = document.getElementById("memoryImg");
        const counter = document.getElementById("memoryCount");

        document.getElementById("nextBtn").onclick = () => {
            memoryIndex = (memoryIndex + 1) % memories.length;
            updateMemory(img, counter);
        };

        document.getElementById("prevBtn").onclick = () => {
            memoryIndex = (memoryIndex - 1 + memories.length) % memories.length;
            updateMemory(img, counter);
        };

        enableSwipe(img, counter);
    }

    function updateMemory(img, counter) {
        img.style.opacity = 0;
        setTimeout(() => {
            img.src = memories[memoryIndex];
            counter.textContent = `${memoryIndex + 1} / ${memories.length}`;
            img.style.opacity = 1;
        }, 150);
    }

    function enableSwipe(img, counter) {
        let startX = 0;

        img.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
        });

        img.addEventListener("touchend", e => {
            const diff = startX - e.changedTouches[0].clientX;

            if (diff > 50) {
                memoryIndex = (memoryIndex + 1) % memories.length;
                updateMemory(img, counter);
            }

            if (diff < -50) {
                memoryIndex = (memoryIndex - 1 + memories.length) % memories.length;
                updateMemory(img, counter);
            }
        });
    }

    /* ================= OTHER GIFTS ================= */
    window.openVideo = () => {
    showModal(`
        <div class="note-layout memory-card video-card">
            <div class="note-img">
                <video
                    src="reel1.mp4"
                    controls
                    autoplay
                    playsinline>
                </video>
            </div>

            <div class="note-text">
                <h2>just the two of us</h2>
                <p>
                    A little moment of us,
                    something I never get tired of watching hehehe🤍
                </p>
                <span class="note-sign">— Always us ✨</span>
            </div>
        </div>
    `);
};

window.openMystery = () => {
    const song = document.getElementById("foreverSong");

    showModal(`
        <div class="album-card floral-bg">
            
            <!-- TEXT SIDE -->
            <div class="album-track soft-card">
                <h3>Forever Us 💍</h3>
                <p>
                    This isn’t just a song.<br>
                    mur ai2 gaan tu huni vl lge bht,<br>
                    you think i dont listen to any romantic songs but i do heheee<br>
                    and this one reminded me of us.<br>
                </p>
                <span class="note-sign">— With all my love, Lichi 🤍</span>
            </div>

            <!-- CD SIDE -->
            <div class="cd-case glass">
                <div class="realistic-disc">
                    <img src="gifts/us.png" alt="Us">
                </div>
            </div>

        </div>
    `);

    // play song safely
    song.currentTime = 0;
    song.play().catch(() => {});
};
window.goFinal = () => {
    document.getElementById("whyYou").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
};
window.goFinal = () => {
    document.getElementById("whyYou").style.display = "none";
    document.getElementById("finalPage").style.display = "flex";

    const video = document.getElementById("finalVideo");
    const song = document.getElementById("foreverSong");

    // stop background song
    if (song) {
        song.pause();
        song.currentTime = 0;
    }

    // play video WITH sound
    video.currentTime = 0;
    video.play().catch(() => {});
};
document.addEventListener("DOMContentLoaded", () => {
    const photos = document.querySelectorAll(".memory");

    photos.forEach((img, i) => {
        const top = Math.random() * 70 + 5;   // 5%–75%
        const left = Math.random() * 70 + 5;

        const rotate = Math.random() * 10 - 5; // -5deg to +5deg
        const delay = Math.random() * 3;

        img.style.top = top + "%";
        img.style.left = left + "%";
        img.style.transform = `rotate(${rotate}deg)`;
        img.style.animationDelay = delay + "s";
    });
});








});
