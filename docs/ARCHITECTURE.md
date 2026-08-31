# RCENTZ SYSTEM

# SYSTEM ARCHITECTURE

**Document:** System Architecture & Engineering Conventions
**Version:** 1.0
**Status:** Active / Living Document

---

# 1. Purpose

This document defines the engineering architecture and structural conventions of the Rcentz System.

The **Master Blueprint** defines the product vision and major systems.

The **Development Milestones** define implementation progression.

This document defines how those systems should be represented in code.

The purpose is to ensure that Rcentz remains:

* Understandable
* Maintainable
* Testable
* Reusable
* Scalable
* Auditable
* Consistent

The architecture should support the current web application while preserving a path toward future applications.

---

# 2. Core Architectural Principle

Rcentz is a software system, not a collection of pages.

The preferred architectural flow is:

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
DATABASE
```

The reverse direction should be avoided:

```text
PAGE
 ↓
Random database query
 ↓
Business rules
 ↓
Duplicated logic
```

UI components should not become the primary location for business logic.

---

# 3. Source of Truth

PostgreSQL + Prisma form the primary persistent data foundation.

The database should be treated as the source of truth for business data that is shared across application surfaces.

```text
                    DATABASE
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       PUBLIC        CLIENT        ADMIN
          │            │            │
          └────────────┼────────────┘
                       ↓
                 FUTURE APPS
```

Business data should not be duplicated unnecessarily between:

* Pages
* Components
* Configuration files
* Client state
* Admin interfaces
* Public interfaces

Static configuration may remain in code where appropriate.

---

# 4. Application Surfaces

Rcentz contains several distinct application surfaces.

```text
RCENTZ SYSTEM
│
├── Public Web
│
├── Authentication
│
├── Client Application
│
├── Admin Application
│
└── Future Applications
```

Each surface may have a different UI shell while consuming shared underlying business capabilities.

---

# 5. Next.js Application Structure

The primary application structure is:

```text
app/
├── api/
├── ...
│
features/
│
components/
│
lib/
│
server/
│
data/
│
prisma/
│
public/
│
docs/
```

The exact structure may evolve.

Responsibilities must remain clear even when directories change.

---

# 6. `app/`

`app/` is responsible primarily for Next.js application routing and application surfaces.

It should contain:

* Routes
* Layouts
* Pages
* Loading states
* Error boundaries
* Route handlers
* Route-specific UI composition

The `app/` directory should not become the dumping ground for all business logic.

Conceptually:

```text
app/
   ↓
ROUTING + APPLICATION SURFACE
```

---

# 7. `features/`

`features/` contains reusable business-oriented feature modules.

Examples:

```text
features/
├── auth/
├── projects/
├── portfolio/
├── services/
├── commerce/
├── blog/
├── messaging/
├── notifications/
├── analytics/
└── support/
```

A feature may contain:

* Feature components
* Hooks
* Types
* Client interactions
* Feature-specific utilities
* Feature-specific presentation logic

Features should represent meaningful business capabilities rather than arbitrary UI fragments.

---

# 8. `components/`

`components/` contains reusable UI components that are not owned exclusively by one business feature.

Examples:

```text
components/
├── ui/
├── layout/
├── navigation/
├── forms/
└── shared/
```

A component belongs in `components/` when it can reasonably serve multiple application surfaces or features.

Feature-specific components should generally remain inside their feature.

---

# 9. `lib/`

`lib/` contains shared application infrastructure and integrations.

Examples include:

```text
lib/
├── auth.ts
├── auth-client.ts
├── prisma.ts
└── ...
```

`lib/` belongs at the **project root**, alongside `app/`, `features/`, `components/`, `server/`, and other top-level directories.

It is not part of the Next.js `app/` routing tree.

The principle is:

```text
lib/
 ↓
SHARED INFRASTRUCTURE
```

Examples:

* Authentication configuration
* Database client
* External service clients
* Shared infrastructure utilities

Business-domain logic should not automatically be placed in `lib/`.

---

# 10. `server/`

`server/` contains backend-oriented application logic where separation from the UI is useful.

Conceptually:

```text
server/
├── services/
├── repositories/
├── actions/
├── validators/
└── ...
```

The purpose is to prevent server-side business logic from becoming embedded inside pages and client components.

Server code may contain:

* Database operations
* Business rules
* Domain services
* Server actions
* Validation
* Authorization checks
* External service orchestration

---

# 11. Services

A service represents a focused business responsibility.

Examples:

```text
ProjectService
AuthService
PaymentService
NotificationService
PortfolioService
OrderService
```

Services should avoid becoming giant universal utility files.

Prefer:

```text
Small responsibility
        ↓
