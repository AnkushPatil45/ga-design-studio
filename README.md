# GA Design Studio

Website for GA Design Studio, an architecture practice working across Dhule, Nashik, Mumbai and Pune.

*Creativity, Values and Freedom.*

**Live site:** [ankushpatil45.github.io/ga-design-studio](https://ankushpatil45.github.io/ga-design-studio/)

## Website

Next.js site with an English and Marathi toggle.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

- `app/` layout, global styles, fonts and icons
- `components/` one file per section: Hero, Studio, Work, Process, Cities, Contact, Footer
- `lib/content.ts` all copy in English and Marathi, projects, cities and contact details
- `public/images/` project photography, `public/brand/` logo files

Contact details and projects in `lib/content.ts` are placeholders until real ones are supplied.

## Brand

**Final logo: Mehrab.** A pointed arch drawn from two true arcs, a jaali lattice, an eight point star keystone and three steps for Creativity, Values and Freedom, framing a classical GA monogram.

`brand/logo/`
- `svg/` and `png/`: detailed mark, simple mark, one colour marks (brass, ivory, green), horizontal, stacked and Marathi lockups. Dark, light and transparent versions.
- `favicon/`: simplified mark for small sizes. SVG, ICO, 16, 32, 180, 192 and 512 px.

| Colour | Hex |
| --- | --- |
| Neem Green | `#0F2A22` |
| Temple Brass | `#C9A45C` |
| Ivory | `#F1E8D6` |
| Basalt | `#2B2E2C` |

Type: Cormorant Garamond (display), IBM Plex Mono (text), Tiro Devanagari Marathi (Marathi). All open licence.

`brand/logo-prototypes/` keeps all three explored concepts (Massing, Mehrab, Compass) with their brand boards.
