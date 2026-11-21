import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Bot,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Link2,
  Radio,
  Send,
  Server,
  Sparkles,
  Terminal,
  Triangle,
  Webhook,
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

interface TechTickerProps {
  technologies: readonly string[];
}

function ReactLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="currentColor" strokeWidth="1.5" />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(120 12 12)"
      />
    </svg>
  );
}

function NextLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 15.5V8.5L16.5 17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 8.5V12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M7 10.5C8 7.5 10.2 6.5 12.5 7.5C14.2 8.2 14.8 9.8 16.5 10C17.8 10.2 18.8 9.5 19.5 8.5C18.5 11.5 16.3 12.5 14 11.5C12.3 10.8 11.7 9.2 10 9C8.7 8.8 7.7 9.5 7 10.5ZM4.5 15.5C5.5 12.5 7.7 11.5 10 12.5C11.7 13.2 12.3 14.8 14 15C15.3 15.2 16.3 14.5 17 13.5C16 16.5 13.8 17.5 11.5 16.5C9.8 15.8 9.2 14.2 7.5 14C6.2 13.8 5.2 14.5 4.5 15.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M9 19c-4 1.2-4-2-6-2.5m12 4.5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 3.8 5.4 4.1 5.4 4.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 10.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TECH_ICONS: Record<string, ReactNode> = {
  React: <ReactLogo />,
  'Next.js': <NextLogo />,
  TypeScript: <Code2 className="w-4 h-4 shrink-0" aria-hidden="true" />,
  JavaScript: <Terminal className="w-4 h-4 shrink-0" aria-hidden="true" />,
  'Tailwind CSS': <TailwindLogo />,
  'shadcn/ui': <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />,
  'Node.js': <Server className="w-4 h-4 shrink-0" aria-hidden="true" />,
  'Express.js': <Server className="w-4 h-4 shrink-0" aria-hidden="true" />,
  'REST APIs': <Webhook className="w-4 h-4 shrink-0" aria-hidden="true" />,
  'Socket.IO': <Radio className="w-4 h-4 shrink-0" aria-hidden="true" />,
  MongoDB: <Database className="w-4 h-4 shrink-0" aria-hidden="true" />,
  PostgreSQL: <Database className="w-4 h-4 shrink-0" aria-hidden="true" />,
  Supabase: <Database className="w-4 h-4 shrink-0" aria-hidden="true" />,
  'LLM APIs': <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />,
  'Groq API': <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />,
  'Anthropic API': <Bot className="w-4 h-4 shrink-0" aria-hidden="true" />,
  LangChain: <Link2 className="w-4 h-4 shrink-0" aria-hidden="true" />,
  Git: <GitBranch className="w-4 h-4 shrink-0" aria-hidden="true" />,
  GitHub: <GitHubLogo />,
  Postman: <Send className="w-4 h-4 shrink-0" aria-hidden="true" />,
  Docker: <Boxes className="w-4 h-4 shrink-0" aria-hidden="true" />,
  AWS: <Cloud className="w-4 h-4 shrink-0" aria-hidden="true" />,
  Vercel: <Triangle className="w-4 h-4 shrink-0" aria-hidden="true" />,
};

function getTechIcon(name: string): ReactNode {
  return TECH_ICONS[name] ?? <Code2 className="w-4 h-4 shrink-0" aria-hidden="true" />;
}

export function TechTicker({ technologies }: TechTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!trackRef.current) return;

        tweenRef.current = gsap.fromTo(
          trackRef.current,
          { xPercent: 0 },
          {
            xPercent: -50,
            duration: 48,
            ease: 'none',
            repeat: -1,
          }
        );

        return () => {
          tweenRef.current = null;
        };
      });

      return () => {
        mm.revert();
        tweenRef.current = null;
      };
    },
    { scope: containerRef, dependencies: [technologies] }
  );

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      tweenRef.current?.pause();
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      tweenRef.current?.resume();
    }
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Technologies"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="gsap-hero-tech relative -mx-4 sm:-mx-6 lg:-mx-10 mt-10 sm:mt-12 bg-[#171717] border-y border-[#262626] py-4 sm:py-5 overflow-hidden touch-pan-y select-none"
    >
      {/* Subtle left and right fade masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-20 lg:w-28 bg-gradient-to-r from-[#171717] via-[#171717]/85 to-transparent motion-reduce:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-20 lg:w-28 bg-gradient-to-l from-[#171717] via-[#171717]/85 to-transparent motion-reduce:hidden"
      />

      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform motion-reduce:w-full"
      >
        <ul className="flex items-center shrink-0 gap-6 sm:gap-8 pr-6 sm:pr-8 list-none m-0 p-0 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3 motion-reduce:px-5 motion-reduce:pr-5">
          {technologies.map((tech, index) => (
            <li
              key={tech}
              className="group inline-flex items-center gap-6 sm:gap-8 whitespace-nowrap"
            >
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-[0.01em] text-[#E6E4DF] group-hover:text-white transition-colors duration-150">
                <span className="text-[#9E9C96] group-hover:text-[#F04B1A] transition-colors duration-150">
                  {getTechIcon(tech)}
                </span>
                <span>{tech}</span>
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full bg-[#F04B1A]/85 shrink-0 ${
                  index === technologies.length - 1 ? 'motion-reduce:hidden' : ''
                }`}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>

        <ul
          aria-hidden="true"
          className="flex items-center shrink-0 gap-6 sm:gap-8 pr-6 sm:pr-8 list-none m-0 p-0 motion-reduce:hidden"
        >
          {technologies.map((tech) => (
            <li
              key={`dup-${tech}`}
              className="group inline-flex items-center gap-6 sm:gap-8 whitespace-nowrap"
            >
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-[0.01em] text-[#E6E4DF] group-hover:text-white transition-colors duration-150">
                <span className="text-[#9E9C96] group-hover:text-[#F04B1A] transition-colors duration-150">
                  {getTechIcon(tech)}
                </span>
                <span>{tech}</span>
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#F04B1A]/85 shrink-0"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
