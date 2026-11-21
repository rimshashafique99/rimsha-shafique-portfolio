# Rimsha Shafique | Full-Stack Software Engineer

Personal portfolio showcasing my experience, projects, and skills building responsive web apps, SaaS products, and AI-powered solutions.

🔗 **Live site:** [rimsha-shafique-portfolio.vercel.app](https://rimsha-shafique-portfolio.vercel.app/)

## Features

- Responsive design for mobile, tablet, and desktop
- Project portfolio with individual case study pages
- Experience, education, and technical skills sections
- Client testimonials
- Contact form with server-side email via Resend
- Resume download
- SEO metadata, sitemap, and robots.txt
- Animated interactions and transitions

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white)

**Also used:** GSAP, Framer Motion, Express, Resend API

## Getting Started

**Prerequisites:** Node.js (LTS), npm, Git

```bash
git clone https://github.com/rimshafique99/rimsha-shafique-portfolio.git
cd rimsha-shafique-portfolio
npm install
cp .env.example .env.local
npm run dev
```

Add your values to `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@example.com
EMAIL_FROM=Rimsha Portfolio <onboarding@resend.dev>
```

> Keep `.env.local` private. Never commit API keys or secrets.

### Scripts

```bash
npm run dev     # Start development server
npm run build   # Create production build
npm run lint    # Run lint checks
```

## Deployment

Deployed on Vercel.

1. Import the repository into Vercel.
2. Add the environment variables above under **Project Settings → Environment Variables**.
3. Deploy, then test the contact form and resume download.

To use a custom sender address, verify your domain in Resend first.

## Project Structure

```text
├── api/            # Serverless API routes
├── public/         # Static assets, resume, SEO files
├── src/
│   ├── components/ # Reusable UI components
│   ├── data/       # Portfolio content and configuration
│   ├── hooks/      # Custom React hooks
│   └── lib/        # Utility functions
├── index.html
├── server.ts
├── vercel.json
└── .env.example
```

## Contact

- **Portfolio:** [https://rimsha-shafique-portfolio.vercel.app/](https://rimsha-shafique-portfolio.vercel.app/)
- **LinkedIn:** [https://linkedin.com/in/rimshashique](https://www.linkedin.com/in/rimshashafique)
- **GitHub:** [https://github.com/rimshafique99](https://github.com/rimshashafique99)
