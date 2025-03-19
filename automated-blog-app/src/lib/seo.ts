// src/lib/seo.ts
import { Article } from './database';

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    type: string;
    images?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
  };
  twitter?: {
    cardType: string;
    site: string;
    handle: string;
  };
  additionalMetaTags?: {
    name: string;
    content: string;
  }[];
  additionalLinkTags?: {
    rel: string;
    href: string;
  }[];
}

/**
 * Generate SEO metadata for the homepage
 */
export function generateHomePageSEO(baseUrl: string): SEOMetadata {
  return {
    title: "GlowUp - Women's Lifestyle, Beauty & Fitness Blog",
    description: "Your daily source for women's lifestyle, beauty tips, fitness routines, and wellness advice. Updated hourly with fresh content.",
    canonical: baseUrl,
    openGraph: {
      title: "GlowUp - Women's Lifestyle, Beauty & Fitness Blog",
      description: "Your daily source for women's lifestyle, beauty tips, fitness routines, and wellness advice. Updated hourly with fresh content.",
      url: baseUrl,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/glowup-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'GlowUp Blog',
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@glowupblog',
      handle: '@glowupblog',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'women lifestyle, beauty tips, fitness routines, wellness advice, women blog',
      },
    ],
  };
}

/**
 * Generate SEO metadata for a category page
 */
export function generateCategoryPageSEO(category: string, baseUrl: string): SEOMetadata {
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  const categoryDescriptions: Record<string, string> = {
    lifestyle: "Discover tips and advice for living your best life, from home decor to relationships and personal growth.",
    beauty: "Explore the latest in skincare, makeup, and beauty trends to enhance your natural radiance.",
    fitness: "Find effective workouts, exercise routines, and fitness motivation to achieve your health goals.",
    wellness: "Learn about mental and physical well-being practices for a balanced and healthy life."
  };
  
  const description = categoryDescriptions[category] || `Explore our collection of ${category} articles for women.`;
  
  return {
    title: `${categoryTitle} Tips & Advice for Women | GlowUp Blog`,
    description,
    canonical: `${baseUrl}/${category}`,
    openGraph: {
      title: `${categoryTitle} Tips & Advice for Women | GlowUp Blog`,
      description,
      url: `${baseUrl}/${category}`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/category-${category}.jpg`,
          width: 1200,
          height: 630,
          alt: `${categoryTitle} Category - GlowUp Blog`,
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@glowupblog',
      handle: '@glowupblog',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: `women ${category}, ${category} tips, ${category} advice, ${category} for women`,
      },
    ],
  };
}

/**
 * Generate SEO metadata for an article page
 */
export function generateArticlePageSEO(article: Article, baseUrl: string): SEOMetadata {
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    canonical: `${baseUrl}/article/${article.slug}`,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      url: `${baseUrl}/article/${article.slug}`,
      type: 'article',
      images: [
        {
          url: `${baseUrl}/images/article-${article.category}.jpg`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@glowupblog',
      handle: '@glowupblog',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: article.suggestedTags?.join(', ') || '',
      },
      {
        name: 'article:published_time',
        content: article.publishedAt,
      },
      {
        name: 'article:section',
        content: article.category,
      },
      {
        name: 'article:tag',
        content: article.suggestedTags?.join(', ') || '',
      },
    ],
  };
}

/**
 * Generate structured data for an article (JSON-LD)
 */
export function generateArticleStructuredData(article: Article, baseUrl: string): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: `${baseUrl}/images/article-${article.category}.jpg`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'GlowUp Blog',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GlowUp Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/article/${article.slug}`,
    },
  };
  
  return JSON.stringify(structuredData);
}

/**
 * Generate structured data for the website (JSON-LD)
 */
export function generateWebsiteStructuredData(baseUrl: string): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "GlowUp - Women's Lifestyle Blog",
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  
  return JSON.stringify(structuredData);
}
