// ====== Beállítások ======
const ANIM_MS = 900;
const PULSE_INTERVAL = 3000;

// 👉 Itt tudod átírni a százalékot (0–100 között)
const INITIAL_PERCENT = 0;

// clamp helper
function clampPercent(n) {
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;
}

// Fő inicializálás
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("support-meter");
  const valueEl = document.getElementById("support-value");
  if (!root || !valueEl) return;

  // induló érték
  let current = clampPercent(INITIAL_PERCENT);
  draw(current);

  // Random pulzálás hozzáadása
  setInterval(() => {
    if (Math.random() > 0.7) {
      pulseEffect();
    }
  }, PULSE_INTERVAL);

  function pulseEffect() {
    root.style.transform = "scale(1.03)";
    root.style.filter =
      "drop-shadow(0 0 15px rgba(230, 57, 70, 0.7))";
    setTimeout(() => {
      root.style.transform = "scale(1)";
      root.style.filter =
        "drop-shadow(0 6px 20px rgba(230, 57, 70, 0.3))";
    }, 500);
  }

  // belső animátor
  function animateTo(target) {
    target = clampPercent(target);
    const start = current;
    const delta = target - start;
    const t0 = performance.now();

    function easeOutElastic(t) {
      const p = 0.3;
      return (
        Math.pow(2, -10 * t) *
          Math.sin(((t - p / 4) * (2 * Math.PI)) / p) +
        1
      );
    }

    function frame(now) {
      const t = Math.min(1, (now - t0) / ANIM_MS);
      const eased = easeOutElastic(t);
      const v = start + delta * eased;
      current = v;
      draw(v);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // kirajzolás: szám + gyűrű
  function draw(pct) {
    const clamped = clampPercent(pct);
    valueEl.textContent = `${Math.round(clamped)}%`;

    const deg = (clamped / 100) * 360;

    root.querySelector(
      ".ring"
    ).style.background = `radial-gradient(closest-side, transparent calc(50% - var(--thick)), var(--ring-bg) calc(50% - var(--thick) + 1px) 50%, transparent calc(50% + 1px)),
       conic-gradient(
         var(--primary) 0deg,
         var(--secondary) ${Math.max(0, deg * 0.5)}deg,
         var(--tertiary) ${Math.max(0, deg * 0.75)}deg,
         #6a040f ${deg}deg,
         rgba(106, 4, 15, 0.3) ${deg}deg 360deg
       )`;

    if (clamped > 70) {
      root.querySelector(".blood-drips").style.opacity = "0.7";
    } else {
      root.querySelector(".blood-drips").style.opacity = "0.3";
    }
  }

  // publikus API — ha JS-ből akarod változtatni
  window.setSupport = (pct) => animateTo(pct);

  // Random vércseppek
  setInterval(() => {
    if (Math.random() > 0.8) {
      createBloodDrop();
    }
  }, 2000);
});

// Vércsepp létrehozása
function createBloodDrop() {
  const drop = document.createElement("div");
  drop.className = "blood-drop";
  drop.style.left = `${Math.random() * 100}%`;
  drop.style.animationDuration = `${1 + Math.random() * 2}s`;
  document.querySelector(".wrap").appendChild(drop);
  setTimeout(() => {
    drop.remove();
  }, 2000);
}
