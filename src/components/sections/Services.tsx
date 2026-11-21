import { ArrowUpRight } from 'lucide-react';
import { services, ServiceItem } from '@/src/data/services';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 border-t border-[#E5E3DF]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-[660px] space-y-4">
            <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#F04B1A]">
              WHAT I BUILD
            </p>
            <h2
              id="services-heading"
              className="font-display type-section-title font-bold text-[#111111] text-balance"
            >
              From Ideas to Working Products.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#666666] max-w-[46ch] leading-relaxed">
            I build custom web applications, SaaS products and AI-powered solutions for startups,
            businesses and founders — from the first idea to a functional, reliable product.
          </p>
        </div>

        <div className="gsap-services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelectService(service)}
              className="gsap-service-card group text-left rounded-[24px] bg-[#FFFFFF] border border-[#E5E3DF] p-6 sm:p-8 flex flex-col justify-between gap-8 transition-all duration-200 hover:border-[#111111]/25 hover:-translate-y-0.5 cursor-pointer md:last:col-span-2 lg:last:col-span-1"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-[#F04B1A] tabular-nums">
                    {service.number}.
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#F4F3F0] border border-[#E5E3DF] group-hover:bg-[#F04B1A] group-hover:border-[#F04B1A] group-hover:text-white flex items-center justify-center text-[#111111] transition-all duration-200">
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                  {service.title}
                </h3>

                <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 border-t border-[#E5E3DF] flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-[#F4F3F0] px-2.5 py-1 text-xs font-medium text-[#333333]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
