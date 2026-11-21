import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn, scrollToSection } from '@/src/lib/utils';

interface ScrollToTopButtonProps {
  isHome: boolean;
}

export function ScrollToTopButton({ isHome }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const heroEl = isHome ? document.getElementById('home') : null;

    if (heroEl && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          setIsVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 80);
        },
        {
          rootMargin: '-80px 0px 0px 0px',
          threshold: 0,
        }
      );

      observer.observe(heroEl);
      return () => observer.disconnect();
    }

    let rafId: number | null = null;
    const updateFromScroll = () => {
      rafId = null;
      setIsVisible(window.scrollY > 480);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isHome]);

  return (
    <button
      type="button"
      onClick={() => scrollToSection('home')}
      aria-label="Scroll to top"
      title="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={cn(
        'fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-30 w-11 h-11 rounded-full bg-[#FFFFFF]/95 backdrop-blur-sm border border-[#E5E3DF] shadow-[0_8px_24px_rgba(17,17,17,0.1)] flex items-center justify-center text-[#111111] hover:border-[#F04B1A] hover:text-[#F04B1A] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer motion-reduce:transition-none motion-reduce:transform-none',
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-2 pointer-events-none'
      )}
    >
      <ArrowUp className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
