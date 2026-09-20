const stats = [
  { value: '500+', label: 'Produk thrift' },
  { value: '50+', label: 'Toko terverifikasi' },
  { value: '4.8 ★', label: 'Rating rata-rata' },
  { value: 'Malang', label: 'Dan sekitarnya' },
];

export default function TrustBar() {
  return (
    <section className="bg-neutral-50 border-y border-neutral-200 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className="flex flex-col items-center text-center"
              style={{ borderRight: index < stats.length - 1 ? '1px solid' : 'none', borderColor: 'rgba(163, 163, 163, 0.3)' }}
            >
              <p className="font-display text-2xl sm:text-3xl font-medium text-neutral-900">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
