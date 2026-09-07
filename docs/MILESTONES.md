RCENTZ SYSTEM

Development Milestones

Project: Rcentz System
Document: Development Milestones
Version: 1.5
Status: Active / Living Document
Last Updated: 2026-09-06

1. Purpose

This document tracks the implementation progress of the Rcentz System.

The Master Blueprint defines what Rcentz is and the long-term architectural direction. This milestone document defines:

What is being built

The order of implementation

What each milestone must accomplish

What must be tested before moving forward

Important architectural decisions

Completed, active, deferred and pending work

This is a living document and must reflect the real state of the codebase.

2. Development Philosophy

Rcentz is developed module by module and file by file.

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

Important architectural decisions should remain:

Understandable

Auditable

Reusable

Testable

Consistent with the Master Blueprint

Milestone Closure Rule

A milestone is a one-time implementation checkpoint.

When a milestone is complete:

Its intended architecture and public contracts are considered settled.

It is tested.

It is documented.

The implementation is committed and pushed.

Development moves forward.

A completed milestone should only be reopened for a genuine defect or a demonstrated later architectural dependency.

Future routes may be defined before their destination pages are implemented when the route contract belongs to an earlier shell or navigation milestone.

Translation Closure Rule

Translations are treated as a milestone/project closure gate, not a per-component interruption.

During active implementation:

Temporary raw English strings may exist.

TypeScript and production build checks continue normally.

Translation JSON files are not repeatedly rewritten after every component.

At final translation closure:

IMPLEMENTATION COMPLETE
        ↓
INSPECT FINAL UI COPY
        ↓
UPDATE EN / FR / ES / DE / PT
        ↓
RUN pnpm i18n:audit
        ↓
FIX MISSING / STALE KEYS
        ↓
CLOSE TRANSLATION GATE

For the current project direction, the full translation pass is intentionally deferred until the project is functionally complete.

3. Status Legend

Status

Meaning

⬜ Not Started

Work has not started

🟡 In Progress

Currently being implemented

🟢 Completed

Implemented and tested

🔴 Blocked

Cannot proceed because of an unresolved dependency

🔵 Review

Implemented but awaiting review

⚪ Deferred

Intentionally postponed

4. Overall Roadmap

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

5. M01 — Project Foundation

Status: 🟡 In Progress

Objective

Create the initial Rcentz application and establish the fundamental development environment.

Scope

Next.js application

TypeScript

Package manager

Tailwind CSS

shadcn/ui foundation

Shared UI/icon dependencies

Environment variables

Development scripts

Local development environment

Git repository and main branch

Current State

Foundation is operational and actively supporting production-style feature work.

Current validated stack includes:

Next.js 16.3.3

React 19.2.8

TypeScript 5.9.3

Prisma 7.10.0

Tailwind CSS 4

Motion 13.1.1

Better Auth

PostgreSQL / Neon

pnpm 11.1.1

shadcn Base-UI / base-nova primitives

Lucide icons

Recharts

Exit Criteria

Application starts locally

TypeScript compiles

Tailwind foundation is established

shadcn/ui dependency checkpoint is formally closed

Shared UI/icon dependencies are formally closed

Environment configuration supports the current database/auth foundation

Git repository and main branch are established

Foundation dependencies are stable enough to stop treating M01 as active support work

6. M02 — Architecture & Folder Conventions

Status: 🟡 In Progress

Objective

Establish the structural conventions that govern the Rcentz codebase.

Primary Boundaries

app/
features/
components/
server/
lib/
data/
docs/
ui-shell/
prisma/

Directories are created when real implementation requires them. Empty folders should not be added only to imitate intended architecture.

Architectural Flow

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

Principles

Business logic should not be scattered through UI components.

Feature boundaries should remain reusable.

Server/data access should remain outside presentation components.

Architecture should support Public Web, Client Dashboard, Admin System and future mobile/native applications.

app/ owns routing/composition.

features/ owns domain-specific presentation and engines.

server/ or feature-local server boundaries own business/data access.

Shared UI primitives live outside domain-specific features.

Current Confirmed Pattern

app/
features/
  admin/
  auth/
  home/
  portfolio/
  services/
components/
  ui/
ui-shell/
prisma/
docs/

Exit Criteria

Folder architecture documented

Responsibilities defined

features/ business boundaries established

Server/data-access conventions documented

Architecture recorded in docs/ARCHITECTURE.md

M02 closure checkpoint documented

7. M03 — Rcentz UI Canvas & Design System

