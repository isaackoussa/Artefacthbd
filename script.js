/* =========================================================
   ✏️ PERSONNALISATION — modifie seulement cette partie
   ========================================================= */
const CONFIG = {
  // Prénom de ton amie (tu peux aussi utiliser l'URL : ?prenom=Sarah)
  prenom: "ma belle",

  // Le message qui s'écrit tout seul dans la lettre
  message:
    "Joyeux anniversaire ! 🎂\n\n" +
    "Je voulais te dire à quel point tu m'inspires. " +
    "Tu es une femme battante, courageuse, qui travaille dur et qui ne baisse jamais les bras. " +
    "Ta force et ta détermination me motivent chaque jour à donner le meilleur de moi-même.\n\n" +
    "Que cette nouvelle année t'apporte autant de bonheur, de réussite et d'amour " +
    "que tu en donnes autour de toi. Tu mérites tout ce qu'il y a de plus beau. 🤍",
};

/* ========================================================= */

const EMOJIS = ["🤍", "🤍", "🤍", "🎉", "🎈", "🎂", "🥳", "✨", "🎁", "🍾", "🥂", "🌸", "💫", "🎊"];

// Prénom depuis l'URL si présent
const params = new URLSearchParams(location.search);
const prenom = (params.get("prenom") || CONFIG.prenom).trim();
document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = prenom));
document.title = `Joyeux anniversaire ${prenom} 🤍`;

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
    const speed = 4 + Math.random() * 9;
    const isHeart = Math.random() < 0.25;
    pieces.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      size: isHeart ? 14 + Math.random() * 10 : 6 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      life: 0,
      maxLife: 120 + Math.random() * 80,
      heart: isHeart,
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
    p.vy += 0.22;
    p.vx *= 0.985;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    if (p.heart) {
      ctx.font = `${p.size}px serif`;
      ctx.fillText("🤍", -p.size / 2, p.size / 2);
    } else {
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    }
    ctx.restore();
  }
  if (pieces.length) requestAnimationFrame(tick);
  else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

/* ---------- Ouverture du cadeau ---------- */
const intro = document.getElementById("intro");
const main = document.getElementById("main");
document.getElementById("openGift").addEventListener("click", (e) => {
  burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 220);
  main.hidden = false;
  intro.classList.add("hide");
  setTimeout(() => rain(2000), 500);
  setTimeout(() => intro.remove(), 900);
});

/* ---------- Apparition au scroll ---------- */
const observer = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); observer.unobserve(en.target); }
  }),
  { threshold: 0.2 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

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
      if (i < chars.length) setTimeout(type, chars[i - 1] === "\n" ? 250 : 28);
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
  burst(e.clientX, e.clientY, 200);
  rain(2000);
});

/* ---------- Petit cœur à chaque clic ---------- */
document.addEventListener("click", (e) => {
  if (e.target.closest("button, a")) return;
  burst(e.clientX, e.clientY, 25);
});
