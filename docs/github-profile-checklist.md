# GitHub Profile Optimization & Sanitization Checklist

This document outlines the strategic checklist for aligning the public GitHub profile (`https://github.com/gauravyawale`) with the portfolio claims and resume presentation.

---

## 1. Pinned Repositories Strategy

Ensure the following 4 repositories are pinned on the GitHub profile overview for immediate technical credibility:

- [ ] **`gaurav-portfolio`**
  - **Description**: Architectural Studio portfolio built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Three.js CAD background, and Resend.
  - **Tags**: `nextjs`, `react`, `typescript`, `tailwindcss`, `threejs`, `portfolio`

- [ ] **`route-mate` (or `route-mate-prototype`)**
  - **Description**: Production-grade full-stack carpooling platform built in a Turborepo monorepo with React Native (Expo), Next.js admin dashboard, Fastify backend, and PostGIS routing.
  - **Tags**: `react-native`, `expo`, `fastify`, `postgis`, `postgresql`, `turborepo`, `redis`

- [ ] **`javascript-deep-dives`** *(Rename from `learn-js`)*
  - **Description**: Deep-dive implementations of core JavaScript mechanics, async patterns, event loops, closures, prototype chains, and custom algorithms.
  - **Action**: Rename repo from `learn-js` to `javascript-deep-dives` and add clear documentation.

- [ ] **`The_Trubute_Project`**
  - **Description**: Responsive frontend project demonstrating semantic HTML, modern styling, and clean component structure.

---

## 2. Route-Mate Sanitized Prototype Publication Checklist

Before making the repository publicly inspectable or sharing during interview debriefs, verify every security and architecture gate:

### 2.1 Security & Secret Stripping
- [ ] **Environment Variables**:
  - Delete `.env`, `.env.local`, `.env.production` from git tracking (`git rm --cached .env*`).
  - Provide `.env.example` with clear dummy placeholder keys (`DATABASE_URL=postgresql://user:password@localhost:5432/routemate`).
- [ ] **API Keys & Webhook Secrets**:
  - Remove any live Google Maps Platform API keys (restrict via Google Cloud Console if needed).
  - Remove Razorpay test/live key secrets and webhook HMAC signing keys.
  - Remove Firebase Cloud Messaging (FCM) service account JSON files and private keys.
  - Remove AWS S3 IAM credentials and presigned URL generation keys.
- [ ] **Internal Endpoints**:
  - Replace internal staging/production IPs or private cluster URLs with localhost defaults or configurable environment variables.

### 2.2 Architectural Artifacts to Include in README
- [ ] **Architecture Diagram**:
  - Monorepo structure detailing Client (Expo) ↔ Admin (Next.js) ↔ API (Fastify) ↔ Cache (Redis) ↔ DB (PostGIS).
- [ ] **Turborepo Tree**:
  - Directory tree illustrating `apps/mobile`, `apps/web-admin`, `apps/api`, and shared packages (`packages/types`, `packages/config`).
- [ ] **PostGIS Spatial Route Matching Notes**:
  - Explanation of `ST_DWithin`, coordinate projection (SRID 4326 vs 3857), and tolerance corridor snapping logic.
- [ ] **Atomic Seat-Reservation Logic**:
  - Redis distributed locking / PostgreSQL serializable transaction implementation preventing double-booking race conditions under high concurrency.
- [ ] **Local Setup Guide**:
  - Step-by-step instructions: `pnpm install` / `yarn install`, docker compose for PostgreSQL/PostGIS & Redis, database migrations, and development server launch commands.

---

## 3. Profile Readme & Presentation

- [ ] Headline: **Senior Software Engineer & Frontend Architect | 5+ Years Experience**
- [ ] Location: **Bengaluru, India (Open to Relocation)**
- [ ] Verified Article Link: [Keeping Your Users Safe: A Comprehensive Guide to NextAuth with Customized Token Strategies](https://geekyants.com/blog/keeping-your-users-safe-a-comprehensive-guide-to-next-auth-with-customized-token)
