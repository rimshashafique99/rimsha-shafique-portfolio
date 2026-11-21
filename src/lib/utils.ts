export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function scrollToSection(id: string): void {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (id === 'home') {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });
}

export function isValidExternalUrl(url?: string): url is string {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#') return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function getWebpSibling(src?: string): string | undefined {
  if (!src) return undefined;
  return src.startsWith('/assets/aistudio/') && src.endsWith('.png')
    ? `${src.slice(0, -4)}.webp`
    : undefined;
}