Status: 🟢 Completed

Objective

Establish the reusable visual foundation and persistent presentation environment for Rcentz application surfaces.

Final Canvas Foundation

Environmental Canvas: 1440px
Public Content Axis:   1200px

The application remains intentionally bounded on very large displays.

Theme Foundation

Semantic tokens exist for:

Background / foreground

Surfaces

Raised surfaces

Muted surfaces

Borders

Primary / secondary

Accent

Destructive states

Theme accent

Grid lines

Radius values

Cards

Popovers

Shell surfaces

Theme Semantic Rule

The Rcentz theme owns visual meaning while shadcn/Base-UI semantic tokens resolve into that theme.

background       → page
surface          → popovers / menus
surface-raised   → elevated cards / panels
surface-muted    → hover / focus / subtle interaction
foreground       → primary text
muted            → secondary text
primary          → strong action
accent           → interaction surface
theme-accent     → Rcentz teal identity

Base-UI Compatibility Decision

Generated shadcn/Base-UI components may use semantic primitives such as:

bg-popover
text-popover-foreground
bg-accent
text-accent-foreground

These must resolve into the Rcentz theme rather than introduce a second visual language.

Visual Direction

BLACK
 +
WHITE
 +
STRUCTURAL GRID
 +
CONTROLLED LIGHT
 +
RESTRAINED TEAL SIGNAL

Verification

TypeScript                PASS
ESLint                    PASS
Next.js production build  PASS

Git Evidence

Implementation Commit:
f880aa93f9423b7e572f6a424148332cfbc09252

Milestone Tag:
m03-ui-canvas-v1

8. M04 — Database Foundation

Status: 🟢 Completed

Objective

Establish PostgreSQL + Prisma as the central source of truth for the Rcentz System.

Architecture

                    DATABASE
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       Website       Admin        Client
          │            │            │
      Portfolio     Management    Tracking
          │
      Public SEO

Core Domains

The database foundation supports:

Users and authentication

Roles and account status

Services and service categories

Multi-currency service pricing

Service plans and subscriptions

Service requests

Quotes

Projects

Project milestones

Project features and tasks

Portfolio profiles

Products and commerce

Orders

Invoices

Payments and refunds

Crypto payment records

Blog/content

Messaging

Notifications

Support

Analytics

Media

SEO

Data Ownership Principle

DATABASE
   ↓
PUBLIC WEBSITE
   ↓
CLIENT EXPERIENCE
   ↓
ADMIN MANAGEMENT

Project Structure

Project
   ↓
Milestone
   ↓
Feature
   ↓
Task

Billing Architecture

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

Authentication Foundation

Better Auth is connected to Prisma/PostgreSQL persistence.

The official Rcentz administrator is seeded as:

SUPER_ADMIN
ACTIVE
EMAIL VERIFIED

Foundation Counts at M04 Closure

Projects             7
Portfolio            7
Technologies        61
Milestones          26

Service Categories   7
Services             35
Service Prices       70

Verification

Prisma schema validation    PASS
Prisma Client generation    PASS
TypeScript                  PASS
ESLint                      PASS
Database migrations         PASS
Database synchronization    PASS
Admin seed                  PASS
Project seed                PASS
Service seed                PASS
Repeated seed execution     PASS
Next.js production build    PASS

9. M05 — Global Application Shell

Status: 🟢 Completed

Objective

Build the shared application structure used throughout Rcentz.

Architecture

RootLayout
    │
    ├── Providers
    │
    ├── Public Route Group
    │     └── RcentzShell
    │           ├── RcentzDataField
    │           ├── RcentzAce
    │           ├── RcentzHeader
    │           ├── RcentzContentFrame
    │           └── RcentzFooter
    │
    ├── Admin Route
    │     └── AdminShell
    │
    └── Admin Auth Route
          └── Dedicated Admin Login Surface

Implemented

Global shell

Public header/footer

Responsive navigation

Authentication-aware navigation foundation

Theme system

Runtime theme switching

Theme-aware environment

Shared UI foundation

Persistent public canvas

Dedicated admin shell boundary

Public route grouping

Admin auth route separation

Canonical Public Navigation

/                 Home
/services         Services
/portfolio        Work / Portfolio
/store            Store / Commerce
/blog             Blog / Community
/about            About
/login            Sign in
/dashboard        Authenticated client system
/admin            Administrative system
/adminlogin/login Administrative sign in

Git Evidence

Implementation Checkpoint:
a7d9bdcd2097da87fc65c10e7db83df77c1d38ca

