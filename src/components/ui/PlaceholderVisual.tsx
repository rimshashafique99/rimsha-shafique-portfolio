import { Image as ImageIcon, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ProjectPlaceholderProps {
  number: string;
  title: string;
  sublabel: string;
  modules: string[];
  variant?: 'strip' | 'card';
  className?: string;
}

export function ProjectPlaceholder({
  number,
  title,
  sublabel,
  modules,
  variant = 'card',
  className,
}: ProjectPlaceholderProps) {
  const isStrip = variant === 'strip';

  return (
    <div
      role="img"
      aria-label={`Local visual placeholder for ${title}: ${sublabel}`}
      className={cn(
        'relative overflow-hidden bg-[#ECEAE4] border border-[#E5E3DF] flex flex-col justify-between select-none',
        isStrip ? 'rounded-2xl p-5 aspect-[4/3]' : 'rounded-[20px] p-6 sm:p-8 aspect-[4/3] lg:aspect-[16/12]',
        className
      )}
    >
      {/* Subtle architectural grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E2DFD9 1px, transparent 1px), linear-gradient(to bottom, #E2DFD9 1px, transparent 1px)',
          backgroundSize: isStrip ? '28px 28px' : '36px 36px',
        }}
      />

      {/* Top bar of placeholder frame */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-[#555555]">
          <ImageIcon className="w-3.5 h-3.5 text-[#F04B1A] shrink-0" aria-hidden="true" />
          <span className="tracking-tight">Screenshot Placeholder · {number}</span>
        </div>
        <span className="text-[11px] font-medium text-[#666666] tracking-wide">
          Local Asset Slot
        </span>
      </div>

      {/* Center schematic frame */}
      <div className="relative z-10 my-auto py-4">
        <div className="rounded-xl bg-[#FFFFFF]/90 border border-[#E5E3DF] p-4 sm:p-5 shadow-[0_1px_2px_rgba(17,17,17,0.03)]">
          <div className="flex items-center justify-between border-b border-[#E5E3DF] pb-3 mb-3.5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-[#D9D6D0]" />
              <span className="w-2 h-2 rounded-full bg-[#D9D6D0]" />
              <span className="w-2 h-2 rounded-full bg-[#D9D6D0]" />
            </div>
            <span className="text-[11px] font-medium text-[#666666] truncate max-w-[160px]">
              {title}
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-display text-sm sm:text-base font-semibold text-[#111111] tracking-tight truncate">
                {title}
              </p>
              <span className="text-[11px] font-medium text-[#F04B1A] shrink-0">
                {number}
              </span>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">
              {sublabel}
            </p>
            {!isStrip && modules.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-1.5 sm:grid sm:grid-cols-3 sm:gap-2">
                {modules.map((mod) => (
                  <div
                    key={mod}
                    className="rounded-lg bg-[#F4F3F0] border border-[#E5E3DF] px-2.5 py-1.5 sm:py-2 text-[11px] font-medium text-[#444444] truncate text-center flex-1 min-w-[84px]"
                  >
                    {mod}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom caption */}
      <div className="relative z-10 flex items-center justify-between gap-2 text-[11px] text-[#666666]">
        <span className="truncate">{sublabel}</span>
        <span className="shrink-0 font-medium text-[#111111]">4:3 Frame</span>
      </div>
    </div>
  );
}

interface PortraitPlaceholderProps {
  name: string;
  role: string;
  className?: string;
}

export function PortraitPlaceholder({ name, role, className }: PortraitPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Reserved portrait area for ${name}`}
      className={cn(
        'relative overflow-hidden rounded-[24px] bg-[#ECEAE4] border border-[#E5E3DF] p-6 sm:p-8 flex flex-col justify-between aspect-[4/5]',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E2DFD9 1px, transparent 1px), linear-gradient(to bottom, #E2DFD9 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 flex items-center justify-between text-xs font-medium text-[#666666]">
        <span>Portrait Slot</span>
        <span className="text-[#F04B1A]">Reserved Area</span>
      </div>

      <div className="relative z-10 my-auto flex flex-col items-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-[#FFFFFF] border border-[#E5E3DF] flex items-center justify-center mb-5">
          <User className="w-8 h-8 text-[#777777]" aria-hidden="true" />
        </div>
        <p className="font-display text-lg font-semibold text-[#111111] tracking-tight">
          {name}
        </p>
        <p className="text-sm text-[#666666] mt-1">{role}</p>
        <p className="text-xs text-[#777777] mt-4 max-w-[240px] leading-relaxed">
          Reserved frame for an authentic editorial portrait photograph.
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-[#E5E3DF] pt-4 text-xs text-[#666666]">
        <span>Aspect Ratio 4:5</span>
        <span className="font-medium text-[#111111]">Rimsha.</span>
      </div>
    </div>
  );
}
