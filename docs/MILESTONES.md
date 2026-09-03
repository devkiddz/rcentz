# RCENTZ SYSTEM
## Development Milestones

**Project:** Rcentz System  
**Document:** Development Milestones  
**Version:** 1.3  
**Status:** Active / Living Document  
**Last Updated:** 2026-09-03

---

# 1. Purpose

This document tracks the implementation progress of the Rcentz System.

The **Master Blueprint** defines what Rcentz is and the long-term architectural direction. This milestone document defines:

- What is being built
- The order of implementation
- What each milestone must accomplish
- What must be tested before moving forward
- Important architectural decisions
- Completed, active, deferred and pending work

This is a living document and must reflect the real state of the codebase.

---

# 2. Development Philosophy

Rcentz is developed module by module and file by file.

```text
PLAN
  ↓
ARCHITECT
  ↓
IMPLEMENT ONE FILE / MODULE
  ↓
AUDIT
  ↓
DISCUSS / MODIFY
  ↓
TEST
  ↓
DOCUMENT
  ↓
COMMIT / PUSH
  ↓
NEXT MODULE / MILESTONE
```

Important architectural decisions should remain:

- Understandable
- Auditable
- Reusable
- Testable
- Consistent with the Master Blueprint

## Milestone Closure Rule

A milestone is a one-time implementation checkpoint.

When a milestone is complete:

- Its intended architecture and public contracts are considered settled.
- It is tested.
- It is documented.
- The implementation is committed and pushed.
- Development moves forward.

A completed milestone should only be reopened for a genuine defect or a demonstrated later architectural dependency.

Future routes may be defined before their destination pages are implemented when the route contract belongs to an earlier shell or navigation milestone.

---

# 3. Status Legend

| Status | Meaning |
|---|---|
| ⬜ Not Started | Work has not started |
| 🟡 In Progress | Currently being implemented |
| 🟢 Completed | Implemented and tested |
| 🔴 Blocked | Cannot proceed because of an unresolved dependency |
| 🔵 Review | Implemented but awaiting review |
| ⚪ Deferred | Intentionally postponed |

---

# 4. Overall Roadmap

```text
M01  Project Foundation
 ↓
M02  Architecture & Conventions
 ↓
M03  Design System / UI Canvas
 ↓
M04  Database Foundation
 ↓
M05  Global Application Shell
 ↓
M06  Public Homepage
 ↓
M07  Portfolio Engine
 ↓
M08  Services Engine
 ↓
M09  Commerce Foundation
 ↓
M10  Authentication & User System
 ↓
M11  Client Project Management
 ↓
M12  Admin Control Center
 ↓
M13  Blog / Community Content
 ↓
M14  Messaging / Support / Notifications
 ↓
M15  Analytics
 ↓
M16  SEO / Performance
 ↓
M17  Production Hardening
 ↓
M18  Mobile / Future Application Readiness
```

---

# 5. M01 — Project Foundation

**Status:** 🟡 In Progress

## Objective

Create the initial Rcentz application and establish the fundamental development environment.

## Scope

- Next.js application
- TypeScript
- Package manager
- Tailwind CSS
- shadcn/ui foundation
- Shared UI/icon dependencies
- Environment variables
- Development scripts
- Local development environment
- Git repository and `main` branch

## Exit Criteria

- Application starts locally
- TypeScript compiles
- Tailwind foundation is established
- shadcn/ui dependency checkpoint is formally closed
- Shared UI/icon dependencies are formally closed
- Environment configuration supports the current database/auth foundation
- Git repository and main branch are established

---

# 6. M02 — Architecture & Folder Conventions

**Status:** 🟡 In Progress

## Objective

Establish the structural conventions that govern the Rcentz codebase.

## Primary Boundaries

```text
app/
features/
components/
server/
lib/
data/
docs/
ui-shell/
prisma/
```

Directories should be created when real implementation requires them. Empty folders should not be added only to imitate the intended architecture.

## Architectural Flow

```text
USER
  ↓
APPLICATION SURFACE
  ↓
FEATURE / ENGINE
  ↓
BUSINESS LOGIC
  ↓
DATA ACCESS
  ↓
DATABASE / PROVIDER
```

## Principles

- Business logic should not be scattered through UI components.
- Feature boundaries should remain reusable.
- Server/data access should remain outside presentation components.
- Architecture should support:
  - Public Web
  - Client Dashboard
  - Admin System
  - Future mobile/native applications

## Exit Criteria

- Folder architecture documented
- Responsibilities defined
- First `features/` business boundary established
- Server/data-access conventions documented
- Architecture recorded in `docs/ARCHITECTURE.md`
- M02 closure checkpoint documented

---

# 7. M03 — Rcentz UI Canvas & Design System

**Status:** 🟢 Completed

## Objective

Establish the reusable visual foundation and persistent presentation environment for Rcentz application surfaces.

## Final Canvas Foundation

```text
Environmental Canvas: 1440px
Public Content Axis:   1200px
```

The application remains intentionally bounded on very large displays.

## Theme Foundation

Semantic tokens exist for:

- Background / foreground
- Surfaces
- Muted states
- Borders
- Primary / secondary
- Accent
- Destructive states
- Grid lines
- Radius values

Visual direction:

```text
BLACK
  +
WHITE
  +
STRUCTURAL GRID
  +
CONTROLLED LIGHT
```

