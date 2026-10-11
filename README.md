# Kairos website

The download page for Kairos. Plain HTML, CSS and a little JavaScript; no build step.

## Preview locally

```sh
python3 -m http.server 4173 --directory website
open http://localhost:4173
```

Tests live outside this folder, in `tools/site-tests/` (`npm test` and `npm run unit`).

## Publish for the first time

1. Create a public GitHub repo named `kairos`, and push this folder's contents to its `main` branch.
2. Replace `REPLACE_USER` with your GitHub username in `index.html` (three Download links) and `js/config.js`.
3. On GitHub: Settings → Pages → Build and deployment → Deploy from a branch → `main` / root.
4. The site appears at `https://<username>.github.io/kairos/`.

Until a release exists, every Download button reads "Coming soon".

## Release a new version

1. Build `Kairos.dmg` (`scripts/release.sh` in the app project).
2. On GitHub: Releases → Draft a new release → tag `v1.0` (or the next version).
3. Attach the file. It must be named exactly `Kairos.dmg`.
4. Publish. The Download buttons and footer version update on their own; no site edit needed.

## Later changes

- **Releases are notarized** (after joining the Apple Developer Program): delete the `<div data-unnotarized>` block in `index.html`.
- **Custom domain:** add a `CNAME` file containing the domain (for example `kairos.app`), then set the domain under Settings → Pages.
- **App screenshot:** save it as `assets/screenshot.png` and put
  `<img src="assets/screenshot.png" alt="Kairos Now Playing window with the stem mixer" width="…" height="…">`
  inside `<figure class="product">`.
