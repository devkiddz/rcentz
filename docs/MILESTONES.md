RCENTZ SYSTEM

DEVELOPMENT MILESTONES

Project: Rcentz System
Document: Development Milestones
Version: 1.2
Status: Active / Living Document
Last Updated: 2026-09-02

1. Purpose

This document tracks the implementation progress of the Rcentz System.

The Master Blueprint defines what Rcentz is and the architectural direction of the product.

This document defines:

What we are building

The order in which we are building it

What each milestone must accomplish

What must be tested before moving forward

Major architectural decisions made during implementation

Completed, active and pending work

This document is intentionally living and should evolve with the project.

2. Development Philosophy

Rcentz will be developed module by module and file by file.

The development process is:

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
COMMIT / PUSH
  ↓
NEXT MODULE / MILESTONE

The objective is not simply to generate code quickly.

Every important architectural decision should be:

Understandable

Auditable

Reusable

Testable

Consistent with the Master Blueprint

Milestone Closure Rule

A milestone is a one-time implementation checkpoint.

When a milestone is complete:

Its intended architecture and public contracts are considered settled unless a genuine bug or later architectural requirement proves otherwise.

The milestone is tested.

The milestone is documented.

The implementation is committed and pushed.

The next milestone begins.

Future routes may be referenced before their destination pages are implemented when the route contract belongs to an earlier completed shell or navigation milestone.

Example:

M05 / M06
Define canonical navigation destination
        ↓
Later milestone
Build destination experience

The project should move forward rather than repeatedly reopening completed milestones for avoidable structural decisions.

3. Milestone Status Legend

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

Implemented but awaiting architectural/code review

⚪ Deferred

Intentionally postponed

4. Overall Roadmap

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

5. M01 — Project Foundation

Status: 🟡 In Progress

Objective

Create the initial Rcentz application and establish the fundamental development environment.

Scope

Create Next.js application

Configure TypeScript

Configure package manager

Configure Tailwind CSS

Install shadcn/ui foundation

Install required UI/icon dependencies

Configure environment variables

Establish development scripts

Confirm local development environment

Expected Result

The project should:

Start successfully

Compile successfully

Support TypeScript

Support Tailwind

Support shadcn/ui

Have a clean initial structure

Exit Criteria

Application starts locally

TypeScript compiles

Tailwind foundation is installed

shadcn/ui foundation is formally closed as a project-wide dependency checkpoint

Required shared UI/icon dependencies are formally closed as a project-wide dependency checkpoint

Environment configuration is sufficient for the current database/auth foundation

Git repository and main branch are established

6. M02 — Architecture & Folder Conventions

Status: 🟡 In Progress

Objective

Establish the structural conventions that will govern the entire Rcentz codebase.

Architectural Direction

Rcentz should maintain clear separation between:

app/
features/
components/
server/
lib/
data/
docs/
ui-shell/
prisma/

The exact structure may evolve during implementation, but responsibilities must remain clearly separated.

Planned top-level boundaries should be created when real implementation requires them. Empty directories should not be created merely to make the repository resemble the target architecture.

Scope

Establish application routing

Establish feature boundaries

Establish reusable component conventions

Establish server/backend conventions

Establish data-access conventions

Establish shared utility conventions

Establish naming conventions

Establish import conventions

Establish documentation conventions

Principle

Do not allow business logic to become scattered throughout UI components.

The architecture should make it possible to reuse business logic across:

Public Web

Client Dashboard

Admin System

Future mobile/native applications

Current Architectural Flow

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

Exit Criteria

Folder architecture documented

Responsibilities defined

First business features/ boundary established in code

Server/data-access conventions documented

Architecture reviewed and recorded in docs/ARCHITECTURE.md

M02 formal closure checkpoint documented

7. M03 — Rcentz UI Canvas & Design System

Status: 🟢 Completed

Objective

Establish the reusable visual foundation and persistent presentation environment that Rcentz application surfaces can build upon.

M03 establishes the initial Rcentz visual identity without coupling business-domain features to the presentation shell.

Scope

UI Canvas

Implemented:

Controlled centered canvas foundation

Responsive desktop and mobile canvas

Maximum canvas width

Maximum content width

Consistent horizontal spacing

Layout constraints for wide displays

Responsive behavior for smaller screens

Current sizing foundation:

Canvas Maximum: 1440px
Content Maximum: 1200px