Teal is used as a restrained signal/accent while foreground hierarchy remains neutral.

## Shell Architecture

```text
RcentzShell
│
├── RcentzDataField
├── RcentzAce
└── Application Content
```

The shell owns persistent visual presentation. Pages and feature engines own their own content and business composition.

## Rcentz Data Field

Implemented:

- Structural data grid
- Randomized star/data lights
- Twinkling data points
- Travelling data signals
- Ambient illumination
- Central breathing light
- Readability masks
- Mobile density reduction
- Reduced-motion handling

## Rcentz Ace

Implemented:

- Centered identity formation
- Distributed light nodes
- Inner support nodes
- Circular arc structure
- Breathing halo
- Travelling light
- Appearance lifecycle
- Dissolve and reappearance
- Mobile adaptation
- Reduced-motion handling

## Animation Identity

```text
STRUCTURE
   +
DATA
   +
LIGHT
   +
SUBTLE MOTION
   +
BREATHING SPACE
```

## Deferred Experiment

Pointer-reactive lighting remains deferred.

Desired behavior:

```text
POINTER
   ↓
LIGHT RESPONSE
```

Not:

```text
POINTER
   ↓
MOVE THE IDENTITY FORMATION
```

## Verification

```text
TypeScript                  PASS
ESLint                      PASS
Next.js production build    PASS
```

## Git Evidence

**Implementation Commit:**  
`f880aa93f9423b7e572f6a424148332cfbc09252`

**Commit:**  
`feat: establish Rcentz UI shell and milestone workflow`

**Milestone Tag:**  
`m03-ui-canvas-v1`

## Result

Rcentz has a reusable visual environment and identifiable presentation language.

---

# 8. M04 — Database Foundation

**Status:** 🟢 Completed

## Objective

Establish PostgreSQL + Prisma as the central source of truth for the Rcentz System.

## Architecture

```text
                    DATABASE
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       Website       Admin        Client
          │            │            │
      Portfolio     Management    Tracking
          │
      Public SEO
```

## Core Domains

The database foundation supports:

- Users and authentication
- Roles and account status
- Services and service categories
- Multi-currency service pricing
- Service plans and subscriptions
- Service requests
- Quotes
- Projects
- Project milestones
- Project features and tasks
- Portfolio profiles
- Products and commerce
- Orders
- Invoices
- Payments and refunds
- Crypto payment records
- Blog/content
- Messaging
- Notifications
- Support
- Analytics
- Media
- SEO

## Data Ownership Principle

```text
DATABASE
   ↓
PUBLIC WEBSITE
   ↓
CLIENT EXPERIENCE
   ↓
ADMIN MANAGEMENT
```

Business records that belong in the database should not be permanently duplicated as hardcoded UI content.

## Project Structure

```text
Project
   ↓
Milestone
   ↓
Feature
   ↓
Task
```

Features may exist in backlog before milestone assignment. Tasks belong to features.

## Billing Architecture

```text
ONE-OFF SERVICES
Service
  ↓
ServiceRequest
  ↓
Quote
  ↓
Project

LONG-TERM SERVICES
ServicePlan
  ↓
ClientSubscription
  ↓
Usage / Entitlements
  ↓
Invoice

COMMERCE
Product
  ↓
Order
  ↓
Invoice

BILLING
Invoice
  ↓
Payment
  ↓
Refund

CRYPTO
Payment
  ↓
CryptoPayment
  ↓
CryptoTransaction
```

## Multi-Currency Service Pricing

```text
Service
  ↓
ServicePrice
  ├── NGN
  └── USD
```

Quotes and invoices preserve final agreed monetary values.

## Authentication Foundation

Better Auth is connected to Prisma/PostgreSQL persistence.

The official Rcentz administrator is seeded and promoted to:

```text
SUPER_ADMIN
ACTIVE
EMAIL VERIFIED
```

Seed credentials are environment-driven and are not stored directly in source code.

## Official Project Seed

Seeded projects include:

- AJ Logik
- Shelsea Commerce
- Waffi Market
- JobRcentz
- NovaShad v01
- NovaPanel v01
- Rcentz Core

Foundation counts at M04 closure:

```text
Projects         7
Portfolio        7
Technologies    61
Milestones      26
```

## Official Service Catalogue

Categories:

- Web Development
- WordPress
- Mobile & Adaptive Experiences
- Business Systems
- E-commerce
- Maintenance & Modernization
- Technical Consulting

Foundation counts:

```text
Service Categories     7
Services              35
Service Prices        70
```

## Seed Strategy

```text
INITIAL FOUNDATION
      ↓
SEED DATA
      ↓
DATABASE
      ↓
ADMIN CONTROL CENTER
      ↓
LONG-TERM MANAGEMENT
```

Seed data establishes canonical starting records. It is not the permanent management interface.

## Verification

```text
Prisma schema validation     PASS
Prisma Client generation     PASS
TypeScript                   PASS
ESLint                       PASS
Database migrations          PASS
Database synchronization     PASS
Admin seed                   PASS
Project seed                 PASS
Service seed                 PASS
Repeated seed execution      PASS
Next.js production build     PASS
```

## Result

Rcentz has a persistent business-data foundation shared by public, client and administrative surfaces.

---

# 9. M05 — Global Application Shell

**Status:** 🟢 Completed

## Objective

Build the shared application structure used throughout Rcentz.

## Architecture

