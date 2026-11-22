'use client';

import Link from 'next/link';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import { isSanityConfigured } from '@/sanity/env';

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-6 pt-24 pb-16">
        <div className="max-w-lg w-full rounded-3xl bg-white border border-[#E8E0D5] p-8 sm:p-10 space-y-5 shadow-xs text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-[#A45537]">
            Sanity Atelier Studio
          </p>
          <h1 className="font-serif text-3xl font-light text-[#201D1B]">
            CMS Configuration Required
          </h1>
          <p className="text-sm text-[#6A635D] leading-relaxed">
            Sanity Studio requires a valid <code className="px-1.5 py-0.5 rounded bg-[#F3ECE4] text-[#201D1B] font-mono text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
            <code className="px-1.5 py-0.5 rounded bg-[#F3ECE4] text-[#201D1B] font-mono text-xs">NEXT_PUBLIC_SANITY_DATASET</code> in your environment variables. The public gallery is currently serving the bundled local archive.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#201D1B] text-[#FAF7F2] px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-[#36312E] transition-colors"
            >
              Return to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
