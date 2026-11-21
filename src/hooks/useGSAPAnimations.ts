import { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useGSAPAnimations(
  containerRef: RefObject<HTMLElement | null>,
  isHome = true
): void {
  useGSAP(
    () => {
      if (!isHome) return;
      try {
        const mm = gsap.matchMedia();

        mm.add('(prefers-reduced-motion: no-preference)', () => {
          // Hero entrance timeline — runs immediately on mount without delaying accessibility
          const heroTl = gsap.timeline({
            defaults: { ease: 'power3.out', duration: 0.7 },
          });

          heroTl
            .from('.gsap-hero-pill', {
              y: 14,
              opacity: 0,
              duration: 0.5,
              clearProps: 'transform,opacity',
            })
            .from(
              '.gsap-hero-line',
              {
                y: 24,
                opacity: 0,
                stagger: 0.12,
                duration: 0.7,
                clearProps: 'transform,opacity',
              },
              '-=0.28'
            )
            .from(
              '.gsap-hero-sub',
              {
                y: 16,
                opacity: 0,
                duration: 0.55,
                clearProps: 'transform,opacity',
              },
              '-=0.4'
            )
            .from(
              '.gsap-hero-cta',
              {
                y: 14,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                clearProps: 'transform,opacity',
              },
              '-=0.3'
            )
            .from(
              '.gsap-hero-availability',
              {
                y: 12,
                opacity: 0,
                duration: 0.45,
                clearProps: 'transform,opacity',
              },
              '-=0.25'
            )
            .from(
              '.gsap-hero-tech',
              {
                y: 10,
                opacity: 0,
                duration: 0.45,
                clearProps: 'transform,opacity',
              },
              '-=0.2'
            );

          // What I Build (Services) sequential reveal
          const serviceCards = gsap.utils.toArray<HTMLElement>('.gsap-service-card');
          if (serviceCards.length > 0) {
            gsap.from(serviceCards, {
              y: 22,
              opacity: 0,
              stagger: 0.12,
              duration: 0.6,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: '.gsap-services-grid',
                start: 'top 86%',
                once: true,
              },
            });
          }

          // Project cards — scroll-triggered reveal + subtle image scale
          const projectCards = gsap.utils.toArray<HTMLElement>('.gsap-project-card');
          projectCards.forEach((card) => {
            const media = card.querySelector('.gsap-project-media');
            const contentItems = card.querySelectorAll('.gsap-project-text');

            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: 'top 86%',
                once: true,
              },
            });

            cardTl.from(card, {
              y: 24,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
            });

            if (media) {
              cardTl.from(
                media,
                {
                  scale: 0.97,
                  opacity: 0,
                  duration: 0.6,
                  ease: 'power2.out',
                  clearProps: 'transform,opacity',
                },
                '-=0.42'
              );
            }

            if (contentItems.length > 0) {
              cardTl.from(
                contentItems,
                {
                  y: 14,
                  opacity: 0,
                  stagger: 0.06,
                  duration: 0.45,
                  ease: 'power2.out',
                  clearProps: 'transform,opacity',
                },
                '-=0.42'
              );
            }
          });

          // About & Skills fade + stagger
          const aboutBlocks = gsap.utils.toArray<HTMLElement>('.gsap-about-block');
          if (aboutBlocks.length > 0) {
            gsap.from(aboutBlocks, {
              y: 22,
              opacity: 0,
              stagger: 0.12,
              duration: 0.65,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: '#about',
                start: 'top 82%',
                once: true,
              },
            });
          }

          const skillGroups = gsap.utils.toArray<HTMLElement>('.gsap-skill-group');
          if (skillGroups.length > 0) {
            gsap.from(skillGroups, {
              y: 20,
              opacity: 0,
              stagger: 0.09,
              duration: 0.55,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: '.gsap-skills-grid',
                start: 'top 84%',
                once: true,
              },
            });
          }

          // Experience items
          const journeyCards = gsap.utils.toArray<HTMLElement>('.gsap-journey-item');
          if (journeyCards.length > 0) {
            gsap.from(journeyCards, {
              y: 20,
              opacity: 0,
              stagger: 0.14,
              duration: 0.6,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: '#experience',
                start: 'top 84%',
                once: true,
              },
            });
          }

          // Testimonials cards reveal
          const testimonialCards = gsap.utils.toArray<HTMLElement>('.gsap-testimonial-card');
          if (testimonialCards.length > 0) {
            gsap.from(testimonialCards, {
              y: 22,
              opacity: 0,
              stagger: 0.12,
              duration: 0.6,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: '.gsap-testimonials-grid',
                start: 'top 86%',
                once: true,
              },
            });
          }

          // Contact CTA reveal
          const contactItems = gsap.utils.toArray<HTMLElement>('.gsap-contact-reveal');
          if (contactItems.length > 0) {
            gsap.from(contactItems, {
              y: 24,
              opacity: 0,
              stagger: 0.1,
              duration: 0.65,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: '#contact',
                start: 'top 82%',
                once: true,
              },
            });
          }
        });

        return () => {
          mm.revert();
        };
      } catch {
        // Fallback: content remains immediately visible even if GSAP fails to initialize
      }
    },
    { scope: containerRef, dependencies: [isHome] }
  );
}
