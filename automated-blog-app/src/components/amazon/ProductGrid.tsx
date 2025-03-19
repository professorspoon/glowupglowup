import React from 'react';
import { AmazonProduct, getProductsByCategory, getFeaturedProducts } from '@/lib/amazon';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: AmazonProduct[];
  title?: string;
  viewAllLink?: string;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  viewAllLink,
  columns = 4
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      {title && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">{title}</h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-purple-600 hover:text-purple-800">
              View All
            </a>
          )}
        </div>
      )}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-4`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

interface CategoryProductsProps {
  category: string;
  limit?: number;
  title?: string;
  viewAllLink?: string;
}

export const CategoryProducts: React.FC<CategoryProductsProps> = ({
  category,
  limit = 4,
  title,
  viewAllLink
}) => {
  const products = getProductsByCategory(category, limit);
  
  return (
    <ProductGrid 
      products={products} 
      title={title || `${category.charAt(0).toUpperCase() + category.slice(1)} Products`}
      viewAllLink={viewAllLink}
    />
  );
};

interface FeaturedProductsProps {
  limit?: number;
  title?: string;
  viewAllLink?: string;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  limit = 4,
  title = "Recommended Products",
  viewAllLink
}) => {
  const products = getFeaturedProducts(limit);
  
  return (
    <ProductGrid 
      products={products} 
      title={title}
      viewAllLink={viewAllLink}
    />
  );
};
