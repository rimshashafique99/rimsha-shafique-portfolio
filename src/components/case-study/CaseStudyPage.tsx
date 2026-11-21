import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft } from 'lucide-react';
import { getAdjacentProjects, getProjectBySlug } from '@/src/data/projects';
import { CaseStudyHero } from './CaseStudyHero';
import { ProjectLinks } from './ProjectLinks';
import { ContextSection } from './ContextSection';
import { ProblemSection } from './ProblemSection';
import { RoleSection } from './RoleSection';
import { EngineeringDecisions } from './EngineeringDecisions';
import { SolutionGallery } from './SolutionGallery';
import { ResultsSection } from './ResultsSection';
import { NextSteps } from './NextSteps';
import { ProjectNavigation } from './ProjectNavigation';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CaseStudyPageProps {
  slug: string;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateProject: (slug: string) => void;
}

const DEFAULT_TITLE = 'Rimsha Shafique — Full-Stack Engineer';
const DEFAULT_DESCRIPTION =
  'Portfolio of Rimsha Shafique, a Full-Stack Engineer building modern web applications, SaaS products, and AI-powered solutions.';

export function CaseStudyPage({
  slug,
  onNavigateHome,
  onNavigateProject,
}: CaseStudyPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const project = getProjectBySlug(slug);
  const { previous, next } = getAdjacentProjects(slug);

  // Per-project SEO title & meta description
  useEffect(() => {
    const title = project?.seo?.title ?? `${project?.title ?? 'Case Study'} | Rimsha Shafique`;
    const description = project?.seo?.description ?? project?.shortDescription ?? DEFAULT_DESCRIPTION;

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESCRIPTION);
      if (ogTitle) ogTitle.setAttribute('content', DEFAULT_TITLE);
      if (ogDesc) ogDesc.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [project]);

  useGSAP(
    () => {
      if (!project) return;
      try {
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
          gsap.from('.gsap-cs-hero', {
            y: 18,
            opacity: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          });

          gsap.from('.gsap-cs-media', {
            y: 22,
            opacity: 0,
            duration: 0.65,
            delay: 0.15,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          });

          const sections = gsap.utils.toArray<HTMLElement>('.gsap-cs-section');
          sections.forEach((section) => {
            gsap.from(section, {
              y: 20,
              opacity: 0,
              duration: 0.55,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: section,
                start: 'top 86%',
                once: true,
              },
            });
          });
        });
        return () => mm.revert();
      } catch {
        // Content stays visible if animation initialization fails
      }
    },
    { scope: pageRef, dependencies: [slug] }
  );

  if (!project) {
    return (
      <div className="py-24 px-4 sm:px-6 lg:px-10 text-center">
        <div className="mx-auto max-w-[560px] rounded-[28px] bg-[#FFFFFF] border border-[#E5E3DF] p-8 sm:p-12 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
            404 · Case Study Not Found
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#111111]">
            We couldn&apos;t find that project.
          </h1>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            The requested case study route does not match an active project in this portfolio.
          </p>
          <a
            href="/#work"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome('work');
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#F04B1A] hover:bg-[#D93E10] text-white text-sm font-medium px-6 py-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Selected Work</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} key={project.slug}>
      {/* Section 01: Project Overview / Hero */}
      <CaseStudyHero project={project} onNavigateHome={onNavigateHome} />

      {/* Section 02: Project Links */}
      <ProjectLinks project={project} />

      {/* Section 03: Context */}
      <ContextSection context={project.context} />

      {/* Section 04: Problem */}
      <ProblemSection problem={project.problem} />

      {/* Section 05: My Role */}
      <RoleSection contributions={project.contributions} />

      {/* Section 06: Process & Engineering Decisions */}
      <EngineeringDecisions decisions={project.engineeringDecisions} />

      {/* Section 07: Solution & Implementation */}
      <SolutionGallery projectNumber={project.number} solution={project.solution} />

      {/* Section 08: Results & Impact */}
      <ResultsSection results={project.results} />

      {/* Section 09: What's Next */}
      <NextSteps nextSteps={project.nextSteps} />

      {/* Section 10: Next / Previous Project */}
      <ProjectNavigation
        previousProject={previous}
        nextProject={next}
        onNavigateProject={onNavigateProject}
        onBackToWork={() => onNavigateHome('work')}
      />
    </div>
  );
}