Clear interface
        ↓
Reusable capability
```

rather than:

```text
Everything
   ↓
One giant service
```

---

# 12. Repositories / Data Access

Database access should be separated from presentation wherever the complexity justifies it.

Conceptually:

```text
UI
 ↓
ENGINE / SERVICE
 ↓
REPOSITORY / DATA ACCESS
 ↓
PRISMA
 ↓
POSTGRESQL
```

A repository should focus on data access rather than presentation.

For example:

```text
ProjectRepository
```

may handle project persistence.

It should not decide how a project card is visually rendered.

---

# 13. Server Actions vs Route Handlers

Rcentz should use the appropriate server mechanism for the job.

## Server Actions

Prefer Server Actions when the operation is primarily an internal application mutation.

Examples:

* Create project
* Update profile
* Create service request
* Update project status
* Submit internal form

Conceptually:

```text
FORM
 ↓
SERVER ACTION
 ↓
BUSINESS LOGIC
 ↓
DATABASE
```

## Route Handlers

Prefer Route Handlers when an HTTP endpoint itself is required.

Examples:

* Authentication endpoints
* Webhooks
* External API endpoints
* Public API integrations
* Provider callbacks

Conceptually:

```text
HTTP REQUEST
 ↓
ROUTE HANDLER
 ↓
BUSINESS LOGIC
 ↓
DATABASE / PROVIDER
```

The goal is not to use one mechanism everywhere.

The mechanism should match the responsibility.

---

# 14. Authentication Architecture

Authentication is an infrastructure capability shared by application surfaces.

Current foundation:

```text
Better Auth
      ↓
Prisma Adapter
      ↓
PostgreSQL
```

Authentication should provide:

* Registration
* Login
* Logout
* Sessions
* Account management
* Email verification
* OAuth providers
* Role-aware identity

Authentication and authorization are related but distinct concerns.

---

# 15. Authentication UI Boundary

Authentication pages are a separate application experience.

They should **not render the global public Navbar**.

Conceptually:

```text
PUBLIC
└── Global Website Shell
    ├── Navbar
    ├── Page
    └── Footer


AUTH
└── Auth Shell
    ├── Branding
    └── Authentication Interface


CLIENT
└── Client Application Shell


ADMIN
└── Admin Application Shell
```

This prevents authentication screens from inheriting unnecessary public-site navigation.

---

# 16. UI Design Philosophy

Rcentz should maintain its own visual identity while drawing architectural and visual inspiration from high-quality software products.

The preferred direction is:

```text
Vercel
   +
Prisma
   +
Linear
   ↓
RCENTZ
```

This does not mean copying their interfaces.

It means borrowing useful design principles.

## Vercel-inspired principles

* Minimalism
* Strong typography
* Spacious layouts
* Restrained visual hierarchy
* Clean navigation
* Professional presentation

## Prisma-inspired principles

* Technical clarity
* Structured information
* Data-oriented interfaces
* Developer-tool quality
* Strong information hierarchy

## Linear-inspired principles

* Efficient application workflows
* Dense but readable interfaces
* Keyboard-friendly interaction
* Strong product hierarchy
* Focused application surfaces

Rcentz should combine these principles without becoming a clone of any product.

---

# 17. UI Direction by Application Surface

Different application surfaces may use different expressions of the same design system.

```text
PUBLIC WEBSITE
    ↓
Vercel-inspired
    │
    └── Marketing + Portfolio + Discovery


AUTHENTICATION
    ↓
Minimal Vercel-inspired
    │
    └── Focused authentication


CLIENT APPLICATION
    ↓
Vercel + Linear-inspired
    │
    └── Clean productivity interface


ADMIN / ENGINEERING
    ↓
Prisma + Linear-inspired
    │
    └── Data-rich management interface


TECHNICAL / DATA SURFACES
    ↓
Prisma-inspired
    │
    └── Structured technical interface
```

The underlying design tokens remain shared.

---

# 18. Design Tokens

Components should consume semantic design tokens.

Avoid hardcoding visual decisions throughout individual components.

Prefer:

```text
background
foreground
muted
border
primary
secondary
destructive
accent
```

rather than scattering raw color values across the application.

The theme system should support:

* Light mode
* Dark mode
* User-selectable theme colors
* Semantic tokens
* Consistent contrast

---

# 19. Responsive Architecture

Responsive behavior is part of the product architecture.

Desktop and mobile represent the same product expressed through different interaction densities.

```text
                    SAME SYSTEM
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
           DESKTOP                MOBILE
              │                     │
        Higher density        Focused density
        Rich navigation       Compact navigation
        Larger workspace      Activity-oriented UI
