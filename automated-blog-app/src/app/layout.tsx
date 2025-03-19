import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DefaultSeo } from "next-seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlowUp - Women's Lifestyle, Beauty & Fitness Blog",
  description: "Your daily source for women's lifestyle, beauty tips, fitness routines, and wellness advice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DefaultSeo
          titleTemplate="%s | GlowUp - Women's Lifestyle Blog"
          defaultTitle="GlowUp - Women's Lifestyle, Beauty & Fitness Blog"
          description="Your daily source for women's lifestyle, beauty tips, fitness routines, and wellness advice."
          openGraph={{
            type: 'website',
            locale: 'en_US',
            url: 'https://glowup-blog.com/',
            siteName: 'GlowUp Blog',
            images: [
              {
                url: '/images/glowup-og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'GlowUp Blog',
              },
            ],
          }}
          twitter={{
            handle: '@glowupblog',
            site: '@glowupblog',
            cardType: 'summary_large_image',
          }}
        />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
