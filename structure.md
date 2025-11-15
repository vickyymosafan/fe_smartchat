# Project Structure

## Monorepo Organization

This is a monorepo with two main applications:

```
root/
├── backend/          # Express.js API server
├── frontend/         # Next.js web application
└── .kiro/           # Kiro IDE configuration
```

## Backend Structure

```
backend/
├── src/
│   ├── config/           # Environment configuration (env.ts)
│   ├── core/             # Domain layer - interfaces and abstractions
│   │   └── http/         # HTTP client interfaces
│   ├── infra/            # Infrastructure layer - external dependencies
│   │   ├── db/           # Database client (Prisma)
│   │   ├── http/         # HTTP client implementation (Axios)
│   │   └── log/          # Logger implementation
│   ├── middlewares/      # Express middlewares
│   │   ├── cors.ts       # CORS configuration
│   │   ├── errorHandler.ts  # Centralized error handling
│   │   └── rateLimit.ts  # Rate limiting
│   ├── routes/           # API route definitions
│   │   ├── chatRoutes.ts
│   │   ├── chatHistoryRoutes.ts
│   │   └── dashboardRoutes.ts
│   ├── controllers/      # Request/response handling
│   │   ├── ChatController.ts
│   │   ├── ChatHistoryController.ts
│   │   └── DashboardController.ts
│   ├── services/         # Business logic layer
│   │   ├── ChatService.ts
│   │   ├── ChatHistoryService.ts
│   │   └── SessionService.ts
│   ├── repositories/     # Data access layer
│   │   ├── ChatHistoryRepository.ts
│   │   ├── MessageRepository.ts
│   │   └── SessionRepository.ts
│   ├── schemas/          # Zod validation schemas
│   │   └── chatSchemas.ts
│   ├── utils/            # Utility functions
│   │   ├── responseUtils.ts
│   │   └── sessionUtils.ts
│   ├── server/           # Express app setup
│   │   ├── app.ts        # Express app configuration
│   │   └── bootstrap.ts  # Server initialization
│   └── generated/        # Generated code (Prisma client)
│       └── prisma/
├── api/                  # Vercel serverless handler
│   └── index.ts
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Prisma schema definition
│   ├── migrations/       # Database migrations
│   └── seed.ts           # Database seeding
├── dist/                 # Compiled JavaScript (gitignored)
├── .env                  # Environment variables (gitignored)
├── .env.example          # Environment template
├── package.json
├── tsconfig.json
└── vercel.json           # Vercel deployment config
```

### Backend Layer Responsibilities

