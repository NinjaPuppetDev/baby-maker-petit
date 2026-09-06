'use client';

import { FormEvent, Suspense, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { BRAND } from '@/config/brand';

function AccessPageForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError('That password is not correct.');
        return;
      }

      const next = searchParams.get('next');
      const destination = next?.startsWith('/') && !next.startsWith('//') ? next : '/';
      window.location.replace(destination);
    } catch {
      setError('Unable to verify the password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100svh-12rem)] bg-[#FAF7F2] px-6 py-32 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100svh-20rem)] max-w-md items-center justify-center">
        <div className="w-full text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A45537]">
            Private Gallery
          </p>
          <Image
            src="/assets/logo-circle.png"
            alt={BRAND.name}
            width={96}
            height={96}
            priority
            className="mx-auto mt-5 rounded-full border border-[#E29578]/30 bg-[#F9EBE5]"
          />
          <h1 className="mt-4 font-serif text-5xl font-light tracking-tight text-[#201D1B] sm:text-6xl">
            {BRAND.name}
          </h1>
          <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-[#6A635D]">
            Enter the password to enter the atelier.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-sm text-left">
            <label htmlFor="site-password" className="sr-only">
              Gallery password
            </label>
            <input
              id="site-password"
              type="password"
              autoComplete="current-password"
              autoFocus
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Gallery password"
              className="w-full rounded-full border border-[#E8E0D5] bg-white px-5 py-3 text-center text-sm text-[#201D1B] outline-none transition-colors placeholder:text-[#968F87] focus:border-[#E29578] focus:ring-1 focus:ring-[#E29578]"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 w-full rounded-full bg-[#201D1B] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-[#342F2C] disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? 'Verifying' : 'Enter Gallery'}
            </button>
            <p className="mt-3 min-h-5 text-center text-xs text-[#A45537]" role="alert">
              {error}
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function AccessPage() {
  return (
    <Suspense>
      <AccessPageForm />
    </Suspense>
  );
}
