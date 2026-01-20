# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run lint         # Run ESLint
npm start            # Production server
```

**Pre-commit checks:** Always run `npm run lint && npm run build` before committing.

## Stack

- **Framework**: Next.js 15.2.4 (App Router) + React 19 + TypeScript
- **Database**: Supabase (PostgreSQL with SSR cookie management)
- **Styling**: Tailwind CSS + shadcn/ui + Radix UI primitives
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend (newsletter confirmations - integration pending)

## Architecture

### Route Groups & Layouts

The app uses a `(public)` route group containing all marketing pages. This pattern allows:
- Shared Header/Footer layout for public pages
- Future protected routes at root level without layout interference
- Clean separation of concerns

### Supabase Dual-Client Pattern

**Critical**: This codebase uses separate Supabase clients for browser and server contexts:

- `lib/supabase/client.ts`: Browser client for Client Components
- `lib/supabase/server.ts`: Server client with cookie management for Server Components and API Routes

**Why this matters**: Always import the correct client:
- Server Components/API Routes → `createClient()` from `lib/supabase/server.ts`
- Client Components → `createClient()` from `lib/supabase/client.ts`
- The server client handles cookies via `next/headers` for session persistence

### Database Schema

Tables (defined in `lib/supabase/types.ts`):
- `articles`: Blog posts with slug-based routing
- `resources`: Filterable by type (guide/skill/template/prompt) and parcours track
- `formations`: Training courses with JSONB modules array
- `events`: Events with event_date, location, type (meetup/webinar/workshop/conference)
- `subscribers`: Newsletter with parcours array (`["dev", "pm", "designer", "ops"]`)
- `partners`: Partner organizations

### Component Organization

```
components/
├── ui/              # shadcn components - regenerated from CLI, avoid manual edits
├── forms/           # Custom forms (e.g., NewsletterForm with React Hook Form)
├── layout/          # Header, Footer (Client Components with "use client")
├── hero/            # Hero section variants
├── blog/            # ArticleCard, BlogList
├── events/          # EventCard, EventList
└── resources/       # ResourceCard with difficulty badges
```

### Data Fetching Patterns

**Server Components** (default):
- Async data fetching directly in components
- Use server Supabase client
- Static metadata exports for SEO

**Client Components**:
- Use `"use client"` directive
- React Hook Form for form state
- POST to `/api/*` routes for mutations

**Example flow** (Newsletter subscription):
```
Client Component (NewsletterForm)
  → Validation (Zod schema)
  → POST /api/newsletter
  → API Route validates + inserts via server client
  → Handles unique constraint (23505) for duplicate emails
  → Returns success/error to client
```

### Validation Strategy

All user input validation uses Zod schemas in `lib/validations/`:
- Define schema once
- Use `zodResolver` in React Hook Form
- Re-validate in API routes for security
- Type inference via `z.infer<typeof schema>`

### Locale & Formatting

- **Language**: French UI copy and error messages, English code
- **Dates**: Use `formatDate()` and `formatEventDate()` utilities with French locale (`date-fns`)
- **Conventions**: French for user-facing content, English for variables/functions

### Image Optimization

`next.config.ts` configures remote patterns for:
- Supabase CDN (`*.supabase.co`)
- YouTube thumbnails
- Unsplash images

Use Next.js `<Image>` component with `priority` for above-fold images.

## Styling Conventions

- **Tailwind only**: No CSS modules or styled-components
- **Class merging**: Use `cn()` utility from `lib/utils.ts` for conditional classes
- **Dark mode**: Enabled by default with HSL CSS variables
- **Fonts**: Mode VF (headings), Capriola (display), loaded via `next/font/google` and `next/font/local`

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```

## Commit Conventions

Use Conventional Commits format:
```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Scopes: blog, events, resources, formations, ui, api, newsletter
```

Examples:
- `feat(blog): add article sharing buttons`
- `fix(events): correct date formatting for past events`
- `refactor(api): improve error handling in newsletter route`
