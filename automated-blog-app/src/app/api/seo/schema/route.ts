// src/app/api/seo/schema/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateArticleStructuredData, generateWebsiteStructuredData } from '@/lib/seo';
import { getArticleBySlug } from '@/lib/database';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');
  const slug = searchParams.get('slug');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://glowup-blog.com';
  
  try {
    if (type === 'website') {
      // Generate website schema
      const schema = generateWebsiteStructuredData(baseUrl);
      return NextResponse.json({ schema });
    } else if (type === 'article' && slug) {
      // Get article and generate article schema
      const article = await getArticleBySlug(slug);
      
      if (!article) {
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        );
      }
      
      const schema = generateArticleStructuredData(article, baseUrl);
      return NextResponse.json({ schema });
    }
    
    return NextResponse.json(
      { error: 'Invalid parameters' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error generating schema:', error);
    return NextResponse.json(
      { error: 'Failed to generate schema' },
      { status: 500 }
    );
  }
}
