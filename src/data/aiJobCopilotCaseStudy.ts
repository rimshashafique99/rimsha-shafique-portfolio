export interface CaseStudyScreenshotSlot {
  id:
    | 'main-dashboard'
    | 'job-analysis'
    | 'ai-results'
    | 'application-tracker'
    | 'new-application'
    | 'profile-settings';
  label: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  orientation?: 'wide' | 'tall';
}

export const aiJobCopilotCaseStudy = {
  seo: {
    title: 'AI Job Copilot Case Study | Rimsha Shafique',
    description:
      'Explore how Rimsha Shafique independently built AI Job Copilot, a full-stack AI-powered job search assistant using React, TypeScript, Node.js, PostgreSQL and Groq API.',
    path: '/projects/ai-job-copilot',
  },
  hero: {
    eyebrow: 'PERSONAL PROJECT · FULL-STACK DEVELOPMENT',
    title: 'AI Job Copilot',
    subtitle: 'An AI-powered assistant for a more structured job search.',
    description:
      "AI Job Copilot helps job seekers tailor their applications by analyzing resumes and job descriptions, generating personalized cover letters, identifying role-fit gaps and suggesting CV improvements — all while keeping applications organized in one dashboard.",
    metadata: [
      { label: 'Role', value: 'Independent Full-Stack Developer' },
      { label: 'Type', value: 'Personal Project' },
      { label: 'Focus', value: 'Full-Stack Development · AI Integration' },
      { label: 'Technology Highlights', value: 'React · TypeScript · Node.js · PostgreSQL · Groq API' },
    ],
    links: {
      liveDemo: 'https://ai-job-copilot-red.vercel.app/',
      frontendRepo: 'https://github.com/rimshashafique99/ai-job-copilot',
      backendRepo: 'https://github.com/rimshashafique99/ai-job-copilot-backend',
    },
  },
  screenshots: {
    hero: {
      id: 'main-dashboard',
      label: '01 · Dashboard',
      title: 'Main Dashboard',
      caption: 'Central overview displaying application status counts alongside shortcuts to launch job analysis or open the pipeline tracker.',
      src: '/assets/aistudio/Screenshot_2026-11-19_184241_4e343ee9.png',
      alt: 'AI Job Copilot main dashboard showing application summary cards and shortcuts to Analyze a New Job and View Tracker',
      orientation: 'wide',
    } as CaseStudyScreenshotSlot,
    workflow: [
      {
        id: 'job-analysis',
        label: '02 · Job Analysis',
        title: 'Job Analysis Input Workspace',
        caption: 'Structured form capturing company name, target role, and job description alongside four dedicated AI output panels.',
        src: '/assets/aistudio/Screenshot_2026-11-19_184259_d7d0a9a9.png',
        alt: 'AI Job Copilot job analysis page with inputs for company name, role title, and job description next to Cover Letter, Cold Email, Gap Analysis, and CV Bullets cards',
        orientation: 'wide',
      },
      {
        id: 'ai-results',
        label: '03 · AI-Generated Results',
        title: 'Tailored Outputs & Gap Analysis',
        caption: 'Generated cover letter, cold email, severity-tagged skill-gap analysis, and tailored CV bullet suggestions produced from the job context.',
        src: '/assets/aistudio/ai-job-copilot-red.vercel.app_analyze_cc2318b8-72e3-47a5-bb9f-e3259b922d18_a9fb85c6.png',
        alt: 'AI Job Copilot full analysis results view showing a generated cover letter, cold email draft, role-fit gap analysis, and CV bullet improvements',
        orientation: 'tall',
      },
    ] as CaseStudyScreenshotSlot[],
    tracking: [
      {
        id: 'application-tracker',
        label: '04 · Application Tracker',
        title: 'Kanban Application Pipeline',
        caption: 'Interactive Kanban pipeline organizing tracked roles across Applied, Interviewing, Offer, and Rejected stages.',
        src: '/assets/aistudio/Screenshot_2026-11-19_184314_60a394ac.png',
        alt: 'AI Job Copilot Kanban application pipeline displaying job cards organized across Applied, Interviewing, Offer, and Rejected columns',
        orientation: 'wide',
      },
      {
        id: 'new-application',
        label: '05 · New Application',
        title: 'Add Application Modal',
        caption: 'Quick modal workflow to log a new opportunity with role, company, current stage, optional tag, and job posting URL.',
        src: '/assets/aistudio/Screenshot_2026-11-19_184326_7801cdae.png',
        alt: 'AI Job Copilot New Application modal overlay with fields for role, company, stage selector, optional tag, and job posting link',
        orientation: 'wide',
      },
    ] as CaseStudyScreenshotSlot[],
    profile: {
      id: 'profile-settings',
      label: '06 · Profile Settings',
      title: 'Profile & CV Management',
      caption: 'Account workspace for updating personal summary, target role, and uploaded CV used as context during AI job analysis.',
      src: '/assets/aistudio/Screenshot_2026-11-19_184339_4c45f631.png',
      alt: 'AI Job Copilot profile settings page displaying personal information fields, professional summary, and CV upload or download controls',
      orientation: 'wide',
    } as CaseStudyScreenshotSlot,
  },
  overview: {
    heading: 'A More Structured Way to Approach Job Applications.',
    paragraphs: [
      'Applying for jobs involves more than submitting a resume. Each opportunity requires understanding the job description, identifying relevant skills, tailoring application materials and keeping track of progress.',
      'I built AI Job Copilot to bring these activities together in one application.',
      'Users can upload their resumes, provide job descriptions and use AI-generated insights to prepare more relevant applications. A unified dashboard helps them keep track of their job-search activity.',
    ],
  },
  problem: {
    heading: 'Job Applications Involve a Lot of Repetitive Work.',
    paragraphs: [
      'Every job opportunity comes with a different set of requirements. Candidates often need to review the description, compare it with their experience, update their resume and prepare a relevant cover letter.',
      'Managing these tasks across multiple opportunities can become difficult.',
      'I wanted to build a tool that could make this process more organized and help users prepare applications with better context.',
    ],
  },
  solution: {
    heading: 'Bringing Resume Analysis, AI Assistance and Application Tracking Together.',
    paragraphs: [
      'AI Job Copilot combines resume processing, job-description context and LLM-powered generation into a single workflow.',
      "Instead of generating generic content, the application uses the user's resume and the target job description together to produce more relevant suggestions.",
    ],
    workflowSteps: [
      'Resume Upload',
      'PDF Processing',
      'Job Description Context',
      'AI Analysis',
      'Structured Results',
      'Application Tracking',
    ],
  },
  features: [
    {
      number: '01',
      id: 'resume-upload',
      title: 'Resume Upload & Processing',
      description:
        'Users can upload PDF resumes. The application validates and processes the files to extract resume content for analysis.',
    },
    {
      number: '02',
      id: 'cover-letters',
      title: 'AI-Generated Cover Letters',
      description:
        'Combines resume information with job-description context to generate tailored cover letters using the Groq API.',
    },
    {
      number: '03',
      id: 'gap-analysis',
      title: 'Role-Fit Gap Analysis',
      description:
        "Helps identify gaps between the user's existing experience and the requirements of a target position.",
    },
    {
      number: '04',
      id: 'cv-bullets',
      title: 'CV Bullet Suggestions',
      description:
        'Generates suggestions for improving resume bullet points based on the target job description.',
    },
    {
      number: '05',
      id: 'application-tracking',
      title: 'Application Tracking',
      description:
        'Provides a centralized dashboard for organizing and tracking job applications and their associated AI-generated results.',
    },
  ],
  architecture: {
    heading: 'Building the Application from Frontend to Backend.',
    intro:
      'I developed AI Job Copilot independently, working across the frontend, backend, database, authentication, AI integration, testing and deployment.',
    areas: [
      {
        title: 'Frontend Development',
        description:
          'Built the application interface using React and TypeScript, with Tailwind CSS for styling. Developed the dashboard and user workflows for resume uploads, AI-generated results and application tracking.',
      },
      {
        title: 'Backend Development',
        description:
          'Developed backend APIs using Node.js and Express.js to handle authentication, resume processing, AI requests, application data and frontend communication.',
      },
      {
        title: 'Database & Authentication',
        description:
          'Used PostgreSQL for structured application data and implemented Google OAuth, email OTP and JWT-based authentication. Cloudinary was used for resume file storage.',
      },
      {
        title: 'AI Integration',
        description:
          'Integrated the Groq API to process resume and job-description context and generate cover letters, role-fit analysis and CV improvement suggestions.',
      },
    ],
  },
  challenges: {
    heading: 'Making AI Output Useful and Consistent.',
    items: [
      {
        number: 'Challenge 01',
        title: 'Inconsistent LLM Responses',
        challenge:
          'LLM-generated responses can vary in structure, making them difficult to process reliably in an application.',
        approach:
          'I implemented output validation and cleanup against a predictable schema so the frontend could work with consistent structured results.',
      },
      {
        number: 'Challenge 02',
        title: 'Resume PDF Processing',
        challenge:
          'Before analyzing a resume, the application needed to extract and prepare its content.',
        approach:
          'I implemented PDF validation and parsing workflows to process uploaded resumes and prepare their content for AI analysis.',
      },
    ],
  },
  testingDeployment: {
    heading: 'Testing Beyond the Happy Path.',
    intro:
      'I added automated testing and a deployment workflow to improve application reliability and make updates easier to deliver. The project includes both frontend component tests and backend API tests.',
    tools: [
      { name: 'Vitest', role: 'Component and unit testing.' },
      { name: 'React Testing Library', role: 'Frontend component testing.' },
      { name: 'Supertest', role: 'Backend API testing.' },
      { name: 'GitHub Actions', role: 'CI/CD automation.' },
      { name: 'Vercel', role: 'Application deployment.' },
    ],
  },
  techStack: [
    { category: 'Frontend', items: 'React, TypeScript, Tailwind CSS' },
    { category: 'Backend', items: 'Node.js, Express.js' },
    { category: 'Database', items: 'PostgreSQL' },
    { category: 'AI', items: 'Groq API' },
    { category: 'Authentication', items: 'Google OAuth, Email OTP, JWT' },
    { category: 'File Storage', items: 'Cloudinary' },
    { category: 'Testing', items: 'Vitest, React Testing Library, Supertest' },
    { category: 'CI/CD & Deployment', items: 'GitHub Actions, Vercel' },
  ],
  reflection: {
    heading: 'What I Learned Building AI Job Copilot.',
    paragraphs: [
      'Building AI Job Copilot independently gave me the opportunity to bring together different areas of full-stack development in one working product.',
      'I gained practical experience integrating LLM APIs into real application workflows, processing uploaded documents, validating AI-generated output, implementing authentication and writing automated tests.',
      'Most importantly, it helped me understand that useful AI applications require more than connecting an API. They need reliable data handling, predictable outputs and a thoughtful user experience.',
    ],
  },
};