- **config/**: Load and validate environment variables
- **core/**: Define interfaces and contracts (dependency inversion)
- **infra/**: Implement external dependencies (database, HTTP, logging)
- **middlewares/**: Handle cross-cutting concerns (CORS, errors, rate limiting)
- **routes/**: Define API endpoints and map to controllers
- **controllers/**: Handle HTTP requests/responses, call services
- **services/**: Implement business logic, orchestrate repositories
- **repositories/**: Abstract database operations, use Prisma client
- **schemas/**: Define and validate request/response schemas with Zod
- **utils/**: Shared utility functions
- **server/**: Bootstrap Express application

## Frontend Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with font and metadata
│   ├── page.tsx             # Main chat page
│   ├── globals.css          # Global styles and Tailwind directives
│   └── favicon.ico
├── components/               # React components
│   ├── chatbot-interface.tsx    # Main chat UI with sidebar
│   ├── chat-header.tsx          # Header with actions
│   ├── chat-input.tsx           # Message input with auto-expand
│   ├── chat-message.tsx         # Message bubble component
│   ├── sidebar.tsx              # Collapsible history sidebar
│   ├── history-item.tsx         # Single history entry
│   ├── splash-screen.tsx        # Loading screen
│   ├── pwa-install-prompt.tsx   # PWA installation UI
│   ├── service-worker-register.tsx  # SW registration
│   ├── markdown/                # Markdown rendering components
│   │   ├── markdown-renderer.tsx
│   │   ├── markdown-content.tsx
│   │   ├── formatted-text.tsx
│   │   └── parsed-text.tsx
│   └── ui/                      # Reusable UI primitives
│       ├── button.tsx
│       ├── textarea.tsx
│       ├── dialog.tsx
│       └── modal-wrapper.tsx
├── hooks/                    # Custom React hooks
│   ├── useChat.ts           # Chat state and message handling
│   ├── useChatHistory.ts    # History CRUD operations
│   ├── useAutoScroll.ts     # Auto-scroll to bottom
│   └── useAuth.ts           # Authentication state (if applicable)
├── lib/                      # Utility libraries and services
│   ├── api.ts               # Chat API client
│   ├── api-config.ts        # API configuration
│   ├── auth-api.ts          # Authentication API
│   ├── chat-history-api.ts  # Chat history API
│   ├── session.ts           # Session management
│   ├── message-factory.ts   # Message creation utilities
│   ├── styles.ts            # Shared style utilities
│   └── utils.ts             # General utilities (cn, etc.)
├── types/                    # TypeScript type definitions
│   └── chat.ts              # Chat-related types and interfaces
├── public/                   # Static assets
│   ├── icons/               # PWA icons (various sizes)
│   ├── screenshots/         # PWA screenshots
│   ├── manifest.json        # PWA manifest
│   └── sw.js                # Service worker
├── scripts/                  # Build and utility scripts
│   └── generate-icons.js    # Generate PWA icons
├── .next/                    # Next.js build output (gitignored)
├── node_modules/             # Dependencies (gitignored)
├── .env.local                # Environment variables (gitignored)
├── .env.example              # Environment template
├── package.json
├── tsconfig.json
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.mjs        # PostCSS configuration
├── components.json           # Shadcn UI configuration
├── eslint.config.mjs         # ESLint configuration
├── vercel.json               # Vercel deployment config
├── README.md                 # Documentation
├── CHANGELOG.md              # Version history
├── ACCESSIBILITY.md          # Accessibility guidelines
└── SECURITY.md               # Security documentation
```

### Frontend Component Organization

- **app/**: Next.js pages and layouts (App Router pattern)
- **components/**: Feature components organized by functionality
  - Top-level: Feature-specific components (chat, sidebar, etc.)
  - **ui/**: Reusable, generic UI primitives
  - **markdown/**: Specialized markdown rendering components
- **hooks/**: Custom hooks for state management and side effects
- **lib/**: Service layer, API clients, utilities
- **types/**: Shared TypeScript type definitions
- **public/**: Static assets served directly

## Database Schema (Prisma)

```
Session (sessions)
├── id: String (cuid, primary key)
├── sessionId: String (unique)
├── expiresAt: DateTime
├── ipAddress: String?
├── userAgent: String?
├── lastActivityAt: DateTime
├── messageCount: Int
├── createdAt: DateTime
├── messages: Message[] (relation)
└── chatHistories: ChatHistory[] (relation)

ChatHistory (chat_histories)
├── id: String (cuid, primary key)
├── sessionId: String (foreign key)
├── title: String
├── createdAt: DateTime
├── updatedAt: DateTime
└── session: Session (relation)

Message (messages)
├── id: String (cuid, primary key)
├── sessionId: String (foreign key)
├── role: String ('user' | 'assistant')
├── content: String
├── createdAt: DateTime
└── session: Session (relation)
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `ChatMessage.tsx`, `Button.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useChat.ts`, `useAutoScroll.ts`)
- **Services/Utils**: camelCase (e.g., `api.ts`, `session.ts`)
- **Types**: camelCase (e.g., `chat.ts`)
- **Config files**: kebab-case (e.g., `next.config.ts`, `tailwind.config.js`)

## Import Path Conventions

### Backend
- Relative imports from `src/` root
- Example: `import { ChatService } from '../services/ChatService'`

### Frontend
- Absolute imports using `@/` alias (maps to project root)
- Example: `import { Button } from '@/components/ui/button'`
- Example: `import { cn } from '@/lib/utils'`

## Key Architectural Patterns

1. **Clean Architecture** (Backend): Dependency inversion with clear layer boundaries
2. **Repository Pattern** (Backend): Abstract database access behind interfaces
3. **Service Layer** (Both): Business logic separated from presentation
4. **Component Composition** (Frontend): Small, focused components with single responsibility
5. **Custom Hooks** (Frontend): Encapsulate stateful logic and side effects
6. **API Client Layer** (Frontend): Centralized API communication in `lib/` folder