```text
RootLayout
    │
    ├── ThemeProvider
    │
    └── RcentzShell
            │
            ├── RcentzDataField
            ├── RcentzAce
            ├── RcentzHeader
            │     ├── Navigation
            │     ├── Authentication Actions
            │     ├── Theme Control
            │     └── Mobile Navigation
            ├── RcentzContentFrame
            │     └── Application Content
            └── RcentzFooter
```

## Implemented

- Global shell
- Header
- Footer
- Responsive navigation
- Authentication-aware navigation
- Theme system
- Runtime theme switching
- Theme-aware environment
- Loading state
- Error boundary
- Toast entry point
- Shared UI foundation
- Persistent canvas

## Canonical Navigation Contract

```text
/                Home
/services        Services
/portfolio       Work / Portfolio
/store            Store / Commerce
/blog             Blog / Community
/about            About
/login            Sign in
/dashboard        Authenticated system
```

Primary acquisition action:

```text
Start a project → /services
```

Destination pages may belong to later milestones, but route contracts are owned by the completed shell.

## Verification

```text
TypeScript                         PASS
ESLint                             PASS
Next.js production build           PASS
Runtime light/dark theme switching PASS
Responsive navigation              REVIEWED
```

## Git Evidence

**Implementation Checkpoint:**  
`a7d9bdcd2097da87fc65c10e7db83df77c1d38ca`

**Closure Documentation:**  
`8cf27a4d558d9152cf6a79c03298d5e83445937d`

**Milestone Tag:**  
`m05-global-application-shell-v1`

## Result

The shared application shell and canonical navigation contract are established.

---

# 10. M06 — Database-Driven Public Homepage

**Status:** 🟢 Completed  
**Initial Completion:** 2026-09-02  
**Final Presentation Closure:** 2026-09-03

## Objective

Create the first complete public-facing Rcentz experience powered by the database while preserving the shared shell, visual identity, responsive architecture and reusable data boundaries.

## Homepage Architecture

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

The homepage remains server-rendered and database-aware.

```ts
export const revalidate = 300;
```

## Data Boundary

```text
features/home/server/get-homepage-data.ts
```

The homepage consumes canonical database records for:

- Featured services
- Service categories
- Multi-currency pricing
- Featured portfolio projects
- Project status/progress
- Portfolio summaries
- Technologies
- Live/repository links

Limits:

```text
Featured services: 6
Featured projects: 4
```

## Final Public Canvas

```text
Environmental Canvas:     1440px
Public Content Axis:      1200px
Section Axis:             1200px
Hero Composition:         1140px
```

Responsive gutters:

```text
Mobile:       8px per side
sm and above: 16px per side
```

The shell defines available space. Individual compositions may use narrower widths when required for balance.

## Hero Story System

Final sequence:

```text
01 Rcentz
02 Rcentz × AI
03 System
04 Live Data
05 Commerce
06 Rcentz Core
```

Architecture:

```text
HomeHero
   ↓
HeroStoryEngine
   ↓
Active Story
   ↓
Story Copy + Illustration
```

Supports:

- Previous / next controls
- Direct story selection
- Automatic progression
- Variable dwell timing
- Reduced-motion handling
- Responsive desktop/mobile presentation

## Hero Communication Pattern

Each story contains:

- Eyebrow
- Strong headline
- Short introduction
- 2 or 4 visual highlight points
- Primary CTA
- Secondary CTA

Actions:

```text
View our work     → /portfolio
Explore services  → /services
```

## Rcentz × AI

AI collaboration is a first-class Rcentz story and appears immediately after the primary Rcentz introduction.

It communicates:

- Human-led decisions
- AI-assisted engineering
- Rapid intelligent iteration
- Human-reviewed output

Positioning:

```text
HUMAN DIRECTION
      +
AI ACCELERATION
      ↓
ENGINEERED BUSINESS SOLUTION
```

The illustration uses an intelligent motherboard / neural-core metaphor with connected capability modules and current flow.

## Hero Motion Direction

The Hero behaves as a readable page that occasionally comes alive.

```text
READ
 ↓
SETTLE
 ↓
ANIMATION WAKES
 ↓
STORY COMPLETES
 ↓
LONG QUIET STATE
 ↓
NEXT STORY EVENTUALLY ARRIVES
```

Dwell ranges:

```text
Rcentz:        52–66 seconds
Rcentz × AI:   58–74 seconds
System:        65–82 seconds
Live Data:     54–70 seconds
Commerce:      56–72 seconds
Rcentz Core:   56–72 seconds
```

Dwell durations vary within their ranges to avoid predictable carousel timing.

The System story also uses:

- Initial stillness
- Code typing
- Long completed-code hold
- Delayed context change

## Engineering Principles Surface

The Hero capability surface communicates:

```text
Performance
Security
Scalable
Maintainable
```

Each includes a signal/status, headline, supporting text and engineering points.

## Services Presentation

`HomeServices` consumes canonical service records from the homepage data layer.

Presentation includes:

- Category/type
- Service name
- Short description
- Pricing context
- Service illustration

Previously empty illustration blocks were replaced with meaningful interface content.

Existing public imagery is used only where media naturally belongs.

## Modernization & Transformation

Final modernization stories:

```text
WordPress → Next.js
Static → Active
Store → Smart commerce
Manual → Connected
```

### WordPress → Next.js

Migration stages type one at a time:

```text
Content preserved
Media mapped
Routes rebuilt
SEO retained
```

