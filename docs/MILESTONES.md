# RCENTZ SYSTEM

# DEVELOPMENT MILESTONES

**Project:** Rcentz System
**Document:** Development Milestones
**Version:** 1.1
**Status:** Active / Living Document
**Last Updated:** 2026-08-31

---

## 1. Purpose

This document tracks the implementation progress of the Rcentz System.

The **Master Blueprint** defines what Rcentz is and the architectural direction of the product.

This document defines:

* What we are building
* The order in which we are building it
* What each milestone must accomplish
* What must be tested before moving forward
* Major architectural decisions made during implementation
* Completed, active and pending work

This document is intentionally living and should evolve with the project.

---

# 2. Development Philosophy

Rcentz will be developed **module by module and file by file**.

The development process is:

```text
PLAN
  ↓
ARCHITECT
  ↓
ONE FILE / MODULE
  ↓
AUDIT
  ↓
ASK WHY / SUGGEST
  ↓
DISCUSS / MODIFY
  ↓
IMPLEMENT
  ↓
TEST
  ↓
DOCUMENT
  ↓
NEXT MODULE
```

The objective is not simply to generate code quickly.

Every important architectural decision should be:

* Understandable
* Auditable
* Reusable
* Testable
* Consistent with the Master Blueprint

---

# 3. Milestone Status Legend

| Status         | Meaning                                            |
| -------------- | -------------------------------------------------- |
| ⬜ Not Started  | Work has not started                               |
| 🟡 In Progress | Currently being implemented                        |
| 🟢 Completed   | Implemented and tested                             |
| 🔴 Blocked     | Cannot proceed because of an unresolved dependency |
| 🔵 Review      | Implemented but awaiting architectural/code review |
| ⚪ Deferred     | Intentionally postponed                            |

---

# 4. Overall Roadmap

```text
M01 Foundation
 ↓
M02 Architecture & Conventions
 ↓
M03 Design System / UI Canvas
 ↓
M04 Database Foundation
 ↓
M05 Global Application Shell
 ↓
M06 Public Homepage
 ↓
M07 Portfolio Engine
 ↓
M08 Services Engine
 ↓
M09 Commerce Foundation
 ↓
M10 Authentication & User System
 ↓
M11 Client Project Management
 ↓
M12 Admin Control Center
 ↓
M13 Content / Blog / Community
 ↓
M14 Messaging / Support / Notifications
 ↓
M15 Analytics
 ↓
M16 SEO / Performance
 ↓
M17 Production Hardening
 ↓
M18 Mobile / Future Application Readiness
```

---

# 5. M01 — Project Foundation

**Status:** 🟡 In Progress

## Objective

Create the initial Rcentz application and establish the fundamental development environment.

## Scope

* Create Next.js application
* Configure TypeScript
* Configure package manager
* Configure Tailwind CSS
* Install shadcn/ui foundation
* Install required UI/icon dependencies
* Configure environment variables
* Establish development scripts
* Confirm local development environment

## Expected Result

The project should:

* Start successfully
* Compile successfully
* Support TypeScript
* Support Tailwind
* Support shadcn/ui
* Have a clean initial structure

## Exit Criteria

* [x] Application starts locally
* [x] TypeScript compiles
* [x] Tailwind foundation is installed
* [ ] shadcn/ui foundation is established
* [ ] Required shared UI/icon dependencies are established
* [x] Environment configuration is sufficient for the current database/auth foundation
* [x] Git repository and `main` branch are established

---

# 6. M02 — Architecture & Folder Conventions

**Status:** 🟡 In Progress

## Objective

Establish the structural conventions that will govern the entire Rcentz codebase.

## Architectural Direction

Rcentz should maintain clear separation between:

```text
app/
features/
components/
server/
lib/
data/
docs/
```

The exact structure may evolve during implementation, but responsibilities must remain clearly separated.

Planned top-level boundaries should be created when real implementation requires them. Empty `features/`, `components/` or `server/` directories should not be created merely to make the repository resemble the target architecture.

## Scope

* Establish application routing
* Establish feature boundaries
* Establish reusable component conventions
* Establish server/backend conventions
* Establish data-access conventions
* Establish shared utility conventions
* Establish naming conventions
* Establish import conventions
* Establish documentation conventions

