import { skillCategories } from '@/src/data/skills';

export function TechStack() {
  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-heading"
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-[660px] space-y-4">
            <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#F04B1A]">
              MY TOOLKIT
            </p>
            <h2
              id="toolkit-heading"
              className="font-display type-section-title font-bold text-[#111111] text-balance"
            >
              The Technologies Behind My Work.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#666666] max-w-[48ch] leading-relaxed">
            I use modern web development technologies to build full-stack applications, SaaS
            products and AI-powered solutions. Here&apos;s the toolkit I work with across frontend,
            backend, databases and integrations.
          </p>
        </div>

        <div className="gsap-skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 border-t border-[#E5E3DF] pt-10">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="gsap-skill-group flex flex-col justify-start gap-5 pb-6 border-b border-[#E5E3DF]"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-display text-xs font-bold text-[#F04B1A] tabular-nums">
                    {category.number}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#111111] tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <p className="text-sm text-[#666666] leading-relaxed">
                  {category.summary}
                </p>
              </div>

              <ul className="space-y-2.5">
                {category.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="text-sm sm:text-[15px] font-medium text-[#111111]"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
