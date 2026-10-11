# Kairos website

The download page for Kairos. Plain HTML, CSS and a little JavaScript; no build step.

## Preview locally

```sh
python3 -m http.server 4173 --directory website
open http://localhost:4173
```

Tests live outside this folder, in `tools/site-tests/` (`npm test` and `npm run unit`).

## Publish for the first time

The repo is `EphemeralHorizon/Kairos`, set in `index.html` (three Download links and `og:image`) and `js/config.js`.

1. Push this folder's contents to the repo's `main` branch.
2. On GitHub: Settings → Pages → Build and deployment → Deploy from a branch → `main` / root.
3. The site appears at `https://ephemeralhorizon.github.io/Kairos/`.

Until a release exists, every Download button reads "Coming soon".

## Release a new version

1. Build `Kairos.dmg` (`scripts/release.sh` in the app project).
2. On GitHub: Releases → Draft a new release → tag `v1.0` (or the next version).
3. Attach the file. It must be named exactly `Kairos.dmg`.
4. Publish. The footer version updates on its own.
5. **First release only:** delete `data-coming-soon` from the `<body>` tag in `index.html` and push. The page also switches itself on when GitHub reports a release containing `Kairos.dmg`, but that check can fail (offline visitors, GitHub's 60-requests-an-hour limit), so don't rely on it.

## Later changes

- **Releases are notarized** (after joining the Apple Developer Program): delete the `<div data-unnotarized>` block in `index.html`.
- **Custom domain:** add a `CNAME` file containing the domain (for example `kairos.app`), then set the domain under Settings → Pages.
- **App screenshot:** save it as `assets/screenshot.png` and put
  `<img src="assets/screenshot.png" alt="Kairos Now Playing window with the stem mixer" width="…" height="…">`
  inside `<figure class="product">`.
