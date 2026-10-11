// Pure maths for the horizon, matching HorizonAnimation in the app (KairosMoment.swift).

const clamp01 = p => Math.min(1, Math.max(0, p));

/**
 * Sun centre as fractions of canvas width and height. Starts just risen above `horizon`, arcs across,
 * and sinks fully below it by the end (`radius` is the sun's radius as a fraction of height).
 */
export function sunPosition(progress, horizon = 0.58, radius = 0) {
  const p = clamp01(progress);
  return { x: 0.2 + 0.6 * p, y: horizon + 0.02 - 0.18 * Math.sin(Math.PI * p) + 1.1 * radius * p * p };
}

/** Index of the story caption to show for scroll progress through the story. */
export function activeCaption(progress, count) {
  return Math.min(count - 1, Math.floor(clamp01(progress) * count));
}

/** Vertical offset of stem wave `i` at horizontal fraction `x` and time `t` (seconds), in units of amplitude. */
export function waveY(i, x, t) {
  const speed = 1.2 + 0.35 * i, freq = 2 + 0.7 * i;
  return Math.sin(freq * 2 * Math.PI * x + t * speed) * (0.6 + 0.4 * Math.sin(t * 0.7 + i));
}
