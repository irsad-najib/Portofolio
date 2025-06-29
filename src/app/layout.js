import { Inter } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Irsad Najib Eka Putra - Portfolio",
  description: "Passionate Information Engineering student specializing in fullstack development and modern web technologies.",
  keywords: "fullstack developer, web development, React, Next.js, Node.js, portfolio",
  authors: [{ name: "Irsad Najib Eka Putra" }],
  openGraph: {
    title: "Irsad Najib Eka Putra - Portfolio",
    description: "Professional freelance developer ready for your next project",
    type: "website",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
