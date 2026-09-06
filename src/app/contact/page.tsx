'use client';

import React, { useState } from 'react';
import { Mail, ArrowUpRight, Send, CheckCircle2, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { BRAND } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'commission',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Header */}
      <Section variant="primary" spacing="md" hasBorderBottom>
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
              ATELIER INQUIRY
            </span>
            <Text variant="display-l" className="text-[#201D1B]">
              {t.contact.title}
            </Text>
            <p className="text-base sm:text-lg text-[#6A635D] leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E0D5] shadow-xs">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#F9EBE5] flex items-center justify-center text-[#A45537]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <Text variant="h2" className="text-3xl font-light text-[#201D1B]">
                      {t.contact.successTitle}
                    </Text>
                    <p className="text-base text-[#6A635D] leading-relaxed max-w-md mx-auto">
                      {t.contact.successMessage}
                    </p>
                    <div className="pt-6">
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Note
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Text variant="h2" className="text-2xl font-light text-[#201D1B] mb-2">
                      {language === 'en' ? 'Direct Note to Melissa' : 'Mensaje Directo a Melissa'}
                    </Text>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8E847A] mb-2 font-medium">
                        {t.contact.fullName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E0D5] bg-[#FAF7F2]/50 text-sm text-[#201D1B] focus:outline-none focus:bg-white focus:border-[#E29578] focus:ring-1 focus:ring-[#E29578] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8E847A] mb-2 font-medium">
                        {t.contact.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E0D5] bg-[#FAF7F2]/50 text-sm text-[#201D1B] focus:outline-none focus:bg-white focus:border-[#E29578] focus:ring-1 focus:ring-[#E29578] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8E847A] mb-2 font-medium">
                        {t.contact.inquiryType}
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E0D5] bg-[#FAF7F2]/50 text-sm text-[#201D1B] focus:outline-none focus:bg-white focus:border-[#E29578] focus:ring-1 focus:ring-[#E29578] transition-all"
                      >
                        <option value="acquisition">{t.contact.typeAcquisition}</option>
                        <option value="commission">{t.contact.typeCommission}</option>
                        <option value="collaboration">{t.contact.typeCollaboration}</option>
                        <option value="general">{t.contact.typeGeneral}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8E847A] mb-2 font-medium">
                        {t.contact.message} *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.contact.messagePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E0D5] bg-[#FAF7F2]/50 text-sm text-[#201D1B] focus:outline-none focus:bg-white focus:border-[#E29578] focus:ring-1 focus:ring-[#E29578] transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-4">
                      <span className="text-xs text-[#968F87]">
                        Melissa personally responds within 48 hours.
                      </span>
                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        icon={<Send className="w-4 h-4 text-[#E29578]" />}
                      >
                        {t.contact.submit}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Atelier Channels & Information (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Studio Card */}
              <div className="bg-[#F3ECE4] rounded-3xl p-8 border border-[#E8E0D5] space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#A45537]">
                    DIRECT STUDIO ACCESS
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#201D1B] mt-1">
                    {BRAND.name} Atelier
                  </h3>
                  <p className="text-xs text-[#8E847A] mt-0.5">
                    {BRAND.fullArtistName} · Private Practice
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <a
                    href={`mailto:${BRAND.contactEmail}`}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-[#E8E0D5] text-[#201D1B] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F9EBE5] flex items-center justify-center text-[#A45537]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#8E847A] uppercase tracking-wider">Email Atelier</p>
                      <p className="font-medium">{BRAND.contactEmail}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8E847A] group-hover:text-[#201D1B] transition-colors" />
                  </a>

                  <a
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-[#E8E0D5] text-[#201D1B] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F9EBE5] flex items-center justify-center text-[#A45537]">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#8E847A] uppercase tracking-wider">Instagram</p>
                      <p className="font-medium">{BRAND.instagramHandle}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8E847A] group-hover:text-[#201D1B] transition-colors" />
                  </a>
                </div>

                <div className="pt-4 border-t border-[#E8E0D5]/70 space-y-3 text-xs text-[#6A635D]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#E29578]" />
                    <span>Response timeframe: Within 2 business days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E29578]" />
                    <span>{BRAND.location} · International insured art shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#E29578]" />
                    <span>All commissions registered with physical Certificate of Authenticity</span>
                  </div>
                </div>
              </div>

              {/* Commission Advisory */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E0D5] space-y-2">
                <h4 className="font-serif text-lg text-[#201D1B]">
                  {language === 'en' ? 'Bespoke Commission Notice' : 'Aviso sobre Encargos Personalizados'}
                </h4>
                <p className="text-xs text-[#6A635D] leading-relaxed">
                  Due to the rigorous micro-rooting (40–80 hours) and multi-layered Genesis oil curing cycles, each commissioned creation requires approximately 4 to 8 weeks of dedicated atelier time.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
