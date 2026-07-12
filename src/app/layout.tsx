import type { Metadata } from "next";
import { Caveat } from 'next/font/google';
import "./globals.css";

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
});

export const metadata: Metadata = {
  title: "Onde Nada nasce",
  description: "Visual novel investigativa de horror cósmico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${caveat.variable} antialiased min-h-screen bg-[url('/assets/backgrounds/main-bg.svg')] bg-cover bg-center`}>
        {/* Visual overlays for horror effect */}
        <div className="vignette"></div>
        <div className="crt fixed inset-0 pointer-events-none z-50"></div>
        
        {/* Main centered window container (Amor Doce style) */}
        <main className="relative z-10 w-full h-screen overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
