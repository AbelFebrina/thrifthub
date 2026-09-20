'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Product } from '@/types';
import { products as initialProducts } from '@/data/products';

interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  size: string;
  storeName: string;
}

type PaymentMethod = 'transfer' | 'ewallet' | 'rekber' | 'cod';

interface Order {
  id: string;
  items: OrderItem[];
  shipping: { name: string; phone: string; address: string; city: string; postalCode: string };
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'menunggu_pembayaran' | 'diproses' | 'dikirim' | 'selesai' | 'dibatalkan';
  createdAt: string;
  sellerNotes?: Record<number, string>;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => void;
  getOrderById: (id: string) => Order | undefined;
  cancelOrder: (id: string) => void;
}

const statusLabels: Record<string, string> = {
  menunggu_pembayaran: 'Menunggu Pembayaran',
  diproses: 'Diproses',
  dikirim: 'Dikirim',
  selesai: 'Selesai',
  dibatalkan: 'Dibatalkan',
};

export function getStatusLabel(status: string) {
  return statusLabels[status] || status;
}

const OrderContext = createContext<OrderContextType>({
  orders: [],
  placeOrder: () => {},
  getOrderById: () => undefined,
  cancelOrder: () => {},
});

const productKey = 'thrifthub_products';

export function getProducts(): Product[] {
  try {
    const saved = localStorage.getItem(productKey);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return initialProducts;
}

export function saveProducts(updated: Product[]) {
  localStorage.setItem(productKey, JSON.stringify(updated));
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('thrifthub_orders');
    if (saved) {
      try { setOrders(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('thrifthub_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = useCallback((orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const initialStatus = orderData.paymentMethod === 'transfer' || orderData.paymentMethod === 'ewallet' || orderData.paymentMethod === 'rekber' 
      ? 'menunggu_pembayaran' 
      : 'diproses';
    const newOrder: Order = {
      ...orderData,
      id: 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      status: initialStatus,
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);

    // Reduce stock
    const currentProducts = getProducts();
    const updated = currentProducts.map(p => {
      const item = orderData.items.find(i => i.productId === p.id);
      if (item) return { ...p, stock: Math.max(0, p.stock - item.quantity) };
      return p;
    });
    saveProducts(updated);
  }, []);

  const getOrderById = useCallback((id: string) => orders.find(o => o.id === id), [orders]);

  const cancelOrder = useCallback((id: string) => {
    setOrders(prev => prev.map(o =>
      o.id === id ? { ...o, status: 'dibatalkan' } : o
    ));
  }, []);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderById, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}

