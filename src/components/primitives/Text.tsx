import React from 'react';
import { twMerge } from 'tailwind-merge';

type TextVariant =
  | 'display-xl'
  | 'display-l'
  | 'display-m'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body-large'
  | 'body'
  | 'body-small'
  | 'label'
  | 'micro';

type TextProps = React.HTMLAttributes<HTMLElement> & {
  variant?: TextVariant;
  voice?: 'serif' | 'sans' | 'mono';
  as?: React.ElementType;
  dimmed?: boolean;
};

export function Text({
  children,
  className,
  variant = 'body',
  voice,
  as,
  dimmed = false,
  ...props
}: TextProps) {
  // Map variant to default HTML element and default voice
  const variantDefaults: Record<
    TextVariant,
    { element: React.ElementType; defaultVoice: 'serif' | 'sans' | 'mono'; classes: string }
  > = {
    'display-xl': {
      element: 'h1',
      defaultVoice: 'serif',
      classes: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] font-light',
    },
    'display-l': {
      element: 'h2',
      defaultVoice: 'serif',
      classes: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.12] font-light',
    },
    'display-m': {
      element: 'h2',
      defaultVoice: 'serif',
      classes: 'text-3xl sm:text-4xl md:text-5xl leading-[1.16] font-light',
    },
    h1: {
      element: 'h1',
      defaultVoice: 'serif',
      classes: 'text-2xl sm:text-3xl md:text-4xl leading-[1.2] font-normal tracking-tight',
    },
    h2: {
      element: 'h2',
      defaultVoice: 'serif',
      classes: 'text-xl sm:text-2xl md:text-3xl leading-[1.25] font-normal',
    },
    h3: {
      element: 'h3',
      defaultVoice: 'serif',
      classes: 'text-lg sm:text-xl md:text-2xl leading-[1.3] font-normal',
    },
    'body-large': {
      element: 'p',
      defaultVoice: 'sans',
      classes: 'text-lg sm:text-xl leading-[1.65] font-light',
    },
    body: {
      element: 'p',
      defaultVoice: 'sans',
      classes: 'text-base sm:text-lg leading-[1.7] font-normal',
    },
    'body-small': {
      element: 'p',
      defaultVoice: 'sans',
      classes: 'text-sm sm:text-base leading-[1.6] font-normal',
    },
    label: {
      element: 'span',
      defaultVoice: 'sans',
      classes: 'text-xs sm:text-sm font-medium tracking-wider uppercase',
    },
    micro: {
      element: 'span',
      defaultVoice: 'sans',
      classes: 'text-[11px] leading-tight font-medium tracking-widest uppercase',
    },
  };

  const def = variantDefaults[variant];
  const Component = as || def.element;
  const activeVoice = voice || def.defaultVoice;

  const fontClasses = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
  }[activeVoice];

  return (
    <Component
      className={twMerge(
        fontClasses,
        def.classes,
        dimmed && 'text-[#6A635D]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