```

Components should not be designed exclusively for one viewport.

---

# 20. Data Flow

The preferred data flow is:

```text
DATABASE
   ↓
DATA ACCESS
   ↓
BUSINESS LOGIC
   ↓
ENGINE / FEATURE
   ↓
APPLICATION SURFACE
   ↓
UI
```

For mutations:

```text
USER ACTION
   ↓
SERVER ACTION / ROUTE
   ↓
AUTHORIZATION
   ↓
BUSINESS LOGIC
   ↓
DATA ACCESS
   ↓
DATABASE
   ↓
UPDATED UI
```

This keeps important rules on the server side.

---

# 21. Authorization

Authentication answers:

> Who is this user?

Authorization answers:

> What is this user allowed to do?

Rcentz authorization should eventually account for:

```text
USER
CLIENT
STAFF
ADMIN
SUPER_ADMIN
```

Authorization checks should be enforced at the server/business layer.

UI visibility alone must never be treated as sufficient authorization.

---

# 22. Security Boundary

Security-sensitive business rules should live on trusted server-side boundaries.

Examples:

* Permission checks
* Payment validation
* Ownership validation
* Administrative operations
* Project access
* Order operations
* Sensitive database mutations

The client may provide a convenient interface, but the server must remain authoritative.

---

# 23. Error Handling

Errors should be handled intentionally at multiple levels.

```text
DATABASE / PROVIDER ERROR
          ↓
BUSINESS LOGIC
          ↓
APPLICATION ERROR
          ↓
USER-FACING ERROR
```

Internal technical details should not unnecessarily leak into public responses.

Errors should be:

* Meaningful
* Actionable
* Logged where appropriate
* Safe for the intended audience

---

# 24. Validation

Validation should occur at appropriate boundaries.

Important input should not be trusted simply because TypeScript defines a type.

Conceptually:

```text
INPUT
 ↓
VALIDATION
 ↓
AUTHORIZATION
 ↓
BUSINESS LOGIC
 ↓
DATABASE
```

Types provide developer guarantees.

Runtime validation provides application guarantees.

Both are necessary.

---

# 25. Engine Architecture

Rcentz follows the principle:

> **Everything is an Engine.**

Examples:

```text
Authentication Engine
Project Management Engine
Portfolio Engine
Services Engine
Commerce Engine
Content Engine
Messaging Engine
Notification Engine
Analytics Engine
Media Engine
SEO Engine
```

An engine represents a meaningful business capability.

Pages should primarily compose engines.

---

# 26. Provider Architecture

Where practical, engines should consume provider abstractions rather than tightly coupling themselves to individual infrastructure implementations.

Conceptually:

```text
PROVIDER
   ↓
BUSINESS / DATA LAYER
   ↓
ENGINE
   ↓
APPLICATION
   ↓
UI
```

This allows infrastructure to change without requiring unnecessary rewrites of application surfaces.

Examples may eventually include:

* Payment providers
* Storage providers
* Email providers
* Analytics providers
* Authentication providers
* Search providers

---

# 27. External Integrations

External services should be treated as integrations rather than sources of truth unless explicitly designed otherwise.

Examples:

```text
GitHub
Vercel
Paystack
Cloud Storage
Analytics Providers
OAuth Providers
```

The Rcentz database should retain ownership of business information that belongs to Rcentz.

External platforms may provide supplementary data or integrations.

---

# 28. Naming Conventions

Names should communicate responsibility.

Prefer:

```text
ProjectService
ProjectRepository
ProjectCard
ProjectDashboard
ProjectDetails
ProjectActions
```

Avoid vague names such as:

```text
Utils
Stuff
Helpers2
Manager
Thing
Misc
```

unless their responsibility is genuinely broad and obvious.

---

# 29. Component Responsibility

A component should have a clear reason to exist.

Prefer:

```text
ProjectCard
```

over a generic component containing dozens of unrelated conditional branches.

Components should generally follow:

```text
INPUT
 ↓
PRESENTATION
 ↓
USER INTERACTION
```

Complex business rules should move toward the appropriate feature/server layer.

---

# 30. State Management

State should live at the narrowest reasonable scope.

Prefer:

```text
Local UI state
    ↓
Feature state
    ↓
Application state
    ↓
Server/database state
```

Do not introduce global state simply because a value is shared by two components.

Server state and persistent business data should remain authoritative on the server/database.

---

# 31. Caching & Revalidation

Caching should be introduced according to data behavior.

Potential categories include:

```text
STATIC DATA
   ↓
Long-lived cache


PUBLIC CONTENT
   ↓
Revalidated cache


USER-SPECIFIC DATA
   ↓
Request/session-aware


