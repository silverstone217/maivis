import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maivis",
  description:
    "Reserves maintenant un personnel pour garantir la securite, la proprété, ou encore la reparations des vos meubles.",
  icons: {
    icon: "./favicon.ico",
  },
  creator: "Stephane Mfuni",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div>
              <Header />
              {children}
              <Footer />
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
