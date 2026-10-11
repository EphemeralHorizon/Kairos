// The horizon from the app's story screen, drawn behind the hero and story.
// The sun follows scroll; the four stem waves ripple on their own.
import { sunPosition, activeCaption, waveY } from './motion.js';

const canvas = document.getElementById('horizon');
const story = document.getElementById('story');
const lines = [...document.querySelectorAll('.story-line')];
const ctx = canvas.getContext('2d');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

const STEMS = ['#8C73FF', '#B86BFF', '#EB6BE0', '#FF7AA8'];
const HORIZON = 0.58;

document.documentElement.classList.add('js');
if (!still) document.documentElement.classList.add('motion');

let width = 0, height = 0, sun = 0, active = -1, visible = true;

function resize() {
  const dpr = devicePixelRatio || 1;
  width = innerWidth;
  height = innerHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw(t) {
  const w = width, h = height, horizon = h * HORIZON;

  // Sky: night base, then the glow toward the horizon.
  ctx.fillStyle = '#0F0D1F';
  ctx.fillRect(0, 0, w, h);
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, '#140F29');
  sky.addColorStop(1, 'rgb(140 115 255 / 0.45)');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, horizon);

  // The sun and its glow.
  const { x, y } = sunPosition(still ? 0.35 : sun);
  const sx = w * x, sy = h * y, r = Math.min(w, h) * 0.11;
  const glow = ctx.createRadialGradient(sx, sy, r * 0.5, sx, sy, r * 2.6);
  glow.addColorStop(0, 'rgb(184 107 255 / 0.55)');
  glow.addColorStop(1, 'rgb(184 107 255 / 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(sx - r * 2.6, sy - r * 2.6, r * 5.2, r * 5.2);
  const disc = ctx.createLinearGradient(sx, sy - r, sx, sy + r);
  disc.addColorStop(0, '#FFFFFF');
  disc.addColorStop(1, '#B86BFF');
  ctx.fillStyle = disc;
  ctx.beginPath();
  ctx.arc(sx, sy, r, 0, Math.PI * 2);
  ctx.fill();

  // Ground hides the sun as it sets.
  ctx.fillStyle = '#0A0814';
  ctx.fillRect(0, horizon, w, h - horizon);
  ctx.strokeStyle = 'rgb(255 255 255 / 0.55)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(w, horizon);
  ctx.stroke();

  // Four stem waves, each with its own rhythm.
  const below = h - horizon, amp = below * 0.07;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.globalAlpha = 0.9;
  STEMS.forEach((color, i) => {
    const base = horizon + below * (0.22 + 0.19 * i);
    ctx.strokeStyle = color;
    ctx.beginPath();
    for (let step = 0; step <= 80; step++) {
      const px = w * step / 80, py = base + amp * waveY(i, step / 80, t);
      step ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
}

function onScroll() {
  const storyEnd = story.offsetTop + story.offsetHeight;
  sun = Math.min(1, Math.max(0, scrollY / Math.max(1, storyEnd - innerHeight)));
  canvas.dataset.progress = sun.toFixed(2);

  // Fade the sky out as the features come up.
  const fade = (scrollY + innerHeight - storyEnd) / (innerHeight * 0.6);
  const opacity = Math.min(1, Math.max(0, 1 - fade));
  canvas.style.opacity = opacity;
  visible = opacity > 0;

  if (!still) {
    const p = (scrollY - story.offsetTop) / Math.max(1, story.offsetHeight - innerHeight);
    const next = activeCaption(p, lines.length);
    if (next !== active) {
      lines[active]?.classList.remove('is-active');
      lines[next].classList.add('is-active');
      active = next;
    }
  }
}

function loop(now) {
  if (visible) draw(now / 1000);
  requestAnimationFrame(loop);
}

addEventListener('resize', () => { resize(); onScroll(); if (still) draw(0); });
addEventListener('scroll', onScroll, { passive: true });
resize();
onScroll();
if (still) draw(0);
else requestAnimationFrame(loop);
