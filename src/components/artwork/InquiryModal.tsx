'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Mail, Send } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';

type InquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  creationTitle?: string;
};

export function InquiryModal({ isOpen, onClose, creationTitle }: InquiryModalProps) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: creationTitle
      ? `I am writing to inquire about "${creationTitle}" or discuss similar bespoke works from your atelier.`
      : '',
  });

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141211]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Atelier Inquiry"
    >
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8E0D5] shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F3ECE4] text-[#201D1B] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#F9EBE5] flex items-center justify-center text-[#A45537]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <Text variant="h2" className="text-2xl font-light">
              {t.contact.successTitle}
            </Text>
            <p className="text-sm text-[#6A635D] leading-relaxed max-w-md mx-auto">
              {t.contact.successMessage}
            </p>
            <div className="pt-4">
              <Button variant="secondary" size="md" onClick={onClose}>
                Return to Gallery
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-6">
              <Text variant="label" className="text-[#A45537] mb-1 block">
                Atelier Inquiry
              </Text>
              <Text variant="h2" className="text-2xl font-light text-[#201D1B]">
                {creationTitle ? `Inquire: ${creationTitle}` : 'Connect with the Studio'}
              </Text>
              <p className="text-xs sm:text-sm text-[#6A635D] mt-1.5">
                Every piece is an individual artwork. Melissa reviews each inquiry personally.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8E847A] mb-1.5 font-medium">
                  {t.contact.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-white text-sm text-[#201D1B] focus:outline-none focus:border-[#E29578] focus:ring-1 focus:ring-[#E29578] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8E847A] mb-1.5 font-medium">
                  {t.contact.email} *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-white text-sm text-[#201D1B] focus:outline-none focus:border-[#E29578] focus:ring-1 focus:ring-[#E29578] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8E847A] mb-1.5 font-medium">
                  {t.contact.message}
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-white text-sm text-[#201D1B] focus:outline-none focus:border-[#E29578] focus:ring-1 focus:ring-[#E29578] transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-[11px] text-[#968F87]">
                  Confidential atelier communication.
                </span>
                <Button variant="primary" size="md" type="submit" icon={<Send className="w-3.5 h-3.5" />}>
                  Submit Inquiry
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
