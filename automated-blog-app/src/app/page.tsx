import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/70 to-purple-500/70 z-10"></div>
        <div className="relative h-[500px] w-full">
          <Image 
            src="/placeholder-hero.jpg" 
            alt="Women's Lifestyle Blog" 
            fill 
            style={{objectFit: "cover"}}
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to GlowUp</h1>
          <p className="text-xl text-white mb-8 max-w-2xl">Your daily source for women's lifestyle, beauty tips, fitness routines, and wellness advice.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              <Link href="/beauty">Beauty Tips</Link>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/fitness">Fitness Routines</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Featured Articles</h2>
          <Link href="/articles" className="text-purple-600 hover:text-purple-800">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image 
                  src={`/placeholder-${item}.jpg`} 
                  alt={`Featured Article ${item}`} 
                  fill 
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 mb-2">
                  {item === 1 ? "Beauty" : item === 2 ? "Fitness" : "Lifestyle"}
                </span>
                <h3 className="text-lg font-semibold mb-2">How to {item === 1 ? "Create the Perfect Skincare Routine" : item === 2 ? "Stay Motivated for Your Workouts" : "Balance Work and Personal Life"}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item === 1 
                    ? "Discover the essential steps for a skincare routine that will leave your skin glowing and healthy." 
                    : item === 2 
                      ? "Learn effective strategies to maintain your fitness motivation and achieve your health goals." 
                      : "Practical tips for finding harmony between your professional responsibilities and personal well-being."}
                </p>
                <Link href={`/article/${item}`} className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  Read More →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Explore Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Lifestyle", image: "/category-lifestyle.jpg", description: "Tips for living your best life" },
            { name: "Beauty", image: "/category-beauty.jpg", description: "Skincare, makeup, and beauty trends" },
            { name: "Fitness", image: "/category-fitness.jpg", description: "Workouts and exercise routines" },
            { name: "Wellness", image: "/category-wellness.jpg", description: "Mental and physical well-being" }
          ].map((category, index) => (
            <div key={index} className="relative group rounded-xl overflow-hidden h-60">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <div className="relative h-full w-full">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill 
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm mb-3">{category.description}</p>
                <Link 
                  href={`/${category.name.toLowerCase()}`}
                  className="inline-block px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white text-xs transition-colors"
                >
                  Explore {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Trending Now</h2>
          <Link href="/trending" className="text-purple-600 hover:text-purple-800">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div key={item} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="relative h-48 md:h-auto md:w-1/3 rounded-lg overflow-hidden">
                <Image 
                  src={`/trending-${item}.jpg`} 
                  alt={`Trending Article ${item}`} 
                  fill 
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="md:w-2/3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-2">
                  {item === 1 ? "Wellness" : "Beauty"}
                </span>
                <h3 className="text-lg font-semibold mb-2">{item === 1 ? "5 Meditation Techniques for Busy Women" : "Summer Makeup Trends You Need to Try"}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item === 1 
                    ? "Quick and effective meditation practices that can fit into even the busiest schedules." 
                    : "The hottest makeup looks for the summer season that are both trendy and wearable."}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">5 min read</span>
                  <span>Trending #1</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-8 mb-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Stay Updated</h2>
          <p className="text-gray-700 mb-6">Subscribe to our newsletter for the latest articles, tips, and exclusive content.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Amazon Product Recommendations */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Recommended Products</h2>
          <Link href="/products" className="text-purple-600 hover:text-purple-800">
            View All
          </Link>
        </div>
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
                  {item === 1 
                    ? "Premium Skincare Set with Vitamin C Serum" 
                    : item === 2 
                      ? "Yoga Mat with Alignment Markers" 
                      : item === 3 
                        ? "Stainless Steel Water Bottle" 
                        : "Natural Ingredient Makeup Palette"}
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
    </div>
  );
}
