import { ProjectItem } from '@/src/data/projects';

interface NextStepsProps {
  nextSteps?: ProjectItem['nextSteps'];
}

export function NextSteps({ nextSteps }: NextStepsProps) {
  if (!nextSteps || nextSteps.length === 0) return null;

  return (
    <section
      aria-labelledby="next-steps-heading"
      className="gsap-cs-section py-12 sm:py-16 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1160px] space-y-8">
        <div className="max-w-[640px] space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
            07 · Continuous Improvement
          </p>
          <h2
            id="next-steps-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight"
          >
            What I&apos;d Improve Next
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nextSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[20px] bg-[#FFFFFF] border border-[#E5E3DF] p-6 space-y-3 md:last:col-span-1"
            >
              <span className="font-display text-xs font-bold text-[#F04B1A] tabular-nums">
                0{index + 1}
              </span>
              <h3 className="font-display text-lg font-bold text-[#111111] tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
