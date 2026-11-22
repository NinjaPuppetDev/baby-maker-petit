import React from 'react';
import { twMerge } from 'tailwind-merge';

type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  hasEmblem?: boolean;
};

export function Divider({ className, hasEmblem = false, ...props }: DividerProps) {
  if (hasEmblem) {
    return (
      <div className={twMerge('relative flex items-center justify-center my-12 md:my-20', className)} {...props}>
        <div className="w-full border-t border-[#E8E0D5]" />
        <div className="absolute px-4 bg-[#FAF7F2] text-[#8E847A] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#E29578]/50" />
        </div>
      </div>
    );
  }

  return <hr className={twMerge('border-0 border-t border-[#E8E0D5] my-8 md:my-12', className)} {...props} />;
}