## Principle

Do not allow business logic to become scattered throughout UI components.

The architecture should make it possible to reuse business logic across:

* Public Web
* Client Dashboard
* Admin System
* Future mobile/native applications

## Exit Criteria

* [x] Folder architecture documented
* [x] Responsibilities defined
* [ ] First business `features/` boundary established in code
* [x] Server/data-access conventions documented
* [x] Architecture reviewed and recorded in `docs/ARCHITECTURE.md`

---

# 7. M03 — Rcentz UI Canvas & Design System

**Status:** 🟢 Completed

## Objective

Establish the reusable visual foundation and persistent presentation environment that Rcentz application surfaces can build upon.

M03 establishes the initial Rcentz visual identity without coupling business-domain features to the presentation shell.

---

## Scope

### UI Canvas

Implemented:

* Controlled centered canvas foundation
* Responsive desktop and mobile canvas
* Maximum canvas width
* Maximum content width
* Consistent horizontal spacing
* Layout constraints for wide displays
* Responsive behavior for smaller screens

Current sizing foundation:

```text
Canvas Maximum: 1440px
Content Maximum: 1200px
```

The application should remain intentionally bounded rather than stretching indefinitely across very large displays.

### Theme Foundation

Implemented semantic design tokens for:

* Background and foreground
* Surfaces
* Muted states
* Borders
* Primary
* Secondary
* Accent
* Destructive states
* Grid lines
* Radius values

The default visual direction remains:

```text
BLACK
  +
WHITE
  +
STRUCTURAL GRID
  +
CONTROLLED LIGHT
```

Light and dark system preferences are supported at the token level.

Components should consume semantic tokens rather than scatter theme-specific values throughout the application.

### Rcentz UI Shell

A dedicated shell boundary has been established:

```text
ui-shell/
├── RcentzShell.tsx
└── layers/
    ├── RcentzDataField.tsx
    └── RcentzAce.tsx
```

Current composition:

```text
RcentzShell
│
├── RcentzDataField
├── RcentzAce
│
└── Application Content
```

The shell owns persistent visual presentation.

Pages and future features remain responsible for their own content and business composition.

### Rcentz Data Field

The background system has evolved beyond a static grid into a living Rcentz data environment.

Implemented:

* Structural grid
* Randomized star/data lights
* Twinkling data points
* Subtle travelling data signals
* Ambient illumination
* Central breathing light
* Readability masking
* Mobile density reduction
* Reduced-motion handling

Decorative randomness is handled without React render-state updates.

The data field should remain atmospheric and should not compete with application content.

### Rcentz C Formation

`RcentzAce` establishes the centered Rcentz C visual formation.

Implemented:

* Centered C-style formation
* Distributed light nodes
* Inner supporting nodes
* Circular arc structure
* Breathing halo
* Travelling light
* Appearance lifecycle
* Extended live period
* Dissolve
* Reappearance
* Mobile adaptation
* Reduced-motion handling

The C formation is part of the persistent Rcentz visual identity.

### Animation Identity

M03 establishes the initial Rcentz animation language:

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

Animation should remain restrained enough that application content remains the primary interface layer.

---

## Responsive Philosophy

Desktop provides the full visual environment, higher decorative density and the complete Rcentz C formation.

Mobile uses reduced decorative density, a smaller formation, fewer visible data lights and simplified secondary animation.

Desktop and mobile remain the same visual system expressed at different densities.

---

## Deferred Experiment

Pointer-reactive lighting for the Rcentz C was explored during M03.

The intended interaction remains:

```text
POINTER
   ↓
LIGHT RESPONSE

NOT

POINTER
   ↓
MOVE THE C
```

The experiment did not yet produce the intended result and is deferred.

It does not block M03 completion and may be revisited later without changing the shell architecture.

---

## Navigation Boundary

Navigation is intentionally not an M03 completion requirement.

Global navigation, header, footer, responsive navigation and authentication-aware navigation belong primarily to:

```text
M05 — Global Application Shell
```

M03 establishes the visual environment those systems will inhabit.

---

## Verification

M03 passed the following quality gate:

```text
pnpm typecheck
pnpm lint
pnpm build
```

Verified:

