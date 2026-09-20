import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Accordion from './Accordion';
import { Target, Handshake, MapPin, Clock, Mail, Phone } from 'lucide-react';

const timelineData = [
  { year: '2024', title: 'Berdiri di Malang', desc: 'ThriftHub resmi berdiri sebagai marketplace thrift terkurasi pertama di Malang.' },
  { year: '2025', title: 'Toko Pertama Bergabung', desc: '50 toko lokal Malang bergabung pada bulan pertama peluncuran platform.' },
  { year: '2025', title: 'Ekspansi Kategori', desc: 'Katalog diperluas hingga mencakup fashion, aksesoris, buku, dan elektronik preloved.' },
  { year: '2026', title: 'Lebih dari 500 Toko', desc: 'ThriftHub mencapai 500+ toko terverifikasi dan ratusan ribu transaksi sukses.' },
];

const galleryImages = [
  { seed: 'thrift-shop', w: 600, h: 400, caption: 'Toko Thrift Malang' },
  { seed: 'preloved-rack', w: 400, h: 400, caption: 'Rak Preloved' },
  { seed: 'thrift-shopping', w: 400, h: 400, caption: 'Belanja Thrift' },
  { seed: 'community-meet', w: 600, h: 400, caption: 'Meetup Komunitas' },
  { seed: 'vintage-fashion', w: 400, h: 400, caption: 'Fashion Vintage' },
  { seed: 'thrift-event', w: 600, h: 400, caption: 'Acara Komunitas' },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Navbar />
      <main>
        {/* ============================================ */}
        {/* 1. HERO "Tentang Kami" — TIDAK DIUBAH      */}
        {/* ============================================ */}
        <section className="relative min-h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-[#E17100]/20" />
            <div
              className="absolute inset-0 bg-[url('https://picsum.photos/seed/thrift-about-hero/1920/1080')] bg-cover bg-center opacity-15"
              aria-hidden="true"
            />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <nav className="mb-8 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/" className="text-neutral-400 hover:text-white transition-colors">Beranda</Link>
              <span className="text-neutral-500" aria-hidden="true">/</span>
              <span className="text-white font-medium" aria-current="page">Tentang Kami</span>
            </nav>
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Menghubungkan Pecinta Thrift di Malang
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-2xl">
                ThriftHub hadir sebagai marketplace thrift & preloved terkurasi pertama di Malang yang menghubungkan 
                seller lokal terpercaya dengan buyer yang mencari fashion unik, berkelanjutan, & terjangkau — 
                semua dalam satu platform aman dengan sistem rekber terintegrasi.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 2. VISI & MISI — Opsi A: Kedua card navy    */}
        {/* ============================================ */}
        <section id="visi-misi" className="py-16 md:py-20 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-14">
              <p className="mb-3 text-xs font-semibold tracking-widest text-[#E17100] uppercase">Tentang Kami</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">Visi & Misi Kami</h2>
              <p className="mt-4 max-w-2xl mx-auto text-neutral-600 text-base">Intisari dari apa yang kami bangun dan arahkan untuk masa depan ThriftHub.</p>
            </div>
            <div className="grid gap-6 md:gap-8 md:grid-cols-2">
              {/* Visi Card — navy base, white accent */}
              <div className="rounded-2xl bg-neutral-900 border border-neutral-700 p-8 md:p-10 hover:border-[#E17100]/50 hover:shadow-lg hover:shadow-[#E17100]/10 transition-all duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white mb-6">
                  <Target className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">Visi Kami</h3>
                <p className="text-neutral-300 leading-relaxed text-base">
                  Menjadi marketplace thrift & preloved terkemuka di Indonesia yang menghubungkan komunitas lokal dengan gaya hidup berkelanjutan, melalui platform digital yang aman, terkurasi, dan berdampak sosial.
                </p>
              </div>
              {/* Misi Card — navy base, orange accent */}
              <div className="rounded-2xl bg-neutral-900 border border-neutral-700 p-8 md:p-10 hover:border-[#E17100]/50 hover:shadow-lg hover:shadow-[#E17100]/10 transition-all duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E17100]/20 text-[#E17100] mb-6">
                  <Handshake className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">Misi Kami</h3>
                <ul className="space-y-3">
                  {[
                    'Membangun ekosistem thrift yang aman, terpercaya, dan berdampak positif bagi komunitas lokal.',
                    'Kurasi produk berkualitas tinggi yang mendukung gaya hidup berkelanjutan dan mengurangi limbah tekstil.',
                    'Menghubungkan seller dan buyer di seluruh Indonesia dengan sistem rekber yang transparan dan aman.',
                    'Menginspirasi generasi muda untuk mengadopsi fashion sadar lingkungan melalui komunitas lokal.',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-300">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#E17100]" aria-hidden="true" />
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 3. PERJALANAN KAMI (TIMELINE)               */}
        {/* ============================================ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="mb-3 text-xs font-semibold tracking-widest text-[#E17100] uppercase">Sejarah Kami</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">Perjalanan Kami</h2>
              <p className="mt-4 max-w-2xl mx-auto text-neutral-600 text-base">Dari nol hingga menjadi marketplace terpercaya — berikut tonggak penting yang kami lalui.</p>
            </div>
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E17100]/30 via-neutral-200 to-transparent" aria-hidden="true" />
              <div className="space-y-8 md:space-y-10">
                {timelineData.map((item, index) => (
                  <div key={index} className="relative flex items-center">
                    {/* Dot on center line */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#E17100] text-white font-display font-bold text-xs shadow-md shadow-[#E17100]/25" aria-hidden="true">
                      {item.year}
                    </div>
                    {/* Connector line from dot to card */}
                    <div className="hidden md:block absolute left-6 md:left-1/2 md:-translate-x-1/2 z-0 h-9 w-0 border-l-2 border-dashed border-[#E17100]/30" style={{ top: '2.25rem' }} aria-hidden="true" />
                    {/* Card — alternates left/right on desktop, all right on mobile */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-14 md:ml-0' : 'md:ml-auto md:pl-14 md:mr-0'} md:ml-0`}>
                      <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-5 hover:shadow-md hover:border-[#E17100]/30 transition-all duration-300">
                        <p className="font-display text-sm font-bold text-[#E17100] mb-1">{item.year}</p>
                        <h3 className="font-semibold text-neutral-900 text-base mb-1">{item.title}</h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 4. KENAPA PILIH THRIFT HUB (ACCORDION)      */}
        {/* ============================================ */}
        <section id="accordion" className="py-16 md:py-20 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-2 md:items-start">
              {/* Left column: Title + visual element */}
              <div className="mx-auto text-center md:sticky md:top-20">
                <p className="mb-3 text-xs font-semibold tracking-widest text-[#E17100] uppercase">Pertanyaan Umum</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Kenapa Pilih ThriftHub?</h2>
                <p className="text-neutral-600 text-base leading-relaxed">Jawaban atas pertanyaan-pertanyaan yang sering diajukan oleh member komunitas kami.</p>
              </div>
              {/* Right column: Accordion */}
              <div className="max-w-xl md:max-w-none">
                <Accordion />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 5. GALERI SUASANA — Structured grid          */}
        {/* ============================================ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="mb-3 text-xs font-semibold tracking-widest text-[#E17100] uppercase">Galeri</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">Galeri Suasana</h2>
              <p className="mt-4 max-w-xl mx-auto text-neutral-600 text-base">Momen-momen kebersamaan, kegiatan komunitas, dan suasana toko ThriftHub.</p>
            </div>
            {/* Structured grid: 3 cols, 2 rows, alternating pattern */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {/* Row 1: Large | Small | Small */}
              <div className="col-span-2 row-span-1 relative overflow-hidden rounded-xl group cursor-pointer aspect-[3/2]">
                <img src={`https://picsum.photos/seed/${galleryImages[0].seed}/800/533`} alt={galleryImages[0].caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><span className="bg-white/90 text-neutral-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">{galleryImages[0].caption}</span></div>
              </div>
              <div className="relative overflow-hidden rounded-xl group cursor-pointer aspect-[1/1]">
                <img src={`https://picsum.photos/seed/${galleryImages[1].seed}/533/533`} alt={galleryImages[1].caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><span className="bg-white/90 text-neutral-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">{galleryImages[1].caption}</span></div>
              </div>
              <div className="relative overflow-hidden rounded-xl group cursor-pointer aspect-[1/1]">
                <img src={`https://picsum.photos/seed/${galleryImages[2].seed}/533/533`} alt={galleryImages[2].caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><span className="bg-white/90 text-neutral-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">{galleryImages[2].caption}</span></div>
              </div>
              {/* Row 2: Small | Large | Small */}
              <div className="relative overflow-hidden rounded-xl group cursor-pointer aspect-[1/1]">
                <img src={`https://picsum.photos/seed/${galleryImages[3].seed}/533/533`} alt={galleryImages[3].caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><span className="bg-white/90 text-neutral-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">{galleryImages[3].caption}</span></div>
              </div>
              <div className="col-span-2 row-span-1 relative overflow-hidden rounded-xl group cursor-pointer aspect-[3/2]">
                <img src={`https://picsum.photos/seed/${galleryImages[4].seed}/800/533`} alt={galleryImages[4].caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><span className="bg-white/90 text-neutral-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">{galleryImages[4].caption}</span></div>
              </div>
              <div className="relative overflow-hidden rounded-xl group cursor-pointer aspect-[1/1]">
                <img src={`https://picsum.photos/seed/${galleryImages[5].seed}/533/533`} alt={galleryImages[5].caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><span className="bg-white/90 text-neutral-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">{galleryImages[5].caption}</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 6. LOKASI PENJUAL & KONTAK                  */}
        {/* ============================================ */}
        <section className="py-16 md:py-20 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="mb-3 text-xs font-semibold tracking-widest text-[#E17100] uppercase">Peta Penjual</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">Lokasi Para Penjual Thrift di Malang</h2>
              <p className="mt-4 max-w-xl mx-auto text-neutral-600 text-base">Temukan toko thrift terdekat di seluruh Malang Raya dan sekitarnya.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Map — styled iframe */}
              <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
                <div className="relative aspect-[4/3] md:aspect-[16/10]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.276!2d112.6373!3d-7.9666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40a00000000000!2sMalang!5e0!3m2!1sid!2sid"
                    className="h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi toko thrift di Malang"
                  />
                </div>
              </div>
              {/* Contact Info — matching height */}
              <div className="flex flex-col justify-center gap-6 rounded-2xl bg-white border border-neutral-200 p-8 shadow-sm">
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: 'Penjual di Seluruh Malang', desc: 'Lebih dari 500+ toko thrift terverifikasi tersebar di Kota Malang, Batu, Kepanjen, Blitar, dan sekitarnya.' },
                    { icon: Clock, label: 'Jam Operasional', desc: 'Senin - Sabtu: 09.00 - 18.00 WIB\nMinggu: Tutup' },
                    { icon: Mail, label: 'Email', desc: 'hello@thrifthubmalang.com' },
                    { icon: Phone, label: 'WhatsApp', desc: '+62 812-3456-7890' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E17100]/10 text-[#E17100]">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900">{item.label}</h4>
                        <p className="mt-0.5 text-sm text-neutral-600 leading-relaxed whitespace-pre-line">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a href="https://wa.me/6281234567890" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E17100] px-6 py-3 text-sm font-semibold text-white hover:bg-[#c95c00] transition-colors w-full sm:w-auto">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Hubungi via WhatsApp
                  </a>
                  <a href="mailto:hello@thrifthubmalang.com" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 hover:border-[#E17100] hover:text-[#E17100] transition-colors w-full sm:w-auto">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Kirim Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