Completed steps remain visible while the next types.

The modern side communicates:

- App Router
- Reusable components
- Performance
- Database-driven services
- Live portfolio content
- Modern website preview

### Static → Active

The scene communicates:

```text
Static brochure
      ↓
Active business experience
```

It now includes real brochure content, visitor context, enquiry tracking, follow-up, mobile behavior, editable content and connected contact flow.

### Manual → Connected

The business-system scene includes:

- Client records
- Project workspace
- Team context
- Project phases
- Tasks
- Client updates
- Progress

### Commerce

The commerce scene uses real storefront imagery and connected operational states rather than empty product placeholders.

## Selected Work

`HomeProjects` consumes published featured portfolio records.

Presentation includes:

- Project type
- Project status
- Project name
- Portfolio tagline
- Technologies
- Progress
- Live link where available

## Verification

Final M06 closure:

```text
ESLint                      PASS
Prisma Client generation    PASS
Next.js compilation         PASS
TypeScript                  PASS
Static generation           PASS
Production build            PASS
Git push                    PASS
Working tree clean          PASS
Vercel deployment           PASS
```

A PostgreSQL SSL-mode future-compatibility warning remains tracked under M17. It does not block M06.

## Git Evidence

**Initial Hero Checkpoint**

```text
2f3cd847b7e734ed6c9ea3d574b6db955e5aa490
feat(home): enrich mobile hero storytelling
```

**Expanded Hero / Public UI Checkpoint**

```text
274c29e
feat(home): expand hero storytelling and refine public UI system
```

**Final M06 Presentation Closure**

```text
95fc78b7a5edc3a265b7466fe51485bff488294b
feat(home): complete homepage presentation refinement
```

## Exit Criteria

- Homepage server composition established
- Homepage database boundary established
- Featured services integrated
- Featured projects integrated
- Revalidation strategy established
- Six-story Hero implemented
- Rcentz × AI story implemented
- Reading-first Hero timing implemented
- Reduced-motion handling implemented
- Responsive Hero implemented
- 1200px public content axis established
- 1140px Hero composition established
- Wider mobile canvas established
- Header/body width alignment established
- Engineering principles surface implemented
- Service illustrations completed
- Modernization scenes completed
- Sequential WordPress migration implemented
- Static → Active completed
- Manual → Connected completed
- Commerce presentation completed
- Selected Work established
- CTA established
- Lint/build/deployment verified
- Implementation committed and pushed
- Working tree clean

## Result

Rcentz now has a database-aware public homepage with a distinct visual storytelling system for Rcentz, AI collaboration, system architecture, live data, commerce, services, modernization and real project work.

**M06 is complete and should remain closed unless a genuine defect is discovered.**

---

# 11. M07 — Portfolio Engine

**Status:** 🟡 In Progress  
**Started:** 2026-09-02  
**Confirmed Active After M06 Final Closure:** 2026-09-03

## Objective

Build the Rcentz portfolio as a real database-driven product engine.

The portfolio is owned by Rcentz and is not a direct rendering of GitHub, Vercel or another external platform.

## Core Architecture

```text
Project
   ↓
PortfolioProfile
   ↓
Public Portfolio Data Access
   ↓
/portfolio
   ↓
/portfolio/[slug]
```

`Project` remains the canonical project source.

`PortfolioProfile` remains the public presentation layer.

## Existing Database Foundation

Portfolio records already support:

- Tagline
- Summary
- Challenge
- Solution
- Outcome
- Live URL
- Repository URL
- Featured status
- Publication date

Projects already support:

- Project type
- Project status
- Visibility
- Progress
- Technologies
- Updates
- Activities
- Media
- Comments
- Reactions
- Analytics
- SEO metadata

M07 should build on this foundation rather than redesign the schema without demonstrated need.

## Feature Boundary

```text
features/
├── home/
└── portfolio/
    ├── components/
    └── server/
```

Presentation should not own Prisma access.

```text
DATABASE
   ↓
PORTFOLIO SERVER LAYER
   ↓
PORTFOLIO ENGINE
   ↓
PUBLIC ROUTES
```

## Canonical Routes

```text
/portfolio
/portfolio/[slug]
```

The global navigation already treats `/portfolio` as the canonical Work destination.

## Scope

- Portfolio projects
- Project types
- Technologies
- Public descriptions
- Status and progress
- Visibility
- Featured projects
- Live URLs
- Repository URLs
- Media
- Views
- Reactions
- Comments
- Upvotes
- Trending signals
- Recently updated projects
- Recently completed projects
- Most discussed projects

## Authentic Portfolio Principle

Real projects such as AJ Logik and JobRcentz should become authentic portfolio records.

Only genuine project information, screenshots, features, development history, results and supported metrics should be shown.

Do not invent projects to make the portfolio appear larger.

## Current Implementation Target

```text
features/portfolio/server/get-portfolio-projects.ts
```

## Current Objective

Establish the canonical server-side public portfolio query boundary using the existing `Project → PortfolioProfile` architecture before extending the `/portfolio` presentation routes.

M07 now owns new portfolio-specific presentation and data work.

M06 remains closed unless a genuine homepage defect is discovered.

## Initial Data Requirements

- Project identity
- Project slug
- Project type
- Project status
- Project progress
- Public visibility
- Portfolio tagline
- Portfolio summary
- Portfolio outcome
- Featured status
- Publication date
- Live URL
- Repository URL
- Technologies
- Required media/presentation data

