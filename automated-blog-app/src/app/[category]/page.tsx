import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category;
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  
  const categoryDescriptions: Record<string, string> = {
    lifestyle: "Discover tips and advice for living your best life, from home decor to relationships and personal growth.",
    beauty: "Explore the latest in skincare, makeup, and beauty trends to enhance your natural radiance.",
    fitness: "Find effective workouts, exercise routines, and fitness motivation to achieve your health goals.",
    wellness: "Learn about mental and physical well-being practices for a balanced and healthy life."
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <section className="relative rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/70 to-purple-500/70 z-10"></div>
        <div className="relative h-[300px] w-full">
          <Image 
            src={`/category-${category}.jpg`} 
            alt={`${categoryTitle} Category`} 
            fill 
            style={{objectFit: "cover"}}
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{categoryTitle}</h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            {categoryDescriptions[category] || "Explore our collection of articles in this category."}
          </p>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Latest {categoryTitle} Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image 
                  src={`/placeholder-${(item % 3) + 1}.jpg`} 
                  alt={`Article ${item}`} 
                  fill 
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 mb-2">
                  {categoryTitle}
                </span>
                <h3 className="text-lg font-semibold mb-2">
                  {category === 'lifestyle' 
                    ? `${item} Ways to Organize Your Home Office` 
                    : category === 'beauty' 
                      ? `The Best ${item} Skincare Products for Your Routine` 
                      : category === 'fitness' 
                        ? `${item}-Minute Workout for Busy Women` 
                        : `${item} Meditation Techniques for Daily Practice`}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category === 'lifestyle' 
                    ? "Create a productive and inspiring workspace with these organization tips." 
                    : category === 'beauty' 
                      ? "Discover the must-have products that will transform your skincare routine." 
                      : category === 'fitness' 
                        ? "Quick and effective workout routines that fit into your busy schedule." 
                        : "Simple meditation practices to reduce stress and improve mental clarity."}
                </p>
                <div className="flex justify-between items-center">
                  <Link href={`/article/${category}-${item}`} className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    Read More →
                  </Link>
                  <span className="text-xs text-gray-500">5 min read</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">
            Load More
          </Button>
        </div>
      </section>

      {/* Related Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Recommended {categoryTitle} Products</h2>
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
      </section>

      {/* Popular Topics */}
      <section>
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Popular {categoryTitle} Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Link 
              key={item} 
              href={`/${category}/topic-${item}`}
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 hover:from-pink-100 hover:to-purple-100 transition-colors text-center"
            >
              {category === 'lifestyle' 
                ? ['Home Decor', 'Work-Life Balance', 'Relationships', 'Travel', 'Fashion', 'Productivity', 'Self-Care', 'Entertaining'][item - 1]
                : category === 'beauty' 
                  ? ['Skincare', 'Makeup', 'Hair Care', 'Nail Care', 'Anti-Aging', 'Natural Beauty', 'Beauty Tools', 'Fragrance'][item - 1]
                  : category === 'fitness' 
                    ? ['HIIT Workouts', 'Yoga', 'Strength Training', 'Cardio', 'Pilates', 'Home Workouts', 'Running', 'Flexibility'][item - 1]
                    : ['Meditation', 'Nutrition', 'Sleep', 'Mental Health', 'Self-Care', 'Stress Management', 'Mindfulness', 'Holistic Health'][item - 1]}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
