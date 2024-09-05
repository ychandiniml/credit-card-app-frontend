import React from 'react';
import Link from 'next/link';
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-800 text-white">
          <nav className="flex space-x-4">
            <Link href="/creditCard" className="hover:underline">Credit Card</Link>
            <Link href="/bank" className="hover:underline">Bank</Link>
          </nav>
        </header>
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
