import NavBar from "./(components)/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Liver Health Predictor",
  description:
    "Unleashing the untapped potential of liver health with visionary solutions and groundbreaking technology, transforming the way we approach wellness.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