## Exit Criteria

- Portfolio feature boundary established
- Public portfolio server query implemented
- Public visibility rules enforced
- Published profile filtering enforced
- `/portfolio` listing implemented
- `/portfolio/[slug]` detail route implemented
- Technologies rendered from database
- Real project media integrated
- Featured presentation established
- Status/progress presentation established
- Live/repository links handled safely
- Empty state implemented
- Loading/error behavior reviewed
- Reactions implemented or deliberately staged
- Comments implemented or deliberately staged
- Analytics/view tracking integrated
- Portfolio SEO integrated
- AJ Logik represented authentically
- JobRcentz represented authentically
- Desktop/mobile review completed
- TypeScript verified
- ESLint verified
- Production build verified
- Implementation checkpoint committed
- M07 closure documented

---

# 12. M08 — Services Engine

**Status:** ⬜ Not Started

## Objective

Create a database-driven services marketplace.

## Scope

- Web development
- SaaS development
- UI/UX
- Dashboards
- E-commerce
- API integration
- Custom systems
- Maintenance
- Consulting
- Related technical services

## Canonical Routes

```text
/services
/services/[slug]
```

## Service Lifecycle

```text
Visitor
  ↓
Explore Service
  ↓
Request Service
  ↓
Review
  ↓
Quote
  ↓
Approval
  ↓
Project Creation
```

## Exit Criteria

- Categories rendered from database
- Service records rendered from database
- Listing page
- Detail pages
- Slug routing
- Service requests
- Quote foundation
- Request-to-project workflow defined
- Responsive review
- SEO metadata
- TypeScript/lint/build verification
- Milestone closure documented

---

# 13. M09 — Commerce Foundation

**Status:** ⬜ Not Started

## Objective

Create a shared commerce foundation supporting digital and physical products.

## Digital Product Examples

- Templates
- UI kits
- Code
- Components
- Design assets
- Documents
- Digital resources

## Physical Product Examples

- Mice
- PCs
- Batteries
- Screens
- Technology accessories

## Canonical Route

```text
/store
```

Additional product/category routes may be introduced during M09.

## Scope

- Product catalogue
- Categories
- Media
- Variants
- Inventory
- Cart
- Orders
- Payments
- Digital delivery
- Physical fulfilment

## Fulfilment Architecture

```text
                    PRODUCT
                       │
             ┌─────────┴─────────┐
             ↓                   ↓
        DIGITAL PRODUCT     PHYSICAL PRODUCT
             │                   │
       DOWNLOAD DELIVERY    SHIPPING / FULFILMENT
```

## Exit Criteria

- Product catalogue
- Categories
- Detail pages
- Cart
- Orders
- Payment foundation
- Digital delivery foundation
- Physical fulfilment foundation
- Responsive review
- TypeScript/lint/build verification

---

# 14. M10 — Authentication & User System

**Status:** 🟡 In Progress

## Objective

Establish identity and role-aware access throughout the platform.

## Roles

```text
USER
CLIENT
STAFF
ADMIN
SUPER_ADMIN
```

## Scope

- Registration
- Login
- Logout
- Sessions
- Account management
- Email verification
- Role management
- User status
- Client profiles
- Staff profiles
- Authentication-aware navigation

## Current Foundation

Better Auth + Prisma + PostgreSQL/Neon persistence is validated.

```text
Better Auth identity
        +
Prisma persistence
        +
Canonical roles/status
        ↓
Protected Application Surfaces
```

## Exit Criteria

- Registration validated
- Login validated
- Session retrieval validated
- Logout integrated
- Email verification completed
- Server-side role authorization established
- Client profile flow established
- Staff profile flow established
- Auth-aware navigation established
- Protected surfaces established
- Production-safe auth configuration verified

---

# 15. M11 — Client Project Management

**Status:** ⬜ Not Started

## Objective

Allow clients to interact with and track their projects.

## Project Information

Projects may contain:

- Name
- Client
- Purpose
- Vision
- Description
- Expected outcome
- Start date
- Expected completion date
- Actual completion date
- Status
- Progress
- Key features
- Milestones
- Tasks
- Project phases
- Feature dependencies
- Assignments
- Activity history
- Attachments
- Deliverables
- Analytics

## Progress Presentation

- Percentages
- Progress bars
- Milestone completion
- Charts
- Pie/donut visualizations where useful

## Project Lifecycle

```text
PLANNING
   ↓
DISCOVERY
   ↓
DESIGN
   ↓
DEVELOPMENT
   ↓
TESTING
   ↓
REVIEW
   ↓
DEPLOYMENT
   ↓
MAINTENANCE
   ↓
COMPLETED
```

Additional states:

```text
ON_HOLD
CANCELLED
```

## Exit Criteria

- Client project dashboard
- Project overview
- Milestones
- Features
- Tasks
- Updates
- Activity history
- Files/deliverables
- Progress visualization
- Project analytics
- Authorization review
- Responsive review

---

# 16. M12 — Admin Control Center

**Status:** ⬜ Not Started

## Objective

Build the central management system for Rcentz.

## Admin Structure

```text
ADMIN
├── Overview
├── Projects
├── Project Updates
├── Milestones
├── Tasks
├── Clients
├── Services
├── Portfolio
├── Products
├── Orders
├── Content
├── Blog
├── Comments
├── Messages
├── Notifications
├── Analytics
└── Settings
```

