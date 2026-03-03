export interface Product {
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    description: string;
    images: string[];
    category: string;
    sizes: string[];
    colors?: string[];
    inStock: boolean;
    featured?: boolean;
}

// Mock product data
export const products: Product[] = [
    {
        id: '1',
        name: 'DEITY Black Oversized Tee',
        price: 2499,
        salePrice: 1999,
        description: 'Premium oversized t-shirt with signature DEITY branding. Made from 100% organic cotton for ultimate comfort.',
        images: [
            'https://api.builder.io/api/v1/image/assets/TEMP/b66a7f7e86d98cd39e8fb5e83912fd9f5f4e2224?width=646',
            'https://api.builder.io/api/v1/image/assets/TEMP/845d9ec6dc8ed7ce7c26d679e7bcff838fe9568c?width=646',
        ],
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
        featured: true,
    },
    {
        id: '2',
        name: 'Deity Acid Wash Hoodie',
        price: 4999,
        description: 'Unique acid wash hoodie with vintage attitude and modern craftsmanship. No two pieces are the same.',
        images: [
            'https://api.builder.io/api/v1/image/assets/TEMP/fbe47e47ab8fa99ec02b41a905515ed69259b5e7?width=646',
            'https://api.builder.io/api/v1/image/assets/TEMP/99c728a7feeca223329fb263b764503ac040bad8?width=646',
        ],
        category: 'Hoodies',
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        featured: true,
    },
    {
        id: '3',
        name: 'DEITY Minimal Crew Neck',
        price: 2999,
        description: 'Clean, minimal crew neck sweatshirt. Perfect for layering or standalone wear.',
        images: [
            'https://api.builder.io/api/v1/image/assets/TEMP/4c9e1a91c49c0e83a785f78df7e5d0f2b62d0bba?width=646',
        ],
        category: 'Sweatshirts',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
    },
    {
        id: '4',
        name: 'Limited Edition Graphic Tee',
        price: 3499,
        description: 'Exclusive limited edition graphic tee. Only 100 pieces available worldwide.',
        images: [
            'https://api.builder.io/api/v1/image/assets/TEMP/845d9ec6dc8ed7ce7c26d679e7bcff838fe9568c?width=646',
        ],
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        featured: true,
    },
    {
        id: '5',
        name: 'DEITY Black Cargo Pants',
        price: 5499,
        description: 'Functional cargo pants with modern silhouette. Multiple pockets with premium hardware.',
        images: [
            'https://api.builder.io/api/v1/image/assets/TEMP/b66a7f7e86d98cd39e8fb5e83912fd9f5f4e2224?width=646',
        ],
        category: 'Pants',
        sizes: ['28', '30', '32', '34', '36'],
        inStock: true,
    },
    {
        id: '6',
        name: 'White Essential Tee',
        price: 1999,
        description: 'Everyday essential white tee. Heavyweight cotton with perfect fit.',
        images: [
            'https://api.builder.io/api/v1/image/assets/TEMP/fbe47e47ab8fa99ec02b41a905515ed69259b5e7?width=646',
        ],
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
    },
    {
        id: '7',
        name: 'DEITY Zip Hoodie',
        price: 5999,
        description: 'Premium zip-up hoodie with embroidered logo. Double-layered hood with drawstrings.',
        images: [
            'https://api.builder.io/api/v1/image/assets/TEMP/99c728a7feeca223329fb263b764503ac040bad8?width=646',
        ],
        category: 'Hoodies',
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
    },
    {
        id: '8',
        name: 'Vintage Wash Sweatshirt',
        price: 3999,
        description: 'Retro-inspired sweatshirt with vintage wash finish. Soft and comfortable.',
        images: [
            'https://api.builder.io/api/v1/image/assets/TEMP/4c9e1a91c49c0e83a785f78df7e5d0f2b62d0bba?width=646',
        ],
        category: 'Sweatshirts',
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        featured: true,
    },
];

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
    return products.filter(p => p.featured);
}
