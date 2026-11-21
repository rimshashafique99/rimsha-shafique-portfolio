import { ArrowUpRight, Download, Github, Linkedin } from 'lucide-react';
import { siteConfig } from '@/src/data/siteConfig';
import { handleResumeLinkClick } from '@/src/lib/downloadResume';

interface AboutProps {
  onConnectClick: () => void;
}

export function About({ onConnectClick }: AboutProps) {
  const hasLinkedin = Boolean(siteConfig.contact.linkedinUrl);
  const hasGithub = Boolean(siteConfig.contact.githubUrl);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Profile Portrait */}
          <div className="gsap-about-block lg:col-span-5">
            <div className="max-w-[440px] mx-auto lg:mx-0 overflow-hidden rounded-[24px] border border-[#E5E3DF] bg-[#FFFFFF] shadow-[0_8px_28px_rgba(17,17,17,0.06)] aspect-square">
              <picture>
                <source srcSet="/assets/aistudio/profile_image_752cdeb9.webp" type="image/webp" />
                <img
                  src="/assets/aistudio/profile_image_752cdeb9.png"
                  alt={`${siteConfig.fullName} — ${siteConfig.roleTitle}`}
                  width={880}
                  height={880}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </picture>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="gsap-about-block lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#F04B1A]">
                A LITTLE ABOUT ME
              </p>
              <h2
                id="about-heading"
                className="font-display type-section-title font-bold text-[#111111] text-balance"
              >
                Engineer by Profession. Problem Solver by Nature.
              </h2>
            </div>

            <div className="space-y-5 text-base sm:text-[17px] text-[#444444] leading-[1.75] max-w-[62ch]">
              <p>
                I&apos;m Rimsha Shafique, a Full-Stack Software Engineer based in Islamabad,
                Pakistan. I enjoy turning ideas and real-world problems into useful digital products
                — from custom web applications and SaaS platforms to AI-powered solutions.
              </p>

              <p>
                I have professional experience working across the full-stack development process,
                building responsive user interfaces, developing backend APIs, integrating databases
                and connecting third-party services. My primary stack includes React, Next.js,
                TypeScript, Node.js, Express, PostgreSQL and MongoDB.
              </p>

              <p>
                I believe good software is about more than making things work. It&apos;s about
                building solutions that are reliable, easy to use and maintainable as they grow. I
                focus on writing clean code, creating thoughtful user experiences and choosing
                practical solutions over unnecessary complexity.
              </p>

              <p>
                I&apos;m also exploring how AI can make software more useful. I&apos;ve worked with
                LLM APIs to build features such as resume analysis, candidate screening and
                AI-assisted content generation — bringing AI into applications where it solves an
                actual problem.
              </p>

              <p>
                I&apos;m always interested in working with people who have meaningful ideas and want
                to turn them into well-built products.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E3DF] flex flex-wrap items-center gap-3.5">
              <a
                href={siteConfig.contact.resumeUrl}
                download="Rimsha-Shafique-Resume.pdf"
                onClick={(e) => handleResumeLinkClick(e, siteConfig.contact.resumeUrl)}
                className="inline-flex items-center gap-2 rounded-full bg-[#F04B1A] hover:bg-[#D93E10] text-white text-sm font-medium px-6 py-3 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download Resume</span>
              </a>

              {hasLinkedin ? (
                <a
                  href={siteConfig.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] hover:bg-[#ECEAE4] border border-[#E5E3DF] text-[#111111] text-sm font-medium px-6 py-3 transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Linkedin className="w-4 h-4 text-[#F04B1A]" aria-hidden="true" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 text-[#666666]" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onConnectClick}
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] hover:bg-[#ECEAE4] border border-[#E5E3DF] text-[#111111] text-sm font-medium px-6 py-3 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-[#F04B1A]" aria-hidden="true" />
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 text-[#666666]" aria-hidden="true" />
                </button>
              )}

              {hasGithub && (
                <a
                  href={siteConfig.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] hover:bg-[#ECEAE4] border border-[#E5E3DF] text-[#111111] text-sm font-medium px-6 py-3 transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Github className="w-4 h-4 text-[#111111]" aria-hidden="true" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-4 h-4 text-[#666666]" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
