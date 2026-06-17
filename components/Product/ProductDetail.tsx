// components/product/ProductDetail/index.tsx
'use client';

import { Product } from '@/types/product';
import { Breadcrumbs } from './BreadCrumbs';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductActions } from './ProductAction';
import { ProductTabs } from './ProductTabs';



interface ProductDetailProps {
    product: Product;
    relatedProducts: Product[];
    rating?: number;
    reviewCount?: number;
}

export function ProductDetail({
    product,
    relatedProducts,
    rating = 4.5,
    reviewCount = 128
}: ProductDetailProps) {

    const breadcrumbItems = [
        { label: 'Products', href: '/shop' },
        { label: product.category, href: `/shop?categories=${encodeURIComponent(product.category)}`, },
        { label: product.name, href: `/shop/${product.id}`, isCurrent: true },
    ];

    return (
        <div className="space-y-8">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* Main Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <ProductGallery
                    images={product.images}
                    productName={product.name}
                />

                <div className="space-y-6">
                    <ProductInfo
                        name={product.name}
                        category={product.category}
                        price={product.price}
                        rating={rating}
                        reviewCount={reviewCount}
                        description={product.description}
                        createdAt={product.createdAt}
                        discount={0}
                    />

                    <ProductActions
                        product={product}

                    />
                </div>
            </div>

            {/* Tabs Section */}
            <ProductTabs product={product} productId={product.id} />


            {relatedProducts.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                    {/* <RelatedProducts products={relatedProducts} /> */}
                </div>
            )}
        </div>
    );
}