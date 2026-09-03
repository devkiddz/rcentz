RCENTZ M07 — PORTFOLIO TECHNOLOGY RAIL

Placement:
Hero
→ How the work is built
→ Built with / Technology rail
→ Published work
→ Build journey
→ Outcomes

The visual language is based on the existing Rcentz homepage technology rail.

Important difference:
The homepage list is static.
This Portfolio rail is generated from the technologies attached to published Portfolio projects.

Behavior:
- unique technologies are aggregated across all public portfolio projects
- most frequently used technologies appear first
- technologies used by multiple projects show their usage count
- known brands use safe existing Simple Icons already available in Rcentz
- other technologies receive compact text marks
- marquee pauses on hover
- reduced-motion users get horizontal scrolling instead of animation

FILES:
features/portfolio/components/PortfolioTechnologyRail.tsx
features/portfolio/components/PortfolioIndex.tsx

APPLY:
Extract into:
C:\Users\DeWealth\Desktop\rcentz-systems

Choose Replace.

Then:
pnpm typecheck
pnpm lint
pnpm dev
