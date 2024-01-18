import {
  ClerkProvider,
  OrganizationSwitcher,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
            membersPageInviteButton:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            card: "bg-[#fafafa]",
          },
        }}
      >
        <body className={`${inter.className} flex min-h-screen flex-col`}>
          <TRPCReactProvider>
            <header className="flex h-20 items-center gap-4 border-b border-solid border-black border-opacity-20 px-4 sm:px-8">
              <div className="grow" />
              <SignedIn>
                <div className="hidden sm:block">
                  <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
                </div>
                <div className="block sm:hidden">
                  <OrganizationSwitcher
                    afterCreateOrganizationUrl="/dashboard"
                    appearance={{
                      elements: {
                        organizationSwitcherTriggerIcon: `hidden`,
                        organizationPreviewTextContainer: `hidden`,
                        organizationSwitcherTrigger: `pr-0`,
                      },
                    }}
                  />
                </div>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </header>
            <main className="grow">{children}</main>
            <footer className="flex h-20 items-center gap-1 border-t px-8 font-medium md:px-20">
              <Image
                src="/clerk.svg"
                alt="Clerk Logo"
                width={64}
                height={32}
                priority
              />
              <span className="text-sm">© 2023</span>
            </footer>
          </TRPCReactProvider>
        </body>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}
