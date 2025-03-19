import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-100 to-pink-100 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-pink-600 mb-4">GlowUp</h3>
            <p className="text-gray-600 mb-4">
              Your daily source for women's lifestyle, beauty tips, fitness routines, and wellness advice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-pink-500 hover:text-pink-700">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-700">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-700">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-700">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-pink-600 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/lifestyle" className="text-gray-600 hover:text-pink-600">Lifestyle</Link></li>
              <li><Link href="/beauty" className="text-gray-600 hover:text-pink-600">Beauty</Link></li>
              <li><Link href="/fitness" className="text-gray-600 hover:text-pink-600">Fitness</Link></li>
              <li><Link href="/wellness" className="text-gray-600 hover:text-pink-600">Wellness</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-pink-600 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-pink-600">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-pink-600">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-pink-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-pink-600">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-pink-600 mb-4">Newsletter</h4>
            <p className="text-gray-600 mb-4">Subscribe to get the latest updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 w-full"
              />
              <button className="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-pink-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} GlowUp Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
