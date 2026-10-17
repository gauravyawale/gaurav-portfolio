export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectArchitectureItem {
  layer: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  role: string;
  metrics: string;
  tags: string[];
  category: "all" | "full-stack" | "systems";
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  architectureHighlights: string[];
  challengesSolved: ProjectChallenge[];
  architectureBreakdown: ProjectArchitectureItem[];
  fullTechStack: {
    category: string;
    items: string[];
  }[];
}

export interface ExperienceSubProject {
  name: string;
  clientOrDomain: string;
  role: string;
  period?: string;
  summary: string;
  highlights: string[];
  optimizations: {
    label: string;
    metric: string;
    detail: string;
  }[];
  techStack: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  summary: string;
  subProjects?: ExperienceSubProject[];
  achievements: string[];
  performanceMetrics: {
    metric: string;
    label: string;
  }[];
  skills: string[];
}

export interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
  summary: string;
}

export interface VideoIntro {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  duration: string;
  chapters: VideoChapter[];
  keyTakeaways: string[];
}

export interface SkillGroup {
  category: "Frontend" | "Backend" | "DevOps & Tools";
  skills: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    role: string;
    statusBadge: string;
    headline: string;
    bio: string;
    location: string;
    yearsOfExperience: string;
    stats: { label: string; value: string; detail: string }[];
    socials: {
      github: string;
      linkedin: string;
      email: string;
    };
  };
  introVideo: VideoIntro;
  experiences: Experience[];
  projects: Project[];
  skillsList: {
    frontend: string[];
    backend: string[];
    devOpsAndTools: string[];
  };
  skillGroups: SkillGroup[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "Gaurav Yawale",
    title: "Senior Software Engineer | Frontend-Focused Full-Stack Developer",
    role: "Senior Software Engineer",
    statusBadge: "Available for Senior Roles",
    headline: "Building robust web applications with React, Next.js, TypeScript, and modern full-stack architectures.",
    bio: "Senior Software Engineer with 4+ years of experience engineering production web platforms at GeekyAnts and through the Crio.Do fellowship. Proven track record leading frontend delivery on enterprise industrial IoT platforms (ABB) and consumer SaaS recruitment systems (UnoJobs), emphasizing measurable web performance, modular component design, and automated test coverage.",
    location: "Bengaluru, India (Open to Relocation)",
    yearsOfExperience: "4+",
    stats: [
      {
        value: "38%",
        label: "Bundle Size Reduction",
        detail: "Achieved via code splitting, lazy loading & virtualization at ABB",
      },
      {
        value: "80%",
        label: "RTL Test Coverage",
        detail: "Increased test coverage from 25% to 80% on core ABB modules",
      },
      {
        value: "42%",
        label: "Payload Reduction",
        detail: "Achieved by migrating REST to GraphQL on UnoJobs",
      },
      {
        value: "45%",
        label: "Render Time Optimization",
        detail: "Reduced dashboard render times across industrial views",
      },
    ],
    socials: {
      github: "https://github.com/gauravyawale",
      linkedin: "https://linkedin.com/in/gaurav-yawale",
      email: "gsyawale@gmail.com",
    },
  },

  introVideo: {
    title: "Hi, I'm Gaurav — Engineering Introduction",
    subtitle: "A quick personal walkthrough of my frontend architecture background, scalable full-stack projects, and engineering philosophy.",
    badge: "VIDEO INTRODUCTION",
    description:
      "Welcome to my portfolio! Here is a concise overview of who I am, what I build, and how I've driven impact across enterprise industrial platforms (ABB), consumer SaaS platforms (UnoJobs), and distributed full-stack systems (Route-Mate).",
    videoUrl: "/intro-video.mp4",
    posterUrl: "/video-poster.jpg",
    duration: "1:15",
    chapters: [
      {
        time: "0:00",
        seconds: 0,
        title: "Introduction & 4+ Yrs at GeekyAnts",
        summary: "Overview of frontend engineering trajectory, React/Next.js focus, and agile delivery.",
      },
      {
        time: "0:25",
        seconds: 25,
        title: "ABB Enterprise & UnoJobs Architecture",
        summary: "38% bundle reduction, 80% RTL coverage, and GraphQL migrations.",
      },
      {
        time: "0:50",
        seconds: 50,
        title: "Route-Mate & Full-Stack Systems",
        summary: "PostGIS spatial routing, Turborepo monorepo, and real-time WebSockets.",
      },
    ],
    keyTakeaways: [
      "Specialized in React.js, Next.js, TypeScript, and modern full-stack architectures",
      "Proven track record cutting bundle payloads by 38% and elevating RTL test coverage to 80%",
      "Experienced in enterprise SCADA/IoT platforms, greenfield SaaS, and real-time spatial engines",
      "Available for Senior Software Engineer roles in Bengaluru or Remote",
    ],
  },

  experiences: [
    {
      id: "exp-geekyants",
      role: "Senior Software Engineer",
      company: "GeekyAnts Pvt Ltd",
      location: "Bengaluru, India",
      period: "Aug 2022 - Present",
      isCurrent: true,
      summary:
        "Senior Software Engineer leading frontend architecture and implementation for enterprise industrial applications (ABB) and greenfield recruitment platforms (UnoJobs). Delivering measurable performance gains, high test coverage, and modular UI libraries.",
      subProjects: [
        {
          name: "ABB Enterprise Industrial Platform",
          clientOrDomain: "Industrial IoT & SCADA Automation",
          role: "Frontend Module Architect & Senior Engineer",
          period: "Aug 2022 - Present",
          summary:
            "Architected and delivered 2 major frontend modules using React.js, TypeScript, and Redux within a 12-person agile team.",
          highlights: [
            "Architected and delivered 2 major frontend modules using React.js, TypeScript, and Redux within a 12-person agile team.",
            "Standardized UI patterns across multiple workflows, reducing duplicate code by 40%.",
            "Increased React Testing Library (RTL) test coverage from 25% to 80%, reducing production defects by 70%.",
            "Optimized rendering through code splitting, lazy loading, and list virtualization, reducing bundle size by 38% and dashboard render time by 45%.",
          ],
          optimizations: [
            {
              label: "Bundle Optimization",
              metric: "-38%",
              detail: "Code splitting, dynamic chunks & tree-shaking",
            },
            {
              label: "RTL Coverage",
              metric: "25% -> 80%",
              detail: "Reduced production defects by 70%",
            },
            {
              label: "Render Speed",
              metric: "45% Faster",
              detail: "List virtualization and selective re-renders",
            },
          ],
          techStack: ["React.js", "TypeScript", "Redux", "React Testing Library (RTL)", "Jest", "Tailwind CSS", "Virtualization"],
        },
        {
          name: "UnoJobs SaaS Job Portal",
          clientOrDomain: "Recruitment Marketplace & Applicant Tracking",
          role: "Core Frontend Engineer",
          period: "2022 - 2023",
          summary:
            "Core frontend engineer on a greenfield SaaS recruitment platform built with React.js, Next.js, and TypeScript, supporting 50K+ active users.",
          highlights: [
            "Engineered high-performance SSR and SSG page experiences supporting 50K+ users with fast First Contentful Paint.",
            "Implemented real-time bi-directional applicant and recruiter messaging via WebSockets.",
            "Migrated core APIs from REST to GraphQL, reducing network payload size by 42%.",
            "Authored and maintained a 40+ component Storybook design system library to accelerate cross-team feature velocity.",
          ],
          optimizations: [
            {
              label: "Payload Reduction",
              metric: "-42%",
              detail: "Migrated high-traffic endpoints from REST to GraphQL",
            },
            {
              label: "Design System",
              metric: "40+ Components",
              detail: "Unified Storybook component library for cross-team reuse",
            },
            {
              label: "User Scale",
              metric: "50K+ Users",
              detail: "Optimized SSR/SSG caching and WebSocket connections",
            },
          ],
          techStack: ["Next.js", "React.js", "TypeScript", "GraphQL", "WebSockets", "Storybook", "Tailwind CSS", "React Query"],
        },
      ],
      achievements: [
        "Architected and delivered 2 major frontend modules using React.js, TypeScript, and Redux within a 12-person agile team.",
        "Increased RTL test coverage from 25% to 80%, cutting production defects by 70%.",
        "Optimized bundle size by 38% and dashboard render times by 45% through virtualization and code splitting.",
        "Migrated REST to GraphQL on UnoJobs, decreasing payload size by 42% and building a 40+ component Storybook library.",
      ],
      performanceMetrics: [
        { metric: "-38%", label: "JS Bundle Reduction" },
        { metric: "80%", label: "RTL Test Coverage" },
        { metric: "-42%", label: "GraphQL Payload Cut" },
      ],
      skills: ["React.js", "Next.js", "TypeScript", "Redux", "GraphQL", "WebSockets", "Storybook", "RTL / Jest", "Tailwind CSS"],
    },
    {
      id: "exp-crio",
      role: "Full Stack Development Fellow",
      company: "Crio.Do",
      location: "Bengaluru, India / Remote",
      period: "Jul 2021 - Jul 2022",
      isCurrent: false,
      summary:
        "Completed an intensive 12-month fellowship focused on full-stack development, building 2 production-grade applications and solving 100+ algorithmic problems.",
      achievements: [
        "Completed a rigorous 12-month full-stack development fellowship covering React.js, Node.js, Express, and SQL.",
        "Architected and deployed 2 production-grade applications from scratch with complete database schemas and REST APIs.",
        "Solved 100+ algorithmic data structure and problem-solving challenges with clean time/space complexity analysis.",
        "Applied test-driven development, automated API testing, and continuous deployment workflows.",
      ],
      performanceMetrics: [
        { metric: "12 Mos", label: "Intensive Fellowship" },
        { metric: "2 Apps", label: "Production Applications" },
        { metric: "100+", label: "Algorithmic Challenges" },
      ],
      skills: ["React.js", "Node.js", "Express.js", "SQL", "Data Structures", "Algorithms", "REST APIs", "Git"],
    },
    {
      id: "exp-operations",
      role: "Quality Head / Asst. Manager",
      company: "Technical Operations and Quality Leadership",
      location: "India",
      period: "Oct 2016 - Sep 2021",
      isCurrent: false,
      summary:
        "Managed structured workflows and analytical reporting systems for teams of 20+ members, leveraging SQL and Excel Macros to automate reporting and improve decision-making speed by 30%.",
      achievements: [
        "Led structured operational workflows and analytical reporting systems across teams of 20+ members.",
        "Engineered SQL queries and automated Excel Macro scripts to eliminate manual data entry bottlenecks.",
        "Improved operational decision-making speed by 30% through automated reporting pipelines and KPI dashboards.",
        "Instituted rigorous quality assurance audits and process optimization standards.",
      ],
      performanceMetrics: [
        { metric: "20+", label: "Team Members Managed" },
        { metric: "+30%", label: "Decision-Making Speed" },
        { metric: "5 Yrs", label: "Leadership Tenure" },
      ],
      skills: ["SQL", "Analytical Reporting", "Workflow Automation", "Process Engineering", "Team Leadership"],
    },
  ],

  projects: [
    {
      id: "route-mate",
      title: "Route-Mate",
      subtitle: "Full-Stack Carpooling Platform",
      description:
        "Production-ready carpooling platform with a React Native (Expo) mobile app, Next.js admin dashboard, and Fastify backend in a Turborepo monorepo.",
      longDescription:
        "Route-Mate is a comprehensive full-stack carpooling platform built in a Turborepo monorepo. It features a cross-platform React Native (Expo) mobile application for riders and drivers, a responsive Next.js web admin portal, and a high-performance Fastify backend. The platform integrates real-time Google Maps routing, PostGIS-powered spatial matching, atomic seat reservations, and hybrid notifications via Socket.io and Firebase Cloud Messaging (FCM).",
      role: "Full-Stack Architect & Engineer",
      metrics: "Real-time Google Maps • PostGIS Route Matching • Atomic Reservations",
      tags: [
        "React Native (Expo)",
        "Next.js",
        "TypeScript",
        "Fastify",
        "PostgreSQL (PostGIS)",
        "Redis",
        "AWS S3",
        "Turborepo",
        "Google Maps Platform",
      ],
      category: "full-stack",
      githubUrl: "https://github.com/gauravyawale",
      liveUrl: "https://route-mate.demo",
      featured: true,
      architectureHighlights: [
        "Turborepo monorepo architecture orchestrating React Native (Expo) mobile app, Next.js admin dashboard, and shared TypeScript packages.",
        "Fastify backend utilizing PostgreSQL with PostGIS extension for spatial route matching and proximity queries.",
        "Real-time Google Maps Platform integration computing dynamic paths, geocoding, and distance matrices.",
        "Atomic seat reservation transactions with Redis locking and concurrency controls.",
        "Hybrid real-time notification engine combining Socket.io for active sessions and Firebase Cloud Messaging (FCM) for background mobile push alerts.",
        "Asset storage on AWS S3 with signed upload URLs.",
      ],
      challengesSolved: [
        {
          challenge: "Spatial Route Matching along Waypoints",
          solution:
            "Utilized PostGIS spatial geometry indexing with ST_DWithin and pgRouting queries to identify rides whose paths intersect with rider pickup/dropoff points within a defined tolerance corridor.",
        },
        {
          challenge: "Race Conditions on Concurrent Seat Booking",
          solution:
            "Implemented atomic seat reservations using Redis distributed locks and database transactions, preventing double-booking during simultaneous booking requests.",
        },
        {
          challenge: "Hybrid Real-time & Push Alerts",
          solution:
            "Built a unified notification service dispatching live updates over Socket.io for connected users and falling back to Firebase Cloud Messaging (FCM) for background push notifications.",
        },
      ],
      architectureBreakdown: [
        {
          layer: "Mobile Client",
          detail: "React Native (Expo), TypeScript, Google Maps SDK, Socket.io client",
        },
        {
          layer: "Admin Dashboard",
          detail: "Next.js App Router, React 19, TypeScript, Tailwind CSS, TanStack Query",
        },
        {
          layer: "Backend API",
          detail: "Fastify, TypeScript, Node.js, Prisma ORM, Socket.io server",
        },
        {
          layer: "Database & Caching",
          detail: "PostgreSQL 16 with PostGIS extension, Redis for cache & lock management",
        },
        {
          layer: "Cloud & Storage",
          detail: "AWS S3 for media storage, Firebase Cloud Messaging (FCM), Turborepo tooling",
        },
      ],
      fullTechStack: [
        {
          category: "Frontend & Mobile",
          items: ["React Native (Expo)", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query"],
        },
        {
          category: "Backend & Real-Time",
          items: ["Fastify", "Node.js", "Socket.io", "Redis", "Firebase Cloud Messaging (FCM)"],
        },
        {
          category: "Database & Cloud",
          items: ["PostgreSQL (PostGIS)", "AWS S3", "Google Maps Platform", "Turborepo", "Docker"],
        },
      ],
    },
    {
      id: "unojobs",
      title: "UnoJobs SaaS Job Portal",
      subtitle: "Greenfield Recruitment Platform Supporting 50K+ Users",
      description:
        "Core frontend architecture on a greenfield SaaS recruitment platform with Next.js, React.js, TypeScript, GraphQL, WebSockets, and a 40+ component Storybook library.",
      longDescription:
        "Engineered as a core frontend engineer at GeekyAnts, UnoJobs is a recruitment SaaS application supporting 50K+ users. Built with Next.js, React.js, and TypeScript, it features high-performance SSR/SSG rendering, real-time WebSocket messaging, a GraphQL migration cutting payloads by 42%, and a comprehensive 40+ component Storybook design system.",
      role: "Core Frontend Engineer",
      metrics: "50K+ users • 42% payload reduction via GraphQL • 40+ Storybook components",
      tags: ["Next.js", "React.js", "TypeScript", "GraphQL", "WebSockets", "Storybook", "Tailwind CSS", "TanStack Query"],
      category: "full-stack",
      githubUrl: "https://github.com/gauravyawale",
      liveUrl: "https://unojobs.demo",
      featured: true,
      architectureHighlights: [
        "Next.js SSR and SSG rendering patterns providing rapid First Contentful Paint and SEO indexing for 50K+ candidate profiles.",
        "Real-time bi-directional messaging between recruiters and candidates built with WebSockets.",
        "Migrated key data APIs from REST to GraphQL, reducing over-fetching and decreasing payload size by 42%.",
        "Created and documented a 40+ component Storybook design system library ensuring visual consistency across teams.",
      ],
      challengesSolved: [
        {
          challenge: "Payload Over-fetching across Complex Candidate Profiles",
          solution:
            "Spearheaded GraphQL schema adoption with query fragment collocation, slashing network transmission payloads by 42%.",
        },
        {
          challenge: "UI Inconsistency across Multi-Developer Pods",
          solution:
            "Constructed a 40+ component Storybook library with automated visual testing and accessibility checks, speeding up new feature delivery.",
        },
      ],
      architectureBreakdown: [
        {
          layer: "Presentation",
          detail: "Next.js App Router, React.js, TypeScript, Tailwind CSS",
        },
        {
          layer: "Design System",
          detail: "Storybook with 40+ reusable accessible components",
        },
        {
          layer: "API Layer",
          detail: "GraphQL Apollo client, REST endpoints, WebSockets",
        },
        {
          layer: "State Management",
          detail: "TanStack Query, React Context",
        },
      ],
      fullTechStack: [
        {
          category: "Frontend Stack",
          items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Storybook", "TanStack Query"],
        },
        {
          category: "APIs & Real-Time",
          items: ["GraphQL", "WebSockets", "Node.js", "REST APIs"],
        },
      ],
    },
    {
      id: "abb-industrial",
      title: "ABB Enterprise Industrial Platform",
      subtitle: "Industrial IoT & SCADA Automation Modules",
      description:
        "Architected and delivered 2 major frontend modules using React.js, TypeScript, and Redux within a 12-person agile team, cutting bundle size by 38% and raising RTL test coverage to 80%.",
      longDescription:
        "Engineered at GeekyAnts for global industrial conglomerate ABB, this enterprise monitoring suite visualizes industrial device telemetry and SCADA automation controls. Delivered 2 major frontend modules using React.js, TypeScript, and Redux, standardized UI patterns to reduce duplicate code by 40%, increased RTL test coverage from 25% to 80%, and optimized rendering to cut bundle size by 38% and dashboard render time by 45%.",
      role: "Frontend Module Architect & Senior Engineer",
      metrics: "38% bundle reduction • 45% faster dashboard render • 80% RTL coverage",
      tags: ["React.js", "TypeScript", "Redux", "React Testing Library (RTL)", "Jest", "Tailwind CSS", "WebSockets"],
      category: "systems",
      githubUrl: "https://github.com/gauravyawale",
      liveUrl: "https://abb-telemetry.demo",
      featured: true,
      architectureHighlights: [
        "Architected and delivered 2 major frontend modules with React.js, TypeScript, and Redux within a 12-person agile team.",
        "Standardized UI patterns across complex industrial workflows, decreasing code duplication by 40%.",
        "Boosted RTL test coverage from 25% to 80%, leading to a 70% reduction in production defect tickets.",
        "Applied code splitting, lazy loading, and list virtualization, reducing bundle payload by 38% and render times by 45%.",
      ],
      challengesSolved: [
        {
          challenge: "Laggy Rendering of Dense Industrial Tables and Dials",
          solution:
            "Implemented windowing and list virtualization, dropping DOM node counts and accelerating dashboard render time by 45%.",
        },
        {
          challenge: "Low Test Coverage & Frequent Regressions",
          solution:
            "Championed React Testing Library integration and strict CI gates, lifting coverage from 25% to 80% and slashing defects by 70%.",
        },
      ],
      architectureBreakdown: [
        {
          layer: "Core Modules",
          detail: "React.js, TypeScript, Redux Toolkit, Redux Saga",
        },
        {
          layer: "Performance",
          detail: "Code splitting, dynamic lazy loading, list virtualization",
        },
        {
          layer: "Testing Suite",
          detail: "React Testing Library (RTL), Jest unit and integration tests",
        },
      ],
      fullTechStack: [
        {
          category: "Frontend Stack",
          items: ["React.js", "TypeScript", "Redux", "Tailwind CSS", "Virtualization"],
        },
        {
          category: "Testing & Quality",
          items: ["React Testing Library (RTL)", "Jest", "Git", "GitHub Actions"],
        },
      ],
    },
  ],

  skillsList: {
    frontend: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Redux",
      "Zustand",
      "TanStack Query",
      "Storybook",
    ],
    backend: [
      "Node.js",
      "Fastify",
      "Express.js",
      "PostgreSQL",
      "PostGIS",
      "Redis",
      "WebSockets",
      ".NET C#",
    ],
    devOpsAndTools: [
      "Git",
      "GitHub Actions",
      "Docker",
      "Vercel",
      "AWS S3",
    ],
  },

  skillGroups: [
    {
      category: "Frontend",
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Redux",
        "Zustand",
        "TanStack Query",
        "Storybook",
      ],
    },
    {
      category: "Backend",
      skills: [
        "Node.js",
        "Fastify",
        "Express.js",
        "PostgreSQL",
        "PostGIS",
        "Redis",
        "WebSockets",
        ".NET C#",
      ],
    },
    {
      category: "DevOps & Tools",
      skills: [
        "Git",
        "GitHub Actions",
        "Docker",
        "Vercel",
        "AWS S3",
      ],
    },
  ],
};
