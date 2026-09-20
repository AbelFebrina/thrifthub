import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

interface Testimonial {
  rating: number;
  quote: string;
  author: string;
  role: string;
  initials: string;
  avatarBg: string;
}

const testimonials: Testimonial[] = [
  {
    rating: 5,
    quote: 'Pengiriman super cepat! Pesan malam, besi pagi sudah di tangan. Produk sesuai foto, kondisi bagus banget.',
    author: 'Rina S.',
    role: 'Buyer • Malang',
    initials: 'RS',
    avatarBg: 'bg-rose-100 text-rose-700',
  },
  {
    rating: 5,
    quote: 'Mudah banget cari jaket vintage yang dicari. Filter ukuran & kondisi bantu banget. Sudah 3x beli di sini.',
    author: 'Doni P.',
    role: 'Buyer • Malang',
    initials: 'DP',
    avatarBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    rating: 5,
    quote: 'Dashboard seller-nya intuitif. Upload produk cepat, notifikasi pesanan real-time, payout otomatis mingguan. Recommended!',
    author: 'Sari W.',
    role: 'Seller • Malang Vintage',
    initials: 'SW',
    avatarBg: 'bg-blue-100 text-blue-700',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} dari 5 bintang`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-amber-400 fill-current' : 'text-neutral-300'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <section id="testimoni" className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-widest text-[#E17100] uppercase">ULASAN PENGGUNA</p>
            <h2 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">Apa Kata Mereka</h2>
          </div>
          <Link
            href="/ulasan"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E17100] hover:text-[#E17100]/80 transition-colors"
          >
            Lihat Semua
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, index) => (
            <article
              key={index}
              className="group relative rounded-2xl bg-white border border-neutral-200 p-6 hover:shadow-xl hover:border-[#E17100]/30 transition-all duration-300"
            >
              <StarRating rating={t.rating} />

              <p className="mt-4 text-neutral-600 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold text-sm ${t.avatarBg}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{t.author}</p>
                  <p className="text-sm text-neutral-500">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
