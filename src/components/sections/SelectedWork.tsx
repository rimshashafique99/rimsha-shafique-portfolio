import { projects } from '@/src/data/projects';
import { ProjectCard } from '@/src/components/projects/ProjectCard';

interface SelectedWorkProps {
  onNavigateToCaseStudy?: (slug: string) => void;
}

export function SelectedWork({ onNavigateToCaseStudy }: SelectedWorkProps) {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const remainingProjects = projects.filter((project) => project.id !== featuredProject?.id);

  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-[680px] mb-12 sm:mb-14 space-y-4">
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#F04B1A]">
            SELECTED WORK
          </p>
          <h2
            id="selected-work-heading"
            className="font-display type-section-title font-bold text-[#111111] text-balance"
          >
            A Selection of Things I&apos;ve Built.
          </h2>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            From production applications and client projects to products I&apos;ve built
            independently, here&apos;s a look at some of the work I&apos;ve contributed to.
          </p>
        </div>

        <div className="space-y-7 sm:space-y-9">
          {featuredProject && (
            <ProjectCard
              project={featuredProject}
              variant="featured"
              onNavigateToCaseStudy={onNavigateToCaseStudy}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
            {remainingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
