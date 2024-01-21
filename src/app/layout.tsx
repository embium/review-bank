import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { Navbar } from "./_components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "./_components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review Bank!",
  description:
    "A place where you can find all your reviews for anything and everything.",
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
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div className="flex-no-wrap flex">
                <Sidebar />
                <main>{children}</main>
              </div>
              <footer className="flex h-20 items-center justify-end gap-1 p-10 font-medium">
                <span className="text-sm">© 2023</span>
              </footer>
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
