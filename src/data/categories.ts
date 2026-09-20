import { Category } from '@/types';

export const categories: Category[] = [
  { id: 1, name: 'Atasan', slug: 'atasan' },
  { id: 2, name: 'Bawahan', slug: 'bawahan' },
  { id: 3, name: 'Outerwear', slug: 'outerwear' },
  { id: 4, name: 'Sepatu', slug: 'sepatu' },
  { id: 5, name: 'Aksesoris', slug: 'aksesoris' },
  { id: 6, name: 'Tas', slug: 'tas' },
];

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'All Size', '28', '29', '30', '31', '32', '33', '34', '36', '38', '40', '42', '44'];

export const conditions = ['Sangat Baik', 'Baik', 'Cukup'] as const;
