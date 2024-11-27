import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme/theme-provider";

import { Readex_Pro } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { QueryProvider } from "@/components/query-provider";

const readex = Readex_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - ECarry Photography",
    default: "ECarry Photography",
  },
  description: "ECarry Photography",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${readex.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>{children}</QueryProvider>
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