The application should remain intentionally bounded rather than stretching indefinitely across very large displays.

Theme Foundation

Implemented semantic design tokens for:

Background and foreground

Surfaces

Muted states

Borders

Primary

Secondary

Accent

Destructive states

Grid lines

Radius values

The default visual direction remains:

BLACK
  +
WHITE
  +
STRUCTURAL GRID
  +
CONTROLLED LIGHT

The current restrained accent direction uses teal as signal/light/active state while foreground hierarchy remains black/white.

Light and dark system preferences are supported at the token level.

Components should consume semantic tokens rather than scatter theme-specific values throughout the application.

Rcentz UI Shell

A dedicated shell boundary has been established:

ui-shell/
├── RcentzShell.tsx
└── layers/
    ├── RcentzDataField.tsx
    └── RcentzAce.tsx

Current composition:

RcentzShell
│
├── RcentzDataField
├── RcentzAce
│
└── Application Content

The shell owns persistent visual presentation.

Pages and future features remain responsible for their own content and business composition.

Rcentz Data Field

The background system has evolved beyond a static grid into a living Rcentz data environment.

Implemented:

Structural grid

Randomized star/data lights

Twinkling data points

Subtle travelling data signals

Ambient illumination

Central breathing light

Readability masking

Mobile density reduction

Reduced-motion handling

Decorative randomness is handled without React render-state updates.

The data field should remain atmospheric and should not compete with application content.

Rcentz C Formation / Ace

RcentzAce establishes the centered Rcentz identity formation.

Implemented:

Centered formation

Distributed light nodes

Inner supporting nodes

Circular arc structure

Breathing halo

Travelling light

Appearance lifecycle

Extended live period

Dissolve

Reappearance

Mobile adaptation

Reduced-motion handling

Animation Identity

M03 establishes the initial Rcentz animation language:

STRUCTURE
   +
DATA
   +
LIGHT
   +
SUBTLE MOTION
   +
BREATHING SPACE

Animation should remain restrained enough that application content remains the primary interface layer.

Responsive Philosophy

Desktop provides the full visual environment and higher information density.

Mobile uses reduced decorative density, compact information hierarchy and simplified secondary animation.

Desktop and mobile remain the same visual system expressed at different densities.

Deferred Experiment

Pointer-reactive lighting was explored during M03.

The intended interaction remains:

POINTER
   ↓
LIGHT RESPONSE

NOT

POINTER
   ↓
MOVE THE IDENTITY FORMATION

The experiment did not yet produce the intended result and remains deferred.

It does not block M03 completion and may be revisited later without changing the shell architecture.

Navigation Boundary

Navigation was intentionally not an M03 completion requirement.

Global navigation, header, footer, responsive navigation and authentication-aware navigation belong primarily to:

M05 — Global Application Shell

M03 establishes the visual environment those systems inhabit.

Verification

M03 passed:

pnpm typecheck
pnpm lint
pnpm build

Verified:

TypeScript                  PASS
ESLint                      PASS
Next.js production build    PASS

Git Evidence

Implementation Commit

f880aa93f9423b7e572f6a424148332cfbc09252

Commit Message

feat: establish Rcentz UI shell and milestone workflow

Milestone Tag

m03-ui-canvas-v1

Exit Criteria

Controlled canvas implemented

Responsive canvas foundation implemented

Canvas/content width boundaries established

Semantic design tokens established

Black-and-white visual foundation established

Persistent Rcentz UI shell established

Rcentz Data Field implemented

Structural grid implemented

Star/data-light system implemented

Ambient motion system implemented

Rcentz identity formation implemented

Mobile-specific visual behavior implemented

Reduced-motion behavior implemented

TypeScript verified

ESLint verified

Production build verified

Runtime visual behavior reviewed

Implementation committed

Implementation pushed to GitHub

Milestone tag created

Milestone Result

Rcentz now has a reusable visual environment and identifiable presentation language.

RCENTZ APPLICATION
        │
        ↓
   RcentzShell
        │
   ┌────┴─────┐
   ↓          ↓
Data Field   Identity
   │          │
   └────┬─────┘
        ↓
APPLICATION CONTENT

M03 is complete.

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

Scope

The database foundation supports the core domains required for the wider Rcentz platform, including:

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

Database Principle

The database is the canonical source of truth for information that must appear across multiple Rcentz application surfaces.

DATABASE
   ↓
