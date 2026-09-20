import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl font-bold text-[#3e3028] mb-4">Kontak Kami</h1>
            <p className="text-[#a09080] text-lg">Kami siap membantu. Hubungi kami melalui cara berikut</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dcc8] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E17100]/10 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-[#E17100]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e3028]">Email</h3>
                  <p className="text-sm text-[#a09080]">support@thrifthub.com</p>
                  <p className="text-sm text-[#a09080]">bantuan@thrifthub.com</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dcc8] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E17100]/10 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-[#E17100]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e3028]">Telepon</h3>
                  <p className="text-sm text-[#a09080]">+62 812-3456-7890</p>
                  <p className="text-sm text-[#a09080]">Senin - Sabtu, 08:00 - 21:00 WIB</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dcc8] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E17100]/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-[#E17100]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e3028]">Alamat</h3>
                  <p className="text-sm text-[#a09080]">Jl. Malang No. 123, Kota Malang, Jawa Timur</p>
                  <p className="text-sm text-[#a09080]">Indonesia</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dcc8] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E17100]/10 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-[#E17100]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e3028]">Jam Operasional</h3>
                  <p className="text-sm text-[#a09080]">Senin - Jumat: 08:00 - 21:00 WIB</p>
                  <p className="text-sm text-[#a09080]">Sabtu: 09:00 - 17:00 WIB</p>
                  <p className="text-sm text-[#a09080]">Minggu & Hari Libur: Tutup</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e8dcc8]">
              <h2 className="font-display text-xl font-bold text-[#3e3028] mb-6">Kirim Pesan</h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Nama</label>
                  <input type="text" placeholder="Nama lengkapmu"
                    className="w-full rounded-xl border border-[#e8dcc8] bg-[#f7f2ea] px-4 py-3 text-[#3e3028] placeholder-[#c95c00] focus:outline-none focus:ring-2 focus:ring-[#E17100]/30 focus:border-[#E17100] text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Email</label>
                  <input type="email" placeholder="contoh@email.com"
                    className="w-full rounded-xl border border-[#e8dcc8] bg-[#f7f2ea] px-4 py-3 text-[#3e3028] placeholder-[#c95c00] focus:outline-none focus:ring-2 focus:ring-[#E17100]/30 focus:border-[#E17100] text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Pesan</label>
                  <textarea placeholder="Tulis pesanmu di sini..." rows={4}
                    className="w-full rounded-xl border border-[#e8dcc8] bg-[#f7f2ea] px-4 py-3 text-[#3e3028] placeholder-[#c95c00] focus:outline-none focus:ring-2 focus:ring-[#E17100]/30 focus:border-[#E17100] text-sm resize-none" />
                </div>
                <button type="submit"
                  className="w-full rounded-xl bg-[#E17100] py-3.5 text-white font-semibold text-sm hover:bg-[#6b4a30] transition-colors active:scale-[0.98]">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