Closure Documentation:
8cf27a4d558d9152cf6a79c03298d5e83445937d

Milestone Tag:
m05-global-application-shell-v1

10. M06 — Database-Driven Public Homepage

Status: 🟢 Completed

Initial Completion: 2026-09-02
Final Presentation Closure: 2026-09-03

Objective

Create the first complete public-facing Rcentz experience powered by the database while preserving the shared shell, visual identity, responsive architecture and reusable data boundaries.

Homepage Architecture

Public Home Route
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

Data Boundary

The homepage consumes canonical database records for:

Featured services

Service categories

Multi-currency pricing

Featured portfolio projects

Project status/progress

Portfolio summaries

Technologies

Live/repository links

Hero Story System

Final sequence:

01 Rcentz
02 Rcentz × AI
03 System
04 Live Data
05 Commerce
06 Rcentz Core

Presentation Principles

Read-first storytelling

Long variable dwell periods

Reduced-motion support

Wider mobile usable canvas

Controlled hero composition

Database-driven content

No fake business metrics

Real project references only

Verification

ESLint                     PASS
Prisma Client generation   PASS
Next.js compilation        PASS
TypeScript                 PASS
Static generation          PASS
Production build           PASS
Git push                   PASS
Vercel deployment          PASS

Git Evidence

Initial Hero Checkpoint
2f3cd847b7e734ed6c9ea3d574b6db955e5aa490

Expanded Hero / Public UI Checkpoint
274c29e

Final M06 Presentation Closure
95fc78b7a5edc3a265b7466fe51485bff488294b

11. M07 — Portfolio Engine

Status: 🟢 Completed

Objective

Build the Rcentz portfolio as a real database-driven product engine.

Core Architecture

Project
   ↓
PortfolioProfile
   ↓
Public Portfolio Data Access
   ↓
/portfolio
   ↓
/portfolio/[slug]

Implemented

Database-driven /portfolio listing

/portfolio/[slug] project detail route

Public project visibility rules

Published-profile filtering

Database-driven technologies

Technology category, description, purpose and rationale

Enriched technology seed catalogue

Real project media/gallery

Full-screen gallery preview

Project overview illustration

Delivery-profile and readiness charts

Floating project technology rail

Detailed technology architecture presentation

Related-project sliding carousel

Dynamic project metadata

Authentic missing-analytics handling

Mobile responsiveness refinement

Real AJ Logik / JobRcentz representation where supported by data

Authentic Portfolio Principle

Only genuine project information, screenshots, features, history, results and supported metrics may be shown.

No project, client, result, metric or testimonial should be invented to make the portfolio appear larger.

Git Evidence

Portfolio Index:
d297c32ab332e2c7d5afdf5e3b561e0f070c8a2e

Project Detail:
4c871dfe1467e1e1be650aeda21a3759bd51225c

Mobile Responsiveness:
45a6954fec9a355c36f4ef123058219fa2bb10f8

Closure Note

Portfolio implementation is considered functionally established. Later engagement/analytics enhancements belong to their owning later milestones unless a genuine portfolio defect is discovered.

12. M08 — Services Engine

Status: 🟢 Completed

Objective

Create a database-driven services marketplace and public service discovery experience.

Canonical Routes

/services
/services/[slug]

Service Lifecycle

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

Implemented Foundation

Database-driven service categories

Database-driven service records

Multi-currency pricing support

Services listing

Service detail routes

Slug routing

Public service presentation

Service acquisition route contract

Service request / quote architecture already represented in database

Homepage service integration

Service discovery / public navigation integration

Responsive presentation

Translation integration checkpoint previously completed during public service work

Remaining Work Ownership

Actual administrative service CRUD belongs primarily to M12 Admin Control Center.

Full client request-to-project workflow execution belongs across M10 / M11 / M12 depending on the surface.

The public Services Engine itself should not be reopened merely because later management screens are still pending.

13. M09 — Commerce Foundation

Status: ⚪ Deferred

Objective

Create a shared commerce foundation supporting digital and physical products.

Digital Product Examples

Templates

UI kits

Code

Components

Design assets

Documents

Digital resources

Physical Product Examples

Mice

PCs

Batteries

Screens

Technology accessories

Canonical Route

/store

Scope

Product catalogue

Categories

Media

Variants

Inventory

Cart

Orders

Payments

Digital delivery

Physical fulfilment

Deferral Decision

M09 is intentionally deferred while Rcentz authentication, client workflows and administrative operations are established.

