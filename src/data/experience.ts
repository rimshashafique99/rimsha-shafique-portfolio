export interface ExperienceItem {
  id: string;
  type: 'experience' | 'education';
  period: string;
  title: string;
  organization: string;
  location?: string;
  featured?: boolean;
  description?: string;
  responsibilities: string[];
}

export const journeyItems: ExperienceItem[] = [
  {
    id: 'alpha-hive-ai',
    type: 'experience',
    featured: true,
    period: 'June 2025 – May 2026',
    title: 'Full Stack Developer',
    organization: 'Alpha Hive AI',
    location: 'Islamabad, Pakistan (Remote)',
    responsibilities: [
      'Contributed to the development and maintenance of production SaaS applications across frontend and backend systems.',
      'Built responsive user interfaces and reusable components using React, Next.js and TypeScript.',
      'Developed backend services and REST APIs using Node.js and Express, working with MongoDB and integrating third-party services.',
      'Implemented application functionality involving authentication, role-based access control, payment integrations and real-time communication.',
      'Supported the product lifecycle through feature development, debugging, testing and deployment coordination.',
    ],
  },
  {
    id: 'octathorn-technologies',
    type: 'experience',
    period: 'July 2024 – August 2024',
    title: 'MERN Stack Developer Intern',
    organization: 'Octathorn Technologies',
    location: 'Islamabad, Pakistan (On-site)',
    responsibilities: [
      'Developed full-stack application features using MongoDB, Express.js, React and Node.js.',
      'Worked with Socket.IO and WebRTC to implement real-time communication functionality.',
      'Gained practical experience in API integration, frontend-backend communication and collaborative software development.',
    ],
  },
  {
    id: 'echo-technologies',
    type: 'experience',
    period: 'February 2023 – July 2023',
    title: 'WordPress Developer',
    organization: 'Echo Technologies',
    location: 'Islamabad, Pakistan (Remote)',
    responsibilities: [
      'Developed and customized WordPress websites using custom themes and plugins based on project requirements.',
      'Created responsive page layouts and tailored website functionality to meet client needs.',
      'Improved website performance through caching, image optimization and debugging.',
    ],
  },
  {
    id: 'cust-islamabad',
    type: 'education',
    period: '2019 – 2023',
    title: 'Bachelor of Science in Computer Science (BSCS)',
    organization: 'Capital University of Science and Technology (CUST)',
    location: 'Islamabad, Pakistan',
    responsibilities: [],
  },
];
