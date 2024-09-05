"use client"

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); 

  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-800 text-white">
          <nav className="flex space-x-4">
            <Link
              href="/creditCard"
              className={`hover:underline ${
                pathname === '/creditCard' ? 'text-yellow-500 font-bold' : ''
              }`}
            >
              Credit Card
            </Link>

            <Link
              href="/bank"
              className={`hover:underline ${
                pathname === '/bank' ? 'text-yellow-500 font-bold' : ''
              }`}
            >
              Bank
            </Link>
          </nav>
        </header>

        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
