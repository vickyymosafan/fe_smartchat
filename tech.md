# Tech Stack & Build System

## Backend

### Core Technologies
- **Runtime**: Node.js 20+
- **Framework**: Express.js 5
- **Language**: TypeScript 5 (strict mode enabled)
- **Database**: PostgreSQL with Prisma ORM 6.19
- **Deployment**: Vercel Serverless Functions

### Key Libraries
- **Validation**: Zod 3.22 for schema validation
- **HTTP Client**: Axios with retry logic
- **Security**: Helmet, CORS, express-rate-limit
- **Logging**: Morgan for HTTP request logging
- **Environment**: dotenv for configuration

### Architecture Pattern
- **Clean Architecture** with clear layer separation:
  - Presentation Layer (Routes, Controllers, Middlewares)
  - Application Layer (Services, Schemas)
  - Domain Layer (Core Interfaces)
  - Infrastructure Layer (HTTP Client, Logger, Config)
- **SOLID Principles** enforced throughout codebase
- **Repository Pattern** for database access

### Common Commands
```bash
# Development
npm run dev                    # Start dev server with nodemon + ts-node

# Build & Deploy
npm run build                  # Generate Prisma client + compile TypeScript
npm start                      # Run production build
npm run vercel-build          # Vercel build command

# Database
npm run prisma:generate        # Generate Prisma client (no engine)
npm run prisma:migrate         # Run migrations in dev
npm run prisma:migrate:deploy  # Deploy migrations to production
npm run prisma:studio          # Open Prisma Studio GUI
npm run db:push                # Push schema changes without migration
npm run db:reset               # Reset database and run seeds
```

## Frontend

### Core Technologies
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5 (strict mode enabled)
- **Styling**: Tailwind CSS 4 with PostCSS
- **Deployment**: Vercel

### Key Libraries
- **UI Components**: Radix UI primitives (accessible, unstyled)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Markdown**: react-markdown for message rendering
- **Syntax Highlighting**: react-syntax-highlighter
- **Animations**: Framer Motion
- **PWA**: @ducanh2912/next-pwa
- **Utilities**: clsx, tailwind-merge, class-variance-authority

### Design System
- **Font**: Geist (via next/font)
- **Component Library**: Custom components built on Radix UI
- **Styling Approach**: Utility-first with Tailwind CSS
- **Responsive Breakpoints**: xs(375px), sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)

### Common Commands
```bash
# Development
npm run dev                    # Start Next.js dev server (port 3000)

# Build & Deploy
npm run build                  # Build for production (with webpack flag)
npm start                      # Start production server
npm run lint                   # Run ESLint
npm run generate-icons         # Generate PWA icons
```

## TypeScript Configuration

### Backend (tsconfig.json)
- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Enabled with all strict checks
- **Output**: ./dist directory
- **Source Maps**: Enabled for debugging
- **Unused Code Detection**: Enabled (noUnusedLocals, noUnusedParameters)

### Frontend (tsconfig.json)
- **Target**: ES2017
- **Module**: ESNext with bundler resolution
- **JSX**: react-jsx
- **Path Aliases**: @/* maps to project root
- **Strict Mode**: Enabled
- **Incremental Builds**: Enabled

## Environment Variables

### Backend Required
- `DATABASE_URL` - PostgreSQL connection string (Prisma Accelerate)
- `DIRECT_URL` - Direct PostgreSQL connection for migrations
- `N8N_WEBHOOK_URL` - n8n webhook endpoint for AI processing
- `FRONTEND_ORIGINS` - Comma-separated allowed CORS origins

### Frontend Required
- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL (must have NEXT_PUBLIC_ prefix)

## Code Style & Conventions

- **Language**: All comments, error messages, and UI text in Bahasa Indonesia
- **Naming**: camelCase for variables/functions, PascalCase for classes/components
- **File Structure**: One component/service per file
- **Imports**: Absolute imports preferred using path aliases
- **Error Handling**: Centralized error handler with standardized response format
- **Validation**: Zod schemas for all API inputs
- **Type Safety**: No `any` types, strict TypeScript throughout
