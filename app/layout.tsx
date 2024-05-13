import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import Providers from '@/lib/providers';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });
import { cn } from '@/lib/utils';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Send Token',
  description: 'App tp send tokens on Avalanche Fuji testnet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'dark min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
