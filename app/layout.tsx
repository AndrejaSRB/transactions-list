import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/lib/tanstack";
import WagmiRuntime from "@/lib/wagmi";
import ToastProvider from "@/lib/toastProvider";

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
            <ToastProvider>
              <div>{children}</div>
            </ToastProvider>
          </TanstackProvider>
        </WagmiRuntime>
      </body>
    </html>
  );
}
