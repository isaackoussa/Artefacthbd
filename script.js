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
    // Ordre : séries regroupées, photos droites et penchées alternées, vidéos réparties
    { src: "photos/22.jpg" }, // ouverture : la star au miroir
    { src: "photos/25.jpg" },
    { src: "photos/01.jpg" }, // le shooting au marché
    { src: "photos/02.jpg" },
    { src: "photos/03.jpg" },
    { src: "photos/04.jpg" },
    { src: "photos/05.jpg" },
    { video: "videos/clip1.mp4?v=20261125b", poster: "videos/clip1.jpg", duree: 1800, vitesse: 2 },
    { src: "photos/08.jpg" }, // look haut blanc / pantalon beige
    { src: "photos/12.jpg" },
    { src: "photos/14.jpg" },
    { src: "photos/13.jpg" },
    { src: "photos/15.jpg" }, // selfies boucles
    { src: "photos/17.jpg" },
    { video: "videos/clip5a.mp4?v=20261125b", poster: "videos/clip5a.jpg", duree: 1600, vitesse: 1 }, // la main sur la joue
    { src: "photos/16.jpg" },
    { src: "photos/11.jpg" },
    { src: "photos/18.jpg" },
    { src: "photos/06.jpg" }, // séance haut blanc allongée
    { src: "photos/09.jpg" },
    { src: "photos/07.jpg" },
    { src: "photos/10.jpg" },
    { video: "videos/clip6.mp4?v=20261125b", poster: "videos/clip6.jpg", duree: 2650, vitesse: 1 }, // vidéo du bus, de 17,2 à 19,88 s (sans le flash du déclencheur ni l'écran TikTok)
    { src: "photos/21.jpg" }, // souvenirs en uniforme
    { src: "photos/23.jpg" },
    { video: "videos/clip2.mp4?v=20261125b", poster: "videos/clip2.jpg", duree: 1900, vitesse: 2 }, // sorties et soirées
    { src: "photos/28.jpg" },
    { src: "photos/29.jpg" },
    { video: "videos/clip4.mp4?v=20261125b", poster: "videos/clip4.jpg", duree: 2000, vitesse: 2 },
    { src: "photos/30.jpg" }, // « sexy nana »
    { src: "photos/26.jpg" }, // juste avant le « waouh »
    { video: "videos/clip5b.mp4?v=20261125b", poster: "videos/clip5b.jpg", duree: 1800, vitesse: 1 }, // le « waouh », juste avant la fin
    { src: "photos/27.jpg" }, // « bref. C'est fini » reste en dernier
  ],
  dureePhoto: 400, // défilement automatique : 0,4 seconde par photo
  dureeDernierePhoto: 1400, // la dernière photo (« bref. C'est fini ») reste un peu plus

  // 🎵 Musiques (fichiers dans le dossier "audio/")
  musiqueDiaporama: "audio/mode-de-vie-refrain.mp3?v=20261125b", // refrain pendant le défilement des photos
  // Ensuite, sur le reste de la page : ces musiques s'enchaînent, puis recommencent
  musiques: [
    "audio/musique.mp3?v=20261125b",
    "audio/parapluie.mp3?v=20261125b",
  ],
  textePhoto: "LMA STAR 🤍", // texte écrit sous chaque photo

  // Le message qui s'écrit tout seul dans la lettre
  message:
    "Joyeux anniversaire Flora ! 🎂\n\n" +
    "Tu es une femme courageuse et travailleuse, et ta détermination m'inspire beaucoup.\n\n" +
    "Tu me motives à travailler dur : d'une certaine manière, tu es une source de motivation. 💪\n\n" +
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

