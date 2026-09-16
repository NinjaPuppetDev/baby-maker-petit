import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: React.ElementType;
};

export function Container({
  children,
  className,
  size = 'lg',
  as: Component = 'div',
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-none',
  };

  return (
    <Component
      className={twMerge(
        'mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
