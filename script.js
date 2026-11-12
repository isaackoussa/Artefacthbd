/* =========================================================
   ✏️ PERSONNALISATION — modifie seulement cette partie
   ========================================================= */
const CONFIG = {
  // Prénom (tu peux aussi utiliser l'URL : ?prenom=Flora)
  prenom: "Flora",

  // Petit badge affiché sous son prénom (mets "" pour le cacher)
  badge: "LMA",

  // 📸 Photos du diaporama d'entrée : mets les fichiers dans le dossier "photos/"
  // et écris leur nom ici, dans l'ordre.
  photos: [
    { src: "photos/01.jpg" },
    { src: "photos/02.jpg" },
    { src: "photos/03.jpg" },
    { src: "photos/04.jpg" },
    { src: "photos/05.jpg" },
    { src: "photos/06.jpg" },
    { src: "photos/07.jpg" },
    { src: "photos/08.jpg" },
    { src: "photos/09.jpg" },
    { src: "photos/10.jpg" },
    { src: "photos/11.jpg" },
    { src: "photos/12.jpg" },
    { src: "photos/13.jpg" },
    { src: "photos/14.jpg" },
    { src: "photos/15.jpg" },
    { src: "photos/16.jpg" },
    { src: "photos/17.jpg" },
    { src: "photos/18.jpg" },
  ],
  dureePhoto: 400, // défilement automatique : 0,4 seconde par photo
  dureeDernierePhoto: 1400, // la dernière photo (« bref. C'est fini ») reste un peu plus

  // 🎵 Musiques (fichiers dans le dossier "audio/")
  musiqueDiaporama: "audio/mode-de-vie-refrain.mp3", // refrain pendant le défilement des photos
  musique: "audio/parapluie.mp3", // ensuite, en boucle sur le reste de la page
  textePhoto: "LMA STAR 🤍", // texte écrit sous chaque photo

  // Le message qui s'écrit tout seul dans la lettre
  message:
    "Joyeux anniversaire Flora ! 🎂\n\n" +
    "Tu es une femme courageuse et travailleuse, et ta détermination m'inspire beaucoup.\n\n" +
    "Je te souhaite une très belle année, pleine de joie, de réussite et de beaux moments. 🤍",

  // 🙏 Bénédictions (emoji + texte)
  benedictions: [
    ["🙏", "Que Dieu te bénisse et veille sur toi tout au long de cette nouvelle année."],
    ["🌿", "Qu'Il te donne la <strong>santé</strong> et la <strong>paix</strong> du cœur."],
    ["✨", "Que ton travail soit <strong>béni</strong> et que tes projets réussissent."],
    ["💖", "Que tu sois toujours entourée d'<strong>amour</strong> et de belles personnes."],
  ],
};

/* ========================================================= */

const EMOJIS = ["🤍", "🤍", "🤍", "🎉", "🎈", "🎂", "🥳", "✨", "🎁", "🍾", "🥂", "🌸", "💫", "🎊"];

// Prénom depuis l'URL si présent
const params = new URLSearchParams(location.search);
const prenom = (params.get("prenom") || CONFIG.prenom).trim();
document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = prenom));
document.title = `Joyeux anniversaire ${prenom} 🤍`;
document.querySelectorAll("[data-badge]").forEach((el) => {
  if (CONFIG.badge) el.textContent = CONFIG.badge; else el.remove();
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Emojis flottants ---------- */
const floating = document.querySelector(".floating");
function spawnFloating() {
  const s = document.createElement("span");
  s.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  s.style.left = Math.random() * 100 + "vw";
  s.style.fontSize = 16 + Math.random() * 26 + "px";
  const duration = 9 + Math.random() * 9;
  s.style.animationDuration = duration + "s";
  floating.appendChild(s);
  setTimeout(() => s.remove(), duration * 1000);
}
if (!reduceMotion) {
  for (let i = 0; i < 12; i++) setTimeout(spawnFloating, i * 400);
  setInterval(spawnFloating, 700);
}

/* ---------- Confettis (canvas) ---------- */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let running = false;

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener("resize", resize);
resize();

const COLORS = ["#ffffff", "#ffb3c7", "#f6d58e", "#ffd6e3", "#c9a7ff", "#fff3c4"];

function burst(x = innerWidth / 2, y = innerHeight / 2, count = 160) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 6 + Math.random() * 11;
    pieces.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      size: 6 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      life: 0,
      maxLife: 75 + Math.random() * 45,
    });
  }
  if (!running) { running = true; requestAnimationFrame(tick); }
}

function rain(duration = 2500) {
  const end = Date.now() + duration;
  (function frame() {
    burst(Math.random() * innerWidth, -20, 6);
    if (Date.now() < end) setTimeout(frame, 60);
  })();
}

