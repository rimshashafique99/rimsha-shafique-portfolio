export interface ProjectMedia {
  src?: string;
  alt: string;
  caption?: string;
  placeholderLabel: string;
  placeholderSublabel: string;
  placeholderModules: string[];
}

export interface ProjectRepositories {
  frontend?: string;
  backend?: string;
  combined?: string;
}

export interface ProjectDecision {
  id: string;
  title: string;
  challenge: string;
  approach: string;
  rationale: string;
  tradeoffs: string;
  snippet?: {
    label: string;
    code: string;
  };
}

export interface ProjectSolutionFeature {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt: string;
  placeholderSublabel: string;
  placeholderModules: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: 'Personal Project' | 'Client Work' | 'Professional Work';
  organization?: string;
  role: string;
  projectType: string;
  description: string;
  shortDescription: string;
  overview: string;
  highlights: string[];
  technologies: string[];
  featured: boolean;
  hasCaseStudy: boolean;
  layoutVariant: 'image-left' | 'image-right';

  // Media — set `image` (or `thumbnail.src`) when project screenshots are added
  image?: string;
  imageAlt: string;
  thumbnail: ProjectMedia;
  heroImage: ProjectMedia;
  gallery?: ProjectSolutionFeature[];
  demoVideo?: {
    src: string;
    poster?: string;
    caption?: string;
  };

  // External links — only render when valid URLs exist
  liveUrl?: string;
  frontendRepo?: string;
  backendRepo?: string;
  githubUrl?: string;
  repositories?: ProjectRepositories;

  // Case study sections
  context?: {
    audience: string;
    summary: string;
    environment: string;
    projectNature: string;
  };
  problem?: {
    summary: string;
    challenges: string[];
    goal: string;
  };
  contributions?: {
    summary: string;
    personalWork: string[];
    collaborationNote?: string;
    toolsAndServices: string[];
  };
  engineeringDecisions?: ProjectDecision[];
  solution?: {
    intro: string;
    features: ProjectSolutionFeature[];
  };
  results?: {
    summary: string;
    deliveredOutcomes: string[];
    measuredMetrics?: string[];
    measurementNote?: string;
  };
  nextSteps?: Array<{
    title: string;
    description: string;
  }>;
  seo?: {
    title: string;
    description: string;
  };
}