## Principle

Admin-managed data should drive:

- Public website
- Client experience
- Internal management

The Admin system should replace long-term dependence on seed files for business management.

## Exit Criteria

- Admin authentication/authorization
- Admin navigation
- Dashboard overview
- Project management
- Client management
- Service management
- Portfolio management
- Product management
- Content management
- Order management
- Analytics access
- Settings foundation
- Audit/security review

---

# 17. M13 — Blog / Community Content Engine

**Status:** ⬜ Not Started

## Objective

Build an interactive content platform around the Rcentz blog.

## Routes

```text
/blog
/blog/[slug]
```

## Scope

- Articles
- Categories
- Tags
- Authors
- Comments
- Threaded replies
- Reactions
- Upvotes
- Saves/bookmarks
- Trending content
- Popular content
- Related content

## Routing Principle

Articles use real SEO-friendly routes.

Example:

```text
/blog/how-we-built-the-rcentz-system
```

Canonical article pages should be route-based rather than modal-only.

## Exit Criteria

- Blog listing
- Category pages
- Tag support
- Canonical article routes
- Comments
- Threaded replies
- Reactions
- Related content
- SEO metadata
- Responsive review

---

# 18. M14 — Messaging, Support & Notifications

**Status:** ⬜ Not Started

## Objective

Create communication infrastructure between Rcentz, clients and users.

## Messaging

Support:

- Direct conversations
- Project conversations
- Support conversations
- Service conversations
- Order conversations
- Group conversations

## Support

- Assistance requests
- Support tickets
- Priorities
- Statuses
- Staff assignment
- Ticket messages
- Attachments

## Notifications

Notifications may cover:

- Messages
- Projects
- Project updates
- Services
- Orders
- Payments
- Comments
- Reactions
- Tickets
- Assistance
- Commerce
- System events

## Exit Criteria

- Conversations
- Participants
- Messages
- Attachments
- Support tickets
- Ticket messaging
- Notifications
- Notification preferences
- Authorization review

---

# 19. M15 — Analytics Engine

**Status:** ⬜ Not Started

## Objective

Make analytics a first-class system within Rcentz.

## Project Analytics

Track:

- Views
- Milestone completion
- Feature completion
- Timeline performance
- Activity
- Downloads
- Engagement

## Portfolio Analytics

Track:

- Views
- Unique views
- Reactions
- Comments
- Shares
- Downloads
- Trends
- Conversions

## Website Analytics

Track:

- Page views
- Popular pages
- Search
- Engagement
- Conversions
- Product views
- Service views
- Portfolio views
- Purchases

## Principle

External analytics providers may be integrated while Rcentz retains room for its own project/business intelligence.

## Exit Criteria

- Analytics sessions
- Analytics events
- Event tracking foundation
- Project analytics
- Portfolio analytics
- Dashboard analytics
- Conversion tracking foundation
- Privacy/data review

---

# 20. M16 — SEO / Superhero SEO

**Status:** ⬜ Not Started

## Objective

Make Rcentz highly discoverable while keeping SEO useful and genuine.

## Scope

- Semantic HTML
- Accessible structure
- Dynamic metadata
- Structured data
- Sitemap
- Robots configuration
- Canonical URLs
- Open Graph
- Social metadata
- Search-friendly routes
- Slugs
- Internal linking
- Related content
- Performance
- Indexability

## Priority Indexable Content

- Projects
- Services
- Products
- Blog articles
- Categories
- Other genuinely useful content

## Principle

Do not create artificial SEO pages simply to increase page count.

## Exit Criteria

- Metadata system
- Canonical URLs
- Sitemap
- Robots configuration
- Structured data
- Open Graph
- Search-friendly routes
- Internal linking strategy
- Performance review

---

# 21. M17 — Production Hardening

**Status:** ⬜ Not Started

## Objective

Prepare the platform for real-world production use.

## Security

- Authentication review
- Authorization review
- Input validation
- File upload validation
- Server-side validation
- Rate limiting strategy
- Sensitive data protection
- Audit logging

## Performance

- Image optimization
- Database query review
- Caching strategy
- Server rendering review
- Client bundle review
- Loading states
- Error handling

## Reliability

- Error boundaries
- Logging
- Database backup strategy
- Recovery strategy
- Monitoring

## Database / Connection Hardening

The PostgreSQL driver currently emits a future compatibility warning around SSL-mode interpretation.

Before M17 closure, connection-string SSL semantics must be explicitly reviewed and configured for the intended security behavior.

## Exit Criteria

- Security review
- Performance review
- Error-handling review
- Database review
- PostgreSQL SSL configuration reviewed
- Production environment verified
- Deployment verified
- Monitoring/recovery strategy established

---

# 22. M18 — Mobile / Future Application Readiness

**Status:** ⚪ Deferred

## Objective

Ensure the architecture can support a future native/mobile application without unnecessary duplication.

## Principle

The initial product is web-first.

```text
                 Rcentz Business Logic
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
           WEB                    MOBILE
             │                       │
        Web Interface          Native Interface
```

Business logic and data structures should not unnecessarily depend on a specific UI implementation.

## Future Considerations

- Shared API/data contracts
- Reusable business logic
- Authentication compatibility
- Mobile-friendly interaction patterns
- Push notifications
- Installable applications
- PWA
- Native application possibilities

