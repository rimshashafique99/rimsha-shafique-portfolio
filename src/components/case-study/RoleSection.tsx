import { ProjectItem } from '@/src/data/projects';

interface RoleSectionProps {
  contributions?: ProjectItem['contributions'];
}

export function RoleSection({ contributions }: RoleSectionProps) {
  if (!contributions) return null;

  return (
    <section
      aria-labelledby="role-heading"
      className="gsap-cs-section py-12 sm:py-16 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1160px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
            03 · Ownership
          </p>
          <h2
            id="role-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight"
          >
            My Role &amp; Contributions
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <p className="text-base sm:text-lg text-[#333333] leading-[1.75] max-w-[65ch]">
            {contributions.summary}
          </p>

          <ul className="space-y-3">
            {contributions.personalWork.map((item) => (
              <li
                key={item}
                className="text-sm sm:text-base text-[#444444] flex items-start gap-3 leading-relaxed"
              >
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {contributions.collaborationNote && (
            <p className="text-sm text-[#555555] leading-relaxed pt-2 border-t border-[#E5E3DF]">
              {contributions.collaborationNote}
            </p>
          )}

          {contributions.toolsAndServices.length > 0 && (
            <div className="pt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#666666] mr-2">
                Tools Used:
              </span>
              {contributions.toolsAndServices.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md bg-[#FFFFFF] border border-[#E5E3DF] px-3 py-1 text-xs font-medium text-[#111111]"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