function tick() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  pieces = pieces.filter((p) => p.life < p.maxLife && p.y < innerHeight + 40);
  for (const p of pieces) {
    p.life++;
    p.vy += 0.38;
    p.vx *= 0.985;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  }
  if (pieces.length) requestAnimationFrame(tick);
  else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

/* ---------- Musique ---------- */
function makeTrack(src, loop) {
  if (!src) return null;
  const a = new Audio();
  a.src = src;
  a.loop = loop;
  a.preload = "auto";
  return a;
}
const introTrack = makeTrack(CONFIG.musiqueDiaporama, false);
const mainTrack = makeTrack(CONFIG.musique, true);
let music = introTrack || mainTrack; // piste en cours
let userMuted = false;
const musicBtn = document.getElementById("musicBtn");

function setMusicIcon() { musicBtn.textContent = !music || music.paused ? "🔇" : "🔊"; }
[introTrack, mainTrack].forEach((t) => {
  if (!t) return;
  t.addEventListener("play", setMusicIcon);
  t.addEventListener("pause", setMusicIcon);
  t.addEventListener("error", () => { if (t === music) musicBtn.hidden = true; });
});

// Doit être appelé pendant le clic (sinon les téléphones bloquent le son)
function startMusic() {
  if (!music) return;
  // « Débloque » la 2e piste sur iPhone en la lançant sans son pendant le clic
  if (introTrack && mainTrack) {
    mainTrack.muted = true;
    mainTrack.play().then(() => { if (music !== mainTrack) { mainTrack.pause(); mainTrack.currentTime = 0; } mainTrack.muted = false; })
      .catch(() => (mainTrack.muted = false));
  }
  music.play().then(() => { musicBtn.hidden = false; setMusicIcon(); }).catch(() => {});
}

function fade(track, from, to, ms, done) {
  const steps = 15; let k = 0;
  track.volume = from;
  const id = setInterval(() => {
    k++;
    track.volume = Math.min(1, Math.max(0, from + (to - from) * (k / steps)));
    if (k >= steps) { clearInterval(id); done && done(); }
  }, ms / steps);
}

// Passe du refrain à la musique principale quand la page s'ouvre
function switchToMainMusic() {
  if (!introTrack || !mainTrack || music === mainTrack) return;
  const old = introTrack;
  music = mainTrack;
  fade(old, old.volume, 0, 600, () => { old.pause(); });
  if (userMuted) return setMusicIcon();
  mainTrack.currentTime = 0;
  mainTrack.volume = 0;
  mainTrack.play().then(() => { musicBtn.hidden = false; fade(mainTrack, 0, 1, 900); }).catch(() => {});
}

musicBtn.addEventListener("click", () => {
  if (!music) return;
  if (music.paused) { userMuted = false; music.volume = 1; music.play().catch(() => {}); }
  else { userMuted = true; music.pause(); }
  setMusicIcon();
});

/* ---------- Ouverture du cadeau → diaporama → page ---------- */
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const slideshow = document.getElementById("slideshow");

function showMain() {
  if (!main.hidden) return;
  main.hidden = false;
  slideshow.classList.add("hide");
  setTimeout(() => (slideshow.hidden = true), 400);
  window.scrollTo(0, 0);
  switchToMainMusic();
  rain(1500);
}

// Photos d'attente tant que les vraies ne sont pas ajoutées
const PLACEHOLDERS = [
  { emoji: "🤍" },
  { emoji: "🌸" },
  { emoji: "🦁" },
  { emoji: "🌟" },
  { emoji: "🎂" },
];

// Précharge les photos dès l'arrivée sur la page pour qu'elles s'affichent sans délai
const preloaded = CONFIG.photos.map((ph) => {
  const im = new Image();
  im.decoding = "async";
  im.src = ph.src;
  return im;
});

