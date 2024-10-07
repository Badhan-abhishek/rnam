import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Links } from "@/features/links";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rnam.",
  description: "Generate random names",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-gray-800 text-white flex flex-col h-screen"
        )}
      >
        <header className="p-2 flex shadow-xl justify-between">
          <div
            className={cn(
              ibmPlexMono.className,
              "rounded p-2 border flex w-auto"
            )}
          >
            rnam.
          </div>
          <div className="flex items-center">
            <Links />
          </div>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
