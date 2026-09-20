'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { products } from '@/data/products';

interface CartItem {
  productId: number;
  quantity: number;
  selected: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateSelection: (productId: number, selected: boolean) => void;
  toggleSelectAll: (selected: boolean) => void;
  toggleStoreSelection: (storeId: number, selected: boolean) => void;
  clearCart: () => void;
  clearSelected: () => void;
  cartCount: number;
  cartTotal: number;
  selectedCount: number;
  selectedTotal: number;
  selectedItems: CartItem[];
  isAllSelected: boolean;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedPromo: { code: string; discount: number; type: 'percent' | 'fixed' } | null;
  applyPromo: () => boolean;
  removePromo: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  updateSelection: () => {},
  toggleSelectAll: () => {},
  toggleStoreSelection: () => {},
  clearCart: () => {},
  clearSelected: () => {},
  cartCount: 0,
  cartTotal: 0,
  selectedCount: 0,
  selectedTotal: 0,
  selectedItems: [],
  isAllSelected: false,
  promoCode: '',
  setPromoCode: () => {},
  appliedPromo: null,
  applyPromo: () => false,
  removePromo: () => {},
});

const PROMO_CODES: Record<string, { discount: number; type: 'percent' | 'fixed' }> = {
  'THRIFT10': { discount: 10, type: 'percent' },
  'WELCOME50K': { discount: 50000, type: 'fixed' },
  'FREESHIP': { discount: 0, type: 'fixed' },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; type: 'percent' | 'fixed' } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('thrifthub_cart');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        // Ensure selected field exists for backward compatibility
        setItems(parsed.map((item: CartItem) => ({ ...item, selected: item.selected ?? true })));
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('thrifthub_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: number, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity, selected: true } : item
        );
      }
      return [...prev, { productId, quantity, selected: true }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateSelection = (productId: number, selected: boolean) => {
    setItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, selected } : item
      )
    );
  };

  const toggleSelectAll = (selected: boolean) => {
    setItems(prev => prev.map(item => ({ ...item, selected })));
  };

  const toggleStoreSelection = (storeId: number, selected: boolean) => {
    setItems(prev =>
      prev.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (product && product.storeId === storeId) {
          return { ...item, selected };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);
  
  const clearSelected = () => {
    setItems(prev => prev.filter(item => !item.selected));
  };

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const cartTotal = useMemo(() => items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0), [items]);

  const selectedItems = useMemo(() => items.filter(item => item.selected), [items]);
  const selectedCount = useMemo(() => selectedItems.reduce((sum, item) => sum + item.quantity, 0), [selectedItems]);
  const selectedTotal = useMemo(() => selectedItems.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0), [selectedItems]);

  const isAllSelected = useMemo(() => items.length > 0 && items.every(item => item.selected), [items]);

  const applyPromo = (): boolean => {
    const code = promoCode.trim().toUpperCase();
    const promo = PROMO_CODES[code];
    if (promo) {
      setAppliedPromo({ code, ...promo });
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateSelection,
      toggleSelectAll,
      toggleStoreSelection,
      clearCart,
      clearSelected,
      cartCount,
      cartTotal,
      selectedCount,
      selectedTotal,
      selectedItems,
      isAllSelected,
      promoCode,
      setPromoCode,
      appliedPromo,
      applyPromo,
      removePromo,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
