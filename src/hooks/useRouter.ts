import { useCallback, useEffect, useState } from 'react';
import { scrollToSection } from '@/src/lib/utils';

export interface RouteMatch {
  pathname: string;
  caseStudySlug: string | null;
  isNotFound: boolean;
}

function parseRoute(pathname: string): RouteMatch {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized === '/') {
    return {
      pathname: '/',
      caseStudySlug: null,
      isNotFound: false,
    };
  }

  if (normalized === '/projects/ai-job-copilot') {
    return {
      pathname: normalized,
      caseStudySlug: 'ai-job-copilot',
      isNotFound: false,
    };
  }

  const workMatch = normalized.match(/^\/work\/([^/]+)$/);
  if (workMatch) {
    return {
      pathname: normalized,
      caseStudySlug: decodeURIComponent(workMatch[1]),
      isNotFound: false,
    };
  }

  return {
    pathname: normalized,
    caseStudySlug: null,
    isNotFound: true,
  };
}

export function useRouter() {
  const [route, setRoute] = useState<RouteMatch>(() =>
    typeof window !== 'undefined'
      ? parseRoute(window.location.pathname)
      : { pathname: '/', caseStudySlug: null, isNotFound: false }
  );

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keep canonical link & og:url synchronized with the active route
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canonicalUrl = `${window.location.origin}${route.pathname}`;
    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonicalUrl);
    }
    const ogUrlEl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrlEl) {
      ogUrlEl.setAttribute('content', canonicalUrl);
    }
  }, [route.pathname]);

  const navigate = useCallback((to: string, sectionId?: string) => {
    if (typeof window === 'undefined') return;

    const currentNormalized = window.location.pathname.replace(/\/+$/, '') || '/';
    const targetNormalized = to.replace(/\/+$/, '') || '/';

    if (currentNormalized !== targetNormalized) {
      window.history.pushState({}, '', targetNormalized);
      setRoute(parseRoute(targetNormalized));
    }

    if (sectionId) {
      // Wait a frame if switching from case study back to homepage so sections exist in DOM
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollToSection(sectionId);
        });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  return {
    pathname: route.pathname,
    caseStudySlug: route.caseStudySlug,
    isNotFound: route.isNotFound,
    navigate,
  };
}
