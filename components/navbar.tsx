"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Menu, X, Plus, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/generator", label: "Password Generator" },
    { href: "/add", label: "Add Password" },
  ];

  return (
    <header className="w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {" "}
          {/* Golden ratio: 16 * 1.618 ≈ 26 total spacing */}
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-slate-900/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  SecuroPass
                </span>
                <div className="text-xs text-slate-500 font-medium -mt-1">
                  Password Manager
                </div>
              </div>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg transition-all duration-200 group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-slate-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 origin-center" />
              </Link>
            ))}
          </nav>
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <SignedIn>
              <Link
                href="/add"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm font-medium rounded-lg hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Password</span>
              </Link>
              <div className="w-px h-6 bg-slate-200" />
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 ring-2 ring-slate-200 hover:ring-slate-300 transition-all duration-200",
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <div className="flex items-center space-x-3">
                <SignInButton mode="modal">
                  <button className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all duration-200">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm font-medium rounded-lg hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
          {/* Mobile Actions */}
          <div className="flex items-center space-x-3 lg:hidden">
            <SignedIn>
              <Link
                href="/add"
                className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-slate-200",
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <button className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all duration-200">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-sm">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-96 opacity-100 pb-6"
              : "max-h-0 opacity-0 pb-0 overflow-hidden"
          }`}
        >
          <div className="pt-4 space-y-2 border-t border-slate-200/60">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
