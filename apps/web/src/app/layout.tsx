import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';

export const dynamic = 'force-dynamic';
import './globals.css';
import { getSiteSettings, getMenuByLocation } from '@/lib/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { MenuItem, SocialLinks } from '@applore/types';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings() as {
    siteTitle?: string; tagline?: string; logoUrl?: string;
  } | null;

  return {
    title: {
      default: settings?.siteTitle || 'Applore',
      template: `%s | ${settings?.siteTitle || 'Applore'}`,
    },
    description: settings?.tagline || 'Advisory-led technology transformation',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    openGraph: { type: 'website', siteName: settings?.siteTitle || 'Applore' },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, headerMenu, footerMenu] = await Promise.all([
    getSiteSettings(),
    getMenuByLocation('HEADER'),
    getMenuByLocation('FOOTER'),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSerif.variable} ${inter.className}`}>
        <Header
          settings={settings as { siteTitle?: string; logoUrl?: string } | null}
          menu={headerMenu as { items: MenuItem[] } | null}
        />
        <main className="min-h-screen">{children}</main>
        <Footer
          settings={settings as { siteTitle?: string; tagline?: string; socialLinks?: SocialLinks } | null}
          menu={footerMenu as { items: MenuItem[] } | null}
        />
      </body>
    </html>
  );
}
