import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthProvider from "@/myComponents/AuthProvider";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoMono = Noto_Sans_Mono({
  variable: "--font-noto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Investors is an investment platform that allows users to invest in a diversified portfolio of cryptocurrencies and earn passive income. Our platform is designed to be user-friendly and accessible to everyone, regardless of their level of experience with cryptocurrency investing. With Profit Towers, you can easily invest in a variety of cryptocurrencies and earn a steady stream of passive income without having to manage your investments yourself.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html
        lang="en"
        className={`${notoSans.variable} ${notoMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
