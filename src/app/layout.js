import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Let Me Plex That",
  description: "Let Me Plex That for you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ... your existing head content ... */}
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
