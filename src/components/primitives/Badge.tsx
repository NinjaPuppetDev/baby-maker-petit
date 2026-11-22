import React from 'react';
import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'provenance' | 'status' | 'neutral' | 'accent' | 'dark';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({
  children,
  className,
  variant = 'neutral',
  ...props
}: BadgeProps) {
  const variantClasses = {
    provenance: 'bg-[#F9EBE5] text-[#A45537] border border-[#E29578]/30',
    status: 'bg-white/80 backdrop-blur-xs text-[#201D1B] border border-[#E8E0D5]',
    neutral: 'bg-[#F3ECE4] text-[#6A635D] border border-[#E8E0D5]',
    accent: 'bg-[#E29578] text-white border border-[#E29578]',
    dark: 'bg-[#201D1B]/80 text-[#FAF7F2] border border-white/10 backdrop-blur-xs',
  };

  return (
    <span
      className={twMerge(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium tracking-wider uppercase',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
