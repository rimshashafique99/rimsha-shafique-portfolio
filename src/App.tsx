import { lazy, Suspense, useRef, useState } from 'react';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { Hero } from '@/src/components/sections/Hero';
import { Services } from '@/src/components/sections/Services';
import { SelectedWork } from '@/src/components/sections/SelectedWork';
import { About } from '@/src/components/sections/About';
import { TechStack } from '@/src/components/sections/TechStack';
import { Experience } from '@/src/components/sections/Experience';
import { Testimonials } from '@/src/components/sections/Testimonials';
import { Contact, InquiryMode } from '@/src/components/sections/Contact';
import { ServiceItem } from '@/src/data/services';
import { useGSAPAnimations } from '@/src/hooks/useGSAPAnimations';
import { useScrollSpy } from '@/src/hooks/useScrollSpy';
import { useRouter } from '@/src/hooks/useRouter';
import { scrollToSection } from '@/src/lib/utils';
import { ScrollToTopButton } from '@/src/components/ui/ScrollToTopButton';

const AIJobCopilotCaseStudy = lazy(() =>
  import('@/src/components/case-study/AIJobCopilotCaseStudy').then((m) => ({
    default: m.AIJobCopilotCaseStudy,
  }))
);

const CaseStudyPage = lazy(() =>
  import('@/src/components/case-study/CaseStudyPage').then((m) => ({
    default: m.CaseStudyPage,
  }))
);

const NotFoundPage = lazy(() =>
  import('@/src/components/ui/NotFoundPage').then((m) => ({
    default: m.NotFoundPage,
  }))
);

function RouteLoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="py-24 px-4 sm:px-6 lg:px-10 text-center text-sm text-[#555555]"
    >
      Loading...
    </div>
  );
}

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const { pathname, caseStudySlug, isNotFound, navigate } = useRouter();
  const isHome = !isNotFound && caseStudySlug === null;

  const scrollSpySection = useScrollSpy(isHome);
  const activeSection = isHome ? scrollSpySection : isNotFound ? '' : 'work';

  const [inquiryMode, setInquiryMode] = useState<InquiryMode>('product');
  const [prefilledSubject, setPrefilledSubject] = useState<string>('');

  useGSAPAnimations(appRef, isHome);

  const handleNavigateSection = (sectionId: string) => {
    if (isHome) {
      scrollToSection(sectionId);
    } else {
      navigate('/', sectionId);
    }
  };

  const jumpToContact = (mode: InquiryMode, subject = '') => {
    setInquiryMode(mode);
    if (subject) {
      setPrefilledSubject(subject);
    }
    handleNavigateSection('contact');
  };

  const handleSelectService = (service: ServiceItem) => {
    jumpToContact(service.inquiryTopic, `${service.title} for a project`);
  };

  const handleNavigateToCaseStudy = (slug: string) => {
    navigate(slug === 'ai-job-copilot' ? '/projects/ai-job-copilot' : `/work/${slug}`);
  };

  return (
    <div ref={appRef} className="min-h-screen flex flex-col bg-[#F4F3F0] text-[#111111]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#111111] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      {/* Section 01: Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onSelectContact={() => jumpToContact('product')}
      />

      <main id="main-content" className="flex-1">
        {isNotFound ? (
          <Suspense fallback={<RouteLoadingFallback />}>
            <NotFoundPage
              pathname={pathname}
              onNavigateHome={(sectionId = 'home') => navigate('/', sectionId)}
            />
          </Suspense>
        ) : caseStudySlug === 'ai-job-copilot' ? (
          <Suspense fallback={<RouteLoadingFallback />}>
            <AIJobCopilotCaseStudy
              onNavigateHome={(sectionId = 'home') => navigate('/', sectionId)}
            />
          </Suspense>
        ) : caseStudySlug ? (
          <Suspense fallback={<RouteLoadingFallback />}>
            <CaseStudyPage
              slug={caseStudySlug}
              onNavigateHome={(sectionId = 'home') => navigate('/', sectionId)}
              onNavigateProject={handleNavigateToCaseStudy}
            />
          </Suspense>
        ) : (
          <>
            {/* Section 02: Hero */}
            <Hero
              onExploreWork={() => scrollToSection('work')}
              onCollaborate={() => jumpToContact('product')}
            />

            {/* Section 03: What I Build (Services) */}
            <Services onSelectService={handleSelectService} />

            {/* Section 04: Selected Work */}
            <SelectedWork onNavigateToCaseStudy={handleNavigateToCaseStudy} />

            {/* Section 05: About Me */}
            <About
              onConnectClick={() => jumpToContact('hiring', 'connecting via LinkedIn / email')}
            />

            {/* Section 06: Technical Expertise */}
            <TechStack />

            {/* Section 07: Experience & Education */}
            <Experience />

            {/* Section 08: Client Testimonials */}
            <Testimonials />

            {/* Section 09: Contact CTA */}
            <Contact
              inquiryMode={inquiryMode}
              prefilledSubject={prefilledSubject}
              onChangeInquiryMode={setInquiryMode}
            />
          </>
        )}
      </main>

      {/* Section 10: Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onSelectContact={() => jumpToContact('hiring')}
      />

      <ScrollToTopButton isHome={isHome} />
    </div>
  );
}
