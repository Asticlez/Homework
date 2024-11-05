import type { Metadata } from "next";
import { Sarabun } from "next/font/google"
import "./globals.css";

const sarabun = Sarabun({
  weight: '400',
  subsets: ['thai']
})

export const metadata: Metadata = {
  title: "GGEZweCOOK",
  description: "This is my sample application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sarabun.className}`}
      >
        {/* <Head /> */}
        <main>
          {children}
        </main>
        {/* <Foot /> */}
      </body>
    </html>
  );
}