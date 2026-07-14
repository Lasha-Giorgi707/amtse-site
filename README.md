# ამწე — crane-rental marketing site

Static B2B marketing + contact site for ამწე (Georgian crane-rental company).
Plain HTML/CSS/JS, no build step — deployable as-is to GitHub Pages.

## Structure

```
index.html          home (hero video, scroll-scrub section, services, why-us, gallery)
contact.html        contact form, direct-contact block, FAQ
css/style.css       design system (see DESIGN.md)
js/main.js          nav, scroll-scrub video, reveals, gallery playback, form
assets/             Higgsfield-generated videos + stills
favicon.svg         crane silhouette
PRODUCT.md          strategy / brand register
DESIGN.md           visual system
```

## Before launch — replace the amber-flagged placeholders

Search for `class="todo"` in both HTML files:

- [ ] Phone `[TELEFONI: SHESAVSEBI …]` (footer ×2, contact page)
- [ ] Email `[EMAILI: SHESAVSEBI]`
- [ ] Address / service area `[MISAMARTI/SAMSAKhurEBIS ZONA: SHESAVSEBI]`
- [ ] Working hours `[SAMUSHAO SAATEBI: SHESAVSEBI]`
- [ ] Crane specs + rates (service spec tables, `[დრაფტი: …]`)
- [ ] FAQ draft answers (contact page)
- [ ] Social links `[BMULEBI: SHESAVSEBI]`
- [ ] Contact form endpoint: wire `data-contact-form` submit in `js/main.js`
      to Formspree/Basin/own backend, remove the `[FORM ENDPOINT: SHESAVSEBI]` notice
- [ ] `og:image` meta tags → absolute URL after deploy

## Scroll-scrub note

The home-page centerpiece maps `video.currentTime` to scroll progress
(340vh runway, sticky viewport, lerp smoothing). On screens ≤800px or with
`prefers-reduced-motion`, it degrades to a plain looping video. If scrubbing
feels steppy on some machines, re-encode with denser keyframes:
`ffmpeg -i scrub-crane-lift.mp4 -g 5 -crf 20 -movflags +faststart out.mp4`.

## Deployments

- GitHub Pages: https://lasha-giorgi707.github.io/amtse-site/ (auto-deploys on push to `main`)
- Vercel: https://amtse-site.vercel.app (redeploy with `npx vercel deploy --prod`)
- Repo: https://github.com/Lasha-Giorgi707/amtse-site
