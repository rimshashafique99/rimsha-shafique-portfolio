import { ProjectItem } from '@/src/data/projects';

interface ResultsSectionProps {
  results?: ProjectItem['results'];
}

export function ResultsSection({ results }: ResultsSectionProps) {
  if (!results) return null;

  return (
    <section
      aria-labelledby="results-heading"
      className="gsap-cs-section py-12 sm:py-16 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1160px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
            06 · Outcomes
          </p>
          <h2
            id="results-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight"
          >
            The Results
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <p className="text-base sm:text-lg text-[#333333] leading-[1.75] max-w-[65ch]">
            {results.summary}
          </p>

          {results.measuredMetrics && results.measuredMetrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.measuredMetrics.map((metric) => (
                <div
                  key={metric}
                  className="rounded-[18px] bg-[#FFFFFF] border border-[#E5E3DF] p-5 text-sm font-medium text-[#111111]"
                >
                  {metric}
                </div>
              ))}
            </div>
          )}

          {results.deliveredOutcomes.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#666666]">
                Delivered Functionality
              </p>
              <ul className="space-y-2.5">
                {results.deliveredOutcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="text-sm sm:text-base text-[#444444] flex items-start gap-3 leading-relaxed"
                  >
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F04B1A] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.measurementNote && (
            <p className="text-xs sm:text-sm text-[#666666] pt-3 border-t border-[#E5E3DF] leading-relaxed">
              Note: {results.measurementNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
