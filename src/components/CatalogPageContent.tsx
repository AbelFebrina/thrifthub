'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Grid, List, Search, X, Check, Shield, MapPin, Truck, Star } from 'lucide-react';
import { allProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { priceRanges, conditions, locations, sortOptions } from '@/data/catalog';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

const ITEMS_PER_PAGE = 20;

// Category pills as per design reference
const categoryPills = [
  { label: 'Semua', value: '' },
  { label: 'Vintage Band Tee', value: 'vintage-band-tee' },
  { label: 'Workwear & Denim', value: 'workwear-denim' },
  { label: 'Tracktop Retro', value: 'tracktop-retro' },
  { label: 'Hoodie & Crewneck', value: 'hoodie-crewneck' },
  { label: 'Sepatu', value: 'sepatu' },
  { label: 'Local Seller', value: 'local-seller' },
];

export default function CatalogPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [listView, setListView] = useState(false);
  const [activeCategoryPill, setActiveCategoryPill] = useState('');
  const [expandedFilterChips, setExpandedFilterChips] = useState(false);

  // Parse URL params
  const q = searchParams.get('q')?.toLowerCase() || '';
  const kategori = searchParams.get('kategori') || '';
  const ukuran = searchParams.get('ukuran') || '';
  const kondisiStr = searchParams.get('kondisi') || '';
  const hargaMin = searchParams.get('hargaMin') ? Number(searchParams.get('hargaMin')) : null;
  const hargaMax = searchParams.get('hargaMax') ? Number(searchParams.get('hargaMax')) : null;
  const lokasi = searchParams.get('lokasi') || '';
  const rating = searchParams.get('rating') ? Number(searchParams.get('rating')) : null;
  const toko = searchParams.get('toko')?.toLowerCase() || '';
  const sort = searchParams.get('sort') || 'terbaru';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const kondisiArray = kondisiStr.split(',').filter(Boolean);

  // Sync category pill with URL kategori param
  useEffect(() => {
    setActiveCategoryPill(kategori);
  }, [kategori]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      if (q && !product.name.toLowerCase().includes(q) && !product.description.toLowerCase().includes(q)) {
        return false;
      }
      if (kategori && product.category.toLowerCase() !== kategori.toLowerCase()) {
        return false;
      }
      if (ukuran && product.size !== ukuran) {
        return false;
      }
      if (kondisiArray.length > 0 && !kondisiArray.includes(product.condition)) {
        return false;
      }
      if (hargaMin !== null && product.price < hargaMin) {
        return false;
      }
      if (hargaMax !== null && product.price > hargaMax) {
        return false;
      }
      if (lokasi && product.location !== lokasi) {
        return false;
      }
      if (rating !== null && (product.averageRating || 0) < rating) {
        return false;
      }
      if (toko && !product.store.toLowerCase().includes(toko)) {
        return false;
      }
      return true;
    });

    // Sort
    switch (sort) {
      case 'harga-termurah':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'harga-termahal':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'terlaris':
        result = [...result].sort((a, b) => b.sold - a.sold);
        break;
      case 'rating-tinggi':
        result = [...result].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case 'terbaru':
      default:
        result = [...result].sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [q, kategori, ukuran, kondisiArray, hargaMin, hargaMax, lokasi, rating, toko, sort]);

  // Category counts for sidebar
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allProducts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(page, totalPages || 1);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage > 1) {
      params.set('page', String(newPage));
    } else {
      params.delete('page');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const changeSort = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryPillClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('kategori', value);
    } else {
      params.delete('kategori');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
    setActiveCategoryPill(value);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (kategori) count++;
    if (ukuran) count++;
    if (kondisiArray.length > 0) count++;
    if (lokasi) count++;
    if (hargaMin !== null || hargaMax !== null) count++;
    if (rating !== null) count++;
    if (toko) count++;
    return count;
  }, [kategori, ukuran, kondisiArray, lokasi, hargaMin, hargaMax, rating, toko]);

  // Build active filter chips for the filter bar
  const activeFilters = useMemo(() => {
    const filters: { label: string; value: string; key: string }[] = [];
    if (kategori) filters.push({ label: `Kategori: ${kategori}`, value: kategori, key: 'kategori' });
    if (ukuran) filters.push({ label: `Ukuran: ${ukuran}`, value: ukuran, key: 'ukuran' });
    if (kondisiArray.length > 0) filters.push({ label: `Kondisi: ${kondisiArray.join(', ')}`, value: kondisiStr, key: 'kondisi' });
    if (lokasi) filters.push({ label: `Lokasi: ${lokasi}`, value: lokasi, key: 'lokasi' });
    if (hargaMin !== null || hargaMax !== null) {
      const min = hargaMin ? `Rp ${hargaMin.toLocaleString('id-ID')}` : 'Min';
      const max = hargaMax ? `Rp ${hargaMax.toLocaleString('id-ID')}` : 'Max';
      filters.push({ label: `Harga: ${min} - ${max}`, value: `${hargaMin || ''}-${hargaMax || ''}`, key: 'harga' });
    }
    if (rating !== null) filters.push({ label: `Rating: ${rating}+`, value: String(rating), key: 'rating' });
    if (toko) filters.push({ label: `Toko: ${toko}`, value: toko, key: 'toko' });
    return filters;
  }, [kategori, ukuran, kondisiStr, kondisiArray, lokasi, hargaMin, hargaMax, rating, toko]);

  const handleQuickAdd = (productId: number) => {
    addToCart(productId);
    const product = allProducts.find(p => p.id === productId);
    showToast(`${product?.name || 'Produk'} ditambahkan ke keranjang`, 'success');
  };

  const handleToggleWishlist = (productId: number) => {
    toggleWishlist(productId);
    showToast(isInWishlist(productId) ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist', 'info');
  };

  const clearAllFilters = () => {
    router.push(pathname);
    showToast('Semua filter direset', 'info');
  };

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const formatPrice = (price: number) => 'Rp ' + price.toLocaleString('id-ID');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-neutral-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#E17100] transition-colors">Beranda</Link>
        <span aria-hidden="true" className="text-neutral-300">›</span>
        <Link href="/produk" className="hover:text-[#E17100] transition-colors">Katalog Produk</Link>
        {kategori && (
          <>
            <span aria-hidden="true" className="text-neutral-300">›</span>
            <span className="text-neutral-900 font-medium capitalize">{kategori}</span>
          </>
        )}
      </nav>

      {/* 2. Page Header */}
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold tracking-widest text-[#E17100] uppercase">ARSIP & THRIFT MALANG</p>
        <h1 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
          {kategori ? `${kategori.charAt(0).toUpperCase() + kategori.slice(1)}` : 'Semua Koleksi'}
        </h1>
        <p className="mt-1 text-neutral-600">Temukan produk thrift favoritmu dari berbagai toko Malang</p>
        
        {/* Trust badges - desktop only */}
        <div className="hidden md:flex mt-4 flex-wrap items-center gap-4 text-sm text-neutral-600">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-[#E17100]" aria-hidden="true" />
            100% Terverifikasi
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-[#E17100]" aria-hidden="true" />
            Buka COD Malang
          </span>
        </div>
      </div>

      {/* 3. Category Pills */}
      <div className="mb-4 overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          {categoryPills.map((pill) => {
            const isActive = activeCategoryPill === pill.value;
            return (
              <button
                key={pill.value}
                type="button"
                onClick={() => handleCategoryPillClick(pill.value)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#E17100] text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                }`}
                aria-pressed={isActive}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Filter Info Bar */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white rounded-xl border border-neutral-200 shadow-sm">
        {/* Left: Showing X products */}
        <div className="flex items-center gap-2 text-sm text-neutral-600 flex-wrap">
          <span>
            Menampilkan <strong className="text-neutral-900">{paginatedProducts.length}</strong> dari <strong className="text-neutral-900">{filteredProducts.length}</strong> produk
          </span>
        </div>

        {/* Center: Active Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1"
            >
              {filter.label}
              <button
                type="button"
                onClick={() => removeFilter(filter.key)}
                className="p-0.5 rounded-full hover:bg-amber-200 transition-colors"
                aria-label={`Hapus filter ${filter.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-medium text-[#E17100] hover:text-orange-700 underline"
            >
              Reset
            </button>
          )}
        </div>

        {/* Right: Sort Dropdown */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => changeSort(e.target.value)}
            className="appearance-none rounded-lg border border-neutral-300 bg-white px-8 py-2 pr-10 text-sm text-neutral-900 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 cursor-pointer min-w-[160px]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
        </div>
      </div>

      {/* 5. Main Layout: Sidebar + Grid */}
      <div className="flex gap-6 lg:gap-8">
        {/* Sidebar Filter */}
        <FilterSidebar
          activeFilterCount={activeFilterCount}
          onClearAll={clearAllFilters}
          categoryCounts={categoryCounts}
        />

        {/* Product Grid Area */}
        <div className="flex-1 min-w-0">
          <ProductGrid
            products={paginatedProducts}
            view={listView ? 'list' : 'grid'}
            onQuickAdd={handleQuickAdd}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={isInWishlist}
          />

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-[#f7f2ea] rounded-full flex items-center justify-center mb-6">
                <Search className="h-12 w-12 text-neutral-300" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">Produk tidak ditemukan</h3>
              <p className="text-sm text-neutral-500 mb-2 max-w-md">Coba ubah filter atau kata kunci pencarianmu. Tidak ada produk yang cocok dengan filter saat ini.</p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 rounded-lg bg-[#E17100] px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors active:scale-[0.98]"
              >
                <X className="h-4 w-4" />
                Reset Semua Filter
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-1" aria-label="Pagination">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => changePage(pageNum)}
                    className={`flex h-10 min-w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      pageNum === currentPage
                        ? 'bg-[#E17100] text-white'
                        : 'border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Halaman selanjutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          )}
        </div>
      </div>

      {/* 7. Trust Bar (sebelum Footer) */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-3 rounded-xl bg-white p-5 border border-neutral-200">
          <div className="w-10 h-10 rounded-full bg-[#E17100]/10 flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-[#E17100]" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Garansi Rekber & Cek Fisik</p>
            <p className="text-sm text-neutral-500">Dana aman sampai barang sesuai deskripsi</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-white p-5 border border-neutral-200">
          <div className="w-10 h-10 rounded-full bg-[#E17100]/10 flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5 text-[#E17100]" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Titik COD Malang</p>
            <p className="text-sm text-neutral-500">Klojen, Lowokwaru, Blimbing, Sukun, dll</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-white p-5 border border-neutral-200">
          <div className="w-10 h-10 rounded-full bg-[#E17100]/10 flex items-center justify-center shrink-0">
            <Truck className="h-5 w-5 text-[#E17100]" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Same-Day Kurir Instan</p>
            <p className="text-sm text-neutral-500">Pengiriman hari sama area Malang</p>
          </div>
        </div>
      </div>
    </div>
  );
}