The database already contains commerce foundations, so deferral does not require architectural redesign.

14. M10 — Authentication & User System

Status: 🟡 In Progress

Current Major Checkpoint: 2026-09-06
Checkpoint Commit: eeef24b8e9ac1b603f831379a34d0bb2a7351a28

Objective

Establish identity, sessions, role-aware authorization and protected application shells throughout the platform.

Roles

USER
CLIENT
STAFF
ADMIN
SUPER_ADMIN

Authentication Architecture

IDENTITY
   ↓
SESSION
   ↓
ROLE
   ↓
STATUS
   ↓
SERVER AUTHORIZATION
   ↓
PROTECTED ROUTING
   ↓
ROLE-AWARE APPLICATION SHELL

Current Auth Foundation

Better Auth + Prisma + PostgreSQL/Neon persistence is validated.

Implemented:

Better Auth server configuration

Better Auth client

Prisma adapter integration

Canonical role/status persistence

Current-user server helper

Server-side admin authorization

Protected /admin layout

Dedicated /adminlogin/login

Admin sign-out flow

Auth-aware public navigation foundation

Public /login surface

Official seeded SUPER_ADMIN account

Admin shell user identity propagation

requireAdmin() Contract

Current behavior:

NO SESSION
  → /adminlogin/login?next=/admin

INACTIVE USER
  → /

NON ADMIN / SUPER_ADMIN
  → /dashboard

ADMIN / SUPER_ADMIN
  → protected admin surface

Admin Shell Foundation Established During M10

Although full Admin CRUD belongs to M12, M10 now owns the protected Admin application foundation required to prove authorization and role-aware routing.

Implemented:

AdminShell

AdminSidebar

AdminHeader

Sidebar collapse behavior

Theme toggle

Command search

Account dropdown

Messages dropdown foundation

Notifications dropdown foundation

Admin avatar/identity trigger

Protected session presentation

Admin overview composition

Role-aware admin shell entry

Admin Navigation Contract Established

WORKSPACE
├── Overview
├── Analysis
├── Service Requests
├── Projects
├── Tasks
└── Clients

OPERATIONS
├── Messages
├── Notifications
└── Finance

MANAGEMENT
├── Services
└── Settings

Destination pages may be completed in later milestones. Defining these routes here does not mean all Admin CRUD is complete.

Admin Overview Implemented

Current overview includes:

Service request metric

Active project metric

Client metric

Open milestone metric

Pending quote metric

Projects progress

Active project health monitor

Tasks overview

Clients overview

Notifications overview

Financial operations overview

Preview fallback data where database records are absent

Preview Data Rule

Preview data is allowed for dashboard design only when:

It is explicitly labeled Preview.

It cannot be mistaken for real business records.

It does not navigate to fake entity routes.

Real database records automatically replace preview content when available.

Finance Foundation

The Admin financial overview uses existing schema foundations:

Invoice

Payment

ClientSubscription

Current overview covers:

Gross received

Net received

Payment fees/deductions

Outstanding receivables

Overdue balances

Recent payments

Client subscriptions

A dedicated company Expense model has not been introduced at this checkpoint.

Theme / Base-UI Compatibility Fix

During M10 Admin shell work, a semantic mismatch was identified between generated shadcn/Base-UI primitives and Rcentz theme tokens.

Decision:

shadcn semantic vocabulary
        ↓
Rcentz theme aliases
        ↓
consistent light / dark surfaces

Base-UI dropdown focus behavior now uses Rcentz surface semantics rather than strong inverted accent colors.

Verification — 2026-09-06 Checkpoint

pnpm typecheck              PASS
Prisma Client generation    PASS
Next.js 16.3.3 compilation  PASS
TypeScript build phase      PASS
Static page generation      PASS
Production build            PASS
Git commit                  PASS
Git push                    PASS

Production build routes at checkpoint:

/
/_not-found
/admin
/adminlogin/login
/api/auth/[...all]
/login
/portfolio
/portfolio/[slug]
/services
/services/[slug]

Git Evidence

Checkpoint Commit:
eeef24b8e9ac1b603f831379a34d0bb2a7351a28

Commit Message:
feat(admin): build dashboard overview finance and navigation shell

M10 Remaining Work

Tighten next redirect validation to reject protocol-relative destinations such as //example.com

Complete email verification flow/policy

Establish reusable authenticated-user guard for client dashboard

Implement /dashboard

Implement client dashboard shell

Complete role-aware public navbar destination behavior

