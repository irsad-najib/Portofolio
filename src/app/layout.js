import { Inter } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Irsad Najib Eka Putra - Fullstack Developer",
  description: "Passionate Information Engineering student specializing in fullstack development and modern web technologies.",
  keywords: "fullstack developer, web development, React, Next.js, Node.js, portfolio",
  authors: [{ name: "Irsad Najib Eka Putra" }],
  openGraph: {
    title: "Irsad Najib - Fullstack Developer Portfolio",
    description: "Professional freelance developer ready for your next project",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
