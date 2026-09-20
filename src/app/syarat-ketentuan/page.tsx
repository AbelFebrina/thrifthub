import Navbar from '@/components/Navbar';

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold text-[#3e3028] mb-4">Syarat & Ketentuan</h1>
            <p className="text-[#a09080] text-lg">Terakhir diperbarui: 17 September 2025</p>
          </div>

          <div className="prose prose-[#3e3028] max-w-none space-y-8 text-[#6b4a30] leading-relaxed">
            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">1. Ketentuan Penggunaan</h2>
              <p className="mb-4">Dengan mengakses dan menggunakan platform ThriftHub, pengguna menyetujui untuk mematuhi semua ketentuan yang tercantum dalam dokumen ini. Penggunaan yang melanggar ketentuan ini dapat mengakibatkan pembatalan akun tanpa pemberitahuan.</p>
              <p className="mb-4">Pengguna wajib menjaga kerahasiaan akun dan kata sandi mereka. Setiap aktivitas yang dilakukan di bawah akun tersebut adalah tanggung jawab pengguna.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">2. Deskripsi Produk</h2>
              <p className="mb-4">Semua deskripsi produk di platform ThriftHub disediakan oleh para penjual dan dimaksudkan sebagai gambaran umum. ThriftHub berusaha untuk memastikan akurasi informasi namun tidak menjamin kesesuaian 100% antara deskripsi dengan kondisi produk fisik.</p>
              <p className="mb-4">Pengguna disarankan untuk memeriksa foto, ulasan, dan detail produk secara lengkap sebelum melakukan pembelian.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">3. Pembayaran & Rekber</h2>
              <p className="mb-4">Semua transaksi di ThriftHub menggunakan sistem rekber (rekening bersama) yang aman. Pembayaran dilakukan melalui transfer bank ke rekening ThriftHub. Dana akan diberikan kepada penjual setelah pembeli mengkonfirmasi penerimaan produk.</p>
              <p className="mb-4">Kasih adalah produk berbasis komunitas. Semua produk yang dijual di platform ThriftHub merupakan produk thrift/secondhand yang sudah digunakan oleh pemilik sebelumnya.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">4. Retur & Pengembalian</h2>
              <p className="mb-4">Pengguna dapat mengajukan retur dalam waktu 3 hari setelah produk diterima jika produk tidak sesuai dengan deskripsi. Proses retur memerlukan bukti fotografi dari kondisi produk.</p>
              <p className="mb-4">Pengembalian dana akan diproses ke rekening pembeli setelah penjual menyetujui retur.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">5. Larangan</h2>
              <p className="mb-4">Pengguna dilarang memposting produk ilegal, palsu, atau yang melanggar hak kekayaan intelektual. ThriftHub berhak menghapus produk atau menonaktifkan akun yang melanggar tanpa pemberitahuan.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">6. Kewajiban Penjual</h2>
              <p className="mb-4">Penjual wajib mengisi deskripsi produk secara jujur, mengunggah foto yang akurat, dan mengirimkan produk sesuai waktu yang disepakati. Pelanggaran dapat mengakibatkan penurunan peringkat atau penonaktifan toko.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">7. Perubahan Ketentuan</h2>
              <p className="mb-4">ThriftHub berhak mengubah ketentuan ini kapan saja. Perubahan akan diberitahukan melalui email dan/atau notifikasi di platform. Penggunaan platform setelah perubahan dianggap menerima ketentuan baru.</p>
            </section>

            <section className="bg-[#f7f2ea] rounded-xl p-6 mt-8">
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">Hubungi Kami</h2>
              <p className="mb-2">Jika kamu memiliki pertanyaan terkait Syarat & Ketentuan ini, hubungi kami di:</p>
              <p className="text-[#E17100] font-semibold">support@thrifthub.com</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

