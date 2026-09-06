'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Scale, Ruler, Palette, Calendar, User } from 'lucide-react';
import { Creation } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Text } from '@/components/primitives/Text';
import { Badge } from '@/components/primitives/Badge';

type CreationMetadataProps = {
  creation: Creation;
  onOpenCertificate?: () => void;
};

export function CreationMetadata({ creation, onOpenCertificate }: CreationMetadataProps) {
  const { language, t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D5] shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D5]">
        <Text variant="label" className="text-[#8E847A]">
          {t.work.specifications}
        </Text>
        <Badge variant={creation.status === 'Private Collection' ? 'neutral' : 'provenance'}>
          {creation.status}
        </Badge>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 text-sm">
        {/* Year */}
        <div>
          <dt className="text-xs uppercase tracking-wider text-[#8E847A] flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#E29578]" />
            <span>{t.work.year}</span>
          </dt>
          <dd className="font-medium text-[#201D1B]">{creation.year}</dd>
        </div>

        {/* Series */}
        <div>
          <dt className="text-xs uppercase tracking-wider text-[#8E847A] flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
            <span>{t.work.series}</span>
          </dt>
          <dd className="font-medium text-[#201D1B]">{creation.series}</dd>
        </div>

        {/* Sculptor Kit */}
        {creation.sculptorKit && (
          <div>
            <dt className="text-xs uppercase tracking-wider text-[#8E847A] flex items-center gap-1.5 mb-1">
              <User className="w-3.5 h-3.5 text-[#E29578]" />
              <span>{t.work.sculptor}</span>
            </dt>
            <dd className="font-medium text-[#201D1B]">
              {creation.sculptorKit} {creation.originalSculptor && `(${creation.originalSculptor})`}
            </dd>
          </div>
        )}

        {/* Weight */}
        {creation.weight && (
          <div>
            <dt className="text-xs uppercase tracking-wider text-[#8E847A] flex items-center gap-1.5 mb-1">
              <Scale className="w-3.5 h-3.5 text-[#E29578]" />
              <span>{t.work.weight}</span>
            </dt>
            <dd className="font-medium text-[#201D1B]">{creation.weight}</dd>
          </div>
        )}

        {/* Length / Dimensions */}
        {creation.length && (
          <div>
            <dt className="text-xs uppercase tracking-wider text-[#8E847A] flex items-center gap-1.5 mb-1">
              <Ruler className="w-3.5 h-3.5 text-[#E29578]" />
              <span>{t.work.dimensions}</span>
            </dt>
            <dd className="font-medium text-[#201D1B]">{creation.length}</dd>
          </div>
        )}

        {/* Medium */}
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-wider text-[#8E847A] flex items-center gap-1.5 mb-1">
            <Palette className="w-3.5 h-3.5 text-[#E29578]" />
            <span>{t.work.medium}</span>
          </dt>
          <dd className="font-medium text-[#201D1B] leading-relaxed">{creation.medium}</dd>
        </div>

        {/* Technique */}
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-wider text-[#8E847A] mb-1">
            {t.work.technique}
          </dt>
          <dd className="text-sm text-[#6A635D] leading-relaxed">{creation.technique}</dd>
        </div>

        {/* Hair & Eyes */}
        {creation.eyeDetails && (
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wider text-[#8E847A] mb-1">
              Ocular Architecture
            </dt>
            <dd className="text-sm text-[#6A635D] leading-relaxed">{creation.eyeDetails}</dd>
          </div>
        )}

        {creation.hairDetails && (
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wider text-[#8E847A] mb-1">
              Capillary Rooting
            </dt>
            <dd className="text-sm text-[#6A635D] leading-relaxed">{creation.hairDetails}</dd>
          </div>
        )}
      </dl>

      {/* Certificate Callout */}
      {creation.hasCertificate && (
        <div className="mt-6 pt-5 border-t border-[#E8E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF7F2] p-4 rounded-xl">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#E29578] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#201D1B]">
                {t.work.provenance}
              </p>
              <p className="text-xs text-[#6A635D]">
                {creation.certificateDate
                  ? `Registered on ${creation.certificateDate} with signed physical COA.`
                  : t.work.certificateIssued}
              </p>
            </div>
          </div>
          {onOpenCertificate && (
            <button
              onClick={onOpenCertificate}
              className="text-xs font-medium tracking-wider uppercase text-[#A45537] hover:underline cursor-pointer text-left sm:text-right shrink-0"
            >
              View Certificate
            </button>
          )}
        </div>
      )}
    </div>
  );
}
