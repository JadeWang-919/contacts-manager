import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Contact Manager",
  description: "Manage your contacts easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <div className="flex flex-col min-h-screen flex-grow">
            <header className="sticky top-0 z-50 w-full bg-white shadow-md px-6 md:px-8">
              <div className="flex justify-between items-center h-16 max-w-6xl w-full mx-auto">
                <Link href="/" className="flex items-center">
                  <div className="relative w-40 md:w-[200px] h-[100px]">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      fill
                      sizes="(max-width: 768px) 10rem, 200px"
                      className="rounded-md object-contain"
                      priority
                    />
                  </div>
                </Link>

                <div className="flex items-center gap-4">
                  <SignedIn>
                    <SearchBar />
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </header>

            <main className="flex-grow w-full flex px-6 md:px-8">
              <div className="flex max-w-6xl w-full mx-auto">{children}</div>
            </main>
          </div>

          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
