import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers/AuthProvider";
import PaddingTopComponent from "@/components/PaddingTopComponent";

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
            <div className="h-screen w-screen overflow-hidden relative">
              <Header />
              <div className="z-10 overflow-x-hidden w-full flex flex-col items-center justify-between scrollbar-hide overflow-y-auto h-[calc(100dvh)] scroll-smooth scroll-div">
                {/* <PaddingTopComponent /> */}
                <div className="w-full">{children}</div>
                <Footer />
              </div>
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
