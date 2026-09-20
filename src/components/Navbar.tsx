'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Heart, ShoppingCart, User, ChevronDown, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const categories = [
  { label: 'Atasan', slug: 'atasan' },
  { label: 'Bawahan', slug: 'bawahan' },
  { label: 'Jaket & Outer', slug: 'outer' },
  { label: 'Dress', slug: 'dress' },
  { label: 'Sepatu', slug: 'sepatu' },
  { label: 'Tas', slug: 'tas' },
  { label: 'Aksesoris', slug: 'aksesoris' },
];

const userMenuItems = [
  { label: 'Profil', href: '/profil', icon: User },
  { label: 'Pesanan Saya', href: '/pesanan', icon: ShoppingBag },
  { label: 'Wishlist', href: '/wishlist', icon: Heart },
];

const isMenuActive = (pathname: string, key: string) => {
  if (key === 'home') return pathname === '/';
  if (key === 'produk') return pathname.startsWith('/produk');
  if (key === 'kategori') return pathname.startsWith('/kategori');
  if (key === 'toko') return pathname.startsWith('/toko');
  if (key === 'tentang') return pathname.startsWith('/tentang');
  return false;
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { cartCount } = useCart();

  const handleCategoryClick = (slug: string) => {
    router.push(`/produk?kategori=${slug}`);
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const isActive = (key: string) => isMenuActive(pathname, key);

  const activeLinkClass = (key: string) =>
    isActive(key)
      ? 'text-[#E17100] font-semibold'
      : 'text-neutral-600 hover:text-neutral-900 transition-colors';

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#fdfaf7] border-b border-[#e8dcc8] shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="ThriftHub Home">
              <ShoppingBag className="h-7 w-7 text-[#E17100]" aria-hidden="true" />
              <span className="font-display text-xl font-bold tracking-tight text-[#221e1a]">ThriftHub</span>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main">
              <Link href="/" className={`px-3 py-2 rounded-md text-sm transition-colors ${activeLinkClass('home')}`}>
                Beranda
              </Link>
              <Link href="/produk" className={`px-3 py-2 rounded-md text-sm transition-colors ${activeLinkClass('produk')}`}>
                Produk
              </Link>
              <div className="relative" ref={categoryRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive('kategori') ? 'text-[#E17100] font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  aria-expanded={isCategoryOpen}
                  aria-haspopup="listbox"
                >
                  Kategori
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {isCategoryOpen && (
                  <ul className="absolute left-0 top-full z-50 mt-1 w-52 rounded-lg bg-white border border-[#e8dcc8] shadow-lg py-1">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <button
                          type="button"
                          onClick={() => handleCategoryClick(cat.slug)}
                          className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-[#f7f2ea] hover:text-[#E17100] transition-colors"
                        >
                          {cat.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Link href="/toko" className={`px-3 py-2 rounded-md text-sm transition-colors ${activeLinkClass('toko')}`}>
                Toko
              </Link>
              <Link href="/tentang" className={`px-3 py-2 rounded-md text-sm transition-colors ${activeLinkClass('tentang')}`}>
                Tentang
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Wishlist */}
              <Link
                href={isLoggedIn ? '/wishlist' : '/login'}
                className="relative p-2 text-neutral-600 hover:text-[#E17100] transition-colors rounded-md"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <Link
                href="/keranjang"
                className="relative p-2 text-neutral-600 hover:text-[#E17100] transition-colors rounded-md"
                aria-label="Keranjang"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-[#E17100] text-[10px] font-bold text-white flex items-center justify-center"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Auth / User Menu */}
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 rounded-full bg-neutral-100 p-0.5 hover:bg-neutral-200 transition-colors"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-[#E17100] flex items-center justify-center text-white text-sm font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-lg bg-white border border-[#e8dcc8] shadow-lg overflow-hidden">
                      <div className="px-4 py-3 border-b border-[#e8dcc8]">
                        <p className="font-display font-semibold text-[#221e1a] text-sm">{user?.name}</p>
                        <p className="text-[10px] text-[#a09080]">{user?.email}</p>
                      </div>
                      <ul role="menu" className="py-1">
                        {userMenuItems.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => { setIsUserMenuOpen(false); setIsMobileMenuOpen(false); }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-[#f7f2ea] hover:text-[#E17100] transition-colors"
                              role="menuitem"
                            >
                              <item.icon className="h-4 w-4" aria-hidden="true" />{item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-[#e8dcc8] py-1">
                        <button
                          type="button"
                          onClick={() => { handleLogout(); setIsUserMenuOpen(false); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          role="menuitem"
                        >
                          <LogOut className="h-4 w-4" aria-hidden="true" />Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 rounded-lg bg-[#E17100] px-4 py-2 text-sm font-semibold text-white hover:bg-[#704420] transition-colors active:scale-[0.97]"
                >
                  <User className="h-4 w-4" aria-hidden="true" />Masuk
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="md:hidden p-2 text-neutral-600 hover:text-[#221e1a] rounded-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 md:hidden transition-all duration-200 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => { setIsMobileMenuOpen(false); setIsCategoryOpen(false); }}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-72 bg-[#fdfaf7] border-l border-[#e8dcc8] shadow-xl overflow-y-auto transition-transform duration-200 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4 space-y-1">
            {/* Close */}
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-neutral-600 hover:text-[#221e1a]"
                aria-label="Tutup menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Page indicator */}
            <div className="text-[10px] text-[#a09080] mb-3 px-2">
              <span className="text-[#E17100] font-medium">{pathname === '/' ? 'Beranda' : pathname.startsWith('/produk') ? 'Produk' : pathname.startsWith('/toko') ? 'Toko' : pathname.startsWith('/tentang') ? 'Tentang' : ''}</span>
            </div>

            {/* Menu items */}
            {[
              { href: '/', label: 'Beranda' },
              { href: '/produk', label: 'Produk' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { setIsMobileMenuOpen(false); setIsCategoryOpen(false); }}
                className={`block px-3 py-2.5 rounded-md text-sm ${
                  (item.href === '/' ? pathname === '/' : pathname.startsWith('/produk'))
                    ? 'bg-[#f7f2ea] text-[#E17100] font-medium'
                    : 'text-neutral-700 hover:bg-[#f7f2ea]'
                } transition-colors`}
              >
                {item.label}
              </Link>
            ))}

            {/* Kategori expandable */}
            <div>
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex w-full items-center justify-between px-3 py-2.5 rounded-md text-sm text-neutral-700 hover:bg-[#f7f2ea] transition-colors"
              >
                <span>Kategori</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {isCategoryOpen && (
                <div className="pl-2 mt-1 space-y-0.5">
                  {categories.map(cat => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="block w-full px-3 py-2 text-sm text-neutral-600 hover:text-[#E17100] hover:bg-[#f7f2ea] rounded-md transition-colors text-left"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Toko */}
            <Link
              href="/toko"
              onClick={() => { setIsMobileMenuOpen(false); setIsCategoryOpen(false); }}
              className={`block px-3 py-2.5 rounded-md text-sm ${pathname.startsWith('/toko') ? 'bg-[#f7f2ea] text-[#E17100] font-medium' : 'text-neutral-700 hover:bg-[#f7f2ea]'} transition-colors`}
            >
              Toko
            </Link>

            {/* Tentang */}
            <Link
              href="/tentang"
              onClick={() => { setIsMobileMenuOpen(false); setIsCategoryOpen(false); }}
              className={`block px-3 py-2.5 rounded-md text-sm ${pathname.startsWith('/tentang') ? 'bg-[#f7f2ea] text-[#E17100] font-medium' : 'text-neutral-700 hover:bg-[#f7f2ea]'} transition-colors`}
            >
              Tentang
            </Link>

            {/* Divider */}
            <div className="border-t border-[#e8dcc8] my-3" />

            {/* Auth or Account */}
            {isLoggedIn ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-[#E17100] flex items-center justify-center text-white font-bold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#221e1a]">{user?.name}</p>
                    <p className="text-[10px] text-[#a09080]">{user?.email}</p>
                  </div>
                </div>
                {userMenuItems.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => { setIsMobileMenuOpen(false); }}
                    className="block px-3 py-2.5 rounded-md text-sm text-neutral-700 hover:bg-[#f7f2ea] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => { setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#E17100] px-4 py-3 text-sm font-semibold text-white hover:bg-[#704420] transition-colors"
              >
                <User className="h-4 w-4" aria-hidden="true" />Masuk
              </Link>
            )}
          </div>
        </div>
      </div>

      
    </>
  );
}

