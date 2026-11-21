import { useEffect } from 'react';
import { ArrowLeft, Compass } from 'lucide-react';

interface NotFoundPageProps {
  pathname: string;
  onNavigateHome: (sectionId?: string) => void;
}

const DEFAULT_TITLE = 'Rimsha Shafique — Full-Stack Engineer';

export function NotFoundPage({ pathname, onNavigateHome }: NotFoundPageProps) {
  useEffect(() => {
    document.title = 'Page Not Found | Rimsha Shafique';
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, []);

  return (
    <section
      aria-labelledby="not-found-heading"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 text-center"
    >
      <div className="mx-auto max-w-[560px] rounded-[28px] bg-[#FFFFFF] border border-[#E5E3DF] p-8 sm:p-12 space-y-6">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F4F3F0] border border-[#E5E3DF] flex items-center justify-center text-[#F04B1A]">
          <Compass className="w-5 h-5" aria-hidden="true" />
        </div>

        <div className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F04B1A]">
            404 · Page Not Found
          </p>
          <h1
            id="not-found-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight"
          >
            This page doesn&apos;t exist.
          </h1>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            The path <code className="rounded bg-[#F4F3F0] px-1.5 py-0.5 text-xs text-[#111111] break-all">{pathname}</code> could not be found in this portfolio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="/"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              onNavigateHome('home');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#F04B1A] hover:bg-[#D93E10] text-white text-sm font-medium px-6 py-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </a>

          <a
            href="/#work"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              onNavigateHome('work');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#F4F3F0] hover:bg-[#ECEAE4] border border-[#E5E3DF] text-[#111111] text-sm font-medium px-6 py-3 transition-colors"
          >
            <span>Explore Selected Work</span>
          </a>
        </div>
      </div>
    </section>
  );
}
