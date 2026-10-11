// Shows the latest release in the footer, and switches the Download buttons on once a release exists.
import { REPO } from './config.js';

/** "v1.0 · November 2, 2026", or null if the release is missing a tag or date. */
export function formatRelease(json) {
  if (!json?.tag_name || !json?.published_at) return null;
  const date = new Date(json.published_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
  return `${json.tag_name} · ${date}`;
}

export async function loadRelease(fetchFn = fetch) {
  const buttons = document.querySelectorAll('.download');
  if (document.body.hasAttribute('data-coming-soon')) buttons.forEach(b => b.setAttribute('aria-disabled', 'true'));
  try {
    const res = await fetchFn(`https://api.github.com/repos/${REPO}/releases/latest`);
    if (!res.ok) return;
    const label = formatRelease(await res.json());
    if (!label) return;
    document.getElementById('release-version').textContent = label;
    document.body.removeAttribute('data-coming-soon');
    buttons.forEach(b => b.removeAttribute('aria-disabled'));
  } catch {
    // Offline or rate-limited: keep "Latest version".
  }
}

if (typeof document !== 'undefined') loadRelease();
