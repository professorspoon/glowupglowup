// src/app/api/test/seo-verification/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateHomePageSEO, generateCategoryPageSEO, generateArticleStructuredData } from '@/lib/seo';
import { getAllArticles, getArticlesByCategory } from '@/lib/database';
import { logMessage, LogLevel } from '@/lib/monitoring';

export async function GET(request: NextRequest) {
  try {
    logMessage('Starting SEO verification test', LogLevel.INFO);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://glowup-blog.com';
    const results = {
      homepage: generateHomePageSEO(baseUrl),
      categories: {},
      articleStructuredData: null,
      sitemap: '/sitemap.xml',
      robotsTxt: '/robots.txt',
      status: 'success'
    };
    
    // Test category SEO
    const categories = ['lifestyle', 'beauty', 'fitness', 'wellness'];
    for (const category of categories) {
      results.categories[category] = generateCategoryPageSEO(category, baseUrl);
    }
    
    // Test article structured data
    const articles = await getAllArticles();
    if (articles.length > 0) {
      results.articleStructuredData = JSON.parse(generateArticleStructuredData(articles[0], baseUrl));
    }
    
    logMessage('SEO verification test completed successfully', LogLevel.INFO);
    
    return NextResponse.json({ 
      success: true, 
      message: 'SEO verification test completed successfully',
      results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in SEO verification test:', error);
    logMessage(`Error in SEO verification test: ${error.message}`, LogLevel.ERROR);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'SEO verification test failed', 
        error: String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
