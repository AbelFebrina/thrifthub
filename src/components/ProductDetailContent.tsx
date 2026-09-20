'use client';

import { useState } from 'react';
import { ChevronLeft, Share2, Flag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGallery from '@/components/ProductGallery';
import ProductInfo from '@/components/ProductInfo';
import StoreCard from '@/components/StoreCard';
import ReviewsSection from '@/components/ReviewsSection';
import RelatedProducts from '@/components/RelatedProducts';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

interface ProductDetailContentProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailContent({ product, relatedProducts }: ProductDetailContentProps) {
  const [activeTab, setActiveTab] = useState<'deskripsi' | 'spesifikasi' | 'ulasan'>('deskripsi');
  const router = useRouter();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();

  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : 0;

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      showToast('Silakan login terlebih dahulu', 'error');
      router.push('/login');
      return;
    }
    addToCart(product.id, 1);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Navbar />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-neutral-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#E17100] transition-colors">Beranda</Link>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <Link href="/produk" className="hover:text-[#E17100] transition-colors">Katalog</Link>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <Link href={`/produk?kategori=${product.category.toLowerCase()}`} className="hover:text-[#E17100] transition-colors">
                {product.category}
              </Link>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span className="text-neutral-900 font-medium truncate max-w-xs" aria-current="page">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Column: Gallery + Tabs */}
            <div className="space-y-8">
              {/* Product Gallery */}
              <ProductGallery 
                images={product.images} 
                name={product.name}
                discount={discount}
                condition={product.condition}
              />

              {/* Share & Report */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    <Share2 className="h-5 w-5" aria-hidden="true" />
                    Bagikan
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    <Flag className="h-5 w-5" aria-hidden="true" />
                    Laporkan
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-neutral-200">
                <nav className="flex gap-6" aria-label="Tab produk">
                  {[
                    { id: 'deskripsi', label: 'Deskripsi' },
                    { id: 'spesifikasi', label: 'Spesifikasi' },
                    { id: 'ulasan', label: `Ulasan (${product.reviewCount || 0})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`relative pb-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-[#E17100]'
                          : 'text-neutral-500 hover:text-neutral-700'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#E17100]" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Panels */}
              <div className="pt-6">
                {activeTab === 'deskripsi' && (
                  <div className="prose prose-neutral max-w-none">
                    <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{product.description}</p>
                  </div>
                )}
                {activeTab === 'spesifikasi' && (
                  <dl className="divide-y divide-neutral-200">
                    {[
                      { label: 'Kategori', value: product.category },
                      { label: 'Ukuran', value: product.size },
                      { label: 'Kondisi', value: product.condition },
                      { label: 'Bahan', value: product.material || '-' },
                      { label: 'Warna', value: product.color || '-' },
                      { label: 'Stok', value: `${product.stock} unit` },
                      { label: 'Lokasi', value: product.location },
                      { label: 'Dijual oleh', value: product.store },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4">
                        <dt className="text-sm text-neutral-500 sm:w-32">{item.label}</dt>
                        <dd className="mt-1 sm:mt-0 font-medium text-neutral-900">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {activeTab === 'ulasan' && (
                  <ReviewsSection
                    reviews={product.reviews || []}
                    averageRating={product.averageRating || 0}
                    reviewCount={product.reviewCount || 0}
                    productName={product.name}
                  />
                )}
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <RelatedProducts
                  products={relatedProducts}
                  title={relatedProducts.some(p => p.storeId === product.storeId)
                    ? 'Produk Lain dari Toko yang Sama'
                    : 'Produk Serupa'}
                />
              )}
            </div>

            {/* Right Column: Sticky Info + Store Card */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <ProductInfo product={product} />
              <StoreCard storeId={product.storeId} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-xl animate-slide-up">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-xs text-neutral-500">Total</p>
              <p className="font-bold text-[#E17100] text-lg">Rp {product.price.toLocaleString('id-ID')}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => addToCart(product.id, 1)}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-[#E17100] text-[#E17100] font-semibold hover:bg-[#E17100]/5 transition-colors"
              >
                + Keranjang
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center py-3 px-4 rounded-xl bg-[#E17100] text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
