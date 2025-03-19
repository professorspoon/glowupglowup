// src/lib/amazon.ts
import axios from 'axios';

// Interface for Amazon product
export interface AmazonProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  affiliateUrl: string;
  category: string;
  rating?: number;
  reviewCount?: number;
}

// Mock Amazon product database by category
const MOCK_PRODUCTS: Record<string, AmazonProduct[]> = {
  lifestyle: [
    {
      id: 'lifestyle1',
      title: 'Home Organization Set with Storage Bins',
      description: 'Set of 6 foldable storage bins for organizing closets, shelves, and drawers.',
      price: '$29.99',
      imageUrl: '/product-1.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX1?tag=glowupblog-20',
      category: 'lifestyle',
      rating: 4.5,
      reviewCount: 1250
    },
    {
      id: 'lifestyle2',
      title: 'Scented Candles Gift Set',
      description: 'Set of 4 aromatherapy candles made with natural soy wax and essential oils.',
      price: '$24.99',
      imageUrl: '/product-2.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX2?tag=glowupblog-20',
      category: 'lifestyle',
      rating: 4.7,
      reviewCount: 890
    },
    {
      id: 'lifestyle3',
      title: 'Planner and Journal Set',
      description: 'Productivity planner with goal setting pages and daily journal prompts.',
      price: '$19.99',
      imageUrl: '/product-3.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX3?tag=glowupblog-20',
      category: 'lifestyle',
      rating: 4.8,
      reviewCount: 750
    }
  ],
  beauty: [
    {
      id: 'beauty1',
      title: 'Vitamin C Serum with Hyaluronic Acid',
      description: 'Anti-aging facial serum with vitamin C and hyaluronic acid for brighter skin.',
      price: '$24.95',
      imageUrl: '/product-4.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX4?tag=glowupblog-20',
      category: 'beauty',
      rating: 4.6,
      reviewCount: 3200
    },
    {
      id: 'beauty2',
      title: 'Makeup Brush Set with Case',
      description: 'Professional 16-piece makeup brush set with synthetic bristles and travel case.',
      price: '$32.99',
      imageUrl: '/product-5.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX5?tag=glowupblog-20',
      category: 'beauty',
      rating: 4.4,
      reviewCount: 1850
    },
    {
      id: 'beauty3',
      title: 'Natural Ingredient Skincare Kit',
      description: 'Complete skincare routine with cleanser, toner, moisturizer, and face mask.',
      price: '$49.99',
      imageUrl: '/product-6.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX6?tag=glowupblog-20',
      category: 'beauty',
      rating: 4.9,
      reviewCount: 920
    }
  ],
  fitness: [
    {
      id: 'fitness1',
      title: 'Yoga Mat with Alignment Markers',
      description: 'Non-slip yoga mat with alignment markers for proper positioning.',
      price: '$39.95',
      imageUrl: '/product-7.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX7?tag=glowupblog-20',
      category: 'fitness',
      rating: 4.7,
      reviewCount: 2100
    },
    {
      id: 'fitness2',
      title: 'Resistance Bands Set',
      description: '5-piece resistance bands set with different resistance levels and carrying case.',
      price: '$21.99',
      imageUrl: '/product-8.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX8?tag=glowupblog-20',
      category: 'fitness',
      rating: 4.5,
      reviewCount: 1750
    },
    {
      id: 'fitness3',
      title: 'Smart Water Bottle with Hydration Tracking',
      description: 'Stainless steel water bottle that tracks water intake and sends reminders.',
      price: '$34.99',
      imageUrl: '/product-9.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX9?tag=glowupblog-20',
      category: 'fitness',
      rating: 4.3,
      reviewCount: 980
    }
  ],
  wellness: [
    {
      id: 'wellness1',
      title: 'Meditation Cushion Set',
      description: 'Comfortable meditation cushion and mat set for mindfulness practice.',
      price: '$45.99',
      imageUrl: '/product-10.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX10?tag=glowupblog-20',
      category: 'wellness',
      rating: 4.8,
      reviewCount: 650
    },
    {
      id: 'wellness2',
      title: 'Essential Oil Diffuser with Oils Set',
      description: 'Ultrasonic aromatherapy diffuser with 6 essential oils for relaxation.',
      price: '$38.95',
      imageUrl: '/product-11.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX11?tag=glowupblog-20',
      category: 'wellness',
      rating: 4.6,
      reviewCount: 1450
    },
    {
      id: 'wellness3',
      title: 'Sleep Aid Sound Machine',
      description: 'White noise machine with 20 soothing sounds for better sleep quality.',
      price: '$29.99',
      imageUrl: '/product-12.jpg',
      affiliateUrl: 'https://amazon.com/dp/B08XXXX12?tag=glowupblog-20',
      category: 'wellness',
      rating: 4.4,
      reviewCount: 2200
    }
  ]
};

/**
 * Get products by category
 */
export function getProductsByCategory(category: string, limit = 4): AmazonProduct[] {
  const products = MOCK_PRODUCTS[category] || [];
  return products.slice(0, limit);
}

/**
 * Get featured products across all categories
 */
export function getFeaturedProducts(limit = 4): AmazonProduct[] {
  const allProducts = Object.values(MOCK_PRODUCTS).flat();
  // Sort by rating and review count to get the most popular products
  const sortedProducts = allProducts.sort((a, b) => {
    const aScore = (a.rating || 0) * Math.log(a.reviewCount || 1);
    const bScore = (b.rating || 0) * Math.log(b.reviewCount || 1);
    return bScore - aScore;
  });
  return sortedProducts.slice(0, limit);
}

/**
 * Get related products based on keywords
 */
export function getRelatedProducts(keywords: string[], limit = 4): AmazonProduct[] {
  // In a real implementation, this would search the Amazon API based on keywords
  // For now, we'll just return random products
  const allProducts = Object.values(MOCK_PRODUCTS).flat();
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

/**
 * Generate affiliate link with tracking ID
 */
export function generateAffiliateLink(productUrl: string, trackingId = 'glowupblog-20'): string {
  // Check if URL already has parameters
  const hasParams = productUrl.includes('?');
  const separator = hasParams ? '&' : '?';
  return `${productUrl}${separator}tag=${trackingId}`;
}

/**
 * In a production environment, this would use the Amazon Product Advertising API
 * For development, we're using mock data
 */
export async function searchAmazonProducts(query: string, category?: string): Promise<AmazonProduct[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter products by category if provided
  let products = Object.values(MOCK_PRODUCTS).flat();
  if (category && MOCK_PRODUCTS[category]) {
    products = MOCK_PRODUCTS[category];
  }
  
  // Filter products by query (case-insensitive)
  const lowercaseQuery = query.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
  
  return filteredProducts;
}

/**
 * Create product recommendations based on article content
 */
export function createProductRecommendations(articleContent: string, category: string): AmazonProduct[] {
  // In a real implementation, this would analyze the article content
  // and find relevant products using the Amazon API
  // For now, we'll just return products from the category
  return getProductsByCategory(category, 4);
}
