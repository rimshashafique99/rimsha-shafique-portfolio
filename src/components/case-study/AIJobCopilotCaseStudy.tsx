import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileUp,
  Github,
  LayoutDashboard,
  Maximize2,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import {
  aiJobCopilotCaseStudy,
  CaseStudyScreenshotSlot,
} from '@/src/data/aiJobCopilotCaseStudy';
import { getWebpSibling } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AIJobCopilotCaseStudyProps {
  onNavigateHome: (sectionId?: string) => void;
}

const DEFAULT_TITLE = 'Rimsha Shafique — Full-Stack Engineer';
const DEFAULT_DESCRIPTION =
  'Portfolio of Rimsha Shafique, a Full-Stack Engineer building modern web applications, SaaS products, and AI-powered solutions.';

const FEATURE_ICONS = {
  'resume-upload': FileUp,
  'cover-letters': FileText,
  'gap-analysis': Target,
  'cv-bullets': Sparkles,
  'application-tracking': LayoutDashboard,
} as const;

const primaryButtonClass =
  'inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-[10px] bg-[#F04B1A] hover:bg-[#D93E10] px-5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0';

const secondaryButtonClass =
  'inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-[10px] bg-[#FFFFFF] hover:bg-[#ECEAE4] border border-[#E5E3DF] hover:border-[#111111]/25 px-4 sm:px-5 text-sm font-medium text-[#111111] transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0';

