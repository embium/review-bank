import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review Bank!",
  description:
    "A place where you can find all your reviews anything and everything.",
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
