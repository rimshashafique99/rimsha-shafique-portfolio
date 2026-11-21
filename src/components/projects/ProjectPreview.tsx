import { cn, getWebpSibling } from '@/src/lib/utils';

interface ProjectPreviewProps {
  number: string;
  title: string;
  image?: string;
  imageAlt: string;
  variant?: 'featured' | 'compact';
  className?: string;
}

const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  '/assets/aistudio/Screenshot_2026-11-19_184241_4e343ee9.png': { width: 1583, height: 597 },
  '/assets/aistudio/morphix_e2ed53a6.png': { width: 1555, height: 705 },
  '/assets/aistudio/devndev_d51f9392.png': { width: 1579, height: 737 },
};

export function ProjectPreview({
  number,
  title,
  image,
  imageAlt,
  variant = 'compact',
  className,
}: ProjectPreviewProps) {
  const isFeatured = variant === 'featured';

  if (image) {
    const webpSrc = getWebpSibling(image);
    const dims = IMAGE_DIMENSIONS[image];

    return (
      <div
        className={cn(
          'overflow-hidden rounded-[16px] bg-[#F8F7F4]/80 border border-[#E5E3DF]/80 flex items-center justify-center p-1.5 sm:p-2',
          isFeatured ? 'aspect-[21/10]' : 'aspect-[19/10]',
          className
        )}
      >
        <picture className="w-full h-full flex items-center justify-center">
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            src={image}
            alt={imageAlt}
            width={dims?.width}
            height={dims?.height}
            loading={isFeatured ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-full w-full h-auto object-contain rounded-[10px] border border-[#E5E3DF]/90 shadow-[0_6px_18px_rgba(17,17,17,0.05)] transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        </picture>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={imageAlt}
      className={cn(
        'relative overflow-hidden rounded-[18px] bg-[#F4F3F0] border border-[#E5E3DF] flex flex-col justify-between select-none transition-transform duration-500 ease-out group-hover:scale-[1.015]',
        isFeatured ? 'aspect-[16/10] p-6 sm:p-8' : 'aspect-[16/10] p-5 sm:p-6',
        className
      )}
    >
      {/* Subtle architectural hairline grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E5E3DF 1px, transparent 1px), linear-gradient(to bottom, #E5E3DF 1px, transparent 1px)',
          backgroundSize: isFeatured ? '36px 36px' : '28px 28px',
        }}
      />

      <div className="relative z-10 flex items-center justify-between text-[11px] font-medium text-[#666666]">
        <span className="font-display font-bold text-[#F04B1A] tabular-nums">{number}</span>
        <span className="uppercase tracking-[0.08em]">Preview</span>
      </div>

      <div className="relative z-10 my-auto text-center px-3">
        <p
          className={cn(
            'font-display font-bold tracking-tight text-[#111111]',
            isFeatured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          )}
        >
          {title}
        </p>
        <p className="mt-1.5 text-xs text-[#666666]">Interface screenshot coming soon</p>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-[#E5E3DF]/80 pt-3 text-[11px] text-[#666666]">
        <span>Project Visual</span>
        <span className="tabular-nums">16 : 10</span>
      </div>
    </div>
  );
}
