# Fortnight — hosting

Upload the **contents of this folder** (not the folder itself) to a GitHub repository,
then turn on GitHub Pages.

Two things that matter:
- `.nojekyll` must be uploaded. Without it GitHub runs Jekyll, which silently deletes
  any folder starting with an underscore — the app would load without its stylesheet.
- Upload the `ds` folder too. It holds the stylesheet and component bundle.

Files:
- index.html ........ the app
- support.js ........ runtime it loads
- ds/ ............... design system stylesheet + bundle
- manifest.webmanifest, sw.js, icon-*.png ... PWA install + offline
- .nojekyll ......... tells GitHub Pages not to rewrite the folder
