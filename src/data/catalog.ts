export const sortOptions = [
  { value: 'terbaru', label: 'Terbaru' },
  { value: 'harga-termurah', label: 'Harga Termurah' },
  { value: 'harga-termahal', label: 'Harga Termahal' },
  { value: 'terlaris', label: 'Terlaris' },
  { value: 'rating-tinggi', label: 'Rating Tertinggi' },
] as const;

export const priceRanges = [
  { min: 0, max: 50000, label: 'Di bawah Rp50.000' },
  { min: 50000, max: 100000, label: 'Rp50.000 - Rp100.000' },
  { min: 100000, max: 200000, label: 'Rp100.000 - Rp200.000' },
  { min: 200000, max: 500000, label: 'Rp200.000 - Rp500.000' },
  { min: 500000, max: null, label: 'Di atas Rp500.000' },
] as const;

export const conditions = ['Sangat Baik', 'Baik', 'Cukup'] as const;

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'All Size', '28', '29', '30', '31', '32', '33', '34', '36', '38', '40', '42', '44'] as const;

export const locations = ['Klojen', 'Lowokwaru', 'Blimbing', 'Sukun', 'Kedungkandang', 'Batu'] as const;

export const ratingOptions = [4, 3, 2, 1] as const;
