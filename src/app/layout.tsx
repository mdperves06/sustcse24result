import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SUST CSE Academic Result & Ranking Portal",
  description:
    "Official academic results, tabulation breakdowns, and cumulative CGPA rankings for Shahjalal University of Science & Technology (SUST), Department of Computer Science & Engineering.",
  icons: {
    icon: "/sust-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 antialiased selection:bg-sust-forest/20 selection:text-sust-forest">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
