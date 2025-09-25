import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "SyncSales",
  description: "Simple | Reliable | Trusted",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${montserrat.variable}`}>
          <Toaster richColors position="top-center" />
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
