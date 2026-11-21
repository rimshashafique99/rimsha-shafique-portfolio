import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ProjectItem } from '@/src/data/projects';
import { ProjectPlaceholder } from '@/src/components/ui/PlaceholderVisual';
import { getWebpSibling } from '@/src/lib/utils';

interface CaseStudyHeroProps {
  project: ProjectItem;
  onNavigateHome: (sectionId?: string) => void;
}

export function CaseStudyHero({ project, onNavigateHome }: CaseStudyHeroProps) {
  const heroMedia = project.heroImage;

  return (
    <section
      aria-labelledby="case-study-title"
      className="pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-[1160px] space-y-8 sm:space-y-10">
        {/* Top Breadcrumbs & Back Link */}
        <div className="gsap-cs-hero flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm text-[#666666]">
            <a
              href="/"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                onNavigateHome('home');
              }}
              className="hover:text-[#111111] transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <a
              href="/#work"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                onNavigateHome('work');
              }}
              className="hover:text-[#111111] transition-colors"
            >
              Work
            </a>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="text-[#111111] font-medium truncate max-w-[200px] sm:max-w-none">
              {project.title}
            </span>
          </nav>

          <a
            href="/#work"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              onNavigateHome('work');
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#111111] hover:text-[#F04B1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Selected Work</span>
          </a>
        </div>

        {/* Title & Key Metadata */}
        <div className="space-y-6">
          <div className="gsap-cs-hero flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#666666]">
            <span className="text-[#F04B1A] tabular-nums">{project.number}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.role}</span>
          </div>

          <h1
            id="case-study-title"
            className="gsap-cs-hero font-display type-hero font-bold text-[#111111] text-balance max-w-[900px]"
          >
            {project.title}
          </h1>

          <p className="gsap-cs-hero text-base sm:text-xl text-[#555555] leading-relaxed max-w-[66ch]">
            {project.shortDescription}
          </p>

          {/* Compact Metadata Strip */}
          <div className="gsap-cs-hero pt-4 border-t border-[#E5E3DF] grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#666666]">
                Role
              </p>
              <p className="text-sm sm:text-base font-medium text-[#111111] mt-1">
                {project.role}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#666666]">
                Project Type
              </p>
              <p className="text-sm sm:text-base font-medium text-[#111111] mt-1">
                {project.projectType}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#666666]">
                Stack
              </p>
              <p className="text-sm font-medium text-[#111111] mt-1 leading-relaxed">
                {project.technologies.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* Large Prominent Hero Visual (before lengthy written content) */}
        <div className="gsap-cs-media pt-2">
          {project.demoVideo?.src ? (
            <figure className="rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#FFFFFF] border border-[#E5E3DF] p-3 sm:p-4">
              <video
                src={project.demoVideo.src}
                poster={project.demoVideo.poster}
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-[18px] aspect-[16/9] object-cover bg-[#111111]"
              />
              {project.demoVideo.caption && (
                <figcaption className="px-2 pt-3 text-xs text-[#777777]">
                  {project.demoVideo.caption}
                </figcaption>
              )}
            </figure>
          ) : heroMedia.src ? (
            <figure className="rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#FFFFFF] border border-[#E5E3DF] p-3 sm:p-4">
              <picture>
                {getWebpSibling(heroMedia.src) && (
                  <source srcSet={getWebpSibling(heroMedia.src)} type="image/webp" />
                )}
                <img
                  src={heroMedia.src}
                  alt={heroMedia.alt}
                  decoding="async"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  className="w-full rounded-[18px] aspect-[16/9] object-cover bg-[#ECEAE4]"
                />
              </picture>
              {heroMedia.caption && (
                <figcaption className="px-2 pt-3 text-xs text-[#666666]">
                  {heroMedia.caption}
                </figcaption>
              )}
            </figure>
          ) : (
            <div className="rounded-[24px] sm:rounded-[28px] bg-[#FFFFFF] border border-[#E5E3DF] p-3.5 sm:p-5">
              <ProjectPlaceholder
                number={project.number}
                title={heroMedia.placeholderLabel}
                sublabel={heroMedia.placeholderSublabel}
                modules={heroMedia.placeholderModules}
                variant="card"
                className="aspect-[16/10] sm:aspect-[16/9]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
