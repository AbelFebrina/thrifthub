import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailContent from '@/components/ProductDetailContent';
import { getProductBySlug, getRelatedProducts } from '@/data/productDetail';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return { title: 'Produk Tidak Ditemukan' };
  }

  return {
    title: `${product.name} | ThriftHub`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.image],
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  return (
    <ProductDetailContent product={product} relatedProducts={relatedProducts} />
  );
}