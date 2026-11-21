import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { ProjectItem } from '@/src/data/projects';
import { isValidExternalUrl } from '@/src/lib/utils';

interface ProjectLinksProps {
  project: ProjectItem;
}

export function ProjectLinks({ project }: ProjectLinksProps) {
  const hasLive = isValidExternalUrl(project.liveUrl);
  const hasFrontendRepo = isValidExternalUrl(project.repositories?.frontend);
  const hasBackendRepo = isValidExternalUrl(project.repositories?.backend);
  const hasCombinedRepo =
    !hasFrontendRepo &&
    !hasBackendRepo &&
    isValidExternalUrl(project.repositories?.combined);

  if (!hasLive && !hasFrontendRepo && !hasBackendRepo && !hasCombinedRepo) {
    return null;
  }

  return (
    <section
      aria-label="Project Links"
      className="pb-10 sm:pb-12 px-4 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="rounded-[20px] bg-[#FFFFFF] border border-[#E5E3DF] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#F04B1A]">
              Project Access
            </p>
            <p className="text-sm text-[#555555]">
              Explore the deployed application and available source repositories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Priority 1: Live Deployed URL */}
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#F04B1A] hover:bg-[#D93E10] text-white text-sm font-medium px-6 py-2.5 transition-colors whitespace-nowrap"
              >
                <span>View Live Project</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            )}

            {/* Priority 2: Frontend Repository */}
            {hasFrontendRepo && (
              <a
                href={project.repositories?.frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] hover:bg-[#2A2A2A] text-white text-sm font-medium px-5 py-2.5 transition-colors whitespace-nowrap"
              >
                <Github className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Frontend Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            )}

            {/* Priority 3: Backend Repository */}
            {hasBackendRepo && (
              <a
                href={project.repositories?.backend}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#F4F3F0] hover:bg-[#ECEAE4] border border-[#E5E3DF] text-[#111111] text-sm font-medium px-5 py-2.5 transition-colors whitespace-nowrap"
              >
                <Github className="w-4 h-4 text-[#F04B1A] shrink-0" aria-hidden="true" />
                <span>Backend Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            )}

            {/* Optional Single Combined Repository */}
            {hasCombinedRepo && (
              <a
                href={project.repositories?.combined}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] hover:bg-[#2A2A2A] text-white text-sm font-medium px-5 py-2.5 transition-colors whitespace-nowrap"
              >
                <Github className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