function runSlideshow() {
  const list = CONFIG.photos.length ? CONFIG.photos : PLACEHOLDERS;
  const stage = document.getElementById("slideStage");
  const progress = document.getElementById("slideProgress");
  progress.innerHTML = list.map(() => "<span></span>").join("");
  const bars = progress.querySelectorAll("span");

  slideshow.hidden = false;
  let i = 0, prev = null;
  (function next() {
    if (!main.hidden) return;
    if (i >= list.length) return showMain();
    const item = list[i];
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.setProperty("--r", (i % 2 ? 4 : -4) + Math.random() * 2 - 1 + "deg");
    const img = document.createElement("div");
    img.className = "slide-img";
    if (item.src) {
      const im = preloaded[i].cloneNode();
      im.alt = prenom;
      const fail = () => (img.innerHTML = '<div class="slide-placeholder">🤍</div>');
      if (preloaded[i].complete && !preloaded[i].naturalWidth) fail();
      else {
        im.onerror = fail;
        // Photo en paysage : affichée en entier sur un fond flouté
        const fit = () => {
          if (im.naturalWidth > im.naturalHeight) {
            img.classList.add("landscape");
            img.style.setProperty("--bg", `url("${item.src}")`);
          }
        };
        im.complete && im.naturalWidth ? fit() : im.addEventListener("load", fit);
        img.appendChild(im);
      }
    } else {
      img.innerHTML = `<div class="slide-placeholder"><div>${item.emoji}<small>Photo bientôt 📸</small></div></div>`;
    }
    slide.appendChild(img);
    const label = document.createElement("div");
    label.className = "slide-label";
    label.textContent = CONFIG.textePhoto;
    slide.appendChild(label);
    stage.appendChild(slide);
    requestAnimationFrame(() => requestAnimationFrame(() => slide.classList.add("in")));
    if (prev) { const p = prev; p.classList.add("out"); setTimeout(() => p.remove(), 300); }
    prev = slide;
    bars.forEach((b, k) => b.classList.toggle("on", k <= i));
    i++;
    setTimeout(next, i === list.length ? CONFIG.dureeDernierePhoto : CONFIG.dureePhoto);
  })();
}


document.getElementById("openGift").addEventListener("click", (e) => {
  e.currentTarget.disabled = true; // évite de lancer le diaporama deux fois
  startMusic();
  burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 90);
  intro.classList.add("hide");
  setTimeout(() => intro.remove(), 450);
  runSlideshow();
}, { once: true });

/* ---------- Vidéos : une seule à la fois ---------- */
const videos = document.querySelectorAll(".video-card video");
// La musique se met en pause pendant une vidéo et reprend après
let musicWasPlaying = false;
videos.forEach((v) => {
  v.addEventListener("play", () => {
    videos.forEach((o) => { if (o !== v) o.pause(); });
    if (music && !music.paused) { musicWasPlaying = true; music.pause(); }
  });
  const resume = () => {
    if (musicWasPlaying && !userMuted && [...videos].every((o) => o.paused)) { musicWasPlaying = false; music.play().catch(() => {}); }
  };
  v.addEventListener("pause", resume);
  v.addEventListener("ended", resume);
});

/* ---------- Bénédictions ---------- */
const blessingList = document.getElementById("blessingList");
CONFIG.benedictions.forEach(([emoji, text], k) => {
  const li = document.createElement("li");
  li.className = "blessing";
  li.style.transitionDelay = (k % 2) * 0.1 + "s";
  li.innerHTML = `<span class="blessing-emoji">${emoji}</span><span>${text}</span>`;
  blessingList.appendChild(li);
});
const amen = document.createElement("p");
amen.className = "amen reveal";
amen.textContent = "Amen 🤍🙏";
blessingList.after(amen);

/* ---------- Apparition au scroll ---------- */
const observer = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); observer.unobserve(en.target); }
  }),
  { threshold: 0.2 }
);
document.querySelectorAll(".reveal, .blessing").forEach((el) => observer.observe(el));

/* ---------- Lettre qui s'écrit ---------- */
const letter = document.getElementById("letterText");
let typed = false;
const chars = Array.from(CONFIG.message); // gère correctement les emojis
const letterObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !typed) {
    typed = true;
    letterObs.disconnect();
    if (reduceMotion) { letter.textContent = CONFIG.message; return; }
    letter.classList.add("typing");
    let i = 0;
    (function type() {
      letter.textContent = chars.slice(0, ++i).join("");
      if (i < chars.length) setTimeout(type, chars[i - 1] === "\n" ? 120 : 14);
      else letter.classList.remove("typing");
    })();
  }
}, { threshold: 0.4 });
letterObs.observe(letter);

/* ---------- Bougies ---------- */
const cake = document.getElementById("cake");
const blowBtn = document.getElementById("blow");
const wish = document.getElementById("wish");
blowBtn.addEventListener("click", () => {
  if (cake.classList.contains("out")) {
    cake.classList.remove("out");
    blowBtn.textContent = "🌬️ Souffle les bougies";
    wish.hidden = true;
    return;
  }
  cake.classList.add("out");
  const r = cake.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + 40, 200);
  rain(3000);
  wish.hidden = false;
  blowBtn.textContent = "🕯️ Rallumer les bougies";
});

/* ---------- Bouton confettis ---------- */
document.getElementById("party").addEventListener("click", (e) => {
  burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 200);
  rain(2000);
});

/* ---------- Petit cœur à chaque clic ---------- */
document.addEventListener("click", (e) => {
  if (e.target.closest("button, a")) return;
  burst(e.clientX, e.clientY, 25);
});