export const projects: ProjectItem[] = [
  {
    id: 'ai-job-copilot',
    number: '01',
    slug: 'ai-job-copilot',
    title: 'AI Job Copilot',
    category: 'Personal Project',
    role: 'Independent Full-Stack Developer',
    projectType: 'Full-Stack AI Application',
    description:
      'An AI-powered job search assistant that analyzes resumes and job descriptions to generate tailored cover letters, identify skill gaps and suggest CV improvements, with application tracking in one dashboard.',
    shortDescription:
      'An AI-powered job search assistant that analyzes resumes and job descriptions to generate tailored cover letters, identify skill gaps and suggest CV improvements, with application tracking in one dashboard.',
    overview:
      'Built an end-to-end application workflow that compares resume content against target job descriptions, surfaces skill gaps, generates tailored cover letters, and tracks job applications in a single dashboard.',
    highlights: [
      'Resume and job description comparison with skill-gap analysis',
      'Tailored cover letter generation and CV improvement suggestions',
      'Application tracking dashboard backed by PostgreSQL',
      'Low-latency LLM inference powered by the Groq API',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Groq API',
      'Tailwind CSS',
    ],
    featured: true,
    hasCaseStudy: true,
    layoutVariant: 'image-left',
    image: '/assets/aistudio/Screenshot_2026-11-19_184241_4e343ee9.png',
    imageAlt:
      'AI Job Copilot main dashboard showing application statistics and quick shortcuts to the job analyzer and application tracker',
    liveUrl: 'https://ai-job-copilot-red.vercel.app/',
    frontendRepo: 'https://github.com/rimshashafique99/ai-job-copilot',
    backendRepo: 'https://github.com/rimshashafique99/ai-job-copilot-backend',
    repositories: {
      frontend: 'https://github.com/rimshashafique99/ai-job-copilot',
      backend: 'https://github.com/rimshashafique99/ai-job-copilot-backend',
    },
    thumbnail: {
      src: '/assets/aistudio/Screenshot_2026-11-19_184241_4e343ee9.png',
      alt: 'AI Job Copilot main dashboard showing application statistics and quick shortcuts to the job analyzer and application tracker',
      placeholderLabel: 'AI Job Copilot',
      placeholderSublabel: 'Resume Analysis, Cover Letters & Application Dashboard',
      placeholderModules: ['CV Analysis', 'Skill Gaps', 'Tracker'],
    },
    heroImage: {
      src: '/assets/aistudio/Screenshot_2026-11-19_184241_4e343ee9.png',
      alt: 'AI Job Copilot main dashboard showing application statistics and quick shortcuts to the job analyzer and application tracker',
      caption: 'Main dashboard with application overview and shortcuts to the analyzer and tracker.',
      placeholderLabel: 'AI Job Copilot',
      placeholderSublabel: 'Resume Parsing, Gap Analysis & Application Tracking',
      placeholderModules: ['Resume Input', 'JD Breakdown', 'Cover Letter Draft'],
    },
    context: {
      audience: 'Job seekers preparing tailored applications across multiple roles.',
      summary:
        'AI Job Copilot brings resume evaluation, tailored cover letter drafting, CV suggestions, and application status tracking into one dedicated workspace.',
      environment:
        'Built independently with React, TypeScript, Tailwind CSS, Node.js, Express.js, PostgreSQL, and the Groq API.',
      projectNature: 'Personal full-stack project.',
    },
    problem: {
      summary:
        'Customizing resumes and cover letters manually for every posting takes significant time, and tracking application statuses separately leads to fragmented workflows.',
      challenges: [
        'Identifying concrete skill gaps between a resume and a job description quickly.',
        'Drafting role-specific cover letters grounded in real candidate experience.',
        'Keeping analyzed roles and application progress organized in one place.',
      ],
      goal: 'Combine resume analysis, tailored drafting, and application tracking inside one unified dashboard.',
    },
    contributions: {
      summary:
        'Independently designed and developed both the frontend workspace and backend services.',
      personalWork: [
        'Built the React, TypeScript, and Tailwind CSS dashboard for analyzing roles and tracking applications.',
        'Developed the Node.js and Express.js REST API with PostgreSQL persistence.',
        'Integrated the Groq API for skill-gap analysis, CV improvement suggestions, and tailored cover letters.',
      ],
      toolsAndServices: [
        'React',
        'TypeScript',
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'Groq API',
        'Tailwind CSS',
      ],
    },
    seo: {
      title: 'AI Job Copilot — Case Study | Rimsha Shafique',
      description:
        'AI-powered job search assistant built with React, TypeScript, Node.js, Express.js, PostgreSQL, Groq API, and Tailwind CSS.',
    },
  },
  {
    id: 'morphix',
    number: '02',
    slug: 'morphix-3d',
    title: 'Morphix',
    category: 'Client Work',
    role: 'Frontend Developer',
    projectType: 'Client Frontend Project',
    description:
      'A 3D character studio where users customize avatars, poses and backgrounds, preview their creations and export high-resolution PNG images.',
    shortDescription:
      'A 3D character studio where users customize avatars, poses and backgrounds, preview their creations and export high-resolution PNG images.',
    overview:
      'Implemented the frontend dashboard, character customization controls, interactive preview experience, and PNG export workflow from a provided design.',
    highlights: [
      'Dashboard and avatar customization interface built from provided designs',
      'Interactive pose, background, and preview state transitions with Framer Motion',
      'High-resolution PNG export workflow in Next.js',
    ],
    technologies: ['Next.js', 'Framer Motion'],
    featured: false,
    hasCaseStudy: true,
    layoutVariant: 'image-right',
    image: '/assets/aistudio/morphix_e2ed53a6.png',
    imageAlt:
      'Morphix 3D character studio interface showing character selection, pose controls, and live 3D avatar preview',
    liveUrl: 'https://morphix-3d.vercel.app/',
    githubUrl: 'https://github.com/rimshashafique99/morphix',
    repositories: {
      combined: 'https://github.com/rimshashafique99/morphix',
    },
    thumbnail: {
      src: '/assets/aistudio/morphix_e2ed53a6.png',
      alt: 'Morphix 3D character studio interface showing character selection, pose controls, and live 3D avatar preview',
      placeholderLabel: 'Morphix',
      placeholderSublabel: '3D Character Customization & PNG Export Studio',
      placeholderModules: ['Avatar Studio', 'Pose & Backdrop', 'PNG Export'],
    },
    heroImage: {
      src: '/assets/aistudio/morphix_e2ed53a6.png',
      alt: 'Morphix 3D character studio interface showing character selection, pose controls, and live 3D avatar preview',
      placeholderLabel: 'Morphix',
      placeholderSublabel: 'Character Customization Dashboard & Export Workflow',
      placeholderModules: ['Dashboard', 'Customization', 'Export'],
    },
    contributions: {
      summary:
        'Contributed frontend development from a provided design, focusing on the dashboard, character customization interface, and PNG export workflow.',
      personalWork: [
        'Built the Next.js frontend dashboard and customization controls matching the provided design.',
        'Implemented smooth UI transitions using Framer Motion.',
        'Integrated the high-resolution PNG preview and export workflow.',
      ],
      toolsAndServices: ['Next.js', 'Framer Motion'],
    },
    seo: {
      title: 'Morphix — Case Study | Rimsha Shafique',
      description:
        'Frontend development for Morphix, a 3D character customization studio built with Next.js and Framer Motion.',
    },
  },
  {
    id: 'dev-n-dev',
    number: '03',
    slug: 'dev-n-dev',
    title: 'DevNDev',
    category: 'Client Work',
    role: 'Frontend Developer',
    projectType: 'Agency Website',
    description:
      'A responsive multi-page agency website featuring service and team pages, an animated technology marquee and an interactive testimonial carousel.',
    shortDescription:
      'A responsive multi-page agency website featuring service and team pages, an animated technology marquee and an interactive testimonial carousel.',
    overview:
      'Built the responsive frontend pages, animated technology marquee, and interactive testimonial carousel for a digital agency website.',
    highlights: [
      'Responsive multi-page layout covering service and team pages',
      'Animated technology marquee across viewports',
      'Interactive testimonial carousel with smooth motion',
    ],
    technologies: ['Next.js', 'Responsive UI', 'Animations'],
    featured: false,
    hasCaseStudy: true,
    layoutVariant: 'image-left',
    image: '/assets/aistudio/devndev_d51f9392.png',
    imageAlt:
      'DevNDev agency website hero section featuring navigation, value proposition, call-to-action buttons, and technology marquee',
    liveUrl: 'https://dev-n-dev-work.vercel.app/',
    thumbnail: {
      src: '/assets/aistudio/devndev_d51f9392.png',
      alt: 'DevNDev agency website hero section featuring navigation, value proposition, call-to-action buttons, and technology marquee',
      placeholderLabel: 'DevNDev',
      placeholderSublabel: 'Multi-Page Agency Website & Interactive UI',
      placeholderModules: ['Service Pages', 'Tech Marquee', 'Testimonials'],
    },
    heroImage: {
      src: '/assets/aistudio/devndev_d51f9392.png',
      alt: 'DevNDev agency website hero section featuring navigation, value proposition, call-to-action buttons, and technology marquee',
      placeholderLabel: 'DevNDev',
      placeholderSublabel: 'Responsive Agency Website & Animations',
      placeholderModules: ['Multi-Page UI', 'Marquee', 'Carousel'],
    },
    contributions: {
      summary:
        'Built the website frontend, implemented responsive layouts across devices, and added UI animations.',
      personalWork: [
        'Implemented responsive service and team pages in Next.js.',
        'Built the animated technology marquee and interactive testimonial carousel.',
      ],
      toolsAndServices: ['Next.js', 'Responsive UI', 'Animations'],
    },
    seo: {
      title: 'DevNDev — Case Study | Rimsha Shafique',
      description:
        'Frontend implementation for the DevNDev responsive multi-page agency website built with Next.js.',
    },
  },
  {
    id: 'unflappable',
    number: '04',
    slug: 'unflappable',
    title: 'Unflappable',
    category: 'Professional Work',
    organization: 'Alpha Hive AI',
    role: 'Backend Developer',
    projectType: 'iOS App Backend',
    description:
      'An iOS habit-tracking app that helps users manage daily missions, track completed tasks, build streaks and review weekly progress.',
    shortDescription:
      'An iOS habit-tracking app that helps users manage daily missions, track completed tasks, build streaks and review weekly progress.',
    overview:
      'Built backend services for user authentication, daily missions, streak tracking, weekly progress summaries, push notifications, and collaborative Pro/free plan management.',
    highlights: [
      'Email OTP and Apple Sign-In authentication',
      'Daily mission, streak-tracking, and weekly progress APIs',
      'Firebase Cloud Messaging push notifications',
      'Apple In-App Purchase and Pro/free plan management with a teammate',
    ],
    technologies: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'Firebase Cloud Messaging',
      'Apple Sign-In',
      'Apple In-App Purchases',
    ],
    featured: false,
    hasCaseStudy: true,
    layoutVariant: 'image-right',
    image: undefined,
    imageAlt: 'Unflappable iOS habit-tracking backend architecture summary',
    thumbnail: {
      alt: 'Unflappable iOS habit-tracking backend architecture summary',
      placeholderLabel: 'Unflappable',
      placeholderSublabel: 'Habit Tracking Backend · Alpha Hive AI',
      placeholderModules: ['Auth & OTP', 'Streaks', 'FCM & IAP'],
    },
    heroImage: {
      alt: 'Unflappable backend services overview',
      placeholderLabel: 'Unflappable',
      placeholderSublabel: 'Modular Node.js & MongoDB Backend Services',
      placeholderModules: ['Controllers', 'Services', 'Notifications'],
    },
    contributions: {
      summary:
        'Developed modular backend controllers and services in Node.js, Express.js, and MongoDB.',
      personalWork: [
        'Email OTP and Apple Sign-In authentication.',
        'Daily mission and streak-tracking functionality.',
        'Weekly progress functionality.',
        'Firebase push notifications.',
        'Apple In-App Purchase and Pro/free plan management, working collaboratively with another developer.',
        'Modular backend structure using controllers and services.',
      ],
      toolsAndServices: [
        'Node.js',
        'Express.js',
        'MongoDB',
        'Firebase Cloud Messaging',
        'Apple Sign-In',
        'Apple In-App Purchases',
      ],
    },
    seo: {
      title: 'Unflappable — Work Summary | Rimsha Shafique',
      description:
        'Backend engineering contributions on Unflappable at Alpha Hive AI using Node.js, Express.js, MongoDB, Firebase Cloud Messaging, Apple Sign-In, and Apple In-App Purchases.',
    },
  },
  {
    id: 'rent-ai',
    number: '05',
    slug: 'rent-ai',
    title: 'Rent AI',
    category: 'Professional Work',
    organization: 'Alpha Hive AI',
    role: 'Frontend & Backend Contributions',
    projectType: 'Property Management Platform',
    description:
      'A property-management platform with separate dashboards for property owners and tenants to manage properties and access rental information.',
    shortDescription:
      'A property-management platform with separate dashboards for property owners and tenants to manage properties and access rental information.',
    overview:
      'Handled independent frontend development for property-owner and tenant dashboards while collaborating with another team member on backend authentication and Role-Based Access Control.',
    highlights: [
      'Independent frontend development across owner and tenant dashboards',
      'Collaborative backend development with another team member',
      'Email and Google authentication with Role-Based Access Control (RBAC)',
    ],
    technologies: ['Next.js', 'Node.js', 'MongoDB'],
    featured: false,
    hasCaseStudy: true,
    layoutVariant: 'image-left',
    image: undefined,
    imageAlt: 'Rent AI property-management platform preview',
    thumbnail: {
      alt: 'Rent AI property-management platform preview',
      placeholderLabel: 'Rent AI',
      placeholderSublabel: 'Owner & Tenant Dashboards · Alpha Hive AI',
      placeholderModules: ['Owner Portal', 'Tenant Portal', 'RBAC'],
    },
    heroImage: {
      alt: 'Rent AI platform overview',
      placeholderLabel: 'Rent AI',
      placeholderSublabel: 'Property Management Dashboards & RBAC',
      placeholderModules: ['Next.js UI', 'Auth', 'MongoDB'],
    },
    contributions: {
      summary:
        'Led frontend implementation independently while collaborating on backend services with a teammate.',
      personalWork: [
        'Independent frontend development.',
        'Separate property-owner and tenant dashboard experiences.',
        'Collaborative backend development with another team member.',
        'Email and Google authentication.',
        'Role-Based Access Control (RBAC).',
      ],
      toolsAndServices: ['Next.js', 'Node.js', 'MongoDB'],
    },
    seo: {
      title: 'Rent AI — Work Summary | Rimsha Shafique',
      description:
        'Frontend and collaborative backend contributions on Rent AI at Alpha Hive AI using Next.js, Node.js, and MongoDB.',
    },
  },
  {
    id: 'talktype-ai',
    number: '06',
    slug: 'talktype-ai',
    title: 'TalkType AI',
    category: 'Professional Work',
    organization: 'Alpha Hive AI',
    role: 'Full-Stack Developer',
    projectType: 'AI Transcription SaaS',
    description:
      'An AI-powered audio transcription platform that converts uploaded recordings into multilingual text using OpenAI Whisper, with Stripe-powered paid access.',
    shortDescription:
      'An AI-powered audio transcription platform that converts uploaded recordings into multilingual text using OpenAI Whisper, with Stripe-powered paid access.',
    overview:
      'Independently built the frontend and backend workflows for audio upload, multilingual transcription via OpenAI Whisper API, and Stripe-powered paid access.',
    highlights: [
      'Independent frontend and backend development',
      'Audio upload and multilingual transcription workflow',
      'OpenAI Whisper API and Stripe paid-access integration',
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'OpenAI Whisper API', 'Stripe'],
    featured: false,
    hasCaseStudy: true,
    layoutVariant: 'image-right',
    image: undefined,
    imageAlt: 'TalkType AI audio transcription platform preview',
    thumbnail: {
      alt: 'TalkType AI audio transcription platform preview',
      placeholderLabel: 'TalkType AI',
      placeholderSublabel: 'Multilingual Transcription · Alpha Hive AI',
      placeholderModules: ['Audio Upload', 'Whisper API', 'Stripe Access'],
    },
    heroImage: {
      alt: 'TalkType AI platform overview',
      placeholderLabel: 'TalkType AI',
      placeholderSublabel: 'Audio Transcription & Paid Access',
      placeholderModules: ['React UI', 'Express API', 'Whisper'],
    },
    contributions: {
      summary:
        'Handled independent frontend and backend development for audio transcription and paid access.',
      personalWork: [
        'Independent frontend and backend development.',
        'Audio upload and transcription workflow.',
        'OpenAI Whisper API integration.',
        'Stripe integration for paid subscriptions.',
      ],
      toolsAndServices: ['React', 'Node.js', 'Express.js', 'OpenAI Whisper API', 'Stripe'],
    },
    seo: {
      title: 'TalkType AI — Work Summary | Rimsha Shafique',
      description:
        'Full-stack development on TalkType AI at Alpha Hive AI using React, Node.js, Express.js, OpenAI Whisper API, and Stripe.',
    },
  },
  {
    id: 'task-marketplace',
    number: '07',
    slug: 'task-marketplace',
    title: 'Task Marketplace',
    category: 'Professional Work',
    organization: 'Alpha Hive AI',
    role: 'Full-Stack Developer',
    projectType: 'Time-Limited Task Platform',
    description:
      'A marketplace where users can publish tasks for a limited period and connect with people interested in completing them.',
    shortDescription:
      'A marketplace where users can publish tasks for a limited period and connect with people interested in completing them.',
    overview:
      'Developed full-stack features covering task publishing, time-limited expiration workflows, role-based access control, real-time messaging and notifications, multilingual translation, and Stripe payments for platform task-posting access.',
    highlights: [
      'Task posting, management, and time-limited expiration workflows',
      'Role-based access control and multilingual translation',
      'Real-time messaging and notifications via Socket.IO',
      'Stripe integration for payments required to publish tasks',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Socket.IO',
      'Stripe',
    ],
    featured: false,
    hasCaseStudy: true,
    layoutVariant: 'image-left',
    image: undefined,
    imageAlt: 'Task Marketplace platform summary',
    thumbnail: {
      alt: 'Task Marketplace platform summary',
      placeholderLabel: 'Task Marketplace',
      placeholderSublabel: 'Time-Limited Tasks & Real-Time Messaging',
      placeholderModules: ['Task Expiry', 'Socket.IO', 'Posting Access'],
    },
    heroImage: {
      alt: 'Task Marketplace platform overview',
      placeholderLabel: 'Task Marketplace',
      placeholderSublabel: 'Task Publishing, Messaging & Access Control',
      placeholderModules: ['RBAC', 'Real-Time Chat', 'Stripe'],
    },
    contributions: {
      summary:
        'Built full-stack task-publishing, real-time communication, localization, and platform posting payment workflows.',
      personalWork: [
        'Task posting and management functionality.',
        'Role-based access control.',
        'Real-time messaging and notifications.',
        'Multilingual translation functionality.',
        'Task expiration workflows.',
        'Stripe integration for payments required to publish tasks.',
      ],
      toolsAndServices: [
        'React',
        'TypeScript',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Socket.IO',
        'Stripe',
      ],
    },
    seo: {
      title: 'Task Marketplace — Work Summary | Rimsha Shafique',
      description:
        'Full-stack development on an anonymized task-publishing marketplace using React, TypeScript, Node.js, Express.js, MongoDB, Socket.IO, and Stripe.',
    },
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: ProjectItem | null;
  next: ProjectItem | null;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };

  const previous = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const next = index < projects.length - 1 ? projects[index + 1] : projects[0];

  return {
    previous: projects.length > 1 ? previous : null,
    next: projects.length > 1 ? next : null,
  };
}
