// src/lib/database.ts
import fs from 'fs';
import path from 'path';
import { GeneratedArticle } from './openai';

// Define the data directory
const DATA_DIR = path.join(process.cwd(), 'data');
const ARTICLES_DIR = path.join(DATA_DIR, 'articles');

// Ensure directories exist
function ensureDirectoriesExist() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }
}

// Interface for article with additional metadata
export interface Article extends GeneratedArticle {
  id?: string;
  slug: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
}

/**
 * Save an article to the database
 */
export async function saveArticle(article: Article): Promise<Article> {
  ensureDirectoriesExist();
  
  // Generate ID if not provided
  if (!article.id) {
    article.id = Date.now().toString();
  }
  
  // Set updatedAt timestamp
  article.updatedAt = new Date().toISOString();
  
  // Save article to file
  const filePath = path.join(ARTICLES_DIR, `${article.id}.json`);
  await fs.promises.writeFile(filePath, JSON.stringify(article, null, 2));
  
  // Update category index
  await updateCategoryIndex(article.category, article);
  
  return article;
}

/**
 * Get an article by ID
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, `${id}.json`);
  
  try {
    if (fs.existsSync(filePath)) {
      const data = await fs.promises.readFile(filePath, 'utf8');
      return JSON.parse(data) as Article;
    }
    return null;
  } catch (error) {
    console.error(`Error reading article ${id}:`, error);
    return null;
  }
}

/**
 * Get an article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articles = await getAllArticles();
    return articles.find(article => article.slug === slug) || null;
  } catch (error) {
    console.error(`Error finding article with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get all articles
 */
export async function getAllArticles(): Promise<Article[]> {
  ensureDirectoriesExist();
  
  try {
    const files = await fs.promises.readdir(ARTICLES_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const articles = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(ARTICLES_DIR, file);
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data) as Article;
      })
    );
    
    // Sort by publishedAt date (newest first)
    return articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('Error getting all articles:', error);
    return [];
  }
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const articles = await getAllArticles();
    return articles
      .filter(article => article.category === category)
      .sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  } catch (error) {
    console.error(`Error getting articles for category ${category}:`, error);
    return [];
  }
}

/**
 * Update the category index file
 */
async function updateCategoryIndex(category: string, article: Article): Promise<void> {
  const categoryDir = path.join(DATA_DIR, 'categories');
  
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
  
  const indexPath = path.join(categoryDir, `${category}.json`);
  
  try {
    let categoryArticles: { id: string; slug: string; title: string; publishedAt: string }[] = [];
    
    // Read existing index if it exists
    if (fs.existsSync(indexPath)) {
      const data = await fs.promises.readFile(indexPath, 'utf8');
      categoryArticles = JSON.parse(data);
    }
    
    // Check if article already exists in index
    const existingIndex = categoryArticles.findIndex(a => a.id === article.id);
    
    if (existingIndex >= 0) {
      // Update existing entry
      categoryArticles[existingIndex] = {
        id: article.id!,
        slug: article.slug,
        title: article.title,
        publishedAt: article.publishedAt
      };
    } else {
      // Add new entry
      categoryArticles.push({
        id: article.id!,
        slug: article.slug,
        title: article.title,
        publishedAt: article.publishedAt
      });
    }
    
    // Sort by publishedAt date (newest first)
    categoryArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Write updated index
    await fs.promises.writeFile(indexPath, JSON.stringify(categoryArticles, null, 2));
  } catch (error) {
    console.error(`Error updating category index for ${category}:`, error);
  }
}

/**
 * Get featured articles (most recent from each category)
 */
export async function getFeaturedArticles(limit = 4): Promise<Article[]> {
  try {
    const categories = ['lifestyle', 'beauty', 'fitness', 'wellness'];
    const featuredArticles: Article[] = [];
    
    for (const category of categories) {
      const categoryArticles = await getArticlesByCategory(category);
      if (categoryArticles.length > 0) {
        featuredArticles.push(categoryArticles[0]);
      }
    }
    
    // If we don't have enough articles, fill with the most recent ones
    if (featuredArticles.length < limit) {
      const allArticles = await getAllArticles();
      const additionalArticles = allArticles
        .filter(article => !featuredArticles.some(a => a.id === article.id))
        .slice(0, limit - featuredArticles.length);
      
      featuredArticles.push(...additionalArticles);
    }
    
    return featuredArticles.slice(0, limit);
  } catch (error) {
    console.error('Error getting featured articles:', error);
    return [];
  }
}
