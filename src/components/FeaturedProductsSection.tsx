import { featuredProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProductsSection() {
  return (
    <section id="produk-unggulan" className="py-12 sm:py-16 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold tracking-widest text-[#E17100] uppercase">PRODUK UNGGULAN</p>
          <h2 className="relative inline-block font-display text-3xl font-bold text-white sm:text-4xl">
            Produk Pilihan
            <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-16 h-1 bg-[#E17100] rounded-full" aria-hidden="true" />
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="featured" />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/produk"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#E17100] bg-transparent px-8 py-3 text-base font-semibold text-[#E17100] transition-colors hover:bg-[#E17100] hover:text-white"
          >
            Lihat Semua Produk
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
