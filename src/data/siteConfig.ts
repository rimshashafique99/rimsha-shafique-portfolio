export interface NavItem {
  id: string;
  label: string;
}

export interface SiteConfig {
  brandName: string;
  fullName: string;
  roleTitle: string;
  location: string;
  heroPill: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroDescription: string;
  heroTechLabels: string[];
  contact: {
    email: string;
    linkedinUrl: string;
    githubUrl: string;
    instagramUrl: string;
    upworkUrl: string;
    resumeUrl: string;
  };
  navItems: NavItem[];
}

export const siteConfig: SiteConfig = {
  brandName: 'Rimsha Shafique.',
  fullName: 'Rimsha Shafique',
  roleTitle: 'Full-Stack Engineer',
  location: 'Islamabad, Pakistan',
  heroPill: 'FULL-STACK SOFTWARE ENGINEER',
  heroHeadlineLine1: 'I Build Web Applications',
  heroHeadlineLine2: 'That Solve Real Business Problems.',
  heroDescription:
    'I help startups, founders, agencies and growing businesses turn ideas into reliable web applications, SaaS products and AI-powered solutions from frontend experiences to backend systems and integrations.',
  heroTechLabels: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'shadcn/ui',
    'Node.js',
    'Express.js',
    'REST APIs',
    'Socket.IO',
    'MongoDB',
    'PostgreSQL',
    'Supabase',
    'LLM APIs',
    'Groq API',
    'Anthropic API',
    'LangChain',
    'Git',
    'GitHub',
    'Postman',
    'Docker',
    'AWS',
    'Vercel',
  ],
  contact: {
    // Configure contact details via environment variables or update these fields before deployment.
    email: import.meta.env.VITE_CONTACT_EMAIL || 'rimshashafique1997@gmail.com',
    linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/rimshashafique',
    githubUrl: import.meta.env.VITE_GITHUB_URL || 'https://github.com/rimshashafique99',
    instagramUrl:
      import.meta.env.VITE_INSTAGRAM_URL ||
      'https://www.instagram.com/rimshashafique.dev?knvt=Nzk5Ymhna215YnVk&utm_source=qr',
    upworkUrl:
      import.meta.env.VITE_UPWORK_URL ||
      'https://www.upwork.com/freelancers/~0155834588a792aa87',
    resumeUrl: import.meta.env.VITE_RESUME_URL || '/Rimsha-Shafique-Resume.pdf',
  },
  navItems: [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],
};