```text
TypeScript                  PASS
ESLint                      PASS
Next.js production build    PASS
```

Verified build routes:

```text
○ /
○ /_not-found
ƒ /api/auth/[...all]
```

The Rcentz shell and visual layers compile successfully within the production build.

---

## Git Evidence

### Implementation Commit

```text
f880aa93f9423b7e572f6a424148332cfbc09252
```

### Commit Message

```text
feat: establish Rcentz UI shell and milestone workflow
```

### Milestone Tag

```text
m03-ui-canvas-v1
```

This tag represents the repository-backed M03 implementation checkpoint.

---

## Exit Criteria

* [x] Controlled canvas implemented
* [x] Responsive canvas foundation implemented
* [x] Canvas/content width boundaries established
* [x] Semantic design tokens established
* [x] Black-and-white visual foundation established
* [x] Persistent Rcentz UI shell established
* [x] Rcentz Data Field implemented
* [x] Structural grid implemented
* [x] Star/data-light system implemented
* [x] Ambient motion system implemented
* [x] Rcentz C formation implemented
* [x] Mobile-specific visual behavior implemented
* [x] Reduced-motion behavior implemented
* [x] TypeScript verified
* [x] ESLint verified
* [x] Production build verified
* [x] Runtime visual behavior reviewed
* [x] Implementation committed
* [x] Implementation pushed to GitHub
* [x] Milestone tag created

---

## Milestone Result

Rcentz now has a reusable visual environment and identifiable presentation language.

```text
RCENTZ APPLICATION
        │
        ↓
   RcentzShell
        │
   ┌────┴─────┐
   ↓          ↓
Data Field   C Identity
   │          │
   └────┬─────┘
        ↓
APPLICATION CONTENT
```

**M03 is complete.**

**Next Primary Milestone:** M04 — Database Foundation

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

## Scope

The database foundation now supports the core domains required for the wider Rcentz platform, including:

* Users and authentication
* Roles and account status
* Services and service categories
* Multi-currency service pricing
* Service plans and subscriptions
* Service requests
* Quotes
* Projects
* Project milestones
* Project features and tasks
* Portfolio profiles
* Products and commerce
* Orders
* Invoices
* Payments and refunds
* Crypto payment records
* Blog/content
* Messaging
* Notifications
* Support
* Analytics
* Media
* SEO

## Database Principle

The database is the canonical source of truth for information that must appear across multiple Rcentz application surfaces.

```text
DATABASE
   ↓
PUBLIC WEBSITE
   ↓
CLIENT EXPERIENCE
   ↓
ADMIN MANAGEMENT
```

Business records that belong in the database should not be duplicated as permanently hardcoded application content.

## Project Structure

The project-management hierarchy is:

```text
Project
   ↓
Milestone
   ↓
Feature
   ↓
Task
```

Features may exist in a project backlog before being assigned to a milestone.

Tasks belong to features.

Progress values currently stored for seeded historical projects are provisional aggregates and may later be derived more deeply from live feature and task activity.

## Billing Architecture

Rcentz now has a shared billing foundation supporting one-off services, long-term services and commerce.

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

Service pricing is normalized through dedicated `ServicePrice` records.

```text
Service
  ↓
ServicePrice
  ├── NGN
  └── USD
```

A service may therefore maintain independent commercial pricing for different currencies without relying on live foreign-exchange conversion.

Initial catalogue pricing supports:

* NGN
* USD

The presentation layer may later automatically select an appropriate currency while still allowing user override.

Quotes and invoices remain responsible for preserving their final agreed monetary values.

## Authentication Foundation

Better Auth is connected to the Prisma/PostgreSQL persistence layer.

The official Rcentz system administrator is seeded through Better Auth and subsequently promoted to:

```text
SUPER_ADMIN
ACTIVE
EMAIL VERIFIED
```

Seed credentials are provided through environment variables and are not stored directly in source code.

Authentication persistence is established.

Full application authorization remains the responsibility of later server-side authorization boundaries.

## Official Project History Seed

Real Rcentz project history is now represented in the database.

Seeded projects:

* AJ Logik
* Shelsea Commerce
* Waffi Market
* JobRcentz
* NovaShad v01
* NovaPanel v01
* Rcentz Systems

