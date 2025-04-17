import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Securo Pass - Your Ultimate Password Manager',
  description: 'Military-grade encrypted password vault with zero-knowledge security. Manage, generate, and autofill passwords securely across all devices.',
  keywords: ['secure password manager', 'encrypted vault', 'password generator',]// Your 100 keywords here
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html>
        <Head>
          {/* Security Headers */}
          <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'" />
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="DENY" />
          <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
          <meta name="referrer" content="strict-origin" />

          {/* Favicon */}
          <Link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <Link rel="manifest" href="/site.webmanifest" />

          {/* Preload Critical Resources */}
        </Head>
        <body>


          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            {/* Footer can be added here */}
            <Footer />
          </div>
        </body>
      </html>

    </>
  );
}
