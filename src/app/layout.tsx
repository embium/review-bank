import {
  ClerkProvider,
  OrganizationSwitcher,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Script from "next/script";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Clerk Template",
  description:
    "A simple and powerful Next.js template featuring authentication and user management powered by Clerk.",
  openGraph: { images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${inter.className} flex min-h-screen flex-col`}>
          <TRPCReactProvider>
            <header className="flex h-20 items-center gap-4 border-b border-solid border-black border-opacity-20 px-4 sm:px-8">
              <div className="grow" />
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </header>
            <main className="grow">{children}</main>
            <footer className="flex h-20 items-center justify-end gap-1 border-t p-10 font-medium">
              <span className="text-sm">© 2023</span>
            </footer>
          </TRPCReactProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