Establish account/profile surface

Validate client profile flow

Decide/validate staff profile flow

Confirm production-safe auth configuration

Complete runtime authorization tests for all roles

Final M10 verification

Document closure

Commit/push closure checkpoint

Exit Criteria

Registration validated

Login validated

Session retrieval validated

Logout integrated

Email verification completed

Server-side role authorization established

Client profile flow established

Staff profile flow established or deliberately staged

Auth-aware navigation established

Protected admin surface established

Protected client surface established

Production-safe auth configuration verified

M10 closure documented

15. M11 — Client Project Management

Status: ⬜ Not Started

Objective

Allow clients to interact with and track their projects.

Project Information

Projects may contain:

Name

Client

Purpose

Vision

Description

Expected outcome

Start date

Expected completion date

Actual completion date

Status

Progress

Key features

Milestones

Tasks

Project phases

Feature dependencies

Assignments

Activity history

Attachments

Deliverables

Analytics

Project Lifecycle

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

Additional states:

ON_HOLD
CANCELLED

Exit Criteria

Client project dashboard

Project overview

Milestones

Features

Tasks

Updates

Activity history

Files/deliverables

Progress visualization

Project analytics

Authorization review

Responsive review

16. M12 — Admin Control Center

Status: 🟡 Foundation Started

Objective

Build the central management system for Rcentz.

Important Boundary

M10 established the protected Admin shell and overview foundation.

M12 owns the full operational managers and CRUD workflows.

This distinction prevents M10 from expanding indefinitely.

Current Admin Navigation Contract

ADMIN
├── Overview
├── Analysis
├── Service Requests
├── Projects
├── Tasks
├── Clients
├── Messages
├── Notifications
├── Finance
├── Services
└── Settings

Future managers may add:

Portfolio

Products

Orders

Content

Blog

Comments

Support

Analytics-specific modules

Audit tooling

Existing M12 Foundation

Already available from the M10 checkpoint:

Protected Admin shell

Admin navigation

Admin overview

Database-backed metrics

Project monitoring

Task/client/notification overview surfaces

Finance intelligence overview

Preview fallback pattern

Theme-aware Base-UI primitives

M12 Scope

Service request management

Project management

Milestone management

Task management

Client management

Service management

Portfolio management

Product management

Content management

Order management

Finance management

Analytics access

Settings

Administrative mutations

Audit/security review

Principle

Admin-managed data should drive:

Public website

Client experience

Internal management

The Admin system should replace long-term dependence on seed files for business management.

17. M13 — Blog / Community Content Engine

Status: ⬜ Not Started

Objective

Build an interactive content platform around the Rcentz blog.

Routes

/blog
/blog/[slug]

Scope

Articles

Categories

Tags

Authors

Comments

Threaded replies

Reactions

Upvotes

Saves/bookmarks

Trending content

Popular content

Related content

SEO metadata

18. M14 — Messaging, Support & Notifications

Status: ⬜ Not Started

Objective

Create full communication infrastructure between Rcentz, clients and users.

Existing Foundation

The Admin header and overview now expose Messages and Notifications presentation contracts.

These are shell/navigation foundations only.

Full messaging, notification mutation, support workflows and real-time behavior remain M14 work.

Messaging

Support:

Direct conversations

Project conversations

Support conversations

Service conversations

Order conversations

Group conversations

Support

Assistance requests

Support tickets

Priorities

Statuses

Staff assignment

Ticket messages

Attachments

Notifications

Notifications may cover:

Messages

Projects

Project updates

Services

Orders

Payments

Comments

Reactions

Tickets

Assistance

Commerce

System events

Exit Criteria

Conversations

Participants

Messages

Attachments

Support tickets

Ticket messaging

Notifications

Notification read/unread mutations

Notification preferences

Authorization review

19. M15 — Analytics Engine

Status: ⬜ Not Started

Objective

Make analytics a first-class system within Rcentz.

Existing Foundation

An Admin Analysis navigation contract now exists.

The current Admin overview already displays operational summaries and project health, but this does not constitute the full analytics milestone.

Project Analytics

Track:

Views

Milestone completion

Feature completion

Timeline performance

Activity

Downloads

Engagement

Portfolio Analytics

Track:

Views

Unique views

Reactions

Comments

Shares

Downloads

Trends

Conversions

Website Analytics

Track:

Page views

Popular pages

Search

Engagement

Conversions

Product views

Service views

Portfolio views

Purchases

20. M16 — SEO / Superhero SEO