/* ---------- Photos qui défilent en fond (après le diaporama) ---------- */
// Miniatures de toutes les photos du diaporama, sauf la dernière (« bref. C'est fini ») et les vidéos
const BG_PHOTOS = CONFIG.photos.slice(0, -1).filter((p) => p.src).map((p) => p.src.replace("photos/", "photos/mini/"));
let bgOrder = [];
function nextBgPhoto() {
  if (!bgOrder.length) bgOrder = BG_PHOTOS.slice().sort(() => Math.random() - 0.5);
  return bgOrder.pop();
}
function spawnFloatingPhoto() {
  if (document.hidden) return;
  const f = document.createElement("div");
  f.className = "float-photo";
  const w = innerWidth < 600 ? 64 + Math.random() * 30 : 90 + Math.random() * 50;
  f.style.width = w + "px";
  f.style.left = Math.random() * (100 - (w / innerWidth) * 100) + "vw";
  f.style.setProperty("--r", (Math.random() * 24 - 12).toFixed(1) + "deg");
  const duration = 14 + Math.random() * 8;
  f.style.animationDuration = duration + "s";
  const img = new Image();
  img.src = nextBgPhoto();
  img.alt = "";
  img.decoding = "async";
  f.appendChild(img);
  floating.appendChild(f);
  setTimeout(() => f.remove(), duration * 1000);
}
let bgPhotosStarted = false;
function startBackgroundPhotos() {
  if (bgPhotosStarted || reduceMotion) return;
  bgPhotosStarted = true;
  for (let i = 0; i < 3; i++) setTimeout(spawnFloatingPhoto, i * 1100);
  setInterval(spawnFloatingPhoto, innerWidth < 600 ? 3200 : 2300);
}
// Les miniatures sont préchargées seulement une fois les photos du diaporama prêtes (voir plus bas)
function preloadBackgroundPhotos() { BG_PHOTOS.forEach((src) => { const im = new Image(); im.src = src; }); }

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

/* ---------- Musique ----------
   Un seul lecteur audio pour toutes les chansons : sur iPhone, une page ne peut
   pas faire jouer deux lecteurs, et seul un lecteur « débloqué » par un toucher
   peut ensuite changer de chanson tout seul. */
const music = new Audio();
// Pas de préchargement automatique : le refrain est téléchargé une seule fois, en priorité (voir plus bas)
music.preload = "none";
const playlist = CONFIG.musiques || [];
let track = 0;
let userMuted = false;
let phase = "intro"; // "intro" (refrain pendant le diaporama) puis "main"
let errorsInARow = 0;
const musicBtn = document.getElementById("musicBtn");

if (CONFIG.musiqueDiaporama || playlist.length) {
  music.src = CONFIG.musiqueDiaporama || playlist[0];
  if (!CONFIG.musiqueDiaporama) { phase = "main"; music.loop = playlist.length === 1; }
}

function setMusicIcon() { musicBtn.textContent = music.paused ? "🔇" : "🔊"; }
music.addEventListener("play", () => { errorsInARow = 0; setMusicIcon(); });
music.addEventListener("pause", setMusicIcon);

// Joue la musique en cours, sauf si le son est coupé ou le site en arrière-plan
function playIfAllowed() {
  if (userMuted) return setMusicIcon();
  if (document.hidden) { resumeOnReturn = true; return setMusicIcon(); }
  music.play().then(() => { musicBtn.hidden = false; setMusicIcon(); }).catch(() => { musicBtn.hidden = false; setMusicIcon(); });
}

// Musiques déjà téléchargées et gardées en mémoire (pas de double téléchargement)
const trackUrls = {};
function prefetchTrack(i) {
  if (trackUrls[i] || !playlist[i]) return;
  trackUrls[i] = "…"; // téléchargement en cours
  fetchBlobUrl(playlist[i]).then((u) => (trackUrls[i] = u)).catch(() => delete trackUrls[i]);
}
function loadTrack(i) {
  track = i % playlist.length;
  music.pause();
  const u = trackUrls[track];
  music.src = u && u !== "…" ? u : playlist[track];
  music.loop = playlist.length === 1;
  music.currentTime = 0;
  // Prépare la suivante pendant que celle-ci joue
  if (playlist.length > 1) prefetchTrack((track + 1) % playlist.length);
}

// Fin d'une musique : on passe à la suivante (et on recommence après la dernière)
music.addEventListener("ended", () => {
  if (phase !== "main" || playlist.length < 2) return;
  loadTrack(track + 1);
  playIfAllowed();
});

