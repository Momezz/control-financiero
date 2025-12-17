import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../public/css/variables.css';
import './globals.css';
import { Providers } from '@/redux/providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finanzas Personales",
  description: "App para el control de finanzas personales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
