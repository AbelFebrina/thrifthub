'use client';

import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const faqs = [
  {
    q: 'Apa itu ThriftHub?',
    a: 'ThriftHub adalah marketplace thrift online yang menghubungkan penjual dan pembeli pakaian bekas berkualitas dengan harga terjangkau.',
  },
  {
    q: 'Bagaimana cara belanja di ThriftHub?',
    a: 'Buat akun, cari produk yang kamu inginkan, tambahkan ke keranjang, dan lakukan pembayaran via rekber. Produk akan dikirim setelah konfirmasi pembayaran.',
  },
  {
    q: 'Apakah aman berbelanja di ThriftHub?',
    a: 'Ya! Kami menggunakan sistem rekber aman, dan memberikan garansi deskripsi. Jika produk tidak sesuai deskripsi, kamu bisa mengajukan refund.',
  },
  {
    q: 'Berapa lama pengiriman?',
    a: 'Pengiriman memakan waktu 1-3 hari kerja untuk wilayah Jawa dan 3-7 hari kerja untuk wilayah luar Jawa.',
  },
  {
    q: 'Bagaimana jika produk tidak sesuai?',
    a: 'Kamu bisa mengajukan pengaduan dalam 3 hari setelah penerimaan. Tim dukungan kami akan membantu proses retur atau refund.',
  },
  {
    q: 'Bisakah jualan di ThriftHub?',
    a: 'Tentu! Buka toko gratis di ThriftHub. Daftar sebagai penjual dan mulai posting produk thrift-mu hari ini.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E17100] to-[#c95c00] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-display text-4xl font-bold text-[#3e3028] mb-4">FAQ</h1>
            <p className="text-[#a09080] text-lg">Pertanyaan yang sering diajukan tentang ThriftHub</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#e8dcc8] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#f7f2ea] transition-colors"
                >
                  <span className="font-semibold text-[#3e3028] text-sm">{faq.q}</span>
                  {openIndex === i ? <ChevronUp className="h-5 w-5 text-[#E17100] shrink-0" /> : <ChevronDown className="h-5 w-5 text-[#c95c00] shrink-0" />}
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 text-sm text-[#6b4a30] leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#a09080] text-sm mb-4">Masih punya pertanyaan?</p>
            <Link href="/kontak" className="inline-flex items-center gap-2 rounded-xl bg-[#E17100] px-6 py-3 text-white font-semibold text-sm hover:bg-[#6b4a30] transition-colors">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </main>

      <style>{`@keyframes fade-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} } .animate-fade-in { animation: fade-in 0.3s ease-out both; }`}</style>
    </div>
  );
}

