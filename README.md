# The Rec Room

A peer discovery and resource sharing platform built for coding bootcamp cohorts.

## What it does

The Rec Room gives cohort members a shared space to find each other and grow together. It has three core features:

- **Classmate Profiles** — Browse your cohort, see each person's skills and background, and jump directly to their Slack profile to connect.
- **Resource Library** — Share and discover tutorials, videos, articles, tools, and docs. Filter by type or topic, and upvote the resources that helped you most.
- **Home Dashboard** — A personalized landing page that surfaces quick navigation and a welcome banner for new users.

## Tech stack

- [React 19](https://react.dev/) + [React Router 7](https://reactrouter.com/)
- [Vite](https://vite.dev/) for dev server and bundling
- [Supabase](https://supabase.com/) for auth and database
- [Lucide React](https://lucide.dev/) for icons

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Project structure

```
src/
  components/   # Reusable UI components
  hooks/        # Custom React hooks (auth, resources, etc.)
  lib/          # Constants and Supabase client
  pages/        # Route-level page components
```
