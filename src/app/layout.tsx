import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import ScrollToTopButton from "@/app/_components/ScrollToTopButton"
import "@/styles/globals.css";
import styles from "@/styles/_layouts/layout.module.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goomba's Pages",
  description: "Goomba's Github pages, using NextJS",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