PUBLIC WEBSITE
   ↓
CLIENT EXPERIENCE
   ↓
ADMIN MANAGEMENT

Business records that belong in the database should not be duplicated as permanently hardcoded application content.

Project Structure

The project-management hierarchy is:

Project
   ↓
Milestone
   ↓
Feature
   ↓
Task

Features may exist in a project backlog before being assigned to a milestone.

Tasks belong to features.

Progress values currently stored for seeded historical projects are provisional aggregates and may later be derived more deeply from live feature and task activity.

Billing Architecture

Rcentz has a shared billing foundation supporting one-off services, long-term services and commerce.

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

Multi-Currency Service Pricing

Service pricing is normalized through dedicated ServicePrice records.

Service
  ↓
ServicePrice
  ├── NGN
  └── USD

Quotes and invoices remain responsible for preserving their final agreed monetary values.

Authentication Foundation

Better Auth is connected to the Prisma/PostgreSQL persistence layer.

The official Rcentz system administrator is seeded through Better Auth and subsequently promoted to:

SUPER_ADMIN
ACTIVE
EMAIL VERIFIED

Seed credentials are provided through environment variables and are not stored directly in source code.

Authentication persistence is established.

Full application authorization remains the responsibility of later server-side authorization boundaries.

Official Project History Seed

Real Rcentz project history is represented in the database.

Seeded projects include:

AJ Logik

Shelsea Commerce

Waffi Market

JobRcentz

NovaShad v01

NovaPanel v01

Rcentz Core

The seed includes:

Project records

Portfolio profiles

Technologies

Historical milestones

Project status

Visibility

Featured state

Development evidence where available

Verified foundation counts at M04 closure:

Projects         7
Portfolio        7
Technologies    61
Milestones      26

Official Service Catalogue Seed

The initial canonical Rcentz service catalogue is stored in the database.

Categories include:

Web Development
WordPress
Mobile & Adaptive Experiences
Business Systems
E-commerce
Maintenance & Modernization
Technical Consulting

Verified foundation counts at M04 closure:

Service Categories     7
Services              35
Service Prices        70

Each seeded service currently carries intentional NGN and USD pricing.

Seed Strategy

Seed data establishes canonical initial Rcentz system records.

It is not intended to become the permanent management interface.

INITIAL FOUNDATION
      ↓
SEED DATA
      ↓
DATABASE
      ↓
ADMIN CONTROL CENTER
      ↓
LONG-TERM MANAGEMENT

The future Admin system will manage services, projects and other business records directly through the database.

Migration History

The database foundation is represented by committed Prisma migration history covering:

Initial Rcentz schema

Subscriptions, billing and crypto architecture

Multi-currency service pricing

Verification

M04 passed:

pnpm db:format
pnpm db:validate
pnpm db:generate
pnpm typecheck
pnpm lint
pnpm db:seed
pnpm build

Verified:

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

Exit Criteria

PostgreSQL/Neon configured

Prisma configured

Foundational schema established

Migration history established

Database synchronized

Prisma Client generated and consumed

Better Auth persistence established

Official administrator seed established

Seed strategy established

Real project history seeded

Portfolio foundation seeded

Service categories seeded

Canonical service catalogue seeded

Multi-currency service pricing established

Seed execution verified

Idempotent seed behaviour verified

TypeScript verified

ESLint verified

Production build verified

Database architecture reviewed at foundation level

Milestone Result

Rcentz has a persistent system foundation capable of supporting its public, client and administrative application surfaces from one canonical data source.

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

M04 is complete.

9. M05 — Global Application Shell

Status: 🟢 Completed

Objective

Build the shared application structure used throughout Rcentz.

M05 establishes the persistent application shell that future public, client and administrative surfaces inhabit.

Implemented Architecture

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

Implemented Scope

Global shell

Header

Footer

Responsive navigation

Authentication-aware navigation

Theme system

Runtime theme switching

Theme-aware environmental layers

Loading state

Error boundary

Toast notification entry point

Shared UI foundation

Persistent application canvas

Navigation Contract

The global navigation reserves canonical public destinations even when a destination page belongs to a later milestone.

/                Home
/services        Services
/portfolio       Work / Portfolio
/store            Store / Commerce
/blog             Blog / Community
/about            About
/login            Sign in
/dashboard        Authenticated system

Primary acquisition action:

Start a project → /services