This milestone is primarily protected through earlier architectural decisions and does not need full implementation during the initial web product.

---

# 23. Cross-Cutting Systems

These systems evolve alongside the major milestones.

## Media System

Used by:

- Users
- Services
- Projects
- Project updates
- Portfolio
- Products
- Blog
- Tickets
- Messages

## SEO System

Used by:

- Services
- Products
- Blog
- Portfolio
- Public pages

## Analytics System

Used by:

- Website
- Portfolio
- Products
- Services
- Projects
- Content

## Notification System

Used by:

- Projects
- Services
- Orders
- Payments
- Messages
- Support
- Community

## Activity System

Used by:

- Projects
- Client management
- Administrative actions
- Important system events

---

# 24. Project Update Visibility

Project updates support three visibility levels:

```text
INTERNAL
CLIENT
PUBLIC
```

The same update infrastructure can therefore support:

- Internal staff communication
- Client project tracking
- Public portfolio/project history

---

# 25. Data Ownership Principle

Rcentz owns its business data and presentation.

External services may act as integrations or data sources.

```text
GitHub
   ↓
Optional Integration
   ↓
Rcentz Portfolio System

Vercel
   ↓
Optional Integration
   ↓
Rcentz Portfolio System
```

Neither external platform should become the canonical portfolio presentation layer.

---

# 26. Definition of Done

A milestone is not complete merely because code exists.

A milestone should normally satisfy:

- Implementation complete
- TypeScript passes
- Application builds
- Runtime behavior tested
- Responsive behavior tested where applicable
- Database behavior tested where applicable
- Error states considered
- Security implications considered
- Architecture reviewed
- Route/navigation contracts finalized where applicable
- Documentation updated
- Git changes reviewed
- Implementation committed and pushed
- No known blocking issue

Once closed, a milestone remains closed unless a genuine defect or later architectural dependency requires a targeted correction.

---

# 27. Architectural Decision Log

## 2026-08-31 — Modular Monolith

**Decision:** Use a modular monolith with explicit internal boundaries.  
**Reason:** Preserve maintainability and reuse without premature distributed-system complexity.  
**Status:** Active

## 2026-08-31 — PostgreSQL + Prisma Source of Truth

**Decision:** PostgreSQL + Prisma are the persistent business-data source of truth.  
**Reason:** Public, client and admin surfaces must consume consistent underlying data.  
**Status:** Active

## 2026-08-31 — Better Auth + Prisma

**Decision:** Use Better Auth with Prisma persistence.  
**Reason:** Establish reusable identity/session infrastructure before protected surfaces.  
**Status:** Active

## 2026-08-31 — Dedicated Auth Shell

**Decision:** Authentication uses a dedicated application shell rather than the public Navbar.  
**Reason:** Keep auth focused and preserve application-surface boundaries.  
**Status:** Active

## 2026-08-31 — Create Boundaries When Needed

**Decision:** Create `features/`, `components/` and `server/` boundaries when real code requires them.  
**Reason:** Avoid empty-folder architecture while preserving documented responsibilities.  
**Status:** Active

## 2026-09-02 — Canonical Work Route

**Decision:** Public Work destination is `/portfolio`.  
**Reason:** Preserve one canonical route across Navbar, Footer, Hero and M07.  
**Status:** Active

## 2026-09-02 — Canonical Services Route

**Decision:** Public service destination is `/services`.  
**Reason:** Keep homepage acquisition and M08 on one route contract.  
**Status:** Active

## 2026-09-02 — Future Routes May Be Reserved Early

**Decision:** Navigation may point to future routes before destination pages are implemented.  
**Reason:** Completed shell milestones define route contracts; later milestones build the experiences.  
**Status:** Active

## 2026-09-02 — Database-Backed Homepage Content

**Decision:** Homepage business content remains database-backed.  
**Reason:** Avoid duplicated hardcoded service/project truth.  
**Status:** Active

## 2026-09-03 — Six-Story Hero with Rcentz × AI

**Decision:** The homepage Hero uses six stories, with Rcentz × AI immediately after the main Rcentz introduction.  
**Reason:** AI collaboration is part of the Rcentz engineering method and should be presented as human-directed acceleration.  
**Status:** Active

## 2026-09-03 — 1200px Public Content Axis

**Decision:** Environmental canvas remains 1440px while public content is capped at 1200px.  
**Reason:** Preserve a premium wider presentation without stretching internal compositions.  
**Status:** Active

## 2026-09-03 — Component Width Is Independent from Shell Width

**Decision:** Individual compositions may be narrower than the application shell.  
**Reason:** Available space and useful composition width are not the same thing.  
**Status:** Active

## 2026-09-03 — Long Hero Stillness

**Decision:** Hero stories use long variable dwell periods and intentional quiet states.  
**Reason:** Rcentz should feel readable first and unexpectedly alive second.  
**Status:** Active

## 2026-09-03 — Wider Mobile Usable Canvas

**Decision:** Mobile public sections use reduced outer gutters.  
**Reason:** Protect useful width and future application-style information density.  
**Status:** Active

---

# 28. Rejected Approaches

## Conventional Portfolio Website

**Rejected:** Treat Rcentz as a conventional portfolio website.  
**Reason:** It would not operate the business or demonstrate the intended system capabilities.  
**Replacement:** SaaS-like living business platform.

## Premature Microservices

