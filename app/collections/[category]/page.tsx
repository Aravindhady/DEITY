import { notFound } from 'next/navigation';
import CollectionPage from '@/app/components/collections/CollectionPage';

async function getProducts(category: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products?category=${category}`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const products = await getProducts(params.category);

  return <CollectionPage category={params.category} products={products} />;
}
