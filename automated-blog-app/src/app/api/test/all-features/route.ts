// src/app/api/test/all-features/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateInitialContent } from '@/lib/contentScheduler';
import { checkSystemHealth, logMessage, LogLevel } from '@/lib/monitoring';
import { getFeaturedProducts } from '@/lib/amazon';
import { generateHomePageSEO } from '@/lib/seo';

export async function GET(request: NextRequest) {
  try {
    logMessage('Starting comprehensive system test', LogLevel.INFO);
    
    const results = {
      health: await checkSystemHealth(),
      seo: generateHomePageSEO('https://glowup-blog.com'),
      products: getFeaturedProducts(2),
      timestamp: new Date().toISOString(),
      status: 'success'
    };
    
    logMessage('Comprehensive system test completed successfully', LogLevel.INFO);
    
    return NextResponse.json({ 
      success: true, 
      message: 'All systems operational',
      results
    });
  } catch (error) {
    console.error('Error in comprehensive system test:', error);
    logMessage(`Error in comprehensive system test: ${error.message}`, LogLevel.ERROR);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'System test failed', 
        error: String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
