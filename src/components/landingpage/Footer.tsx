import { ShoppingBag, Star, Music, X, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Kolom 1: Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-7 w-7 text-[#E17100]" />
              <span className="font-display text-xl font-bold tracking-tight">ThriftHub</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Marketplace thrift & preloved terpercaya di Malang.
              Temukan pakaian vintage berkualitas dari seller lokal.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <Link href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors" aria-label="Instagram">
                <Star className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors" aria-label="TikTok">
                <Music className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors" aria-label="Twitter">
                <X className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Kolom 2: Di Mana Kami */}
          <div>
            <h4 className="text-sm font-semibold mb-4">DI MANA KAMI</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-400">Jl. Veteran No. 42, Malang, Jawa Timur</p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-400">Senin-Sabtu, 09:00 - 21:00 WIB</p>
              </div>
            </div>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h4 className="text-sm font-semibold mb-4">KONTAK</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                <p className="text-sm text-slate-400">hello@thrifthubmalang.id</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                <p className="text-sm text-slate-400">+62 812-3456-7890</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-400">Kantor Pusat Malang, Jawa Timur</p>
              </div>
            </div>
          </div>

          {/* Kolom 4: Sosial Media */}
          <div>
            <h4 className="text-sm font-semibold mb-4">SOSIAL MEDIA</h4>
            <div className="space-y-3">
              <Link href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Star className="h-4 w-4" /> @thrifthub.malang
              </Link>
              <Link href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Music className="h-4 w-4" /> @thrifthubmalang
              </Link>
              <Link href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <X className="h-4 w-4" /> @thrifthubmalang
              </Link>
              <Link href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4" /> hello@thrifthubmalang.id
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2025 ThriftHub Malang. Marketplace thrift & preloved terpercaya, menghubungkan seller lokal dengan pembeli Malang Raya.</p>
          <div className="flex gap-4">
            <Link href="/syarat-ketentuan" className="text-xs text-slate-500 hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="/kebijakan-privasi" className="text-xs text-slate-500 hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

