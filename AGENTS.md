# AGENTS.md - WebsiteMerckinator

## Project Overview

An Angular SSR (Server-Side Rendering) project that fetches and displays news articles using the GNews API. The API is proxied through Railway to handle free-tier limitations.

## Task Tracking

**All agents MUST use Beads (`bd`) for task tracking.** Do not use markdown TODO lists, comments, or other task management systems. See the Beads Issue Tracker section below for details.

## Tech Stack

- **Framework**: Angular 20.3 with SSR (@angular/ssr)
- **Node**: >= 24.0.0
- **UI Library**: PrimeNG 20.3 + PrimeUX Themes (Aura theme)
- **State Management**: Angular Signals
- **Build Tool**: Angular CLI
- **Testing**: Karma + Jasmine
- **Hosting**: Railway
- **API**: GNews API (via Railway proxy)
- **Formatting**: Prettier (100 char width, single quotes, angular HTML parser)

## Project Structure

```
src/
├── app/
│   ├── app.component.ts          # Root component
│   ├── app.config.ts             # App configuration (SSR-enabled)
│   ├── app.routes.ts             # Route definitions
│   ├── pages/
│   │   ├── news/
│   │   │   ├── news.ts           # News page component
│   │   │   ├── article/          # Article detail page
│   │   │   ├── services/
│   │   │   │   └── gnews.ts      # GNews API service
│   │   │   └── types/            # TypeScript interfaces for API responses
│   │   └── welcome/              # Welcome page component
│   └── app.config.server.ts      # SSR-specific config
├── server.ts                     # Express server for SSR
└── main.server.ts                # SSR bootstrap
```

## Key Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start production SSR server (from dist/) |
| `npm run start:dev` | Start local dev server (http://localhost:4200) |
| `npm run build` | Build for production |
| `ng test` | Run unit tests with Karma |

## Architecture Notes

### Routing
- Routes are defined in `app.routes.ts`
- SSR rendering modes configured in `app.routes.server.ts`:
  - `/` - Prerendered (static HTML)
  - `/news` - Client-side rendered (dynamic content)
  - `**` - Prerendered
- Main routes: `/` (welcome), `/news` (news feed), `/news/:title` (article detail)

### GNews API Integration
- API calls go through a Railway proxy function
- Service location: `src/app/pages/news/services/gnews.ts`
- Uses Angular Signals for loading state (`_loading` signal)
- Returns Observable with automatic loading state cleanup via `finalize` operator
- Types for API responses: `src/app/pages/news/types/`

### SSR Considerations
- App is configured for server-side rendering with Express
- Use `isPlatformBrowser` check when accessing browser-only APIs
- `TransferState` can be used to hydrate server-fetched data on client
- PrimeNG animations require `provideAnimationsAsync()` and `providePrimeNG()` in config

## Code Style

- Use TypeScript strict mode
- Prefer standalone components
- Follow Angular conventions for file naming: `name.type.ts` (e.g., `news.ts`, `gnews.spec.ts`)
- Components colocate templates/styles when possible
- Use Prettier for formatting (config in package.json)
- Prefer Angular Signals for local state

## Testing

- Unit tests use Jasmine/Karma
- Test files follow naming: `*.spec.ts`
- Run tests with `ng test`

## Common Tasks

### Adding a new page
1. Create component in `src/app/pages/<feature>/`
2. Add route in `app.routes.ts`
3. Add SSR render mode in `app.routes.server.ts` if needed
4. Import and add to route array

### Modifying API endpoints
1. Update service in `src/app/pages/news/services/gnews.ts`
2. Update corresponding types if needed
3. Railway proxy function may need updates (external)

### Adding UI components (PrimeNG)
1. Import the module (e.g., `ProgressSpinnerModule`)
2. Add to component's `imports` array
3. Use in template (e.g., `<p-progressSpinner />`)

### Working with Signals
```typescript
// Signal declaration
private _loading = signal(false);
loading = this._loading.asReadonly();

// Updating state
this._loading.set(true);

// Reading in template
@if (gNews.loading()) { ... }
```

### Working with SSR
- Browser-only code must be guarded with `PLATFORM_ID` and `isPlatformBrowser`
- Check `app.config.server.ts` for server-specific providers

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
