// src/lib/contentScheduler.ts
import cron from 'node-cron';
import { generateArticle, ArticleGenerationParams } from './openai';
import { saveArticle } from './database';

// Categories for the blog
const CATEGORIES = ['lifestyle', 'beauty', 'fitness', 'wellness'];

// Topics for each category
const TOPICS: Record<string, string[]> = {
  lifestyle: [
    'Work-life balance for busy women',
    'Home organization tips for small spaces',
    'Self-care routines for working professionals',
    'Budget-friendly home decor ideas',
    'Sustainable living practices for beginners',
    'Relationship advice for modern women',
    'Time management strategies for moms',
    'Travel essentials for solo female travelers'
  ],
  beauty: [
    'Skincare routines for different skin types',
    'Natural makeup looks for everyday wear',
    'Hair care tips for damaged hair',
    'Budget-friendly beauty products that actually work',
    'Anti-aging skincare ingredients to look for',
    'Seasonal makeup trends',
    'DIY beauty treatments using kitchen ingredients',
    'Nighttime beauty routines for glowing skin'
  ],
  fitness: [
    'Quick home workouts for busy schedules',
    'Beginner's guide to strength training',
    'Yoga poses for stress relief',
    'Low-impact exercises for joint health',
    'Nutrition tips for active women',
    'How to stay motivated with your fitness routine',
    'Building a balanced workout schedule',
    'Fitness myths debunked'
  ],
  wellness: [
    'Meditation techniques for beginners',
    'Improving sleep quality naturally',
    'Stress management strategies',
    'Mindfulness practices for daily life',
    'Building healthy habits that stick',
    'Mental health self-care tips',
    'Creating a balanced diet plan',
    'Digital detox strategies for modern life'
  ]
};

// Keywords for SEO optimization
const KEYWORDS: Record<string, string[]> = {
  lifestyle: ['women lifestyle', 'work life balance', 'home organization', 'self-care', 'home decor'],
  beauty: ['women beauty tips', 'skincare routine', 'natural makeup', 'hair care', 'beauty products'],
  fitness: ['women fitness', 'home workouts', 'strength training', 'yoga', 'exercise routine'],
  wellness: ['women wellness', 'meditation', 'sleep quality', 'stress management', 'mindfulness']
};

/**
 * Selects a random item from an array
 */
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generates a random article for a specific category
 */
async function generateRandomArticle(category: string) {
  const topics = TOPICS[category];
  const topic = getRandomItem(topics);
  const keywordsForCategory = KEYWORDS[category];
  
  // Select 3-5 random keywords
  const numKeywords = Math.floor(Math.random() * 3) + 3; // 3 to 5 keywords
  const selectedKeywords: string[] = [];
  
  for (let i = 0; i < numKeywords; i++) {
    const keyword = getRandomItem(keywordsForCategory);
    if (!selectedKeywords.includes(keyword)) {
      selectedKeywords.push(keyword);
    }
  }
  
  const params: ArticleGenerationParams = {
    category,
    topic,
    keywords: selectedKeywords,
    wordCount: Math.floor(Math.random() * 500) + 1000, // 1000 to 1500 words
    includeProductRecommendations: true
  };
  
  try {
    console.log(`Generating article for ${category}: ${topic}`);
    const article = await generateArticle(params);
    await saveArticle({
      ...article,
      category,
      slug: createSlug(article.title),
      publishedAt: new Date().toISOString()
    });
    console.log(`Successfully generated and saved article: ${article.title}`);
    return article;
  } catch (error) {
    console.error(`Error generating article for ${category}:`, error);
    throw error;
  }
}

/**
 * Creates a URL-friendly slug from a title
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Schedules hourly article generation
 */
export function scheduleArticleGeneration() {
  // Schedule to run every hour
  return cron.schedule('0 * * * *', async () => {
    try {
      console.log('Running scheduled article generation...');
      
      // Select a random category
      const category = getRandomItem(CATEGORIES);
      
      // Generate and save an article
      await generateRandomArticle(category);
      
      console.log('Scheduled article generation completed successfully');
    } catch (error) {
      console.error('Error in scheduled article generation:', error);
    }
  });
}

/**
 * Generates initial content for the blog (one article per category)
 */
export async function generateInitialContent() {
  console.log('Generating initial content for the blog...');
  
  try {
    // Generate one article for each category
    for (const category of CATEGORIES) {
      await generateRandomArticle(category);
    }
    
    console.log('Initial content generation completed successfully');
  } catch (error) {
    console.error('Error generating initial content:', error);
    throw error;
  }
}
