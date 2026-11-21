import { useEffect, useState } from 'react';

export interface ScrollSpyEntry {
  sectionId: string;
  navId: string;
}

const DEFAULT_SECTIONS: ScrollSpyEntry[] = [
  { sectionId: 'home', navId: 'home' },
  { sectionId: 'services', navId: 'services' },
  { sectionId: 'work', navId: 'work' },
  { sectionId: 'about', navId: 'about' },
  { sectionId: 'toolkit', navId: 'about' },
  { sectionId: 'experience', navId: 'about' },
  { sectionId: 'contact', navId: 'contact' },
];

export function useScrollSpy(
  enabled = true,
  entries: ScrollSpyEntry[] = DEFAULT_SECTIONS
): string {
  const [activeNavId, setActiveNavId] = useState<string>('home');

  useEffect(() => {
    if (!enabled) return;

    const elements = entries
      .map((item) => ({
        ...item,
        el: document.getElementById(item.sectionId),
      }))
      .filter((item): item is ScrollSpyEntry & { el: HTMLElement } => item.el !== null);

    if (elements.length === 0) return;

    let rafId: number | null = null;

    const getNavbarOffset = (): number => {
      const header = document.querySelector('header');
      return header ? header.getBoundingClientRect().height : 80;
    };

    const resolveActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Explicit top-of-page lock so Home is always active at initial load / back-to-top
      if (scrollY <= 40) {
        setActiveNavId((prev) => (prev === 'home' ? prev : 'home'));
        return;
      }

      // Explicit bottom-of-page check so Contact is always active when reaching footer/bottom
      if (viewportHeight + scrollY >= docHeight - 32) {
        setActiveNavId((prev) => (prev === 'contact' ? prev : 'contact'));
        return;
      }

      const navbarHeight = getNavbarOffset();
      const zoneTop = navbarHeight;
      const zoneBottom = Math.max(zoneTop + 120, viewportHeight * 0.58);

      // Accumulate visible overlap pixels within the active viewport band [zoneTop, zoneBottom]
      // so tall sections (e.g. Selected Work) and multi-block sections (About) remain stable.
      const navOverlap = new Map<string, number>();

      for (const { navId, el } of elements) {
        const rect = el.getBoundingClientRect();
        const overlap = Math.max(
          0,
          Math.min(rect.bottom, zoneBottom) - Math.max(rect.top, zoneTop)
        );
        if (overlap > 0) {
          navOverlap.set(navId, (navOverlap.get(navId) ?? 0) + overlap);
        }
      }

      if (navOverlap.size > 0) {
        let bestNavId = 'home';
        let maxOverlap = -1;
        for (const [navId, overlap] of navOverlap.entries()) {
          if (overlap > maxOverlap) {
            maxOverlap = overlap;
            bestNavId = navId;
          }
        }
        setActiveNavId((prev) => (prev === bestNavId ? prev : bestNavId));
        return;
      }

      // Fallback if scrolling fast between boundaries: pick the last section whose top passed zoneTop
      let fallbackNavId = 'home';
      for (const { navId, el } of elements) {
        if (el.getBoundingClientRect().top <= zoneBottom) {
          fallbackNavId = navId;
        }
      }
      setActiveNavId((prev) => (prev === fallbackNavId ? prev : fallbackNavId));
    };

    const scheduleResolve = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        resolveActiveSection();
      });
    };

    const observer = new IntersectionObserver(
      () => {
        scheduleResolve();
      },
      {
        rootMargin: '-64px 0px -35% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach(({ el }) => observer.observe(el));

    // Passive scroll listener ensures top-of-page, bottom-of-page, and rapid scroll changes never go stale
    window.addEventListener('scroll', scheduleResolve, { passive: true });
    window.addEventListener('resize', scheduleResolve, { passive: true });

    // Initial check on mount
    resolveActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleResolve);
      window.removeEventListener('resize', scheduleResolve);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [enabled, entries]);

  return activeNavId;
}
