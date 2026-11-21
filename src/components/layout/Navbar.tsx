import { useEffect, useState } from 'react';
import { ArrowUpRight, FileText, Menu, X } from 'lucide-react';
import { siteConfig } from '@/src/data/siteConfig';
import { handleResumeLinkClick } from '@/src/lib/downloadResume';
import { cn } from '@/src/lib/utils';

interface NavbarProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onSelectContact: () => void;
}

export function Navbar({
  activeSection,
  onNavigateSection,
  onSelectContact,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-200',
        isScrolled
          ? 'bg-[#F4F3F0]/88 backdrop-blur-md border-b border-[#E5E3DF]'
          : 'bg-[#F4F3F0]/70 backdrop-blur-sm border-b border-transparent'
      )}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 h-16 sm:h-20 w-full flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        {/* Left: Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            handleNavClick('home');
          }}
          className="lg:justify-self-start font-display text-[15px] sm:text-xl lg:text-2xl font-bold tracking-tight text-[#111111] whitespace-nowrap shrink-0"
        >
          {siteConfig.brandName}
        </a>

        {/* Center: White pill-shaped navigation (desktop 1024px+) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex lg:justify-self-center items-center bg-[#FFFFFF] border border-[#E5E3DF] rounded-full p-1.5 shadow-[0_1px_2px_rgba(17,17,17,0.03)]"
        >
          {siteConfig.navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.id === 'home' ? '/' : `/#${item.id}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0',
                  isActive
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'text-[#555555] hover:text-[#111111]'
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Resume link & Let's Talk orange button (desktop 1024px+) */}
        <div className="hidden lg:flex lg:justify-self-end items-center gap-4 shrink-0">
          <a
            href={siteConfig.contact.resumeUrl}
            download="Rimsha-Shafique-Resume.pdf"
            onClick={(e) => handleResumeLinkClick(e, siteConfig.contact.resumeUrl)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111111] hover:text-[#F04B1A] transition-colors whitespace-nowrap shrink-0 py-2 px-1 cursor-pointer"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>Resume</span>
          </a>

          <button
            type="button"
            onClick={onSelectContact}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F04B1A] hover:bg-[#D93E10] text-white text-sm font-medium px-5 py-2.5 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Tablet & Mobile Controls (<1024px) */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onSelectContact}
            className="inline-flex items-center justify-center min-h-[40px] rounded-full bg-[#F04B1A] hover:bg-[#D93E10] text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Let&apos;s Talk
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#E5E3DF] flex items-center justify-center text-[#111111] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Tablet & Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#FFFFFF] border-b border-[#E5E3DF] px-4 sm:px-6 py-5 max-h-[calc(100dvh-4rem)] overflow-y-auto"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {siteConfig.navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.id === 'home' ? '/' : `/#${item.id}`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between',
                    isActive
                      ? 'bg-[#F4F3F0] text-[#111111]'
                      : 'text-[#555555] hover:bg-[#F4F3F0]/60 hover:text-[#111111]'
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-medium text-[#F04B1A]">Active</span>
                  )}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#E5E3DF] flex flex-col gap-2">
              <a
                href={siteConfig.contact.resumeUrl}
                download="Rimsha-Shafique-Resume.pdf"
                onClick={(e) =>
                  handleResumeLinkClick(e, siteConfig.contact.resumeUrl, () =>
                    setMobileMenuOpen(false)
                  )
                }
                className="w-full px-4 py-3 rounded-xl border border-[#E5E3DF] text-sm font-medium text-[#111111] flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>Resume</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
