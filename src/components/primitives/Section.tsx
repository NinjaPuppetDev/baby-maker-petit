import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  variant?: 'primary' | 'secondary' | 'surface' | 'dark';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hasBorderBottom?: boolean;
  hasBorderTop?: boolean;
};

export function Section({
  children,
  className,
  variant = 'primary',
  spacing = 'lg',
  hasBorderBottom = false,
  hasBorderTop = false,
  ...props
}: SectionProps) {
  const variantClasses = {
    primary: 'bg-[#FAF7F2] text-[#201D1B]',
    secondary: 'bg-[#F3ECE4] text-[#201D1B]',
    surface: 'bg-white text-[#201D1B]',
    dark: 'bg-[#141211] text-[#F8F5F0]',
  };

  const spacingClasses = {
    none: 'py-0',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
    xl: 'py-24 md:py-40',
  };

  return (
    <section
      className={twMerge(
        variantClasses[variant],
        spacingClasses[spacing],
        hasBorderBottom && (variant === 'dark' ? 'border-b border-[#2E2926]' : 'border-b border-[#E8E0D5]'),
        hasBorderTop && (variant === 'dark' ? 'border-t border-[#2E2926]' : 'border-t border-[#E8E0D5]'),
        'relative w-full transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
