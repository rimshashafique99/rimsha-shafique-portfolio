import { ProjectItem } from '@/src/data/projects';

interface ContextSectionProps {
  context?: ProjectItem['context'];
}

export function ContextSection({ context }: ContextSectionProps) {
  if (!context) return null;

  return (
    <section
      aria-labelledby="context-heading"
      className="gsap-cs-section py-12 sm:py-16 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1160px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
            01 · Background
          </p>
          <h2
            id="context-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight"
          >
            The Context
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <p className="text-base sm:text-lg text-[#333333] leading-[1.75] max-w-[65ch]">
            {context.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-5 border-t border-[#E5E3DF]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#666666]">
                Target Users
              </p>
              <p className="text-sm text-[#111111] mt-1.5 leading-relaxed">
                {context.audience}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#666666]">
                Development Context
              </p>
              <p className="text-sm text-[#111111] mt-1.5 leading-relaxed">
                {context.projectNature}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#666666]">
                Environment
              </p>
              <p className="text-sm text-[#111111] mt-1.5 leading-relaxed">
                {context.environment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
