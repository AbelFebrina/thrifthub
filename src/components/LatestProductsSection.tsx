import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LatestProductsSection() {
  // Show 8 products for 4x2 grid
  const displayProducts = products.slice(0, 8);

  return (
    <section id="produk-terbaru" className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-widest text-[#E17100] uppercase">PRODUK TERBARU</p>
            <h2 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">Produk Baru Masuk</h2>
          </div>
          <Link
            href="/produk"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E17100] hover:text-[#E17100]/80 transition-colors"
          >
            Lihat Semua
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
}
