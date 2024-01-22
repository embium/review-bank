import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { Navbar } from "./_components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "./_components/sidebar";
import { api } from "@/trpc/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review Bank!",
  description:
    "A place where you can find all your reviews for anything and everything.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.user.currentUser.query();
  const isAdmin = await api.user.isAdmin.query();
  const { categories } = await api.category.getCategories.mutate({});
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
              <Navbar user={user} admin={isAdmin} />
              <div className="flex-no-wrap flex">
                <Sidebar categories={categories} />
                <main className="w-full p-10">{children}</main>
              </div>
              <footer className="flex h-20 items-center justify-center gap-1 border-t-2 p-10 font-medium">
                <span className="text-sm">Review Bank © 2024</span>
              </footer>
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