The seed includes:

* Project records
* Portfolio profiles
* Technologies
* Historical milestones
* Project status
* Visibility
* Featured state
* Development evidence where available

Verified database counts:

```text
Projects         7
Portfolio        7
Technologies    61
Milestones      26
```

## Official Service Catalogue Seed

The initial canonical Rcentz service catalogue is now stored in the database.

Categories:

```text
Web Development
WordPress
Mobile & Adaptive Experiences
Business Systems
E-commerce
Maintenance & Modernization
Technical Consulting
```

Verified database counts:

```text
Service Categories     7
Services              35
Service Prices        70
```

Each seeded service currently carries intentional:

```text
NGN pricing
USD pricing
```

The seed strategy is non-destructive toward existing service records and pricing so that future Admin-managed records can remain authoritative.

## Seed Strategy

Seed data establishes canonical initial Rcentz system records.

It is not intended to become the permanent management interface.

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

The future Admin system will manage services, projects and other business records directly through the database.

Seed execution has been tested repeatedly to confirm safe/idempotent behaviour for the current canonical records.

## Migration History

The database foundation is represented by committed Prisma migration history covering:

* Initial Rcentz schema
* Subscriptions, billing and crypto architecture
* Multi-currency service pricing

The development database reports the migration history as fully synchronized.

## Verification

M04 passed the following quality checks:

```text
pnpm db:format
pnpm db:validate
pnpm db:generate
pnpm typecheck
pnpm lint
pnpm db:seed
pnpm build
```

Verified:

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

Production build routes:

```text
○ /
○ /_not-found
ƒ /api/auth/[...all]
```

## Exit Criteria

* [x] PostgreSQL/Neon configured
* [x] Prisma configured
* [x] Foundational schema established
* [x] Migration history established
* [x] Database synchronized
* [x] Prisma Client generated and consumed
* [x] Better Auth persistence established
* [x] Official administrator seed established
* [x] Seed strategy established
* [x] Real project history seeded
* [x] Portfolio foundation seeded
* [x] Service categories seeded
* [x] Canonical service catalogue seeded
* [x] Multi-currency service pricing established
* [x] Seed execution verified
* [x] Idempotent seed behaviour verified
* [x] TypeScript verified
* [x] ESLint verified
* [x] Production build verified
* [x] Database architecture reviewed at foundation level

---

## Milestone Result

Rcentz now has a persistent system foundation capable of supporting its public, client and administrative application surfaces from one canonical data source.

```text
RCENTZ SYSTEM
      │
      ↓
POSTGRESQL / PRISMA
      │
 ┌────┼────────────┬─────────────┐
 ↓    ↓            ↓             ↓
AUTH PROJECTS    SERVICES      BILLING
      │            │             │
      └────────────┼─────────────┘
                   ↓
          APPLICATION ENGINES
```

**M04 is complete.**

**Next Primary Milestone:** M05 — Global Application Shell

---

# 9. M05 — Global Application Shell

**Status:** 🟢 Completed

## Objective

Build the shared application structure used throughout Rcentz.

M05 establishes the persistent application shell that future public, client and administrative surfaces will inhabit.

## Implemented Architecture

