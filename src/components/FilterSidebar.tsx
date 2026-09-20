'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { X, ChevronDown, SlidersHorizontal, Star, Search } from 'lucide-react';
import { useState } from 'react';
import { categories } from '@/data/categories';
import { priceRanges, conditions, sizes, sortOptions, locations, ratingOptions } from '@/data/catalog';
import { useToast } from '@/context/ToastContext';

type FilterParams = {
  q?: string;
  kategori?: string;
  ukuran?: string;
  kondisi?: string;
  hargaMin?: string;
  hargaMax?: string;
  lokasi?: string;
  rating?: string;
  toko?: string;
  sort?: string;
  page?: string;
};

type FilterSidebarProps = {
  activeFilterCount?: number;
  onClearAll?: () => void;
  categoryCounts?: Record<string, number>;
};

export default function FilterSidebar({ activeFilterCount, onClearAll }: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    kategori: true,
    harga: true,
    kondisi: true,
    lokasi: true,
    rating: false,
    toko: false,
  });

  const [filters, setFilters] = useState<FilterParams>({
    q: searchParams.get('q') || '',
    kategori: searchParams.get('kategori') || '',
    ukuran: searchParams.get('ukuran') || '',
    kondisi: searchParams.get('kondisi') || '',
    hargaMin: searchParams.get('hargaMin') || '',
    hargaMax: searchParams.get('hargaMax') || '',
    lokasi: searchParams.get('lokasi') || '',
    rating: searchParams.get('rating') || '',
    toko: searchParams.get('toko') || '',
    sort: searchParams.get('sort') || 'terbaru',
  });

  const updateFilters = (newFilters: Partial<FilterParams>) => {
    const updated = { ...filters, ...newFilters, page: undefined };
    setFilters(updated);

    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setFilters({ sort: 'terbaru' });
    router.push(pathname);
    showToast('Semua filter direset', 'info');
    onClearAll?.();
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => key !== 'sort' && value && value !== 'terbaru'
  );

  const filterCount = Object.entries(filters).filter(
    ([key, value]) => key !== 'sort' && value && value !== 'terbaru'
  ).length;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleConditionToggle = (cond: string) => {
    const current = filters.kondisi?.split(',').filter(Boolean) || [];
    const updated = current.includes(cond)
      ? current.filter((c) => c !== cond)
      : [...current, cond];
    updateFilters({ kondisi: updated.join(',') || '' });
  };

  const handleLocationToggle = (loc: string) => {
    const current = filters.lokasi?.split(',').filter(Boolean) || [];
    const updated = current.includes(loc)
      ? current.filter((c) => c !== loc)
      : [...current, loc];
    updateFilters({ lokasi: updated.join(',') || '' });
  };

  const handleCategoryToggle = (slug: string) => {
    const current = filters.kategori?.split(',').filter(Boolean) || [];
    const updated = current.includes(slug)
      ? current.filter((c) => c !== slug)
      : [...current, slug];
    updateFilters({ kategori: updated.join(',') || '' });
  };

  return (
    <>
      {/* Mobile filter trigger */}
      <button
        type="button"
        className="lg:hidden fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-[#E17100] px-4 py-3 text-white shadow-lg hover:bg-orange-600 transition-colors"
        onClick={() => setIsMobileOpen(true)}
      >
        <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
        <span className="font-medium">Filter</span>
        {hasActiveFilters && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-xs font-bold">
            {filterCount}
          </span>
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileOpen(false)} aria-hidden="true" />
      )}

      {/* Filter Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 z-50 w-full lg:w-72 max-w-sm transform transition-transform duration-300 ease-in-out bg-white shadow-xl lg:shadow-none lg:border-l lg:border-neutral-200 ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 p-4 lg:p-6">
            <h2 className="font-display text-xl font-bold text-neutral-900">Filter</h2>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-[#E17100] hover:text-orange-700"
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                className="lg:hidden p-2 text-neutral-500 hover:text-neutral-700"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Tutup filter"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filter Form */}
          <form className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-1" onSubmit={(e) => e.preventDefault()}>
            {/* Kategori - Checkbox List */}
            <FilterSection
              title="Kategori"
              expanded={expandedSections.kategori}
              onToggle={() => toggleSection('kategori')}
            >
              <div className="space-y-2">
                {categories.map((cat) => {
                  const isChecked = filters.kategori?.split(',').includes(cat.slug) || false;
                  return (
                    <label key={cat.slug} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryToggle(cat.slug)}
                        className="h-4 w-4 rounded border-neutral-300 text-[#E17100] focus:ring-[#E17100]/20 accent-[#E17100]"
                      />
                      <span className="text-sm text-neutral-700 group-hover:text-[#E17100] transition-colors">{cat.name}</span>
                    </label>
                  );
                })}
              </div>
            </FilterSection>

            {/* Harga - Min/Max Input */}
            <FilterSection
              title="Harga"
              expanded={expandedSections.harga}
              onToggle={() => toggleSection('harga')}
            >
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="harga"
                      checked={
                        (filters.hargaMin === String(range.min) || (range.min === 0 && !filters.hargaMin)) &&
                        (filters.hargaMax === String(range.max) || (range.max === null && !filters.hargaMax))
                      }
                      onChange={() =>
                        updateFilters({
                          hargaMin: range.min === 0 ? '' : String(range.min),
                          hargaMax: range.max === null ? '' : String(range.max),
                        })
                      }
                      className="h-4 w-4 text-[#E17100] border-neutral-300 focus:ring-[#E17100]/20 accent-[#E17100]"
                    />
                    <span className="text-sm text-neutral-700">{range.label}</span>
                  </label>
                ))}
                <div className="pt-2 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500">Rp</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="Min"
                      value={filters.hargaMin}
                      onChange={(e) => updateFilters({ hargaMin: e.target.value || '' })}
                      className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20"
                    />
                    <span className="text-neutral-400 text-sm">-</span>
                    <span className="text-xs text-neutral-500">Rp</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="Max"
                      value={filters.hargaMax}
                      onChange={(e) => updateFilters({ hargaMax: e.target.value || '' })}
                      className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20"
                    />
                  </div>
                </div>
              </div>
            </FilterSection>

            {/* Kondisi - Checkbox */}
            <FilterSection
              title="Kondisi"
              expanded={expandedSections.kondisi}
              onToggle={() => toggleSection('kondisi')}
            >
              <div className="space-y-2">
                {conditions.map((cond) => {
                  const isChecked = filters.kondisi?.split(',').includes(cond) || false;
                  return (
                    <label key={cond} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleConditionToggle(cond)}
                        className="h-4 w-4 rounded border-neutral-300 text-[#E17100] focus:ring-[#E17100]/20 accent-[#E17100]"
                      />
                      <span className="text-sm text-neutral-700">{cond}</span>
                    </label>
                  );
                })}
              </div>
            </FilterSection>

            {/* Lokasi - Checkbox */}
            <FilterSection
              title="Lokasi"
              expanded={expandedSections.lokasi}
              onToggle={() => toggleSection('lokasi')}
            >
              <div className="space-y-2">
                {locations.map((loc) => {
                  const isChecked = filters.lokasi?.split(',').includes(loc) || false;
                  return (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleLocationToggle(loc)}
                        className="h-4 w-4 rounded border-neutral-300 text-[#E17100] focus:ring-[#E17100]/20 accent-[#E17100]"
                      />
                      <span className="text-sm text-neutral-700">{loc}</span>
                    </label>
                  );
                })}
              </div>
            </FilterSection>

            {/* Rating - Star */}
            <FilterSection
              title="Rating Minimal"
              expanded={expandedSections.rating}
              onToggle={() => toggleSection('rating')}
            >
              <div className="flex items-center gap-1">
                {[5, 4, 3, 2, 1].map((star) => {
                  const isActive = (filters.rating && Number(filters.rating) >= star) || false;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => updateFilters({ rating: filters.rating === String(star) ? '' : String(star) })}
                      className={`transition-colors ${isActive ? 'text-[#E17100]' : 'text-neutral-300'}`}
                      aria-label={`Rating ${star} bintang ke atas`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  );
                })}
                <span className="ml-2 text-xs text-neutral-500">& atas</span>
              </div>
            </FilterSection>

            {/* Toko - Search */}
            <FilterSection
              title="Nama Toko"
              expanded={expandedSections.toko}
              onToggle={() => toggleSection('toko')}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" aria-hidden="true" />
                <input
                  type="text"
                  value={filters.toko}
                  onChange={(e) => updateFilters({ toko: e.target.value })}
                  placeholder="Cari nama toko..."
                  className="w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20"
                />
              </div>
            </FilterSection>
          </form>

          {/* Sort - sticky bottom on mobile */}
          <div className="border-t border-neutral-200 p-4 lg:p-6">
            <label htmlFor="sort-filter" className="block mb-2 text-sm font-medium text-neutral-700">
              Urutkan
            </label>
            <select
              id="sort-filter"
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 appearance-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>
    </>
  );
}

function FilterSection({
  title,
  children,
  expanded,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <details className="group" open={expanded}>
      <summary
        onClick={(e) => {
          e.preventDefault();
          onToggle();
        }}
        className="flex items-center justify-between cursor-pointer list-none py-2"
      >
        <h3 className="font-semibold text-sm text-neutral-900">{title}</h3>
        <span className="transition-transform duration-200 group-open:rotate-180">
          <ChevronDown className="h-4 w-4 text-neutral-500" />
        </span>
      </summary>
      <div className="pb-3 animate-in fade-in slide-in-from-top-2 duration-200">{children}</div>
    </details>
  );
}