function ScreenshotFrame({
  slot,
  frameClassName = 'h-[260px] sm:h-[320px] lg:h-[360px]',
  priority = false,
  onOpenLightbox,
}: {
  slot: CaseStudyScreenshotSlot;
  frameClassName?: string;
  priority?: boolean;
  onOpenLightbox?: (slot: CaseStudyScreenshotSlot) => void;
}) {
  const webpSrc = getWebpSibling(slot.src);

  return (
    <figure className="group rounded-[20px] sm:rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] hover:border-[#111111]/20 p-3 sm:p-4 transition-colors duration-200">
      <button
        type="button"
        onClick={() => onOpenLightbox?.(slot)}
        aria-label={`Inspect ${slot.title} screenshot in full view`}
        className={`relative w-full overflow-hidden rounded-[14px] bg-[#F4F3F0] border border-[#E5E3DF]/80 p-2 sm:p-3 flex items-center justify-center cursor-zoom-in text-left ${frameClassName}`}
      >
        <div className="w-full h-full overflow-hidden rounded-[10px] bg-[#FFFFFF] border border-[#E5E3DF] shadow-[0_6px_20px_rgba(17,17,17,0.05)] flex items-center justify-center">
          <picture className="w-full h-full flex items-center justify-center">
            {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
            <img
              src={slot.src}
              alt={slot.alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={priority ? 'high' : undefined}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            />
          </picture>
        </div>

        <span
          aria-hidden="true"
          className="absolute right-3.5 bottom-3.5 inline-flex items-center gap-1.5 rounded-lg bg-[#111111]/85 text-white px-2.5 py-1.5 text-[11px] font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none"
        >
          <Maximize2 className="w-3 h-3 text-[#F04B1A]" />
          <span>Expand</span>
        </span>
      </button>

      <figcaption className="px-1.5 pt-3.5 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#F04B1A]">
            {slot.label}
          </span>
          <span className="text-[11px] text-[#666666] hidden sm:inline">Click to enlarge</span>
        </div>
        <p className="font-display text-sm sm:text-base font-bold text-[#111111] tracking-tight">
          {slot.title}
        </p>
        <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed">{slot.caption}</p>
      </figcaption>
    </figure>
  );
}

function ScreenshotLightbox({
  screenshots,
  activeIndex,
  onClose,
  onSelectIndex,
}: {
  screenshots: CaseStudyScreenshotSlot[];
  activeIndex: number;
  onClose: () => void;
  onSelectIndex: (nextIndex: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const active = screenshots[activeIndex];
  const total = screenshots.length;

  const handlePrev = useCallback(() => {
    onSelectIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((activeIndex + 1) % total);
  }, [activeIndex, total, onSelectIndex]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move initial keyboard focus into the dialog
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose, handlePrev, handleNext]);

  if (!active) return null;

  const activeWebpSrc = getWebpSibling(active.src);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${active.title} screenshot preview`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/88 backdrop-blur-sm p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-[1160px] max-h-[92vh] flex flex-col rounded-[22px] bg-[#F8F7F4] border border-[#E5E3DF] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-[#E5E3DF] bg-[#FFFFFF]">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#F04B1A]">
              {active.label} · {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(total).padStart(2, '0')}
            </p>
            <h3 className="font-display text-sm sm:text-base font-bold text-[#111111] truncate">
              {active.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous screenshot"
              className="inline-flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-[10px] bg-[#F4F3F0] hover:bg-[#ECEAE4] border border-[#E5E3DF] text-[#111111] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next screenshot"
              className="inline-flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-[10px] bg-[#F4F3F0] hover:bg-[#ECEAE4] border border-[#E5E3DF] text-[#111111] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close screenshot preview"
              className="inline-flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-[10px] bg-[#111111] hover:bg-[#F04B1A] text-white transition-colors ml-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable clean stage so both wide and tall screenshots render legibly */}
        <div className="flex-1 overflow-auto p-3 sm:p-6 bg-[#F4F3F0] flex items-start justify-center">
          <picture className="flex items-start justify-center w-full">
            {activeWebpSrc && <source srcSet={activeWebpSrc} type="image/webp" />}
            <img
              src={active.src}
              alt={active.alt}
              decoding="async"
              referrerPolicy="no-referrer"
              className={
                active.orientation === 'tall'
                  ? 'w-full max-w-[780px] h-auto rounded-[12px] border border-[#E5E3DF] bg-[#FFFFFF] shadow-sm'
                  : 'max-h-[70vh] w-auto max-w-full object-contain rounded-[12px] border border-[#E5E3DF] bg-[#FFFFFF] shadow-sm my-auto'
              }
            />
          </picture>
        </div>

        {/* Footer caption */}
        <div className="px-4 sm:px-6 py-3 border-t border-[#E5E3DF] bg-[#FFFFFF] flex flex-wrap items-center justify-between gap-2 text-xs text-[#555555]">
          <p className="leading-relaxed">{active.caption}</p>
          <span className="text-[11px] text-[#666666] hidden sm:inline">
            Use arrow keys to navigate · Esc to close
          </span>
        </div>
      </div>
    </div>
  );
}

export function AIJobCopilotCaseStudy({ onNavigateHome }: AIJobCopilotCaseStudyProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const data = aiJobCopilotCaseStudy;

  const allScreenshots = useMemo<CaseStudyScreenshotSlot[]>(
    () => [
      data.screenshots.hero,
      ...data.screenshots.workflow,
      ...data.screenshots.tracking,
      data.screenshots.profile,
    ],
    [data.screenshots]
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpenLightbox = useCallback(
    (slot: CaseStudyScreenshotSlot) => {
      const idx = allScreenshots.findIndex((item) => item.id === slot.id);
      if (idx !== -1) setLightboxIndex(idx);
    },
    [allScreenshots]
  );

  // SEO title, meta description & canonical URL
  useEffect(() => {
    document.title = data.seo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.seo.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', data.seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', data.seo.description);

    const existingCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !existingCanonical;
    const canonicalEl = existingCanonical ?? document.createElement('link');
    const prevCanonicalHref = existingCanonical?.getAttribute('href') ?? null;

    canonicalEl.setAttribute('rel', 'canonical');
    canonicalEl.setAttribute('href', `${window.location.origin}${data.seo.path}`);
    if (createdCanonical) {
      document.head.appendChild(canonicalEl);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESCRIPTION);
      if (ogTitle) ogTitle.setAttribute('content', DEFAULT_TITLE);
      if (ogDesc) ogDesc.setAttribute('content', DEFAULT_DESCRIPTION);

      if (createdCanonical) {
        canonicalEl.remove();
      } else if (prevCanonicalHref !== null) {
        canonicalEl.setAttribute('href', prevCanonicalHref);
      }
    };
  }, [data.seo]);

  // Smooth GSAP animations matching existing portfolio conventions
  useGSAP(
    () => {
      try {
        const mm = gsap.matchMedia();

        mm.add('(prefers-reduced-motion: no-preference)', () => {
          gsap.from('.gsap-ajc-hero', {
            y: 18,
            opacity: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          });

          gsap.from('.gsap-ajc-media', {
            y: 22,
            opacity: 0,
            duration: 0.65,
            delay: 0.14,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          });

          const sections = gsap.utils.toArray<HTMLElement>('.gsap-ajc-section');
          sections.forEach((section) => {
            gsap.from(section, {
              y: 20,
              opacity: 0,
              duration: 0.55,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: section,
                start: 'top 86%',
                once: true,
              },
            });
          });
        });

        return () => mm.revert();
      } catch {
        // Content remains visible if GSAP fails
      }
    },
    { scope: pageRef }
  );

  const handleBackToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigateHome('work');
  };

  const handleBackHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigateHome('home');
  };

  return (
    <article ref={pageRef} className="pb-16 sm:pb-24">
      {/* HERO SECTION */}
      <header className="pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1160px] space-y-8 sm:space-y-10">
          {/* Top Page Navigation */}
          <div className="gsap-ajc-hero flex flex-wrap items-center justify-between gap-4">
            <a
              href="/#work"
              onClick={handleBackToWork}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#111111] hover:text-[#F04B1A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Back to Portfolio</span>
            </a>

            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs sm:text-sm text-[#666666]"
            >
              <a href="/" onClick={handleBackHome} className="hover:text-[#111111] transition-colors">
                Home
              </a>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <a
                href="/#work"
                onClick={handleBackToWork}
                className="hover:text-[#111111] transition-colors"
              >
                Selected Work
              </a>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="text-[#111111] font-medium">{data.hero.title}</span>
            </nav>
          </div>

          {/* Title, Subtitle & Description */}
          <div className="space-y-5">
            <p className="gsap-ajc-hero text-xs font-semibold tracking-[0.1em] uppercase text-[#F04B1A]">
              {data.hero.eyebrow}
            </p>

            <div className="space-y-3">
              <h1 className="gsap-ajc-hero font-display type-hero font-bold text-[#111111] tracking-tight">
                {data.hero.title}
              </h1>
              <p className="gsap-ajc-hero font-display text-xl sm:text-2xl text-[#333333] font-medium tracking-tight max-w-[54ch]">
                {data.hero.subtitle}
              </p>
            </div>

            <p className="gsap-ajc-hero text-base sm:text-lg text-[#555555] leading-[1.7] max-w-[68ch]">
              {data.hero.description}
            </p>

            {/* Hero Actions */}
            <div className="gsap-ajc-hero flex flex-wrap items-center gap-3 pt-2">
              <a
                href={data.hero.links.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryButtonClass}
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href={data.hero.links.frontendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButtonClass}
              >
                <Github className="w-4 h-4 text-[#555555] shrink-0" aria-hidden="true" />
                <span>Frontend Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#666666] shrink-0" aria-hidden="true" />
              </a>

              <a
                href={data.hero.links.backendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButtonClass}
              >
                <Github className="w-4 h-4 text-[#555555] shrink-0" aria-hidden="true" />
                <span>Backend Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#666666] shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Metadata Strip */}
          <dl className="gsap-ajc-hero pt-6 border-t border-[#E5E3DF] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.hero.metadata.map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#666666]">
                  {item.label}
                </dt>
                <dd className="text-sm sm:text-[15px] font-medium text-[#111111] mt-1 leading-relaxed">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Hero Main Dashboard Screenshot */}
          <div className="gsap-ajc-media pt-2">
            <ScreenshotFrame
              slot={data.screenshots.hero}
              frameClassName="aspect-[16/9] sm:aspect-[21/10]"
              priority
              onOpenLightbox={handleOpenLightbox}
            />
          </div>
        </div>
      </header>

      {/* SECTION 01 — OVERVIEW */}
      <section
        aria-labelledby="overview-heading"
        className="gsap-ajc-section py-14 sm:py-20 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
      >
        <div className="mx-auto max-w-[1160px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
              01 — OVERVIEW
            </p>
            <h2
              id="overview-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight leading-snug text-balance"
            >
              {data.overview.heading}
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-5 text-base sm:text-[17px] text-[#444444] leading-[1.75] max-w-[64ch]">
            {data.overview.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 02 — THE PROBLEM */}
      <section
        aria-labelledby="problem-heading"
        className="gsap-ajc-section py-14 sm:py-20 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
      >
        <div className="mx-auto max-w-[1160px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
              02 — THE PROBLEM
            </p>
            <h2
              id="problem-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight leading-snug text-balance"
            >
              {data.problem.heading}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="border-l-2 border-[#F04B1A]/60 pl-5 sm:pl-7 space-y-5 text-base sm:text-[17px] text-[#444444] leading-[1.75] max-w-[64ch]">
              {data.problem.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — THE SOLUTION */}
      <section
        aria-labelledby="solution-heading"
        className="gsap-ajc-section py-14 sm:py-20 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
      >
        <div className="mx-auto max-w-[1160px] space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
                03 — THE SOLUTION
              </p>
              <h2
                id="solution-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight leading-snug text-balance"
              >
                {data.solution.heading}
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-5 text-base sm:text-[17px] text-[#444444] leading-[1.75] max-w-[64ch]">
              {data.solution.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Lightweight Responsive Workflow Diagram */}
          <div className="rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] p-5 sm:p-7 lg:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#666666] mb-5">
              End-to-End Application Workflow
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 list-none m-0 p-0">
              {data.solution.workflowSteps.map((step, index) => (
                <li
                  key={step}
                  className="relative flex items-center justify-between gap-2 rounded-xl bg-[#F4F3F0] border border-[#E5E3DF] px-4 py-3.5"
                >
                  <div className="space-y-1 min-w-0">
                    <span className="block font-display text-[11px] font-bold text-[#F04B1A] tabular-nums">
                      0{index + 1}
                    </span>
                    <span className="block text-xs sm:text-[13px] font-semibold text-[#111111] leading-snug">
                      {step}
                    </span>
                  </div>
                  {index < data.solution.workflowSteps.length - 1 && (
                    <ArrowRight
                      className="hidden lg:block w-3.5 h-3.5 text-[#999999] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Workflow Gallery: Job Analysis & AI-Generated Results */}
          <div className="space-y-5 pt-2">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
                  THE WORKFLOW IN ACTION
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                  From Job Description Input to Structured AI Output
                </h3>
              </div>
              <p className="text-xs text-[#666666]">Click any screen to inspect full details</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7">
                <ScreenshotFrame
                  slot={data.screenshots.workflow[0]}
                  frameClassName="h-[250px] sm:h-[320px] lg:h-[360px]"
                  onOpenLightbox={handleOpenLightbox}
                />
              </div>
              <div className="lg:col-span-5">
                <ScreenshotFrame
                  slot={data.screenshots.workflow[1]}
                  frameClassName="h-[250px] sm:h-[320px] lg:h-[360px]"
                  onOpenLightbox={handleOpenLightbox}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — KEY FEATURES & SCREENSHOT SLOTS */}
      <section
        aria-labelledby="features-heading"
        className="gsap-ajc-section py-14 sm:py-20 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
      >
        <div className="mx-auto max-w-[1160px] space-y-12">
          <div className="max-w-[640px] space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
              04 — KEY FEATURES
            </p>
            <h2
              id="features-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight leading-snug"
            >
              Core Capabilities Built Into One Workspace.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.id as keyof typeof FEATURE_ICONS] ?? Sparkles;
              return (
                <div
                  key={feature.id}
                  className="rounded-[22px] bg-[#FFFFFF] border border-[#E5E3DF] p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-[#F4F3F0] border border-[#E5E3DF] flex items-center justify-center text-[#F04B1A]">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="font-display text-xs font-bold text-[#666666] tabular-nums">
                      {feature.number}.
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#111111] tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Application Tracking & Profile Management Galleries */}
          <div className="space-y-12 pt-4">
            <div className="space-y-5">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
                  APPLICATION TRACKING
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                  Pipeline Management &amp; New Opportunity Entry
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.screenshots.tracking.map((slot) => (
                  <ScreenshotFrame
                    key={slot.id}
                    slot={slot}
                    frameClassName="h-[240px] sm:h-[290px] lg:h-[310px]"
                    onOpenLightbox={handleOpenLightbox}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center pt-4 border-t border-[#E5E3DF]">
              <div className="lg:col-span-4 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
                  PROFILE MANAGEMENT
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] tracking-tight leading-snug">
                  Personal Context &amp; CV Storage
                </h3>
                <p className="text-sm sm:text-[15px] text-[#555555] leading-relaxed">
                  Users maintain their target role, professional summary, and uploaded PDF resume
                  in one profile view so every AI analysis draws on consistent personal context.
                </p>
              </div>

              <div className="lg:col-span-8">
                <ScreenshotFrame
                  slot={data.screenshots.profile}
                  frameClassName="h-[240px] sm:h-[310px] lg:h-[340px]"
                  onOpenLightbox={handleOpenLightbox}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 — HOW I BUILT IT */}
      <section
        aria-labelledby="architecture-heading"
        className="gsap-ajc-section py-14 sm:py-20 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
      >
        <div className="mx-auto max-w-[1160px] space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-end">
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
                05 — HOW I BUILT IT
              </p>
              <h2
                id="architecture-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight leading-snug text-balance"
              >
                {data.architecture.heading}
              </h2>
            </div>
            <p className="lg:col-span-7 text-base sm:text-[17px] text-[#555555] leading-relaxed max-w-[58ch]">
              {data.architecture.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.architecture.areas.map((area, index) => (
              <div
                key={area.title}
                className="rounded-[22px] bg-[#FFFFFF] border border-[#E5E3DF] p-6 sm:p-7 space-y-3"
              >
                <p className="font-display text-xs font-bold text-[#F04B1A] tabular-nums">
                  0{index + 1}
                </p>
                <h3 className="font-display text-xl font-bold text-[#111111] tracking-tight">
                  {area.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-[#555555] leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06 — ENGINEERING CHALLENGES */}
      <section
        aria-labelledby="challenges-heading"
        className="gsap-ajc-section py-14 sm:py-20 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
      >
        <div className="mx-auto max-w-[1160px] space-y-10 sm:space-y-12">
          <div className="max-w-[640px] space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
              06 — ENGINEERING CHALLENGES
            </p>
            <h2
              id="challenges-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight leading-snug"
            >
              {data.challenges.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.challenges.items.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] p-6 sm:p-8 space-y-5"
              >
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#F04B1A]">
                    {item.number}
                  </p>
                  <h3 className="font-display text-xl font-bold text-[#111111] tracking-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-[15px] text-[#555555] leading-relaxed">
                  {item.challenge}
                </p>

                <div className="pt-4 border-t border-[#E5E3DF] space-y-1.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#666666]">
                    Approach
                  </p>
                  <p className="text-sm sm:text-[15px] text-[#111111] leading-relaxed">
                    {item.approach}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 07 — TESTING & DEPLOYMENT */}
      <section
        aria-labelledby="testing-heading"
        className="gsap-ajc-section py-14 sm:py-20 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
      >
        <div className="mx-auto max-w-[1160px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
              07 — TESTING &amp; DEPLOYMENT
            </p>
            <h2
              id="testing-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight leading-snug"
            >
              {data.testingDeployment.heading}
            </h2>
            <p className="text-base text-[#555555] leading-relaxed">
              {data.testingDeployment.intro}
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-[#E5E3DF] rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] px-6 sm:px-8 list-none m-0">
              {data.testingDeployment.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                >
                  <span className="font-display text-sm sm:text-base font-bold text-[#111111]">
                    {tool.name}
                  </span>
                  <span className="text-sm text-[#555555]">{tool.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 08 — TECHNOLOGY STACK */}
      <section
        aria-labelledby="stack-heading"
        className="gsap-ajc-section py-14 sm:py-20 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
      >
        <div className="mx-auto max-w-[1160px] space-y-10">
          <div className="max-w-[640px] space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
              08 — TECHNOLOGY STACK
            </p>
            <h2
              id="stack-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight leading-snug"
            >
              Organized Architecture Across Layers.
            </h2>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#E5E3DF]">
            {data.techStack.map((group) => (
              <div
                key={group.category}
                className="py-5 sm:pr-6 border-b border-[#E5E3DF] space-y-1.5"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#666666]">
                  {group.category}
                </dt>
                <dd className="text-sm sm:text-[15px] font-medium text-[#111111] leading-relaxed">
                  {group.items}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SECTION 09 — REFLECTION */}
      <section
        aria-labelledby="reflection-heading"
        className="gsap-ajc-section py-14 sm:py-20 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
      >
        <div className="mx-auto max-w-[1160px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
              09 — REFLECTION
            </p>
            <h2
              id="reflection-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight leading-snug text-balance"
            >
              {data.reflection.heading}
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-5 text-base sm:text-[17px] text-[#444444] leading-[1.75] max-w-[64ch]">
            {data.reflection.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM NAVIGATION & FINAL CTA */}
      <section
        aria-label="Case study actions and navigation"
        className="gsap-ajc-section pt-10 sm:pt-14 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
      >
        <div className="mx-auto max-w-[1160px] space-y-8">
          <div className="rounded-[24px] sm:rounded-[28px] bg-[#FFFFFF] border border-[#E5E3DF] p-6 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-[52ch]">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
                EXPLORE THE PROJECT
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                Try AI Job Copilot Live or Inspect the Code.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={data.hero.links.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryButtonClass}
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href={data.hero.links.frontendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButtonClass}
              >
                <Github className="w-4 h-4 text-[#555555] shrink-0" aria-hidden="true" />
                <span>Frontend Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#666666] shrink-0" aria-hidden="true" />
              </a>

              <a
                href={data.hero.links.backendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButtonClass}
              >
                <Github className="w-4 h-4 text-[#555555] shrink-0" aria-hidden="true" />
                <span>Backend Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#666666] shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <a
              href="/#work"
              onClick={handleBackToWork}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] hover:text-[#F04B1A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Back to Selected Work</span>
            </a>

            <a
              href="/"
              onClick={handleBackHome}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] hover:text-[#111111] transition-colors"
            >
              <span>Return to Portfolio Home</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      {/* LIGHTBOX PREVIEW MODAL */}
      {lightboxIndex !== null && (
        <ScreenshotLightbox
          screenshots={allScreenshots}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onSelectIndex={setLightboxIndex}
        />
      )}
    </article>
  );
}
