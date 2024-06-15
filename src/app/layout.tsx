import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "@/components/ProviderWrapper";
import { Toaster } from 'sonner'
import { Footer, Header } from "@/components/layout";
import NextTopLoader from 'nextjs-toploader';



const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: "Share Res | Share resources for learning",
  description: "Share resources you have and get resources from other.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <ProviderWrapper>
          <Toaster richColors />
          <NextTopLoader />
          <Header />
          <div className="container">
            {children}
          </div>
          <Footer />
        </ProviderWrapper>
      </body>
    </html>
  );
}
