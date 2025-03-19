// src/app/api/test/affiliate-integration/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedProducts, getProductsByCategory, createProductRecommendations } from '@/lib/amazon';
import { logMessage, LogLevel } from '@/lib/monitoring';

export async function GET(request: NextRequest) {
  try {
    logMessage('Starting Amazon affiliate integration test', LogLevel.INFO);
    
    const results = {
      featuredProducts: getFeaturedProducts(4),
      categoryProducts: {},
      articleRecommendations: null,
      status: 'success'
    };
    
    // Test products by category
    const categories = ['lifestyle', 'beauty', 'fitness', 'wellness'];
    for (const category of categories) {
      results.categoryProducts[category] = getProductsByCategory(category, 2);
    }
    
    // Test product recommendations for article content
    const sampleArticleContent = `
      <h1>The Best Skincare Routine for Beginners</h1>
      <p>Starting a skincare routine can be overwhelming with so many products available.</p>
      <h2>Step 1: Cleansing</h2>
      <p>A good cleanser removes dirt, oil, and impurities without stripping your skin.</p>
      <h2>Step 2: Moisturizing</h2>
      <p>Hydration is key for all skin types, even oily skin.</p>
    `;
    
    results.articleRecommendations = createProductRecommendations(sampleArticleContent, 'beauty');
    
    logMessage('Amazon affiliate integration test completed successfully', LogLevel.INFO);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Amazon affiliate integration test completed successfully',
      results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in Amazon affiliate integration test:', error);
    logMessage(`Error in Amazon affiliate integration test: ${error.message}`, LogLevel.ERROR);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Amazon affiliate integration test failed', 
        error: String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