The route contract is part of the completed shell. Destination experiences are built when their own milestones become active.

Verification

M05 passed:

pnpm typecheck
pnpm lint
pnpm build

Verified:

TypeScript                         PASS
ESLint                             PASS
Next.js production build           PASS
Runtime light/dark theme switching PASS
Responsive navigation              REVIEWED

Git Evidence

Implementation Checkpoint

a7d9bdcd2097da87fc65c10e7db83df77c1d38ca

Closure Documentation

8cf27a4d558d9152cf6a79c03298d5e83445937d

Milestone Tag

m05-global-application-shell-v1

Exit Criteria

Global shell implemented

Header implemented

Footer implemented

Desktop navigation implemented

Mobile navigation implemented

Authentication-aware navigation implemented

Theme switching implemented

Loading state implemented

Error boundary implemented

Toast entry point established

Responsive shell reviewed

TypeScript verified

ESLint verified

Production build verified

Milestone closure documented

Milestone tag created

M05 is complete.

10. M06 — Database-Driven Public Homepage

Status: 🟢 Completed
Completed: 2026-09-02

Objective

Create the first complete public-facing Rcentz experience powered by the database while preserving the Rcentz visual system and application-shell architecture.

The homepage is intended to do more than describe Rcentz.

HERO
  ↓
UNDERSTAND RCENTZ

PUBLIC SECTIONS
  ↓
INVESTIGATE RCENTZ

DATABASE CONTENT
  ↓
VERIFY WHAT RCENTZ ACTUALLY BUILDS

Homepage Composition

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

app/page.tsx remains a server component and requests homepage data before composing the public sections.

The page uses:

export const revalidate = 300;

for periodic regeneration of database-backed homepage content.

Database Integration

The homepage data layer is implemented in:

features/home/server/get-homepage-data.ts

Featured Services

The homepage requests active featured services and includes:

Service identity

Slug

Short description

Service type

Category

Multi-currency pricing

Homepage limit:

6 featured services

Featured Portfolio Projects

The homepage requests published featured portfolio profiles connected to public projects.

The result includes:

Project identity

Project slug

Project description

Project type

Project status

Project progress

Portfolio tagline

Portfolio summary

Portfolio outcome

Live URL

Repository URL

Publication date

Technologies

Homepage limit:

4 featured projects

Decimal values are converted to serializable numbers and publication dates are converted to ISO strings before crossing into presentation components.

Hero Story System

The homepage Hero is an interactive visual product presentation rather than a conventional static marketing hero.

Final story sequence:

01 Rcentz
02 System
03 Live Data
04 Commerce
05 Rcentz Core

Story Architecture

HomeHero
  ↓
HeroStoryEngine
  ↓
Active Story
  ↓
Story Copy + Interactive Illustration

The story controller supports:

Previous story

Next story

Direct chapter selection

Timed story progression

Reduced-motion behaviour

Responsive chapter presentation

Primary Rcentz Story

The first story establishes:

We build websites that power business.

It combines:

Rcentz positioning

Rotating service highlights

Animated application/dashboard illustration

Performance visualization

Recent-order presentation

Top-pages presentation

Website preview

Code typing

System-status presentation

Mobile-specific reading context

Mobile and desktop actions

The perspective visual is implemented as multiple independent UI planes rather than one flattened dashboard.

Current perspective components include:

perspective/
├── PerspectiveSurface.tsx
├── PerformanceDashboard.tsx
├── RecentOrdersPanel.tsx
├── TopPagesPanel.tsx
├── WebsitePreviewPanel.tsx
├── CodeTypingPanel.tsx
├── SystemStatusDock.tsx
└── RcentzPerspectiveStage.tsx

Hero Motion Direction

The Hero uses:

motion/react

The motion language includes:

Soft story transitions

Staggered interface reveals

Animated charts

Animated metrics

Typing behaviour

Pulsing signals

Controlled floating perspective planes

Soft rolling service transitions

Responsive mobile compositions

Reduced-motion handling

Illustrative dashboard data is presentation data and is not presented as live production analytics.

Responsive Hero Direction

Desktop

LEFT
Narrative / positioning / service information

RIGHT
Interactive visual system

Mobile

Mobile uses the same story engine with a dedicated reading-first presentation:

Additional supporting context

Compact feature highlights

Mobile-visible CTA controls

Visual system pushed lower in the reading flow

Reduced layout density