```text
RootLayout
    │
    ├── ThemeProvider
    │
    └── RcentzShell
            │
            ├── RcentzDataField
            ├── RcentzAce
            │
            ├── RcentzHeader
            │     ├── Navigation
            │     ├── Authentication Actions
            │     ├── Theme Control
            │     └── Mobile Navigation
            │
            ├── RcentzContentFrame
            │     └── Application Content
            │
            └── RcentzFooter

# 10. M06 — Database-Driven Public Homepage

**Status:** ⬜ Not Started

## Objective

Create the first complete public-facing experience powered by the database.

## Scope

Homepage sections should eventually be capable of displaying:

* Rcentz introduction
* Services
* Featured portfolio projects
* Products
* Blog/content
* Featured content
* Calls to action
* Engagement signals

## Principle

The homepage should not become a collection of permanently hardcoded business records.

Content that belongs in the database should eventually come from the database.

## Exit Criteria

* [ ] Homepage structure complete
* [ ] Responsive
* [ ] Database-driven content integrated
* [ ] SEO metadata established
* [ ] Performance reviewed

---

# 11. M07 — Portfolio Engine

**Status:** ⬜ Not Started

## Objective

Build the Rcentz portfolio as a real database-driven product engine.

## Scope

### Portfolio

* Projects
* Project types
* Technologies
* Project descriptions
* Project status
* Visibility
* Featured projects
* Live URLs
* Repository URLs
* Project media

### Interactive Portfolio

* Views
* Reactions
* Comments
* Upvotes
* Trending signals
* Featured projects
* Recently updated projects
* Recently completed projects
* Most discussed projects

## Initial Portfolio Records

Existing projects such as:

* AJ Logik
* JobRcentz

should become authentic portfolio records.

Only real project information, screenshots, features, development history, results and metrics should be presented.

## Exit Criteria

* [ ] Portfolio database models working
* [ ] Portfolio listing page
* [ ] Portfolio project page
* [ ] Slug-based routing
* [ ] Media support
* [ ] Reactions
* [ ] Comments
* [ ] Analytics integration
* [ ] SEO integration

---

# 12. M08 — Services Engine

**Status:** ⬜ Not Started

## Objective

Create a database-driven services marketplace.

## Scope

Services include:

* Web development
* SaaS development
* UI/UX
* Dashboards
* E-commerce
* API integration
* Custom systems
* Maintenance
* Related services

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

* [ ] Service categories
* [ ] Service records
* [ ] Service detail pages
* [ ] Service requests
* [ ] Quote foundation
* [ ] Request-to-project workflow defined

---

# 13. M09 — Commerce Foundation

**Status:** ⬜ Not Started

## Objective

Create a shared commerce foundation supporting both digital and physical products.

## Digital Products

Examples:

* Templates
* UI kits
* Code
* Components
* Design assets
* Documents
* Digital resources

## Physical Products

Examples:

* Mice
* PCs
* Batteries
* Screens
* Technology accessories

## Scope

* Product catalog
* Product categories
* Product media
* Product variants
* Inventory
* Cart
* Orders
* Payments
* Digital delivery
* Physical fulfillment

## Fulfillment Architecture

```text
                    PRODUCT
                       │
             ┌─────────┴─────────┐
             ↓                   ↓
        DIGITAL PRODUCT     PHYSICAL PRODUCT
             │                   │
       DOWNLOAD DELIVERY    SHIPPING/FULFILLMENT
```

## Exit Criteria

* [ ] Product catalog
* [ ] Categories
* [ ] Product detail pages
* [ ] Cart
* [ ] Orders
* [ ] Payment foundation
* [ ] Digital delivery foundation
* [ ] Physical fulfillment foundation

---

# 14. M10 — Authentication & User System

**Status:** 🟡 In Progress

## Objective

Establish identity and role-aware access throughout the platform.

## User Roles

```text
USER
CLIENT
STAFF
ADMIN
SUPER_ADMIN
```

## Scope

* Registration
* Login
* Logout
* Sessions
* Account management
* Email verification
* Role management
* User status
* Client profiles
* Staff profiles
* Authentication-aware navigation

## Current Implementation Note — 2026-08-31

The Better Auth + Prisma + PostgreSQL/Neon server foundation has been validated locally.

Before client-facing authentication work continues, the data foundation is being normalized for the production architecture:

```text
Better Auth 1.7 account identity
        +
Prisma 7 configuration
        +
Canonical Project model
        +
PortfolioProfile presentation layer
        ↓
Real Seed Data
```

The browser auth client is same-origin and deployment configuration is owned by `BETTER_AUTH_URL`.

The next authentication work after the database foundation is validated remains:

```text
Session State
   ↓
Auth Shell
   ↓
Register UI
   ↓
Login UI
   ↓
Logout
   ↓
Auth-Aware Navigation
   ↓
