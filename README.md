# Manoj Parthiban: Personal Portfolio

Silicon Valley styled single-page portfolio built with React, Vite, TypeScript, Tailwind CSS and Framer Motion. Deployed on Vercel.

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## Project structure

```text
public/
  favicon.svg       MP ligature mark (source for all icons)
  site.webmanifest
  icons/            PNG favicon, apple-touch and Android icons
  images/
    profile/        avatar
    projects/       project previews
    blog/           article covers
    logos/          brand logos
  resume/           latest resume PDF

src/
  main.tsx          app entry (theme, motion, analytics)
  App.tsx
  pages/
    Home.tsx        assembles the sections in order
  sections/         one folder per page section
    hero/           HeroSection, HeroGlobe (canvas 3D globe)
    about/          AboutSection (bento, timeline, client tabs)
    skills/         SkillsSection, SkillOrbit (3D skill sphere)
    projects/       ProjectsSection, ProjectCard
    blog/           BlogSection, BlogCard
    contact/        ContactSection (form, flip card, footer)
  components/
    layout/         Navigation, MobileMenu, ScrollToTop, SmoothScroll
    common/         TiltCard, SectionBits (header, label, reveal)
    theme/          ThemeProvider, ThemeToggle
    ui/             shadcn primitives
  lib/
    scroll.ts       scroll to a section below the nav bar
    resume.ts       current resume path
    utils.ts
  styles/
    globals.css     design tokens + all component styles
```

`_archive/` holds files that are no longer used (old images, unused UI components, Storybook stories, the Firebase placeholder). Nothing in it is part of the build, and it can be deleted.

## Notes

- Images in `public/images` are pre-sized WebP. Add new ones at about 2x their on-screen size.
- Framer Motion is loaded through `LazyMotion`, so use `m.div` rather than `motion.div` (strict mode throws otherwise).
- To update the resume, drop the PDF in `public/resume/` and change the one line in `src/lib/resume.ts`.
