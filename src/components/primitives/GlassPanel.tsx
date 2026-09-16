import React from 'react';
import { twMerge } from 'tailwind-merge';

type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  dark?: boolean;
  blur?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
};

export function GlassPanel({
  children,
  className,
  dark = false,
  blur = 'md',
  rounded = 'md',
  ...props
}: GlassPanelProps) {
  const roundedClasses = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={twMerge(
        dark ? 'glass-panel-dark text-white' : 'glass-panel text-[#201D1B]',
        roundedClasses[rounded],
        'p-4 sm:p-6 shadow-xs',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