Responsive chapter controls

Intended mobile sequence:

READ
  ↓
UNDERSTAND
  ↓
ACT
  ↓
SCROLL
  ↓
DISCOVER THE VISUAL SYSTEM

Homepage Navigation Contract

The Hero follows the canonical global navigation destinations.

View our work      → /portfolio
Explore services   → /services

The routes are defined now even though their destination experiences are implemented by later milestones.

Public Sections

Services

HomeServices consumes canonical service records supplied by getHomepageData().

The homepage service surface includes:

Category/type

Service name

Short description

Starting price

Featured-service database integration

Selected Work

HomeProjects consumes public featured portfolio records supplied by getHomepageData().

The homepage work surface includes:

Project type

Project status

Project name

Portfolio tagline

Technology tags

Project progress

Live project link where available

CTA

The homepage contains a final public conversion surface that sends users into canonical Rcentz destinations rather than introducing a duplicate business workflow.

Verification

The completed Hero/homepage checkpoint passed:

pnpm typecheck
pnpm lint
pnpm build

Verified:

TypeScript                  PASS
ESLint                      PASS
Prisma Client generation    PASS
Next.js production build    PASS

A PostgreSQL SSL-mode future-compatibility warning is emitted by the pg dependency during build. It does not block compilation and remains a production-hardening concern rather than an M06 blocker.

Git Evidence

Final Verified Hero Checkpoint

2f3cd847b7e734ed6c9ea3d574b6db955e5aa490

Commit Message

feat(home): enrich mobile hero storytelling

A later Hero button fix was also pushed after this checkpoint.

Exit Criteria

Homepage server composition established

Homepage feature boundary established

Database-backed featured services integrated

Database-backed featured projects integrated

Homepage revalidation strategy established

Responsive Hero architecture implemented

Interactive multi-story Hero implemented

Mobile Hero presentation implemented

Mobile CTA presentation implemented

Reduced-motion handling implemented

Hero visual checkpoint reviewed

TypeScript verified

ESLint verified

Production build verified

Homepage services surface established

Selected-work surface established

Homepage CTA surface established

Public navigation destinations defined

Hero actions point to canonical destination routes

Homepage milestone review completed

M06 milestone closure documented

Milestone Result

Rcentz now has a database-aware public homepage and a distinctive interactive Hero capable of explaining the platform through visual storytelling.

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

M06 is complete.

11. M07 — Portfolio Engine

Status: 🟡 In Progress
Started: 2026-09-02

Objective

Build the Rcentz portfolio as a real database-driven product engine.

The portfolio is owned by Rcentz and is not a direct rendering of GitHub, Vercel or another external platform.

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

Project remains the canonical project source.

PortfolioProfile remains the public presentation layer.

Existing Database Foundation

Portfolio records already support:

Tagline

Summary

Challenge

Solution

Outcome

Live URL

Repository URL

Featured status

Publication date

Projects already support:

Project type

Project status

Visibility

Progress

Technologies

Updates

Activities

Media

Comments

Reactions

Analytics

SEO metadata

M07 should build on this foundation rather than redesign the schema without demonstrated need.

Feature Boundary

M07 establishes:

features/
├── home/
└── portfolio/
    ├── components/
    └── server/

Presentation should not own Prisma access.

DATABASE
   ↓
PORTFOLIO SERVER LAYER
   ↓
PORTFOLIO ENGINE
   ↓
PUBLIC ROUTES

Canonical Routes

/portfolio
/portfolio/[slug]

The global navigation already treats /portfolio as the canonical Work destination.

Scope

Portfolio

Projects

Project types

Technologies

Project descriptions

Project status

Visibility

Featured projects

Live URLs

Repository URLs

Project media

Interactive Portfolio

Views

Reactions

Comments

Upvotes

Trending signals

Featured projects

Recently updated projects

Recently completed projects

Most discussed projects

Authentic Portfolio Principle

Existing projects such as:

AJ Logik

JobRcentz

should become authentic portfolio records.

Only real project information, screenshots, features, development history, results and metrics should be presented.

Fabricated projects should not be introduced simply to make the portfolio look larger.

First Implementation Target

features/portfolio/server/get-portfolio-projects.ts

The initial public query boundary should return only public, published portfolio records required by the listing experience.

Initial data requirements:

Project identity

Project slug

Project type

Project status

Project progress

Public visibility

Portfolio tagline

