import { Package, BarChart3, Truck, Shield, RotateCcw, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const sellerFeatures = [
  { icon: Package, title: 'Kelola Produk Mudah', desc: 'Upload foto, atur deskripsi, kategori, ukuran, & stok dalam hitungan menit' },
  { icon: BarChart3, title: 'Dashboard Penjualan', desc: 'Pantau omset, pesanan masuk, produk laris, & analitik toko real-time' },
  { icon: Truck, title: 'Pengiriman Fleksibel', desc: 'Support J&T, GoSend, Grab, hingga COD area Malang' },
  { icon: Shield, title: 'Rekber Aman', desc: 'Dana buyer tertahan hingga barang sampai & sesuai deskripsi' },
  { icon: RotateCcw, title: 'Retur & Garansi', desc: 'Sistem retur teratur & garansi deskripsi untuk kepercayaan buyer' },
  { icon: CreditCard, title: 'Payout Otomatis', desc: 'Cairkan dana ke rekening/bank e-wallet jadwal harian/mingguan' },
];

const featureIcons = [
  { bg: 'bg-amber-100', iconColor: 'text-amber-600', icon: Package },
  { bg: 'bg-emerald-100', iconColor: 'text-emerald-600', icon: BarChart3 },
  { bg: 'bg-blue-100', iconColor: 'text-blue-600', icon: Truck },
  { bg: 'bg-rose-100', iconColor: 'text-rose-600', icon: Shield },
  { bg: 'bg-purple-100', iconColor: 'text-purple-600', icon: RotateCcw },
  { bg: 'bg-orange-100', iconColor: 'text-orange-600', icon: CreditCard },
];

export default function SellerCTASection() {
  return (
    <section id="jual" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] lg:aspect-auto lg:h-[520px] shadow-lg">
              <img
                src="https://picsum.photos/seed/thrift-vintage/600/800"
                alt="Toko thrift vintage"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-600/10 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#E17100] text-white text-xs font-bold rounded-full px-3 py-1">
                COMMUNITY MALANG
              </div>
            </div>
          </div>

          {/* Center: Text + Buttons */}
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold tracking-widest text-[#E17100] uppercase mb-2">JUAL DI THRIFTHUB</p>
            <h2 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl leading-tight">
              Buka Toko Thrift Online
              <br />
              <span className="text-[#E17100]">Gratis & Mudah</span>
            </h2>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed max-w-lg mx-auto md:mx-0">
              Bergabung dengan ratusan seller Malang yang sudah sukses menjual ribuan produk. Gratis biaya daftar, tanpa fee bulanan, cuma fee transaksi kecil saat terjual.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-[#E17100] text-white rounded-lg px-8 py-3 font-semibold text-sm hover:bg-orange-600 transition-colors active:scale-[0.98]"
              >
                Daftar jadi Seller <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tentang"
                className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 rounded-lg px-8 py-3 font-medium text-sm hover:bg-neutral-50 transition-colors"
              >
                Lihat Panduan
              </Link>
            </div>
          </div>

          {/* Right: Feature List */}
          <div className="col-span-2 lg:col-start-3 space-y-4 mt-10 md:mt-0 lg:mt-0">
            {sellerFeatures.map((feature, index) => {
              const iconStyle = featureIcons[index];
              return (
                <div
                  key={feature.title}
                  className="flex gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconStyle.bg}`}>
                    <feature.icon className={`h-6 w-6 ${iconStyle.iconColor}`} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-sm">{feature.title}</h3>
                    <p className="mt-0.5 text-xs text-neutral-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

