import { ShoppingBag, MessageSquare, Music, X, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="ThriftHub Home">
              <ShoppingBag className="h-8 w-8 text-[#E17100]" aria-hidden="true" />
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                ThriftHub
              </span>
            </Link>
            <p className="mt-4 text-sm text-neutral-500 leading-relaxed">
              Marketplace thrift & preloved terkurasi Malang. Menghubungkan seller lokal
              dengan buyer yang mencari fashion unik, berkelanjutan, & terjangkau.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors" aria-label="Instagram">
                <MessageSquare className="h-5 w-5 text-neutral-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors" aria-label="TikTok">
                <Music className="h-5 w-5 text-neutral-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors" aria-label="Twitter">
                <X className="h-5 w-5 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Di Mana Kami */}
          <div>
            <h3 className="font-semibold text-white">DI MANA KAMI</h3>
            <address className="mt-4 space-y-3 text-sm not-italic text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#E17100]" aria-hidden="true" />
                <span>Jl. Soekarno-Hatta No. 123, Malang, Jawa Timur 65142</span>
              </div>
              <p className="ml-7 text-neutral-500">Senin - Sabtu: 09.00 - 18.00 WIB</p>
              <p className="ml-7 text-neutral-500">Minggu: Tutup</p>
            </address>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h3 className="font-semibold text-white">KONTAK</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0 text-[#E17100]" aria-hidden="true" />
                <a href="mailto:hello@thrifthubmalang.com" className="hover:text-[#E17100] transition-colors">
                  hello@thrifthubmalang.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0 text-[#E17100]" aria-hidden="true" />
                <a href="tel:+6281234567890" className="hover:text-[#E17100] transition-colors">
                  +62 812-3456-7890 (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#E17100]" aria-hidden="true" />
                <a href="/kontak" className="hover:text-[#E17100] transition-colors">
                  Pusat Bantuan & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Sosial Media */}
          <div>
            <h3 className="font-semibold text-white">SOSIAL MEDIA</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="#" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                  <MessageSquare className="h-5 w-5 text-[#E17100]" aria-hidden="true" />
                  <span>@thrifthub.malang</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                  <Music className="h-5 w-5 text-[#E17100]" aria-hidden="true" />
                  <span>@thrifthubmalang</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                  <X className="h-5 w-5 text-[#E17100]" aria-hidden="true" />
                  <span>@thrifthubmalang</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5 text-[#E17100]" aria-hidden="true" />
                  <span>hello@thrifthubmalang.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-neutral-500">
              © 2026 ThriftHub. Hak cipta dilindungi.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6" aria-label="Footer navigation">
              <Link href="/syarat-ketentuan" className="text-sm text-neutral-500 hover:text-[#E17100] transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="/kebijakan-privasi" className="text-sm text-neutral-500 hover:text-[#E17100] transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="text-sm text-neutral-500 hover:text-[#E17100] transition-colors">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
