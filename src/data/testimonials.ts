export interface TestimonialItem {
  id: string;
  slotLabel: string;
  quote: string;
  authorName: string;
  authorRole: string;
  projectName: string;
  projectUrl: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: 'testimonial-faseeh-hayat',
    slotLabel: '01',
    quote:
      "I had the pleasure of working with Rimsha on a web application project, and she consistently demonstrated strong technical expertise and professionalism. She has a solid understanding of modern web technologies including React, Next.js, Node.js, and TypeScript, and she's reliable, detail-oriented, and communicates effectively. She approaches challenges with a problem-solving mindset and delivers high-quality, scalable solutions. I highly recommend her to anyone looking for a skilled Full-Stack Software Engineer.",
    authorName: 'Faseeh Hayat',
    authorRole: 'Full-Stack Developer',
    projectName: 'DevNDev',
    projectUrl: 'https://dev-n-dev-work.vercel.app/',
  },
  {
    id: 'testimonial-muhammad-noman',
    slotLabel: '02',
    quote:
      'Working with Rimsha was an excellent experience. She is a highly dedicated and talented Full Stack Developer who approaches every task with professionalism and precision. Throughout our project, she consistently delivered clean, efficient solutions and collaborated effectively with the team. Her technical skills, reliability, and positive attitude make her someone I would gladly work with again and confidently recommend to any organization or client.',
    authorName: 'Muhammad Noman',
    authorRole: 'UI/UX & Product Designer',
    projectName: 'Morphix',
    projectUrl: 'https://morphix-3d.vercel.app/',
  },
];
