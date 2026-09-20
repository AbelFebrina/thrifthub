export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold text-[#3e3028] mb-4">Kebijakan Privasi</h1>
            <p className="text-[#a09080] text-lg">Terakhir diperbarui: 17 September 2025</p>
          </div>

          <div className="prose prose-[#3e3028] max-w-none space-y-8 text-[#705548] leading-relaxed">
            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">1. Pengumpulan Data</h2>
              <p className="mb-4">ThriftHub mengumpulkan data pribadi seperti nama, email, nomor telepon, dan alamat pengiriman yang diperlukan untuk memproses transaksi. Data ini hanya digunakan untuk keperluan operasional platform.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">2. Penggunaan Data</h2>
              <p className="mb-4">Data yang dikumpulkan digunakan untuk memproses pesanan, menghubungi pengguna terkait transaksi, mengirimkan notifikasi produk, dan meningkatkan layanan kami. Data tidak akan dijual atau dibagikan kepada pihak ketiga tanpa persetujuan pengguna.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">3. Penyimpanan Data</h2>
              <p className="mb-4">Data pengguna disimpan pada server yang aman dengan enkripsi standar industri. ThriftHub menerapkan langkah-langkah keamanan yang wajar untuk melindungi data dari akses tidak sah.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">4. Cookie</h2>
              <p className="mb-4">Platform ThriftHub menggunakan cookie untuk meningkatkan pengalaman pengguna, mengingat preferensi login, dan menganalisis lalu lintas. Pengguna dapat mengelola cookie melalui pengaturan browser mereka.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">5. Hak Pengguna</h2>
              <p className="mb-4">Pengguna berhak untuk mengakses, memperbarui, dan menghapus data pribadi mereka. Hubungi kami di support@thrifthub.com untuk mengajukan permintaan terkait data pribadi.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">6. Berbagi Data dengan Pihak Ketiga</h2>
              <p className="mb-4">ThriftHub tidak menjual atau menyewakan data pribadi pengguna. Dalam kasus tertentu, data dapat dibagikan dengan mitra layanan pembayaran, pengiriman, atau sesuai kewajiban hukum.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">7. Perubahan Kebijakan</h2>
              <p className="mb-4">ThriftHub berhak mengubah kebijakan ini kapan saja. Perubahan akan diberitahukan melalui email dan/atau pemberitahuan di platform.</p>
            </section>

            <section className="bg-[#f7f2ea] rounded-xl p-6 mt-8">
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-4">Hubungi Kami</h2>
              <p className="mb-2">Pertanyaan terkait kebijakan privasi? Hubungi:</p>
              <p className="text-[#8a5a2b] font-semibold">privacy@thrifthub.com</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

