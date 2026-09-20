import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { OrderProvider } from '@/context/OrderContext';
import { ReviewProvider } from '@/context/ReviewContext';
import { AddressProvider } from '@/context/AddressContext';
import ToastContainer from '@/components/ToastContainer';

export const metadata: Metadata = {
  title: 'ThriftHub - Marketplace Thrift Malang',
  description: 'Komunitas & pasar thrift terkurasi Malang, belanja aman rekber.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <OrderProvider>
                  <ReviewProvider>
                    <AddressProvider>
                      {children}
                      <ToastContainer />
                    </AddressProvider>
                  </ReviewProvider>
                </OrderProvider>
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

