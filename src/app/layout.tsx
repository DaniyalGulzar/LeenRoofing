'use client'; // This makes the component a Client Component
import { Outfit } from 'next/font/google';
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Toaster position="top-right" />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