music.addEventListener("error", () => {
  if (phase === "intro") return switchToMainMusic(true); // refrain introuvable
  // Musique introuvable : on essaie la suivante (sans tourner en rond)
  if (++errorsInARow < playlist.length) { loadTrack(track + 1); playIfAllowed(); }
  else musicBtn.hidden = true;
});

// Doit être appelé pendant le toucher du cadeau (sinon les téléphones bloquent le son)
function startMusic() {
  if (!music.src) return;
  // Même si le lancement échoue, le bouton 🔇 apparaît pour pouvoir réessayer
  music.play().then(() => { musicBtn.hidden = false; setMusicIcon(); }).catch(() => { musicBtn.hidden = false; setMusicIcon(); });
}

// À la fin de la dernière photo : le refrain s'arrête et les musiques principales démarrent
function switchToMainMusic(force) {
  if (phase === "main" || !playlist.length) return;
  if (!CONFIG.musiqueDiaporama && !force) return;
  phase = "main";
  loadTrack(0);
  playIfAllowed();
}

/* Pas de son en arrière-plan : la musique s'arrête quand on quitte le site
   (autre appli, écran d'accueil, autre onglet, téléphone verrouillé)
   et reprend quand on revient. */
let resumeOnReturn = false;
function onLeave() {
  if (!music.paused) { resumeOnReturn = true; music.pause(); }
}
function onReturn() {
  if (!resumeOnReturn || userMuted) return;
  resumeOnReturn = false;
  music.play().catch(() => setMusicIcon());
}
document.addEventListener("visibilitychange", () => (document.hidden ? onLeave() : onReturn()));
window.addEventListener("pagehide", onLeave);
window.addEventListener("pageshow", () => { if (!document.hidden) onReturn(); });

