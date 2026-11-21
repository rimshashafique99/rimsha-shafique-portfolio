import { ProjectItem } from '@/src/data/projects';

interface ProblemSectionProps {
  problem?: ProjectItem['problem'];
}

export function ProblemSection({ problem }: ProblemSectionProps) {
  if (!problem) return null;

  return (
    <section
      aria-labelledby="problem-heading"
      className="gsap-cs-section py-12 sm:py-16 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1160px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
            02 · Challenge
          </p>
          <h2
            id="problem-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight"
          >
            The Problem
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <p className="text-base sm:text-lg text-[#333333] leading-[1.75] max-w-[65ch]">
            {problem.summary}
          </p>

          {problem.challenges.length > 0 && (
            <ul className="space-y-3 pt-1">
              {problem.challenges.map((challenge) => (
                <li
                  key={challenge}
                  className="text-sm sm:text-base text-[#444444] flex items-start gap-3 leading-relaxed"
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F04B1A] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="rounded-[20px] bg-[#FFFFFF] border border-[#E5E3DF] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#666666]">
              Core Objective
            </p>
            <p className="text-sm sm:text-base font-medium text-[#111111] mt-2 leading-relaxed">
              {problem.goal}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
