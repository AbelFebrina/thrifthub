'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface Review {
  orderId: string;
  productId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewContextType {
  reviews: Review[];
  submitReview: (orderId: string, productId: number, rating: number, comment: string) => void;
  hasReviewed: (orderId: string, productId: number) => boolean;
  getReview: (orderId: string, productId: number) => Review | undefined;
}

const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  submitReview: () => {},
  hasReviewed: () => false,
  getReview: () => undefined,
});

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('thrifthub_reviews');
    if (saved) {
      try { setReviews(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('thrifthub_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const submitReview = useCallback((orderId: string, productId: number, rating: number, comment: string) => {
    const existing = reviews.findIndex(r => r.orderId === orderId && r.productId === productId);
    if (existing >= 0) {
      const updated = [...reviews];
      updated[existing] = { orderId, productId, rating, comment, createdAt: new Date().toISOString() };
      setReviews(updated);
    } else {
      setReviews(prev => [...prev, { orderId, productId, rating, comment, createdAt: new Date().toISOString() }]);
    }
  }, [reviews]);

  const hasReviewed = useCallback((orderId: string, productId: number) => {
    return reviews.some(r => r.orderId === orderId && r.productId === productId);
  }, [reviews]);

  const getReview = useCallback((orderId: string, productId: number) => {
    return reviews.find(r => r.orderId === orderId && r.productId === productId);
  }, [reviews]);

  return (
    <ReviewContext.Provider value={{ reviews, submitReview, hasReviewed, getReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  return useContext(ReviewContext);
}

