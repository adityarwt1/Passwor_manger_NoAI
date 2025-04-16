import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Securo Pass - Your Ultimate Password Management Solution",
  description: "Securo Pass is a secure, encrypted password manager that protects your digital life. With military-grade encryption and zero-knowledge architecture, we ensure your passwords are safe while making them easily accessible across all your devices. Join thousands of users who trust us to safeguard their online identities with intuitive security features like password generation, auto-fill, and breach monitoring.",
  keywords: [
    // Security Keywords
    "secure password manager",
    "encrypted vault",
    "military-grade encryption",
    "zero-knowledge security",
    "password protection",
    "cybersecurity solution",
    "data encryption",
    "online security",
    "digital protection",
    "privacy focused",

    // Functionality Keywords
    "password generator",
    "auto-fill passwords",
    "password storage",
    "password organizer",
    "password sync",
    "cross-platform passwords",
    "password autosave",
    "secure notes",
    "digital wallet",
    "form filler",

    // User Benefit Keywords
    "easy password management",
    "one-click login",
    "password security",
    "hack-proof passwords",
    "password strength checker",
    "breach monitoring",
    "dark web scanner",
    "password health",
    "reused password alert",
    "weak password detector",

    // Technical Keywords
    "AES-256 encryption",
    "end-to-end encrypted",
    "biometric authentication",
    "two-factor authentication",
    "2FA integration",
    "multi-device sync",
    "cloud password manager",
    "offline password access",
    "secure password sharing",
    "password history",

    // Platform Keywords
    "Windows password manager",
    "Mac password app",
    "iOS password keeper",
    "Android password vault",
    "Chrome password extension",
    "Firefox password plugin",
    "Safari password helper",
    "Linux password tool",
    "cross-browser passwords",
    "desktop password solution",

    // Business/Team Keywords
    "enterprise password manager",
    "team password sharing",
    "business password security",
    "employee password control",
    "admin password dashboard",
    "password policy enforcement",
    "company-wide security",
    "SSO integration",
    "SCIM provisioning",
    "audit logs",

    // Trust Building Keywords
    "trusted password manager",
    "no password knowledge",
    "independent security audit",
    "transparent security",
    "GDPR compliant",
    "HIPAA compliant",
    "SOC 2 certified",
    "password manager reviews",
    "award-winning security",
    "security certifications",

    // User Experience Keywords
    "intuitive password app",
    "simple password organizer",
    "user-friendly security",
    "password migration",
    "quick login setup",
    "password import/export",
    "minimalist password app",
    "fast password access",
    "lightweight security",
    "clean interface",

    // Comparison Keywords
    "best password manager",
    "alternative to LastPass",
    "better than 1Password",
    "competitor to Dashlane",
    "free password manager",
    "premium password security",
    "value password solution",
    "affordable password app",
    "feature-rich security",
    "comprehensive password tool"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
      <Link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
