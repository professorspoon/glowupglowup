import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // In a real implementation, we would fetch the article data based on the slug
  const slug = params.slug;
  
  // Extract category from slug if it contains a hyphen
  const category = slug.includes('-') ? slug.split('-')[0] : 'lifestyle';
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${category}`} className="hover:text-pink-600">{categoryTitle}</Link>
          <span className="mx-2">/</span>
          <span>Current Article</span>
        </div>
        
        {/* Article Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 mb-4">
            {categoryTitle}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {category === 'lifestyle' 
              ? '10 Ways to Create a Balanced Work-Life Routine' 
              : category === 'beauty' 
                ? 'The Ultimate Guide to Skincare Layering' 
                : category === 'fitness' 
                  ? '30-Day Fitness Challenge for Beginners' 
                  : 'How to Practice Mindfulness in Your Daily Life'}
          </h1>
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <span className="mr-4">By GlowUp Team</span>
            <span className="mr-4">|</span>
            <span className="mr-4">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="mr-4">|</span>
            <span>10 min read</span>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-8">
          <Image 
            src={`/article-${category}.jpg`} 
            alt="Article Featured Image" 
            fill 
            style={{objectFit: "cover"}}
            priority
          />
        </div>
        
        {/* Article Content */}
        <div className="prose prose-pink max-w-none mb-12">
          <p className="text-lg font-medium mb-6">
            {category === 'lifestyle' 
              ? 'Finding balance between work and personal life is essential for overall well-being and happiness. This comprehensive guide will help you create a sustainable routine that works for your unique lifestyle.' 
              : category === 'beauty' 
                ? 'Understanding the correct order to apply skincare products is crucial for maximizing their effectiveness. This guide breaks down the perfect layering technique for your morning and evening routines.' 
                : category === 'fitness' 
                  ? 'Starting a fitness journey can be intimidating, but with the right approach, anyone can build a consistent exercise habit. This 30-day challenge is designed specifically for beginners.' 
                  : 'Mindfulness is the practice of being present and fully engaged with whatever we're doing at the moment. Learn how to incorporate mindfulness into your everyday activities for reduced stress and improved well-being.'}
          </p>
          
          <h2>Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          
          <h2>Why This Matters</h2>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          
          <h2>Key Points to Remember</h2>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          
          <div className="relative h-[300px] w-full rounded-xl overflow-hidden my-8">
            <Image 
              src={`/article-content-${category}.jpg`} 
              alt="Article Content Image" 
              fill 
              style={{objectFit: "cover"}}
            />
          </div>
          
          <h2>Step-by-Step Guide</h2>
          <p>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          </p>
          
          <h3>1. First Step</h3>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </p>
          
          <h3>2. Second Step</h3>
          <p>
            Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
          </p>
          
          <h3>3. Third Step</h3>
          <p>
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
          </p>
          
          <h2>Expert Tips</h2>
          <p>
            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
          </p>
          
          <h2>Conclusion</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        
        {/* Author Bio */}
        <div className="flex items-center p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl mb-12">
          <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
            <Image 
              src="/author-avatar.jpg" 
              alt="Author" 
              fill 
              style={{objectFit: "cover"}}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Written by GlowUp Team</h3>
            <p className="text-sm text-gray-600">Our expert team of writers specializes in women's lifestyle, beauty, fitness, and wellness topics.</p>
          </div>
        </div>
        
        {/* Social Sharing */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <span className="text-gray-700">Share this article:</span>
          <a href="#" className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="#" className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="#" className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="#" className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Recommended Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image 
                  src={`/product-${item}.jpg`} 
                  alt={`Product ${item}`} 
                  fill 
                  style={{objectFit: "contain"}}
                />
              </div>
              <div className="p-4">
                <h3 className="text-md font-semibold mb-2 line-clamp-2">
                  {category === 'lifestyle' 
                    ? `Home Organization Set ${item}` 
                    : category === 'beauty' 
                      ? `Premium Beauty Collection ${item}` 
                      : category === 'fitness' 
                        ? `Fitness Equipment Set ${item}` 
                        : `Wellness Essential Kit ${item}`}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(120+ reviews)</span>
                </div>
                <p className="text-pink-600 font-bold mb-3">${(item * 10) + 9.99}</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  View on Amazon
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Related Articles */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image 
                  src={`/placeholder-${item}.jpg`} 
                  alt={`Related Article ${item}`} 
                  fill 
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 mb-2">
                  {['Beauty', 'Fitness', 'Wellness'][item - 1]}
                </span>
                <h3 className="text-lg font-semibold mb-2">
                  {item === 1 
                    ? 'How to Choose the Right Moisturizer for Your Skin Type' 
                    : item === 2 
                      ? '5 Morning Stretches to Start Your Day Right' 
                      : 'The Benefits of Meditation for Stress Relief'}
                </h3>
                <Link href={`/article/related-${item}`} className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  Read More →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
