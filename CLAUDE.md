# Wann Kicken? - Football/Soccer Scheduling App

A full-stack web application for scheduling football/soccer games with participants. Users can indicate their availability for each day of the week.

## Project Overview

**German-language app**: "Wann kicken?" means "When to play football?" in German

This is a monorepo with two main services:
- **Backend** (`survey/`): NestJS REST API with scheduled cleanup tasks
- **Frontend** (`party-planner-pp/`): React SPA with Material-UI

## Architecture

### Backend Structure
```
survey/
├── src/
│   ├── app.module.ts         # Main module with scheduling
│   ├── app.controller.ts     # REST endpoints (GET, POST, PUT)
│   ├── app.service.ts        # Business logic & data management
│   ├── survey.ts             # Type definitions & validators
│   ├── repository.ts         # Data persistence layer
│   ├── tasks.module.ts       # Scheduled tasks module
│   ├── clean-up.task.ts      # Weekly cleanup task (Sundays)
│   └── main.ts               # Application entry point
└── test/                     # E2E tests
```

### Frontend Structure
```
party-planner-pp/
├── src/
│   ├── App.tsx                    # Main component
│   ├── store.ts                   # Redux store configuration
│   ├── survey/
│   │   ├── survey-participants.tsx   # Main survey component
│   │   ├── reducer.ts                # Survey Redux reducer
│   │   ├── service.ts                # API service
│   │   ├── transform-rows-to-columns.tsx
│   │   └── style.module.scss         # Component styles
│   ├── error/
│   │   ├── notification.tsx          # Error notification UI
│   │   └── reducer.ts                # Error Redux reducer
│   └── api/
│       └── index.ts                  # HTTP client setup
```

## Development Workflow

### Running the Application

**All services (from root):**
```bash
make run
```

**Backend only:**
```bash
cd survey
make run        # Sets CLEAN_UP_CRON_TIMING and starts in watch mode
```

**Frontend only:**
```bash
cd party-planner-pp
make run        # npm run dev - Vite dev server
```

### Building

**Both services:**
```bash
cd survey && make build
cd ../party-planner-pp && make build
```

Each service uses `../infra/scripts/build.sh` for consistent builds.

### Testing

**Backend:**
```bash
cd survey
npm run test         # Unit tests
npm run test:e2e     # End-to-end tests
npm run test:cov     # Coverage reports
```

**Frontend:**
```bash
cd party-planner-pp
npm run test         # React Testing Library
```

## Data Model

### Survey Entry
```typescript
interface Entry {
    name: string           // Participant name (must be unique)
    weekdays: {
        monday: boolean
        tuesday: boolean
        wednesday: boolean
        thursday: boolean
        friday: boolean
        saturday: boolean
        sunday: boolean
    }
}
```

### API Endpoints

- `GET /` - Get all survey entries
- `POST /` - Add new entry (requires unique name)
- `PUT /` - Update existing entry

## Code Conventions

### TypeScript
- Use interfaces for public API types
- Use classes for entities with validation (backend)
- Enums for fixed values (Weekdays)
- Strict type checking enabled

### Backend (NestJS)
- Class-validator for request validation
- Custom decorators for cross-field validation
- Scheduled tasks using @nestjs/schedule
- Repository pattern for data access

### Frontend (React)
- Functional components with hooks
- Redux Toolkit for state management
- CSS Modules with SCSS for styling
- Material-UI component library
- Lodash for utility functions

### File Naming
- TypeScript: `.ts` for code, `.tsx` for React components
- Styles: `.module.scss` with corresponding `.d.ts` type definitions
- Tests: `.spec.ts` for unit tests, `.e2e-spec.ts` for E2E tests
- Keep test files next to source files

## Known Issues

### Backend Type Def Bug
In `survey/src/survey.ts`:
- Typo: `Weekdays.'wedneyday'` should be `Weekdays.'wednesday'`
- Frontend uses correct spelling (`wednesday`)
- Update backend to match frontend when making changes

### Root Makefile Typo
In root `makefile`:
- Typo: `survery` should be `survey`
- Affects backend startup in `make run`

## Environment Variables

### Backend
- `CLEAN_UP_CRON_TIMING`: Cron expression for cleanup task (default: `0 0 * * SUN`)
- Set in `survey/makefile` for local development

## Deployment

### Backend (Heroku)
- Uses `Procfile` for process management
- `heroku-postbuild` script runs production build
- Includes security headers via Helmet

### Frontend
- Vite production build
- Can be deployed to static hosting or via Docker
- Docker Compose configuration available

## Adding Features

1. **New API endpoints**: Add to `app.controller.ts`, implement in `app.service.ts`
2. **New frontend components**: Create in appropriate directory, use CSS Modules
3. **State updates**: Update Redux reducers in respective `reducer.ts` files
4. **Scheduled tasks**: Add to `tasks.module.ts` with `@Cron()` decorator
5. **Validation**: Add class-validator decorators to DTO classes in `survey.ts`

## Security

- Backend uses Helmet for security headers
- CORS configuration needed for frontend-backend communication
- Input validation on all API endpoints
- Consider adding authentication for production use
