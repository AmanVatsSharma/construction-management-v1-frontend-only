# Construction Management Platform - Frontend

A standalone Next.js application for construction project management with a modern UI built using shadcn/ui components and Tailwind CSS v4.

## Overview

This frontend application was converted from an Nx monorepo structure to a standalone Next.js application. It provides a comprehensive UI for managing construction projects, including modules for:

- Project Dashboard
- Budget Management
- Task Management (Kanban Board)
- RFI (Request for Information) Workflow
- Site Diary
- Risk Management
- Document Management
- Invoicing
- Reports
- Chat & AI Assistant

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Date Picker**: react-day-picker
- **Analytics**: Vercel Analytics
- **Theme**: next-themes
- **Command Palette**: cmdk
- **Toast Notifications**: Sonner

## Prerequisites

- Node.js 18+ 
- npm 9+ (or yarn/pnpm)

## Installation

1. **Clone the repository** (if not already cloned):
   ```bash
   git clone <repository-url>
   cd construction-management-v1-frontend-only
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` - Start the development server (port 3000)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server (requires build first)
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
construction-management-v1-frontend-only/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles & Tailwind config
│   └── [routes]/           # Feature pages (budget, chat, tasks, etc.)
├── components/             # React components
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── layout.tsx      # Dashboard layout
│   │   ├── sidebar.tsx     # Sidebar navigation
│   │   ├── topbar.tsx      # Top navigation bar
│   │   ├── pages/          # Dashboard page components
│   │   └── components/     # Reusable dashboard components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utility functions and contexts
│   ├── auth-context.tsx    # Authentication context
│   ├── chat-context.tsx    # Chat context
│   └── utils.ts            # Utility functions (cn helper)
├── hooks/                  # Custom React hooks
├── public/                 # Static assets
├── styles/                 # Additional styles
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration (Tailwind v4)
├── tsconfig.json           # TypeScript configuration
├── components.json         # shadcn/ui configuration
└── package.json            # Dependencies and scripts
```

## Configuration

### TypeScript

The `tsconfig.json` is configured for standalone Next.js development with:
- Path alias `@/*` pointing to the root directory
- Next.js TypeScript plugin
- Strict type checking enabled

### Tailwind CSS

This project uses **Tailwind CSS v4** with CSS-first configuration:
- Configuration is done via CSS variables in `app/globals.css`
- Uses `@tailwindcss/postcss` plugin in PostCSS
- Theme variables are defined using `@theme inline` syntax
- No separate `tailwind.config.ts` file needed

### Next.js

The `next.config.mjs` includes:
- Standalone output mode for production builds (Docker-friendly)
- Unoptimized images (can be changed for production)
- TypeScript build errors ignored (for development)

### shadcn/ui

Component configuration is in `components.json`:
- Style: New York
- CSS variables enabled
- Path aliases configured for imports

## Conversion Notes

This project was converted from an Nx monorepo to a standalone Next.js application. The following changes were made:

### Removed Nx Dependencies
- ✅ Removed `project.json` (Nx project configuration)
- ✅ Removed Nx base TypeScript config extension
- ✅ Removed shared library path mappings (`@construction-mgmt/shared/*`)

### Updated Configuration
- ✅ Created standalone `package.json` with all dependencies
- ✅ Updated `tsconfig.json` to remove monorepo references
- ✅ Fixed include paths to work in standalone mode
- ✅ Kept `@/*` path alias for local imports

### Preserved Features
- ✅ All UI components and pages intact
- ✅ Authentication context and chat context preserved
- ✅ All styling and theme configuration maintained
- ✅ Next.js standalone output configuration kept

## Development

### Adding New Components

Use shadcn/ui CLI to add new components:
```bash
npx shadcn@latest add [component-name]
```

### Adding New Pages

Create new pages in the `app/` directory following Next.js App Router conventions:
- `app/new-page/page.tsx` - Creates route at `/new-page`

### Styling

- Use Tailwind CSS classes directly in components
- Custom CSS variables are defined in `app/globals.css`
- Theme colors are available via CSS variables (e.g., `bg-primary`, `text-foreground`)

## Environment Variables

If needed, create a `.env.local` file for environment-specific variables:
```env
# Example (add as needed)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Building for Production

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm run start
   ```

The standalone build creates optimized output in `.next/standalone/` directory, which is ideal for Docker deployments.

## Troubleshooting

### TypeScript Errors
- Ensure all dependencies are installed: `npm install`
- Check that `tsconfig.json` paths are correct
- Restart your TypeScript server in your IDE

### Build Errors
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

### Styling Issues
- Ensure PostCSS is processing correctly
- Check that `app/globals.css` is imported in `app/layout.tsx`
- Verify Tailwind CSS v4 syntax is correct

## License

[Add your license information here]

## Support

For issues or questions, please [create an issue in the repository / contact support].

