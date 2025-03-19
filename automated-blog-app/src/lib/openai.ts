// src/lib/openai.ts
import OpenAI from 'openai';

// Initialize OpenAI client
// In production, you would use environment variables for the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-development',
});

export interface ArticleGenerationParams {
  category: string;
  topic?: string;
  targetAudience?: string;
  wordCount?: number;
  keywords?: string[];
  includeProductRecommendations?: boolean;
}

export interface GeneratedArticle {
  title: string;
  content: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  suggestedTags: string[];
  suggestedProducts?: {
    name: string;
    description: string;
    amazonUrl: string;
  }[];
}

/**
 * Generates an article using OpenAI's API
 */
export async function generateArticle(params: ArticleGenerationParams): Promise<GeneratedArticle> {
  const {
    category,
    topic = '',
    targetAudience = "women interested in lifestyle, beauty, and fitness",
    wordCount = 1000,
    keywords = [],
    includeProductRecommendations = true,
  } = params;

  // Create a detailed prompt for the AI
  const prompt = `
    Generate a high-quality, SEO-optimized blog article for women about ${topic || category}.
    
    Category: ${category}
    ${topic ? `Topic: ${topic}` : ''}
    Target Audience: ${targetAudience}
    Target Word Count: ${wordCount} words
    ${keywords.length > 0 ? `Keywords to include: ${keywords.join(', ')}` : ''}
    
    The article should be informative, engaging, and written in a conversational tone.
    Include a compelling title, introduction, several subheadings, and a conclusion.
    
    ${includeProductRecommendations ? 'Include 3-5 product recommendations related to the article topic that could be sold on Amazon.' : ''}
    
    Format the response as a JSON object with the following structure:
    {
      "title": "Article title",
      "content": "Full article content with HTML formatting",
      "excerpt": "A brief 2-3 sentence summary of the article",
      "seoTitle": "SEO-optimized title (max 60 characters)",
      "seoDescription": "SEO-optimized meta description (max 160 characters)",
      "suggestedTags": ["tag1", "tag2", "tag3"],
      ${includeProductRecommendations ? `"suggestedProducts": [
        {
          "name": "Product name",
          "description": "Brief product description",
          "amazonUrl": "amazon.com/product-link"
        }
      ]` : ''}
    }
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are an expert content creator specializing in women's lifestyle, beauty, fitness, and wellness topics. Your content is engaging, informative, and optimized for search engines."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0].message.content;
    
    if (!responseContent) {
      throw new Error("No content returned from OpenAI");
    }

    return JSON.parse(responseContent) as GeneratedArticle;
  } catch (error) {
    console.error("Error generating article:", error);
    
    // Return a fallback article for development/testing
    return {
      title: `Sample ${category.charAt(0).toUpperCase() + category.slice(1)} Article`,
      content: `<h1>Sample Article Content for ${category}</h1><p>This is a placeholder article for development and testing purposes.</p>`,
      excerpt: `This is a sample excerpt for a ${category} article.`,
      seoTitle: `${category.charAt(0).toUpperCase() + category.slice(1)} Tips and Advice | GlowUp Blog`,
      seoDescription: `Discover the latest ${category} tips and advice for women on the GlowUp Blog.`,
      suggestedTags: [category, "women", "tips"],
      suggestedProducts: includeProductRecommendations ? [
        {
          name: "Sample Product",
          description: "This is a sample product recommendation.",
          amazonUrl: "https://amazon.com/sample"
        }
      ] : undefined
    };
  }
}
