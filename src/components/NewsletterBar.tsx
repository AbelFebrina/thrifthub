'use client';

import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function NewsletterBar() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="bg-neutral-950 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div className="lg:pr-8">
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              Dapatkan update drop terbaru, promo eksklusif, & tips thrift
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              Bergabung dengan 10.000+ Thrifter Malang. No spam, unsubscribe kapan saja.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Alamat email
            </label>
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 transition-colors"
                disabled={submitted}
                aria-describedby="newsletter-help"
              />
            </div>
            <button
              type="submit"
              disabled={submitted || !email}
              className="rounded-lg bg-[#E17100] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#E17100]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
            >
              {submitted ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Terkirim
                </>
              ) : (
                <>
                  Kirim
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
