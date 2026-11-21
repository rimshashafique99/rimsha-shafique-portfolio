import { ProjectDecision } from '@/src/data/projects';

interface EngineeringDecisionsProps {
  decisions?: ProjectDecision[];
}

export function EngineeringDecisions({ decisions }: EngineeringDecisionsProps) {
  if (!decisions || decisions.length === 0) return null;

  return (
    <section
      aria-labelledby="engineering-heading"
      className="gsap-cs-section py-12 sm:py-16 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1160px] space-y-10 sm:space-y-12">
        <div className="max-w-[680px] space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
            04 · Engineering Process
          </p>
          <h2
            id="engineering-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight"
          >
            How I Built It
          </h2>
          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            Key technical decisions, architectural reasoning, and trade-offs made during
            implementation.
          </p>
        </div>

        <div className="space-y-8">
          {decisions.map((decision, idx) => (
            <article
              key={decision.id}
              className="rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] p-6 sm:p-8 lg:p-10 space-y-6"
            >
              <div className="flex flex-wrap items-baseline gap-3 pb-4 border-b border-[#E5E3DF]">
                <span className="font-display text-sm font-bold text-[#F04B1A] tabular-nums">
                  0{idx + 1}.
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                  {decision.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#666666]">
                    1. The Challenge
                  </p>
                  <p className="text-sm sm:text-base text-[#444444] leading-relaxed">
                    {decision.challenge}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#666666]">
                    2. Approach Selected
                  </p>
                  <p className="text-sm sm:text-base text-[#444444] leading-relaxed">
                    {decision.approach}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#666666]">
                    3. Why This Approach
                  </p>
                  <p className="text-sm sm:text-base text-[#444444] leading-relaxed">
                    {decision.rationale}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#666666]">
                    4. Trade-offs Considered
                  </p>
                  <p className="text-sm sm:text-base text-[#444444] leading-relaxed">
                    {decision.tradeoffs}
                  </p>
                </div>
              </div>

              {decision.snippet && (
                <div className="pt-2">
                  <div className="rounded-2xl bg-[#111111] text-[#F4F3F0] p-4 sm:p-5 overflow-x-auto">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9A9893] mb-3">
                      {decision.snippet.label}
                    </p>
                    <pre className="text-xs sm:text-sm font-mono leading-relaxed text-[#F4F3F0]">
                      <code>{decision.snippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
