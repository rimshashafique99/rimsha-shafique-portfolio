import { ArrowUpRight, BookOpen, Github } from 'lucide-react';
import { ProjectItem } from '@/src/data/projects';
import { ProjectPreview } from '@/src/components/projects/ProjectPreview';
import { isValidExternalUrl } from '@/src/lib/utils';

interface ProjectCardProps {
  project: ProjectItem;
  variant?: 'featured' | 'compact';
  onNavigateToCaseStudy?: (slug: string) => void;
}

const primaryActionClass =
  'inline-flex min-h-[40px] sm:min-h-0 sm:h-9 items-center justify-center gap-1.5 rounded-[9px] bg-[#F04B1A] hover:bg-[#D93E10] px-3.5 text-xs sm:text-[13px] font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0';

const secondaryActionClass =
  'inline-flex min-h-[40px] sm:min-h-0 sm:h-9 items-center justify-center gap-1.5 rounded-[9px] bg-[#F4F3F0] hover:bg-[#ECEAE4] border border-[#E5E3DF] hover:border-[#111111]/25 px-3.5 text-xs sm:text-[13px] font-medium text-[#111111] transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0';

export function ProjectCard({
  project,
  variant = 'compact',
  onNavigateToCaseStudy,
}: ProjectCardProps) {
  const isFeatured = variant === 'featured';
  const liveUrl = isValidExternalUrl(project.liveUrl) ? project.liveUrl : undefined;
  const frontendRepo = isValidExternalUrl(project.frontendRepo) ? project.frontendRepo : undefined;
  const backendRepo = isValidExternalUrl(project.backendRepo) ? project.backendRepo : undefined;
  const githubUrl = isValidExternalUrl(project.githubUrl) ? project.githubUrl : undefined;

  const hasAnyLink = Boolean(liveUrl || frontendRepo || backendRepo || githubUrl);
  const categoryLabel = project.organization
    ? `${project.category} · ${project.organization}`
    : project.category;

  const imageSrc = project.image || project.thumbnail.src;

  if (isFeatured) {
    return (
      <article className="gsap-project-card group rounded-[28px] bg-[#FFFFFF] border border-[#E5E3DF] p-5 sm:p-7 lg:p-10 transition-colors duration-200 hover:border-[#111111]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-11 items-center">
          {/* Primary Screenshot Visual */}
          <div className="lg:col-span-7 overflow-hidden rounded-[18px]">
            <div className="gsap-project-media">
              <ProjectPreview
                number={project.number}
                title={project.title}
                image={imageSrc}
                imageAlt={project.imageAlt}
                variant="featured"
              />
            </div>
          </div>

          {/* Editorial Project Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div className="gsap-project-text flex flex-wrap items-center gap-2.5">
                <span className="font-display text-xs font-bold text-[#F04B1A] tabular-nums">
                  {project.number}
                </span>
                <span className="h-px w-5 bg-[#E5E3DF]" aria-hidden="true" />
                <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#666666]">
                  {categoryLabel}
                </span>
              </div>

              <h3 className="gsap-project-text font-display text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#111111] tracking-tight leading-[1.12]">
                {project.title}
              </h3>

              <p className="gsap-project-text text-sm sm:text-base text-[#555555] leading-relaxed">
                {project.description}
              </p>

              <p className="gsap-project-text text-xs sm:text-sm text-[#666666] pt-1">
                <span className="font-medium text-[#111111]">Role:</span> {project.role}
              </p>
            </div>

            <div className="gsap-project-text pt-4 border-t border-[#E5E3DF] space-y-4">
              <ul
                aria-label={`${project.title} technologies`}
                className="flex flex-wrap gap-1.5 list-none m-0 p-0"
              >
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md bg-[#F4F3F0] px-2.5 py-1 text-[11px] sm:text-xs font-medium text-[#222222]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {(hasAnyLink || (onNavigateToCaseStudy && project.id === 'ai-job-copilot')) && (
                <div className="flex flex-wrap items-center gap-2.5 pt-3">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={primaryActionClass}
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  )}

                  {onNavigateToCaseStudy && project.id === 'ai-job-copilot' && (
                    <a
                      href="/projects/ai-job-copilot"
                      onClick={(e) => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                        e.preventDefault();
                        onNavigateToCaseStudy(project.slug);
                      }}
                      className={secondaryActionClass}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#F04B1A] shrink-0" aria-hidden="true" />
                      <span>View Case Study</span>
                    </a>
                  )}

                  {frontendRepo && (
                    <a
                      href={frontendRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={secondaryActionClass}
                    >
                      <Github className="w-3.5 h-3.5 text-[#555555] shrink-0" aria-hidden="true" />
                      <span>Frontend Code</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-[#666666] shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  )}

                  {backendRepo && (
                    <a
                      href={backendRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={secondaryActionClass}
                    >
                      <Github className="w-3.5 h-3.5 text-[#555555] shrink-0" aria-hidden="true" />
                      <span>Backend Code</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-[#666666] shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="gsap-project-card group rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] p-5 sm:p-7 flex flex-col justify-between gap-5 transition-colors duration-200 hover:border-[#111111]/20">
      <div className="space-y-5">
        {imageSrc && (
          <div className="overflow-hidden rounded-[18px]">
            <div className="gsap-project-media">
              <ProjectPreview
                number={project.number}
                title={project.title}
                image={imageSrc}
                imageAlt={project.imageAlt}
                variant="compact"
              />
            </div>
          </div>
        )}

        {/* Project Metadata & Description */}
        <div className="space-y-2.5">
          <div className="gsap-project-text flex flex-wrap items-center gap-2">
            <span className="font-display text-xs font-bold text-[#F04B1A] tabular-nums">
              {project.number}
            </span>
            <span className="h-px w-4 bg-[#E5E3DF]" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-[0.07em] uppercase text-[#666666]">
              {categoryLabel}
            </span>
          </div>

          <h3 className="gsap-project-text font-display text-xl sm:text-2xl font-bold text-[#111111] tracking-tight leading-snug">
            {project.title}
          </h3>

          <p className="gsap-project-text text-sm text-[#555555] leading-relaxed">
            {project.description}
          </p>

          <p className="gsap-project-text text-xs sm:text-[13px] text-[#666666] pt-0.5">
            <span className="font-medium text-[#111111]">Role:</span> {project.role}
          </p>
        </div>
      </div>

      {/* Bottom Technologies & Conditional External Links */}
      <div className="gsap-project-text pt-4 border-t border-[#E5E3DF] space-y-3.5">
        <ul
          aria-label={`${project.title} technologies`}
          className="flex flex-wrap gap-1.5 list-none m-0 p-0"
        >
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-[#F4F3F0] px-2.5 py-1 text-[11px] font-medium text-[#222222]"
            >
              {tech}
            </li>
          ))}
        </ul>

        {hasAnyLink && (
          <div className="flex flex-wrap items-center gap-2.5 pt-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryActionClass}
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryActionClass}
              >
                <Github className="w-3.5 h-3.5 text-[#555555] shrink-0" aria-hidden="true" />
                <span>GitHub Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#666666] shrink-0" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
