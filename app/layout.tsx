import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js 16 Features",
  description: "Explore Next.js 16 features and improvements",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="antialiased bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