Portfolio summary

Portfolio outcome

Featured status

Publication date

Live URL

Repository URL

Technologies

Required media/presentation data

Exit Criteria

Portfolio feature boundary established

Public portfolio server query implemented

Public project visibility rules enforced

Published portfolio filtering enforced

/portfolio listing route implemented

/portfolio/[slug] canonical detail route implemented

Technologies rendered from database

Real project media/screenshots integrated

Featured project presentation established

Project status/progress presentation established

Live/repository links handled safely

Portfolio empty state implemented

Portfolio loading/error behaviour reviewed

Reactions foundation implemented or deliberately staged within M07

Comments foundation implemented or deliberately staged within M07

Analytics/view tracking integrated

Portfolio SEO metadata integrated

AJ Logik represented authentically

JobRcentz represented authentically

Desktop/mobile portfolio review completed

TypeScript verified

ESLint verified

Production build verified

M07 implementation checkpoint committed

M07 milestone closure documented

Current Implementation Target: features/portfolio/server/get-portfolio-projects.ts

12. M08 — Services Engine

Status: ⬜ Not Started

Objective

Create a database-driven services marketplace.

Scope

Services include:

Web development

SaaS development

UI/UX

Dashboards

E-commerce

API integration

Custom systems

Maintenance

Consulting

Related technical services

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

Exit Criteria

Service categories rendered from database

Service records rendered from database

Service listing page

Service detail pages

Slug routing

Service requests

Quote foundation

Request-to-project workflow defined

Responsive review

SEO metadata

TypeScript/lint/build verification

Milestone closure documented

13. M09 — Commerce Foundation

Status: ⬜ Not Started

Objective

Create a shared commerce foundation supporting both digital and physical products.

Digital Products

Examples:

Templates

UI kits

Code

Components

Design assets

Documents

Digital resources

Physical Products

Examples:

Mice

PCs

Batteries

Screens

Technology accessories

Canonical Public Route

/store

Additional product/category routes may be established during M09.

Scope

Product catalog

Product categories

Product media

Product variants

Inventory

Cart

Orders

Payments

Digital delivery

Physical fulfillment

Fulfillment Architecture

                    PRODUCT
                       │
             ┌─────────┴─────────┐
             ↓                   ↓
        DIGITAL PRODUCT     PHYSICAL PRODUCT
             │                   │
       DOWNLOAD DELIVERY    SHIPPING/FULFILLMENT

Exit Criteria

Product catalog

Categories

Product detail pages

Cart

Orders

Payment foundation

Digital delivery foundation

Physical fulfillment foundation

Responsive review

TypeScript/lint/build verification

14. M10 — Authentication & User System

Status: 🟡 In Progress

Objective

Establish identity and role-aware access throughout the platform.

User Roles

USER
CLIENT
STAFF
ADMIN
SUPER_ADMIN

Scope

Registration

Login

Logout

Sessions

Account management

Email verification

Role management

User status

Client profiles

Staff profiles

Authentication-aware navigation

Current Foundation

Better Auth + Prisma + PostgreSQL/Neon server persistence has been validated.

Better Auth account identity
        +
Prisma persistence
        +
Canonical User roles/status
        ↓
Protected Application Surfaces

The browser auth client is same-origin and deployment configuration is owned through the application auth environment configuration.

Auth UI Direction

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

Exit Criteria

Registration validated through Better Auth

Login validated through Better Auth

Session retrieval validated

Logout integrated into application UI

Email verification flow completed

Role-based authorization established at server boundaries

Client profile flow established

Staff profile flow established

Authentication-aware navigation foundation established

Protected application surfaces established

Production-safe auth configuration verified

15. M11 — Client Project Management

Status: ⬜ Not Started

Objective

Allow clients to interact with and track their projects.

Project Information

Projects may contain:

Project name

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

Progress System

Progress should be represented through:

Percentages

Progress bars

Milestone completion

Charts

Pie/donut visualizations where useful

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

Projects may also enter:

ON_HOLD

CANCELLED

Exit Criteria

Client project dashboard

Project overview

Milestones

Features

Tasks

Project updates

Activity history

Files/deliverables

Project progress visualization

Project analytics

Authorization review

Responsive review

16. M12 — Admin Control Center

Status: ⬜ Not Started

Objective

Build the central management system for Rcentz.

Admin Structure

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

Principle

Admin-managed data should drive:

