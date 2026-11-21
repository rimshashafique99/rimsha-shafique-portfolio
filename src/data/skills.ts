export interface SkillItem {
  name: string;
  proficiency: 'core' | 'exploring';
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  summary: string;
  items: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    number: '01',
    title: 'Frontend Development',
    summary:
      'Building responsive, user-friendly web interfaces with reusable components and modern JavaScript frameworks.',
    items: [
      { name: 'React', proficiency: 'core' },
      { name: 'Next.js', proficiency: 'core' },
      { name: 'TypeScript', proficiency: 'core' },
      { name: 'JavaScript', proficiency: 'core' },
      { name: 'Tailwind CSS', proficiency: 'core' },
    ],
  },
  {
    id: 'backend',
    number: '02',
    title: 'Backend Development',
    summary:
      'Developing server-side applications, REST APIs, authentication systems and integrations that power web applications.',
    items: [
      { name: 'Node.js', proficiency: 'core' },
      { name: 'Express.js', proficiency: 'core' },
      { name: 'REST APIs', proficiency: 'core' },
      { name: 'Authentication & Authorization', proficiency: 'core' },
      { name: 'Webhooks', proficiency: 'core' },
    ],
  },
  {
    id: 'databases',
    number: '03',
    title: 'Databases',
    summary:
      'Working with relational and document databases to structure, store and manage application data.',
    items: [
      { name: 'PostgreSQL', proficiency: 'core' },
      { name: 'MongoDB', proficiency: 'core' },
      { name: 'Supabase', proficiency: 'core' },
    ],
  },
  {
    id: 'ai-integrations',
    number: '04',
    title: 'AI & API Integrations',
    summary:
      'Integrating large language models and third-party APIs to add practical AI capabilities to web applications.',
    items: [
      { name: 'LLM APIs', proficiency: 'core' },
      { name: 'Groq API', proficiency: 'core' },
      { name: 'Anthropic API', proficiency: 'exploring' },
      { name: 'LangChain', proficiency: 'exploring' },
    ],
  },
  {
    id: 'infrastructure-tools',
    number: '05',
    title: 'Development Tools & Cloud',
    summary:
      'Using development and collaboration tools while expanding my experience with cloud infrastructure and deployment workflows.',
    items: [
      { name: 'Git', proficiency: 'core' },
      { name: 'GitHub', proficiency: 'core' },
      { name: 'Postman', proficiency: 'core' },
      { name: 'Docker', proficiency: 'exploring' },
      { name: 'AWS', proficiency: 'exploring' },
      { name: 'CI/CD', proficiency: 'exploring' },
    ],
  },
];