Status: ⬜ Not Started

Objective

Make Rcentz highly discoverable while keeping SEO useful and genuine.

Scope

Semantic HTML

Accessible structure

Dynamic metadata

Structured data

Sitemap

Robots configuration

Canonical URLs

Open Graph

Social metadata

Search-friendly routes

Slugs

Internal linking

Related content

Performance

Indexability

Priority Indexable Content

Projects

Services

Products

Blog articles

Categories

Other genuinely useful content

Principle

Do not create artificial SEO pages simply to increase page count.

21. M17 — Production Hardening

Status: ⬜ Not Started

Objective

Prepare the platform for real-world production use.

Security

Authentication review

Authorization review

Input validation

File upload validation

Server-side validation

Rate limiting strategy

Sensitive data protection

Audit logging

Performance

Image optimization

Database query review

Caching strategy

Server rendering review

Client bundle review

Loading states

Error handling

Reliability

Error boundaries

Logging

Database backup strategy

Recovery strategy

Monitoring

Known PostgreSQL Warning

Current production builds emit a future compatibility warning concerning PostgreSQL SSL-mode interpretation.

The warning does not currently block builds.

Before M17 closure:

Connection-string SSL semantics must be reviewed.

Intended security behavior must be explicit.

Current behavior should be preserved intentionally or migrated deliberately.

22. M18 — Mobile / Future Application Readiness

Status: ⚪ Deferred

Objective

Ensure the architecture can support a future native/mobile application without unnecessary duplication.

Principle

The initial product is web-first.

                Rcentz Business Logic
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
           WEB                     MOBILE
             │                       │
        Web Interface          Native Interface

Future Considerations

Shared API/data contracts

Reusable business logic

Authentication compatibility

Mobile-friendly interaction patterns

Push notifications

Installable applications

PWA

Native application possibilities

23. Cross-Cutting Systems

Media System

Used by:

Users

Services

Projects

Project updates

Portfolio

Products

Blog

Tickets

Messages

SEO System

Used by:

Services

Products

Blog

Portfolio

Public pages

Analytics System

Used by:

Website

Portfolio

Products

Services

Projects

Content

Notification System

Used by:

Projects

Services

Orders

Payments

Messages

Support

Community

Activity System

Used by:

Projects

Client management

Administrative actions

Important system events

24. Project Update Visibility

Project updates support three visibility levels:

INTERNAL
CLIENT
PUBLIC

The same update infrastructure can therefore support:

Internal staff communication

Client project tracking

Public portfolio/project history

25. Data Ownership Principle

Rcentz owns its business data and presentation.

External services may act as integrations or data sources.

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

Neither external platform should become the canonical portfolio presentation layer.

26. Definition of Done

A milestone is not complete merely because code exists.

A milestone should normally satisfy:

Implementation complete

TypeScript passes

Application builds

Runtime behavior tested

Responsive behavior tested where applicable

Database behavior tested where applicable

Error states considered

Security implications considered

Architecture reviewed

Route/navigation contracts finalized where applicable

Documentation updated

Git changes reviewed

Implementation committed and pushed

No known blocking issue

Once closed, a milestone remains closed unless a genuine defect or later architectural dependency requires a targeted correction.

27. Architectural Decision Log

2026-08-31 — Modular Monolith

Decision: Use a modular monolith with explicit internal boundaries.
Reason: Preserve maintainability and reuse without premature distributed-system complexity.
Status: Active

2026-08-31 — PostgreSQL + Prisma Source of Truth

Decision: PostgreSQL + Prisma are the persistent business-data source of truth.
Reason: Public, client and admin surfaces must consume consistent underlying data.
Status: Active

2026-08-31 — Better Auth + Prisma

Decision: Use Better Auth with Prisma persistence.
Reason: Establish reusable identity/session infrastructure before protected surfaces.
Status: Active

2026-08-31 — Dedicated Auth Shell

Decision: Authentication uses dedicated application surfaces rather than depending entirely on the public Navbar.
Reason: Keep authentication focused and preserve application-surface boundaries.
Status: Active

2026-08-31 — Create Boundaries When Needed

Decision: Create feature/component/server boundaries when real code requires them.
Reason: Avoid empty-folder architecture while preserving documented responsibilities.
Status: Active

2026-09-02 — Canonical Work Route

Decision: Public Work destination is /portfolio.
Reason: Preserve one canonical route across Navbar, Footer, Hero and M07.
Status: Active

2026-09-02 — Canonical Services Route

