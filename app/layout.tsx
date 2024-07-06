import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

import { TailwindIndicator } from "@/components/tailwind-indicator";

const readex = Readex_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - ECarry Photography",
    default: "ECarry Photography",
  },
  description: "ECarry Photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={readex.className}>
        {children}
        <TailwindIndicator />
      </body>
    </html>
  );
}