Public website

Client experience

Internal management

The Admin system should replace long-term dependence on seed files for business management.

Exit Criteria

Admin authentication/authorization

Admin navigation

Dashboard overview

Project management

Client management

Service management

Portfolio management

Product management

Content management

Order management

Analytics access

Settings foundation

Audit/security review

17. M13 — Blog / Community Content Engine

Status: ⬜ Not Started

Objective

Build an interactive content platform around the Rcentz blog.

Canonical Route

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

Routing Principle

Blog articles should use real SEO-friendly route-based pages.

Example:

/blog/how-we-built-the-rcentz-system

The canonical article page should be a route-based page rather than a modal.

Preview cards may be used on listing pages.

Exit Criteria

Blog listing

Category pages

Tag support

Canonical article routes

Comments

Threaded replies

Reactions

Related content

SEO metadata

Responsive review

18. M14 — Messaging, Support & Notifications

Status: ⬜ Not Started

Objective

Create communication infrastructure between Rcentz, clients and users.

Messaging

Support:

Direct conversations

Project conversations

Support conversations

Service conversations

Order conversations

Group conversations

Support

Support:

Assistance requests

Support tickets

Ticket priorities

Ticket statuses

Staff assignment

Ticket messages

Attachments

Notifications

Support notifications for:

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

Notification preferences

Authorization review

19. M15 — Analytics Engine

Status: ⬜ Not Started

Objective

Make analytics a first-class system within Rcentz.

Project Analytics

Track:

Project views

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

Architecture

The system should allow integration with external analytics providers while leaving room for Rcentz-owned project intelligence.

Exit Criteria

Analytics sessions

Analytics events

Event tracking foundation

Project analytics

Portfolio analytics

Dashboard analytics

Conversion tracking foundation

Privacy/data review

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

Open Graph metadata

Social metadata

Search-friendly routes

Slugs

Internal linking

Related content

Performance

Indexability

Indexable Content

Priority pages include:

Projects

Services

Products

Blog articles

Categories

Other genuinely useful content

Principle

Do not create artificial SEO pages simply to increase page count.

Content must provide genuine value.

Exit Criteria

Metadata system

Canonical URLs

Sitemap

Robots configuration

Structured data

Open Graph

Search-friendly routes

Internal linking strategy

Performance review

21. M17 — Production Hardening

Status: ⬜ Not Started

Objective

Prepare the platform for real-world use.

Scope

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

Database / Connection Hardening

The PostgreSQL driver currently emits a future compatibility warning around SSL-mode interpretation.

Before production closure, connection-string SSL semantics should be explicitly reviewed and configured for the intended security behaviour.

Exit Criteria

Security review

Performance review

Error handling review

Database review

PostgreSQL SSL configuration reviewed

Production environment verified

Deployment verified

Monitoring/recovery strategy established

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
           WEB                    MOBILE
             │                       │
        Web Interface          Native Interface

Business logic and data structures should not unnecessarily depend on a specific UI implementation.

Future Considerations

Shared API/data contracts

Reusable business logic

Authentication compatibility

Mobile-friendly interaction patterns

Push notifications

Installable applications

PWA

Native application possibilities

Exit Criteria

This milestone does not need to be fully implemented during the initial web product.

It should primarily be protected through architectural decisions made earlier.

23. Cross-Cutting Systems

These systems should evolve alongside the major milestones rather than being treated as isolated final features.

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

Project updates should support visibility levels:

INTERNAL
CLIENT
PUBLIC

This allows the same project activity/update infrastructure to support:

Internal staff communication

Client project tracking

Public portfolio/project history

25. Data Ownership Principle

Rcentz should remain the owner of its business data and presentation.

External services may act as integrations or data sources.

Examples:

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

A milestone is not considered complete merely because the code exists.

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

Navigation/route contracts finalized where applicable

Documentation updated

Git changes reviewed

Implementation committed/pushed

No known blocking issue

Once formally closed, the milestone should remain closed unless a genuine defect or later architectural dependency requires a targeted correction.

27. Architectural Decision Log

Important architectural decisions should be recorded here as they are made.

Date

Decision

Reason

Status

2026-08-31

Use a modular monolith with explicit internal boundaries

Preserve maintainability and reuse without premature distributed-system complexity

Active

2026-08-31

PostgreSQL + Prisma are the persistent business-data source of truth

Public, client and admin surfaces must consume consistent underlying data

