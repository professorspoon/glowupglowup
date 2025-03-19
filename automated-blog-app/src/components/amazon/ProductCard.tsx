import React from 'react';
import Image from 'next/image';
import { AmazonProduct } from '@/lib/amazon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  product: AmazonProduct;
  size?: 'small' | 'medium' | 'large';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, size = 'medium' }) => {
  const handleProductClick = () => {
    // Track click for analytics in a real implementation
    window.open(product.affiliateUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`relative ${size === 'small' ? 'h-32' : size === 'large' ? 'h-64' : 'h-48'}`}>
        <Image 
          src={product.imageUrl} 
          alt={product.title} 
          fill 
          style={{objectFit: "contain"}}
        />
      </div>
      <div className="p-4">
        <h3 className="text-md font-semibold mb-2 line-clamp-2">
          {product.title}
        </h3>
        {size !== 'small' && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.floor(product.rating || 0) ? '★' : '☆'}</span>
            ))}
          </div>
          {product.reviewCount && (
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount}+ reviews)</span>
          )}
        </div>
        <p className="text-pink-600 font-bold mb-3">{product.price}</p>
        <Button 
          onClick={handleProductClick}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          View on Amazon
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
