import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "@/components/ProviderWrapper";
import { Toaster } from 'sonner'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Share Res | Share resources for learning",
  description: "Share resources you have and get resources from other.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderWrapper>
          <Toaster richColors />
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
