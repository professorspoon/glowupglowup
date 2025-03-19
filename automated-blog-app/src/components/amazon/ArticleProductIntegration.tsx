import React from 'react';
import { AmazonProduct, createProductRecommendations } from '@/lib/amazon';
import { Article } from '@/lib/database';
import ProductRecommendations from '@/components/amazon/ProductRecommendations';

interface ArticleProductIntegrationProps {
  article: Article;
}

const ArticleProductIntegration: React.FC<ArticleProductIntegrationProps> = ({ article }) => {
  // In a real implementation, we would use the article content to find relevant products
  // For now, we'll use the createProductRecommendations function that returns products by category
  const products = createProductRecommendations(article.content, article.category);
  
  // Insert product recommendations at strategic points in the article content
  const enhancedContent = insertProductRecommendations(article.content, products);
  
  return (
    <div className="article-content" dangerouslySetInnerHTML={{ __html: enhancedContent }} />
  );
};

/**
 * Insert product recommendations at strategic points in the article content
 */
function insertProductRecommendations(content: string, products: AmazonProduct[]): string {
  if (!products || products.length === 0) {
    return content;
  }
  
  // Split the products into groups for different sections of the article
  const productGroups = splitIntoGroups(products, 2);
  
  // Find appropriate insertion points (after h2 headings)
  const headingRegex = /<h2>(.*?)<\/h2>/g;
  let matches = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    matches.push({
      heading: match[1],
      index: match.index + match[0].length
    });
  }
  
  // If we have at least 2 headings, insert after the first and second h2
  if (matches.length >= 2 && productGroups.length >= 2) {
    // Insert first product group after first h2
    const firstInsertPoint = matches[0].index;
    const firstProductHtml = `
      <div class="my-8 p-6 bg-pink-50 rounded-xl">
        <h3 class="text-xl font-bold text-pink-600 mb-4">Recommended Products</h3>
        <div class="flex overflow-x-auto pb-4 space-x-4">
          ${productGroups[0].map(product => `
            <div class="flex-none w-64">
              <div class="border rounded-lg shadow-sm overflow-hidden">
                <div class="relative h-32">
                  <img src="${product.imageUrl}" alt="${product.title}" class="object-contain w-full h-full" />
                </div>
                <div class="p-4">
                  <h4 class="text-md font-semibold mb-2 line-clamp-2">${product.title}</h4>
                  <p class="text-pink-600 font-bold mb-3">${product.price}</p>
                  <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" 
                     class="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                    View on Amazon
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="mt-4 text-sm text-gray-500">
          <p>Note: As an Amazon Associate, we earn from qualifying purchases.</p>
        </div>
      </div>
    `;
    
    // Insert second product group after second h2
    const secondInsertPoint = matches[1].index;
    const secondProductHtml = `
      <div class="my-8 p-6 bg-pink-50 rounded-xl">
        <h3 class="text-xl font-bold text-pink-600 mb-4">You May Also Like</h3>
        <div class="flex overflow-x-auto pb-4 space-x-4">
          ${productGroups[1].map(product => `
            <div class="flex-none w-64">
              <div class="border rounded-lg shadow-sm overflow-hidden">
                <div class="relative h-32">
                  <img src="${product.imageUrl}" alt="${product.title}" class="object-contain w-full h-full" />
                </div>
                <div class="p-4">
                  <h4 class="text-md font-semibold mb-2 line-clamp-2">${product.title}</h4>
                  <p class="text-pink-600 font-bold mb-3">${product.price}</p>
                  <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" 
                     class="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                    View on Amazon
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="mt-4 text-sm text-gray-500">
          <p>Note: As an Amazon Associate, we earn from qualifying purchases.</p>
        </div>
      </div>
    `;
    
    // Insert the product HTML at the appropriate points
    const firstPart = content.substring(0, firstInsertPoint);
    const middlePart = content.substring(firstInsertPoint, secondInsertPoint);
    const lastPart = content.substring(secondInsertPoint);
    
    return firstPart + firstProductHtml + middlePart + secondProductHtml + lastPart;
  }
  
  // If we don't have enough headings, just append the products at the end
  return content + `
    <div class="my-8 p-6 bg-pink-50 rounded-xl">
      <h3 class="text-xl font-bold text-pink-600 mb-4">Recommended Products</h3>
      <div class="flex overflow-x-auto pb-4 space-x-4">
        ${products.map(product => `
          <div class="flex-none w-64">
            <div class="border rounded-lg shadow-sm overflow-hidden">
              <div class="relative h-32">
                <img src="${product.imageUrl}" alt="${product.title}" class="object-contain w-full h-full" />
              </div>
              <div class="p-4">
                <h4 class="text-md font-semibold mb-2 line-clamp-2">${product.title}</h4>
                <p class="text-pink-600 font-bold mb-3">${product.price}</p>
                <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" 
                   class="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                  View on Amazon
                </a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="mt-4 text-sm text-gray-500">
        <p>Note: As an Amazon Associate, we earn from qualifying purchases.</p>
      </div>
    </div>
  `;
}

/**
 * Split an array into groups of a specified size
 */
function splitIntoGroups<T>(array: T[], groupSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += groupSize) {
    result.push(array.slice(i, i + groupSize));
  }
  return result;
}

export default ArticleProductIntegration;