Protected Application Surface
```

## Exit Criteria

* [x] Registration validated through Better Auth
* [x] Login validated through Better Auth
* [x] Session retrieval validated
* [ ] Logout integrated into application UI
* [ ] Email verification flow completed
* [ ] Role-based authorization established at server boundaries
* [ ] Client profile flow established
* [ ] Staff profile flow established
* [ ] Authentication-aware navigation established
* [ ] Protected application surfaces established
* [ ] Production-safe auth client configuration verified

---

# 15. M11 — Client Project Management

**Status:** ⬜ Not Started

## Objective

Allow clients to interact with and track their projects.

## Project Information

Projects may contain:

* Project name
* Client
* Purpose
* Vision
* Description
* Expected outcome
* Start date
* Expected completion date
* Actual completion date
* Status
* Progress
* Key features
* Milestones
* Tasks
* Project phases
* Feature dependencies
* Assignments
* Activity history
* Attachments
* Deliverables
* Analytics

## Progress System

Progress should be represented through:

* Percentages
* Progress bars
* Milestone completion
* Charts
* Pie/donut visualizations where useful

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

Projects may also enter:

* ON HOLD
* CANCELLED

## Exit Criteria

* [ ] Client project dashboard
* [ ] Project overview
* [ ] Milestones
* [ ] Tasks
* [ ] Project updates
* [ ] Activity history
* [ ] Files/deliverables
* [ ] Project progress visualization
* [ ] Project analytics

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

* Public website
* Client experience
* Internal management

## Exit Criteria

* [ ] Admin authentication
* [ ] Admin navigation
* [ ] Dashboard overview
* [ ] Project management
* [ ] Client management
* [ ] Service management
* [ ] Portfolio management
* [ ] Product management
* [ ] Content management
* [ ] Order management
* [ ] Analytics access
* [ ] Settings foundation

---

# 17. M13 — Blog / Community Content Engine

**Status:** ⬜ Not Started

## Objective

Build an interactive content platform around the Rcentz blog.

## Scope

* Articles
* Categories
* Tags
* Authors
* Comments
* Threaded replies
* Reactions
* Upvotes
* Saves/bookmarks
* Trending content
* Popular content
* Related content

## Routing Principle

Blog articles should use real SEO-friendly route-based pages.

Example:

```text
/blog/how-we-built-the-rcentz-system
```

The canonical article page should be a route-based page rather than a modal.

Preview cards may be used on listing pages.

## Exit Criteria

* [ ] Blog listing
* [ ] Category pages
* [ ] Tag support
* [ ] Canonical article routes
* [ ] Comments
* [ ] Threaded replies
* [ ] Reactions
* [ ] Related content
* [ ] SEO metadata

---

# 18. M14 — Messaging, Support & Notifications

**Status:** ⬜ Not Started

## Objective

Create communication infrastructure between Rcentz, clients and users.

## Messaging

Support:

* Direct conversations
* Project conversations
* Support conversations
* Service conversations
* Order conversations
* Group conversations

## Support

Support:

* Assistance requests
* Support tickets
* Ticket priorities
* Ticket statuses
* Staff assignment
* Ticket messages
* Attachments

## Notifications

Support notifications for:

* Messages
* Projects
* Project updates
* Services
* Orders
* Payments
* Comments
* Reactions
* Tickets
* Assistance
* Commerce
* System events

## Exit Criteria

* [ ] Conversations
* [ ] Participants
* [ ] Messages
* [ ] Attachments
* [ ] Support tickets
* [ ] Ticket messaging
* [ ] Notifications
* [ ] Notification preferences

---

# 19. M15 — Analytics Engine

**Status:** ⬜ Not Started

## Objective

Make analytics a first-class system within Rcentz.

## Project Analytics

Track:

* Project views
* Milestone completion
* Feature completion
* Timeline performance
* Activity
* Downloads
* Engagement

## Portfolio Analytics

Track:

* Views
* Unique views
* Reactions
* Comments
* Shares
* Downloads
* Trends
* Conversions

## Website Analytics

Track:

* Page views
* Popular pages
* Search
* Engagement
* Conversions
* Product views
* Service views
* Portfolio views
* Purchases

## Architecture

The system should allow integration with external analytics providers while leaving room for Rcentz-owned project intelligence.

## Exit Criteria

* [ ] Analytics sessions
* [ ] Analytics events
* [ ] Event tracking foundation
* [ ] Project analytics
* [ ] Portfolio analytics
* [ ] Dashboard analytics
* [ ] Conversion tracking foundation

---

# 20. M16 — SEO / Superhero SEO

**Status:** ⬜ Not Started

## Objective

Make Rcentz highly discoverable while keeping SEO useful and genuine.

## Scope

* Semantic HTML
* Accessible structure
* Dynamic metadata
* Structured data
* Sitemap
* Robots configuration
* Canonical URLs
* Open Graph metadata
* Social metadata
* Search-friendly routes
* Slugs
* Internal linking
* Related content
* Performance
* Indexability

## Indexable Content

Priority pages include:

* Projects
* Services
* Products
* Blog articles
* Categories
* Other genuinely useful content

## Principle

Do not create artificial SEO pages simply to increase page count.

Content must provide genuine value.

## Exit Criteria

* [ ] Metadata system
* [ ] Canonical URLs
* [ ] Sitemap
* [ ] Robots configuration
* [ ] Structured data
* [ ] Open Graph
* [ ] Search-friendly routes
* [ ] Internal linking strategy
* [ ] Performance review

---

# 21. M17 — Production Hardening

**Status:** ⬜ Not Started

## Objective

Prepare the platform for real-world use.

## Scope

### Security

* Authentication review
* Authorization review
* Input validation
* File upload validation
* Server-side validation
* Rate limiting strategy
* Sensitive data protection
* Audit logging

### Performance

* Image optimization
* Database query review
* Caching strategy
* Server rendering review
* Client bundle review
* Loading states
* Error handling

### Reliability

* Error boundaries
* Logging
* Database backup strategy
* Recovery strategy
* Monitoring

## Exit Criteria

* [ ] Security review
* [ ] Performance review
* [ ] Error handling review
* [ ] Database review
* [ ] Production environment verified
* [ ] Deployment verified

---

# 22. M18 — Mobile / Future Application Readiness

**Status:** ⬜ Deferred

## Objective

Ensure the architecture can support a future native/mobile application without unnecessary duplication.

## Principle

The initial product is web-first.

However:

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

* Shared API/data contracts
* Reusable business logic
* Authentication compatibility
* Mobile-friendly interaction patterns
* Push notifications
* Installable applications
* PWA
* Native application possibilities

## Exit Criteria

This milestone does not need to be fully implemented during the initial web product.

It should primarily be protected through architectural decisions made earlier.

---

# 23. Cross-Cutting Systems

These systems should evolve alongside the major milestones rather than being treated as isolated final features.

## Media System

Used by:

* Users
* Services
* Projects
* Project updates
* Portfolio
* Products
* Blog
* Tickets
* Messages

---

## SEO System

Used by:

* Services
* Products
* Blog
* Portfolio
* Public pages

---

## Analytics System

Used by:

* Website
* Portfolio
* Products
* Services
* Projects
* Content

---

## Notification System

Used by:

* Projects
* Services
* Orders
* Payments
* Messages
* Support
* Community

---

## Activity System

Used by:

* Projects
* Client management
* Administrative actions
* Important system events

---

# 24. Project Update Visibility

Project updates should eventually support visibility levels.

```text
INTERNAL
CLIENT
PUBLIC
```

This allows the same project activity/update infrastructure to support:

* Internal staff communication
* Client project tracking
* Public portfolio/project history

---

# 25. Data Ownership Principle

Rcentz should remain the owner of its business data and presentation.

External services may eventually act as integrations or data sources.

Examples:

```text
GitHub
   ↓
