import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  href,
  icon,
  iconPosition = 'right',
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary:
      'bg-[#A18C64] text-white hover:bg-[#8F7B54] active:bg-[#7D6B48] shadow-xs hover:shadow-sm border border-[#A18C64]',
    secondary:
      'bg-[#F3ECE4] text-[#201D1B] hover:bg-[#EAE1D7] active:bg-[#E0D5C9] border border-[#E8E0D5]',
    outline:
      'bg-transparent text-[#201D1B] border border-[#201D1B]/40 hover:border-[#201D1B] hover:bg-[#201D1B]/5',
    ghost:
      'bg-transparent text-[#201D1B] hover:bg-[#F3ECE4] hover:text-[#201D1B]',
  };

  const sizeClasses = {
    sm: 'text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-full gap-1.5 font-medium',
    md: 'text-xs tracking-wider uppercase px-5 py-2 rounded-full gap-2 font-medium',
    lg: 'text-xs tracking-wider uppercase px-6 py-2.5 rounded-full gap-2 font-medium',
  };

  const commonClasses = twMerge(
    'inline-flex items-center justify-center font-sans font-medium transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E29578] focus-visible:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0 [&>svg]:currentColor">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0 [&>svg]:currentColor">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={commonClasses} {...(props as any)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={commonClasses} {...(props as any)}>
      {content}
    </button>
  );
}
