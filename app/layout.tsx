import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Văn Cương & Thu Nụ - Lễ Thành Hôn",
  description: "Thiệp cưới online của Văn Cương và Thu Nụ",
  openGraph: {
    title: "Văn Cương & Thu Nụ - Lễ Thành Hôn",
    description: "Thiệp cưới online của Văn Cương và Thu Nụ",
    images: [
      {
        url: "/images/ảnh đầu tiên.jpg",
        width: 1200,
        height: 630,
        alt: "Văn Cương & Thu Nụ Wedding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Văn Cương & Thu Nụ - Lễ Thành Hôn",
    description: "Thiệp cưới online của Văn Cương và Thu Nụ",
    images: ["/images/icon.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cormorant.variable} antialiased relative`}
      >
        {children}
      </body>

    </html>
  );
}
