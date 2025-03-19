import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-pink-100 to-purple-100 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="text-3xl font-bold text-pink-600">
              GlowUp
            </Link>
            <span className="ml-2 text-sm text-gray-600 hidden md:inline">Women's Lifestyle Blog</span>
          </div>
          
          <div className="relative w-full md:w-64 mb-4 md:mb-0 md:mx-4">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <nav className="flex items-center space-x-1 md:space-x-2">
            <Button variant="ghost" className="text-pink-700 hover:text-pink-900 hover:bg-pink-100">
              <Link href="/lifestyle">Lifestyle</Link>
            </Button>
            <Button variant="ghost" className="text-pink-700 hover:text-pink-900 hover:bg-pink-100">
              <Link href="/beauty">Beauty</Link>
            </Button>
            <Button variant="ghost" className="text-pink-700 hover:text-pink-900 hover:bg-pink-100">
              <Link href="/fitness">Fitness</Link>
            </Button>
            <Button variant="ghost" className="text-pink-700 hover:text-pink-900 hover:bg-pink-100">
              <Link href="/wellness">Wellness</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