Decision: Public service destination is /services.
Reason: Keep homepage acquisition and M08 on one route contract.
Status: Active

2026-09-02 — Future Routes May Be Reserved Early

Decision: Navigation may point to future routes before destination pages are implemented.
Reason: Completed shell milestones define route contracts; later milestones build the experiences.
Status: Active

2026-09-02 — Database-Backed Homepage Content

Decision: Homepage business content remains database-backed.
Reason: Avoid duplicated hardcoded service/project truth.
Status: Active

2026-09-03 — Six-Story Hero with Rcentz × AI

Decision: The homepage Hero uses six stories, with Rcentz × AI immediately after the main Rcentz introduction.
Reason: AI collaboration is part of the Rcentz engineering method and should be presented as human-directed acceleration.
Status: Active

2026-09-03 — 1200px Public Content Axis

Decision: Environmental canvas remains 1440px while public content is capped at 1200px.
Reason: Preserve a premium wider presentation without stretching internal compositions.
Status: Active

2026-09-03 — Component Width Is Independent from Shell Width

Decision: Individual compositions may be narrower than the application shell.
Reason: Available space and useful composition width are not the same thing.
Status: Active

2026-09-03 — Long Hero Stillness

Decision: Hero stories use long variable dwell periods and intentional quiet states.
Reason: Rcentz should feel readable first and unexpectedly alive second.
Status: Active

2026-09-03 — Wider Mobile Usable Canvas

Decision: Mobile public sections use reduced outer gutters.
Reason: Protect useful width and future application-style information density.
Status: Active

2026-09-06 — Admin Foundation Belongs to M10, Full CRUD to M12

Decision: M10 may establish the protected Admin shell, overview and navigation contracts needed to prove authentication and authorization. Full operational Admin CRUD remains M12.
Reason: Authentication cannot be validated meaningfully without a protected destination, but M10 must not expand into the entire control center.
Status: Active

2026-09-06 — Rcentz Theme Owns shadcn Semantic Meaning

Decision: Generated shadcn/Base-UI semantic colors must resolve into Rcentz theme surfaces.
Reason: Prevent component-library defaults from introducing inconsistent hover/focus/popover behavior.
Status: Active

2026-09-06 — Preview Data Must Be Explicit

Decision: Dashboard preview records may be used only when clearly labeled and automatically replaced by real database data.
Reason: Support interface development without fabricating business truth.
Status: Active

2026-09-06 — Translation Pass Deferred to Final Project Closure

Decision: Complete all language JSON synchronization in one final project-level pass rather than repeatedly during active feature construction.
Reason: Avoid churn while UI copy and Admin/client surfaces are still changing.
Status: Active

28. Rejected Approaches

Conventional Portfolio Website

Rejected: Treat Rcentz as a conventional portfolio website.
Replacement: SaaS-like living business platform.

Premature Microservices

Rejected: Distributed microservices during the foundation stage.
Replacement: Modular monolith with extractable boundaries.

UI-Only Authorization

Rejected: Protecting access by hiding UI elements only.
Replacement: Server/business-layer authorization.

Temporary Homepage Anchors

Rejected: Temporary homepage-anchor routing for canonical Hero actions.
Replacement: Route directly to canonical product destinations.

/work as a Second Portfolio Route

Rejected: Add /work alongside /portfolio.
Replacement: /portfolio.

Fake Dashboard Business Data

Rejected: Presenting dummy records as if they are real clients, finances, messages, project outcomes or metrics.
Replacement: Explicit Preview fallback states.

Per-Component Translation Churn

Rejected: Rewriting all language JSON files every time a component changes during active implementation.
Replacement: Final translation closure gate.

29. Lessons Learned

Living Documentation Can Become Stale Quickly

Impact: Verify milestone status against code and tested behavior before planning the next module.

Framework-Sensitive Work Must Match the Installed Version

Impact: Avoid relying on older Next.js or shadcn assumptions.

Local Validation Is Not Production Readiness

Impact: Track security, environment and deployment requirements explicitly.

Route Contracts Belong to Their Owning Milestone

Impact: Prevent reopening shell/homepage work when later route milestones begin.

Mobile Needs Different Density

Impact: Compact presentation and controlled information density improve small-screen usability.

Shell Width and Composition Width Are Different

Impact: Treat shell geometry and component geometry separately.

Stillness Is Part of Animation Design

Impact: Long quiet periods improve readability and make motion more meaningful.

AI Is Best Framed as Human-Directed Acceleration

