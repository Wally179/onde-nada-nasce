import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased min-h-screen bg-[url('/assets/backgrounds/main-bg.svg')] bg-cover bg-center">
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
