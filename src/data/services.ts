export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  inquiryTopic: 'product' | 'hiring';
}

export const services: ServiceItem[] = [
  {
    id: 'full-stack-web-development',
    number: '01',
    title: 'Full-Stack Web Application & SaaS Development',
    description:
      'I develop custom web applications and SaaS platforms, combining responsive frontend interfaces, reliable backend systems, databases and third-party integrations to bring your business ideas to life.',
    technologies: ['Custom Web Applications', 'SaaS Development', 'React', 'Next.js', 'Node.js'],
    inquiryTopic: 'product',
  },
  {
    id: 'saas-mvp-development',
    number: '02',
    title: 'MVP Development',
    description:
      'Have an idea for a new product? I help turn it into a functional Minimum Viable Product (MVP) so you can launch faster, test your idea with real users and build on their feedback.',
    technologies: ['MVP Development', 'Product Development', 'Web Application Development'],
    inquiryTopic: 'product',
  },
  {
    id: 'ai-powered-applications',
    number: '03',
    title: 'AI-Powered Application Development',
    description:
      'I build AI-powered web applications by integrating Large Language Models (LLMs) and AI APIs into existing or new products. From document analysis to AI-generated content, I develop practical features that solve real business problems.',
    technologies: [
      'AI Application Development',
      'LLM API Integration',
      'AI Features',
      'Groq',
      'Anthropic',
    ],
    inquiryTopic: 'product',
  },
];
