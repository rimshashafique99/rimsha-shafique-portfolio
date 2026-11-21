import { ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react';
import { siteConfig } from '@/src/data/siteConfig';
import { isValidExternalUrl } from '@/src/lib/utils';

function UpworkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
  );
}

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onSelectContact: () => void;
}

export function Footer({ onNavigateSection, onSelectContact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: siteConfig.contact.linkedinUrl,
      icon: Linkedin,
      isExternal: true,
      ariaLabel: 'Visit Rimsha Shafique on LinkedIn (opens in a new tab)',
    },
    {
      label: 'GitHub',
      href: siteConfig.contact.githubUrl,
      icon: Github,
      isExternal: true,
      ariaLabel: 'Visit Rimsha Shafique on GitHub (opens in a new tab)',
    },
    {
      label: 'Instagram',
      href: siteConfig.contact.instagramUrl,
      icon: Instagram,
      isExternal: true,
      ariaLabel: 'Visit Rimsha Shafique on Instagram (opens in a new tab)',
    },
    {
      label: 'Upwork',
      href: siteConfig.contact.upworkUrl,
      icon: UpworkIcon,
      isExternal: true,
      ariaLabel: 'Visit Rimsha Shafique on Upwork (opens in a new tab)',
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#111111] text-[#FFFFFF] border-t border-[#262626] px-4 sm:px-6 lg:px-10 pt-14 sm:pt-16 pb-9 sm:pb-10">
      {/* Subtle top orange hairline highlight & ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-[640px] h-px bg-gradient-to-r from-transparent via-[#F04B1A]/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 w-[380px] h-[200px] rounded-full bg-[#F04B1A]/[0.06] blur-3xl"
      />

      {/* Understated background typographic watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-4 right-4 sm:right-10 font-display font-bold text-[4.5rem] sm:text-[7rem] lg:text-[9rem] leading-none tracking-[-0.04em] text-white/[0.025]"
      >
        Rimsha.
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#262626]">
          {/* Column 1: Brand */}
          <div className="md:col-span-2 lg:col-span-5 space-y-4">
            <div className="w-8 h-[2px] rounded-full bg-[#F04B1A]" aria-hidden="true" />

            <a
              href="/"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                onNavigateSection('home');
              }}
              className="inline-block font-display text-2xl sm:text-[28px] font-bold tracking-tight text-white hover:text-[#F04B1A] transition-colors duration-200"
            >
              {siteConfig.brandName}
            </a>

            <p className="text-sm sm:text-[15px] text-[#A8A6A1] leading-relaxed max-w-[40ch]">
              Full-Stack Software Engineer building modern web applications, SaaS products and
              AI-powered solutions.
            </p>

            <p className="inline-flex items-center gap-2 pt-1 text-xs font-medium text-[#9A9893]">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0"
                aria-hidden="true"
              />
              <span>Open to opportunities · Remote &amp; Islamabad</span>
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#888888]">
              NAVIGATION
            </p>
            <ul className="space-y-2">
              {siteConfig.navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.id === 'home' ? '/' : `/#${item.id}`}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      onNavigateSection(item.id);
                    }}
                    className="group inline-flex items-center gap-2 py-1 text-sm text-[#CCCCCC] hover:text-[#F04B1A] transition-colors duration-200"
                  >
                    <span
                      className="w-0 group-hover:w-2.5 h-px bg-[#F04B1A] transition-all duration-200"
                      aria-hidden="true"
                    />
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect / Social */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#888888]">
              LET&apos;S CONNECT
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                const content = (
                  <>
                    <span className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#262626] group-hover:border-[#F04B1A]/50 group-hover:bg-[#F04B1A]/10 flex items-center justify-center text-[#A8A6A1] group-hover:text-[#F04B1A] transition-colors duration-200 shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-[#D4D2CD] group-hover:text-[#F04B1A] transition-colors duration-200">
                      {link.label}
                    </span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 text-[#666666] group-hover:text-[#F04B1A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                      aria-hidden="true"
                    />
                  </>
                );

                const hasValidHref = isValidExternalUrl(link.href);

                return (
                  <li key={link.label}>
                    {hasValidHref ? (
                      <a
                        href={link.href}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        aria-label={link.ariaLabel}
                        className="group inline-flex items-center gap-3 py-1.5 rounded-lg transition-colors duration-200"
                      >
                        {content}
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        aria-label={`${link.label} (coming soon)`}
                        title={`${link.label} profile link coming soon`}
                        className="inline-flex items-center gap-3 py-1.5 rounded-lg opacity-70 cursor-default"
                      >
                        <span className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#262626] flex items-center justify-center text-[#A8A6A1] shrink-0">
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-medium text-[#D4D2CD]">{link.label}</span>
                        <span className="text-[11px] font-medium text-[#9A9893]">(Soon)</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#8A8883]">
          <p>
            &copy; {currentYear} {siteConfig.fullName}. All rights reserved.
          </p>
          <p>Full-Stack Software Engineer · {siteConfig.location}</p>
        </div>
      </div>
    </footer>
  );
}
