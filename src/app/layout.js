import { Inter, Space_Grotesk, Orbitron } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

// Configure fonts properly
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-space-grotesk'
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  display: 'swap',
  variable: '--font-orbitron'
});

export const metadata = {
  title: "Irsad Najib Eka Putra - Fullstack Developer",
  description: "Passionate Information Engineering student specializing in fullstack development and modern web technologies.",
  keywords: "fullstack developer, web development, React, Next.js, Node.js, portfolio",
  icons: "new.jpg"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
