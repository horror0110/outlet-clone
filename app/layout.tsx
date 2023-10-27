import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { GlobalProvider } from "@/context/GlobalContext";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Outlet Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Provider>
            <Navbar />
            <Loading />
            {children}
          </Provider>
        </GlobalProvider>
      </body>
    </html>
  );
}
