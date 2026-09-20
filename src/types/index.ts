export interface Store {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  banner: string;
  verified: boolean;
  mall?: boolean;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  userInitials: string;
  userAvatarBg: string;
  rating: number;
  comment: string;
  date: string; // ISO string
  verifiedPurchase: boolean;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[]; // gallery images
  store: string;
  storeId: number;
  storeRating: number;
  size: string;
  conditionLabel: string;
  conditionColor: 'sage' | 'mustard' | 'terracotta';
  condition: 'Sangat Baik' | 'Baik' | 'Cukup';
  note: string;
  sold: number;
  location: string;
  category: string;
  material?: string;
  color?: string;
  stock: number;
  tags?: string[];
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

