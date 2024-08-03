import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/lib/tanstack";
import WagmiRuntime from "@/lib/wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transactions List",
  description: "List of transactions for given address",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiRuntime>
          <TanstackProvider>
            <div>{children}</div>
          </TanstackProvider>
        </WagmiRuntime>
      </body>
    </html>
  );
}
