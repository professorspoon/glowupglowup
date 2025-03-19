import React from 'react';
import { AmazonProduct } from '@/lib/amazon';
import ProductCard from './ProductCard';

interface ProductRecommendationsProps {
  products: AmazonProduct[];
  title?: string;
  inArticle?: boolean;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  products,
  title = "Recommended Products",
  inArticle = false
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={`${inArticle ? 'my-8 p-6 bg-pink-50 rounded-xl' : 'my-12'}`}>
      <h3 className={`${inArticle ? 'text-xl' : 'text-2xl'} font-bold text-pink-600 mb-4`}>{title}</h3>
      
      {inArticle ? (
        // In-article layout (horizontal scrolling on mobile)
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="flex-none w-64">
              <ProductCard product={product} size="small" />
            </div>
          ))}
        </div>
      ) : (
        // Regular grid layout
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Note: As an Amazon Associate, we earn from qualifying purchases.</p>
      </div>
    </div>
  );
};

export default ProductRecommendations;
