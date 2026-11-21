import { ProjectItem } from '@/src/data/projects';
import { ProjectPlaceholder } from '@/src/components/ui/PlaceholderVisual';
import { cn, getWebpSibling } from '@/src/lib/utils';

interface SolutionGalleryProps {
  projectNumber: string;
  solution?: ProjectItem['solution'];
}

export function SolutionGallery({ projectNumber, solution }: SolutionGalleryProps) {
  if (!solution || solution.features.length === 0) return null;

  return (
    <section
      aria-labelledby="solution-heading"
      className="gsap-cs-section py-12 sm:py-16 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1160px] space-y-10 sm:space-y-14">
        <div className="max-w-[680px] space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
            05 · Implementation
          </p>
          <h2
            id="solution-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight"
          >
            What I Built
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            {solution.intro}
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {solution.features.map((feature, index) => {
            const isVisualRight = index % 2 === 1;

            return (
              <div
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center"
              >
                <div
                  className={cn(
                    'lg:col-span-7',
                    isVisualRight ? 'lg:order-2' : 'lg:order-1'
                  )}
                >
                  {feature.imageSrc ? (
                    <figure className="rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] p-3 sm:p-4">
                      <picture>
                        {getWebpSibling(feature.imageSrc) && (
                          <source srcSet={getWebpSibling(feature.imageSrc)} type="image/webp" />
                        )}
                        <img
                          src={feature.imageSrc}
                          alt={feature.imageAlt}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full rounded-[16px] aspect-[4/3] object-cover bg-[#ECEAE4]"
                        />
                      </picture>
                    </figure>
                  ) : (
                    <div className="rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] p-3 sm:p-4">
                      <ProjectPlaceholder
                        number={projectNumber}
                        title={feature.title}
                        sublabel={feature.placeholderSublabel}
                        modules={feature.placeholderModules}
                        variant="card"
                      />
                    </div>
                  )}
                </div>

                <div
                  className={cn(
                    'lg:col-span-5 space-y-3',
                    isVisualRight ? 'lg:order-1' : 'lg:order-2'
                  )}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#F04B1A] tabular-nums">
                    Feature 0{index + 1}
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
