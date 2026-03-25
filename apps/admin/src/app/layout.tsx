import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import SessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Applore Admin',
    template: '%s | Applore Admin',
  },
  description: 'Applore CMS Admin Panel',
  robots: 'noindex,nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