Active

2026-08-31

Use Better Auth with Prisma persistence for the authentication foundation

Establish reusable identity/session infrastructure before protected application surfaces

Active

2026-08-31

Authentication uses a dedicated application shell rather than the public Navbar

Keep auth focused and preserve clear application-surface boundaries

Active

2026-08-31

Create features/, components/ and server/ boundaries when real code requires them

Avoid empty-folder architecture while preserving documented responsibilities

Active

2026-09-02

Public Work destination is /portfolio

Preserve one canonical portfolio route across Navbar, Footer, Hero and M07

Active

2026-09-02

Public service destination is /services

Keep homepage acquisition and later Services Engine on one canonical route

Active

2026-09-02

Navigation may point to future routes before those pages are implemented

Completed shell milestones define route contracts; destination milestones implement the experiences

Active

2026-09-02

Homepage Hero is a five-story visual software presentation

Let visitors understand Rcentz through an interactive system rather than a conventional static hero

Active

2026-09-02

Homepage business content remains database-backed

Prevent duplicated hardcoded service/project truth across public surfaces

Active

28. Rejected Approaches

Rejected architectural approaches should be recorded rather than forgotten.

This prevents the project from repeatedly reconsidering decisions that have already been evaluated.

Date

Rejected Approach

Reason

Replacement

2026-08-31

Treat Rcentz as a conventional portfolio website

It would not operate the actual business or demonstrate the intended system capabilities

SaaS-like living business platform

2026-08-31

Premature microservices

Adds operational complexity before independent deployment/scaling is justified

Modular monolith with extractable boundaries

2026-08-31

UI-only authorization

Hidden UI does not protect server data or mutations

Server/business-layer authorization

2026-09-02

Temporary homepage-anchor routing for canonical Hero actions

It weakens the already-defined product route contract and creates avoidable rework

Route directly to canonical future destinations

2026-09-02

/work as a second portfolio route

Existing project architecture already defines /portfolio; two names would fragment navigation and SEO

/portfolio

29. Lessons Learned

Record important implementation lessons here.

Date

Lesson

Impact

2026-08-31

Living documentation can become stale within the same development day

Verify milestone status against code and tested behavior before planning the next module

2026-08-31

Framework-sensitive Next.js work must be checked against the installed version

Avoid relying on older App Router assumptions when Next.js behavior differs

2026-08-31

A validated local foundation is not automatically production-ready

Track temporary development configuration, security boundaries and deployment requirements explicitly

2026-09-02

A completed milestone must include its intended route/navigation contract, even if destination pages come later

Prevents reopening shell/homepage work when later route milestones begin

2026-09-02

Mobile storytelling needs different density rather than a shrunken desktop composition

Read-first copy, compact highlights and delayed visual discovery improved the Hero mobile flow

2026-09-02

Hero presentation components should be modular planes, not one giant flattened dashboard

Improves maintainability, animation control and responsive adaptation

30. Current Development State

Primary Active Milestone: M07 — Portfolio Engine

Supporting Active Foundations: M01 — Project Foundation; M02 — Architecture & Folder Conventions; M10 — Authentication & User System

Last Fully Completed Milestone: M06 — Database-Driven Public Homepage

Current Module: Portfolio Engine / Public Data Boundary

Current Target:

features/portfolio/server/get-portfolio-projects.ts

Current Objective: Establish the canonical server-side public portfolio query boundary using the existing Project → PortfolioProfile database architecture before implementing /portfolio presentation routes.

Known Production Gap: PostgreSQL SSL-mode future compatibility warning remains tracked for M17 Production Hardening.

Blocking Issues: None recorded.

31. Immediate Next Steps

The next development cycle should identify the smallest meaningful implementation unit.

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
        ↓
COMMIT / PUSH

For M07 the current sequence is:

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

Do not begin unrelated major work until the active milestone is complete enough to satisfy its Definition of Done.

32. Relationship to the Master Blueprint

The documents have different responsibilities.

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

Update the milestone.

Record the decision.

Record rejected approaches where useful.

Record lessons learned.

Update the current development state.

Ensure the Master Blueprint remains consistent with the implementation.

The documentation should describe the real state of Rcentz, not an idealized version of what the system was supposed to become.

A milestone closure should be treated as a durable checkpoint, not a temporary note that is silently reopened by later implementation work.

END OF DOCUMENT