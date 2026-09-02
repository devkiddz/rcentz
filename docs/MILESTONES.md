# M06 — Database-Driven Public Homepage

**Status:** 🟡 In Progress  
**Last Updated:** 2026-09-02

## Objective

Create the first complete public-facing Rcentz experience powered by the database while preserving the Rcentz visual system and application-shell architecture.

The homepage is intended to do more than describe Rcentz.

```text
HERO
  ↓
UNDERSTAND RCENTZ

PUBLIC SECTIONS
  ↓
INVESTIGATE RCENTZ

DATABASE CONTENT
  ↓
VERIFY WHAT RCENTZ ACTUALLY BUILDS
```

---

## Current Homepage Composition

The current public homepage is assembled through:

```text
app/page.tsx
  ↓
getHomepageData()
  ↓
HomeHero
  ↓
HomeServices
  ↓
HomeProjects
  ↓
HomeCTA
```

`app/page.tsx` remains a server component and requests homepage data before composing the public sections.

The page currently uses:

```text
export const revalidate = 300;
```

to allow periodic regeneration of database-backed homepage content.

---

## Database Integration

The homepage data layer is implemented in:

```text
features/home/server/get-homepage-data.ts
```

Current homepage queries include:

### Featured Services

The homepage requests active featured services and includes:

* Service identity
* Slug
* Short description
* Service type
* Category
* Multi-currency pricing

Current public homepage limit:

```text
6 featured services
```

### Featured Portfolio Projects

The homepage requests published featured portfolio profiles connected to public projects.

The result includes:

* Project identity
* Project slug
* Project description
* Project type
* Project status
* Project progress
* Portfolio tagline
* Portfolio summary
* Portfolio outcome
* Live URL
* Repository URL
* Publication date
* Technologies

Current public homepage limit:

```text
4 featured projects
```

Decimal values are converted to serializable numbers and publication dates are converted to ISO strings before crossing into presentation components.

---

## Hero Story System

The homepage Hero has evolved into an interactive visual product presentation rather than a conventional static marketing hero.

Current story sequence:

```text
01 Rcentz
02 System
03 Live Data
04 Commerce
05 Rcentz Core
```

Each chapter communicates a different part of the Rcentz platform.

### Story Architecture

```text
HomeHero
  ↓
HeroStoryEngine
  ↓
Active Story
  ↓
Story Copy + Interactive Illustration
```

The story controller supports:

* Previous story
* Next story
* Direct chapter selection
* Timed story progression
* Reduced-motion behaviour
* Responsive chapter presentation

### Rcentz Story

The first story now establishes the primary public message:

```text
We build websites that power business.
```

It combines:

* Rcentz positioning
* Rotating service highlights
* Animated application/dashboard illustration
* Performance visualization
* Readiness visualization
* Recent-order presentation
* Top-pages presentation
* Website preview
* Code typing
* System-status presentation

The perspective visual is implemented as multiple independent UI planes rather than one flattened dashboard.

Current perspective components include:

```text
perspective/
├── PerspectiveSurface.tsx
├── PerformanceDashboard.tsx
├── RecentOrdersPanel.tsx
├── TopPagesPanel.tsx
├── WebsitePreviewPanel.tsx
├── CodeTypingPanel.tsx
├── SystemStatusDock.tsx
└── RcentzPerspectiveStage.tsx
```

This establishes a reusable approach for future Rcentz presentation scenes.

### Hero Motion Direction

The Hero currently uses:

```text
motion/react
```

The motion language includes:

* Soft story transitions
* Staggered interface reveals
* Animated charts
* Animated metrics
* Typing behaviour
* Pulsing signals
* Controlled floating perspective planes
* Responsive mobile compositions
* Reduced-motion handling

The visual data used inside illustrative dashboard scenes is demo presentation data and is not presented as live production analytics.

---

## Responsive Hero Direction

The Hero now has distinct desktop and mobile presentation strategies.

### Desktop

Desktop uses:

```text
LEFT
Narrative / positioning / service information

RIGHT
Interactive visual system
```

The right visual may contain independent perspective planes and animated application surfaces.

### Mobile

Mobile remains the same story system but uses:

* Compact narrative copy
* Larger visual focus
* Reduced textual clutter
* Dedicated mobile compositions
* Simplified layout density
* Responsive chapter controls

Mobile Hero behaviour has been reviewed and is currently considered a strong checkpoint.

---

## Current Public Sections

### Services

`HomeServices` already consumes canonical service records supplied by `getHomepageData()`.

Current implementation includes:

* Category/type
* Service name
* Short description
* NGN starting price
* Featured-service query integration

The current presentation is functional but remains visually simpler than the completed Hero.

### Selected Work

`HomeProjects` already consumes public featured portfolio records supplied by `getHomepageData()`.

Current implementation includes:

* Project type
* Project status
* Project name
* Portfolio tagline
* Technology tags
* Project progress
* Live project link

The current presentation is functional but remains visually simpler than the completed Hero.

### CTA

The homepage CTA is already present as the final public conversion section.

Its final visual and conversion flow will continue to evolve with the rest of M06.

---

## Verification

The current Hero checkpoint passed:

```text
pnpm typecheck
pnpm lint
pnpm build
```

Verified:

```text
TypeScript                  PASS
ESLint                      PASS
Prisma Client generation    PASS
Next.js production build    PASS
```

Current production build routes:

```text
○ /
○ /_not-found
ƒ /api/auth/[...all]
```

A PostgreSQL SSL-mode future-compatibility warning is currently emitted by the `pg` dependency during build. It does not block compilation or page generation and should be handled during production hardening.

---

## Git Evidence

### Current Hero Checkpoint

```text
c1b55e611a4cc7dc4b48a08e760fcc99ef6d7f25
```

### Commit Message

```text
feat(home): refine responsive hero storytelling
```

This checkpoint includes the current responsive Hero storytelling, modular perspective composition, animated chart refinements and final lint-safe typing behaviour.

---

## M06 Exit Criteria

* [x] Homepage server composition established
* [x] Homepage feature boundary established
* [x] Database-backed featured services integrated
* [x] Database-backed featured projects integrated
* [x] Homepage revalidation strategy established
* [x] Responsive Hero architecture implemented
* [x] Interactive multi-story Hero implemented
* [x] Mobile Hero presentation implemented
* [x] Reduced-motion handling implemented
* [x] Hero visual checkpoint reviewed
* [x] Hero TypeScript verified
* [x] Hero ESLint verified
* [x] Production build verified
* [ ] Services section presentation completed
* [ ] Selected-work section presentation completed
* [ ] CTA presentation/conversion flow completed
* [ ] Homepage empty-state behaviour reviewed
* [ ] Homepage loading/error behaviour reviewed
* [ ] Homepage SEO metadata established
* [ ] Homepage accessibility review completed
* [ ] Homepage performance review completed
* [ ] Final desktop/mobile homepage review completed
* [ ] M06 implementation checkpoint committed
* [ ] M06 milestone closure documented

---

## Current Result

Rcentz now has a database-aware public homepage and a distinctive interactive Hero capable of explaining the platform through live visual storytelling.

```text
DATABASE
   ↓
HOMEPAGE DATA LAYER
   ↓
PUBLIC HOMEPAGE
   │
   ├── Interactive Hero
   ├── Featured Services
   ├── Selected Work
   └── CTA
```

The Hero is now considered a strong implementation checkpoint.

M06 remains active because the sections beneath the Hero still need to be raised to the same product-quality presentation level and the final public-page SEO, accessibility and performance gates remain open.

**Next Implementation Target:** `HomeServices.tsx`