REAL-TIME DATA
   ↓
Dynamic communication
```

Caching must not compromise correctness for sensitive or user-specific data.

---

# 32. Database Changes

Database changes should follow a controlled workflow.

```text
CHANGE SCHEMA
      ↓
FORMAT
      ↓
VALIDATE
      ↓
CREATE MIGRATION
      ↓
APPLY MIGRATION
      ↓
GENERATE CLIENT
      ↓
TYPECHECK
      ↓
TEST
      ↓
COMMIT
```

Production database changes should never rely on manually editing database structures without a corresponding migration strategy.

---

# 33. Development Workflow

Rcentz development follows:

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
COMMIT
  ↓
PUSH
  ↓
NEXT MODULE
```

The objective is deliberate engineering rather than uncontrolled code generation.

---

# 34. Git Discipline

Each meaningful milestone should produce a clean repository state.

Before committing:

```text
git status
```

Then:

```text
typecheck
lint
tests where applicable
```

Then commit with a meaningful conventional-style message.

Examples:

```text
feat(auth): establish authentication foundation
feat(projects): add project management engine
fix(auth): resolve session handling issue
refactor(server): separate project data access
docs(architecture): document server boundaries
```

The repository should remain a trustworthy representation of the current system.

---

# 35. Documentation Discipline

Important architectural decisions should be documented.

The primary documentation hierarchy is:

```text
MASTER-BLUEPRINT.md
        │
        ├── Product vision
        ├── System capabilities
        └── Long-term direction
                 │
                 ↓
ARCHITECTURE.md
        │
        ├── Code organization
        ├── Engineering rules
        ├── Data flow
        └── Responsibility boundaries
                 │
                 ↓
MILESTONES.md
        │
        ├── Implementation order
        ├── Current progress
        └── Exit criteria
```

Documentation should evolve alongside the codebase.

---

# 36. Current Authentication Foundation

The current authentication architecture is:

```text
Next.js
   │
   ↓
Better Auth
   │
   ↓
Prisma Adapter
   │
   ↓
Prisma Client
   │
   ↓
PostgreSQL / Neon
```

The authentication API is exposed through:

```text
app/api/auth/[...all]/route.ts
```

The shared authentication infrastructure lives under:

```text
lib/auth.ts
lib/auth-client.ts
lib/prisma.ts
```

Authentication has already been validated through:

* Registration
* Login
* Session retrieval
* Prisma persistence
* TypeScript compilation

The next authentication phase is client-side integration.

---

# 37. Client Authentication Boundary

The client authentication implementation should progress through:

```text
Auth Client
   ↓
Session State
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

Authentication pages should remain independent of the global public Navbar.

---

# 38. Future Application Readiness

The architecture should avoid placing critical business rules exclusively inside Next.js UI components.

Future applications may consume the same business capabilities.

Conceptually:

```text
                 RCENTZ BUSINESS LAYER
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
            WEB                    MOBILE
             │                       │
       Web Interface          Native Interface
```

The objective is not to prematurely build a separate microservice architecture.

The objective is to maintain clean boundaries so extraction becomes possible when it is actually justified.

---

# 39. Microservices Philosophy

Rcentz should **not prematurely become a collection of microservices**.

The preferred initial architecture is a well-structured application with clear internal boundaries.

```text
MODULAR MONOLITH
      ↓
Clear domains
      ↓
Clear services
      ↓
Clear data access
      ↓
Clear APIs
      ↓
Extract only when justified
```

If a system eventually requires independent deployment, scaling or ownership, an internal boundary should make extraction possible.

---

# 40. Architecture Decision Rule

When deciding where new code belongs, ask:

### 1. Is it routing?

→ `app/`

### 2. Is it reusable business functionality?

→ `features/`

### 3. Is it shared UI?

→ `components/`

### 4. Is it shared infrastructure?

→ `lib/`

### 5. Is it server-side business/data logic?

→ `server/`

### 6. Is it persistent business data?

→ `Prisma/PostgreSQL`

### 7. Is it static configuration?

→ appropriate configuration/data location

The goal is not rigid folder worship.

The goal is **clear responsibility**.

---

# 41. Final Architecture Principle

Rcentz should remain understandable as it grows.

The system should make it possible for a developer to answer:

```text
Where does this route live?

Where does this feature live?

Where does this business rule live?

Where does this database operation live?

Where does authorization happen?

Where does this provider integration live?

Where does this reusable UI component live?

Where is the source of truth?
```

If those questions become difficult to answer, the architecture needs attention.

The ultimate principle is:

> **Make complexity visible, structured and intentional.**

Rcentz should grow into a sophisticated system without becoming a chaotic one.
