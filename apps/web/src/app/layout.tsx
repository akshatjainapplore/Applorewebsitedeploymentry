import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getSiteSettings, getMenuByLocation } from '@/lib/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings() as {
    siteTitle?: string;
    tagline?: string;
    logoUrl?: string;
    analyticsId?: string;
  } | null;

  return {
    title: {
      default: settings?.siteTitle || 'Applore',
      template: `%s | ${settings?.siteTitle || 'Applore'}`,
    },
    description: settings?.tagline || 'Technology That Inspires',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    openGraph: {
      type: 'website',
      siteName: settings?.siteTitle || 'Applore',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, headerMenu, footerMenu] = await Promise.all([
    getSiteSettings(),
    getMenuByLocation('HEADER'),
    getMenuByLocation('FOOTER'),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Header settings={settings} menu={headerMenu} />
        <main className="min-h-screen">{children}</main>
        <Footer settings={settings} menu={footerMenu} />
      </body>
    </html>
  );
}
