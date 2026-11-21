import { Briefcase, GraduationCap } from 'lucide-react';
import { journeyItems } from '@/src/data/experience';
import { cn } from '@/src/lib/utils';

export function Experience() {
  const experienceItems = journeyItems.filter((item) => item.type === 'experience');
  const educationItems = journeyItems.filter((item) => item.type === 'education');

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Header */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#F04B1A]">
              MY JOURNEY
            </p>
            <h2
              id="experience-heading"
              className="font-display type-section-title font-bold text-[#111111] text-balance"
            >
              Experience That Shapes How I Build.
            </h2>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-[38ch]">
              My journey combines hands-on software development experience with a Computer Science
              foundation, contributing to web applications, SaaS products and AI-powered solutions.
            </p>
          </div>

          {/* Right Timeline */}
          <div className="lg:col-span-8 space-y-5">
            {experienceItems.map((item) => {
              const isFeatured = Boolean(item.featured);

              return (
                <article
                  key={item.id}
                  className={cn(
                    'gsap-journey-item rounded-[24px] bg-[#FFFFFF] border transition-colors',
                    isFeatured
                      ? 'border-[#111111]/15 p-6 sm:p-8 space-y-5'
                      : 'border-[#E5E3DF] p-5 sm:p-6 space-y-4'
                  )}
                >
                  <div
                    className={cn(
                      'flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4 border-b border-[#E5E3DF]',
                      isFeatured ? 'pb-5' : 'pb-4'
                    )}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div
                        className={cn(
                          'rounded-full flex items-center justify-center shrink-0 mt-0.5',
                          isFeatured
                            ? 'w-11 h-11 bg-[#F04B1A] text-white'
                            : 'w-9 h-9 bg-[#F4F3F0] border border-[#E5E3DF] text-[#F04B1A]'
                        )}
                      >
                        <Briefcase className="w-4 h-4" aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        <h3
                          className={cn(
                            'font-display font-bold text-[#111111] tracking-tight',
                            isFeatured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                          )}
                        >
                          {item.organization}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-[#555555] mt-0.5">
                          {item.title}
                        </p>
                        {item.location && (
                          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
                            {item.location}
                          </p>
                        )}
                      </div>
                    </div>

                    <span
                      className={cn(
                        'text-xs sm:text-sm font-medium tabular-nums sm:text-right shrink-0 sm:pl-0',
                        isFeatured ? 'pl-[58px] text-[#F04B1A]' : 'pl-[50px] text-[#666666]'
                      )}
                    >
                      {item.period}
                    </span>
                  </div>

                  {item.description && (
                    <p
                      className={cn(
                        'leading-relaxed text-[#555555]',
                        isFeatured ? 'text-sm sm:text-base' : 'text-sm'
                      )}
                    >
                      {item.description}
                    </p>
                  )}

                  {item.responsibilities.length > 0 && (
                    <ul className={cn(isFeatured ? 'space-y-2.5 pt-1' : 'space-y-2')}>
                      {item.responsibilities.map((point) => (
                        <li
                          key={point}
                          className="text-sm text-[#444444] flex items-start gap-3 leading-relaxed"
                        >
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F04B1A] shrink-0"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}

            {educationItems.map((item) => (
              <article
                key={item.id}
                className="gsap-journey-item rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#F4F3F0] border border-[#E5E3DF] flex items-center justify-center text-[#F04B1A] shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#F04B1A] mb-1">
                        Education
                      </p>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#111111] tracking-tight leading-snug">
                        {item.organization}
                      </h3>
                      {item.location && (
                        <p className="text-xs sm:text-sm text-[#666666] mt-0.5">{item.location}</p>
                      )}
                      <p className="text-sm sm:text-base font-medium text-[#555555] mt-1">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm font-medium text-[#666666] tabular-nums sm:text-right shrink-0 pl-[50px] sm:pl-0">
                    {item.period}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