**Rejected:** Distributed microservices during the foundation stage.  
**Reason:** Adds operational complexity before independent deployment/scaling is justified.  
**Replacement:** Modular monolith with extractable boundaries.

## UI-Only Authorization

**Rejected:** Protecting access by hiding UI elements only.  
**Reason:** Hidden UI does not protect server data or mutations.  
**Replacement:** Server/business-layer authorization.

## Temporary Homepage Anchors

**Rejected:** Temporary homepage-anchor routing for canonical Hero actions.  
**Reason:** Weakens already-defined product routes and creates avoidable rework.  
**Replacement:** Route directly to canonical future destinations.

## `/work` as a Second Portfolio Route

**Rejected:** Add `/work` alongside `/portfolio`.  
**Reason:** Two names would fragment navigation and SEO.  
**Replacement:** `/portfolio`.

---

# 29. Lessons Learned

## 2026-08-31 — Living Documentation Can Become Stale Quickly

**Impact:** Verify milestone status against code and tested behavior before planning the next module.

## 2026-08-31 — Framework-Sensitive Work Must Match the Installed Version

**Impact:** Avoid relying on older Next.js App Router assumptions.

## 2026-08-31 — Local Validation Is Not Production Readiness

**Impact:** Track temporary development configuration, security boundaries and deployment requirements explicitly.

## 2026-09-02 — Route Contracts Belong to Their Owning Milestone

**Impact:** Prevent reopening shell/homepage work when later route milestones begin.

## 2026-09-02 — Mobile Needs Different Density

**Impact:** Read-first copy, compact highlights and delayed visual discovery improve the mobile Hero.

## 2026-09-02 — Hero Visuals Should Be Modular Planes

**Impact:** Improves maintainability, animation control and responsive adaptation.

## 2026-09-03 — Shell Width and Composition Width Are Different

**Impact:** Increasing the global shell can weaken an already-balanced component. Treat shell geometry and component geometry separately.

## 2026-09-03 — Stillness Is Part of Animation Design

**Impact:** Long quiet periods improve readability and make later motion feel more alive.

## 2026-09-03 — Empty Placeholders Weaken Strong Illustrations

**Impact:** Populate presentation UI with believable content and use imagery only where naturally appropriate.

## 2026-09-03 — AI Is Best Framed as Human-Directed Acceleration

**Impact:** Present business context, technical judgment, AI execution and human review as one engineering workflow.

---

# 30. Current Development State

**Primary Active Milestone:**  
M07 — Portfolio Engine

**Supporting Active Foundations:**  
M01 — Project Foundation  
M02 — Architecture & Folder Conventions  
M10 — Authentication & User System

**Last Fully Completed Milestone:**  
M06 — Database-Driven Public Homepage

**M06 Final Closure Commit:**

```text
95fc78b7a5edc3a265b7466fe51485bff488294b
```

**Current Module:**  
Portfolio Engine / Public Data Boundary

**Current Target:**

```text
features/portfolio/server/get-portfolio-projects.ts
```

**Current Objective:**  
Establish the canonical server-side public portfolio query boundary using the existing `Project → PortfolioProfile` architecture before extending the `/portfolio` presentation routes.

**Known Production Gap:**  
PostgreSQL SSL-mode future compatibility warning remains tracked for M17 Production Hardening.

**Blocking Issues:**  
None recorded.

---

# 31. Immediate Next Steps

M07 sequence:

```text
Portfolio server query
        ↓
Portfolio listing engine
        ↓
/portfolio
        ↓
Portfolio detail query
        ↓
/portfolio/[slug]
        ↓
Media / engagement / analytics / SEO
        ↓
M07 verification and closure
```

Development should continue through the smallest meaningful implementation unit:

```text
CURRENT MILESTONE
        ↓
CURRENT MODULE
        ↓
CURRENT FILE
        ↓
IMPLEMENT
        ↓
TEST
        ↓
REVIEW
        ↓
DOCUMENT
        ↓
COMMIT / PUSH
```

Do not begin unrelated major work until the active milestone is complete enough to satisfy its Definition of Done.

---

# 32. Relationship to the Master Blueprint

```text
MASTER-BLUEPRINT.md
        │
        │ defines
        ↓
PRODUCT + ARCHITECTURAL VISION
        │
        ↓
MILESTONES.md
        │
        │ defines
        ↓
IMPLEMENTATION ROADMAP
        │
        ↓
ACTUAL CODEBASE
        │
        ↓
RUNNING RCENTZ SYSTEM
```

The Master Blueprint answers:

> What are we building and why?

The Milestones document answers:

> What are we building next and how do we know it is complete?

The codebase answers:

> What has actually been implemented?

---

# 33. Living Document Rule

This document must evolve with the project.

When a significant architectural change occurs:

- Update the relevant milestone
- Record the architectural decision
- Record rejected approaches where useful
- Record lessons learned
- Update the current development state
- Ensure the Master Blueprint remains consistent with implementation

Documentation must describe the real Rcentz system, not an idealized version of what it was expected to become.

A milestone closure is a durable checkpoint, not a temporary note that is silently reopened later.

---

# Current Handoff

```text
M06 PUBLIC HOMEPAGE
        ✅ CLOSED
           │
           ▼
M07 PORTFOLIO ENGINE
        🟡 ACTIVE
```

**Final M06 implementation evidence:**  
`95fc78b7a5edc3a265b7466fe51485bff488294b`

---

**END OF DOCUMENT**
