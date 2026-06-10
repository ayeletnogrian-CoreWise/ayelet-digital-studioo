# Ayelet Digital Studio

Hebrew RTL portfolio website — static, ready for GitHub Pages or Vercel.

---

## Files created / updated

| File | Description |
|------|-------------|
| `index.html` | Full single-page website (all sections) |
| `style.css` | All styles — responsive, RTL, design tokens |
| `script.js` | Mobile menu, lightbox, scroll animations, form handler |
| `README.md` | This file |

---

## Image folders used

| Folder | Used in |
|--------|---------|
| `images/hero/` | Hero section cover |
| `images/projects/sahar-gayan/` | Project 1 — Sahar Gayan |
| `images/projects/save-the-date-orly-bar/` | Project 2 — Orly Bar |
| `images/projects/invitations/save-the-date/` | Project 3 — Save the Date gallery |
| `images/projects/invitations/` | Project 4 — Wedding Invitations (tal-idan-*.PNG) |
| `images/projects/ariel-story-design/` | Project 5 — Ariel Story Design |
| `images/projects/career-portfolio/` | Project 6 — Career Portfolio |

Note: `images/logo/`, `images/references/`, and `images/projects/invitations/wedding-invitations/` are empty and were not used.

---

## How to open locally

**Option 1 — Direct file open**
Double-click `index.html` to open in your browser. Images load correctly since all paths are relative.

**Option 2 — Local dev server (recommended for accurate behavior)**

Node.js:
```bash
npx serve .
```

Python:
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`

---

## Deploying

### GitHub Pages
1. Push folder contents to a GitHub repo
2. Settings > Pages > Source: `main` branch, `/ (root)`
3. Live at `https://yourusername.github.io/repo-name/`

### Vercel
1. Import repo at vercel.com
2. No build step — static site
3. Output Directory: `.` (root)

---

## Before publishing — update these

1. **WhatsApp link** — find `.whatsapp-btn` in `index.html` and replace the href:
   ```html
   <a href="https://wa.me/972XXXXXXXXX" ...>
   ```

2. **Contact form** — connect to a real service to receive messages:
   - [Formspree](https://formspree.io): add `action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag
   - [Netlify Forms](https://docs.netlify.com/forms/setup/): add `netlify` attribute to the `<form>` tag

---

## Optional additions for later

- Favicon (`favicon.ico` or `favicon.svg`)
- `og:image` meta tag for social sharing previews
- Google Analytics or Plausible for traffic
- More project cards as new image folders arrive
- Custom domain via GitHub Pages or Vercel settings