Impact: Present business context, technical judgment, AI execution and human review as one engineering workflow.

2026-09-06 — Primitive Semantics Can Override Feature Styling

Impact: When a shadcn/Base-UI component behaves strangely, inspect the generated primitive and theme token semantics before adding feature-level overrides.

2026-09-06 — Source First, Override Second

Impact: Fix reusable primitives or theme contracts at the source when the issue affects multiple components.

2026-09-06 — Protected Destination Surfaces Help Validate Auth

Impact: Authentication architecture becomes easier to validate when there is a real role-protected shell rather than only login forms.

30. Current Development State

Primary Active Milestone:
M10 — Authentication & User System

Secondary Foundation Started:
M12 — Admin Control Center

Completed Public Milestones:

M03  UI Canvas / Design System       ✅
M04  Database Foundation             ✅
M05  Global Application Shell        ✅
M06  Public Homepage                 ✅
M07  Portfolio Engine                ✅
M08  Services Engine                 ✅

Deferred:

M09 Commerce Foundation              ⚪
M18 Mobile / Future App Readiness    ⚪

Current Git Checkpoint:

eeef24b8e9ac1b603f831379a34d0bb2a7351a28
feat(admin): build dashboard overview finance and navigation shell

Checkpoint Validation:

pnpm typecheck  PASS
pnpm build      PASS
git push        PASS

Current System Surface:

PUBLIC
├── /
├── /services
├── /services/[slug]
├── /portfolio
├── /portfolio/[slug]
└── /login

AUTH
├── /api/auth/[...all]
└── /adminlogin/login

ADMIN
└── /admin

Current Admin Shell Contracts:

Overview
Analysis
Service Requests
Projects
Tasks
Clients
Messages
Notifications
Finance
Services
Settings

Known Production Gap:
PostgreSQL SSL-mode future compatibility warning remains tracked for M17.

Blocking Issues:
None recorded.

31. Immediate Next Steps

Current continuation sequence:

M10 AUTH FOUNDATION
        ↓
tighten redirect safety
        ↓
email verification decision/flow
        ↓
require authenticated user
        ↓
/dashboard
        ↓
client dashboard shell
        ↓
role-aware navigation
        ↓
profile/account flow
        ↓
role/runtime authorization tests
        ↓
M10 verification
        ↓
M10 closure

After M10 closure:

M11 CLIENT PROJECT MANAGEMENT
        ↓
M12 ADMIN CRUD / OPERATIONS
        ↓
M14 MESSAGING / NOTIFICATIONS
        ↓
M15 ANALYTICS

The Admin overview should not be repeatedly redesigned while M10 authentication foundations remain unfinished unless a genuine defect appears.

32. Relationship to the Master Blueprint

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

The Master Blueprint answers:

What are we building and why?

The Milestones document answers:

What are we building next and how do we know it is complete?

The codebase answers:

What has actually been implemented?

33. Living Document Rule

This document must evolve with the project.

When a significant architectural change occurs:

Update the relevant milestone

Record the architectural decision

Record rejected approaches where useful

Record lessons learned

Update the current development state

Ensure the Master Blueprint remains consistent with implementation

Documentation must describe the real Rcentz system, not an idealized version of what it was expected to become.

A milestone closure is a durable checkpoint, not a temporary note that is silently reopened later.

Current Handoff

M06 PUBLIC HOMEPAGE
        ✅ CLOSED

M07 PORTFOLIO ENGINE
        ✅ CLOSED

M08 SERVICES ENGINE
        ✅ CLOSED

M09 COMMERCE FOUNDATION
        ⚪ DEFERRED

M10 AUTHENTICATION & USER SYSTEM
        🟡 ACTIVE
             │
             ├── Auth persistence            ✅
             ├── Admin authorization         ✅
             ├── Protected Admin shell       ✅
             ├── Admin overview foundation   ✅
             ├── Admin navigation contract   ✅
             ├── Finance overview            ✅
             ├── Client dashboard            ⬜
             ├── Email verification closure  ⬜
             ├── Profile/account flow        ⬜
             └── Final auth hardening         ⬜

M12 ADMIN CONTROL CENTER
        🟡 FOUNDATION STARTED
        Full CRUD remains future work

Latest verified implementation checkpoint:
eeef24b8e9ac1b603f831379a34d0bb2a7351a28

Next development focus:
Complete M10 Authentication & User System without reopening completed Admin overview work.

Final project translation pass:
Deferred until functional project completion.

END OF DOCUMENT