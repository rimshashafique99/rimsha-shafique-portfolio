import { ArrowUpRight, Quote } from 'lucide-react';
import { testimonials } from '@/src/data/testimonials';
import { isValidExternalUrl } from '@/src/lib/utils';

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-[680px] mb-12 sm:mb-14 space-y-4">
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#F04B1A]">
            CLIENT TESTIMONIALS
          </p>
          <h2
            id="testimonials-heading"
            className="font-display type-section-title font-bold text-[#111111] text-balance"
          >
            What Clients Say
          </h2>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            A few words from people I&apos;ve had the pleasure of working with.
          </p>
        </div>

        <div className="gsap-testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {testimonials.map((item) => {
            const hasProjectUrl = isValidExternalUrl(item.projectUrl);

            return (
              <article
                key={item.id}
                className="gsap-testimonial-card group rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] hover:border-[#111111]/20 p-6 sm:p-8 flex flex-col justify-between gap-7 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#F4F3F0] border border-[#E5E3DF] flex items-center justify-center text-[#F04B1A] transition-colors duration-200 group-hover:border-[#F04B1A]/35">
                      <Quote className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="font-display text-xs font-bold text-[#F04B1A] tabular-nums">
                      {item.slotLabel}
                    </span>
                  </div>

                  <blockquote className="text-[15px] sm:text-base text-[#222222] leading-[1.75] m-0">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-5 border-t border-[#E5E3DF] flex flex-wrap items-end justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-display text-base sm:text-[17px] font-bold text-[#111111] tracking-tight">
                      {item.authorName}
                    </p>
                    <p className="text-xs sm:text-sm text-[#555555]">
                      {item.authorRole}
                    </p>
                  </div>

                  {item.projectName && hasProjectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${item.projectName} project (opens in a new tab)`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4F3F0] hover:bg-[#ECEAE4] border border-[#E5E3DF] hover:border-[#F04B1A]/40 px-3 py-1.5 text-xs font-medium text-[#111111] hover:text-[#F04B1A] transition-colors duration-150 shrink-0"
                    >
                      <span>Project: {item.projectName}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#F04B1A]" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
