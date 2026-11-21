import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/src/data/siteConfig';
import { TechTicker } from '@/src/components/sections/TechTicker';

interface HeroProps {
  onExploreWork: () => void;
  onCollaborate: () => void;
}

export function Hero({ onExploreWork, onCollaborate }: HeroProps) {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="scroll-mt-16 sm:scroll-mt-20 pt-6 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 lg:px-10 overflow-x-clip"
    >
      <div className="mx-auto max-w-[1080px] flex flex-col items-center text-center">
        {/* Introductory capsule */}
        <p className="gsap-hero-pill inline-flex items-center justify-center rounded-full bg-[#FFFFFF] border border-[#E5E3DF] px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.1em] text-[#555555] uppercase mb-4 sm:mb-5">
          {siteConfig.heroPill}
        </p>

        {/* Centered balanced H1 */}
        <h1
          id="hero-heading"
          className="font-display type-hero font-bold text-[#111111] text-balance max-w-[1040px]"
        >
          <span className="gsap-hero-line block">{siteConfig.heroHeadlineLine1}</span>
          <span className="gsap-hero-line block mt-1 text-[#111111]">
            {siteConfig.heroHeadlineLine2}
          </span>
        </h1>

        {/* Supporting description */}
        <p className="gsap-hero-sub mt-4 sm:mt-5 text-base sm:text-lg text-[#555555] leading-[1.6] max-w-[640px]">
          {siteConfig.heroDescription}
        </p>

        {/* Centered CTA row: primary orange pill + bordered secondary button */}
        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={onExploreWork}
            className="gsap-hero-cta w-full max-w-[260px] sm:w-auto sm:max-w-none min-h-[48px] sm:min-h-[50px] inline-flex items-center justify-center gap-2 rounded-full bg-[#F04B1A] hover:bg-[#D93E10] hover:-translate-y-0.5 text-white font-medium text-sm sm:text-base px-7 py-3 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Explore My Work</span>
            <ArrowDownRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onCollaborate}
            className="gsap-hero-cta group w-full max-w-[260px] sm:w-auto sm:max-w-none min-h-[48px] sm:min-h-[50px] inline-flex items-center justify-center gap-2 rounded-full bg-[#FFFFFF] hover:bg-[#ECEAE4] border border-[#E5E3DF] hover:border-[#111111]/25 hover:-translate-y-0.5 text-sm sm:text-base font-medium text-[#111111] hover:text-[#F04B1A] px-7 py-3 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Let&apos;s Collaborate</span>
            <ArrowUpRight
              className="w-4 h-4 text-[#F04B1A] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Compact availability line */}
        <p className="gsap-hero-availability mt-4 sm:mt-5 text-xs sm:text-[13px] font-medium text-[#555555] leading-relaxed max-w-[580px]">
          <span
            className="inline-block w-2 h-2 rounded-full bg-[#16A34A] mr-2 align-middle -translate-y-[1px]"
            aria-hidden="true"
          />
          <span>
            Available for remote roles, contract work &amp; Islamabad-based opportunities
          </span>
        </p>
      </div>

      {/* Continuous technology ticker */}
      <TechTicker technologies={siteConfig.heroTechLabels} />
    </section>
  );
}
