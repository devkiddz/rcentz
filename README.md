# Rcentz Systems

Rcentz Systems is a production-focused business and software platform built with Next.js, TypeScript, Prisma, PostgreSQL, and Better Auth.

It is not a conventional portfolio site. The platform is designed to operate real Rcentz business workflows while publicly demonstrating the engineering behind them.

## Product surfaces

- Public website and live portfolio
- Services and service requests
- Client project management
- Commerce for digital and physical products
- Content and community
- Messaging, support, and notifications
- Analytics
- Admin and internal management

## Architecture

Rcentz is intentionally structured as a modular monolith.

```text
User
  ↓
Application surface
  ↓
Feature / engine
  ↓
Business logic
  ↓
Data access
  ↓
PostgreSQL
```

The database is the canonical source for business data shared across public, client, and administrative surfaces.

### Canonical project model

A project exists once in the database.

```text
Project
  ├── Internal management
  ├── Client tracking
  └── PortfolioProfile? → public presentation
```

This prevents the public portfolio and project-management system from maintaining conflicting copies of the same project.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma ORM 7
- PostgreSQL / Neon
- Better Auth
- pnpm

## Local setup

1. Install dependencies.

```bash
pnpm install
```

2. Create `.env` from `.env.example` and provide a PostgreSQL connection plus Better Auth secret.

3. Validate and generate Prisma.

```bash
pnpm db:format
pnpm db:validate
pnpm db:generate
```

4. Apply development migrations.

```bash
pnpm db:migrate
```

5. Start the application.

```bash
pnpm dev
```

## Quality checks

Before committing meaningful work:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Documentation

- `docs/MASTER-BLUEPRINT.md` — product direction
- `docs/ARCHITECTURE.md` — engineering conventions
- `docs/MILESTONES.md` — implementation progress

Rcentz is developed deliberately, one auditable module at a time.