musicBtn.addEventListener("click", () => {
  if (music.paused) { userMuted = false; resumeOnReturn = false; music.play().catch(() => {}); }
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
  startBackgroundPhotos();
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

/* ---------- Chargement dans l'ordre ----------
   Sur une connexion lente, tout télécharger en même temps faisait arriver
   le refrain et les premières photos trop tard. On charge donc :
   1) le refrain, 2) les photos et vidéos dans l'ordre du diaporama (2 à la fois),
   3) seulement ensuite les miniatures du fond et la musique principale. */
const ready = CONFIG.photos.map(() => false);
const preloaded = CONFIG.photos.map((ph) => {
  if (ph.video) {
    // Vidéo sans son, lue dans la page (obligatoire sur iPhone)
    const v = document.createElement("video");
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("muted", "");
    v.preload = "auto";
    if (ph.poster) v.poster = ph.poster;
    return v;
  }
  const im = new Image();
  im.decoding = "async";
  return im;
});

// Télécharge un fichier entier et le garde en mémoire (lecture instantanée ensuite)
function fetchBlobUrl(url) {
  return fetch(url).then((r) => { if (!r.ok) throw new Error(r.status); return r.blob(); }).then((b) => URL.createObjectURL(b));
}

function loadItem(i) {
  return new Promise((resolve) => {
    const ph = CONFIG.photos[i];
    const done = () => { ready[i] = true; updateGate(); resolve(); };
    if (ph.video) {
      fetchBlobUrl(ph.video)
        .then((u) => { preloaded[i].src = u; })
        .catch(() => { preloaded[i].src = ph.video; }) // repli : lecture directe
        .finally(done);
    } else {
      const im = preloaded[i];
      im.onload = done;
      im.onerror = done;
      im.src = ph.src;
      if (im.complete) done();
    }
  });
}

let refrainReady = !CONFIG.musiqueDiaporama;
const PRET_AVANT_CADEAU = Math.min(6, CONFIG.photos.length); // photos prêtes avant d'ouvrir le cadeau
let giftOpened = false;
let gateOpen = false;
const giftBtn = document.getElementById("openGift");
const hint = document.querySelector(".intro-hint");

function openGate() {
  if (gateOpen) return;
  gateOpen = true;
  giftBtn.disabled = false;
  giftBtn.classList.add("ready");
  hint.textContent = "Touche le cadeau";
}
function updateGate() {
  if (gateOpen) return;
  const n = ready.slice(0, PRET_AVANT_CADEAU).filter(Boolean).length;
  const pct = Math.round(((n + (refrainReady ? 2 : 0)) / (PRET_AVANT_CADEAU + 2)) * 100);
  hint.textContent = `Préparation de ta surprise… ${pct} %`;
  if (refrainReady && n === PRET_AVANT_CADEAU) openGate();
}

if (CONFIG.photos.length) {
  giftBtn.disabled = true;
  updateGate();
  setTimeout(openGate, 15000); // ne jamais bloquer : au bout de 15 s, on peut ouvrir quand même

  // 1) le refrain d'abord
  const refrainLoaded = CONFIG.musiqueDiaporama
    ? fetchBlobUrl(CONFIG.musiqueDiaporama)
        .then((u) => { if (phase === "intro" && music.paused && !giftOpened) music.src = u; })
        .catch(() => {})
        .finally(() => { refrainReady = true; updateGate(); })
    : Promise.resolve();

  // 2) puis les photos et vidéos dans l'ordre, 2 à la fois
  refrainLoaded.then(() => {
    let nextIndex = 0;
    const worker = () => (nextIndex < CONFIG.photos.length ? loadItem(nextIndex++).then(worker) : Promise.resolve());
    return Promise.all([worker(), worker()]);
  }).then(() => {
    // 3) enfin, ce qui sert après le diaporama
    preloadBackgroundPhotos();
    prefetchTrack(0);
  });
}

function runSlideshow() {
  const list = CONFIG.photos.length ? CONFIG.photos : PLACEHOLDERS;
  const stage = document.getElementById("slideStage");
  const progress = document.getElementById("slideProgress");
  progress.innerHTML = list.map(() => "<span></span>").join("");
  const bars = progress.querySelectorAll("span");

  slideshow.hidden = false;
  let i = 0, prev = null, waited = 0;
  (function next() {
    if (!main.hidden) return;
    if (i >= list.length) return showMain();
    // Photo pas encore arrivée (connexion lente) : on attend un peu au lieu d'afficher un cadre vide
    if (CONFIG.photos.length && !ready[i] && waited < 2500) { waited += 100; return setTimeout(next, 100); }
    waited = 0;
    const item = list[i];
    const slide = document.createElement("div");
    slide.className = "slide";
    // Légère inclinaison (2,5° max) : le grand cadre ne touche pas les bords de l'écran
    slide.style.setProperty("--r", (i % 2 ? 2 : -2) + Math.random() - 0.5 + "deg");
    const img = document.createElement("div");
    img.className = "slide-img";
    if (item.video) {
      const v = preloaded[i];
      v.className = "slide-video";
      img.appendChild(v);
      try { v.currentTime = 0; } catch (e) {}
      v.defaultPlaybackRate = v.playbackRate = item.vitesse || 1;
      v.play().catch(() => {}); // si la lecture est refusée, l'image d'aperçu reste affichée
    } else if (item.src) {
      const im = preloaded[i].cloneNode();
      im.alt = prenom;
      if (!im.getAttribute("src")) im.src = item.src; // pas encore préchargée : chargement direct
      const fail = () => (img.innerHTML = '<div class="slide-placeholder">🤍</div>');
      if (ready[i] && preloaded[i].complete && !preloaded[i].naturalWidth) fail();
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
    setTimeout(next, i === list.length ? CONFIG.dureeDernierePhoto : item.duree || CONFIG.dureePhoto);
  })();
}


giftBtn.addEventListener("click", (e) => {
  giftOpened = true;
  e.currentTarget.disabled = true; // évite de lancer le diaporama deux fois
  startMusic();
  burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 90);
  intro.classList.add("hide");
  setTimeout(() => intro.remove(), 450);
  runSlideshow();
}, { once: true });

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
