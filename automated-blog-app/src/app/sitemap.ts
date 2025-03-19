// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllArticles, getArticlesByCategory } from '@/lib/database';

const BASE_URL = 'https://glowup-blog.com'; // Replace with actual domain in production

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all articles
  const articles = await getAllArticles();
  
  // Get articles by category for category pages
  const categories = ['lifestyle', 'beauty', 'fitness', 'wellness'];
  
  // Static pages
  const staticPages = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
  
  // Category pages
  const categoryPages = categories.map(category => ({
    url: `${BASE_URL}/${category}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));
  
  // Article pages
  const articlePages = articles.map(article => ({
    url: `${BASE_URL}/article/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  return [...staticPages, ...categoryPages, ...articlePages];
}
