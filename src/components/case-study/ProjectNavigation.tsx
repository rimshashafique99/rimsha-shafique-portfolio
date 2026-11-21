import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProjectItem } from '@/src/data/projects';

interface ProjectNavigationProps {
  previousProject: ProjectItem | null;
  nextProject: ProjectItem | null;
  onNavigateProject: (slug: string) => void;
  onBackToWork: () => void;
}

export function ProjectNavigation({
  previousProject,
  nextProject,
  onNavigateProject,
  onBackToWork,
}: ProjectNavigationProps) {
  return (
    <section
      aria-label="Case Study Navigation"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1160px] space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {previousProject ? (
            <a
              href={`/work/${previousProject.slug}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                onNavigateProject(previousProject.slug);
              }}
              className="group rounded-[22px] bg-[#FFFFFF] border border-[#E5E3DF] hover:border-[#111111]/25 p-6 flex items-center justify-between gap-4 transition-colors"
            >
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#666666] flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5 text-[#F04B1A]" aria-hidden="true" />
                  <span>Previous Project</span>
                </p>
                <p className="font-display text-lg sm:text-xl font-bold text-[#111111] tracking-tight truncate group-hover:text-[#F04B1A] transition-colors">
                  {previousProject.title}
                </p>
              </div>
              <span className="text-xs font-bold text-[#666666] tabular-nums shrink-0">
                {previousProject.number}
              </span>
            </a>
          ) : (
            <div />
          )}

          {nextProject && (
            <a
              href={`/work/${nextProject.slug}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                onNavigateProject(nextProject.slug);
              }}
              className="group rounded-[22px] bg-[#FFFFFF] border border-[#E5E3DF] hover:border-[#111111]/25 p-6 flex items-center justify-between gap-4 transition-colors md:text-right"
            >
              <span className="text-xs font-bold text-[#666666] tabular-nums shrink-0 md:order-1">
                {nextProject.number}
              </span>
              <div className="min-w-0 space-y-1 md:order-2 md:ml-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#666666] flex items-center md:justify-end gap-1.5">
                  <span>Next Project</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F04B1A]" aria-hidden="true" />
                </p>
                <p className="font-display text-lg sm:text-xl font-bold text-[#111111] tracking-tight truncate group-hover:text-[#F04B1A] transition-colors">
                  {nextProject.title}
                </p>
              </div>
            </a>
          )}
        </div>

        <div className="flex justify-center pt-2">
          <a
            href="/#work"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              onBackToWork();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#111111] hover:bg-[#F04B1A] text-white text-sm font-medium px-7 py-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Selected Work</span>
          </a>
        </div>
      </div>
    </section>
  );
}
