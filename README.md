# Gaurav Yawale — Senior Software Engineer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Resend](https://img.shields.io/badge/Resend-Email_API-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)

A modern, high-performance personal engineering portfolio and interactive showcase built for **Gaurav Yawale** (Senior Software Engineer | Frontend-Focused Full-Stack Developer).

Designed with sleek glassmorphism, responsive 3D WebGL particle simulations, comprehensive architectural case studies, and a live server-side contact engine.

---

## 🌟 Key Features

- **📐 Architectural CAD 3D Drafting Grid**:
  - Interactive Three.js structural ground plane featuring perspective drafting lines, orthogonal coordinate markers, mouse velocity parallax, and light/dark vellum adaptation.
- **🌓 Architectural Studio Color Engine**:
  - Deep obsidian (`#0c0e12`), charcoal slate cards (`#161922`), fine 1px borders (`#2a2e3d`), bone white typography (`#f1f3f9`), and Electric Amber (`#f59e0b`) accents.
- **🎥 Interactive Video Briefing**:
  - Custom video showcase component with clickable timeline chapters, jump-to-time navigation, and engineering takeaway highlights.
- **💼 Comprehensive Experience Timeline**:
  - Detailed career history spanning **GeekyAnts**, **ABB Enterprise Industrial IoT**, **UnoJobs SaaS**, and the **Crio.Do Full-Stack Fellowship**.
  - Highlights real-world impact metrics:
    - **-38% Bundle Size Reduction** via code-splitting, lazy loading, and list virtualization.
    - **80% RTL Test Coverage** (elevated from 25%, slashing production defects by 70%).
    - **-42% Network Payload Cut** by migrating high-traffic endpoints to GraphQL.
- **🚀 Project Deep-Dive Architecture Modals**:
  - Interactive project cards with category filters (`Full-Stack`, `Systems & Architecture`, `All`).
  - Modal breakdowns featuring layer-by-layer architectural diagrams, technical challenges solved, metrics, and technology tag stacks (including **Route-Mate**, **UnoJobs**, and **ABB Platform**).
- **🛠 Categorized Tech Stack**:
  - Tabbed tech stack visualization highlighting Frontend, Backend, Databases, Real-Time architectures, and DevOps tools.
- **📬 Type-Safe Contact Form with Resend**:
  - Contact section powered by `react-hook-form` and `zod` client/server schema validation.
  - Server-side Next.js App Router API endpoint (`/api/contact`) dispatching emails via the **Resend API**.
- **🎯 Custom Spring Cursor & Micro-Interactions**:
  - Custom physics-based cursor follower with subtle hover expansion over interactive elements.
- **📱 Responsive & Accessible**:
  - Mobile-first design, fluid layouts, semantic HTML5, and accessible ARIA attributes.

---

## 🛠 Tech Stack

| Domain | Technologies & Libraries |
| :--- | :--- |
| **Framework & Core** | [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/), Glassmorphism, Modern CSS Variables |
| **3D Graphics & Canvas** | [Three.js](https://threejs.org/) (`@types/three`) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), `@hookform/resolvers` |
| **Email Service** | [Resend SDK](https://resend.com/) |
| **Icons & Assets** | [Lucide React](https://lucide.dev/), Custom SVG Badges |
| **Fonts** | [Geist & Geist Mono](https://vercel.com/font) (`next/font`) |

---

## 📁 Project Structure

```text
gaurav-portfolio/
├── public/                     # Static assets (video poster, icons, demos)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/        # Next.js App Router API route for Resend emails
│   │   │       └── route.ts
│   │   ├── globals.css         # Tailwind v4 directives, animations & theme rules
│   │   ├── layout.tsx          # Root layout with fonts, theme script & metadata
│   │   └── page.tsx            # Main single-page portfolio layout
│   ├── components/
│   │   ├── Contact.tsx         # Contact form with Zod validation & Resend API
│   │   ├── CustomCursor.tsx    # Smooth spring mouse follower
│   │   ├── Experience.tsx      # Career timeline with metric callouts & sub-projects
│   │   ├── Footer.tsx          # Obsidian footer with links and back-to-top
│   │   ├── Hero.tsx            # Hero section with CTA buttons & quick stats
│   │   ├── Icons.tsx           # Custom branded SVGs (GeekyAnts, Crio, etc.)
│   │   ├── Navbar.tsx          # Glassmorphic sticky header with mobile menu
│   │   ├── ProjectModal.tsx    # Detailed architecture modal for featured work
│   │   ├── Projects.tsx        # Projects grid with category filters
│   │   ├── Skills.tsx          # Skills matrix & proficiency groups
│   │   ├── ThemeProvider.tsx   # React context for theme management
│   │   ├── ThemeToggle.tsx     # Light/dark mode switcher
│   │   ├── ThreeBackground.tsx # Three.js interactive WebGL particle network
│   │   └── VideoIntro.tsx      # Interactive video intro player with chapters
│   └── data/
│       └── portfolioData.ts    # Centralized portfolio data (profile, projects, experience, skills)
├── .env.example                # Template for environment configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or later (LTS recommended)
- **npm**, **yarn**, or **pnpm**

### 1. Clone the Repository

```bash
git clone https://github.com/gauravyawale/gaurav-portfolio.git
cd gaurav-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env.local
```

Populate the variables with your configuration:

```env
# Resend API Key (for contact form email dispatching)
RESEND_API_KEY=re_your_api_key_here

# Sender email address configured in Resend (default: onboarding@resend.dev)
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
```

> **Note:** If `RESEND_API_KEY` is not provided, the contact API endpoint will still respond with mock confirmation in development mode, allowing you to test the UI flow without an active Resend account.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with hot-reloading |
| `npm run build` | Compiles the production build |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint to verify code quality |

---

## 🌐 Deployment

The easiest way to deploy this portfolio is using the [Vercel Platform](https://vercel.com/):

1. Push your changes to GitHub.
2. Import the project into your Vercel Dashboard.
3. Configure the environment variable:
   - `RESEND_API_KEY`
   - `CONTACT_FROM_EMAIL` (optional)
4. Click **Deploy**.

---

## 👤 Author

**Gaurav Yawale**  
*Senior Software Engineer | Bengaluru, India*

- 🌐 **Portfolio**: [gauravyawale.github.io / Live](https://github.com/gauravyawale)
- 💼 **LinkedIn**: [linkedin.com/in/gaurav-yawale](https://linkedin.com/in/gaurav-yawale)
- 🐙 **GitHub**: [@gauravyawale](https://github.com/gauravyawale)
- ✉️ **Email**: [gsyawale@gmail.com](mailto:gsyawale@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
