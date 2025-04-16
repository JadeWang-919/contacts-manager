import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import SearchBar from "@/components/SearchBar";

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
          <div className="flex flex-col min-h-screen" id="app-content">
            <header className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-900 shadow-md dark:shadow-[0_2px_2px_rgba(255,255,255,0.08)] px-4 md:px-6">
              <div className="flex justify-between items-center h-16 max-w-6xl w-full mx-auto">
                <Link href="/" className="flex items-center">
                  {/* Large screen logo */}
                  <div className="hidden sm:block relative w-48 h-16">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      fill
                      sizes="192px"
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Small screen logo */}
                  <div className="block sm:hidden relative w-10 h-10">
                    <Image
                      src="/logo-sm.png"
                      alt="Logo Small"
                      fill
                      sizes="40px"
                      className="object-contain"
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

            <main className="flex-grow w-full flex px-4 md:px-6">
              <div className="flex max-w-6xl w-full mx-auto">{children}</div>
            </main>
          </div>

          <Toaster position="top-center" />
          <div id="modal-root" />
        </body>
      </html>
    </ClerkProvider>
  );
}
