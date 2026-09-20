'use client';

import { Star } from 'lucide-react';
import Link from 'next/link';

const testimonials = [
  {
    name: 'Sarah P.',
    role: 'Buyer • Malang',
    initials: 'SP',
    bgColor: 'bg-amber-100 text-amber-700',
    quote: 'Kualitas thriftnya luar biasa! Barang-barang yang saya beli kondisinya sangat bagus dan harganya benar-benar terjangkau. Senang bisa temukan barang vintage berkualitas di sini.',
    rating: 5,
  },
  {
    name: 'Budi W.',
    role: 'Seller • Malang Vintage',
    initials: 'BW',
    bgColor: 'bg-blue-100 text-blue-700',
    quote: 'Sejak bergabung jadi seller di ThriftHub, omzet saya naik 3x! Platformnya mudah dipakai dan pembeli ramah. Proses rekber juga aman dan terpercaya.',
    rating: 5,
  },
  {
    name: 'Diana R.',
    role: 'Buyer • Batu',
    initials: 'DR',
    bgColor: 'bg-green-100 text-green-700',
    quote: 'Love banget sama ThriftHub! Setiap kali buka app ada new drops yang keren-keren. Customer service-nya juga fast response, recommend banget buat thrift lovers.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-2">
          <div>
            <p className="mb-1 text-xs font-semibold tracking-widest text-[#E17100] uppercase">Ulasan Pengguna</p>
            <h2 className="text-2xl font-bold text-neutral-900">Apa Kata Mereka</h2>
          </div>
          <Link href="/ulasan" className="text-sm font-medium text-[#E17100] hover:underline">
            Lihat Semua →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="border border-neutral-200 rounded-xl p-6">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-neutral-600 italic leading-relaxed mb-4">{testimonial.quote}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${testimonial.bgColor}`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{testimonial.name}</p>
                  <p className="text-xs text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