Optional Integration
   ↓
Rcentz Portfolio System
```

```text
Vercel
   ↓
Optional Integration
   ↓
Rcentz Portfolio System
```

Neither external platform should become the canonical portfolio presentation layer.

---

# 26. Definition of Done

A milestone is not considered complete merely because the code exists.

A milestone should normally satisfy:

* [ ] Implementation complete
* [ ] TypeScript passes
* [ ] Application builds
* [ ] Runtime behavior tested
* [ ] Responsive behavior tested where applicable
* [ ] Database behavior tested where applicable
* [ ] Error states considered
* [ ] Security implications considered
* [ ] Architecture reviewed
* [ ] Documentation updated
* [ ] Git changes reviewed
* [ ] No known blocking issue

---

# 27. Architectural Decision Log

Important architectural decisions should be recorded here as they are made.

| Date | Decision | Reason | Status |
| ---- | -------- | ------ | ------ |
| 2026-08-31 | Use a modular monolith with explicit internal boundaries | Preserve maintainability and reuse without premature distributed-system complexity | Active |
| 2026-08-31 | PostgreSQL + Prisma are the persistent business-data source of truth | Public, client and admin surfaces must consume consistent underlying data | Active |
| 2026-08-31 | Use Better Auth with Prisma persistence for the authentication foundation | Establish reusable identity/session infrastructure before protected application surfaces | Active |
| 2026-08-31 | Authentication uses a dedicated application shell rather than the public Navbar | Keep auth focused and preserve clear application-surface boundaries | Active |
| 2026-08-31 | Create `features/`, `components/` and `server/` boundaries when real code requires them | Avoid empty-folder architecture while preserving documented responsibilities | Active |

---

# 28. Rejected Approaches

Rejected architectural approaches should be recorded rather than forgotten.

This prevents the project from repeatedly reconsidering decisions that have already been evaluated.

| Date | Rejected Approach | Reason | Replacement |
| ---- | ----------------- | ------ | ----------- |
| 2026-08-31 | Treat Rcentz as a conventional portfolio website | It would not operate the actual business or demonstrate the intended system capabilities | SaaS-like living business platform |
| 2026-08-31 | Premature microservices | Adds operational complexity before independent deployment/scaling is justified | Modular monolith with extractable boundaries |
| 2026-08-31 | UI-only authorization | Hidden UI does not protect server data or mutations | Server/business-layer authorization |

---

# 29. Lessons Learned

Record important implementation lessons here.

Examples:

* Unexpected framework behavior
* Database lessons
* Performance discoveries
* Better architectural patterns
* Failed approaches
* Reusable solutions
* Security discoveries

| Date | Lesson | Impact |
| ---- | ------ | ------ |
| 2026-08-31 | Living documentation can become stale within the same development day | Verify milestone status against code and tested behavior before planning the next module |
| 2026-08-31 | Framework-sensitive Next.js work must be checked against the installed version | Avoid relying on older App Router assumptions when Next.js 16 behavior differs |
| 2026-08-31 | A validated local foundation is not automatically production-ready | Track temporary development configuration, security boundaries and deployment requirements explicitly |

---

# 30. Current Development State

**Primary Active Milestone:** M04 — Database Foundation

**Supporting Active Foundations:** M01 — Project Foundation; M02 — Architecture & Folder Conventions; M10 — Authentication & User System

**Current Module:** Production Data Foundation / Pre-Seed Normalization

**Current File:** `prisma/schema.prisma`

**Current Objective:** Validate the revised Prisma 7 schema, Better Auth 1.7 account contract and canonical Project → PortfolioProfile architecture, then establish idempotent real portfolio seed data before building database-driven application surfaces.

**Known Production Gaps:** Migration strategy must be chosen deliberately; real seed data has not yet been applied; authorization/business validators for cross-project and polymorphic-owner invariants still need implementation in the server layer.

**Blocking Issues:** None recorded

**Last Fully Completed Milestone:** None — foundational milestones remain active until their full exit criteria are satisfied.

**Latest Validated Foundation:** Better Auth registration/login/session retrieval with Prisma persistence; repository architecture and database model re-audited before real seed data.

---

# 31. Immediate Next Steps

The next development cycle should always identify the smallest meaningful implementation unit.

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
UPDATE THIS DOCUMENT
```

Do not begin unrelated major work until the active foundational dependencies are stable enough to support it. Milestones may overlap when one provides infrastructure required by another; such overlap must be recorded explicitly rather than hidden.

---

# 32. Relationship to the Master Blueprint

The documents have different responsibilities.

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

> **What are we building and why?**

The Milestones document answers:

> **What are we building next and how do we know it is complete?**

The codebase answers:

> **What has actually been implemented?**

---

# 33. Living Document Rule

This document must evolve with the project.

When a significant architectural change occurs:

1. Update the milestone.
2. Record the decision.
3. Record rejected approaches where useful.
4. Record lessons learned.
5. Update the current development state.
6. Ensure the Master Blueprint remains consistent with the implementation.

The documentation should describe the **real state of Rcentz**, not an idealized version of what the system was supposed to become.

---

# END OF DOCUMENT
